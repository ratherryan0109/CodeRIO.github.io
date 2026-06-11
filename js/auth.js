const FIREBASE_CONFIG = {
  apiKey: "AIzaSyCOOsgmrRhyb11aPbnTXe7L4t6MTUIYAgs",
  authDomain: "coderio-88084.firebaseapp.com",
  projectId: "coderio-88084",
  storageBucket: "coderio-88084.firebasestorage.app",
  messagingSenderId: "361678330344",
  appId: "1:361678330344:web:ff47d67e6a5e26c74a2c5d"
};

let firebaseApp = null;
let firebaseReady = false;

function getFirebase() {
  if (firebaseApp) return firebaseApp;
  if (typeof firebase === 'undefined') return null;
  try {
    firebaseApp = firebase.initializeApp(FIREBASE_CONFIG);
    firebaseReady = true;
  } catch (e) {
    console.error('Firebase init error:', e);
    return null;
  }
  return firebaseApp;
}

getFirebase();

function handleFirebaseError(error) {
  if (!error) return 'An unexpected error occurred.';
  const code = error.code || '';
  const msg = error.message || '';
  if (code === 'auth/user-not-found' || code === 'auth/wrong-password' || code === 'auth/invalid-credential')
    return 'Invalid email or password.';
  if (code === 'auth/email-already-in-use') return 'An account with this email already exists.';
  if (code === 'auth/weak-password') return 'Password must be at least 6 characters.';
  if (code === 'auth/too-many-requests') return 'Too many attempts. Please try again later.';
  if (code === 'auth/user-disabled') return 'This account has been disabled.';
  if (code === 'auth/invalid-email') return 'Invalid email address.';
  if (code === 'auth/operation-not-allowed') return 'This sign-in method is not enabled. Please contact support.';
  if (code === 'auth/requires-recent-login') return 'Please log out and log in again before making this change.';
  if (code === 'auth/popup-closed-by-user') return 'Sign-in popup was closed before completing.';
  if (code === 'auth/network-request-failed') return 'Network error. Check your internet connection.';
  return msg || 'Authentication failed.';
}

function saveUserSession(firebaseUser) {
  if (!firebaseUser) return;
  const userData = {
    id: firebaseUser.uid,
    email: firebaseUser.email,
    name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
    avatar: firebaseUser.photoURL || ''
  };
  localStorage.setItem('coderio_user', JSON.stringify(userData));
  Utils.migrateStorage();
}

function onSignInSuccess(firebaseUser) {
  saveUserSession(firebaseUser);
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

  if (!firebaseReady || typeof firebase === 'undefined') {
    if (errorEl) {
      errorEl.textContent = 'Firebase client library not loaded. Check your internet connection.';
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
      const result = await firebase.auth().signInWithEmailAndPassword(email, password);
      if (result.user) {
        onSignInSuccess(result.user);
        Utils.showToast('Welcome back, ' + (result.user.displayName || result.user.email?.split('@')[0] || 'User') + '!', 'success');
        window.location.href = '../dashboard/dashboard.html';
      }
    } catch (err) {
      if (errorEl) { errorEl.textContent = handleFirebaseError(err); errorEl.style.display = 'block'; }
      if (submitBtn) submitBtn.disabled = false;
      if (btnText) btnText.textContent = 'Log In';
      if (btnSpinner) btnSpinner.style.display = 'none';
    }
  });

  if (googleBtn) {
    googleBtn.addEventListener('click', async () => {
      try {
        const provider = new firebase.auth.GoogleAuthProvider();
        const result = await firebase.auth().signInWithPopup(provider);
        onSignInSuccess(result.user);
        Utils.showToast('Welcome, ' + (result.user.displayName || 'User') + '!', 'success');
        window.location.href = '../dashboard/dashboard.html';
      } catch (err) {
        if (err.code !== 'auth/popup-closed-by-user') {
          Utils.showToast(handleFirebaseError(err), 'error');
        }
      }
    });
  }

  if (githubBtn) {
    githubBtn.addEventListener('click', async () => {
      try {
        const provider = new firebase.auth.GithubAuthProvider();
        const result = await firebase.auth().signInWithPopup(provider);
        onSignInSuccess(result.user);
        Utils.showToast('Welcome, ' + (result.user.displayName || 'User') + '!', 'success');
        window.location.href = '../dashboard/dashboard.html';
      } catch (err) {
        if (err.code !== 'auth/popup-closed-by-user') {
          Utils.showToast(handleFirebaseError(err), 'error');
        }
      }
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

  if (!firebaseReady || typeof firebase === 'undefined') {
    if (errorEl) {
      errorEl.textContent = 'Firebase client library not loaded. Check your internet connection.';
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
      const result = await firebase.auth().createUserWithEmailAndPassword(email, password);
      if (result.user) {
        await result.user.updateProfile({ displayName: name });
        onSignInSuccess(result.user);
        Utils.showToast('Account created! You are now logged in.', 'success');
        setTimeout(() => window.location.href = '../dashboard/dashboard.html', 1500);
      }
    } catch (err) {
      if (errorEl) { errorEl.textContent = handleFirebaseError(err); errorEl.style.display = 'block'; }
      if (submitBtn) submitBtn.disabled = false;
      if (btnText) btnText.textContent = 'Create Account';
      if (btnSpinner) btnSpinner.style.display = 'none';
    }
  });

  if (googleBtn) {
    googleBtn.addEventListener('click', async () => {
      try {
        const provider = new firebase.auth.GoogleAuthProvider();
        const result = await firebase.auth().signInWithPopup(provider);
        onSignInSuccess(result.user);
        Utils.showToast('Account created! Welcome, ' + (result.user.displayName || 'User') + '!', 'success');
        window.location.href = '../dashboard/dashboard.html';
      } catch (err) {
        if (err.code !== 'auth/popup-closed-by-user') {
          Utils.showToast(handleFirebaseError(err), 'error');
        }
      }
    });
  }

  if (githubBtn) {
    githubBtn.addEventListener('click', async () => {
      try {
        const provider = new firebase.auth.GithubAuthProvider();
        const result = await firebase.auth().signInWithPopup(provider);
        onSignInSuccess(result.user);
        Utils.showToast('Account created! Welcome, ' + (result.user.displayName || 'User') + '!', 'success');
        window.location.href = '../dashboard/dashboard.html';
      } catch (err) {
        if (err.code !== 'auth/popup-closed-by-user') {
          Utils.showToast(handleFirebaseError(err), 'error');
        }
      }
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

  if (!firebaseReady || typeof firebase === 'undefined') {
    const container = form ? form.parentNode : document.querySelector('.auth-card');
    if (container) {
      const msg = document.createElement('div');
      msg.className = 'form-error';
      msg.textContent = 'Firebase client library not loaded. Check your internet connection.';
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
      await firebase.auth().sendPasswordResetEmail(email, {
        url: window.location.origin + '/auth/recovery.html'
      });
      if (form) form.style.display = 'none';
      if (successEl) successEl.style.display = 'block';
      Utils.showToast('Password reset link sent to your email.', 'success');
    } catch (err) {
      Utils.showToast(handleFirebaseError(err), 'error');
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
      const currentUser = firebase.auth().currentUser;
      if (currentUser) {
        currentUser.updateProfile({ displayName: newName, photoURL: newAvatar || null }).catch(() => {});
      }
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
    await firebase.auth().signOut();
  } catch (err) { /* ignore */ }
  localStorage.removeItem('coderio_user');
  Utils.showToast('Logged out successfully', 'success');
  setTimeout(() => window.location.href = '../index.html', 1000);
}

async function requireAuth() {
  const user = firebase.auth().currentUser;
  if (user) {
    saveUserSession(user);
    return Utils.getStorage('coderio_user');
  }
  const localUser = Utils.getStorage('coderio_user');
  if (localUser) return localUser;
  window.location.href = '../auth/login.html';
  return null;
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
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      saveUserSession(user);
      const isAuthPage = window.location.pathname.includes('/auth/login.html') || window.location.pathname.includes('/auth/register.html');
      if (isAuthPage) {
        window.location.href = '../dashboard/dashboard.html';
      }
    } else {
      localStorage.removeItem('coderio_user');
    }
  });
});
