let notesData = [];

function initNotes() {
  const saved = Utils.getStorage('coderio_notes', []);
  notesData = JSON.parse(JSON.stringify(saved));
  renderNotes();
  setupNoteListeners();
}

function setupNoteListeners() {
  const searchInput = document.getElementById('notesSearch');
  if (searchInput) {
    searchInput.addEventListener('input', Utils.debounce(searchNotes, 300));
  }

  const newBtn = document.getElementById('newNoteBtn');
  if (newBtn) {
    newBtn.addEventListener('click', () => {
      document.getElementById('noteModalTitle').textContent = 'New Note';
      document.getElementById('noteForm').reset();
      document.getElementById('noteId').value = '';
      Utils.showModal('noteModal');
    });
  }

  const saveBtn = document.getElementById('saveNoteBtn');
  if (saveBtn) {
    saveBtn.addEventListener('click', saveNote);
  }
}

function renderNotes(filter = '') {
  const grid = document.getElementById('notesGrid');
  if (!grid) return;

  let notes = notesData;
  if (filter) {
    const q = filter.toLowerCase();
    notes = notes.filter(n => n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q));
  }

  if (notes.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1">
        <img src="https://cdn-icons-png.flaticon.com/512/5097/5097762.png" alt="">
        <h3>No notes yet</h3>
        <p>Create your first note to get started.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = notes.sort((a, b) => b.pinned ? 1 : 0).map(note => `
    <div class="module-card ${note.pinned ? 'pinned' : ''}">
      <h3>${note.pinned ? '<i class="fas fa-thumbtack" style="color:var(--primary)"></i>' : ''} ${Utils.sanitize(note.title)}</h3>
      <p>${Utils.truncate(Utils.sanitize(note.content), 150)}</p>
      <small style="color:var(--text-muted)">${Utils.formatDate(note.updatedAt || note.createdAt)}</small>
      <div style="display:flex;gap:0.5rem;margin-top:0.8rem">
        <button class="btn btn-sm btn-ghost" onclick="editNote('${note.id}')"><i class="fas fa-edit"></i></button>
        <button class="btn btn-sm btn-ghost" onclick="togglePinNote('${note.id}')"><i class="fas fa-thumbtack"></i></button>
        <button class="btn btn-sm btn-ghost" onclick="deleteNote('${note.id}')"><i class="fas fa-trash"></i></button>
      </div>
    </div>
  `).join('');
}

function saveNote() {
  const id = document.getElementById('noteId').value;
  const title = Utils.sanitize(document.getElementById('noteTitle').value.trim());
  const content = Utils.sanitize(document.getElementById('noteContent').value.trim());

  if (!title || !content) {
    Utils.showToast('Title and content are required.', 'error');
    return;
  }

  if (id) {
    const idx = notesData.findIndex(n => n.id === id);
    if (idx !== -1) {
      notesData[idx].title = title;
      notesData[idx].content = content;
      notesData[idx].updatedAt = new Date().toISOString();
    }
  } else {
    notesData.push({
      id: 'note_' + Date.now(),
      title,
      content,
      pinned: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  }

  Utils.setStorage('coderio_notes', JSON.parse(JSON.stringify(notesData)));
  renderNotes();
  Utils.hideModal('noteModal');
  Utils.showToast(id ? 'Note updated!' : 'Note created!', 'success');
}

function editNote(id) {
  const note = notesData.find(n => n.id === id);
  if (!note) return;

  document.getElementById('noteModalTitle').textContent = 'Edit Note';
  document.getElementById('noteId').value = note.id;
  document.getElementById('noteTitle').value = note.title;
  document.getElementById('noteContent').value = note.content;
  Utils.showModal('noteModal');
}

function deleteNote(id) {
  if (!confirm('Delete this note?')) return;
  notesData = notesData.filter(n => n.id !== id);
  Utils.setStorage('coderio_notes', JSON.parse(JSON.stringify(notesData)));
  renderNotes();
  Utils.showToast('Note deleted.', 'info');
}

function togglePinNote(id) {
  const note = notesData.find(n => n.id === id);
  if (note) {
    note.pinned = !note.pinned;
    Utils.setStorage('coderio_notes', JSON.parse(JSON.stringify(notesData)));
    renderNotes();
  }
}

function searchNotes(e) {
  renderNotes(e.target.value);
}
