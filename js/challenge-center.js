var ChallengeCenter = {
  CHALLENGE_SIZE: 100,
  CHALLENGE_TIME: 1800,

  startChallenge(courseId) {
    var lessons = Utils.getStorage('lessons_data', null);
    if (!lessons) {
      this._loadLessons(function(data) {
        this._beginChallenge(courseId, data);
      }.bind(this));
    } else {
      this._beginChallenge(courseId, lessons);
    }
  },

  _loadLessons(callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '../data/lessons.json', true);
    xhr.onload = function() {
      if (xhr.status === 200) {
        try {
          var data = JSON.parse(xhr.responseText);
          Utils.setStorage('lessons_data', data);
          callback(data);
        } catch(e) { callback(null); }
      } else { callback(null); }
    };
    xhr.onerror = function() { callback(null); };
    xhr.send();
  },

  _beginChallenge(courseId, lessonsData) {
    var course = lessonsData && lessonsData.courses ? lessonsData.courses.find(function(c) { return c.id === courseId; }) : null;
    if (!course || !course.modules || course.modules.length === 0) {
      Utils.showToast('Challenge data not available for this course.', 'error');
      return;
    }

    var allQuestions = [];
    course.modules.forEach(function(mod) {
      if (mod.quiz && Array.isArray(mod.quiz)) {
        mod.quiz.forEach(function(q) {
          allQuestions.push(Object.assign({}, q, { moduleTitle: mod.title || '' }));
        });
      }
    });

    if (allQuestions.length < 10) {
      Utils.showToast('Not enough quiz questions for a challenge.', 'warning');
      return;
    }

    var selected = Utils.shuffle(allQuestions).slice(0, Math.min(this.CHALLENGE_SIZE, allQuestions.length));
    var challenge = {
      courseId: courseId,
      courseTitle: course.title || courseId,
      questions: selected,
      totalQuestions: selected.length,
      startTime: Date.now(),
      timeLimit: this.CHALLENGE_TIME * 1000,
      answers: []
    };

    Utils.setStorage('active_challenge', challenge);
    window.location.href = 'challenge-arena.html?course=' + courseId;
  },

  submitAnswer(questionIndex, answer) {
    var challenge = Utils.getStorage('active_challenge', null);
    if (!challenge) return;

    if (!challenge.answers) challenge.answers = [];
    var existing = challenge.answers.findIndex(function(a) { return a.index === questionIndex; });
    if (existing !== -1) {
      challenge.answers[existing].answer = answer;
    } else {
      challenge.answers.push({ index: questionIndex, answer: answer });
    }
    Utils.setStorage('active_challenge', challenge);
  },

  finishChallenge() {
    var challenge = Utils.getStorage('active_challenge', null);
    if (!challenge) return null;

    var correct = 0;
    var total = challenge.questions.length;
    var attempted = 0;

    challenge.questions.forEach(function(q, i) {
      var userAnswer = challenge.answers ? challenge.answers.find(function(a) { return a.index === i; }) : null;
      if (userAnswer && userAnswer.answer !== undefined && userAnswer.answer !== null && userAnswer.answer !== '') {
        attempted++;
        if (String(userAnswer.answer).trim().toLowerCase() === String(q.answer).trim().toLowerCase()) {
          correct++;
        }
      }
    });

    var accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
    var timeTaken = Math.floor((Date.now() - challenge.startTime) / 1000);
    var score = Math.round(accuracy * (attempted / total) * 10);

    var result = {
      courseId: challenge.courseId,
      courseTitle: challenge.courseTitle,
      correct: correct,
      total: total,
      attempted: attempted,
      accuracy: accuracy,
      timeTaken: timeTaken,
      score: score,
      date: new Date().toISOString()
    };

    var history = Utils.getStorage('challenge_history', []);
    history.push(result);
    Utils.setStorage('challenge_history', history);
    Utils.removeStorage('active_challenge');

    if (typeof LearningTracker !== 'undefined') {
      LearningTracker._awardAP('challenge_complete', Math.round(accuracy * 2));
      LearningTracker._logActivity('completed_challenge', challenge.courseId + '|' + accuracy + '%');
    }

    if (typeof DailyGoals !== 'undefined') {
      DailyGoals.recordProgress('codingProblems', attempted);
    }

    return result;
  },

  getHistory(courseId) {
    var history = Utils.getStorage('challenge_history', []);
    if (courseId) {
      return history.filter(function(h) { return h.courseId === courseId; });
    }
    return history;
  },

  getBestScore(courseId) {
    var history = this.getHistory(courseId);
    if (history.length === 0) return null;
    return history.reduce(function(best, h) { return h.score > best.score ? h : best; }, history[0]);
  },

  getAverageAccuracy(courseId) {
    var history = this.getHistory(courseId);
    if (history.length === 0) return 0;
    var total = history.reduce(function(sum, h) { return sum + h.accuracy; }, 0);
    return Math.round(total / history.length);
  }
};
