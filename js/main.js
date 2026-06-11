document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initCurrentPage();
  initAuthCheck();
  checkAchievements();
  updateCourseCardProgress();
  updateCopyrightYear();
});

function initNavbar() {
  const toggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  document.addEventListener('click', (e) => {
    if (navLinks && !e.target.closest('.navbar')) {
      navLinks.classList.remove('open');
    }
  });

  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', Utils.throttle(() => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    }, 100));
  }

  if (navLinks) {
    var quizLi = document.createElement('li');
    var quizA = document.createElement('a');
    quizA.href = (window.location.pathname.includes('/dashboard/') || window.location.pathname.includes('/auth/') ? '../' : '') + 'quiz-hub.html';
    quizA.innerHTML = 'Quiz';
    quizLi.appendChild(quizA);
    var practiceLink = navLinks.querySelector('a[href*="Practice"]');
    if (practiceLink && practiceLink.parentElement) {
      practiceLink.parentElement.parentElement.insertBefore(quizLi, practiceLink.parentElement.nextSibling);
    } else {
      navLinks.appendChild(quizLi);
    }
  }

  document.querySelectorAll('.nav-links a').forEach(link => {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const href = link.getAttribute('href');
    if (href === currentPath) {
      link.classList.add('active');
    }
  });
}

function initCurrentPage() {
  const page = document.body.dataset.page;
  if (page && typeof window[`init${page}`] === 'function') {
    window[`init${page}`]();
  }
}

function rel(path) {
  const dirs = window.location.pathname.split('/').filter(s => s && !s.includes('.'));
  return '../'.repeat(dirs.length) + path.replace(/^\.\.\//, '');
}

function initAuthCheck() {
  const user = Utils.getStorage('coderio_user');
  const navAuth = document.querySelector('.nav-auth');

  if (!navAuth) return;

  if (user) {
    navAuth.innerHTML = `
      <div class="nav-user">
        <div class="nav-user-avatar">
          ${user.avatar ? `<img src="${user.avatar}" alt="">` : Utils.getInitials(user.name || 'User')}
        </div>
        <span class="nav-user-name">${user.name || 'User'}</span>
        <div class="nav-user-dropdown">
          <a href="${rel('../dashboard/dashboard.html')}"><i class="fas fa-columns"></i> Dashboard</a>
          <a href="${rel('../auth/profile.html')}"><i class="fas fa-user"></i> Profile</a>
          <a href="#" id="logoutBtn"><i class="fas fa-sign-out-alt"></i> Logout</a>
        </div>
      </div>
    `;

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (typeof signOut === 'function') signOut();
        else { Utils.removeStorage('coderio_user'); window.location.href = rel('../index.html'); }
      });
    }
  } else {
    navAuth.innerHTML = `
      <a href="${rel('../auth/login.html')}" class="btn btn-ghost btn-sm">Log In</a>
      <a href="${rel('../auth/register.html')}" class="btn btn-primary btn-sm">Sign Up</a>
    `;
  }
}
function checkAchievements() {
  const user = Utils.getStorage('coderio_user');
  if (!user) return;

  let earned = Utils.getStorage('coderio_achievements', []);
  const courseProgress = Utils.getStorage('course_progress', {});
  const quizResults = Utils.getStorage('quiz_results', {});
  const typingHistory = Utils.getStorage('typing_history', []);
  const streak = Utils.getStorage('coderio_streak', 0);
  const projectSubmissions = Utils.getStorage('project_submissions', {});
  const totalLessons = Object.values(courseProgress).reduce((sum, p) => sum + (p.completed || []).length, 0);
  const totalQuizzes = Object.values(quizResults).reduce((sum, arr) => sum + arr.length, 0);
  const totalTyping = typingHistory.length;
  const totalProjects = Object.keys(projectSubmissions).length;
  const courseIds = Object.keys(courseProgress);

  const ACHIEVEMENTS = {
    FirstLogin: { check: () => !!user, label: 'First Login' },
    FirstCourse: { check: () => courseIds.length >= 1, label: 'First Course' },
    FirstQuiz: { check: () => totalQuizzes >= 1, label: 'First Quiz' },
    '10Lessons': { check: () => totalLessons >= 10, label: '10 Lessons' },
    '50Lessons': { check: () => totalLessons >= 50, label: '50 Lessons' },
    '100Lessons': { check: () => totalLessons >= 100, label: '100 Lessons' },
    '7DayStreak': { check: () => streak >= 7, label: '7-Day Streak' },
    '30DayStreak': { check: () => streak >= 30, label: '30-Day Streak' },
    '100Problems': { check: () => totalQuizzes >= 100, label: '100 Problems' },
    '500Problems': { check: () => totalQuizzes >= 500, label: '500 Problems' },
    TypingMaster: { check: () => {
      const best = typingHistory.reduce((max, t) => Math.max(max, t.wpm || 0), 0);
      return best >= 80;
    }, label: 'Typing Master' },
    ProjectBuilder: { check: () => totalProjects >= 5, label: 'Project Builder' }
  };

  Object.entries(ACHIEVEMENTS).forEach(([id, ach]) => {
    if (!earned.includes(id) && ach.check()) {
      earned.push(id);
      Utils.showToast(`Achievement unlocked: ${ach.label}!`, 'success');
    }
  });

  Utils.setStorage('coderio_achievements', earned);
}

function updateCopyrightYear() {
  document.querySelectorAll('.footer-bottom').forEach(el => {
    el.innerHTML = el.innerHTML.replace(/\d{4}/, new Date().getFullYear());
  });
}

function updateCourseCardProgress() {
  var progress = Utils.getStorage('course_progress', {});
  if (Object.keys(progress).length === 0) return;

  document.querySelectorAll('.course-card').forEach(function(card) {
    var href = card.getAttribute('href');
    if (!href) return;
    var cid = href.replace(/.*\/courses\//, '').replace(/\.html$/, '').replace(/.*\//, '');
    var entry = progress[cid];
    if (!entry) return;

    var completedMods = (entry.modulesCompleted || []).length;
    var totalMods = Math.max(completedMods + 5, 10);
    var pct = Math.min(100, Math.round((completedMods / totalMods) * 100));

    var fill = card.querySelector('.progress-fill');
    if (fill) {
      fill.style.width = pct + '%';
      fill.style.transition = 'width 0.6s ease';
    }

    var btn = card.querySelector('.btn-continue, .card-duration + span, .course-card-footer span:last-child');
    if (btn) {
      var status = entry.status || 'active';
      if (pct >= 100) {
        btn.textContent = 'Completed';
        btn.className = 'badge badge-success';
      } else if (status === 'paused') {
        btn.textContent = 'Resume';
        btn.className = 'badge badge-warning';
      } else if (completedMods > 0) {
        btn.textContent = 'Continue (' + pct + '%)';
      }
    }
  });
}
