var Leaderboard = {
  PERIODS: { DAILY: 'daily', WEEKLY: 'weekly', MONTHLY: 'monthly', ALL_TIME: 'all_time' },

  getRankings(period) {
    var rankings = this._computeRankings();
    var now = Date.now();

    switch (period) {
      case this.PERIODS.DAILY:
        rankings = rankings.filter(function(r) { return r.lastActivity && (now - new Date(r.lastActivity).getTime()) < 86400000; });
        break;
      case this.PERIODS.WEEKLY:
        rankings = rankings.filter(function(r) { return r.lastActivity && (now - new Date(r.lastActivity).getTime()) < 604800000; });
        break;
      case this.PERIODS.MONTHLY:
        rankings = rankings.filter(function(r) { return r.lastActivity && (now - new Date(r.lastActivity).getTime()) < 2592000000; });
        break;
      case this.PERIODS.ALL_TIME:
      default:
        break;
    }

    rankings.sort(function(a, b) { return b.rankScore - a.rankScore; });
    return rankings.map(function(r, i) { r.rank = i + 1; return r; });
  },

  _computeRankings() {
    var progress = Utils.getStorage('course_progress', {});
    var quizAttempts = Utils.getStorage('quiz_attempts', {});
    var typingHistory = Utils.getStorage('typing_history', []);
    var rankings = [];
    var user = Utils.getStorage('coderio_user', {});

    var totalAccuracy = 0;
    var accuracyCount = 0;
    Object.keys(quizAttempts).forEach(function(qid) {
      var attempts = quizAttempts[qid];
      attempts.forEach(function(a) {
        var pct = a.total > 0 ? a.score / a.total : 0;
        totalAccuracy += pct;
        accuracyCount++;
      });
    });
    var avgAccuracy = accuracyCount > 0 ? totalAccuracy / accuracyCount : 0;

    var totalDifficultyWeight = 0;
    var totalModules = 0;
    var totalTimeEfficiency = 0;
    var lastActivity = null;
    var courseCount = 0;

    Object.keys(progress).forEach(function(cid) {
      var c = progress[cid];
      totalModules += (c.modulesCompleted || []).length;
      totalDifficultyWeight += Math.min((c.modulesCompleted || []).length * 5, 100);
      totalTimeEfficiency += (c.timeSpent || 0) > 0 ? ((c.modulesCompleted || []).length * 3600000) / (c.timeSpent || 1) : 0;
      if (c.lastActivity && (!lastActivity || c.lastActivity > lastActivity)) lastActivity = c.lastActivity;
      courseCount++;
    });

    var totalTypingTests = typingHistory.length;
    var avgTypingWpm = typingHistory.length > 0 ? typingHistory.reduce(function(s, t) { return s + (t.wpm || 0); }, 0) / typingHistory.length : 0;

    var completionRate = courseCount > 0 ? Object.keys(progress).filter(function(cid) { return progress[cid].status === 'completed'; }).length / courseCount : 0;

    var rankScore = Math.round(
      (avgAccuracy * 40) +
      (Math.min(totalDifficultyWeight, 100) * 20) +
      (completionRate * 100 * 25) +
      (Math.min(totalTimeEfficiency, 10) * 15)
    );

    var displayName = user.displayName || user.email || user.user_metadata?.full_name || 'Learner';
    var avatarUrl = user.user_metadata?.avatar_url || '';

    rankings.push({
      userId: user.id || 'local_user',
      displayName: displayName,
      avatarUrl: avatarUrl,
      rankScore: rankScore,
      accuracy: Math.round(avgAccuracy * 100),
      difficultyWeight: Math.round(totalDifficultyWeight),
      completionRate: Math.round(completionRate * 100),
      timeEfficiency: Math.round(totalTimeEfficiency * 100) / 100,
      modulesCompleted: totalModules,
      coursesCompleted: Object.keys(progress).filter(function(cid) { return progress[cid].status === 'completed'; }).length,
      typingTests: totalTypingTests,
      avgWpm: Math.round(avgTypingWpm),
      lastActivity: lastActivity
    });

    return rankings;
  },

  getUserRank(period) {
    var rankings = this.getRankings(period);
    var userIdx = rankings.findIndex(function(r) { return r.userId === 'local_user'; });
    return userIdx !== -1 ? rankings[userIdx] : null;
  },

  renderLeaderboard(containerId, period) {
    var container = document.getElementById(containerId);
    if (!container) return;

    var rankings = this.getRankings(period);

    if (rankings.length === 0) {
      container.innerHTML = '<div style="text-align:center;padding:2rem;color:var(--text-muted)"><i class="fas fa-ranking-star" style="font-size:2rem;margin-bottom:0.5rem;display:block"></i>No activity yet. Start learning to appear on the leaderboard!</div>';
      return;
    }

    var html = '<div class="leaderboard-list">';
    rankings.forEach(function(r, i) {
      var medal = '';
      if (i === 0) medal = '🥇';
      else if (i === 1) medal = '🥈';
      else if (i === 2) medal = '🥉';

      var initials = r.displayName.split(' ').map(function(n) { return n[0]; }).join('').toUpperCase().slice(0, 2);
      var avatarHtml = r.avatarUrl
        ? '<img src="' + Utils.sanitize(r.avatarUrl) + '" alt="" style="width:40px;height:40px;border-radius:50%;object-fit:cover">'
        : '<div style="width:40px;height:40px;border-radius:50%;background:var(--primary);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.9rem">' + initials + '</div>';

      var isUser = r.userId === 'local_user';

      html += '<div class="leaderboard-row' + (isUser ? ' is-user' : '') + '">'
        + '<div class="lb-rank">' + (medal || '#' + r.rank) + '</div>'
        + '<div class="lb-avatar">' + avatarHtml + '</div>'
        + '<div class="lb-info"><div class="lb-name">' + Utils.sanitize(r.displayName) + '</div>'
        + '<div class="lb-stats">' + r.modulesCompleted + ' modules | ' + r.coursesCompleted + ' courses</div></div>'
        + '<div class="lb-score" title="Score breakdown: ' + r.accuracy + '% accuracy, ' + r.completionRate + '% completion, ' + r.difficultyWeight + ' difficulty">' + r.rankScore.toLocaleString() + ' <small>pts</small></div>'
        + '</div>';
    });
    html += '</div>';
    container.innerHTML = html;
  }
};
