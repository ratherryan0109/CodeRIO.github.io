const SUPABASE_CONFIG = {
  url: window.SUPABASE_URL || 'https://dzvsxlufiryiaerejqeb.supabase.co',
  key: window.SUPABASE_ANON_KEY || 'sb_publishable_ep1fi8taYk_xsvcOaiGt3g_wSgt_p-6',
  siteUrl: window.location.origin
};

let supabaseClient = null;
let supabaseReady = false;

function getSupabase() {
  if (supabaseClient) return supabaseClient;
  if (typeof supabase === 'undefined') return null;
  if (!SUPABASE_CONFIG.url || !SUPABASE_CONFIG.key) return null;
  try {
    supabaseClient = supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.key, {
      auth: { flowType: 'pkce' }
    });
    supabaseReady = true;
  } catch (e) {
    console.error('Supabase init error:', e);
    return null;
  }
  return supabaseClient;
}

getSupabase();

function handleSupabaseError(error) {
  if (!error) return 'An unexpected error occurred.';
  const msg = error.message || '';
  const code = error.code || '';
  if (msg.includes('Invalid login credentials')) return 'Invalid email or password.';
  if (msg.includes('Email not confirmed')) return 'Please confirm your email before logging in. Check your inbox or configure Auto Confirm in Supabase Dashboard.';
  if (msg.includes('User already registered')) return 'An account with this email already exists.';
  if (msg.includes('rate limit')) return 'Too many attempts. Please try again later.';
  if (msg.includes('Password should be at least 6 characters')) return 'Password must be at least 6 characters.';
  if (msg.includes('Error sending confirmation email') || code === 'unexpected_failure') return 'Supabase email service is not configured. Go to Supabase Dashboard → Authentication → Settings → set "Confirm email" to OFF or configure SMTP.';
  if (msg.includes('to send email')) return 'Supabase email service is not configured. Configure SMTP in Supabase Dashboard to enable email features.';
  return msg || 'Authentication failed. Check Supabase Dashboard configuration.';
}

function saveUserSession(user) {
  if (!user) return;
  const userData = {
    id: user.id,
    email: user.email,
    name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
    avatar: user.user_metadata?.avatar_url || ''
  };
  localStorage.setItem('coderio_user', JSON.stringify(userData));
  Utils.migrateStorage();
}

function onSignInSuccess(user) {
  saveUserSession(user);
  const activity = Utils.getStorage('coderio_activity', []);
  activity.unshift({ text: 'Logged in to CodeRio', time: new Date().toISOString(), type: 'blue' });
  Utils.setStorage('coderio_activity', activity.slice(0, 50));
  const streak = Utils.getStorage('coderio_streak', 0);
  Utils.setStorage('coderio_streak', streak + 1);
  detectUserLocation();
}

function initAuth() {
  const page = document.body.dataset.page;
  if (page === 'Login') initLogin();
  else if (page === 'Register') initRegister();
  else if (page === 'ForgotPassword') initForgotPassword();
  else if (page === 'Profile') initProfile();
}

function initLogin() { initLoginPage(); }
function initRegister() { initRegisterPage(); }
function initForgotPassword() { initForgotPasswordPage(); }
function initProfile() { initProfilePage(); }

async function initLoginPage() {
  const form = document.getElementById('loginForm');
  const emailInput = document.getElementById('loginEmail');
  const passwordInput = document.getElementById('loginPassword');
  const errorEl = document.getElementById('loginError');
  const submitBtn = document.getElementById('loginSubmit');
  const btnText = document.getElementById('loginBtnText');
  const btnSpinner = document.getElementById('loginBtnSpinner');
  const googleBtn = document.getElementById('googleLoginBtn');
  const githubBtn = document.getElementById('githubLoginBtn');

  if (!supabaseReady || typeof supabase === 'undefined') {
    if (errorEl) {
      errorEl.textContent = 'Supabase client library not loaded. Check your internet connection.';
      errorEl.style.display = 'block';
    }
    return;
  }

  if (window.location.search.includes('registered=1') && errorEl) {
    errorEl.textContent = 'Account created! Check your email for the confirmation link, then log in.';
    errorEl.style.color = 'var(--success)';
    errorEl.style.display = 'block';
  }

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (errorEl) errorEl.style.display = 'none';
    const email = emailInput ? emailInput.value.trim() : '';
    const password = passwordInput ? passwordInput.value : '';
    if (!Utils.validateEmail(email)) { if (errorEl) { errorEl.textContent = 'Please enter a valid email address.'; errorEl.style.display = 'block'; } return; }
    if (!Utils.validatePassword(password)) { if (errorEl) { errorEl.textContent = 'Password must be at least 6 characters.'; errorEl.style.display = 'block'; } return; }
    if (submitBtn) submitBtn.disabled = true;
    if (btnText) btnText.textContent = 'Logging in...';
    if (btnSpinner) btnSpinner.style.display = 'inline-block';
    try {
      const sb = getSupabase();
      if (!sb) throw new Error('Supabase client not available.');
      const { data, error } = await sb.auth.signInWithPassword({ email, password });
      if (error) throw error;
      if (data.user) {
        onSignInSuccess(data.user);
        Utils.showToast('Welcome back, ' + (data.user.user_metadata?.full_name || data.user.email?.split('@')[0] || 'User') + '!', 'success');
        window.location.href = '../dashboard/dashboard.html';
      }
    } catch (err) {
      if (errorEl) { errorEl.textContent = handleSupabaseError(err); errorEl.style.display = 'block'; }
      if (submitBtn) submitBtn.disabled = false;
      if (btnText) btnText.textContent = 'Log In';
      if (btnSpinner) btnSpinner.style.display = 'none';
    }
  });

  if (googleBtn) {
    googleBtn.addEventListener('click', async () => {
      try {
        const sb = getSupabase();
        if (!sb) { Utils.showToast('Supabase not configured.', 'error'); return; }
        const { error } = await sb.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: SUPABASE_CONFIG.siteUrl + '/dashboard/dashboard.html' } });
        if (error) Utils.showToast(handleSupabaseError(error), 'error');
      } catch (err) { Utils.showToast(handleSupabaseError(err), 'error'); }
    });
  }

  if (githubBtn) {
    githubBtn.addEventListener('click', async () => {
      try {
        const sb = getSupabase();
        if (!sb) { Utils.showToast('Supabase not configured.', 'error'); return; }
        const { error } = await sb.auth.signInWithOAuth({ provider: 'github', options: { redirectTo: SUPABASE_CONFIG.siteUrl + '/dashboard/dashboard.html' } });
        if (error) Utils.showToast(handleSupabaseError(error), 'error');
      } catch (err) { Utils.showToast(handleSupabaseError(err), 'error'); }
    });
  }
}

async function initRegisterPage() {
  const form = document.getElementById('registerForm');
  const nameInput = document.getElementById('registerName');
  const emailInput = document.getElementById('registerEmail');
  const passwordInput = document.getElementById('registerPassword');
  const confirmInput = document.getElementById('registerConfirm');
  const errorEl = document.getElementById('registerError');
  const submitBtn = document.getElementById('registerSubmit');
  const btnText = document.getElementById('registerBtnText');
  const btnSpinner = document.getElementById('registerBtnSpinner');
  const googleBtn = document.getElementById('googleRegisterBtn');
  const githubBtn = document.getElementById('githubRegisterBtn');
  const termsCheck = document.getElementById('termsCheck');

  if (!supabaseReady || typeof supabase === 'undefined') {
    if (errorEl) {
      errorEl.textContent = 'Supabase client library not loaded. Check your internet connection.';
      errorEl.style.display = 'block';
    }
    return;
  }

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (errorEl) errorEl.style.display = 'none';
    const name = nameInput ? Utils.sanitize(nameInput.value.trim()) : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const password = passwordInput ? passwordInput.value : '';
    const confirm = confirmInput ? confirmInput.value : '';
    if (!name) { if (errorEl) { errorEl.textContent = 'Please enter your name.'; errorEl.style.display = 'block'; } return; }
    if (!Utils.validateEmail(email)) { if (errorEl) { errorEl.textContent = 'Please enter a valid email address.'; errorEl.style.display = 'block'; } return; }
    if (!Utils.validatePassword(password)) { if (errorEl) { errorEl.textContent = 'Password must be at least 6 characters.'; errorEl.style.display = 'block'; } return; }
    if (password !== confirm) { if (errorEl) { errorEl.textContent = 'Passwords do not match.'; errorEl.style.display = 'block'; } return; }
    if (termsCheck && !termsCheck.checked) { if (errorEl) { errorEl.textContent = 'You must agree to the Terms of Service.'; errorEl.style.display = 'block'; } return; }
    if (submitBtn) submitBtn.disabled = true;
    if (btnText) btnText.textContent = 'Creating account...';
    if (btnSpinner) btnSpinner.style.display = 'inline-block';
    try {
      const sb = getSupabase();
      if (!sb) throw new Error('Supabase client not available.');
      const { data, error } = await sb.auth.signUp({
        email,
        password,
        options: { data: { full_name: name } }
      });
      if (error) throw error;
      if (data.user) {
        if (data.user.identities && data.user.identities.length === 0) {
          if (errorEl) {
            errorEl.textContent = 'An account with this email already exists. Try logging in.';
            errorEl.style.display = 'block';
          }
          if (submitBtn) submitBtn.disabled = false;
          if (btnText) btnText.textContent = 'Create Account';
          if (btnSpinner) btnSpinner.style.display = 'none';
          return;
        }
        onSignInSuccess(data.user);
        Utils.showToast('Account created! You are now logged in.', 'success');
        setTimeout(() => window.location.href = '../dashboard/dashboard.html', 1500);
      }
    } catch (err) {
      if (errorEl) { errorEl.textContent = handleSupabaseError(err); errorEl.style.display = 'block'; }
      if (submitBtn) submitBtn.disabled = false;
      if (btnText) btnText.textContent = 'Create Account';
      if (btnSpinner) btnSpinner.style.display = 'none';
    }
  });

  if (googleBtn) {
    googleBtn.addEventListener('click', async () => {
      try {
        const sb = getSupabase();
        if (!sb) { Utils.showToast('Supabase not configured.', 'error'); return; }
        const { error } = await sb.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: SUPABASE_CONFIG.siteUrl + '/dashboard/dashboard.html' } });
        if (error) Utils.showToast(handleSupabaseError(error), 'error');
      } catch (err) { Utils.showToast(handleSupabaseError(err), 'error'); }
    });
  }

  if (githubBtn) {
    githubBtn.addEventListener('click', async () => {
      try {
        const sb = getSupabase();
        if (!sb) { Utils.showToast('Supabase not configured.', 'error'); return; }
        const { error } = await sb.auth.signInWithOAuth({ provider: 'github', options: { redirectTo: SUPABASE_CONFIG.siteUrl + '/dashboard/dashboard.html' } });
        if (error) Utils.showToast(handleSupabaseError(error), 'error');
      } catch (err) { Utils.showToast(handleSupabaseError(err), 'error'); }
    });
  }
}

async function initForgotPasswordPage() {
  const form = document.getElementById('forgotForm');
  const emailInput = document.getElementById('forgotEmail');
  const successEl = document.getElementById('forgotSuccess');
  const submitBtn = document.getElementById('forgotSubmit');
  const btnText = document.getElementById('forgotBtnText');
  const btnSpinner = document.getElementById('forgotBtnSpinner');

  if (!supabaseReady || typeof supabase === 'undefined') {
    const container = form ? form.parentNode : document.querySelector('.auth-card');
    if (container) {
      const msg = document.createElement('div');
      msg.className = 'form-error';
      msg.textContent = 'Supabase client library not loaded. Check your internet connection.';
      msg.style.marginBottom = '1rem';
      container.insertBefore(msg, form);
    }
    return;
  }

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = emailInput ? emailInput.value.trim() : '';
    if (!Utils.validateEmail(email)) { Utils.showToast('Please enter a valid email address.', 'error'); return; }
    if (submitBtn) submitBtn.disabled = true;
    if (btnText) btnText.textContent = 'Sending...';
    if (btnSpinner) btnSpinner.style.display = 'inline-block';
    try {
      const sb = getSupabase();
      if (!sb) throw new Error('Supabase client not available.');
      const { error } = await sb.auth.resetPasswordForEmail(email, {
        redirectTo: SUPABASE_CONFIG.siteUrl + '/auth/recovery.html'
      });
      if (error) throw error;
      if (form) form.style.display = 'none';
      if (successEl) successEl.style.display = 'block';
      Utils.showToast('Password reset link sent to your email.', 'success');
    } catch (err) {
      Utils.showToast(handleSupabaseError(err), 'error');
      if (submitBtn) submitBtn.disabled = false;
      if (btnText) btnText.textContent = 'Send Reset Link';
      if (btnSpinner) btnSpinner.style.display = 'none';
    }
  });
}

function initProfilePage() {
  const user = Utils.getStorage('coderio_user');
  if (!user) {
    window.location.href = '../auth/login.html';
    return;
  }

  const nameInput = document.getElementById('profileName');
  const emailInput = document.getElementById('profileEmail');
  const bioInput = document.getElementById('profileBio');
  const avatarInput = document.getElementById('avatarUrlInput');
  const avatarPreview = document.getElementById('avatarPreview');

  if (nameInput) nameInput.value = user.name || '';
  if (emailInput) emailInput.value = user.email || '';
  if (avatarInput) avatarInput.value = user.avatar || '';
  if (avatarPreview && user.avatar) {
    avatarPreview.innerHTML = '<img src="' + Utils.sanitize(user.avatar) + '" alt="Avatar" onerror="this.style.display=\'none\';this.parentElement.innerHTML=\'<i class=\\\\\\\'fas fa-user\\\\\\\'></i>\'"><div class="avatar-overlay"><i class="fas fa-camera"></i></div>';
  }

  const profileForm = document.getElementById('profileForm');
  if (profileForm) {
    profileForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const newName = nameInput ? nameInput.value.trim() : '';
      const newBio = bioInput ? bioInput.value.trim() : '';
      const newAvatar = avatarInput ? avatarInput.value.trim() : '';
      if (!newName) { Utils.showToast('Name is required.', 'error'); return; }
      user.name = newName;
      user.bio = newBio;
      user.avatar = newAvatar;
      Utils.setStorage('coderio_user', user);
      if (avatarPreview) {
        avatarPreview.innerHTML = newAvatar
          ? '<img src="' + Utils.sanitize(newAvatar) + '" alt="Avatar" onerror="this.style.display=\'none\';this.parentElement.innerHTML=\'<i class=\\\\\\\'fas fa-user\\\\\\\'></i>\'"><div class="avatar-overlay"><i class="fas fa-camera"></i></div>'
          : '<span style="font-size:2rem;font-weight:700;color:var(--primary)">' + Utils.getInitials(newName || 'User') + '</span><div class="avatar-overlay"><i class="fas fa-camera"></i></div>';
      }
      Utils.showToast('Profile saved!', 'success');
    });
  }

  const streakEl = document.getElementById('profileStreak');
  const progressEl = document.getElementById('profileProgress');
  const roadmapEl = document.getElementById('profileRoadmap');
  const typingEl = document.getElementById('profileTyping');
  const coursesEl = document.getElementById('profileCourses');
  const projectsEl = document.getElementById('profileProjects');

  if (streakEl) streakEl.textContent = Utils.getStorage('coderio_streak', 0);
  const courseProgress = Utils.getStorage('course_progress', {});
  if (progressEl) {
    const total = Object.values(courseProgress).reduce((sum, p) => sum + (p.completed || []).length, 0);
    progressEl.textContent = total + ' lessons';
  }
  const roadmapProgress = Utils.getStorage('roadmap_progress', {});
  if (roadmapEl) roadmapEl.textContent = Object.keys(roadmapProgress).length + ' roadmaps';
  const typingHistory = Utils.getStorage('typing_history', []);
  if (typingEl) typingEl.textContent = typingHistory.length + ' tests';
  if (coursesEl) coursesEl.textContent = Object.keys(courseProgress).length + ' courses';
  const projectSubmissions = Utils.getStorage('project_submissions', {});
  if (projectsEl) projectsEl.textContent = Object.keys(projectSubmissions).length + ' projects';
}

async function signOut() {
  try {
    const sb = getSupabase();
    if (sb) await sb.auth.signOut();
  } catch (err) { /* ignore */ }
  localStorage.removeItem('coderio_user');
  Utils.showToast('Logged out successfully', 'success');
  setTimeout(() => window.location.href = '../index.html', 1000);
}

async function requireAuth() {
  const sb = getSupabase();
  if (!sb) {
    const user = Utils.getStorage('coderio_user');
    if (!user) { window.location.href = '../auth/login.html'; return null; }
    return user;
  }
  const { data: { session } } = await sb.auth.getSession();
  if (!session) {
    const localUser = Utils.getStorage('coderio_user');
    if (localUser) return localUser;
    window.location.href = '../auth/login.html';
    return null;
  }
  saveUserSession(session.user);
  return Utils.getStorage('coderio_user');
}

function detectUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(pos) {
      var lat = pos.coords.latitude;
      var lng = pos.coords.longitude;
      fetch('https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=' + lat + '&longitude=' + lng + '&localityLanguage=en')
        .then(function(r) { return r.json(); })
        .then(function(data) {
          if (data && data.countryCode) {
            Utils.setStorage('coderio_location', { countryCode: data.countryCode, country: data.countryName, city: data.city || data.locality, lat: lat, lng: lng });
          }
        })
        .catch(function() {});
    }, function() {}, { timeout: 5000, enableHighAccuracy: false });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const sb = getSupabase();
  if (sb) {
    sb.auth.onAuthStateChange((event, session) => {
      if (session) {
        if (event === 'SIGNED_IN' || event === 'USER_UPDATED' || event === 'INITIAL_SESSION') {
          saveUserSession(session.user);
        }
        if (event === 'SIGNED_IN') {
          const isAuthPage = window.location.pathname.includes('/auth/login.html') || window.location.pathname.includes('/auth/register.html');
          const isOAuthCallback = window.location.search.includes('code=') || window.location.hash.includes('access_token');
          if (isAuthPage && isOAuthCallback) {
            window.location.href = '../dashboard/dashboard.html';
          }
        }
      } else if (event === 'SIGNED_OUT') {
        localStorage.removeItem('coderio_user');
      }
    });
  }
});
