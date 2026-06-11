var QuestionBanks = {
  importFromJSON(jsonData) {
    try {
      var data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
      if (!data.courseId || !data.questions || !Array.isArray(data.questions)) {
        Utils.showToast('Invalid format. Expected { courseId, questions: [...] }', 'error');
        return null;
      }
      var courseId = data.courseId;
      var questions = data.questions.map(function(q, i) {
        return {
          id: q.id || ('import_' + courseId + '_' + i),
          question: q.question || q.q || '',
          options: q.options || q.o || [],
          answer: q.answer !== undefined ? q.answer : (q.a !== undefined ? q.a : 0),
          difficulty: q.difficulty || q.d || 'Beginner',
          type: q.type || 'mcq',
          subtopic: q.subtopic || q.s || '',
          explanation: q.explanation || q.e || '',
          documentation: q.documentation || q.doc || '',
          courseId: courseId
        };
      });
      return { courseId: courseId, questions: questions, count: questions.length };
    } catch (e) {
      Utils.showToast('JSON parse error: ' + e.message, 'error');
      return null;
    }
  },

  importFromCSV(csvText) {
    try {
      var lines = csvText.split('\n').filter(function(l) { return l.trim(); });
      if (lines.length < 2) { Utils.showToast('CSV must have a header row and at least one data row.', 'error'); return null; }
      var headers = lines[0].split(',').map(function(h) { return h.trim().toLowerCase(); });
      var courseId = '';
      var questions = [];
      for (var i = 1; i < lines.length; i++) {
        var vals = lines[i].split(',').map(function(v) { return v.trim().replace(/^"|"$/g, ''); });
        var row = {};
        headers.forEach(function(h, idx) { row[h] = vals[idx] || ''; });
        if (i === 1 && row.courseid) courseId = row.courseid;
        var options = [row.opt1 || '', row.opt2 || '', row.opt3 || '', row.opt4 || ''].filter(function(o) { return o; });
        questions.push({
          id: 'csv_' + (courseId || 'unknown') + '_' + i,
          question: row.question || row.q || '',
          options: options.length >= 2 ? options : ['True', 'False'],
          answer: row.answer !== undefined ? parseInt(row.answer) : (row.a !== undefined ? parseInt(row.a) : 0),
          difficulty: row.difficulty || row.d || 'Beginner',
          type: row.type || 'mcq',
          subtopic: row.subtopic || row.s || '',
          explanation: row.explanation || row.e || '',
          documentation: row.documentation || '',
          courseId: courseId
        });
      }
      if (questions.length === 0) { Utils.showToast('No valid questions found in CSV.', 'error'); return null; }
      return { courseId: courseId || 'imported', questions: questions, count: questions.length };
    } catch (e) {
      Utils.showToast('CSV parse error: ' + e.message, 'error');
      return null;
    }
  },

  importToCourse(courseId, questions, merge) {
    if (!courseId || !questions || questions.length === 0) return false;
    var cache = Utils.getStorage('question_import_cache', {});
    cache[courseId] = cache[courseId] || [];
    cache[courseId] = cache[courseId].concat(questions);
    Utils.setStorage('question_import_cache', cache);

    if (merge) {
      var bank = QuizSystem.getQuestionBank(courseId);
      if (bank) {
        bank.questions = bank.questions.concat(questions);
        var seen = {};
        bank.questions = bank.questions.filter(function(q) {
          var key = q.id || q.question.substring(0, 40);
          if (seen[key]) return false;
          seen[key] = true;
          return true;
        });
        Utils.setStorage('qb_' + courseId, bank);
        QuizSystem._QUESTION_BANKS[courseId] = bank;
      }
    }
    return true;
  },

  getImportCache(courseId) {
    var cache = Utils.getStorage('question_import_cache', {});
    if (courseId) return cache[courseId] || [];
    return cache;
  },

  clearImportCache(courseId) {
    var cache = Utils.getStorage('question_import_cache', {});
    if (courseId) delete cache[courseId];
    else Object.keys(cache).forEach(function(k) { delete cache[k]; });
    Utils.setStorage('question_import_cache', cache);
  },

  downloadAsJSON(courseId) {
    var bank = QuizSystem.getQuestionBank(courseId);
    if (!bank) { Utils.showToast('No question bank for ' + courseId, 'error'); return; }
    var data = { courseId: courseId, title: bank.title, questions: bank.questions };
    var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'questions_' + courseId + '.json';
    a.click();
    URL.revokeObjectURL(url);
  },

  getBankStats() {
    var courses = QuizSystem._getCourseList();
    return courses.map(function(c) {
      var bank = QuizSystem.getQuestionBank(c.id);
      return { id: c.id, title: c.title, count: bank ? bank.questions.length : 0 };
    });
  }
};

function initAdminQuestionPanel() {
  var panel = document.getElementById('adminQuestionPanel') || document.querySelector('.question-bank-section');
  if (!panel) return;

  panel.innerHTML = ''
    + '<div class="glass-card" style="margin-bottom:1.5rem">'
    + '<div class="glass-card-header"><i class="fas fa-upload"></i><h3>Import Questions</h3></div>'
    + '<div style="margin-bottom:1rem">'
    + '<label style="display:block;font-weight:600;margin-bottom:0.5rem">Upload JSON file</label>'
    + '<input type="file" id="jsonFileInput" accept=".json" style="margin-bottom:0.5rem">'
    + '<p style="font-size:0.8rem;color:var(--text-muted)">JSON format: { "courseId": "html", "questions": [{ "question": "...", "options": [...], "answer": 0, "difficulty": "Beginner", "type": "mcq", "subtopic": "...", "explanation": "..." }] }</p>'
    + '</div>'
    + '<div style="margin-bottom:1rem">'
    + '<label style="display:block;font-weight:600;margin-bottom:0.5rem">Or paste CSV</label>'
    + '<textarea id="csvInput" rows="4" style="width:100%;padding:0.5rem;border:2px solid #e2e8f0;border-radius:8px;font-family:monospace;font-size:0.85rem" placeholder="courseid,question,opt1,opt2,opt3,opt4,answer,difficulty,type,subtopic,explanation&#10;html,What is HTML?,A,B,C,D,0,Beginner,mcq,Tags,Explanation..."></textarea>'
    + '</div>'
    + '<button class="btn btn-primary" onclick="handleImport()"><i class="fas fa-file-import"></i> Preview Import</button>'
    + '</div>'
    + '<div class="glass-card" style="margin-bottom:1.5rem;display:none" id="importPreviewSection">'
    + '<div class="glass-card-header"><i class="fas fa-eye"></i><h3>Import Preview</h3></div>'
    + '<div id="importPreviewContent"></div>'
    + '<div style="margin-top:1rem;display:flex;gap:0.8rem">'
    + '<button class="btn btn-success" onclick="confirmImport()"><i class="fas fa-check"></i> Confirm Merge</button>'
    + '<button class="btn btn-ghost" onclick="cancelImport()"><i class="fas fa-times"></i> Cancel</button>'
    + '</div>'
    + '</div>'
    + '<div class="glass-card">'
    + '<div class="glass-card-header"><i class="fas fa-table"></i><h3>Question Browser</h3></div>'
    + '<div style="margin-bottom:1rem;display:flex;gap:0.8rem;flex-wrap:wrap">'
    + '<select id="qbCourseFilter" style="padding:0.5rem;border:2px solid #e2e8f0;border-radius:8px;font-size:0.85rem"><option value="">All Courses</option></select>'
    + '<select id="qbDifficultyFilter" style="padding:0.5rem;border:2px solid #e2e8f0;border-radius:8px;font-size:0.85rem"><option value="">All Difficulties</option><option value="Beginner">Beginner</option><option value="Normal">Normal</option><option value="Intermediate">Intermediate</option><option value="Advanced">Advanced</option></select>'
    + '<select id="qbTypeFilter" style="padding:0.5rem;border:2px solid #e2e8f0;border-radius:8px;font-size:0.85rem"><option value="">All Types</option><option value="mcq">MCQ</option><option value="multipleSelect">Multiple Select</option><option value="trueFalse">True/False</option><option value="codeOutput">Code Output</option><option value="debugging">Debugging</option><option value="scenario">Scenario</option><option value="fillBlank">Fill Blank</option></select>'
    + '<input type="text" id="qbSearchInput" placeholder="Search questions..." style="padding:0.5rem;border:2px solid #e2e8f0;border-radius:8px;font-size:0.85rem;flex:1;min-width:150px">'
    + '<button class="btn btn-ghost" onclick="renderQuestionTable()"><i class="fas fa-search"></i> Filter</button>'
    + '<button class="btn btn-ghost" onclick="downloadBank()"><i class="fas fa-download"></i> Download</button>'
    + '</div>'
    + '<div id="questionTableContainer" style="max-height:500px;overflow-y:auto"></div>'
    + '</div>';

  var courseSel = document.getElementById('qbCourseFilter');
  QuizSystem._getCourseList().forEach(function(c) {
    var opt = document.createElement('option');
    opt.value = c.id;
    opt.textContent = c.title;
    courseSel.appendChild(opt);
  });

  document.getElementById('jsonFileInput').addEventListener('change', function(e) {
    var file = e.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function(ev) {
      window._pendingImport = QuestionBanks.importFromJSON(ev.target.result);
      showImportPreview();
    };
    reader.readAsText(file);
  });

  renderQuestionTable();
}

var _pendingImport = null;

function handleImport() {
  var csvText = document.getElementById('csvInput').value.trim();
  if (csvText) {
    _pendingImport = QuestionBanks.importFromCSV(csvText);
    showImportPreview();
    return;
  }
  var fileInput = document.getElementById('jsonFileInput');
  if (fileInput.files.length > 0) {
    var reader = new FileReader();
    reader.onload = function(ev) {
      _pendingImport = QuestionBanks.importFromJSON(ev.target.result);
      showImportPreview();
    };
    reader.readAsText(fileInput.files[0]);
    return;
  }
  Utils.showToast('Upload a JSON file or paste CSV text.', 'warning');
}

function showImportPreview() {
  var section = document.getElementById('importPreviewSection');
  var content = document.getElementById('importPreviewContent');
  if (!_pendingImport) { Utils.showToast('No data to preview.', 'error'); return; }
  section.style.display = 'block';
  content.innerHTML = '<p><strong>Course:</strong> ' + _pendingImport.courseId + '</p>'
    + '<p><strong>Questions:</strong> ' + _pendingImport.count + '</p>'
    + '<div style="max-height:200px;overflow-y:auto;font-size:0.85rem;margin-top:0.5rem">'
    + _pendingImport.questions.slice(0, 5).map(function(q, i) {
      return '<div style="padding:0.3rem 0;border-bottom:1px solid var(--glass-border-light)">'
        + '<strong>' + (i + 1) + '.</strong> ' + q.question.substring(0, 80) + '...'
        + ' <span class="badge badge-' + (q.difficulty === 'Beginner' ? 'success' : q.difficulty === 'Intermediate' ? 'warning' : 'error') + '">' + q.difficulty + '</span>'
        + '</div>';
    }).join('')
    + (_pendingImport.questions.length > 5 ? '<p style="color:var(--text-muted);text-align:center;padding:0.3rem">...and ' + (_pendingImport.questions.length - 5) + ' more</p>' : '')
    + '</div>';
}

function confirmImport() {
  if (!_pendingImport) return;
  QuestionBanks.importToCourse(_pendingImport.courseId, _pendingImport.questions, true);
  Utils.showToast('Imported ' + _pendingImport.count + ' questions into ' + _pendingImport.courseId, 'success');
  _pendingImport = null;
  document.getElementById('importPreviewSection').style.display = 'none';
  document.getElementById('csvInput').value = '';
  renderQuestionTable();
}

function cancelImport() {
  _pendingImport = null;
  document.getElementById('importPreviewSection').style.display = 'none';
}

function renderQuestionTable() {
  var container = document.getElementById('questionTableContainer');
  if (!container) return;
  var courseFilter = document.getElementById('qbCourseFilter');
  var diffFilter = document.getElementById('qbDifficultyFilter');
  var typeFilter = document.getElementById('qbTypeFilter');
  var search = document.getElementById('qbSearchInput');
  if (!courseFilter) return;

  var courseId = courseFilter.value;
  var diff = diffFilter.value;
  var type = typeFilter.value;
  var query = search ? search.value.toLowerCase() : '';

  var courses = courseId ? [courseId] : QuizSystem._getCourseList().map(function(c) { return c.id; });
  var allQuestions = [];
  courses.forEach(function(cid) {
    var bank = QuizSystem.getQuestionBank(cid);
    if (!bank) return;
    bank.questions.forEach(function(q) {
      if (diff && q.difficulty !== diff) return;
      if (type && q.type !== type) return;
      if (query && q.question.toLowerCase().indexOf(query) === -1) return;
      allQuestions.push({ course: cid, question: q });
    });
  });

  if (allQuestions.length === 0) {
    container.innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:2rem">No questions found.</p>';
    return;
  }

  var html = '<table style="width:100%;border-collapse:collapse;font-size:0.85rem">'
    + '<thead><tr style="border-bottom:2px solid var(--glass-border);text-align:left">'
    + '<th style="padding:0.5rem">ID</th>'
    + '<th style="padding:0.5rem">Course</th>'
    + '<th style="padding:0.5rem">Question</th>'
    + '<th style="padding:0.5rem">Type</th>'
    + '<th style="padding:0.5rem">Difficulty</th>'
    + '<th style="padding:0.5rem">Actions</th>'
    + '</tr></thead><tbody>'
    + allQuestions.slice(0, 100).map(function(item) {
      var q = item.question;
      return '<tr style="border-bottom:1px solid var(--glass-border-light)">'
        + '<td style="padding:0.4rem;font-size:0.75rem;color:var(--text-muted)">' + (q.id || '').substring(0, 20) + '</td>'
        + '<td style="padding:0.4rem"><strong>' + item.course + '</strong></td>'
        + '<td style="padding:0.4rem;max-width:300px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + q.question.substring(0, 60) + '</td>'
        + '<td style="padding:0.4rem">' + (q.type || 'mcq') + '</td>'
        + '<td style="padding:0.4rem"><span class="badge badge-' + (q.difficulty === 'Beginner' ? 'success' : q.difficulty === 'Intermediate' ? 'warning' : 'error') + '">' + q.difficulty + '</span></td>'
        + '<td style="padding:0.4rem"><button class="btn btn-sm btn-ghost" onclick="Utils.showToast(\'Edit: ' + Utils.sanitize(q.question.substring(0, 30)) + '...\', \'info\')"><i class="fas fa-edit"></i></button></td>'
        + '</tr>';
    }).join('')
    + '</tbody></table>'
    + (allQuestions.length > 100 ? '<p style="text-align:center;color:var(--text-muted);padding:0.5rem;font-size:0.8rem">Showing 100 of ' + allQuestions.length + ' questions</p>' : '');
  container.innerHTML = html;
}

function downloadBank() {
  var courseFilter = document.getElementById('qbCourseFilter');
  var cid = courseFilter ? courseFilter.value : '';
  if (!cid) { Utils.showToast('Select a course to download.', 'warning'); return; }
  QuestionBanks.downloadAsJSON(cid);
}
