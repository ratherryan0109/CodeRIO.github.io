var ReminderSystem = {
  REMINDER_INTERVAL: 7 * 24 * 60 * 60 * 1000,

  init() {
    this._checkReminders();
    this._startPeriodicCheck();
  },

  _checkReminders() {
    var preferences = Utils.getStorage('reminder_preferences', {
      pausedCourse: true,
      streakReminder: true,
      dailyGoal: true,
      intervalDays: 7
    });

    var progress = Utils.getStorage('course_progress', {});
    var now = Date.now();
    var reminded = Utils.getStorage('reminder_sent', {});
    var changed = false;

    if (preferences.pausedCourse) {
      var perCoursePrefs = Utils.getStorage('per_course_reminders', {});
      Object.keys(progress).forEach(function(cid) {
        var entry = progress[cid];
        if (entry.status !== 'paused') return;
        if (!entry.pausedAt) return;
        if (perCoursePrefs[cid] === false) return;

        var pausedTime = now - new Date(entry.pausedAt).getTime();
        var interval = (preferences.intervalDays || 7) * 24 * 60 * 60 * 1000;

        if (pausedTime >= interval) {
          var lastReminded = reminded[cid] || 0;
          if (now - lastReminded >= interval) {
            this._sendReminder(cid, entry);
            reminded[cid] = now;
            changed = true;
          }
        }
      }.bind(this));
    }

    if (changed) Utils.setStorage('reminder_sent', reminded);

    if (preferences.streakReminder) this._checkStreakReminder(progress);
    if (preferences.dailyGoal) this._checkDailyGoalReminder();
    this._checkMotivationalNotifications(progress);
  },

  _checkStreakReminder(progress) {
    var activity = Utils.getStorage('coderio_activity', []);
    if (activity.length === 0) return;

    var lastActivity = activity[activity.length - 1];
    if (!lastActivity || !lastActivity.time) return;

    var lastDate = new Date(lastActivity.time);
    var now = new Date();
    var daysSince = Math.floor((now - lastDate) / 86400000);

    var reminded = Utils.getStorage('streak_reminder_sent', null);
    if (daysSince >= 2) {
      if (!reminded || now - new Date(reminded) > 86400000) {
        Utils.showToast('Your progress is waiting! Come back to keep your streak alive. You\'ve got this!', 'info');
        Utils.setStorage('streak_reminder_sent', now.toISOString());
      }
    }
  },

  _checkDailyGoalReminder() {
    var now = new Date();
    var hour = now.getHours();
    if (hour < 14 || hour > 22) return;

    var remindedDay = Utils.getStorage('daily_goal_reminded_today', '');
    var today = now.toISOString().split('T')[0];
    if (remindedDay === today) return;

    if (typeof DailyGoals === 'undefined') return;
    var pct = DailyGoals.getCompletionPercentage();
    if (pct < 100) {
      var remaining = 100 - pct;
      var msg = remaining > 50
        ? 'Most of your daily goals are still pending. A small step now goes a long way!'
        : remaining > 20
        ? 'You\'re ' + pct + '% through your daily goals! Finish strong, you\'re almost there!'
        : 'Just ' + remaining + '% of your daily goals remaining. You can do this!';
      Utils.showToast(msg, 'info');
      Utils.setStorage('daily_goal_reminded_today', today);
    }
  },

  _checkMotivationalNotifications(progress) {
    var remindedDate = Utils.getStorage('motivation_sent_date', '');
    var today = new Date().toISOString().split('T')[0];
    if (remindedDate === today) return;

    var courseIds = Object.keys(progress);
    if (courseIds.length === 0) return;

    var now = new Date();
    var dayOfWeek = now.getDay();
    var msgs = [];

    courseIds.forEach(function(cid) {
      var entry = progress[cid];
      if (!entry) return;
      var completedMods = (entry.modulesCompleted || []).length;
      var completedLessons = (entry.lessonsCompleted || []).length;

      if (completedMods > 0 && completedLessons > 0) {
        if (dayOfWeek === 1) {
          msgs.push('Start the week strong! You\'ve completed ' + completedLessons + ' lessons in ' + cid + '. Keep the momentum going!');
        } else if (dayOfWeek === 5 && completedLessons < 3) {
          msgs.push('Weekend is coming! Try to complete 2 more lessons in ' + cid + ' this week to stay on track.');
        } else if (completedMods >= 3 && completedLessons > 5) {
          msgs.push('Great progress in ' + cid + '! You\'ve finished ' + completedMods + ' modules. Consistency is key!');
        }
      }
    });

    if (msgs.length > 0) {
      var msg = msgs[Math.floor(Math.random() * msgs.length)];
      Utils.showToast(msg, 'info');
      Utils.setStorage('motivation_sent_date', today);
    }
  },

  _sendReminder(cid, entry) {
    var coursesData = Utils.getStorage('courses_data', []);
    var course = coursesData.find(function(c) { return c.id === cid; });
    var title = course ? course.title : cid.replace(/-/g, ' ').replace(/\b\w/g, function(l) { return l.toUpperCase(); });

    var completedCount = (entry.lessonsCompleted || []).length;
    var msg = completedCount > 0
      ? 'You\'ve completed ' + completedCount + ' lessons in ' + title + '. Ready to continue? Your progress is saved!'
      : 'Ready to continue learning ' + title + '? Take the first step today!';

    Utils.showToast(msg, 'info');
  },

  _startPeriodicCheck() {
    setInterval(function() {
      this._checkReminders();
    }.bind(this), 1800000);
  },

  savePreferences(prefs) {
    Utils.setStorage('reminder_preferences', prefs);
  },

  getPreferences() {
    return Utils.getStorage('reminder_preferences', {
      pausedCourse: true,
      streakReminder: true,
      dailyGoal: true,
      intervalDays: 7
    });
  },

  getPausedCoursesWithDuration() {
    var progress = Utils.getStorage('course_progress', {});
    var coursesData = Utils.getStorage('courses_data', []);
    var result = [];
    Object.keys(progress).forEach(function(cid) {
      var entry = progress[cid];
      if (entry.status === 'paused' && entry.pausedAt) {
        var course = coursesData.find(function(c) { return c.id === cid; });
        var daysPaused = Math.floor((Date.now() - new Date(entry.pausedAt).getTime()) / 86400000);
        result.push({
          id: cid,
          title: course ? course.title : cid,
          daysPaused: daysPaused,
          lessonsCompleted: (entry.lessonsCompleted || []).length
        });
      }
    });
    return result;
  }
};

document.addEventListener('DOMContentLoaded', function() {
  if (typeof Utils !== 'undefined') {
    ReminderSystem.init();
  }
});
