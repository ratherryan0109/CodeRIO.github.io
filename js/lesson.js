function initLesson() {
  const params = new URLSearchParams(window.location.search);
  const courseId = params.get('course');
  const moduleId = parseInt(params.get('module')) || 1;
  if (!courseId) { window.location.href = 'Learn.html'; return; }
  loadLesson(courseId, moduleId);
}

async function loadLesson(courseId, moduleId) {
  const data = await Utils.fetchJSON('data/lessons.json');
  const course = data[courseId];
  if (!course) { Utils.showToast('Course not found', 'error'); return; }
  const module = course.modules.find(m => m.id === moduleId) || course.modules[0];
  course.id = courseId;

  if (typeof LearningTracker !== 'undefined') {
    LearningTracker.startLesson(courseId + '_' + moduleId);
  }

  renderBreadcrumb(course, module);
  renderHero(course, module);
  renderModuleList(course, moduleId);
  renderObjectives(module.objectives);
  renderContent(module.content);
  renderCodeExamples(module.content);
  renderExercises(module.exercises);
  renderVideos(module.videos);
  renderQuiz(module.quiz, courseId);
  renderNavigation(course, moduleId);
  loadLessonNotes();
}

function renderBreadcrumb(course, module) {
  document.getElementById('lessonCourseLink').textContent = course.title;
  document.getElementById('lessonCourseLink').href = (window.location.pathname.includes('/courses/') ? '../' : '') + 'courses/' + course.id + '.html';
  document.getElementById('lessonBreadcrumbModule').textContent = module.title;
}

function renderHero(course, module) {
  document.getElementById('lessonTitle').textContent = module.title;
  const meta = document.getElementById('lessonMeta');
  meta.innerHTML = `
    <span class="badge badge-primary"><i class="fas fa-signal"></i> ${module.difficulty}</span>
    <span class="badge badge-success"><i class="far fa-clock"></i> ${module.duration}</span>
    <span class="badge badge-warning"><i class="fas fa-layer-group"></i> Module ${module.id}</span>
  `;

  const progress = Utils.getStorage('course_progress', {});
  const courseP = progress[course.id];
  const completed = courseP ? courseP.completed : [];
  const fill = document.getElementById('lessonProgressFill');
  if (completed.includes(module.id + '')) {
    fill.style.width = '100%';
  } else {
    fill.style.width = '0%';
  }
}

function renderModuleList(course, activeId) {
  var container = document.getElementById('lessonModuleList');
  var progress = Utils.getStorage('course_progress', {});
  var completed = progress[course.id] ? progress[course.id].completed : [];

  var courseList = [
    { id: 'html', title: 'HTML' }, { id: 'css', title: 'CSS' }, { id: 'javascript', title: 'JavaScript' },
    { id: 'python', title: 'Python' }, { id: 'java', title: 'Java' }, { id: 'sql', title: 'SQL' },
    { id: 'cpp', title: 'C++' }, { id: 'react', title: 'React' }, { id: 'git', title: 'Git' },
    { id: 'go', title: 'Go' }, { id: 'docker', title: 'Docker' }, { id: 'nodejs', title: 'Node.js' },
    { id: 'dsa', title: 'DSA' }, { id: 'mysql', title: 'MySQL' }, { id: 'rust', title: 'Rust' },
    { id: 'typescript', title: 'TypeScript' }, { id: 'c', title: 'C' }, { id: 'csharp', title: 'C#' },
    { id: 'kotlin', title: 'Kotlin' }, { id: 'linux', title: 'Linux' }, { id: 'mongodb', title: 'MongoDB' },
    { id: 'pandas', title: 'Pandas' }, { id: 'swift', title: 'Swift' }, { id: 'security', title: 'Security' }
  ];

  var html = '<div style="font-size:0.8rem;color:var(--text-muted);text-align:center;margin-bottom:0.8rem;padding-bottom:0.5rem;border-bottom:1px solid var(--glass-border)">' + courseList.length + ' courses</div>';

  courseList.forEach(function(c) {
    var isCurrent = c.id === course.id;
    var cProgress = progress[c.id];
    var modulesDone = cProgress && cProgress.modulesCompleted ? cProgress.modulesCompleted.length : 0;
    var totalMods = course.modules ? course.modules.length : 10;
    var cPct = modulesDone > 0 ? Math.min(100, Math.round((modulesDone / Math.max(totalMods, 1)) * 100)) : 0;

    html += '<div style="margin-bottom:0.3rem">'
      + '<a href="' + (isCurrent ? '#' : 'lesson.html?course=' + c.id + '&module=1') + '"'
      + ' style="display:flex;align-items:center;gap:0.5rem;padding:0.4rem 0.6rem;border-radius:8px;text-decoration:none;font-size:0.82rem;font-weight:500;transition:var(--transition);'
      + (isCurrent ? 'background:rgba(6,182,212,0.12);color:var(--primary);' : 'color:var(--text-secondary);')
      + '"'
      + ' onmouseover="this.style.background=\'rgba(6,182,212,0.15)\'"'
      + ' onmouseout="this.style.background=\'' + (isCurrent ? 'rgba(6,182,212,0.12)' : 'transparent') + '\'"'
      + '>'
      + '<span style="width:6px;height:6px;border-radius:50%;flex-shrink:0;background:' + (isCurrent ? 'var(--primary)' : cPct > 0 ? 'var(--success)' : 'var(--text-muted)') + '"></span>'
      + '<span style="flex:1">' + c.title + '</span>'
      + (cPct > 0 ? '<span style="font-size:0.65rem;color:var(--success);font-weight:600">' + cPct + '%</span>' : '')
      + '</a>';

    if (isCurrent && course.modules) {
      html += '<div style="margin-left:0.8rem;border-left:2px solid var(--glass-border);padding-left:0.4rem;margin-top:0.2rem;margin-bottom:0.3rem">';
      course.modules.forEach(function(m) {
        var isActive = m.id === activeId;
        var isCompleted = completed.includes(m.id + '') || completed.includes(m.id);
        html += '<a href="lesson.html?course=' + course.id + '&module=' + m.id + '"'
          + ' style="display:flex;align-items:center;gap:0.3rem;padding:0.3rem 0.5rem;border-radius:6px;margin-bottom:0.15rem;font-size:0.75rem;font-weight:400;transition:var(--transition);text-decoration:none;'
          + (isActive ? 'background:var(--primary);color:white;' : 'color:var(--text);background:transparent;')
          + '"'
          + ' onmouseover="this.style.background=\'' + (isActive ? 'var(--primary-dark)' : 'var(--bg-card)') + '\'"'
          + ' onmouseout="this.style.background=\'' + (isActive ? 'var(--primary)' : 'transparent') + '\'"'
          + '>'
          + (isCompleted ? '<i class="fas fa-check-circle" style="font-size:0.65rem;color:' + (isActive ? 'white' : 'var(--success)') + '"></i>' : '<span style="width:12px;height:12px;border-radius:50%;border:1.5px solid var(--text-muted);display:inline-flex;align-items:center;justify-content:center;font-size:0.5rem;flex-shrink:0;color:var(--text-muted)">' + m.id + '</span>')
          + '<span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:130px">' + m.title + '</span>'
          + '</a>';
      });
      html += '</div>';
    }

    html += '</div>';
  });

  container.innerHTML = html;
}

function renderObjectives(objectives) {
  const list = document.getElementById('lessonObjectives');
  list.innerHTML = objectives.map(o => `<li><i class="fas fa-check" style="color:var(--success);margin-right:0.5rem"></i>${o}</li>`).join('');
}

var lessonContentIdCounter = 0;
function uid() { return 'lc_' + (++lessonContentIdCounter); }

function renderContent(content) {
  const container = document.getElementById('lessonBody');
  container.innerHTML = content.map(item => {
    if (item.type === 'paragraph') {
      return `<p style="line-height:1.8;margin-bottom:1.5rem;color:var(--text-secondary);font-size:1.05rem">${item.value}</p>`;
    }
    if (item.type === 'analogy') {
      return `
        <div class="glass" style="padding:1.5rem;border-radius:var(--border-radius-md);margin-bottom:1.5rem;border-left:4px solid var(--warning);background:rgba(245,158,11,0.05)">
          <p style="font-size:1.1rem;font-weight:600;margin-bottom:0.5rem;color:var(--warning)"><i class="fas fa-lightbulb"></i> Think of it this way:</p>
          <p style="line-height:1.8;color:var(--text-secondary)">${item.value}</p>
        </div>
      `;
    }
    if (item.type === 'heading') {
      var level = item.level || 2;
      var tag = 'h' + Math.min(Math.max(level, 2), 4);
      var sizes = { 2: '1.5rem', 3: '1.2rem', 4: '1rem' };
      return `<${tag} style="font-size:${sizes[level] || sizes[2]};margin:1.8rem 0 0.8rem;color:var(--primary-dark);border-bottom:2px solid rgba(6,182,212,0.2);padding-bottom:0.4rem"><i class="fas fa-angle-right" style="color:var(--primary);margin-right:0.5rem;font-size:0.7em"></i>${item.value}</${tag}>`;
    }
    if (item.type === 'list') {
      var ordered = item.style === 'ordered' || item.ordered === true;
      var tag = ordered ? 'ol' : 'ul';
      var items = item.items || [];
      var style = ordered ? 'list-style:decimal;padding-left:1.5rem' : 'list-style:disc;padding-left:1.5rem';
      var icon = item.icon || (ordered ? 'hashtag' : 'circle');
      return `<${tag} style="${style};line-height:2;margin-bottom:1.5rem;color:var(--text-secondary)">${items.map(function(li) {
        return '<li style="margin-bottom:0.3rem">' + (icon !== 'none' ? '<i class="fas fa-' + icon + '" style="color:var(--primary);width:1.2rem;text-align:center;margin-right:0.4rem"></i>' : '') + li + '</li>';
      }).join('')}</${tag}>`;
    }
    if (item.type === 'image') {
      return `<figure style="margin:1.5rem 0;text-align:center">
        <img src="${item.src}" alt="${item.alt || ''}" style="max-width:100%;border-radius:14px;border:1px solid var(--glass-border);box-shadow:var(--shadow-sm);${item.style || ''}" onclick="this.style.transform='scale(1.02)';setTimeout(function(){this.style.transform='scale(1)'}.bind(this),200)" loading="lazy">
        ${item.caption ? '<figcaption style="margin-top:0.5rem;font-size:0.85rem;color:var(--text-muted);font-style:italic">' + item.caption + '</figcaption>' : ''}
      </figure>`;
    }
    if (item.type === 'animation') {
      var src = item.src || '';
      if (src.endsWith('.json') || src.indexOf('lottie') !== -1) {
        return `<div style="margin:1.5rem 0;display:flex;justify-content:center">
          <dotlottie-wc src="${src}" style="width:${item.width || '300px'};height:${item.height || '300px'}" autoplay loop></dotlottie-wc>
        </div>`;
      }
      return `<div style="margin:1.5rem 0;text-align:center">
        <img src="${src}" alt="${item.alt || 'Animation'}" style="max-width:${item.width || '400px'};border-radius:14px" loading="lazy">
      </div>`;
    }
    if (item.type === 'table') {
      var headers = item.headers || [];
      var rows = item.rows || [];
      return `<div style="overflow-x:auto;margin:1.5rem 0;border-radius:12px;border:1px solid var(--glass-border)">
        <table style="width:100%;border-collapse:collapse;font-size:0.9rem">
          <thead><tr style="background:rgba(6,182,212,0.08)">${headers.map(function(h) { return '<th style="padding:0.7rem 1rem;text-align:left;font-weight:700;color:var(--primary-dark);border-bottom:2px solid var(--primary)">' + h + '</th>'; }).join('')}</tr></thead>
          <tbody>${rows.map(function(r, ri) { return '<tr style="background:' + (ri % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.02)') + '">' + r.map(function(c) { return '<td style="padding:0.7rem 1rem;border-bottom:1px solid var(--glass-border);color:var(--text-secondary)">' + c + '</td>'; }).join('') + '</tr>'; }).join('')}</tbody>
        </table>
      </div>`;
    }
    if (item.type === 'tip') {
      var variant = item.style || item.variant || 'info';
      var colors = { info: { border: 'var(--primary)', bg: 'rgba(6,182,212,0.05)', icon: 'info-circle' }, warning: { border: 'var(--warning)', bg: 'rgba(245,158,11,0.05)', icon: 'exclamation-triangle' }, success: { border: 'var(--success)', bg: 'rgba(34,197,94,0.05)', icon: 'check-circle' }, alert: { border: 'var(--error)', bg: 'rgba(239,68,68,0.05)', icon: 'times-circle' } };
      var c = colors[variant] || colors.info;
      return `<div class="lesson-callout" style="padding:1.2rem 1.5rem;border-radius:var(--border-radius-md);margin-bottom:1.5rem;border-left:4px solid ${c.border};background:${c.bg};display:flex;gap:0.8rem;align-items:flex-start">
        <i class="fas fa-${c.icon}" style="color:${c.border};font-size:1.2rem;margin-top:0.1rem;flex-shrink:0"></i>
        <div><strong style="color:${c.border};display:block;margin-bottom:0.3rem">${item.title || variant.charAt(0).toUpperCase() + variant.slice(1)}</strong><span style="color:var(--text-secondary);line-height:1.7">${item.value}</span></div>
      </div>`;
    }
    if (item.type === 'blockquote') {
      return `<blockquote style="margin:1.5rem 0;padding:1.2rem 1.5rem;border-left:4px solid var(--primary);background:rgba(6,182,212,0.04);border-radius:0 var(--border-radius-sm) var(--border-radius-sm) 0;font-style:italic;color:var(--text-secondary);line-height:1.8">
        ${item.value}
        ${item.source ? '<footer style="margin-top:0.5rem;font-size:0.85rem;color:var(--text-muted);font-style:normal">— ' + item.source + '</footer>' : ''}
      </blockquote>`;
    }
    if (item.type === 'interactive') {
      var id = uid();
      var lang = item.language || 'javascript';
      return `<div class="lesson-interactive glass" style="padding:1.5rem;border-radius:var(--border-radius-md);margin-bottom:1.5rem">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.8rem">
          <h4 style="font-size:1rem;color:var(--primary-dark)"><i class="fas fa-laptop-code" style="color:var(--primary)"></i> ${item.title || 'Try it yourself'}</h4>
          <span class="badge badge-primary">${lang}</span>
        </div>
        <textarea id="${id}_editor" rows="${item.rows || 6}" style="width:100%;padding:1rem;background:#0f172a;color:#e2e8f0;border:none;border-radius:8px;font-family:'Fira Code','Cascadia Code',monospace;font-size:0.85rem;line-height:1.6;resize:vertical;tab-size:2">${Utils.sanitize(item.code || '')}</textarea>
        <div style="display:flex;gap:0.5rem;margin-top:0.6rem">
          <button class="btn btn-sm btn-primary" onclick="runInteractiveCode('${id}','${lang}')"><i class="fas fa-play"></i> Run</button>
          <button class="btn btn-sm btn-ghost" onclick="copyInteractiveCode('${id}')"><i class="fas fa-copy"></i> Copy</button>
          <button class="btn btn-sm btn-ghost" onclick="resetInteractiveCode('${id}','${Utils.sanitize(item.code || '')}')"><i class="fas fa-undo"></i> Reset</button>
        </div>
        <div id="${id}_output" style="margin-top:0.6rem;padding:0.8rem 1rem;background:#0f172a;color:#e2e8f0;border-radius:8px;font-family:'Fira Code','Cascadia Code',monospace;font-size:0.85rem;min-height:40px;white-space:pre-wrap;display:none"></div>
      </div>`;
    }
    if (item.type === 'tabs') {
      var id = uid();
      var tabs = item.tabs || [];
      var tabHtml = '<div class="lesson-tabs" style="margin:1.5rem 0">';
      tabHtml += '<div style="display:flex;gap:0;border-bottom:2px solid var(--glass-border);margin-bottom:1rem;overflow-x:auto">';
      tabs.forEach(function(t, ti) {
        tabHtml += '<button class="tab-btn" data-tab="' + id + '_' + ti + '" onclick="switchTab(\'' + id + '\',' + ti + ')" style="padding:0.6rem 1.2rem;border:none;background:' + (ti === 0 ? 'var(--primary)' : 'transparent') + ';color:' + (ti === 0 ? 'white' : 'var(--text-secondary)') + ';font-weight:600;font-size:0.85rem;cursor:pointer;border-radius:8px 8px 0 0;transition:var(--transition)">' + (t.icon ? '<i class="' + t.icon + '"></i> ' : '') + t.title + '</button>';
      });
      tabHtml += '</div>';
      tabs.forEach(function(t, ti) {
        tabHtml += '<div class="tab-pane" id="' + id + '_' + ti + '" style="display:' + (ti === 0 ? 'block' : 'none') + '">' + t.content + '</div>';
      });
      tabHtml += '</div>';
      return tabHtml;
    }
    if (item.type === 'code') {
      let codeHtml = `<div class="glass" style="padding:1.5rem;border-radius:var(--border-radius-md);margin-bottom:1.5rem;overflow:hidden">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem">
          <h4 style="font-size:1rem;color:var(--primary-dark)"><i class="fas fa-code" style="color:var(--primary)"></i> ${item.title || 'Code Example'}</h4>
          <div style="display:flex;gap:0.5rem;align-items:center">
            <span class="badge badge-primary">${item.language}</span>
            <button class="btn btn-sm btn-ghost" onclick="copyCodeBlock(this)" style="padding:0.3rem 0.6rem;font-size:0.75rem"><i class="fas fa-copy"></i> Copy</button>
          </div>
        </div>
        <pre style="background:#0f172a;color:#e2e8f0;padding:1.2rem;border-radius:12px;overflow-x:auto;font-size:0.9rem;line-height:1.6;margin-bottom:0;position:relative"><code>${Utils.sanitize(item.code)}</code></pre>`;

      if (item.explanation) {
        codeHtml += `<div style="overflow-x:auto;margin-top:1rem">
          <table style="width:100%;border-collapse:collapse;font-size:0.85rem">
            <thead><tr><th style="text-align:left;padding:0.5rem 0.8rem;border-bottom:2px solid var(--primary);color:var(--primary);font-weight:600">Code</th><th style="text-align:left;padding:0.5rem 0.8rem;border-bottom:2px solid var(--primary);color:var(--primary);font-weight:600">Explanation</th></tr></thead>
            <tbody>${item.explanation.map(e => `<tr><td style="padding:0.5rem 0.8rem;border-bottom:1px solid #e2e8f0;font-family:monospace;background:#f1f5f9;border-radius:4px;white-space:nowrap"><code>${Utils.sanitize(e.code)}</code></td><td style="padding:0.5rem 0.8rem;border-bottom:1px solid #e2e8f0;color:var(--text-secondary)">${e.desc}</td></tr>`).join('')}</tbody>
          </table>
        </div>`;
      }

      codeHtml += `</div>`;
      return codeHtml;
    }
    return '';
  }).join('');
}

function runInteractiveCode(id, lang) {
  var editor = document.getElementById(id + '_editor');
  var output = document.getElementById(id + '_output');
  if (!editor || !output) return;
  var code = editor.value;
  output.style.display = 'block';
  try {
    if (lang === 'javascript' || lang === 'js') {
      var logs = [];
      var mockConsole = { log: function() { logs.push(Array.prototype.slice.call(arguments).join(' ')); }, error: function() { logs.push('Error: ' + Array.prototype.slice.call(arguments).join(' ')); } };
      var fn = new Function('console', code);
      fn(mockConsole);
      output.textContent = logs.length > 0 ? logs.join('\n') : 'Code executed successfully (no output)';
      output.style.color = '#e2e8f0';
    } else if (lang === 'html') {
      var iframe = document.createElement('iframe');
      iframe.style.width = '100%';
      iframe.style.height = '200px';
      iframe.style.border = 'none';
      iframe.style.borderRadius = '8px';
      iframe.style.background = 'white';
      output.innerHTML = '';
      output.appendChild(iframe);
      iframe.contentDocument.write(code);
      iframe.contentDocument.close();
    } else {
      output.textContent = 'Running ' + lang + ' code... (output simulation)';
      output.textContent += '\n\n[Code]:\n' + code;
    }
    localStorage.setItem('interactive_runs', (parseInt(localStorage.getItem('interactive_runs') || '0') + 1).toString());
  } catch (e) {
    output.textContent = 'Error: ' + e.message;
    output.style.color = '#ef4444';
  }
}

function copyInteractiveCode(id) {
  var editor = document.getElementById(id + '_editor');
  if (!editor) return;
  navigator.clipboard.writeText(editor.value).then(function() {
    Utils.showToast('Code copied to clipboard!', 'success');
  }).catch(function() {
    editor.select();
    document.execCommand('copy');
    Utils.showToast('Code copied!', 'success');
  });
}

function resetInteractiveCode(id, originalCode) {
  var editor = document.getElementById(id + '_editor');
  var output = document.getElementById(id + '_output');
  if (editor) { editor.value = originalCode; }
  if (output) { output.style.display = 'none'; output.textContent = ''; }
}

function copyCodeBlock(btn) {
  var pre = btn.closest('.glass').querySelector('pre code');
  if (!pre) return;
  navigator.clipboard.writeText(pre.textContent).then(function() {
    Utils.showToast('Code copied to clipboard!', 'success');
  }).catch(function() {
    var range = document.createRange();
    range.selectNode(pre);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    Utils.showToast('Code copied!', 'success');
  });
}

function switchTab(id, idx) {
  var container = document.getElementById(id);
  if (!container) return;
  var buttons = container.querySelectorAll('.tab-btn');
  var panes = container.querySelectorAll('.tab-pane');
  buttons.forEach(function(b, i) {
    b.style.background = i === idx ? 'var(--primary)' : 'transparent';
    b.style.color = i === idx ? 'white' : 'var(--text-secondary)';
  });
  panes.forEach(function(p, i) {
    p.style.display = i === idx ? 'block' : 'none';
  });
}

function renderCodeExamples(content) {
  const container = document.getElementById('lessonCodeExamples');
  const codeItems = content.filter(c => c.type === 'code');
  if (codeItems.length === 0) { container.innerHTML = ''; return; }
}

function renderExercises(exercises) {
  const list = document.getElementById('exercisesList');
  if (!exercises || exercises.length === 0) { document.getElementById('lessonExercises').style.display = 'none'; return; }
  document.getElementById('lessonExercises').style.display = 'block';
  list.innerHTML = exercises.map((e, i) => `<li style="margin-bottom:0.8rem;line-height:1.6"><strong style="color:var(--primary)">${i + 1}.</strong> ${e}</li>`).join('');
}

function renderVideos(videos) {
  const container = document.getElementById('videosList');
  if (!videos || videos.length === 0) { document.getElementById('lessonVideos').style.display = 'none'; return; }
  document.getElementById('lessonVideos').style.display = 'block';
  container.innerHTML = videos.map(v => `
    <div class="video-card" style="border-radius:var(--border-radius-md);overflow:hidden;background:var(--bg-card);border:1px solid var(--glass-border);transition:var(--transition)">
      <div class="video-thumbnail" style="position:relative;width:100%;aspect-ratio:16/9;background:#1e293b;display:flex;align-items:center;justify-content:center">
        <iframe src="${v.url}" title="${v.title}" frameborder="0" allowfullscreen style="width:100%;height:100%;border:none"></iframe>
      </div>
      <div class="video-info" style="padding:1rem 1.2rem">
        <h4 style="font-size:0.95rem;margin-bottom:0.3rem">${v.title}</h4>
        <p style="font-size:0.85rem;color:var(--text-muted)">${v.creator}</p>
      </div>
    </div>
  `).join('');
}

function renderQuiz(quiz, courseId) {
  var link = document.getElementById('quizHubLink');
  var container = document.getElementById('lessonQuiz');
  if (!quiz || quiz.length === 0) { container.style.display = 'none'; return; }
  container.style.display = 'block';
  document.getElementById('quizScore').textContent = '';
  if (link) {
    link.href = 'quiz-hub.html?course=' + (courseId || '');
  }
}

function submitLessonQuiz() {
  const params = new URLSearchParams(window.location.search);
  const courseId = params.get('course');
  const moduleId = parseInt(params.get('module')) || 1;

  Utils.fetchJSON('data/lessons.json').then(data => {
    const course = data[courseId];
    if (!course) return;
    const module = course.modules.find(m => m.id === moduleId) || course.modules[0];
    const quiz = module.quiz;
    if (!quiz) return;

    let correct = 0;
    quiz.forEach((q, qi) => {
      const selected = document.querySelector(`input[name="q${qi}"]:checked`);
      const options = document.querySelectorAll(`input[name="q${qi}"]`);
      options.forEach((opt, oi) => {
        const label = opt.closest('.quiz-option');
        if (oi === q.answer) {
          label.style.borderColor = 'var(--success)';
          label.style.background = 'rgba(34,197,94,0.1)';
        }
        if (opt.checked && oi !== q.answer) {
          label.style.borderColor = 'var(--error)';
          label.style.background = 'rgba(239,68,68,0.1)';
        }
      });
      if (selected && parseInt(selected.value) === q.answer) {
        correct++;
      }
    });

    const total = quiz.length;
    const score = Math.round((correct / total) * 100);
    const scoreEl = document.getElementById('quizScore');

    if (score >= 60) {
      scoreEl.innerHTML = `<span style="color:var(--success)"><i class="fas fa-check-circle"></i> You scored ${correct}/${total} (${score}%) - Passed!</span>`;
      if (typeof LearningTracker !== 'undefined') {
        LearningTracker.recordQuizAttempt(courseId + '_' + moduleId, correct, total);
        LearningTracker.completeLesson(courseId + '_' + moduleId, courseId);

        const fill = document.getElementById('lessonProgressFill');
        fill.style.width = '100%';
      }
      const activity = Utils.getStorage('coderio_activity', []);
      activity.unshift({ text: 'Completed lesson: ' + (course.title || courseId) + ' - ' + moduleId, time: new Date().toISOString(), type: 'green' });
      Utils.setStorage('coderio_activity', activity.slice(0, 50));
      if (typeof DailyGoals !== 'undefined') {
        DailyGoals.recordProgress('lessons', 1);
        DailyGoals.recordProgress('modules', 1);
        DailyGoals.recordProgress('quizQuestions', total);
      }
      Utils.showToast('Quiz passed! Lesson completed.', 'success');
    } else {
      if (typeof DailyGoals !== 'undefined') {
        DailyGoals.recordProgress('quizQuestions', total);
      }
      scoreEl.innerHTML = `<span style="color:var(--error)"><i class="fas fa-times-circle"></i> You scored ${correct}/${total} (${score}%) - Need 60% to pass. Try again!</span>`;
      Utils.showToast('Score too low. Review the lesson and try again.', 'warning');
    }

    document.querySelectorAll('.quiz-option input').forEach(inp => inp.disabled = true);
  });
}

function saveLessonNotes() {
  const input = document.getElementById('lessonNotesInput');
  if (!input || !input.value.trim()) { Utils.showToast('Write something first.', 'info'); return; }
  const params = new URLSearchParams(window.location.search);
  const courseId = params.get('course');
  const moduleId = params.get('module') || '1';
  const key = 'lesson_note_' + courseId + '_' + moduleId;
  Utils.setStorage(key, input.value.trim());
  const status = document.getElementById('lessonNotesStatus');
  if (status) { status.textContent = 'Notes saved!'; status.style.display = 'inline'; setTimeout(function() { status.style.display = 'none'; }, 2000); }
  Utils.showToast('Notes saved!', 'success');
}

function loadLessonNotes() {
  const params = new URLSearchParams(window.location.search);
  const courseId = params.get('course');
  const moduleId = params.get('module') || '1';
  const key = 'lesson_note_' + courseId + '_' + moduleId;
  const saved = Utils.getStorage(key, '');
  const input = document.getElementById('lessonNotesInput');
  if (input && saved) input.value = saved;
}

function renderNavigation(course, moduleId) {
  const modules = course.modules;
  const idx = modules.findIndex(m => m.id === moduleId);

  const prevBtn = document.getElementById('prevLessonBtn');
  const nextBtn = document.getElementById('nextLessonBtn');

  if (idx > 0) {
    const prev = modules[idx - 1];
    prevBtn.style.display = 'inline-flex';
    prevBtn.href = `lesson.html?course=${course.id}&module=${prev.id}`;
  } else {
    prevBtn.style.display = 'none';
  }

  if (idx < modules.length - 1) {
    const next = modules[idx + 1];
    nextBtn.style.display = 'inline-flex';
    nextBtn.href = `lesson.html?course=${course.id}&module=${next.id}`;
  } else {
    nextBtn.innerHTML = '<i class="fas fa-check-circle"></i> Complete';
    nextBtn.style.display = 'inline-flex';
    nextBtn.href = (window.location.pathname.includes('/courses/') ? '../' : '') + 'courses/' + course.id + '.html';
  }
}

document.addEventListener('DOMContentLoaded', initLesson);
