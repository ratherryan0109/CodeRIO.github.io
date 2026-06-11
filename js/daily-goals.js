var DailyGoals = {
  DEFAULTS: { lessons: 1, quizQuestions: 20, codingProblems: 5, typingTests: 1, modules: 1 },

  init() {
    this._checkDailyReset();
    this._loadGoals();
  },

  getGoals() {
    return Utils.getStorage('daily_goals_config', Object.assign({}, this.DEFAULTS));
  },

  saveGoals(config) {
    Utils.setStorage('daily_goals_config', config);
  },

  getProgress() {
    var progress = Utils.getStorage('daily_goals_progress', {});
    var today = new Date().toISOString().split('T')[0];
    if (progress.date !== today) {
      progress = { date: today, lessons: 0, quizQuestions: 0, codingProblems: 0, typingTests: 0, modules: 0 };
      Utils.setStorage('daily_goals_progress', progress);
    }
    return progress;
  },

  _checkDailyReset() {
    var progress = Utils.getStorage('daily_goals_progress', {});
    var today = new Date().toISOString().split('T')[0];
    if (progress.date !== today) {
      progress = { date: today, lessons: 0, quizQuestions: 0, codingProblems: 0, typingTests: 0, modules: 0 };
      Utils.setStorage('daily_goals_progress', progress);
    }
  },

  _loadGoals() {
    var progress = this.getProgress();
    var goals = this.getGoals();
    var allComplete = true;
    var anyProgress = false;

    Object.keys(goals).forEach(function(key) {
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
    });

    if (allComplete && anyProgress) {
      var dateStr = new Date().toISOString().split('T')[0];
      var completedDates = Utils.getStorage('daily_goals_completed', []);
      if (completedDates.indexOf(dateStr) === -1) {
        completedDates.push(dateStr);
        Utils.setStorage('daily_goals_completed', completedDates);
        Utils.showToast('All daily goals completed! Great work!', 'success');
      }
    }
  },

  recordProgress(type, amount) {
    var progress = this.getProgress();
    var goals = this.getGoals();

    if (progress[type] !== undefined) {
      progress[type] += amount;
      if (progress[type] > (goals[type] || Infinity)) {
        progress[type] = goals[type] || progress[type];
      }
      Utils.setStorage('daily_goals_progress', progress);
    }

    this._loadGoals();
  },

  getCompletionPercentage() {
    var progress = this.getProgress();
    var goals = this.getGoals();
    var total = 0;
    var completed = 0;

    Object.keys(goals).forEach(function(key) {
      if (goals[key] > 0) {
        total++;
        if (progress[key] >= goals[key]) completed++;
      }
    });

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

    var labels = {
      lessons: 'Lessons',
      quizQuestions: 'Quiz Questions',
      codingProblems: 'Coding Problems',
      typingTests: 'Typing Tests',
      modules: 'Modules'
    };
    var icons = {
      lessons: 'fa-book',
      quizQuestions: 'fa-question-circle',
      codingProblems: 'fa-code',
      typingTests: 'fa-keyboard',
      modules: 'fa-layer-group'
    };

    Object.keys(goals).forEach(function(key) {
      if (goals[key] > 0) {
        var val = Math.min(progress[key] || 0, goals[key]);
        var barPct = goals[key] > 0 ? Math.round((val / goals[key]) * 100) : 0;
        html += '<div class="dg-item"><div class="dg-item-header"><i class="fas ' + (icons[key] || 'fa-circle') + '"></i>'
          + '<span>' + (labels[key] || key) + '</span><span class="dg-count">' + val + '/' + goals[key] + '</span></div>'
          + '<div style="height:4px;background:#f1f5f9;border-radius:2px;overflow:hidden">'
          + '<div style="height:100%;width:' + barPct + '%;background:' + (barPct >= 100 ? 'var(--success)' : 'var(--primary)') + ';border-radius:2px;transition:width 0.3s"></div></div></div>';
      }
    });

    html += '</div></div>';
    container.innerHTML = html;
  },

  getStreak() {
    var completedDates = Utils.getStorage('daily_goals_completed', []);
    var sorted = completedDates.sort().reverse();
    var streak = 0;
    var today = new Date().toISOString().split('T')[0];
    var check = today;

    for (var i = 0; i < sorted.length; i++) {
      if (sorted[i] === check) {
        streak++;
        var d = new Date(check);
        d.setDate(d.getDate() - 1);
        check = d.toISOString().split('T')[0];
      } else if (sorted[i] < check) {
        if (i === 0 && sorted[i] < today) {
          var yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          var yesterdayStr = yesterday.toISOString().split('T')[0];
          if (sorted[0] === yesterdayStr) {
            var altCheck = yesterdayStr;
            streak = 1;
            for (var j = 1; j < sorted.length; j++) {
              var prev = new Date(altCheck);
              prev.setDate(prev.getDate() - 1);
              var expected = prev.toISOString().split('T')[0];
              if (sorted[j] === expected) {
                streak++;
                altCheck = expected;
              } else break;
            }
          }
        }
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
