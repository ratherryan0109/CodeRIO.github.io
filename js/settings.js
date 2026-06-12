async function initSettings() {
  const user = await requireAuth();
  if (!user) return;
  initSettingsNav();
  initProfileSection();
  initAccountSection();
  initSecuritySection();
  initLearningPrefs();
  initNotifications();
  initAppearance();
  initConnectedAccounts();
  initPrivacySection();
  initDataExport();
  initProgressSettings();
  initSubscription();
  initQuestionBanks();
  initAdvanced();
}

function initSettingsNav() {
  const items = document.querySelectorAll('.settings-nav-item');
  const sections = document.querySelectorAll('.settings-section');
  items.forEach(item => {
    item.addEventListener('click', function() {
      items.forEach(i => i.classList.remove('active'));
      this.classList.add('active');
      sections.forEach(s => s.classList.remove('active'));
      const target = document.getElementById(this.dataset.section);
      if (target) target.classList.add('active');
    });
  });
}

function initProfileSection() {
  const user = Utils.getStorage('coderio_user', {});
  const nameInput = document.getElementById('settingsName');
  const bioInput = document.getElementById('settingsBio');
  const avatarInput = document.getElementById('settingsAvatar');
  const preview = document.getElementById('settingsAvatarPreview');

  if (nameInput) nameInput.value = user.name || '';
  if (bioInput) bioInput.value = user.bio || '';
  if (preview) {
    if (user.avatar) {
      preview.src = user.avatar;
      preview.style.display = 'block';
    } else {
      preview.style.display = 'none';
    }
  }

  if (avatarInput) {
    avatarInput.addEventListener('input', function() {
      if (preview && this.value) {
        preview.src = this.value;
        preview.style.display = 'block';
      } else if (preview) {
        preview.style.display = 'none';
      }
    });
  }

  const form = document.getElementById('settingsProfileForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const newName = nameInput ? nameInput.value.trim() : '';
      if (!newName) { Utils.showToast('Name is required.', 'error'); return; }
      user.name = newName;
      user.bio = bioInput ? bioInput.value.trim() : '';
      user.avatar = avatarInput ? avatarInput.value.trim() : '';
      Utils.setStorage('coderio_user', user);
      Utils.showToast('Profile updated!', 'success');
    });
  }
}

function initAccountSection() {
  const user = Utils.getStorage('coderio_user', {});
  const emailInput = document.getElementById('settingsEmail');
  const usernameInput = document.getElementById('settingsUsername');
  if (emailInput) emailInput.value = user.email || '';
  if (usernameInput) usernameInput.value = (user.email || '').split('@')[0] || '';
}

function initSecuritySection() {
  const form = document.getElementById('settingsPasswordForm');
  if (form) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      const current = document.getElementById('settingsCurrentPassword')?.value || '';
      const newPass = document.getElementById('settingsNewPassword')?.value || '';
      const confirm = document.getElementById('settingsConfirmPassword')?.value || '';
      if (!current || !newPass || !confirm) { Utils.showToast('Fill in all password fields.', 'error'); return; }
      if (newPass.length < 6) { Utils.showToast('Password must be at least 6 characters.', 'error'); return; }
      if (newPass !== confirm) { Utils.showToast('Passwords do not match.', 'error'); return; }
      try {
        const userFirebase = firebase.auth().currentUser;
        if (userFirebase) {
          const credential = firebase.auth.EmailAuthProvider.credential(userFirebase.email, current);
          await userFirebase.reauthenticateWithCredential(credential);
          await userFirebase.updatePassword(newPass);
        } else {
          Utils.showToast('Firebase not available. Password not saved.', 'warning');
        }
        Utils.showToast('Password updated!', 'success');
        form.reset();
      } catch (err) {
        if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
          Utils.showToast('Current password is incorrect.', 'error');
        } else {
          Utils.showToast(err.message || 'Failed to update password.', 'error');
        }
      }
    });
  }

  const mfaToggle = document.getElementById('toggleMfa');
  if (mfaToggle) {
    const mfaPref = Utils.getStorage('mfa_enabled', false);
    mfaToggle.checked = mfaPref;
    mfaToggle.addEventListener('change', function() {
      Utils.setStorage('mfa_enabled', this.checked);
      Utils.showToast(this.checked ? '2FA enabled' : '2FA disabled', 'success');
    });
  }
}

function initLearningPrefs() {
  const cards = document.querySelectorAll('.pref-card');
  const savedPref = Utils.getStorage('learning_pref', 'text');
  cards.forEach(card => {
    const pref = card.querySelector('h4')?.textContent?.toLowerCase().replace(/[^a-z]/g, '') || '';
    if (pref.includes(savedPref)) card.classList.add('selected');
    card.addEventListener('click', function() {
      cards.forEach(c => c.classList.remove('selected'));
      this.classList.add('selected');
      const val = this.querySelector('h4')?.textContent?.toLowerCase().replace(/[^a-z]/g, '') || 'text';
      Utils.setStorage('learning_pref', val);
    });
  });

  var lessonGoal = document.getElementById('dailyLessonGoal');
  var practiceGoal = document.getElementById('dailyPracticeGoal');
  if (typeof DailyGoals !== 'undefined') {
    var cfg = DailyGoals.getGoals();
    if (lessonGoal) lessonGoal.value = cfg.lessons;
    if (lessonGoal) {
      lessonGoal.addEventListener('change', function() {
        var g = DailyGoals.getGoals();
        g.lessons = parseInt(this.value) || 1;
        DailyGoals.saveGoals(g);
      });
    }
  } else {
    if (lessonGoal) lessonGoal.value = 3;
  }
  if (practiceGoal) {
    practiceGoal.value = Utils.getStorage('daily_practice_mins', 30);
    practiceGoal.addEventListener('change', function() {
      Utils.setStorage('daily_practice_mins', parseInt(this.value) || 30);
    });
  }
}

function initNotifications() {
  const toggles = document.querySelectorAll('.settings-section.notifications .toggle-switch input');
  const prefs = Utils.getStorage('notification_prefs', {});

  if (typeof ReminderSystem !== 'undefined') {
    var reminderPrefs = ReminderSystem.getPreferences();
    var pausedCourseToggle = document.getElementById('togglePausedReminders');
    var streakReminderToggle = document.getElementById('toggleStreakReminder');
    var reminderInterval = document.getElementById('reminderInterval');

    if (pausedCourseToggle) {
      pausedCourseToggle.checked = reminderPrefs.pausedCourse;
      pausedCourseToggle.addEventListener('change', function() {
        var prefs = ReminderSystem.getPreferences();
        prefs.pausedCourse = this.checked;
        ReminderSystem.savePreferences(prefs);
      });
    }
    if (streakReminderToggle) {
      streakReminderToggle.checked = reminderPrefs.streakReminder;
      streakReminderToggle.addEventListener('change', function() {
        var prefs = ReminderSystem.getPreferences();
        prefs.streakReminder = this.checked;
        ReminderSystem.savePreferences(prefs);
      });
    }
    if (reminderInterval) {
      reminderInterval.value = reminderPrefs.intervalDays || 7;
      reminderInterval.addEventListener('change', function() {
        var prefs = ReminderSystem.getPreferences();
        prefs.intervalDays = parseInt(this.value) || 7;
        ReminderSystem.savePreferences(prefs);
      });
    }
  }

  toggles.forEach(t => {
    if (prefs[t.id] !== undefined) t.checked = prefs[t.id];
    t.addEventListener('change', function() {
      const p = Utils.getStorage('notification_prefs', {});
      p[this.id] = this.checked;
      Utils.setStorage('notification_prefs', p);
    });
  });

  var dailyGoalToggle = document.getElementById('toggleDailyGoalReminder');
  if (dailyGoalToggle) {
    var remPrefs = typeof ReminderSystem !== 'undefined' ? ReminderSystem.getPreferences() : {};
    dailyGoalToggle.checked = remPrefs.dailyGoal !== undefined ? remPrefs.dailyGoal : true;
    dailyGoalToggle.addEventListener('change', function() {
      var rp = typeof ReminderSystem !== 'undefined' ? ReminderSystem.getPreferences() : {};
      rp.dailyGoal = this.checked;
      if (typeof ReminderSystem !== 'undefined') ReminderSystem.savePreferences(rp);
    });
  }

  initPerCourseNotifications();
}

function initPerCourseNotifications() {
  var container = document.getElementById('perCourseReminderList');
  if (!container) return;
  var progress = Utils.getStorage('course_progress', {});
  var courseIds = Object.keys(progress);
  if (courseIds.length === 0) {
    container.innerHTML = '<p style="color:var(--text-muted);font-size:0.85rem;text-align:center;padding:1rem">Enroll in courses to manage per-course reminders.</p>';
    return;
  }
  var perCoursePrefs = Utils.getStorage('per_course_reminders', {});
  var coursesData = Utils.getStorage('courses_data', []);
  var html = '';
  courseIds.forEach(function(cid) {
    var course = (Array.isArray(coursesData) ? coursesData : []).find(function(c) { return c.id === cid; });
    var title = course ? course.title : cid.replace(/-/g, ' ').replace(/\b\w/g, function(l) { return l.toUpperCase(); });
    var checked = perCoursePrefs[cid] !== false;
    html += '<div class="setting-toggle" style="padding:0.3rem 0"><div class="setting-toggle-info"><h4 style="font-size:0.85rem">' + title + '</h4></div><label class="toggle-switch"><input type="checkbox" class="per-course-reminder" data-cid="' + cid + '" ' + (checked ? 'checked' : '') + '><span class="toggle-slider"></span></label></div>';
  });
  container.innerHTML = html;
  container.querySelectorAll('.per-course-reminder').forEach(function(cb) {
    cb.addEventListener('change', function() {
      var prefs = Utils.getStorage('per_course_reminders', {});
      prefs[this.dataset.cid] = this.checked;
      Utils.setStorage('per_course_reminders', prefs);
    });
  });
}

function initAppearance() {
  const cards = document.querySelectorAll('.theme-card');
  const currentTheme = Utils.getStorage('coderio_theme', 'light');
  cards.forEach(card => {
    if (card.dataset.theme === currentTheme) card.classList.add('selected');
    card.addEventListener('click', function() {
      cards.forEach(c => c.classList.remove('selected'));
      this.classList.add('selected');
      Utils.setStorage('coderio_theme', this.dataset.theme);
      document.documentElement.setAttribute('data-theme', this.dataset.theme);
      Utils.showToast('Theme updated!', 'success');
    });
  });

  const fontSizeSelect = document.getElementById('fontSizeSelect');
  const codeFontSelect = document.getElementById('codeFontSelect');
  const savedFontSize = Utils.getStorage('font_size', 'medium');
  const savedCodeFont = Utils.getStorage('code_font', 'fira');
  if (fontSizeSelect) {
    fontSizeSelect.value = savedFontSize;
    fontSizeSelect.addEventListener('change', function() {
      Utils.setStorage('font_size', this.value);
      document.documentElement.style.fontSize = this.value === 'small' ? '14px' : this.value === 'large' ? '18px' : '16px';
    });
  }
  if (codeFontSelect) {
    codeFontSelect.value = savedCodeFont;
    codeFontSelect.addEventListener('change', function() {
      Utils.setStorage('code_font', this.value);
      document.querySelectorAll('pre, code').forEach(el => {
        el.style.fontFamily = this.value === 'fira' ? '"Fira Code", monospace' : this.value === 'jetbrains' ? '"JetBrains Mono", monospace' : 'monospace';
      });
    });
  }
}

function initConnectedAccounts() {
  const connections = Utils.getStorage('coderio_connections', []);

  document.querySelectorAll('.connected-account').forEach(container => {
    const btn = container.querySelector('.btn');
    const statusEl = container.querySelector('.ca-status');
    if (!btn || !statusEl) return;

    const platform = btn.dataset.platform?.toLowerCase();
    const existing = platform ? connections.find(function(c) { return c.platform === platform; }) : null;

    if (existing) {
      statusEl.textContent = 'Connected';
      statusEl.className = 'ca-status connected';
      btn.textContent = 'Disconnect';
    }

    btn.addEventListener('click', function() {
      const p = this.dataset.platform?.toLowerCase();
      if (!p) return;
      const list = Utils.getStorage('coderio_connections', []);

      if (statusEl.textContent === 'Connected') {
        if (!confirm('Disconnect from ' + this.dataset.platform + '?')) return;
        Utils.setStorage('coderio_connections', list.filter(function(c) { return c.platform !== p; }));
        statusEl.textContent = 'Not Connected';
        statusEl.className = 'ca-status disconnected';
        this.textContent = 'Connect';
        Utils.showToast('Disconnected from ' + this.dataset.platform, 'info');
      } else {
        const username = prompt('Enter your ' + this.dataset.platform + ' username:');
        if (username) {
          list.push({ platform: p, username: username });
          Utils.setStorage('coderio_connections', list);
          statusEl.textContent = 'Connected';
          statusEl.className = 'ca-status connected';
          this.textContent = 'Disconnect';
          Utils.showToast('Connected to ' + this.dataset.platform + '!', 'success');
        }
      }
    });
  });
}

function initPrivacySection() {
  const toggles = document.querySelectorAll('.settings-section.privacy .toggle-switch input');
  const prefs = Utils.getStorage('privacy_prefs', {});
  toggles.forEach(t => {
    if (prefs[t.id] !== undefined) t.checked = prefs[t.id];
    t.addEventListener('change', function() {
      const p = Utils.getStorage('privacy_prefs', {});
      p[this.id] = this.checked;
      Utils.setStorage('privacy_prefs', p);
    });
  });
}

function initDataExport() {
  const exportBtn = document.getElementById('exportDataBtn');
  if (exportBtn) {
    exportBtn.addEventListener('click', function() {
      const data = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        try { data[key] = JSON.parse(localStorage.getItem(key)); }
        catch (e) { data[key] = localStorage.getItem(key); }
      }
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url; a.download = 'coderio-export.json'; a.click();
      URL.revokeObjectURL(url);
      Utils.showToast('Data exported!', 'success');
    });
  }

  const deleteBtn = document.getElementById('deleteDataBtn');
  if (deleteBtn) {
    deleteBtn.addEventListener('click', function() {
      if (!confirm('This will delete ALL local data. Are you sure?')) return;
      const keys = Object.keys(localStorage).filter(k => k.startsWith('coderio_') || k.startsWith('course_') || k.startsWith('quiz_') || k.startsWith('typing_') || k.startsWith('lesson_') || k.startsWith('project_'));
      keys.forEach(k => localStorage.removeItem(k));
      Utils.showToast('Local data deleted.', 'info');
    });
  }
}

function initProgressSettings() {
  const toggles = document.querySelectorAll('.settings-section.progress .toggle-switch input');
  const prefs = Utils.getStorage('progress_prefs', {});

  if (typeof DailyGoals !== 'undefined') {
    var goals = DailyGoals.getGoals();
    var lessonGoalInput = document.getElementById('dgLessons');
    var quizGoalInput = document.getElementById('dgQuizQuestions');
    var practiceGoalInput = document.getElementById('dgCodingProblems');
    var typingGoalInput = document.getElementById('dgTypingTests');
    var moduleGoalInput = document.getElementById('dgModules');

    if (lessonGoalInput) { lessonGoalInput.value = goals.lessons; }
    if (quizGoalInput) { quizGoalInput.value = goals.quizQuestions; }
    if (practiceGoalInput) { practiceGoalInput.value = goals.codingProblems; }
    if (typingGoalInput) { typingGoalInput.value = goals.typingTests; }
    if (moduleGoalInput) { moduleGoalInput.value = goals.modules; }

    var saveDailyGoals = function() {
      var g = DailyGoals.getGoals();
      if (lessonGoalInput) g.lessons = parseInt(lessonGoalInput.value) || 1;
      if (quizGoalInput) g.quizQuestions = parseInt(quizGoalInput.value) || 0;
      if (practiceGoalInput) g.codingProblems = parseInt(practiceGoalInput.value) || 0;
      if (typingGoalInput) g.typingTests = parseInt(typingGoalInput.value) || 0;
      if (moduleGoalInput) g.modules = parseInt(moduleGoalInput.value) || 0;
      DailyGoals.saveGoals(g);
    };

    [lessonGoalInput, quizGoalInput, practiceGoalInput, typingGoalInput, moduleGoalInput].forEach(function(inp) {
      if (inp) inp.addEventListener('change', saveDailyGoals);
    });
  }

  toggles.forEach(t => {
    if (prefs[t.id] !== undefined) t.checked = prefs[t.id];
    t.addEventListener('change', function() {
      const p = Utils.getStorage('progress_prefs', {});
      p[this.id] = this.checked;
      Utils.setStorage('progress_prefs', p);
    });
  });
}

function initSubscription() {
  const btns = document.querySelectorAll('.subscription-card .btn');
  btns.forEach(btn => {
    btn.addEventListener('click', function() {
      const plan = this.dataset.plan || this.closest('.subscription-card')?.querySelector('h4')?.textContent || 'Selected';
      Utils.setStorage('subscription_plan', plan.toLowerCase());
      document.querySelectorAll('.subscription-card').forEach(c => c.classList.remove('current'));
      const card = this.closest('.subscription-card');
      if (card) card.classList.add('current');
      Utils.showToast('Subscribed to ' + plan + ' plan! (local only)', 'success');
    });
  });

  const savedPlan = Utils.getStorage('subscription_plan', 'free');
  document.querySelectorAll('.subscription-card').forEach(card => {
    const btn = card.querySelector('.btn');
    const planName = btn ? (btn.dataset.plan || '').toLowerCase() : '';
    if (planName === savedPlan) {
      document.querySelectorAll('.subscription-card').forEach(c => c.classList.remove('current'));
      card.classList.add('current');
    }
  });
}

function initQuestionBanks() {
  var container = document.getElementById('bankStatsContainer');
  if (!container) return;
  var stats = typeof QuestionBanks !== 'undefined' ? QuestionBanks.getBankStats() : [];
  if (stats.length === 0) {
    container.innerHTML = '<p style="color:var(--text-muted)">Loading question banks...</p>';
    return;
  }
  container.innerHTML = stats.map(function(s) {
    var count = s.count || 0;
    var pct = Math.min(100, Math.round((count / 8000) * 100));
    var color = pct >= 100 ? 'var(--success)' : pct >= 50 ? 'var(--warning)' : 'var(--error)';
    return '<div class="glass" style="padding:0.8rem;border-radius:8px;text-align:center">'
      + '<div style="font-size:1.1rem;font-weight:700;color:' + color + '">' + count + '</div>'
      + '<div style="font-size:0.75rem;color:var(--text-muted)">' + s.title + '</div>'
      + '<div style="height:4px;background:#e2e8f0;border-radius:2px;margin-top:0.3rem"><div style="height:100%;width:' + pct + '%;background:' + color + ';border-radius:2px;transition:width 0.5s"></div></div>'
      + '</div>';
  }).join('');
}

function regenerateBanks() {
  if (!confirm('Regenerate all question banks? This will clear cached questions and regenerate from templates.')) return;
  var status = document.getElementById('bankStatus');
  if (status) status.textContent = 'Regenerating question banks... This may take a moment.';
  setTimeout(function() {
    var courses = QuizSystem._getCourseList();
    courses.forEach(function(c) {
      Utils.removeStorage('qb_' + c.id);
      QuizSystem._QUESTION_BANKS[c.id] = null;
    });
    courses.forEach(function(c) {
      QuizSystem.getQuestionBank(c.id);
    });
    if (typeof QuestionBanks !== 'undefined') initQuestionBanks();
    if (status) status.textContent = 'All question banks regenerated.';
    Utils.showToast('Question banks regenerated!', 'success');
  }, 100);
}

function clearBankCache() {
  if (!confirm('Clear cached question banks? They will be regenerated on next access.')) return;
  var courses = QuizSystem._getCourseList();
  courses.forEach(function(c) {
    Utils.removeStorage('qb_' + c.id);
    QuizSystem._QUESTION_BANKS[c.id] = null;
  });
  if (typeof QuestionBanks !== 'undefined') initQuestionBanks();
  Utils.showToast('Question bank cache cleared.', 'info');
}

function initAdvanced() {
  const actions = [
    { id: 'clearCacheBtn', confirm: false, action: function() {
      localStorage.clear();
      Utils.showToast('Cache cleared', 'info');
    }},
    { id: 'resetProgressBtn', confirm: 'Reset all progress? This cannot be undone.', action: function() {
      Object.keys(localStorage).filter(k => k.startsWith('course_') || k.startsWith('coderio_') || k.startsWith('quiz_') || k.startsWith('typing_') || k.startsWith('lesson_')).forEach(k => localStorage.removeItem(k));
      Utils.showToast('Progress reset', 'info');
      location.reload();
    }},
    { id: 'deleteAccountBtn', confirm: 'Delete entire account? This cannot be undone.', action: function() {
      localStorage.clear();
      window.location.href = 'auth/login.html';
    }}
  ];

  actions.forEach(function(a) {
    const btn = document.getElementById(a.id);
    if (!btn) return;
    btn.addEventListener('click', function(e) {
      if (a.confirm && !confirm(a.confirm)) return;
      a.action();
    });
  });
}
