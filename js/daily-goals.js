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

  _today() {
    var d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  },

  _yesterday(str) {
    var parts = str.split('-');
    var d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    d.setDate(d.getDate() - 1);
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  },

  _keys() {
    return Object.keys(this.DEFAULTS);
  },

  // Backward-compat aliases (used by 7 call sites in other files)
  getGoals: function() { return this.config(); },

  saveGoals: function(cfg) {
    if (cfg && typeof cfg === 'object') Utils.setStorage('daily_goals_config', cfg);
  },

  getProgress: function() { return this.progress(); },

  recordProgress: function(type, amount) { this.record(type, amount); },

  getCompletionPercentage: function() { return this.pct(); },

  renderWidget: function(id) { this.render(id); },

  getStreak: function() { return this.streak(); },

  // ----- core API -----

  config() {
    var stored = Utils.getStorage('daily_goals_config', {});
    if (!stored || typeof stored !== 'object') stored = {};
    var out = {};
    var defs = this.DEFAULTS;
    var keys = this._keys();
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      var v = stored[k];
      out[k] = (typeof v === 'number' && v >= 0) ? v : defs[k];
    }
    return out;
  },

  progress() {
    var p = Utils.getStorage('daily_goals_progress', {});
    if (!p || typeof p !== 'object') p = {};
    var today = this._today();
    if (p.date !== today) {
      p = { date: today };
      var keys = this._keys();
      for (var i = 0; i < keys.length; i++) p[keys[i]] = 0;
      Utils.setStorage('daily_goals_progress', p);
      return p;
    }
    var changed = false;
    var keys = this._keys();
    for (var i = 0; i < keys.length; i++) {
      if (typeof p[keys[i]] !== 'number') {
        p[keys[i]] = 0;
        changed = true;
      }
    }
    if (changed) Utils.setStorage('daily_goals_progress', p);
    return p;
  },

  record(type, amount) {
    if (typeof amount !== 'number' || amount <= 0) return;
    var keys = this._keys();
    if (keys.indexOf(type) === -1) return;

    var p = this.progress(); // ensures today with all keys
    var cfg = this.config();

    p[type] = Math.min((p[type] || 0) + amount, cfg[type] || amount);
    Utils.setStorage('daily_goals_progress', p);

    this._checkCompletion(p, cfg);
    this._refresh();
  },

  _checkCompletion(p, cfg) {
    var allDone = true;
    var any = false;
    var keys = this._keys();
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      if (cfg[k] > 0) {
        if ((p[k] || 0) < cfg[k]) allDone = false;
        if (p[k] > 0) any = true;
      }
    }
    if (allDone && any) {
      var today = this._today();
      var done = Utils.getStorage('daily_goals_completed', []);
      if (!Array.isArray(done)) done = [];
      if (done.indexOf(today) === -1) {
        done.push(today);
        Utils.setStorage('daily_goals_completed', done);
        Utils.showToast('All daily goals completed! Great work!', 'success');
      }
      if (typeof AchievementSystem !== 'undefined') AchievementSystem.checkAndAward();
    }
  },

  pct() {
    var p = this.progress();
    var cfg = this.config();
    var total = 0, done = 0;
    var keys = this._keys();
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      if (cfg[k] > 0) {
        total++;
        if ((p[k] || 0) >= cfg[k]) done++;
      }
    }
    return total > 0 ? Math.round((done / total) * 100) : 0;
  },

  render(id) {
    var el = document.getElementById(id);
    if (!el) return;

    var cfg = this.config();
    var p = this.progress();
    var pct = this.pct();

    var html = '<div class="daily-goals-widget">'
      + '<div class="dg-header"><h3><i class="fas fa-bullseye" style="color:var(--primary)"></i> Daily Goals</h3>'
      + '<span class="dg-pct">' + pct + '%</span></div>'
      + '<div style="height:6px;background:#f1f5f9;border-radius:3px;overflow:hidden;margin-bottom:1rem">'
      + '<div style="height:100%;width:' + pct + '%;background:var(--primary);border-radius:3px;transition:width 0.5s"></div></div>'
      + '<div class="dg-list">';

    var keys = this._keys();
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      if (cfg[k] <= 0) continue;
      var val = typeof p[k] === 'number' ? Math.min(p[k], cfg[k]) : 0;
      var bar = cfg[k] > 0 ? Math.round((val / cfg[k]) * 100) : 0;
      html += '<div class="dg-item"><div class="dg-item-header">'
        + '<i class="fas ' + (this.ICONS[k] || 'fa-circle') + '"></i>'
        + '<span>' + (this.LABELS[k] || k) + '</span>'
        + '<span class="dg-count">' + val + '/' + cfg[k] + '</span></div>'
        + '<div style="height:4px;background:#f1f5f9;border-radius:2px;overflow:hidden">'
        + '<div style="height:100%;width:' + bar + '%;background:' + (bar >= 100 ? 'var(--success)' : 'var(--primary)') + ';border-radius:2px;transition:width 0.3s"></div></div></div>';
    }

    html += '</div></div>';
    el.innerHTML = html;
  },

  _refresh() {
    var el = document.getElementById('dailyGoalsWidget');
    if (el) this.render('dailyGoalsWidget');
  },

  streak() {
    var done = Utils.getStorage('daily_goals_completed', []);
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

  init() {
    this._migrateLegacy();
    this.config();
    this.progress();
  },

  _migrateLegacy() {
    var goalsKeys = ['daily_goals_config', 'daily_goals_progress', 'daily_goals_completed'];
    for (var i = 0; i < goalsKeys.length; i++) {
      var k = goalsKeys[i];
      try {
        if (localStorage.getItem(k) !== null) continue;
        for (var j = 0; j < localStorage.length; j++) {
          var lk = localStorage.key(j);
          if (lk && lk.indexOf(':') > 0 && lk.endsWith(':' + k)) {
            var val = localStorage.getItem(lk);
            if (val !== null) {
              localStorage.setItem(k, val);
              localStorage.removeItem(lk);
            }
            break;
          }
        }
      } catch {}
    }
  }
};

document.addEventListener('DOMContentLoaded', function() {
  if (typeof Utils !== 'undefined') DailyGoals.init();
});
