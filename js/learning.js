const LearningTracker = {
  MIN_LESSON_TIME: 180000,
  QUIZ_PASS_THRESHOLD: 0.6,

  startLesson(lessonId) {
    var sessions = Utils.getStorage('learning_sessions', {});
    sessions[lessonId] = { startTime: Date.now(), completed: false, quizAttempted: false };
    Utils.setStorage('learning_sessions', sessions);
  },

  hasMetTimeRequirement(lessonId) {
    var sessions = Utils.getStorage('learning_sessions', {});
    var session = sessions[lessonId];
    if (!session) return false;
    return (Date.now() - session.startTime) >= this.MIN_LESSON_TIME;
  },

  recordQuizAttempt(lessonId, score, total) {
    var attempts = Utils.getStorage('quiz_attempts', {});
    if (!attempts[lessonId]) attempts[lessonId] = [];
    var pct = total > 0 ? score / total : 0;
    attempts[lessonId].push({ score: score, total: total, percentage: pct, passed: pct >= this.QUIZ_PASS_THRESHOLD, date: new Date().toISOString() });
    Utils.setStorage('quiz_attempts', attempts);

    var sessions = Utils.getStorage('learning_sessions', {});
    if (sessions[lessonId]) {
      sessions[lessonId].quizAttempted = true;
      sessions[lessonId].quizPassed = pct >= this.QUIZ_PASS_THRESHOLD;
      Utils.setStorage('learning_sessions', sessions);
    }
    this._logActivity('quiz_attempt', lessonId + '|' + score + '/' + total);

    if (pct >= this.QUIZ_PASS_THRESHOLD) {
      this._awardAP('quiz_pass', 10);
    }

    return pct >= this.QUIZ_PASS_THRESHOLD;
  },

  hasPassedQuiz(lessonId) {
    var attempts = Utils.getStorage('quiz_attempts', {});
    var lessonAttempts = attempts[lessonId];
    if (!lessonAttempts || lessonAttempts.length === 0) return false;
    var latest = lessonAttempts[lessonAttempts.length - 1];
    return latest.passed === true;
  },

  completeLesson(lessonId, courseId) {
    if (!this.hasMetTimeRequirement(lessonId)) {
      Utils.showToast('Please spend at least 3 minutes on this lesson before completing.', 'warning');
      return false;
    }
    if (!this.hasPassedQuiz(lessonId)) {
      Utils.showToast('Please pass the quiz (60% or higher) to complete this lesson.', 'warning');
      return false;
    }

    var moduleNum = parseInt(lessonId.split('_').pop()) || 1;
    var progress = Utils.getStorage('course_progress', {});
    if (!progress[courseId]) progress[courseId] = { completed: [], modulesCompleted: [], lessonsCompleted: [], status: 'active', startedAt: new Date().toISOString(), lastActivity: new Date().toISOString(), timeSpent: 0, currentModule: 1 };
    if (!progress[courseId].completed) progress[courseId].completed = [];
    if (!progress[courseId].modulesCompleted) progress[courseId].modulesCompleted = [];
    if (!progress[courseId].lessonsCompleted) progress[courseId].lessonsCompleted = [];

    var lessonKey = lessonId;
    if (!progress[courseId].lessonsCompleted.includes(lessonKey)) {
      progress[courseId].lessonsCompleted.push(lessonKey);
    }

    var fullModuleId = courseId + '_' + moduleNum;
    if (!progress[courseId].modulesCompleted.includes(fullModuleId)) {
      progress[courseId].modulesCompleted.push(fullModuleId);
    }

    if (!progress[courseId].completed.includes(lessonKey)) {
      progress[courseId].completed.push(lessonKey);
    }

    var sessions = Utils.getStorage('learning_sessions', {});
    var session = sessions[lessonId];
    if (session) {
      var timeSpent = Date.now() - session.startTime;
      progress[courseId].timeSpent = (progress[courseId].timeSpent || 0) + timeSpent;
      session.completed = true;
      Utils.setStorage('learning_sessions', sessions);
    }

    progress[courseId].lastActivity = new Date().toISOString();
    progress[courseId].currentModule = Math.min(moduleNum + 1, 100);

    var nextModule = moduleNum + 1;
    progress[courseId].nextModuleId = nextModule;

    Utils.setStorage('course_progress', progress);
    this._awardAP('lesson_complete', 25);
    this._logActivity('completed_lesson', lessonId);
    this._checkCourseCompletion(courseId);
    this._checkAchievements(courseId);
    Utils.showToast('Lesson completed! +25 AP', 'success');
    return true;
  },

  completeProject(projectId) {
    var submissions = Utils.getStorage('project_submissions', {});
    submissions[projectId] = { completed: true, date: new Date().toISOString(), evidence: true };
    Utils.setStorage('project_submissions', submissions);
    this._awardAP('project_complete', 100);
    this._logActivity('completed_project', projectId);
    Utils.showToast('Project completed! +100 AP', 'success');
  },

  unlockNextMilestone(roadmapId, currentStep) {
    var progress = Utils.getStorage('roadmap_progress', {});
    if (!progress[roadmapId]) progress[roadmapId] = [];
    var nextStep = currentStep + 1;
    if (!progress[roadmapId].includes(nextStep)) {
      progress[roadmapId].push(nextStep);
    }
    Utils.setStorage('roadmap_progress', progress);
    this._logActivity('roadmap_milestone', roadmapId + '_' + nextStep);
  },

  getLessonStatus(lessonId) {
    var sessions = Utils.getStorage('learning_sessions', {});
    var attempts = Utils.getStorage('quiz_attempts', {});
    return {
      timeMet: this.hasMetTimeRequirement(lessonId),
      quizPassed: this.hasPassedQuiz(lessonId),
      started: !!sessions[lessonId]
    };
  },

  getCourseStats(courseId) {
    var progress = Utils.getStorage('course_progress', {});
    var course = progress[courseId];
    if (!course) return null;
    return {
      status: course.status || 'active',
      startedAt: course.startedAt,
      lastActivity: course.lastActivity,
      timeSpent: course.timeSpent || 0,
      lessonsCompleted: (course.lessonsCompleted || []).length,
      modulesCompleted: (course.modulesCompleted || []).length,
      currentModule: course.currentModule || 1
    };
  },

  getTotalStats() {
    var progress = Utils.getStorage('course_progress', {});
    var quizAttempts = Utils.getStorage('quiz_attempts', {});
    var typingHistory = Utils.getStorage('typing_history', []);
    var totalLessons = 0;
    var totalModules = 0;
    var totalTime = 0;
    var activeCourses = 0;
    var completedCourses = 0;
    var pausedCourses = 0;

    Object.keys(progress).forEach(function(cid) {
      var c = progress[cid];
      totalLessons += (c.lessonsCompleted || []).length;
      totalModules += (c.modulesCompleted || []).length;
      totalTime += c.timeSpent || 0;
      if (c.status === 'active') activeCourses++;
      else if (c.status === 'completed') completedCourses++;
      else if (c.status === 'paused') pausedCourses++;
    });

    var totalQuizAttempts = 0;
    var totalQuizCorrect = 0;
    var totalQuizQuestions = 0;
    Object.keys(quizAttempts).forEach(function(qid) {
      var attempts = quizAttempts[qid];
      attempts.forEach(function(a) {
        totalQuizAttempts++;
        totalQuizCorrect += a.score;
        totalQuizQuestions += a.total;
      });
    });

    var totalTypingTests = typingHistory.length;
    var avgTypingWpm = typingHistory.length > 0 ? Math.round(typingHistory.reduce(function(s, t) { return s + (t.wpm || 0); }, 0) / typingHistory.length) : 0;

    var streakData = this._calcStreak();

    return {
      totalLessonsCompleted: totalLessons,
      totalModulesCompleted: totalModules,
      totalTimeSpent: totalTime,
      activeCourses: activeCourses,
      completedCourses: completedCourses,
      pausedCourses: pausedCourses,
      totalQuizAttempts: totalQuizAttempts,
      totalQuizAccuracy: totalQuizQuestions > 0 ? Math.round((totalQuizCorrect / totalQuizQuestions) * 100) : 0,
      totalTypingTests: totalTypingTests,
      avgTypingWpm: avgTypingWpm,
      currentStreak: streakData.currentStreak,
      longestStreak: streakData.longestStreak
    };
  },

  getWeeklyActivity() {
    var activity = Utils.getStorage('coderio_activity', []);
    var days = [];
    var now = new Date();
    for (var i = 6; i >= 0; i--) {
      var d = new Date(now);
      d.setDate(d.getDate() - i);
      var dateStr = d.toISOString().split('T')[0];
      var count = activity.filter(function(a) { return a.time && a.time.startsWith(dateStr); }).length;
      days.push({ date: dateStr, count: count });
    }
    return days;
  },

  getMonthlyActivity() {
    var activity = Utils.getStorage('coderio_activity', []);
    var weeks = [];
    var now = new Date();
    for (var i = 3; i >= 0; i--) {
      var start = new Date(now);
      start.setDate(start.getDate() - (i * 7));
      var end = new Date(start);
      end.setDate(end.getDate() + 7);
      var count = activity.filter(function(a) {
        var t = a.time ? new Date(a.time) : null;
        return t && t >= start && t < end;
      }).length;
      weeks.push({ label: 'Week ' + (4 - i), count: count });
    }
    return weeks;
  },

  getTypingPerformance() {
    var history = Utils.getStorage('typing_history', []);
    if (history.length === 0) return { labels: ['No Data'], wpm: [0], accuracy: [0] };
    var recent = history.slice(-10);
    return {
      labels: recent.map(function(_, i) { return 'Test ' + (i + 1); }),
      wpm: recent.map(function(t) { return t.wpm || 0; }),
      accuracy: recent.map(function(t) { return Math.round(t.accuracy || 0); })
    };
  },

  getCourseProgressChart() {
    var progress = Utils.getStorage('course_progress', {});
    var courses = Utils.getStorage('courses_data', []);
    var labels = [];
    var data = [];
    Object.keys(progress).forEach(function(cid) {
      var course = (Array.isArray(courses) ? courses : []).find(function(c) { return c.id === cid; });
      var title = course ? course.title : cid;
      var entry = progress[cid];
      var totalMods = (entry.modulesCompleted || []).length;
      data.push(Math.min(totalMods * 10, 100));
      labels.push(Utils.truncate(title, 15));
    });
    return { labels: labels.length > 0 ? labels : ['No Courses'], data: data.length > 0 ? data : [0] };
  },

  _checkCourseCompletion(courseId) {
    var progress = Utils.getStorage('course_progress', {});
    var course = progress[courseId];
    if (!course) return;
    var lessons = Utils.getStorage('courses_data', []).find(function(c) { return c.id === courseId; });
    if (lessons && lessons.lessons && (course.lessonsCompleted || []).length >= lessons.lessons.length) {
      course.status = 'completed';
      course.completedAt = new Date().toISOString();
      Utils.setStorage('course_progress', progress);
      this._awardAP('course_complete', 500);
      this._logActivity('completed_course', courseId);
      Utils.showToast('Congratulations! Course completed! +500 AP', 'success');
    }
  },

  _checkAchievements(courseId) {
    if (typeof AchievementSystem !== 'undefined') {
      AchievementSystem.checkAndAward(courseId);
    }
  },

  _awardAP(reason, amount) {
    var ap = Utils.getStorage('achievement_points', 0);
    ap += amount;
    Utils.setStorage('achievement_points', ap);
    var history = Utils.getStorage('ap_history', []);
    history.push({ reason: reason, amount: amount, date: new Date().toISOString(), balance: ap });
    Utils.setStorage('ap_history', history);
  },

  _logActivity(text, type) {
    var activity = Utils.getStorage('coderio_activity', []);
    activity.push({ text: text, time: new Date().toISOString(), type: type });
    if (activity.length > 500) activity = activity.slice(-500);
    Utils.setStorage('coderio_activity', activity);
  },

  _calcStreak() {
    var activity = Utils.getStorage('coderio_activity', []);
    if (activity.length === 0) return { currentStreak: 0, longestStreak: 0 };
    var dates = activity.map(function(a) { return a.time ? a.time.split('T')[0] : null; }).filter(Boolean);
    var unique = {};
    dates.forEach(function(d) { unique[d] = true; });
    var sorted = Object.keys(unique).sort();

    var currentStreak = 0;
    var longestStreak = 0;
    var streak = 0;
    var today = new Date().toISOString().split('T')[0];
    var yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    if (sorted[sorted.length - 1] === today || sorted[sorted.length - 1] === yesterday) {
      for (var i = sorted.length - 1; i >= 0; i--) {
        var expected = new Date();
        expected.setDate(expected.getDate() - (sorted.length - 1 - i));
        var expectedStr = expected.toISOString().split('T')[0];
        if (sorted[i] === expectedStr) {
          streak++;
        } else {
          break;
        }
      }
      currentStreak = streak;
    }

    streak = 0;
    for (var j = 1; j < sorted.length; j++) {
      var prev = new Date(sorted[j - 1]);
      var curr = new Date(sorted[j]);
      var diff = (curr - prev) / 86400000;
      if (Math.round(diff) === 1) {
        streak++;
        if (streak > longestStreak) longestStreak = streak;
      } else {
        streak = 0;
      }
    }
    longestStreak = Math.max(longestStreak, currentStreak);

    return { currentStreak: currentStreak, longestStreak: longestStreak };
  }
};
