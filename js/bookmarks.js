let bookmarksData = [];

function initBookmarks() {
  const user = Utils.getStorage('coderio_user');
  if (!user) {
    const grid = document.getElementById('bookmarksGrid');
    if (grid) {
      grid.innerHTML = '<div class="empty-state" style="grid-column:1/-1"><img src="https://cdn-icons-png.flaticon.com/512/566/566299.png" alt=""><h3>Please log in to see bookmarks</h3><p><a href="../auth/login.html" style="color:var(--primary);font-weight:600;">Log in here</a></p></div>';
    }
    return;
  }
  bookmarksData = Utils.getStorage('coderio_bookmarks', []);
  renderBookmarks();
}

function renderBookmarks() {
  const grid = document.getElementById('bookmarksGrid');
  if (!grid) return;

  if (bookmarksData.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1">
        <img src="https://cdn-icons-png.flaticon.com/512/566/566299.png" alt="">
        <h3>No bookmarks yet</h3>
        <p>Save courses, videos, and resources for quick access.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = bookmarksData.map(bm => `
    <div class="module-card">
      <div style="display:flex;align-items:center;gap:1rem">
        <div style="flex:1">
          <h3>${Utils.sanitize(bm.title)}</h3>
          <p style="font-size:0.9rem;color:var(--text-muted)">${bm.type}</p>
        </div>
        <button class="btn btn-sm btn-ghost" onclick="removeBookmark('${bm.id}')">
          <i class="fas fa-bookmark" style="color:var(--primary)"></i>
        </button>
      </div>
    </div>
  `).join('');
}

function addBookmark(title, type, url) {
  const existing = bookmarksData.find(b => b.url === url);
  if (existing) {
    Utils.showToast('Already bookmarked!', 'info');
    return;
  }

  bookmarksData.push({
    id: 'bm_' + Date.now(),
    title,
    type,
    url,
    createdAt: new Date().toISOString()
  });

  Utils.setStorage('coderio_bookmarks', bookmarksData);
  renderBookmarks();
  Utils.showToast('Bookmarked!', 'success');
}

function removeBookmark(id) {
  bookmarksData = bookmarksData.filter(b => b.id !== id);
  Utils.setStorage('coderio_bookmarks', bookmarksData);
  renderBookmarks();
}
