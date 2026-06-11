var InterviewTracker = {
  _key: 'interview_tracking',
  _sessionViewed: {},

  _get() {
    return Utils.getStorage(this._key, { viewed: {}, bookmarked: {}, studied: {}, history: [] });
  },

  _save(data) {
    Utils.setStorage(this._key, data);
  },

  trackView(questionId, courseId) {
    var sid = courseId + '::' + questionId;
    if (this._sessionViewed[sid]) return;
    this._sessionViewed[sid] = true;
    var data = this._get();
    if (!data.viewed[courseId]) data.viewed[courseId] = {};
    data.viewed[courseId][questionId] = (data.viewed[courseId][questionId] || 0) + 1;
    data.history.unshift({ questionId: questionId, courseId: courseId, time: new Date().toISOString() });
    if (data.history.length > 500) data.history = data.history.slice(0, 500);
    this._save(data);
  },

  toggleBookmark(questionId, courseId) {
    var data = this._get();
    if (!data.bookmarked[courseId]) data.bookmarked[courseId] = {};
    if (data.bookmarked[courseId][questionId]) { delete data.bookmarked[courseId][questionId]; this._save(data); return false; }
    data.bookmarked[courseId][questionId] = true;
    this._save(data);
    return true;
  },

  isBookmarked(questionId, courseId) {
    var data = this._get();
    return !!(data.bookmarked[courseId] && data.bookmarked[courseId][questionId]);
  },

  toggleStudied(questionId, courseId) {
    var data = this._get();
    if (!data.studied[courseId]) data.studied[courseId] = {};
    if (data.studied[courseId][questionId]) { delete data.studied[courseId][questionId]; this._save(data); return false; }
    data.studied[courseId][questionId] = true;
    this._save(data);
    return true;
  },

  isStudied(questionId, courseId) {
    var data = this._get();
    return !!(data.studied[courseId] && data.studied[courseId][questionId]);
  },

  getStats(courseId) {
    var data = this._get();
    var viewed = 0, bookmarked = 0, studied = 0;
    if (courseId) {
      viewed = data.viewed[courseId] ? Object.keys(data.viewed[courseId]).length : 0;
      bookmarked = data.bookmarked[courseId] ? Object.keys(data.bookmarked[courseId]).length : 0;
      studied = data.studied[courseId] ? Object.keys(data.studied[courseId]).length : 0;
    } else {
      Object.keys(data.viewed || {}).forEach(function(c) { viewed += Object.keys(data.viewed[c]).length; });
      Object.keys(data.bookmarked || {}).forEach(function(c) { bookmarked += Object.keys(data.bookmarked[c]).length; });
      Object.keys(data.studied || {}).forEach(function(c) { studied += Object.keys(data.studied[c]).length; });
    }
    return { viewed: viewed, bookmarked: bookmarked, studied: studied, total: viewed };
  },

  getTopicCoverage(courseId) {
    var data = this._get();
    if (!data.viewed[courseId]) return {};
    return Object.keys(data.viewed[courseId]).reduce(function(acc, qid) {
      var topic = qid.split('_').slice(2, -1).join('_') || 'general';
      acc[topic] = (acc[topic] || 0) + 1;
      return acc;
    }, {});
  }
};
