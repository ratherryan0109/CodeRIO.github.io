function initCoursePage() {
  var courseId = document.body.dataset.course;
  if (!courseId) return;

  var heroContent = document.querySelector('.course-hero-content');
  if (!heroContent) return;

  var existingActions = heroContent.querySelector('.course-actions');
  if (existingActions) existingActions.remove();

  var actionsDiv = document.createElement('div');
  actionsDiv.className = 'course-actions';
  actionsDiv.style.cssText = 'display:flex;gap:0.8rem;margin-top:1.5rem;flex-wrap:wrap';

  var actionBtn = document.createElement('button');
  actionBtn.className = 'btn btn-primary';
  actionBtn.id = 'courseActionBtn';

  var bookmarkBtn = document.createElement('button');
  bookmarkBtn.className = 'btn btn-ghost';
  bookmarkBtn.innerHTML = '<i class="fas fa-bookmark"></i> Bookmark';

  var resetBtn = document.createElement('button');
  resetBtn.className = 'btn btn-ghost';
  resetBtn.innerHTML = '<i class="fas fa-undo"></i> Reset Progress';
  resetBtn.style.cssText = 'color:var(--error);border-color:rgba(239,68,68,0.3);font-size:0.85rem';

  var enrolledData = Utils.getStorage('course_progress', {});
  var courseEntry = enrolledData[courseId];
  var status = 'not_started';

  if (courseEntry) {
    status = courseEntry.status || 'active';
    if (status === 'active') {
      actionBtn.innerHTML = '<i class="fas fa-pause"></i> Pause Course';
      actionBtn.style.background = 'var(--warning)';
    } else if (status === 'paused') {
      actionBtn.innerHTML = '<i class="fas fa-play-circle"></i> Continue Reading';
      actionBtn.className = 'btn btn-success';
    } else if (status === 'completed') {
      actionBtn.innerHTML = '<i class="fas fa-check-circle"></i> Completed';
      actionBtn.disabled = true;
      actionBtn.style.opacity = '0.7';
      var retryBtn = document.createElement('button');
      retryBtn.className = 'btn btn-ghost';
      retryBtn.innerHTML = '<i class="fas fa-redo"></i> Retry Course';
      retryBtn.style.cssText = 'color:var(--primary);border-color:rgba(6,182,212,0.3);font-size:0.85rem';
      retryBtn.addEventListener('click', function() {
        if (!confirm('Retry this course? Your progress will be reset.')) return;
        var progress = Utils.getStorage('course_progress', {});
        delete progress[courseId];
        Utils.setStorage('course_progress', progress);
        window.location.href = '../lesson.html?course=' + courseId + '&module=1';
      });
      actionsDiv.appendChild(retryBtn);
    }
  } else {
    actionBtn.innerHTML = '<i class="fas fa-play-circle"></i> Start Learning';
  }

  actionBtn.addEventListener('click', function() {
    var progress = Utils.getStorage('course_progress', {});
    var entry = progress[courseId];

    if (!entry) {
      progress[courseId] = {
        completed: [],
        modulesCompleted: [],
        lessonsCompleted: [],
        status: 'active',
        startedAt: new Date().toISOString(),
        lastActivity: new Date().toISOString(),
        timeSpent: 0,
        currentModule: 1
      };
      Utils.setStorage('course_progress', progress);
      updateCourseStorage(progress, courseId);
      Utils.showToast('Course added to My Courses! Start your learning journey.', 'success');
      this.innerHTML = '<i class="fas fa-pause"></i> Pause Course';
      this.style.background = 'var(--warning)';
      this.className = 'btn btn-primary';
    } else if (entry.status === 'active') {
      entry.status = 'paused';
      entry.pausedAt = new Date().toISOString();
      Utils.setStorage('course_progress', progress);
      this.innerHTML = '<i class="fas fa-play-circle"></i> Continue Reading';
      this.className = 'btn btn-success';
      this.style.background = '';
      Utils.showToast('Course paused. Take a break and come back stronger!', 'info');
    } else if (entry.status === 'paused') {
      entry.status = 'active';
      entry.resumedAt = new Date().toISOString();
      entry.lastActivity = new Date().toISOString();
      Utils.setStorage('course_progress', progress);
      this.innerHTML = '<i class="fas fa-pause"></i> Pause Course';
      this.style.background = 'var(--warning)';
      this.className = 'btn btn-primary';
      Utils.showToast('Welcome back! You got this, keep going!', 'success');
    }
  });

  bookmarkBtn.addEventListener('click', function() {
    var title = document.querySelector('.course-hero-content h1')?.textContent || courseId;
    if (typeof addBookmark === 'function') {
      addBookmark(title, 'Course', '../courses/' + courseId + '.html');
    } else {
      var bookmarks = Utils.getStorage('coderio_bookmarks', []);
      if (bookmarks.some(function(b) { return b.url === '../courses/' + courseId + '.html'; })) {
        Utils.showToast('Already bookmarked!', 'info');
        return;
      }
      bookmarks.push({ id: 'bm_' + Date.now(), title: title, type: 'Course', url: '../courses/' + courseId + '.html', createdAt: new Date().toISOString() });
      Utils.setStorage('coderio_bookmarks', bookmarks);
      Utils.showToast('Bookmarked!', 'success');
    }
  });

  resetBtn.addEventListener('click', function() {
    if (!confirm('Reset all progress for this course? This cannot be undone.')) return;
    var progress = Utils.getStorage('course_progress', {});
    delete progress[courseId];
    Utils.setStorage('course_progress', progress);
    actionBtn.innerHTML = '<i class="fas fa-play-circle"></i> Start Learning';
    actionBtn.className = 'btn btn-primary';
    actionBtn.style.background = '';
    actionBtn.disabled = false;
    actionBtn.style.opacity = '1';
    Utils.showToast('Progress reset for this course.', 'info');
    location.reload();
  });

  actionsDiv.appendChild(actionBtn);
  actionsDiv.appendChild(bookmarkBtn);
  actionsDiv.appendChild(resetBtn);
  heroContent.appendChild(actionsDiv);

  function updateCourseStorage(progress, cid) {
    var title = document.querySelector('.course-hero-content h1')?.textContent || cid;
    var courses = Utils.getStorage('courses_data', []);
    if (!Array.isArray(courses)) courses = [];
    if (!courses.some(function(c) { return c.id === cid; })) {
      courses.push({ id: cid, title: title, icon: 'fas fa-book', color: '#06b6d4' });
      Utils.setStorage('courses_data', courses);
    }
  }
}

document.addEventListener('DOMContentLoaded', function() {
  if (typeof Utils !== 'undefined' && document.body.dataset.page === 'Course') {
    initCoursePage();
  }
});
