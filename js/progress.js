const ProgressTracker = {
  getCourseProgress(courseId) {
    const user = Utils.getStorage('coderio_user');
    if (!user) return { completed: [], total: 0 };
    const progress = Utils.getStorage('course_progress', {});
    return progress[courseId] || { completed: [], total: 0 };
  },

  markModuleComplete(courseId, moduleIndex) {
    const progress = Utils.getStorage('course_progress', {});
    if (!progress[courseId]) progress[courseId] = { completed: [] };
    if (!progress[courseId].completed.includes(moduleIndex)) {
      progress[courseId].completed.push(moduleIndex);
    }
    Utils.setStorage('course_progress', progress);
    addActivity(`Completed module in ${courseId}`);
  },

  getCoursePercentage(courseId, totalModules) {
    const p = this.getCourseProgress(courseId);
    return totalModules > 0 ? Math.round((p.completed.length / totalModules) * 100) : 0;
  },

  saveQuizResult(courseId, score, total) {
    const results = Utils.getStorage('quiz_results', {});
    if (!results[courseId]) results[courseId] = [];
    results[courseId].push({ score, total, date: new Date().toISOString() });
    Utils.setStorage('quiz_results', results);
    addActivity(`Scored ${score}/${total} in ${courseId} quiz`);
  },

  saveTypingResult(wpm, accuracy, cpm) {
    const history = Utils.getStorage('typing_history', []);
    history.push({ wpm, accuracy, cpm, date: new Date().toISOString() });
    Utils.setStorage('typing_history', history);

    const best = Utils.getStorage('typing_best', { wpm: 0, accuracy: 0 });
    if (wpm > best.wpm) {
      Utils.setStorage('typing_best', { wpm, accuracy });
    }
    addActivity(`Typing test: ${wpm} WPM with ${accuracy}% accuracy`);
  },

  saveRoadmapProgress(roadmapId, step) {
    const progress = Utils.getStorage('roadmap_progress', {});
    if (!progress[roadmapId]) progress[roadmapId] = [];
    if (!progress[roadmapId].includes(step)) {
      progress[roadmapId].push(step);
    }
    Utils.setStorage('roadmap_progress', progress);
  },

  getOverallStats() {
    const courses = Utils.getStorage('course_progress', {});
    const quiz = Utils.getStorage('quiz_results', {});
    const typing = Utils.getStorage('typing_history', []);
    const streak = Utils.getStorage('coderio_streak', 0);

    let totalCourses = Object.keys(courses).length;
    let totalCompleted = 0;
    Object.values(courses).forEach(c => { totalCompleted += c.completed ? c.completed.length : 0; });

    let totalQuizzes = 0;
    let totalQuizScore = 0;
    let totalQuizMax = 0;
    Object.values(quiz).forEach(results => {
      results.forEach(r => {
        totalQuizzes++;
        totalQuizScore += r.score;
        totalQuizMax += r.total;
      });
    });

    const bestTyping = Utils.getStorage('typing_best', { wpm: 0 });

    return {
      coursesStarted: totalCourses,
      modulesCompleted: totalCompleted,
      quizzesTaken: totalQuizzes,
      quizAccuracy: totalQuizMax > 0 ? Math.round((totalQuizScore / totalQuizMax) * 100) : 0,
      bestWpm: bestTyping.wpm,
      testsTaken: typing.length,
      streak
    };
  }
};

function addActivity(text) {
  const activities = Utils.getStorage('coderio_activity', []);
  activities.push({ text, time: new Date().toISOString() });
  Utils.setStorage('coderio_activity', activities);
}
