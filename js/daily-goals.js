var DailyGoals = {
  DEFAULTS: { lessons: 1, quizQuestions: 20, codingProblems: 5, typingTests: 1, modules: 1 },

  LABELS: {
    lessons: 'Lessons',
    quizQuestions: 'Quiz Questions',
    codingProblems: 'Coding Problems',
    typingTests: 'Typing Tests',
    modules: 'Modules'
  },

  ICONS: {
    lessons: 'fa-book',
    quizQuestions: 'fa-question-circle',
    codingProblems: 'fa-code',
    typingTests: 'fa-keyboard',
    modules: 'fa-layer-group'
  },

  // ---- storage key names ----
  _CFG: 'daily_goals_config',
  _PROG: 'daily_goals_progress',
  _DONE: 'daily_goals_completed',

  // ---- date helpers ----

  _today() {
    var d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  },

  _yesterday(s) {
    var parts = s.split('-');
    var d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    d.setDate(d.getDate() - 1);
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  },

  _validKeys() { return Object.keys(this.DEFAULTS); },

  // ---- backward-compat aliases (used by 8 call sites in 6 files) ----

  getGoals:               function()      { return this.config(); },
  saveGoals:              function(cfg)   { if (cfg && typeof cfg === 'object') Utils.setStorage(this._CFG, cfg); },
  getProgress:            function()      { return this.progress(); },
  recordProgress:         function(t, a)  { this.record(t, a); },
  getCompletionPercentage: function()     { return this.pct(); },
  renderWidget:           function(id)    { this.render(id); },
  getStreak:              function()      { return this.streak(); },

  // ---- core: config ----

  config() {
    var stored = Utils.getStorage(this._CFG, {}) || {};
    var out = {};
    var keys = this._validKeys();
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      var v = stored[k];
      out[k] = (typeof v === 'number' && v >= 0) ? v : this.DEFAULTS[k];
    }
    return out;
  },

  // ---- core: today's progress ----

  progress() {
    var p = Utils.getStorage(this._PROG, {}) || {};
    var today = this._today();
    if (p.date !== today) {
      p = { date: today };
      var keys = this._validKeys();
      for (var i = 0; i < keys.length; i++) p[keys[i]] = 0;
      Utils.setStorage(this._PROG, p);
      return p;
    }
    var changed = false;
    var keys = this._validKeys();
    for (var i = 0; i < keys.length; i++) {
      if (typeof p[keys[i]] !== 'number') {
        p[keys[i]] = 0;
        changed = true;
      }
    }
    if (changed) Utils.setStorage(this._PROG, p);
    return p;
  },

  // ---- core: record progress ----

  record(type, amount) {
    if (typeof amount === 'string') amount = parseFloat(amount);
    if (typeof amount !== 'number' || isNaN(amount)) return;
    var keys = this._validKeys();
    if (keys.indexOf(type) === -1) return;

    var p = this.progress();
    var cfg = this.config();

    if (typeof p[type] !== 'number') p[type] = 0;
    var goal = typeof cfg[type] === 'number' ? cfg[type] : 0;
    p[type] = Math.min(p[type] + Math.max(0, amount), goal);
    Utils.setStorage(this._PROG, p);

    this._checkComplete(p, cfg);
    this._notify();
    this._refresh();
  },

  _notify() {
    try {
      window.dispatchEvent(new CustomEvent('dailygoals-update', { detail: { progress: Utils.getStorage(this._PROG) } }));
    } catch (e) {}
    // Also flag via localStorage so other tabs can pick it up
    try { localStorage.setItem('dailygoals_updated', Date.now()); } catch (e) {}
  },

  // ---- core: check if all goals met today ----

  _checkComplete(p, cfg) {
    var allMet = true;
    var any = false;
    var keys = this._validKeys();
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      if (cfg[k] > 0) {
        if ((p[k] || 0) < cfg[k]) allMet = false;
        if (p[k] > 0) any = true;
      }
    }
    if (!allMet || !any) return;

    var today = this._today();
    var done = Utils.getStorage(this._DONE, []);
    if (!Array.isArray(done)) done = [];
    if (done.indexOf(today) !== -1) return;

    done.push(today);
    Utils.setStorage(this._DONE, done);
    Utils.showToast('All daily goals completed! Great work!', 'success');
    if (typeof AchievementSystem !== 'undefined') AchievementSystem.checkAndAward();
  },

  // ---- core: completion percentage ----

  pct() {
    var p = this.progress();
    var cfg = this.config();
    var total = 0, met = 0;
    var keys = this._validKeys();
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      if (cfg[k] > 0) {
        total++;
        if ((p[k] || 0) >= cfg[k]) met++;
      }
    }
    return total > 0 ? Math.round((met / total) * 100) : 0;
  },

  // ---- core: render widget ----

  render(id) {
    var el = document.getElementById(id);
    if (!el) return;

    var cfg = this.config();
    var p = this.progress();
    var pct = this.pct();

    var html = '<div class="dg-header"><h3><i class="fas fa-bullseye" style="color:var(--primary)"></i> Daily Goals</h3>'
      + '<span class="dg-pct">' + pct + '%</span></div>'
      + '<div style="height:6px;background:#f1f5f9;border-radius:3px;overflow:hidden;margin-bottom:1rem">'
      + '<div style="height:100%;width:' + pct + '%;background:var(--primary);border-radius:3px;transition:width 0.5s"></div></div>'
      + '<div class="dg-list">';

    var keys = this._validKeys();
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      if (cfg[k] <= 0) continue;
      var val = typeof p[k] === 'number' ? Math.min(p[k], cfg[k]) : 0;
      var bar = cfg[k] > 0 ? Math.round((val / cfg[k]) * 100) : 0;
      var color = bar >= 100 ? 'var(--success)' : 'var(--primary)';
      html += '<div class="dg-item"><div class="dg-item-header">'
        + '<i class="fas ' + (this.ICONS[k] || 'fa-circle') + '"></i>'
        + '<span>' + (this.LABELS[k] || k) + '</span>'
        + '<span class="dg-count">' + val + '/' + cfg[k] + '</span></div>'
        + '<div style="height:4px;background:#f1f5f9;border-radius:2px;overflow:hidden">'
        + '<div style="height:100%;width:' + bar + '%;background:' + color + ';border-radius:2px;transition:width 0.3s"></div></div></div>';
    }

    html += '</div>';
    el.innerHTML = html;
  },

  _refresh() {
    var el = document.getElementById('dailyGoalsWidget');
    if (el) this.render('dailyGoalsWidget');
  },

  // ---- core: current streak ----

  streak() {
    var done = Utils.getStorage(this._DONE, []);
    if (!Array.isArray(done)) done = [];
    var sorted = done.slice().sort().reverse();
    var today = this._today();
    var count = 0;
    var check = today;

    for (var i = 0; i < sorted.length; i++) {
      if (sorted[i] === check) {
        count++;
        check = this._yesterday(check);
      } else if (i === 0 && sorted[i] < today) {
        var y = this._yesterday(today);
        if (sorted[0] === y) {
          count = 1;
          check = this._yesterday(y);
          for (var j = 1; j < sorted.length; j++) {
            if (sorted[j] === check) { count++; check = this._yesterday(check); }
            else break;
          }
        }
        break;
      } else break;
    }
    return count;
  },

  // ---- initialization + legacy migration ----

  init() {
    this._migrate();
    this.config();
    this.progress();
  },

  _migrate() {
    var keys = [this._CFG, this._PROG, this._DONE];
    for (var i = 0; i < keys.length; i++) {
      try {
        if (localStorage.getItem(keys[i]) !== null) continue;
        for (var j = 0; j < localStorage.length; j++) {
          var lk = localStorage.key(j);
          if (lk && lk.indexOf(':') > 0 && lk.endsWith(':' + keys[i])) {
            var val = localStorage.getItem(lk);
            if (val !== null) {
              localStorage.setItem(keys[i], val);
              localStorage.removeItem(lk);
            }
            break;
          }
        }
      } catch (e) {}
    }
  }
};

document.addEventListener('DOMContentLoaded', function() {
  if (typeof Utils !== 'undefined') DailyGoals.init();
});
