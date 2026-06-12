const fs = require('fs');
const path = require('path');

const lessonsPath = path.join(__dirname, 'lessons.json');
const coursesDir = path.join(__dirname, '..', 'courses');

const lessons = JSON.parse(fs.readFileSync(lessonsPath, 'utf-8'));
const courseFiles = fs.readdirSync(coursesDir).filter(f => f.endsWith('.html'));

const difficultyMap = {
  1: 'Beginner',
  2: 'Beginner',
  3: 'Beginner',
  4: 'Beginner',
  5: 'Beginner',
  6: 'Intermediate',
  7: 'Intermediate',
  8: 'Intermediate',
  9: 'Intermediate',
  10: 'Advanced',
  11: 'Advanced',
  12: 'Advanced',
  13: 'Advanced',
  14: 'Expert',
  15: 'Expert',
  16: 'Expert',
  17: 'Expert',
  18: 'Expert'
};

const levelLabels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

function parseModules(html, courseKey) {
  const modules = [];
  var htmlOneLine = html.replace(/\n\s*/g, ' ');
  const regex = /<(?:div|a)[^>]*class="module-card"[^>]*>[\s\S]*?<h3><span class="module-number">(\d+)<\/span>\s*([^<]+?)<\/h3>[\s\S]*?<p>([^<]*?)<\/p>/g;
  let match;
  while ((match = regex.exec(htmlOneLine)) !== null) {
    modules.push({
      id: parseInt(match[1]),
      title: match[2].trim(),
      description: match[3].trim()
    });
  }
  return modules;
}

function makeObjectives(desc, title) {
  if (!desc) return [`Learn ${title}`, `Practice ${title}`, `Master ${title}`];
  return desc.split(',').map(s => s.trim()).filter(Boolean).slice(0, 6).map(s => {
    s = s.replace(/\([^)]*\)/g, '').trim();
    if (!s.startsWith('Learn') && !s.startsWith('Understand') && !s.startsWith('Master')) {
      return 'Understand ' + s.charAt(0).toLowerCase() + s.slice(1);
    }
    return s;
  });
  if (objectives.length < 3) objectives = [`Learn ${title}`, `Practice ${title}`, `Master ${title}`];
  return objectives;
}

function makeContent(desc, title) {
  const content = [];
  if (desc) {
    content.push({
      type: 'paragraph',
      value: `${title}: ${desc}`
    });
  } else {
    content.push({
      type: 'paragraph',
      value: `Learn about ${title} in this module.`
    });
  }
  content.push({
    type: 'code',
    title: `${title} Example`,
    language: getLanguage(title),
    code: getExampleCode(title),
    explanation: [
      { code: '// Example', desc: `${title} code example` }
    ]
  });
  return content;
}

function getLanguage(title) {
  const langs = ['javascript', 'python', 'java', 'cpp', 'csharp', 'go', 'rust', 'kotlin', 'swift', 'typescript', 'html', 'css', 'sql', 'bash', 'dockerfile', 'yaml'];
  return langs[Math.floor(Math.random() * langs.length)];
}

function getExampleCode(title) {
  return `// ${title} example\nconsole.log("Learn ${title}");\n// Practice makes perfect!`;
}

function makeExercises(title) {
  return [
    `Practice ${title} fundamentals`,
    `Build a small project using ${title}`,
    `Review and refactor ${title} code`
  ];
}

function makeQuiz(title) {
  const q = `Which of the following best describes ${title}?`;
  return [
    {
      question: q,
      options: [
        `A fundamental concept in programming`,
        `A design pattern`,
        `A testing framework`,
        `A database system`
      ],
      answer: 0
    },
    {
      question: `What is a common use case for ${title}?`,
      options: [
        `Building web applications`,
        `Data analysis`,
        `System programming`,
        `All of the above`
      ],
      answer: 3
    },
    {
      question: `Which skill level is ${title} typically associated with?`,
      options: [
        `Beginner`,
        `Intermediate`,
        `Advanced`,
        `Varies by implementation`
      ],
      answer: 3
    }
  ];
}

courseFiles.forEach(file => {
  const courseKey = path.basename(file, '.html');
  const html = fs.readFileSync(path.join(coursesDir, file), 'utf-8');
  const htmlModules = parseModules(html, courseKey);

  if (!htmlModules.length) return;
  if (!lessons[courseKey]) {
    lessons[courseKey] = { title: courseKey.charAt(0).toUpperCase() + courseKey.slice(1), modules: [] };
  }

  const existingIds = new Set((lessons[courseKey].modules || []).map(m => m.id));
  let added = 0;

  htmlModules.forEach(mod => {
    if (existingIds.has(mod.id)) return;

    const diff = difficultyMap[mod.id] || 'Intermediate';
    const dur = `${15 + Math.floor(mod.id * 1.5)} min`;

    const newModule = {
      id: mod.id,
      title: mod.title,
      difficulty: diff,
      duration: dur,
      objectives: makeObjectives(mod.description, mod.title),
      content: makeContent(mod.description, mod.title),
      exercises: makeExercises(mod.title),
      quiz: makeQuiz(mod.title),
      videos: []
    };

    lessons[courseKey].modules.push(newModule);
    existingIds.add(mod.id);
    added++;
  });

  if (added > 0) {
    lessons[courseKey].modules.sort((a, b) => a.id - b.id);
    console.log(`${courseKey}: added ${added} modules (now ${lessons[courseKey].modules.length})`);
  }
});

fs.writeFileSync(lessonsPath, JSON.stringify(lessons, null, 2), 'utf-8');
console.log('Done. Updated lessons.json');
