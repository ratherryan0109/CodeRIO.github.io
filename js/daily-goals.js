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

  _localDateStr(d) {
    var date = d || new Date();
    return date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
  },

  _prevLocalDateStr(dateStr) {
    var parts = dateStr.split('-');
    var d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    d.setDate(d.getDate() - 1);
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  },

  _todayStr: null,

  init() {
    this._checkDailyReset();
    this._loadGoals();
  },

  _validKeys() {
    return Object.keys(this.DEFAULTS);
  },

  getGoals() {
    var stored = Utils.getStorage('daily_goals_config', {});
    if (!stored || typeof stored !== 'object') stored = {};
    var merged = {};
    var valid = this._validKeys();
    for (var i = 0; i < valid.length; i++) {
      var k = valid[i];
      var v = stored[k];
      merged[k] = (typeof v === 'number' && v >= 0) ? v : this.DEFAULTS[k];
    }
    return merged;
  },

  saveGoals(config) {
    Utils.setStorage('daily_goals_config', config);
  },

  getProgress() {
    var progress = Utils.getStorage('daily_goals_progress', {});
    var today = this._localDateStr();
    if (progress.date !== today) {
      progress = { date: today };
      var valid = this._validKeys();
      for (var i = 0; i < valid.length; i++) progress[valid[i]] = 0;
      Utils.setStorage('daily_goals_progress', progress);
    }
    return progress;
  },

  _checkDailyReset() {
    var progress = Utils.getStorage('daily_goals_progress', {});
    var today = this._localDateStr();
    if (progress.date !== today) {
      progress = { date: today };
      var valid = this._validKeys();
      for (var i = 0; i < valid.length; i++) progress[valid[i]] = 0;
      Utils.setStorage('daily_goals_progress', progress);
    }
  },

  _loadGoals() {
    var progress = this.getProgress();
    var goals = this.getGoals();
    var allComplete = true;
    var anyProgress = false;

    var valid = this._validKeys();
    for (var i = 0; i < valid.length; i++) {
      var key = valid[i];
      if (goals[key] > 0) {
        if (progress[key] >= goals[key]) {
          if (typeof AchievementSystem !== 'undefined') {
            AchievementSystem.checkAndAward();
          }
        } else {
          allComplete = false;
        }
        if (progress[key] > 0) anyProgress = true;
      }
    }

    if (allComplete && anyProgress) {
      var dateStr = this._localDateStr();
      var completedDates = Utils.getStorage('daily_goals_completed', []);
      if (completedDates.indexOf(dateStr) === -1) {
        completedDates.push(dateStr);
        Utils.setStorage('daily_goals_completed', completedDates);
        Utils.showToast('All daily goals completed! Great work!', 'success');
      }
    }
  },

  recordProgress(type, amount) {
    if (typeof amount !== 'number' || amount <= 0) return;
    var valid = this._validKeys();
    if (valid.indexOf(type) === -1) return;

    var progress = this.getProgress();
    var goals = this.getGoals();

    if (typeof progress[type] !== 'number') progress[type] = 0;
    progress[type] = Math.min(progress[type] + amount, goals[type] || amount);
    Utils.setStorage('daily_goals_progress', progress);

    this._loadGoals();
    this._refreshWidget();
  },

  _refreshWidget() {
    var container = document.getElementById('dailyGoalsWidget');
    if (container) this.renderWidget('dailyGoalsWidget');
  },

  getCompletionPercentage() {
    var progress = this.getProgress();
    var goals = this.getGoals();
    var total = 0;
    var completed = 0;

    var valid = this._validKeys();
    for (var i = 0; i < valid.length; i++) {
      var key = valid[i];
      if (goals[key] > 0) {
        total++;
        if (progress[key] >= goals[key]) completed++;
      }
    }

    return total > 0 ? Math.round((completed / total) * 100) : 0;
  },

  renderWidget(containerId) {
    var container = document.getElementById(containerId);
    if (!container) return;

    var goals = this.getGoals();
    var progress = this.getProgress();
    var pct = this.getCompletionPercentage();

    var html = '<div class="daily-goals-widget">'
      + '<div class="dg-header"><h3><i class="fas fa-bullseye" style="color:var(--primary)"></i> Daily Goals</h3>'
      + '<span class="dg-pct">' + pct + '%</span></div>'
      + '<div style="height:6px;background:#f1f5f9;border-radius:3px;overflow:hidden;margin-bottom:1rem">'
      + '<div style="height:100%;width:' + pct + '%;background:var(--primary);border-radius:3px;transition:width 0.5s"></div></div>'
      + '<div class="dg-list">';

    var valid = this._validKeys();
    for (var i = 0; i < valid.length; i++) {
      var key = valid[i];
      if (goals[key] <= 0) continue;
      var val = typeof progress[key] === 'number' ? Math.min(progress[key], goals[key]) : 0;
      var barPct = goals[key] > 0 ? Math.round((val / goals[key]) * 100) : 0;
      html += '<div class="dg-item"><div class="dg-item-header"><i class="fas ' + (this.ICONS[key] || 'fa-circle') + '"></i>'
        + '<span>' + (this.LABELS[key] || key) + '</span><span class="dg-count">' + val + '/' + goals[key] + '</span></div>'
        + '<div style="height:4px;background:#f1f5f9;border-radius:2px;overflow:hidden">'
        + '<div style="height:100%;width:' + barPct + '%;background:' + (barPct >= 100 ? 'var(--success)' : 'var(--primary)') + ';border-radius:2px;transition:width 0.3s"></div></div></div>';
    }

    html += '</div></div>';
    container.innerHTML = html;
  },

  getStreak() {
    var completedDates = Utils.getStorage('daily_goals_completed', []);
    var sorted = completedDates.slice().sort().reverse();
    var streak = 0;
    var today = this._localDateStr();
    var check = today;

    for (var i = 0; i < sorted.length; i++) {
      if (sorted[i] === check) {
        streak++;
        check = this._prevLocalDateStr(check);
      } else if (i === 0 && sorted[i] < today) {
        var yesterday = this._prevLocalDateStr(today);
        if (sorted[0] === yesterday) {
          var altCheck = yesterday;
          streak = 1;
          for (var j = 1; j < sorted.length; j++) {
            var expected = this._prevLocalDateStr(altCheck);
            if (sorted[j] === expected) {
              streak++;
              altCheck = expected;
            } else break;
          }
        }
        break;
      } else {
        break;
      }
    }

    return streak;
  }
};

document.addEventListener('DOMContentLoaded', function() {
  if (typeof Utils !== 'undefined') {
    DailyGoals.init();
  }
});
