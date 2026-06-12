async function initDashboard() {
  var user = Utils.getStorage('coderio_user');
  if (!user) return;

  var nameEl = document.getElementById('dashUserName');
  if (nameEl) nameEl.textContent = user.displayName || user.email || user.user_metadata?.full_name || 'User';

  updateWelcomeMessage();
  updateStats();
  updateStreak();
  loadRecentActivity();
  loadAchievements();
  initDailyGoals();
  await initCharts();
  initAnalyticsToggle();
}

function updateWelcomeMessage() {
  var hour = new Date().getHours();
  var greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';
  var el = document.getElementById('dashGreeting');
  if (el) el.textContent = greeting;
}

function getTotalTimeSpent() {
  // Primary: flat counter (global heartbeat in main.js saves to this)
  var total = 0;
  try { total = parseInt(localStorage.getItem('coderio_total_time') || '0', 10); } catch(e) {}
  // Fallback: per-course sum from lesson pages
  if (total === 0) {
    var cp = Utils.getStorage('course_progress', {});
    total = Object.keys(cp).reduce(function(sum, cid) { return sum + (cp[cid].timeSpent || 0); }, 0);
  }
  return total;
}

function updateStats() {
  var quizResultsObj = Utils.getStorage('quiz_results', {});
  var quizCorrect = 0, quizTotal = 0;
  Object.values(quizResultsObj).forEach(function(arr) {
    arr.forEach(function(q) { quizCorrect += q.score || 0; quizTotal += q.total || 0; });
  });
  var accuracy = quizTotal > 0 ? Math.round((quizCorrect / quizTotal) * 100) + '%' : '0%';
  setStat('statAvgAccuracy', accuracy);

  var stats = typeof LearningTracker !== 'undefined' ? LearningTracker.getTotalStats() : null;
  if (!stats) {
    var courseProgress = Utils.getStorage('course_progress', {});
    var courses = Utils.getStorage('courses_data', []);
    var courseIds = Object.keys(courseProgress);
    var totalCompleted = 0;
    courseIds.forEach(function(cid) {
      var p = courseProgress[cid];
      totalCompleted += (p.completed || []).length;
    });

    var activeCount = courseIds.filter(function(cid) {
      var p = courseProgress[cid];
      return p.status === 'active' || (!p.status && p.completed && p.completed.length > 0);
    }).length;

    var completedCount = courseIds.filter(function(cid) {
      return courseProgress[cid].status === 'completed';
    }).length;

    var quizCount = Object.values(quizResultsObj).reduce(function(sum, arr) { return sum + arr.length; }, 0);
    var typingHistory = Utils.getStorage('typing_history', []);

    setStat('statLearningProgress', totalCompleted > 0 ? Math.min(100, Math.round((totalCompleted / Math.max(courseIds.length * 5, 1)) * 100)) + '%' : '0%');
    setStat('statActiveCourses', activeCount || '0');
    setStat('statCompletedCourses', completedCount || '0');
    setStat('statTotalLessons', totalCompleted || '0');
    setStat('statTypingTests', typingHistory.length || '0');
    setStat('statTotalTime', formatTimeSpent(getTotalTimeSpent()));
    setStat('statAP', typeof AchievementSystem !== 'undefined' ? AchievementSystem.getUserAP() : 0);
    return;
  }

  setStat('statLearningProgress', stats.totalLessonsCompleted > 0 ? Math.min(100, Math.round((stats.totalLessonsCompleted / Math.max(Object.keys(Utils.getStorage('course_progress', {})).length * 5, 1)) * 100)) + '%' : '0%');
  setStat('statActiveCourses', stats.activeCourses || '0');
  setStat('statCompletedCourses', stats.completedCourses || '0');
  setStat('statTotalLessons', stats.totalModulesCompleted || '0');
  setStat('statTypingTests', stats.totalTypingTests || '0');
  setStat('statTotalTime', formatTimeSpent(getTotalTimeSpent()));
  setStat('statAP', typeof AchievementSystem !== 'undefined' ? AchievementSystem.getUserAP() : 0);
}

function setStat(id, val) {
  var el = document.getElementById(id);
  if (el) el.textContent = val;
}

function formatTimeSpent(ms) {
  var totalSec = Math.floor(ms / 1000);
  var h = Math.floor(totalSec / 3600);
  var m = Math.floor((totalSec % 3600) / 60);
  var s = totalSec % 60;
  if (h > 0) return h + 'h ' + m + 'm';
  if (m > 0) return m + 'm ' + s + 's';
  return s + 's';
}

function updateStreak() {
  var activities = Utils.getStorage('coderio_activity', []);
  var quizResults = Utils.getStorage('quiz_results', {});
  var typingHistory = Utils.getStorage('typing_history', []);

  var activeDates = new Set();
  activities.forEach(function(a) { if (a.time) activeDates.add(new Date(a.time).toDateString()); });
  Object.values(quizResults).forEach(function(arr) {
    arr.forEach(function(q) { if (q.date) activeDates.add(new Date(q.date).toDateString()); });
  });
  typingHistory.forEach(function(t) { if (t.date) activeDates.add(new Date(t.date).toDateString()); });

  var today = new Date();
  today.setHours(0, 0, 0, 0);
  var streak = 0;
  var check = new Date(today);
  while (activeDates.has(check.toDateString())) {
    streak++;
    check.setDate(check.getDate() - 1);
  }
  if (streak === 0 && activeDates.has(today.toDateString())) streak = 1;

  var el = document.getElementById('streakCount');
  if (el) el.textContent = streak;

  var daysEl = document.getElementById('streakDays');
  if (daysEl) {
    var names = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var html = '';
    for (var i = 6; i >= 0; i--) {
      var d = new Date(today);
      d.setDate(d.getDate() - i);
      html += '<div class="streak-day ' + (activeDates.has(d.toDateString()) ? 'active' : 'inactive') + '">' + names[d.getDay()] + '</div>';
    }
    daysEl.innerHTML = html;
  }
}

async function loadRecentActivity() {
  var activityList = document.getElementById('activityList');
  if (!activityList) return;

  var activities = Utils.getStorage('coderio_activity', []);
  if (activities.length === 0) {
    activityList.innerHTML = '<div class="empty-state" style="padding:2rem;text-align:center;color:var(--text-muted)"><i class="fas fa-history" style="font-size:2rem;margin-bottom:0.8rem;display:block"></i><p>No activity yet. Start learning to build your activity timeline.</p></div>';
    return;
  }

  var lessonsData = await Utils.fetchJSON('../data/lessons.json');

  function getLessonDisplay(type) {
    if (!type || type.indexOf('_') === -1) return null;
    var parts = type.split('_');
    var cid = parts[0];
    var mid = parseInt(parts[1]);
    if (!lessonsData || !lessonsData[cid]) return null;
    var mod = lessonsData[cid].modules.find(function(m) { return m.id === mid; });
    if (!mod) return null;
    return { courseTitle: lessonsData[cid].title || cid, moduleTitle: mod.title };
  }

  activityList.innerHTML = activities.slice(-10).reverse().map(function(a) {
    var display = getLessonDisplay(a.type);
    var icon = 'fa-book-open';
    var dotClass = 'blue';
    var text = a.text || '';

    if (a.type === 'started_lesson' || text === 'started_lesson') {
      if (display) {
        text = 'Started: ' + display.courseTitle + ' - ' + display.moduleTitle;
      } else {
        text = 'Started learning';
      }
      icon = 'fa-play-circle';
      dotClass = 'green';
    } else if (a.type === 'completed_lesson' || text === 'completed_lesson') {
      if (display) {
        text = 'Completed: ' + display.courseTitle + ' - ' + display.moduleTitle;
      } else {
        text = 'Completed a lesson';
      }
      icon = 'fa-check-circle';
      dotClass = 'green';
    } else if (a.type && a.type.indexOf('quiz_attempt') !== -1) {
      var parts = a.type.split('|');
      var scoreInfo = parts.length > 1 ? parts[1] : '';
      if (display) {
        text = 'Quiz: ' + display.courseTitle + ' - ' + display.moduleTitle + ' (' + scoreInfo + ')';
      } else {
        text = 'Quiz attempt ' + (scoreInfo ? '(' + scoreInfo + ')' : '');
      }
      icon = 'fa-question-circle';
      dotClass = 'purple';
    } else if (a.type === 'completed_course' || text === 'completed_course') {
      if (display) {
        text = 'Completed course: ' + display.courseTitle;
      } else {
        text = 'Completed a course';
      }
      icon = 'fa-trophy';
      dotClass = 'gold';
    } else if (a.type === 'completed_project' || text === 'completed_project') {
      text = 'Completed a project';
      icon = 'fa-code';
      dotClass = 'blue';
    }

    return '<div class="activity-item"><div class="activity-dot ' + dotClass + '"><i class="fas ' + icon + '"></i></div><div class="activity-content"><p>' + text + '</p><small>' + Utils.timeAgo(a.time) + '</small></div></div>';
  }).join('');
}

function loadAchievements() {
  var container = document.getElementById('achievementsContainer');
  if (!container) return;

  if (typeof AchievementSystem !== 'undefined') {
    var earned = AchievementSystem.getUserAchievements();
    var earnedIds = earned.map(function(a) { return a.id; });

    var html = '';
    var needed = AchievementSystem.ACHIEVEMENTS;
    needed.slice(0, 12).forEach(function(a) {
      var isEarned = earnedIds.indexOf(a.id) !== -1;
      html += '<div class="achievement-item ' + (isEarned ? 'earned' : 'locked') + '"><i class="fas ' + a.icon + '"></i><span>' + a.title + '</span></div>';
    });
    container.innerHTML = html + '<div style="grid-column:1/-1;text-align:center;margin-top:0.5rem"><a href="achievements.html" style="color:var(--primary);font-size:0.85rem">View all (' + earnedIds.length + '/' + AchievementSystem.ACHIEVEMENTS.length + ') →</a></div>';
  } else {
    container.innerHTML = '<div style="text-align:center;padding:1rem;color:var(--text-muted)"><p>Achievements system not loaded.</p></div>';
  }
}

function initDailyGoals() {
  if (typeof DailyGoals !== 'undefined') {
    DailyGoals.renderWidget('dailyGoalsWidget');
  }
}

async function initCharts() {
  if (typeof Chart === 'undefined') return;
  initWeeklyChart();
  await initCourseChart();
  initTypingChart();
}

function getActivityData(days) {
  var activities = Utils.getStorage('coderio_activity', []);
  var result = [];
  var now = new Date();
  for (var i = days - 1; i >= 0; i--) {
    var d = new Date(now);
    d.setDate(d.getDate() - i);
    var count = activities.filter(function(a) {
      if (!a.time) return false;
      var actDate = new Date(a.time);
      return actDate.getFullYear() === d.getFullYear() && actDate.getMonth() === d.getMonth() && actDate.getDate() === d.getDate();
    }).length;
    result.push({ date: d.toISOString().split('T')[0], count: count, label: days <= 8 ? d.toLocaleDateString('en-US', { weekday: 'short' }) : 'Day ' + (days - i) });
  }
  return result;
}

function initWeeklyChart() {
  var canvas = document.getElementById('weeklyChart');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');

  var data = getActivityData(7);
  var hasData = data.some(function(d) { return d.count > 0; });

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.map(function(d) { return d.label; }),
      datasets: [{
        label: 'Activities',
        data: hasData ? data.map(function(d) { return d.count; }) : [0, 0, 0, 0, 0, 0, 0],
        borderColor: '#06b6d4',
        backgroundColor: 'rgba(6,182,212,0.1)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#06b6d4',
        pointRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, grid: { color: '#f1f5f9' } },
        x: { grid: { display: false } }
      }
    }
  });
}

async function initCourseChart() {
  var canvas = document.getElementById('courseChart');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');

  var courseProgress = Utils.getStorage('course_progress', {});
  var courseIds = Object.keys(courseProgress);

  var courseData = await Utils.fetchJSON('../data/courses.json');
  var totalCourses = courseData ? courseData.length : courseIds.length;

  var completed = courseIds.filter(function(cid) {
    return courseProgress[cid].status === 'completed';
  }).length;
  var active = courseIds.filter(function(cid) {
    return courseProgress[cid].status === 'active' || (!courseProgress[cid].status && courseProgress[cid].completed && courseProgress[cid].completed.length > 0);
  }).length;
  var paused = courseIds.filter(function(cid) {
    return courseProgress[cid].status === 'paused';
  }).length;
  var notStarted = Math.max(0, totalCourses - completed - active - paused);

  var labels = [];
  var data = [];
  var colors = [];

  if (notStarted > 0) { labels.push('Not Started'); data.push(notStarted); colors.push('#94a3b8'); }
  if (active > 0) { labels.push('Active'); data.push(active); colors.push('#06b6d4'); }
  if (paused > 0) { labels.push('Paused'); data.push(paused); colors.push('#eab308'); }
  if (completed > 0) { labels.push('Completed'); data.push(completed); colors.push('#22c55e'); }

  if (data.length === 0) {
    labels = ['No Courses'];
    data = [1];
    colors = ['rgba(6,182,212,0.2)'];
  }

  var total = data.reduce(function(s, v) { return s + v; }, 0);

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: colors,
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '65%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            boxWidth: 12,
            padding: 12,
            font: { size: 12 },
            generateLabels: function(chart) {
              var ds = chart.data.datasets[0];
              return chart.data.labels.map(function(label, i) {
                var val = ds.data[i];
                var pct = total > 0 ? Math.round((val / total) * 100) : 0;
                return {
                  text: label + ': ' + val + ' (' + pct + '%)',
                  fillStyle: ds.backgroundColor[i],
                  strokeStyle: ds.backgroundColor[i],
                  index: i
                };
              });
            }
          }
        }
      }
    }
  });
}

function initTypingChart() {
  var canvas = document.getElementById('typingChart');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');

  var typingHistory = Utils.getStorage('typing_history', []);
  var recent = typingHistory.slice(-10);
  var labels = recent.map(function(_, i) { return '#' + (i + 1); });
  var data = recent.map(function(t) { return t.wpm || 0; });

  if (data.length === 0) {
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['No Data'],
        datasets: [{
          label: 'WPM',
          data: [0],
          backgroundColor: 'rgba(6,182,212,0.2)',
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, grid: { color: '#f1f5f9' } },
          x: { grid: { display: false } }
        }
      }
    });
    return;
  }

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'WPM',
        data: data,
        backgroundColor: 'rgba(6,182,212,0.7)',
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, grid: { color: '#f1f5f9' } },
        x: { grid: { display: false } }
      }
    }
  });
}

function initAnalyticsToggle() {
  var weeklyBtn = document.getElementById('toggleWeekly');
  var monthlyBtn = document.getElementById('toggleMonthly');
  var todayBtn = document.getElementById('toggleToday');

  function setActive(btn) {
    document.querySelectorAll('.analytics-toggle button').forEach(function(b) { b.classList.remove('active'); });
    if (btn) btn.classList.add('active');
  }

  function setTitle(text) {
    var titleEl = document.getElementById('analyticsTitle');
    if (titleEl) titleEl.innerHTML = '<i class="fas fa-chart-line" style="color:var(--primary)"></i> ' + text;
  }

  if (weeklyBtn) {
    weeklyBtn.addEventListener('click', function() {
      setActive(this);
      var old = Chart.getChart('weeklyChart');
      if (old) old.destroy();
      initWeeklyChart();
      setTitle('Weekly Activity');
    });
  }
  if (monthlyBtn) {
    monthlyBtn.addEventListener('click', function() {
      setActive(this);
      var old = Chart.getChart('weeklyChart');
      if (old) old.destroy();
      initMonthlyChart();
      setTitle('Monthly Activity');
    });
  }
  if (todayBtn) {
    todayBtn.addEventListener('click', function() {
      setActive(this);
      var old = Chart.getChart('weeklyChart');
      if (old) old.destroy();
      initTodayChart();
      setTitle('Today\'s Activity');
    });
  }
}

function initMonthlyChart() {
  var canvas = document.getElementById('weeklyChart');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');

  var data = getActivityData(30);
  var hasData = data.some(function(d) { return d.count > 0; });

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.map(function(d) { return d.date.slice(5); }),
      datasets: [{
        label: 'Activities',
        data: hasData ? data.map(function(d) { return d.count; }) : new Array(30).fill(0),
        backgroundColor: 'rgba(6,182,212,0.6)',
        borderRadius: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, grid: { color: '#f1f5f9' } },
        x: { grid: { display: false }, ticks: { maxTicksLimit: 10 } }
      }
    }
  });
}

function initTodayChart() {
  var canvas = document.getElementById('weeklyChart');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');

  var activities = Utils.getStorage('coderio_activity', []);
  var now = new Date();
  var todayActivities = activities.filter(function(a) {
    if (!a.time) return false;
    var actDate = new Date(a.time);
    return actDate.getFullYear() === now.getFullYear() && actDate.getMonth() === now.getMonth() && actDate.getDate() === now.getDate();
  });

  var hours = [];
  for (var i = 0; i < 24; i++) {
    var hourStr = (i < 10 ? '0' : '') + i;
    hours.push({ label: hourStr + ':00', count: 0 });
  }

  todayActivities.forEach(function(a) {
    var d = new Date(a.time);
    var h = d.getHours();
    if (h >= 0 && h < 24) hours[h].count++;
  });

  var hasData = hours.some(function(h) { return h.count > 0; });

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: hours.map(function(h) { return h.label; }),
      datasets: [{
        label: 'Activities',
        data: hasData ? hours.map(function(h) { return h.count; }) : new Array(24).fill(0),
        backgroundColor: 'rgba(6,182,212,0.6)',
        borderRadius: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, grid: { color: '#f1f5f9' } },
        x: { grid: { display: false }, ticks: { maxTicksLimit: 12 } }
      }
    }
  });
}

function addActivity(text) {
  var activities = Utils.getStorage('coderio_activity', []);
  activities.push({ text: text, time: new Date().toISOString() });
  Utils.setStorage('coderio_activity', activities);
  loadRecentActivity();
}
