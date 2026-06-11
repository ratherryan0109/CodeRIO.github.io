const Utils = {
  debounce(fn, delay = 300) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  },

  throttle(fn, limit = 300) {
    let inThrottle = false;
    return (...args) => {
      if (!inThrottle) {
        fn(...args);
        inThrottle = true;
        setTimeout(() => { inThrottle = false; }, limit);
      }
    };
  },

  formatDate(date) {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    });
  },

  formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  },

  timeAgo(date) {
    const now = new Date();
    const diff = now - new Date(date);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return Utils.formatDate(date);
  },

  _globalKeys: { coderio_user: 1, accent_color: 1, theme: 1, last_course: 1 },

  _userPrefix() {
    try {
      var raw = localStorage.getItem('coderio_user');
      if (raw) { var u = JSON.parse(raw); if (u && u.email) return u.email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '_') + ':'; }
    } catch {}
    return '';
  },

  _scoped(key) {
    if (this._globalKeys[key]) return key;
    var p = this._userPrefix();
    if (!p) return key;
    return p + key;
  },

  migrateStorage() {
    var keysToMigrate = ['interview_tracking', 'coderio_activity', 'coderio_streak', 'interactive_runs', 'achievements', 'lesson_progress', 'user_banks', 'coderio_notifications', 'recent_courses'];
    keysToMigrate.forEach(function(k) {
      var raw = localStorage.getItem(k);
      if (raw !== null) {
        var sk = Utils._scoped(k);
        if (sk !== k && localStorage.getItem(sk) === null) {
          try { localStorage.setItem(sk, raw); } catch {}
          try { localStorage.removeItem(k); } catch {}
        }
      }
    });
  },

  getStorage(key, def = null) {
    try {
      var sk = Utils._scoped(key);
      var val = localStorage.getItem(sk);
      if (val !== null) return JSON.parse(val);
      if (sk !== key) {
        val = localStorage.getItem(key);
        if (val !== null) {
          try { localStorage.setItem(sk, val); } catch {}
          try { localStorage.removeItem(key); } catch {}
          return JSON.parse(val);
        }
      }
      return def;
    } catch { return def; }
  },

  setStorage(key, val) {
    try { localStorage.setItem(Utils._scoped(key), JSON.stringify(val)); } catch {}
  },

  removeStorage(key) {
    try { localStorage.removeItem(key); } catch {}
  },

  validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },

  validatePassword(password) {
    return password.length >= 6;
  },

  sanitize(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  },

  truncate(str, len = 100) {
    return str.length > len ? str.slice(0, len) + '...' : str;
  },

  getInitials(name) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  },

  randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  },

  async fetchJSON(url) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      console.error(`Fetch error: ${url}`, err);
      return null;
    }
  },

  showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer') || document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  },

  showModal(id) {
    const el = document.getElementById(id);
    if (el) el.classList.add('show');
  },

  hideModal(id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove('show');
  },

  $: (sel, ctx = document) => ctx.querySelector(sel),
  $$: (sel, ctx = document) => [...ctx.querySelectorAll(sel)],

  createElement(tag, attrs = {}, children = []) {
    const el = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => {
      if (k === 'className') el.className = v;
      else if (k === 'innerHTML') el.innerHTML = v;
      else if (k.startsWith('on')) el.addEventListener(k.slice(2).toLowerCase(), v);
      else el.setAttribute(k, v);
    });
    children.forEach(c => {
      if (typeof c === 'string') el.appendChild(document.createTextNode(c));
      else el.appendChild(c);
    });
    return el;
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const toastContainer = Utils.createElement('div', { id: 'toast-container', className: 'toast-container' });
  document.body.appendChild(toastContainer);
});
