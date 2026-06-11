async function loadCourses() {
  const grid = document.getElementById('courseGrid');
  if (!grid) return;

  const data = await Utils.fetchJSON('data/courses.json');
  if (!data) return;

  grid.innerHTML = data.map(course => `
    <a href="${course.link || '/courses/' + course.id + '.html'}" class="course-card">
      <img src="${course.icon}" alt="${course.title}" loading="lazy">
      <h2>${course.title}</h2>
      <p>${course.description}</p>
      <span class="course-level course-level-${course.level}">${course.level}</span>
    </a>
  `).join('');
}

async function loadHomeCourses() {
  const grid = document.getElementById('homeCourseGrid');
  if (!grid) return;

  const data = await Utils.fetchJSON('data/courses.json');
  if (!data) return;

  const levelBadge = { beginner: 'badge-primary', intermediate: 'badge-warning', advanced: 'badge-error' };
  const levelLabel = l => l.charAt(0).toUpperCase() + l.slice(1);
  const durationLabel = d => {
    const n = parseInt(d);
    return n ? n + (d.includes('week') ? ' Weeks' : ' modules') : 'Ongoing';
  };

  grid.innerHTML = data.map(course => {
    const modCount = course.modules ? course.modules.length : 0;
    return `
      <a href="${course.link || '/courses/' + course.id + '.html'}" class="course-card">
        <div class="course-card-header">
          <img src="${course.icon}" alt="${course.title}" loading="lazy">
          <div class="course-card-header-text">
            <h2>${course.title}</h2>
            <div class="course-card-meta">
              <span class="badge ${levelBadge[course.level] || 'badge-primary'}">${levelLabel(course.level)}</span>
              <span class="badge badge-success">${course.duration || modCount + ' modules'}</span>
            </div>
          </div>
        </div>
        <p>${course.description}</p>
        <div class="course-card-progress">
          <div class="progress-bar"><div class="progress-fill" style="width:0%"></div></div>
        </div>
        <div class="course-card-footer">
          <span class="card-duration"><i class="far fa-clock"></i> ${modCount} modules</span>
          <span class="btn-continue">Start Learning</span>
        </div>
      </a>
    `;
  }).join('');
}

function initCoursePage() {
  const courseId = document.body.dataset.course;
  if (!courseId) return;

  loadCourseData(courseId);
}

async function loadCourseData(courseId) {
  const data = await Utils.fetchJSON('data/courses.json');
  if (!data) return;

  const course = data.find(c => c.id === courseId);
  if (!course) return;

  document.title = course.title + ' - CodeRio';

  const heroEl = document.getElementById('courseHero');
  if (heroEl) {
    heroEl.innerHTML = `
      <div class="course-hero-content">
        <h1>${course.title}</h1>
        <p>${course.longDescription || course.description}</p>
        <div class="course-meta">
          <div class="course-meta-item"><i class="fas fa-signal"></i> ${course.level}</div>
          <div class="course-meta-item"><i class="fas fa-clock"></i> ${course.duration || 'Ongoing'}</div>
          <div class="course-meta-item"><i class="fas fa-book"></i> ${course.modules ? course.modules.length : 0} Modules</div>
        </div>
      </div>
      <div class="course-hero-image">
        <img src="${course.icon}" alt="${course.title}">
      </div>
    `;
  }

  const modulesEl = document.getElementById('courseModules');
  if (modulesEl && course.modules) {
    modulesEl.innerHTML = course.modules.map((mod, i) => `
      <div class="module-card">
        <h3><span class="module-number">${i + 1}</span> ${mod.title}</h3>
        <p>${mod.description}</p>
      </div>
    `).join('');
  }
}

function updateCourseProgress(courseId, moduleIndex) {
  const progress = Utils.getStorage('course_progress', {});
  if (!progress[courseId]) progress[courseId] = { completed: [] };
  if (!progress[courseId].completed.includes(moduleIndex)) {
    progress[courseId].completed.push(moduleIndex);
  }
  Utils.setStorage('course_progress', progress);
  addActivity(`Continued learning in ${courseId}`);
}
