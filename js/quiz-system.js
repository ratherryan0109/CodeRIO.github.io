var QuizSystem = {
  QUESTIONS_PER_TEST: 100,
  TIME_PER_QUESTION: 30,
  _QUESTION_BANKS: {},

  getQuestionBank(courseId) {
    if (this._QUESTION_BANKS[courseId]) return this._QUESTION_BANKS[courseId];
    var cached = Utils.getStorage('qb_' + courseId, null);
    if (cached) {
      this._QUESTION_BANKS[courseId] = cached;
      return cached;
    }
    var bank = this._generateBank(courseId);
    this._QUESTION_BANKS[courseId] = bank;
    Utils.setStorage('qb_' + courseId, bank);
    return bank;
  },

  getAvailableCourses() {
    var courses = this._getCourseList();
    return courses.map(function(c) {
      var bank = QuizSystem.getQuestionBank(c.id);
      return { id: c.id, title: c.title, count: bank ? bank.questions.length : 0 };
    });
  },

  _getCourseList() {
    return [
      { id: 'html', title: 'HTML' },
      { id: 'css', title: 'CSS' },
      { id: 'javascript', title: 'JavaScript' },
      { id: 'python', title: 'Python' },
      { id: 'java', title: 'Java' },
      { id: 'sql', title: 'SQL' },
      { id: 'cpp', title: 'C++' },
      { id: 'react', title: 'React' },
      { id: 'git', title: 'Git' },
      { id: 'go', title: 'Go' },
      { id: 'docker', title: 'Docker' },
      { id: 'nodejs', title: 'Node.js' },
      { id: 'dsa', title: 'DSA' },
      { id: 'mysql', title: 'MySQL' },
      { id: 'rust', title: 'Rust' },
      { id: 'typescript', title: 'TypeScript' },
      { id: 'c', title: 'C' },
      { id: 'csharp', title: 'C#' },
      { id: 'kotlin', title: 'Kotlin' },
      { id: 'linux', title: 'Linux' },
      { id: 'mongodb', title: 'MongoDB' },
      { id: 'pandas', title: 'Pandas' },
      { id: 'swift', title: 'Swift' },
      { id: 'security', title: 'Security' }
    ];
  },

  _getCourseTitle(courseId) {
    var map = {};
    this._getCourseList().forEach(function(c) { map[c.id] = c.title; });
    return map[courseId] || courseId;
  },

  _generateBank(courseId) {
    var difficulties = ['Beginner', 'Normal', 'Intermediate', 'Advanced'];
    var all = [];
    difficulties.forEach(function(diff) {
      var qs = QuizSystem._generateQuestionsForDifficulty(courseId, diff, 2000);
      all = all.concat(qs);
    });
    var deduped = QuizSystem._deduplicate(all);
    return { title: QuizSystem._getCourseTitle(courseId), questions: deduped };
  },

  _deduplicate(qs) {
    var seen = {};
    return qs.filter(function(q) {
      var key = q.question.substring(0, 40).toLowerCase();
      if (seen[key]) return false;
      seen[key] = true;
      return true;
    });
  },

  _generateQuestionsForDifficulty(courseId, difficulty, targetCount) {
    var concepts = QuizSystem._CONCEPTS[courseId];
    if (!concepts || !concepts[difficulty]) return QuizSystem._generateFallback(courseId, difficulty, targetCount);
    var typeDistribution = { mcq: 0.25, multipleSelect: 0.12, trueFalse: 0.12, codeOutput: 0.18, debugging: 0.12, scenario: 0.12, fillBlank: 0.09 };
    var questions = [];
    var typeKeys = Object.keys(typeDistribution);
    typeKeys.forEach(function(type) {
      var count = Math.round(targetCount * typeDistribution[type]);
      var qs = QuizSystem._expandTemplates(courseId, difficulty, type, concepts[difficulty], count);
      questions = questions.concat(qs);
    });
    if (questions.length < targetCount) {
      var extra = QuizSystem._generateFallback(courseId, difficulty, targetCount - questions.length);
      questions = questions.concat(extra);
    }
    return questions;
  },

  _expandTemplates(courseId, difficulty, type, conceptList, count) {
    var result = [];
    var idx = 0;
    var attempts = 0;
    while (result.length < count && attempts < count * 3) {
      attempts++;
      for (var c = 0; c < conceptList.length && result.length < count; c++) {
        var concept = conceptList[c];
        var templates = QuizSystem._getTypeTemplates(type);
        for (var t = 0; t < templates.length && result.length < count; t++) {
          var q = templates[t](concept, courseId, difficulty, idx);
          if (q) {
            q.id = 'q_' + courseId + '_' + difficulty.toLowerCase() + '_' + type + '_' + idx;
            q.difficulty = difficulty;
            q.type = type;
            q.subtopic = concept.topic || concept.name || '';
            q.documentation = concept.doc || '';
            q.courseId = courseId;
            result.push(q);
            idx++;
          }
        }
      }
    }
    return result;
  },

  _getTypeTemplates(type) {
    var templates = {
      mcq: [QuizSystem._tmpl_mcq_fact, QuizSystem._tmpl_mcq_definition, QuizSystem._tmpl_mcq_purpose],
      multipleSelect: [QuizSystem._tmpl_ms_which_are, QuizSystem._tmpl_ms_select_all, QuizSystem._tmpl_ms_select_correct],
      trueFalse: [QuizSystem._tmpl_tf_statement, QuizSystem._tmpl_tf_common_misconception],
      codeOutput: [QuizSystem._tmpl_code_output_simple, QuizSystem._tmpl_code_output_expression, QuizSystem._tmpl_code_output_loop],
      debugging: [QuizSystem._tmpl_debug_error, QuizSystem._tmpl_debug_fix, QuizSystem._tmpl_debug_behavior],
      scenario: [QuizSystem._tmpl_scenario_apply, QuizSystem._tmpl_scenario_best_practice, QuizSystem._tmpl_scenario_design],
      fillBlank: [QuizSystem._tmpl_fill_keyword, QuizSystem._tmpl_fill_value, QuizSystem._tmpl_fill_phrase]
    };
    return templates[type] || templates.mcq;
  },

  _tmpl_mcq_fact(concept, courseId, difficulty, idx) {
    var facts = concept.facts || [];
    if (facts.length === 0) return null;
    var f = facts[idx % facts.length];
    if (!f || !f.q) return null;
    var opts = f.options || [];
    if (opts.length < 2) return null;
    var correct = f.answer !== undefined ? f.answer : 0;
    return { question: f.q, options: opts.slice(), answer: correct, explanation: f.e || f.q };
  },

  _tmpl_mcq_definition(concept, courseId, difficulty, idx) {
    var terms = concept.definitions || concept.facts || [];
    if (terms.length === 0) return null;
    var t = terms[idx % terms.length];
    if (!t || !t.term) return null;
    var def = t.def || t.e || '';
    var distractors = t.distractors || ['A different concept in ' + courseId, 'An unrelated programming term', 'A common misconception'];
    var opts = [def].concat(distractors.slice(0, 3));
    var shuffled = QuizSystem._shuffleWithAnswer(opts, 0);
    return { question: 'What is ' + t.term + '?', options: shuffled.items, answer: shuffled.answer, explanation: t.term + ': ' + def };
  },

  _tmpl_mcq_purpose(concept, courseId, difficulty, idx) {
    var items = concept.facts || [];
    if (items.length === 0) return null;
    var item = items[idx % items.length];
    if (!item || !item.feature) return null;
    var distractors = ['To improve performance', 'To reduce code size', 'To enhance security', 'To simplify debugging'];
    var opts = [item.purpose || item.e || ''].concat(distractors.slice(0, 3));
    var shuffled = QuizSystem._shuffleWithAnswer(opts, 0);
    return { question: 'What is the purpose of ' + item.feature + '?', options: shuffled.items, answer: shuffled.answer, explanation: item.feature + ' is used for ' + (item.purpose || item.e || '') };
  },

  _tmpl_ms_which_are(concept, courseId, difficulty, idx) {
    var items = concept.facts || [];
    if (items.length < 4) return null;
    var indices = [idx % items.length, (idx + 1) % items.length, (idx + 2) % items.length, (idx + 3) % items.length];
    var chosen = indices.map(function(i) { return items[i]; }).filter(Boolean);
    if (chosen.length < 4) return null;
    var opts = chosen.map(function(c, i) {
      var label = c.term || c.feature || c.q || 'Concept ' + (i + 1);
      return label + ' — ' + (c.def || c.purpose || c.e || 'Related to ' + courseId);
    });
    var correctIdx = [0, 2];
    var correctVals = correctIdx.map(function(i) { return opts[i]; });
    var shuffled = QuizSystem._shuffleWithAnswer(opts, correctIdx);
    return {
      question: 'Which TWO statements are correct about this ' + courseId + ' topic? (Select all that apply)',
      options: shuffled.items,
      answer: shuffled.answer,
      isMulti: true,
      explanation: 'The correct statements are: ' + correctVals.join(' | ')
    };
  },

  _tmpl_ms_select_all(concept, courseId, difficulty, idx) {
    var items = concept.facts || [];
    if (items.length < 6) return null;
    var picks = [];
    for (var pi = 0; pi < 4; pi++) {
      picks.push(items[(idx + pi) % items.length]);
    }
    var truthMap = picks.map(function(item, i) {
      var q = item.q || item.e || '';
      var statement = item.term ? (item.term + ': ' + (item.def || '')) : q;
      var isTrue = (i + idx) % 3 !== 0;
      return { text: statement, correct: isTrue };
    });
    var opts = truthMap.map(function(t) { return t.text; });
    var correctIndices = [];
    truthMap.forEach(function(t, i) { if (t.correct) correctIndices.push(i); });
    var shuffled = QuizSystem._shuffleWithAnswer(opts, correctIndices);
    return {
      question: 'Select ALL correct statements about ' + (concept.topic || courseId) + ':',
      options: shuffled.items,
      answer: shuffled.answer,
      isMulti: true,
      explanation: correctIndices.length + ' of ' + opts.length + ' statements are correct.'
    };
  },

  _tmpl_ms_select_correct(concept, courseId, difficulty, idx) {
    var items = concept.definitions || concept.facts || [];
    if (items.length < 3) return null;
    var correct = items[idx % items.length];
    if (!correct || !correct.term) return null;
    var def = correct.def || correct.e || '';
    var wrong = [];
    for (var wi = 1; wi <= 3; wi++) {
      var w = items[(idx + wi) % items.length];
      if (w && w.def && w.term !== correct.term) wrong.push(w.term + ': ' + w.def);
      else wrong.push('A different ' + courseId + ' concept');
    }
    var opts = [correct.term + ': ' + def].concat(wrong);
    var correctIndices = [0];
    var shuffled = QuizSystem._shuffleWithAnswer(opts, correctIndices);
    return {
      question: 'Which of the following correctly defines "' + correct.term + '"?',
      options: shuffled.items,
      answer: shuffled.answer,
      isMulti: false,
      explanation: correct.term + ': ' + def
    };
  },

  _tmpl_tf_statement(concept, courseId, difficulty, idx) {
    var items = concept.facts || [];
    if (items.length === 0) return null;
    var item = items[idx % items.length];
    if (!item) return null;
    var isTrue = idx % 3 !== 0;
    var statement = item.q || item.e || '';
    if (!statement) return null;
    if (!isTrue && item.falseVersion) statement = item.falseVersion;
    else if (!isTrue) statement = 'The opposite of: ' + statement;
    return { question: statement, options: ['True', 'False'], answer: isTrue ? 0 : 1, explanation: (isTrue ? 'True' : 'False') + ' — ' + (item.e || item.q || statement) };
  },

  _tmpl_tf_common_misconception(concept, courseId, difficulty, idx) {
    var misconceptions = concept.misconceptions || [];
    if (misconceptions.length === 0) {
      var items = concept.facts || [];
      if (items.length === 0) return null;
      var item = items[idx % items.length];
      if (!item || !item.e) return null;
      return { question: item.e, options: ['True', 'False'], answer: 0, explanation: 'True — This is a correct statement about ' + (concept.topic || courseId) + '.' };
    }
    var m = misconceptions[idx % misconceptions.length];
    return { question: m.statement || m.q || '', options: ['True', 'False'], answer: m.isTrue ? 0 : 1, explanation: (m.isTrue ? 'True' : 'False') + ' — ' + (m.e || '') };
  },

  _tmpl_code_output_simple(concept, courseId, difficulty, idx) {
    var codeSnippets = concept.codeExamples || concept.codeSnippets || [];
    if (codeSnippets.length === 0) return null;
    var snippet = codeSnippets[idx % codeSnippets.length];
    if (!snippet || !snippet.code) return null;
    return { question: 'What is the output of the following code?\n\n' + snippet.code, options: snippet.options || ['undefined', 'null', 'Error', '0'], answer: snippet.answer !== undefined ? snippet.answer : 0, explanation: snippet.explanation || snippet.e || 'Run the code to see the output.' };
  },

  _tmpl_code_output_expression(concept, courseId, difficulty, idx) {
    var expressions = concept.expressions || concept.codeExamples || [];
    if (expressions.length === 0) return null;
    var expr = expressions[idx % expressions.length];
    if (!expr || !expr.code) return null;
    return { question: 'What does this expression evaluate to?\n\n' + expr.code, options: expr.options || ['true', 'false', 'undefined', 'NaN'], answer: expr.answer !== undefined ? expr.answer : 0, explanation: expr.explanation || '' };
  },

  _tmpl_code_output_loop(concept, courseId, difficulty, idx) {
    var loops = concept.loopExamples || concept.codeExamples || [];
    if (loops.length === 0) return null;
    var loop = loops[idx % loops.length];
    if (!loop || !loop.code) return null;
    return { question: 'How many times does the following loop execute?\n\n' + loop.code, options: loop.options || ['0', '1', 'Infinite', '10'], answer: loop.answer !== undefined ? loop.answer : 0, explanation: loop.explanation || '' };
  },

  _tmpl_debug_error(concept, courseId, difficulty, idx) {
    var bugs = concept.bugs || concept.codeExamples || [];
    if (bugs.length === 0) return null;
    var bug = bugs[idx % bugs.length];
    if (!bug || !bug.code) return null;
    return { question: 'What error will this code produce?\n\n' + bug.code, options: bug.options || ['SyntaxError', 'TypeError', 'ReferenceError', 'RangeError'], answer: bug.answer !== undefined ? bug.answer : 0, explanation: bug.explanation || '' };
  },

  _tmpl_debug_fix(concept, courseId, difficulty, idx) {
    var bugs = concept.bugs || concept.codeExamples || [];
    if (bugs.length === 0) return null;
    var bug = bugs[idx % bugs.length];
    if (!bug || !bug.code || !bug.fix) return null;
    return { question: 'What is the fix for this code?\n\n' + bug.code, options: bug.fixOptions || [bug.fix, 'Remove the function', 'Add a semicolon', 'Nothing, it works'], answer: bug.answer !== undefined ? bug.answer : 0, explanation: bug.explanation || bug.fix };
  },

  _tmpl_debug_behavior(concept, courseId, difficulty, idx) {
    var bugs = concept.bugs || concept.codeExamples || [];
    if (bugs.length === 0) return null;
    var bug = bugs[idx % bugs.length];
    if (!bug || !bug.code) return null;
    return { question: 'What is the unexpected behavior in this code?\n\n' + bug.code, options: bug.options || ['It throws an error', 'It prints undefined', 'It runs infinitely', 'It modifies the wrong variable'], answer: bug.answer !== undefined ? bug.answer : 0, explanation: bug.explanation || '' };
  },

  _tmpl_scenario_apply(concept, courseId, difficulty, idx) {
    var scenarios = concept.scenarios || [];
    if (scenarios.length === 0) return null;
    var s = scenarios[idx % scenarios.length];
    if (!s) return null;
    return { question: s.question || s.q || '', options: s.options || ['Option A', 'Option B', 'Option C', 'Option D'], answer: s.answer !== undefined ? s.answer : 0, explanation: s.explanation || s.e || '' };
  },

  _tmpl_scenario_best_practice(concept, courseId, difficulty, idx) {
    var practices = concept.bestPractices || concept.scenarios || [];
    if (practices.length === 0) return null;
    var p = practices[idx % practices.length];
    if (!p) return null;
    return { question: (p.question || p.q || 'What is the best practice here?') + '\n\n' + (p.context || ''), options: p.options || ['Use a loop', 'Use a map function', 'Use recursion', 'Use a while loop'], answer: p.answer !== undefined ? p.answer : 0, explanation: p.explanation || p.e || '' };
  },

  _tmpl_scenario_design(concept, courseId, difficulty, idx) {
    var designs = concept.designPatterns || concept.scenarios || [];
    if (designs.length === 0) return null;
    var d = designs[idx % designs.length];
    if (!d) return null;
    return { question: d.question || d.q || '', options: d.options || ['Singleton', 'Factory', 'Observer', 'Strategy'], answer: d.answer !== undefined ? d.answer : 0, explanation: d.explanation || d.e || '' };
  },

  _tmpl_fill_keyword(concept, courseId, difficulty, idx) {
    var keywords = concept.keywords || concept.facts || [];
    if (keywords.length === 0) return null;
    var kw = keywords[idx % keywords.length];
    if (!kw || (!kw.blank && !kw.q)) return null;
    return { question: kw.blank || kw.q || '', options: kw.options || ['keyword', 'value', 'function', 'variable'], answer: kw.answer !== undefined ? kw.answer : 0, explanation: kw.e || kw.explanation || '' };
  },

  _tmpl_fill_value(concept, courseId, difficulty, idx) {
    var values = concept.values || concept.facts || [];
    if (values.length === 0) return null;
    var v = values[idx % values.length];
    if (!v || (!v.blank && !v.q)) return null;
    return { question: v.blank || v.q || '', options: v.options || ['0', '1', 'null', 'undefined'], answer: v.answer !== undefined ? v.answer : 0, explanation: v.e || v.explanation || '' };
  },

  _tmpl_fill_phrase(concept, courseId, difficulty, idx) {
    var phrases = concept.phrases || concept.facts || [];
    if (phrases.length === 0) return null;
    var ph = phrases[idx % phrases.length];
    if (!ph || (!ph.blank && !ph.q)) return null;
    return { question: ph.blank || ph.q || '', options: ph.options || ['term', 'concept', 'pattern', 'principle'], answer: ph.answer !== undefined ? ph.answer : 0, explanation: ph.e || ph.explanation || '' };
  },

  _shuffleWithAnswer(arr, correctIdx) {
    var items = arr.slice();
    var isArray = Array.isArray(correctIdx);
    var correctValues = isArray ? correctIdx.map(function(i) { return items[i]; }) : [items[correctIdx]];
    for (var i = items.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = items[i]; items[i] = items[j]; items[j] = tmp;
    }
    var answer = isArray ? correctValues.map(function(v) { return items.indexOf(v); }).sort() : items.indexOf(correctValues[0]);
    return { items: items, answer: answer };
  },

  _generateFallback(courseId, difficulty, count) {
    var qs = [];
    for (var i = 0; i < count; i++) {
      var subtopics = ['general ' + courseId, 'core concepts', 'best practices', 'common patterns'];
      var st = subtopics[i % subtopics.length];
      qs.push({
        id: courseId + '_fb_' + difficulty + '_' + i,
        question: 'What is a key concept in ' + courseId + ' related to ' + st + '?',
        options: ['Understanding the fundamentals', 'Advanced optimization techniques', 'Security considerations', 'Performance best practices'],
        answer: 0,
        difficulty: difficulty,
        type: 'mcq',
        subtopic: st,
        courseId: courseId,
        documentation: '',
        explanation: 'Review ' + st + ' in ' + courseId + ' documentation for more details.'
      });
    }
    return qs;
  },

  loadQuestionBanks() {},

  startQuiz(courseId, difficulty, numQuestions) {
    var bank = this.getQuestionBank(courseId);
    if (!bank) return null;
    numQuestions = numQuestions || this.QUESTIONS_PER_TEST;
    var pool = bank.questions;
    if (difficulty && difficulty !== 'all') pool = pool.filter(function(q) { return q.difficulty === difficulty; });
    if (pool.length < numQuestions) numQuestions = pool.length;

    var seenHistory = Utils.getStorage('seen_questions', {});
    var seenSet = seenHistory[courseId] || [];
    var seenMap = {};
    seenSet.forEach(function(id) { seenMap[id] = true; });

    var unseen = pool.filter(function(q) { return !seenMap[q.id]; });
    var selected;
    if (unseen.length >= numQuestions) {
      selected = QuizSystem._shuffleArray(unseen).slice(0, numQuestions);
    } else {
      selected = QuizSystem._shuffleArray(unseen);
      var remaining = numQuestions - selected.length;
      var rest = QuizSystem._shuffleArray(pool.filter(function(q) { return seenMap[q.id]; }));
      selected = selected.concat(rest.slice(0, remaining));
    }

    var newSeen = seenSet.concat(selected.map(function(q) { return q.id; }));
    if (newSeen.length > 5000) newSeen = newSeen.slice(-3000);
    seenHistory[courseId] = newSeen;
    Utils.setStorage('seen_questions', seenHistory);

    var quiz = {
      id: 'quiz_' + Date.now(),
      courseId: courseId,
      questions: selected,
      currentIndex: 0,
      answers: [],
      startTime: Date.now(),
      timePerQuestion: this.TIME_PER_QUESTION,
      totalTime: numQuestions * this.TIME_PER_QUESTION,
      status: 'in_progress',
      score: 0
    };

    var active = Utils.getStorage('active_quiz', null);
    if (active && active.status === 'in_progress') {
      if (!confirm('You have an active quiz. Starting a new one will lose your progress. Continue?')) return null;
    }
    Utils.setStorage('active_quiz', quiz);
    return quiz;
  },

  _shuffleArray(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  },

  getActiveQuiz() {
    return Utils.getStorage('active_quiz', null);
  },

  submitAnswer(quiz, answerIndex) {
    if (quiz.status !== 'in_progress') return quiz;
    var currentQ = quiz.questions[quiz.currentIndex];
    if (!currentQ) return quiz;
    quiz.answers[quiz.currentIndex] = answerIndex;
    if (answerIndex === currentQ.answer) quiz.score++;
    quiz.currentIndex++;
    if (quiz.currentIndex >= quiz.questions.length) {
      quiz.status = 'completed';
      quiz.endTime = Date.now();
      this._saveResult(quiz);
    }
    Utils.setStorage('active_quiz', quiz);
    return quiz;
  },

  skipQuestion(quiz) {
    if (quiz.status !== 'in_progress') return quiz;
    quiz.answers[quiz.currentIndex] = -1;
    quiz.currentIndex++;
    if (quiz.currentIndex >= quiz.questions.length) {
      quiz.status = 'completed';
      quiz.endTime = Date.now();
      this._saveResult(quiz);
    }
    Utils.setStorage('active_quiz', quiz);
    return quiz;
  },

  timeUp(quiz) {
    quiz.status = 'time_up';
    quiz.endTime = Date.now();
    this._saveResult(quiz);
    Utils.setStorage('active_quiz', quiz);
  },

  _saveResult(quiz) {
    var results = Utils.getStorage('quiz_results', {});
    if (!results[quiz.courseId]) results[quiz.courseId] = [];
    var pct = quiz.questions.length > 0 ? Math.round((quiz.score / quiz.questions.length) * 100) : 0;
    results[quiz.courseId].push({
      quizId: quiz.id,
      score: quiz.score,
      total: quiz.questions.length,
      percentage: pct,
      date: new Date().toISOString(),
      timeTaken: quiz.endTime - quiz.startTime
    });
    Utils.setStorage('quiz_results', results);
    if (typeof DailyGoals !== 'undefined') DailyGoals.recordProgress('quizQuestions', quiz.score);
    if (typeof LearningTracker !== 'undefined') LearningTracker._awardAP('quiz_complete', Math.round(pct));
    if (typeof AchievementSystem !== 'undefined') AchievementSystem.checkAndAward(quiz.courseId);
  },

  getResults(courseId) {
    var results = Utils.getStorage('quiz_results', {});
    if (courseId) return results[courseId] || [];
    return results;
  },

  getLeaderboard(courseId, limit) {
    limit = limit || 20;
    var results = this.getResults(courseId);
    var userMap = {};
    results.forEach(function(r) {
      var key = r.quizId + '_' + r.date;
      if (!userMap[key] || r.percentage > userMap[key].percentage) userMap[key] = r;
    });
    return Object.values(userMap).sort(function(a, b) { return b.percentage - a.percentage || new Date(a.date) - new Date(b.date); }).slice(0, limit);
  },

  getOverallStats() {
    var results = Utils.getStorage('quiz_results', {});
    var total = 0, correct = 0, courses = 0;
    Object.keys(results).forEach(function(cid) {
      courses++;
      results[cid].forEach(function(r) {
        total += r.total;
        correct += r.score;
      });
    });
    return { totalQuestions: total, correctAnswers: correct, accuracy: total > 0 ? Math.round((correct / total) * 100) : 0, courses: courses };
  },

  getPerformanceByCourse() {
    var results = Utils.getStorage('quiz_results', {});
    var data = {};
    Object.keys(results).forEach(function(cid) {
      var scores = results[cid].map(function(r) { return r.percentage; });
      var avg = scores.length > 0 ? Math.round(scores.reduce(function(a, b) { return a + b; }, 0) / scores.length) : 0;
      data[cid] = { attempts: results[cid].length, average: avg, best: Math.max.apply(null, scores), recent: scores.slice(-1)[0] || 0 };
    });
    return data;
  },

  getUniqueQuestionCount(courseId) {
    var bank = this.getQuestionBank(courseId);
    return bank ? bank.questions.length : 0;
  }
};

(function() {
  function makeF(term, def, feature, purpose) {
    return { term: term, def: def, feature: feature, purpose: purpose, q: def, e: def, options: [def, 'A different concept', 'An unrelated term', 'A common mistake'], answer: 0 };
  }
  function makeC(term, def) {
    return { term: term, def: def, q: 'What is ' + term + '?', e: def, options: [def, 'Opposite concept', 'Unrelated idea', 'Common confusion'], answer: 0, blank: '_________ refers to ' + def.toLowerCase(), answer: 0 };
  }
  function makeCode(code, answer, options, explanation) {
    return { code: code, answer: answer, options: options, explanation: explanation || '' };
  }
  function makeBug(code, answer, options, explanation) {
    return { code: code, answer: answer, options: options, explanation: explanation || '' };
  }
  function makeScenario(question, answer, options, explanation) {
    return { question: question, answer: answer, options: options, explanation: explanation };
  }
  function makeTF(q, isTrue, e) {
    return { q: q, e: e, isTrue: isTrue, falseVersion: isTrue ? 'The opposite is true' : q };
  }

  var HTML_CONCEPTS = {
    Beginner: [
      { topic: 'HTML Basics', doc: 'https://developer.mozilla.org/en-US/docs/Web/HTML', facts: [
        makeF('HTML', 'HyperText Markup Language', 'HTML', 'Defines webpage structure'),
        { q: 'What does HTML stand for?', options: ['HyperText Markup Language', 'HighText Machine Language', 'HyperText Markdown Language', 'HomeTool Markup Language'], answer: 0, e: 'HTML stands for HyperText Markup Language.' },
        { q: 'What is the root element of an HTML document?', options: ['<html>', '<head>', '<body>', '<root>'], answer: 0, e: '<html> is the root element.' },
        { q: 'Which tag creates the largest heading?', options: ['<h1>', '<h6>', '<heading>', '<header>'], answer: 0, e: '<h1> is the largest heading tag.' },
        { q: 'Which element defines a paragraph?', options: ['<p>', '<para>', '<text>', '<paragraph>'], answer: 0, e: '<p> defines a paragraph.' },
        { q: 'What is the correct way to comment in HTML?', options: ['<!-- comment -->', '// comment', '/* comment */', '# comment'], answer: 0, e: 'HTML comments use <!-- -->.' },
        { blank: 'The correct way to write a comment in HTML is <!-- comment -->', options: ['<!---->', '//', '/* */', '#'], e: 'HTML comments use <!-- --> syntax.', answer: 0 },
        { feature: 'doctype', purpose: 'Declare the HTML version', e: '<!DOCTYPE html> declares HTML5.' },
        { feature: 'lang attribute', purpose: 'Specify the language of the page', e: '<html lang="en"> sets the page language.' }
      ], definitions: [
        { term: 'Element', def: 'An HTML component consisting of a start tag, content, and end tag' },
        { term: 'Attribute', def: 'Additional information provided in an HTML element\'s opening tag' },
        { term: 'Tag', def: 'A markup notation that defines an HTML element' }
      ], codeExamples: [
        makeCode('<h1>Hello</h1>\n<p>World</p>', 2, ['Heading and paragraph', 'Error', 'Two elements rendered', 'One element'], 'This renders an h1 heading and a paragraph.'),
        makeCode('<a href="https://example.com">Click</a>', 0, ['A hyperlink to example.com', 'An image', 'A button', 'A form'], 'The <a> tag creates a hyperlink.')
      ], bugs: [
        makeBug('<img src="photo.jpg">', 0, ['Missing alt attribute', 'Wrong tag name', 'Missing closing tag', 'Nothing wrong'], 'The <img> tag should include alt for accessibility.'),
        makeBug('<p>This is a paragraph\n<p>Another paragraph</p>', 0, ['Missing closing </p> on first paragraph', 'No error', 'Wrong nesting', 'Invalid attribute'], 'The first <p> is missing its closing </p> tag.')
      ], expressions: [
        makeCode('<div class="container">\n  <span>Text</span>\n</div>', 1, ['A div containing a styled span', 'A div with a span child', 'Error', 'Two separate elements'], 'The span is nested inside the div.')
      ], bestPractices: [
        { question: 'What is the best way to add CSS to HTML?', context: 'You want to style a single page.', options: ['External stylesheet', 'Inline styles', 'Internal <style> block', 'JavaScript'], answer: 0, e: 'External stylesheets are best for separation of concerns.' }
      ]
    },
    { topic: 'HTML Forms', doc: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form', facts: [
      { q: 'Which form method is used to send data in the URL?', options: ['GET', 'POST', 'PUT', 'DELETE'], answer: 0, e: 'GET appends data to the URL.' },
      { q: 'Which input type creates a dropdown?', options: ['<select>', '<dropdown>', '<list>', '<input type="dropdown">'], answer: 0, e: '<select> creates a dropdown list.' },
      { q: 'Which attribute makes an input required?', options: ['required', 'mandatory', 'must', 'validate'], answer: 0, e: 'The required attribute enforces input.' },
      { q: 'Which input type is for email?', options: ['email', 'text', 'string', 'mail'], answer: 0, e: 'type="email" provides email validation.' },
      { q: 'What does the action attribute do?', options: ['Specifies where to send form data', 'Sets the HTTP method', 'Validates input', 'Styles the form'], answer: 0, e: 'action defines the form submission URL.' },
      { blank: 'The __________ attribute specifies where to send form data when submitted', options: ['action', 'method', 'target', 'enctype'], e: 'The action attribute specifies the submission URL.', answer: 0 },
      { feature: 'form validation', purpose: 'Validate user input before submission', e: 'HTML5 provides built-in form validation.' }
    ], definitions: [
      { term: 'Form', def: 'An HTML element that collects user input and sends it to a server' },
      { term: 'Input field', def: 'A form control that accepts user data' }
    ], codeExamples: [
      makeCode('<form action="/submit" method="post">\n  <input type="text" name="name">\n  <button type="submit">Send</button>\n</form>', 0, ['A form that POSTs data to /submit', 'A form that GETs data', 'A link', 'A button group'], 'This form sends text input data via POST.')
    ], scenarios: [
      makeScenario('You need to collect a user email with validation. Which input type?', 0, ['<input type="email">', '<input type="text">', '<input type="url">', '<input type="tel">'], 'type="email" provides built-in email validation.')
    ]
    },
    { topic: 'Semantic HTML', doc: 'https://developer.mozilla.org/en-US/docs/Glossary/Semantics', facts: [
      { q: 'Which element represents navigation links?', options: ['<nav>', '<menu>', '<links>', '<navigation>'], answer: 0, e: '<nav> defines navigation links.' },
      { q: 'Which element defines the main content?', options: ['<main>', '<body>', '<content>', '<article>'], answer: 0, e: '<main> represents the dominant content.' },
      { q: 'Which element is used for an independent article?', options: ['<article>', '<section>', '<div>', '<text>'], answer: 0, e: '<article> represents self-contained content.' },
      { q: 'What is the benefit of semantic HTML?', options: ['Improves accessibility and SEO', 'Makes pages load faster', 'Reduces file size', 'Adds animations'], answer: 0, e: 'Semantic HTML improves accessibility and search engine optimization.' },
      { feature: 'ARIA roles', purpose: 'Improve accessibility for assistive technologies', e: 'ARIA roles provide additional semantic meaning.' }
    ], codeExamples: [
      makeCode('<header>\n  <nav>Links</nav>\n</header>\n<main>\n  <article>Content</article>\n</main>', 2, ['A page with errors', 'A non-semantic layout', 'A semantic HTML5 layout', 'A table layout'], 'This uses semantic HTML5 elements: header, nav, main, article.')
    ]}
  ],
    Intermediate: [
      { topic: 'HTML5 APIs', doc: 'https://developer.mozilla.org/en-US/docs/Web/API', facts: [
        { q: 'Which API allows storing data in the browser?', options: ['localStorage', 'sessionCache', 'browserDB', 'webCache'], answer: 0, e: 'localStorage persists data across sessions.' },
        { q: 'Which API enables geolocation?', options: ['navigator.geolocation', 'window.location', 'document.geo', 'browser.position'], answer: 0, e: 'navigator.geolocation provides geolocation features.' },
        { q: 'Which element embeds a video?', options: ['<video>', '<media>', '<movie>', '<embed>'], answer: 0, e: '<video> embeds video content.' },
        { q: 'What does the Canvas API allow?', options: ['Drawing graphics via JavaScript', 'Creating 3D models', 'Rendering video', 'Building forms'], answer: 0, e: 'Canvas enables 2D drawing via JavaScript.' },
        { q: 'Which API handles drag and drop?', options: ['Drag and Drop API', 'Mouse Events API', 'Touch API', 'Pointer API'], answer: 0, e: 'The HTML5 Drag and Drop API enables drag-and-drop interactions.' },
        { feature: 'Web Workers', purpose: 'Run JavaScript in background threads', e: 'Web Workers enable concurrent JavaScript execution.' }
      ], codeExamples: [
        makeCode('localStorage.setItem("theme", "dark")\nlet theme = localStorage.getItem("theme")', 1, ['Stores data temporarily', 'Persists theme data across sessions', 'Creates a cookie', 'Throws an error'], 'localStorage persists data even after browser close.')
      ]}
    ]
  };

  var CSS_CONCEPTS = {
    Beginner: [
      { topic: 'CSS Selectors', doc: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors', facts: [
        { q: 'How do you select an element with id "header"?', options: ['#header', '.header', '*header', 'header'], answer: 0, e: 'The # symbol selects by id.' },
        { q: 'How do you select an element with class "box"?', options: ['.box', '#box', '*box', 'box'], answer: 0, e: 'The . symbol selects by class.' },
        { q: 'Which selector targets all elements?', options: ['*', '.', '#', '$'], answer: 0, e: 'The universal selector * targets all elements.' },
        { q: 'Which pseudo-class selects a link when hovered?', options: [':hover', ':link', ':active', ':visited'], answer: 0, e: ':hover applies when the user hovers over an element.' },
        { q: 'Which pseudo-class selects the first child?', options: [':first-child', ':first-of-type', ':nth-child(1)', ':first'], answer: 0, e: ':first-child targets the first child element.' },
        { blank: 'The ________ pseudo-class applies styles when hovering over an element', options: [':hover', ':focus', ':active', ':link'], e: ':hover applies on mouse hover.', answer: 0 },
        { feature: 'class selector', purpose: 'Target elements by class name', e: '.classname selects all elements with that class.' }
      ], codeExamples: [
        makeCode('p { color: red; }\n.highlight { background: yellow; }', 1, ['Styles all elements red', 'Styles paragraphs red and .highlight yellow', 'Error', 'Only .highlight is styled'], 'The p selector targets paragraphs; .highlight targets elements with that class.')
      ]},
      { topic: 'Box Model', doc: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model', facts: [
        { q: 'Which property controls space inside an element?', options: ['padding', 'margin', 'spacing', 'gap'], answer: 0, e: 'padding creates space inside the element between content and border.' },
        { q: 'Which property controls space outside an element?', options: ['margin', 'padding', 'spacing', 'gap'], answer: 0, e: 'margin creates space outside the element.' },
        { q: 'Which property rounds corners?', options: ['border-radius', 'corner-radius', 'round-corner', 'radius'], answer: 0, e: 'border-radius rounds the corners of an element.' },
        { q: 'What does box-sizing: border-box do?', options: ['Includes padding and border in element width', 'Excludes padding from width', 'Adds border to width', 'Removes box model'], answer: 0, e: 'border-box includes padding and border in the element\'s total width.' },
        { q: 'Which property adds a border?', options: ['border', 'outline', 'stroke', 'line'], answer: 0, e: 'border adds a line around an element.' },
        { blank: 'The CSS _______ property creates space between content and border', options: ['padding', 'margin', 'gap', 'spacing'], e: 'padding is the inner spacing.', answer: 0 }
      ]},
      { topic: 'Flexbox', doc: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout', facts: [
        { q: 'Which property creates a flex container?', options: ['display: flex', 'display: block', 'display: grid', 'position: relative'], answer: 0, e: 'display: flex creates a flex container.' },
        { q: 'Which property sets the direction of flex items?', options: ['flex-direction', 'flex-wrap', 'flex-flow', 'direction'], answer: 0, e: 'flex-direction sets row or column layout.' },
        { q: 'Which property centers items horizontally in a flex container?', options: ['justify-content: center', 'align-items: center', 'text-align: center', 'margin: auto'], answer: 0, e: 'justify-content: center centers along the main axis.' },
        { q: 'Which property centers items vertically in a flex container?', options: ['align-items: center', 'justify-content: center', 'vertical-align: center', 'align-content: center'], answer: 0, e: 'align-items: center centers along the cross axis.' },
        { q: 'What does flex: 1 mean?', options: ['Element grows and shrinks equally', 'Element has fixed size', 'Element is hidden', 'Element floats'], answer: 0, e: 'flex: 1 sets flex-grow: 1, flex-shrink: 1, flex-basis: 0.' },
        { blank: '__________ : center centers flex items along the cross axis', options: ['align-items', 'justify-content', 'align-content', 'justify-items'], e: 'align-items controls cross-axis alignment.', answer: 0 }
      ]}
    ],
    Intermediate: [
      { topic: 'CSS Grid', doc: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout', facts: [
        { q: 'Which property creates a grid container?', options: ['display: grid', 'display: flex', 'display: block', 'display: inline-grid'], answer: 0, e: 'display: grid creates a grid container.' },
        { q: 'Which property defines columns?', options: ['grid-template-columns', 'grid-columns', 'grid-template', 'column-count'], answer: 0, e: 'grid-template-columns defines column sizes.' },
        { q: 'Which property sets the gap between grid items?', options: ['gap', 'grid-gap', 'spacing', 'margin'], answer: 0, e: 'gap sets spacing between grid rows and columns.' },
        { q: 'What does grid-template-areas do?', options: ['Defines named grid areas', 'Sets column sizes', 'Aligns items', 'Sets row sizes'], answer: 0, e: 'grid-template-areas defines named template areas.' },
        { feature: 'fr unit', purpose: 'Distribute available space proportionally', e: 'The fr unit represents a fraction of available space.' }
      ]},
      { topic: 'CSS Animations', doc: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations', facts: [
        { q: 'Which property applies a keyframe animation?', options: ['animation', 'transition', 'transform', 'keyframe'], answer: 0, e: 'animation applies @keyframes animations.' },
        { q: 'Which rule defines animation keyframes?', options: ['@keyframes', '@animation', '@keyframe', '@animate'], answer: 0, e: '@keyframes defines animation steps.' },
        { q: 'Which property transitions between states?', options: ['transition', 'animation', 'transform', 'change'], answer: 0, e: 'transition smoothly changes property values.' },
        { q: 'What does transform: rotate(45deg) do?', options: ['Rotates element 45 degrees', 'Scales element 45%', 'Moves element 45px', 'Skews element 45deg'], answer: 0, e: 'rotate() rotates the element by the specified angle.' },
        { feature: 'CSS transitions', purpose: 'Animate property changes smoothly', e: 'Transitions interpolate between CSS property values.' }
      ]}
    ]
  };

  var JS_CONCEPTS = {
    Beginner: [
      { topic: 'JavaScript Basics', doc: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide', facts: [
        { q: 'Which keyword declares a constant?', options: ['const', 'let', 'var', 'static'], answer: 0, e: 'const declares block-scoped constants.' },
        { q: 'What does typeof return for a number?', options: ['"number"', '"string"', '"object"', '"int"'], answer: 0, e: 'typeof returns "number" for numeric values.' },
        { q: 'Which method adds to the end of an array?', options: ['push()', 'pop()', 'shift()', 'unshift()'], answer: 0, e: 'push() appends elements to the end.' },
        { q: 'What does JSON.parse() do?', options: ['Parses JSON string to object', 'Stringifies object to JSON', 'Validates JSON', 'Formats JSON'], answer: 0, e: 'JSON.parse() converts a JSON string into a JavaScript value.' },
        { q: 'Which operator checks strict equality?', options: ['===', '==', '=', '!='], answer: 0, e: '=== checks equality without type coercion.' },
        { q: 'What is the result of typeof null?', options: ['"object"', '"null"', '"undefined"', '"boolean"'], answer: 0, e: 'typeof null returns "object" (a known JavaScript quirk).' },
        { blank: 'The ________ operator compares both value and type', options: ['===', '==', '=', '!=='], e: '=== is strict equality.', answer: 0 },
        { feature: 'console.log', purpose: 'Output debugging information', e: 'console.log() prints messages to the developer console.' }
      ], codeExamples: [
        makeCode('console.log(typeof 42)', 0, ['"number"', '"string"', '"object"', '"undefined"'], 'typeof 42 returns "number".'),
        makeCode('let x = 10;\nx += 5;\nconsole.log(x)', 0, ['15', '10', '5', '105'], 'x += 5 adds 5 to x, resulting in 15.')
      ], expressions: [
        makeCode('2 + "2"', 1, ['4', '"22"', '22', 'Error'], 'In JavaScript, 2 + "2" performs string concatenation.'),
        makeCode('"hello".length', 0, ['5', '4', '6', 'undefined'], 'The string "hello" has 5 characters.')
      ]},
      { topic: 'Functions & Scope', doc: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions', facts: [
        { q: 'How do you define a function?', options: ['function myFunc() {}', 'def myFunc() {}', 'func myFunc() {}', 'let myFunc = function'], answer: 0, e: 'The function keyword defines a function.' },
        { q: 'What is an arrow function?', options: ['() => {} syntax', '->{} syntax', '=>() syntax', 'fun() syntax'], answer: 0, e: 'Arrow functions use => syntax.' },
        { q: 'What is a closure?', options: ['Function with access to outer scope', 'A closed function', 'A private variable', 'A callback'], answer: 0, e: 'A closure retains access to its lexical scope.' },
        { q: 'What is the value of "this" in a regular function?', options: ['Global object or undefined', 'The function itself', 'The arguments object', 'The parent function'], answer: 0, e: 'In non-strict mode, "this" is the global object; in strict mode it is undefined.' },
        { feature: 'hoisting', purpose: 'Move declarations to the top of scope', e: 'Function declarations are hoisted; function expressions are not.' }
      ], codeExamples: [
        makeCode('function add(a, b) {\n  return a + b;\n}\nconsole.log(add(3, 4))', 0, ['7', '34', 'undefined', 'Error'], 'The function returns the sum 3+4=7.'),
        makeCode('const double = x => x * 2;\nconsole.log(double(5))', 0, ['10', '25', '5', 'undefined'], 'The arrow function doubles the input.')
      ]},
      { topic: 'Objects & Arrays', doc: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array', facts: [
        { q: 'Which method filters array elements?', options: ['filter()', 'map()', 'reduce()', 'find()'], answer: 0, e: 'filter() creates a new array with elements passing a test.' },
        { q: 'Which method transforms each array element?', options: ['map()', 'filter()', 'reduce()', 'forEach()'], answer: 0, e: 'map() applies a function to each element and returns a new array.' },
        { q: 'How do you access a property of an object?', options: ['obj.prop or obj["prop"]', 'obj->prop', 'obj::prop', 'obj#prop'], answer: 0, e: 'Properties are accessed via dot notation or bracket notation.' },
        { q: 'Which method removes the last element?', options: ['pop()', 'push()', 'shift()', 'unshift()'], answer: 0, e: 'pop() removes and returns the last element.' },
        { q: 'What does Object.keys() return?', options: ['Array of property names', 'Array of values', 'Both keys and values', 'Length of object'], answer: 0, e: 'Object.keys() returns an array of enumerable property names.' },
        { blank: 'The ________ method creates a new array by applying a function to each element', options: ['map()', 'filter()', 'reduce()', 'forEach()'], e: 'map() transforms each element.', answer: 0 },
        { feature: 'spread operator', purpose: 'Expand iterables into individual elements', e: 'The spread operator (...) expands arrays and objects.' }
      ], codeExamples: [
        makeCode('[1, 2, 3].map(x => x * 2)', 0, ['[2, 4, 6]', '[1, 2, 3]', '[3, 6, 9]', '2'], 'map() doubles each element.'),
        makeCode('const obj = { a: 1, b: 2 };\nconsole.log(obj.a)', 0, ['1', '2', 'undefined', 'Error'], 'Dot notation accesses property a, which is 1.')
      ]}
    ],
    Intermediate: [
      { topic: 'Async JavaScript', doc: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises', facts: [
        { q: 'What is a Promise?', options: ['Object representing eventual completion', 'A synchronous operation', 'A callback wrapper', 'A function return value'], answer: 0, e: 'A Promise represents a value that may be available now, later, or never.' },
        { q: 'What does async/await do?', options: ['Simplify working with Promises', 'Create synchronous code', 'Speed up execution', 'Handle errors'], answer: 0, e: 'async/await provides a cleaner syntax for Promise-based code.' },
        { q: 'What is the event loop?', options: ['Mechanism handling async callbacks', 'A loop that creates events', 'A timing function', 'A DOM API'], answer: 0, e: 'The event loop manages asynchronous callback execution.' },
        { q: 'Which method handles Promise resolution?', options: ['.then()', '.catch()', '.finally()', '.resolve()'], answer: 0, e: '.then() is called when a Promise resolves successfully.' },
        { q: 'What is a callback function?', options: ['Function passed as an argument to another function', 'A returned function', 'An async function', 'A recursive function'], answer: 0, e: 'A callback is a function passed into another function as an argument.' },
        { blank: 'A ________ represents a value that may be available in the future', options: ['Promise', 'Callback', 'Event', 'Stream'], e: 'A Promise handles asynchronous operations.', answer: 0 },
        { feature: 'async/await', purpose: 'Write asynchronous code in synchronous style', e: 'async functions return a Promise; await pauses execution until resolution.' }
      ], codeExamples: [
        makeCode('Promise.resolve(42).then(val => console.log(val))', 0, ['42', 'Promise {<pending>}', 'undefined', 'Error'], '.then() receives the resolved value 42.')
      ], scenarios: [
        makeScenario('You need to fetch data from an API and display it. Which approach?', 0, ['Use async/await with fetch()', 'Use synchronous XMLHttpRequest', 'Use setTimeout', 'Use a loop'], 'async/await with fetch() is the modern approach for API calls.')
      ]},
      { topic: 'ES6+ Features', doc: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let', facts: [
        { q: 'What is destructuring?', options: ['Unpack values from arrays or objects', 'Delete object properties', 'Restructure data', 'Destruct variables'], answer: 0, e: 'Destructuring unpacks values from arrays or properties from objects.' },
        { q: 'What does the spread operator do?', options: ['Expands iterables into elements', 'Merges objects', 'Copies arrays', 'All of the above'], answer: 3, e: 'The spread operator expands iterables, copies arrays, and merges objects.' },
        { q: 'What is template literals syntax?', options: ['`${var}`', '"${var}"', "'${var}'", '${var}'], answer: 0, e: 'Template literals use backticks and ${} interpolation.' },
        { q: 'What is the difference between let and var?', options: ['let is block-scoped, var is function-scoped', 'let is faster', 'var is block-scoped', 'No difference'], answer: 0, e: 'let has block scope; var has function scope.' },
        { q: 'What are default parameters?', options: ['Function parameters with default values', 'Required parameters', 'Optional parameters', 'Variable parameters'], answer: 0, e: 'Default parameters initialize with default values if undefined.' },
        { blank: 'Template literals use _________ for variable interpolation', options: ['${}', '{{}}', '%%', '##'], e: '${expression} interpolates within template literals.', answer: 0 },
        { feature: 'arrow functions', purpose: 'Shorter function syntax with lexical this', e: 'Arrow functions provide concise syntax and inherit this from the enclosing scope.' }
      ], codeExamples: [
        makeCode('const [a, b] = [1, 2];\nconsole.log(a)', 0, ['1', '2', '[1,2]', 'undefined'], 'Destructuring assigns 1 to a.'),
        makeCode('const arr = [1, 2, 3];\nconst copy = [...arr];\nconsole.log(copy)', 0, ['[1,2,3]', '1,2,3', '...arr', 'Error'], 'Spread creates a shallow copy of arr.')
      ]}
    ],
    Advanced: [
      { topic: 'Advanced JS', doc: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy', facts: [
        { q: 'What is a Proxy?', options: ['Object that wraps another object to intercept operations', 'A network proxy', 'A design pattern', 'A security feature'], answer: 0, e: 'A Proxy allows custom behavior for fundamental operations on another object.' },
        { q: 'What is a Generator function?', options: ['Function that can be paused and resumed', 'A data generator', 'A loop construct', 'An async function'], answer: 0, e: 'Generators use function* and yield to pause/resume execution.' },
        { q: 'What does Symbol do?', options: ['Creates unique identifiers', 'Represents mathematical symbols', 'Creates strings', 'Declares variables'], answer: 0, e: 'Symbol() creates a unique and immutable identifier.' },
        { q: 'What is a WeakMap?', options: ['Map with weak references to keys', 'A weaker version of Map', 'A Map with string keys', 'A Set alternative'], answer: 0, e: 'WeakMap holds weak references to object keys, allowing garbage collection.' },
        { feature: 'Reflect API', purpose: 'Perform default object operations programmatically', e: 'Reflect provides methods for interceptable JavaScript operations.' }
      ]}
    ]
  };

  var PYTHON_CONCEPTS = {
    Beginner: [
      { topic: 'Python Basics', doc: 'https://docs.python.org/3/tutorial/', facts: [
        { q: 'How do you print in Python?', options: ['print()', 'console.log()', 'echo()', 'System.out.println()'], answer: 0, e: 'print() outputs to the console.' },
        { q: 'What is the file extension for Python?', options: ['.py', '.pyth', '.pt', '.pn'], answer: 0, e: 'Python files use the .py extension.' },
        { q: 'Which data type is immutable?', options: ['tuple', 'list', 'dict', 'set'], answer: 0, e: 'Tuples are immutable; lists, dicts, and sets are mutable.' },
        { q: 'What does len() return?', options: ['Length of a sequence', 'Last element', 'Index of element', 'Size in bytes'], answer: 0, e: 'len() returns the number of items in a sequence.' },
        { q: 'Which keyword defines a function?', options: ['def', 'func', 'function', 'define'], answer: 0, e: 'def defines a function in Python.' },
        { blank: 'The Python _______ function outputs text to the console.', options: ['print()', 'echo()', 'log()', 'output()'], e: 'print() is Python\'s output function.', answer: 0 },
        { feature: 'f-strings', purpose: 'Embed expressions in string literals', e: 'f"{variable}" provides inline string interpolation.' }
      ], codeExamples: [
        makeCode('print(type(42))', 0, ["<class 'int'>", '<int>', '42', 'Error'], 'type(42) returns <class \'int\'>.'),
        makeCode('len("Python")', 0, ['6', '5', '7', 'undefined'], 'The string "Python" has 6 characters.')
      ]},
      { topic: 'Control Flow', doc: 'https://docs.python.org/3/tutorial/controlflow.html', facts: [
        { q: 'What is the if-elif-else syntax?', options: ['if x > 0: ... elif x == 0: ... else: ...', 'if (x > 0) {} else if {}', 'if x > 0 then elif', 'if> then> else>'], answer: 0, e: 'Python uses colons and indentation for control flow.' },
        { q: 'What does range(5) return?', options: ['[0,1,2,3,4]', '[1,2,3,4,5]', '0,1,2,3,4', '(0,1,2,3,4)'], answer: 0, e: 'range(5) generates 0 through 4 (not including 5).' },
        { q: 'What does break do in a loop?', options: ['Exits the loop', 'Continues to next iteration', 'Pauses the loop', 'Restarts the loop'], answer: 0, e: 'break terminates the current loop.' },
        { q: 'What does continue do?', options: ['Skips to next iteration', 'Exits the loop', 'Restarts the loop', 'Ends the program'], answer: 0, e: 'continue skips the rest of the current loop iteration.' },
        { q: 'Which loop runs at least once?', options: ['There is no do-while in Python', 'while loop', 'for loop', 'infinite loop'], answer: 0, e: 'Python does not have a do-while loop.' }
      ]},
      { topic: 'Data Structures', doc: 'https://docs.python.org/3/tutorial/datastructures.html', facts: [
        { q: 'What is a dictionary?', options: ['A key-value store', 'An ordered list', 'A set of unique items', 'A tuple collection'], answer: 0, e: 'A dict stores key-value pairs.' },
        { q: 'What is a list comprehension?', options: ['[x for x in range(10)]', '{x for x in range(10)}', '(x for x in range(10))', '<x for x>'], answer: 0, e: 'List comprehensions use square brackets.' },
        { q: 'Which method adds to a list?', options: ['append()', 'add()', 'push()', 'insert()'], answer: 0, e: 'append() adds an item to the end of a list.' },
        { q: 'What does set() do?', options: ['Creates an unordered collection of unique elements', 'Creates a list', 'Creates a tuple', 'Creates a dict'], answer: 0, e: 'set() creates a collection of unique items.' },
        { q: 'Which method splits a string?', options: ['split()', 'divide()', 'separate()', 'cut()'], answer: 0, e: 'split() divides a string into a list of substrings.' },
        { blank: 'A __________ comprehension uses square brackets to generate a list.', options: ['list', 'set', 'dict', 'tuple'], e: 'List comprehensions use [] syntax.', answer: 0 }
      ]}
    ],
    Intermediate: [
      { topic: 'OOP in Python', doc: 'https://docs.python.org/3/tutorial/classes.html', facts: [
        { q: 'What is __init__?', options: ['The class constructor', 'A module initializer', 'An import function', 'A decorator'], answer: 0, e: '__init__ is called when a new instance is created.' },
        { q: 'What is self in Python methods?', options: ['Reference to the current instance', 'The class itself', 'A global variable', 'A keyword'], answer: 0, e: 'self refers to the instance calling the method.' },
        { q: 'What is a decorator?', options: ['A function that modifies another function', 'A design pattern', 'A class template', 'A data structure'], answer: 0, e: 'Decorators wrap functions to extend behavior.' },
        { q: 'What is inheritance?', options: ['Creating a class based on another class', 'Importing a module', 'Copying code', 'Extending a function'], answer: 0, e: 'Inheritance allows a class to derive from a parent class.' },
        { feature: 'dunder methods', purpose: 'Define behavior for operators and built-in functions', e: '__str__, __len__, __eq__ are common dunder methods.' }
      ]},
      { topic: 'Modules & Packages', doc: 'https://docs.python.org/3/tutorial/modules.html', facts: [
        { q: 'Which keyword imports a module?', options: ['import', 'include', 'require', 'using'], answer: 0, e: 'import loads a Python module.' },
        { q: 'What is pip?', options: ['Python package installer', 'Python IDE', 'A package manager for JS', 'A testing tool'], answer: 0, e: 'pip installs and manages Python packages.' },
        { q: 'What is __name__?', options: ['A special variable with the module name', 'A function name', 'A class name', 'A file path'], answer: 0, e: '__name__ evaluates to "__main__" when running directly.' }
      ]}
    ]
  };

  var JAVA_CONCEPTS = {
    Beginner: [
      { topic: 'Java Basics', doc: 'https://docs.oracle.com/javase/tutorial/', facts: [
        { q: 'What is the entry point of a Java program?', options: ['public static void main(String[] args)', 'public void main()', 'static void main()', 'int main()'], answer: 0, e: 'The main method is the entry point of a Java application.' },
        { q: 'What is the size of int in Java?', options: ['32 bits', '8 bits', '16 bits', '64 bits'], answer: 0, e: 'int is 32 bits (4 bytes) in Java.' },
        { q: 'What is JVM?', options: ['Java Virtual Machine', 'Java Variable Manager', 'Java Version Model', 'Java Visual Machine'], answer: 0, e: 'JVM runs Java bytecode.' },
        { q: 'Which keyword creates an object?', options: ['new', 'create', 'object', 'make'], answer: 0, e: 'The new keyword instantiates an object.' },
        { q: 'What is a class?', options: ['Blueprint for creating objects', 'A data type', 'A function', 'A variable'], answer: 0, e: 'A class is a template for objects.' },
        { blank: 'The ________ keyword is used to create a new object in Java.', options: ['new', 'create', 'make', 'instance'], e: 'new allocates and initializes an object.', answer: 0 }
      ]},
      { topic: 'OOP Concepts', doc: 'https://docs.oracle.com/javase/tutorial/java/concepts/', facts: [
        { q: 'Which keyword extends a class?', options: ['extends', 'implements', 'inherits', 'super'], answer: 0, e: 'extends is used for class inheritance.' },
        { q: 'What is polymorphism?', options: ['Many forms of a method', 'Multiple classes', 'Many variables', 'Multiple threads'], answer: 0, e: 'Polymorphism lets objects of different types respond to the same method call.' },
        { q: 'What is encapsulation?', options: ['Bundling data and methods, restricting access', 'Hiding code', 'Combining classes', 'Encrypting data'], answer: 0, e: 'Encapsulation bundles data and methods, hiding internal state.' },
        { q: 'What does the static keyword mean?', options: ['Belongs to the class, not instances', 'Cannot change', 'Fixed memory', 'Always executes'], answer: 0, e: 'Static members belong to the class, shared across instances.' },
        { feature: 'interface', purpose: 'Define a contract of abstract methods', e: 'An interface specifies methods that implementing classes must provide.' }
      ]}
    ],
    Intermediate: [
      { topic: 'Collections', doc: 'https://docs.oracle.com/javase/tutorial/collections/', facts: [
        { q: 'Which collection maintains insertion order?', options: ['ArrayList', 'HashSet', 'HashMap', 'TreeSet'], answer: 0, e: 'ArrayList maintains insertion order.' },
        { q: 'Which collection stores unique elements?', options: ['HashSet', 'ArrayList', 'LinkedList', 'HashMap'], answer: 0, e: 'HashSet stores unique elements.' },
        { q: 'What is the difference between HashMap and Hashtable?', options: ['HashMap allows null, Hashtable does not', 'Hashtable is faster', 'HashMap is thread-safe', 'No difference'], answer: 0, e: 'HashMap allows one null key; Hashtable is synchronized but does not allow nulls.' },
        { q: 'What does the Stream API do?', options: ['Functional-style data processing', 'File I/O', 'Network streaming', 'Audio processing'], answer: 0, e: 'The Stream API enables functional operations on collections.' }
      ]}
    ]
  };

  var SQL_CONCEPTS = {
    Beginner: [
      { topic: 'SQL Queries', doc: 'https://www.w3schools.com/sql/', facts: [
        { q: 'Which command retrieves data?', options: ['SELECT', 'GET', 'FETCH', 'RETRIEVE'], answer: 0, e: 'SELECT queries the database.' },
        { q: 'Which clause filters rows?', options: ['WHERE', 'HAVING', 'FILTER', 'MATCH'], answer: 0, e: 'WHERE filters rows based on conditions.' },
        { q: 'Which keyword removes duplicates?', options: ['DISTINCT', 'UNIQUE', 'DIFFERENT', 'SINGLE'], answer: 0, e: 'SELECT DISTINCT returns unique rows.' },
        { q: 'Which statement adds new rows?', options: ['INSERT INTO', 'ADD', 'NEW ROW', 'CREATE'], answer: 0, e: 'INSERT INTO adds new records to a table.' },
        { q: 'Which statement updates records?', options: ['UPDATE', 'MODIFY', 'CHANGE', 'ALTER'], answer: 0, e: 'UPDATE modifies existing records.' },
        { blank: 'The SQL ________ statement retrieves data from a database.', options: ['SELECT', 'GET', 'FETCH', 'READ'], e: 'SELECT is the data retrieval command.', answer: 0 }
      ]},
      { topic: 'Joins', doc: 'https://www.w3schools.com/sql/sql_join.asp', facts: [
        { q: 'Which JOIN returns matching rows only?', options: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL JOIN'], answer: 0, e: 'INNER JOIN returns only rows with matching values.' },
        { q: 'Which JOIN returns all rows from left table?', options: ['LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'FULL JOIN'], answer: 0, e: 'LEFT JOIN returns all left table rows and matching right table rows.' },
        { q: 'What is a foreign key?', options: ['References primary key in another table', 'A unique key', 'The first column', 'An indexed column'], answer: 0, e: 'A foreign key links to the primary key of another table.' }
      ]}
    ],
    Intermediate: [
      { topic: 'Aggregations', doc: 'https://www.w3schools.com/sql/sql_aggregate_functions.asp', facts: [
        { q: 'Which function counts rows?', options: ['COUNT()', 'SUM()', 'TOTAL()', 'NUM()'], answer: 0, e: 'COUNT() returns the number of rows.' },
        { q: 'Which clause groups rows?', options: ['GROUP BY', 'ORDER BY', 'HAVING', 'GROUP'], answer: 0, e: 'GROUP BY groups rows with same values.' },
        { q: 'Which clause filters groups?', options: ['HAVING', 'WHERE', 'FILTER', 'GROUP FILTER'], answer: 0, e: 'HAVING filters groups after GROUP BY.' },
        { q: 'What does AVG() return?', options: ['Average of values', 'Sum of values', 'Count of values', 'Minimum value'], answer: 0, e: 'AVG() returns the mean of a numeric column.' },
        { feature: 'subquery', purpose: 'Nest a query inside another query', e: 'A subquery is a SELECT statement inside another SQL statement.' }
      ]}
    ]
  };

  var CPP_CONCEPTS = {
    Beginner: [
      { topic: 'C++ Basics', doc: 'https://en.cppreference.com/w/', facts: [
        { q: 'Which header is used for input/output?', options: ['<iostream>', '<stdio.h>', '<console>', '<io>'], answer: 0, e: '<iostream> provides cin and cout.' },
        { q: 'What does cout do?', options: ['Output to console', 'Input from keyboard', 'Create a file', 'Read memory'], answer: 0, e: 'cout outputs data to the standard output stream.' },
        { q: 'Which operator is the scope resolution?', options: ['::', '->', '.', ':'], answer: 0, e: ':: is the scope resolution operator in C++.' },
        { q: 'What is a reference?', options: ['An alias for another variable', 'A pointer', 'A copy', 'A constant'], answer: 0, e: 'A reference is an alias to an existing variable.' },
        { q: 'What does new allocate?', options: ['Memory on the heap', 'Memory on the stack', 'A pointer', 'An array'], answer: 0, e: 'new allocates memory on the heap.' },
        { blank: 'The ________ operator resolves scope and accesses class members.', options: ['::', '->', '.', ':'], e: ':: is the scope resolution operator.', answer: 0 }
      ]},
      { topic: 'OOP in C++', doc: 'https://en.cppreference.com/w/cpp/language/classes', facts: [
        { q: 'What is a constructor?', options: ['Special method called when object is created', 'A destructor', 'A regular method', 'A static method'], answer: 0, e: 'Constructors initialize objects upon creation.' },
        { q: 'What is inheritance?', options: ['Deriving a class from a base class', 'Copying code', 'Importing modules', 'Creating templates'], answer: 0, e: 'Inheritance allows a class to acquire properties of another.' },
        { q: 'What is virtual function?', options: ['A function that can be overridden in derived classes', 'A static function', 'A private function', 'An inline function'], answer: 0, e: 'Virtual functions enable runtime polymorphism.' },
        { q: 'What is encapsulation?', options: ['Bundling data and methods with access control', 'Hiding code', 'Combining classes', 'Encrypting data'], answer: 0, e: 'Encapsulation bundles data and methods, restricting access via access specifiers.' }
      ]}
    ],
    Intermediate: [
      { topic: 'STL', doc: 'https://en.cppreference.com/w/cpp/container', facts: [
        { q: 'Which container is a dynamic array?', options: ['std::vector', 'std::array', 'std::list', 'std::map'], answer: 0, e: 'std::vector is a dynamic array that grows automatically.' },
        { q: 'Which container stores key-value pairs?', options: ['std::map', 'std::set', 'std::vector', 'std::list'], answer: 0, e: 'std::map stores key-value pairs in sorted order.' },
        { q: 'Which algorithm sorts a range?', options: ['std::sort()', 'std::order()', 'std::arrange()', 'std::qsort()'], answer: 0, e: 'std::sort() sorts elements in a range.' },
        { q: 'What is an iterator?', options: ['An object for traversing a container', 'A pointer', 'A loop', 'An algorithm'], answer: 0, e: 'Iterators provide a uniform way to access container elements.' },
        { feature: 'templates', purpose: 'Write generic code for any data type', e: 'Templates allow type-parameterized code in C++.' }
      ]}
    ]
  };

  var REACT_CONCEPTS = {
    Beginner: [
      { topic: 'React Basics', doc: 'https://react.dev/learn', facts: [
        { q: 'What is React?', options: ['A UI library for building components', 'A framework for APIs', 'A database', 'A build tool'], answer: 0, e: 'React is a JavaScript library for building user interfaces.' },
        { q: 'What is JSX?', options: ['JavaScript XML syntax extension', 'A type system', 'A template engine', 'A database query language'], answer: 0, e: 'JSX allows writing HTML-like syntax in JavaScript.' },
        { q: 'What is a component?', options: ['A reusable piece of UI', 'A function only', 'A class only', 'A page'], answer: 0, e: 'Components are reusable, self-contained UI pieces.' },
        { q: 'How do you pass data to a component?', options: ['Via props', 'Via state', 'Via refs', 'Via context'], answer: 0, e: 'Props are passed to components as attributes.' },
        { q: 'What is state?', options: ['Data that changes over time in a component', 'Static data', 'A server-side variable', 'A prop'], answer: 0, e: 'State represents mutable data that affects rendering.' },
        { blank: 'React components receive data via ________.', options: ['props', 'state', 'refs', 'context'], e: 'Props are inputs passed to components.', answer: 0 }
      ], codeExamples: [
        makeCode('function Welcome(props) {\n  return <h1>Hello, {props.name}</h1>;\n}', 0, ['A React component rendering a greeting', 'A JavaScript function', 'An HTML template', 'A class'], 'This is a React functional component using JSX.')
      ]},
      { topic: 'Hooks', doc: 'https://react.dev/reference/react/hooks', facts: [
        { q: 'Which hook manages state?', options: ['useState()', 'useEffect()', 'useReducer()', 'useContext()'], answer: 0, e: 'useState() adds state to functional components.' },
        { q: 'Which hook handles side effects?', options: ['useEffect()', 'useState()', 'useReducer()', 'useLayoutEffect()'], answer: 0, e: 'useEffect() runs side effects after render.' },
        { q: 'Which hook provides a ref?', options: ['useRef()', 'useState()', 'useContext()', 'useMemo()'], answer: 0, e: 'useRef() provides a mutable ref object.' },
        { q: 'What is the purpose of the dependency array in useEffect?', options: ['Control when the effect runs', 'Store effect results', 'Pass data to effect', 'Memoize values'], answer: 0, e: 'The dependency array determines when useEffect re-runs.' },
        { feature: 'custom hooks', purpose: 'Extract reusable logic with stateful behavior', e: 'Custom hooks are JavaScript functions that use React hooks.' }
      ]}
    ],
    Intermediate: [
      { topic: 'State Management', doc: 'https://react.dev/learn/sharing-state-between-components', facts: [
        { q: 'What is the Context API used for?', options: ['Share data without prop drilling', 'Manage API calls', 'Style components', 'Handle routing'], answer: 0, e: 'Context provides a way to pass data through the component tree without props.' },
        { q: 'What is Redux?', options: ['A state management library', 'A UI framework', 'A testing tool', 'A build tool'], answer: 0, e: 'Redux is a predictable state container for JavaScript apps.' },
        { q: 'What is prop drilling?', options: ['Passing props through many nested components', 'Drilling holes in props', 'Removing props', 'Creating props'], answer: 0, e: 'Prop drilling is passing props through intermediate components to reach deeply nested ones.' },
        { feature: 'useReducer', purpose: 'Manage complex state logic', e: 'useReducer is an alternative to useState for complex state transitions.' }
      ]}
    ]
  };

  var GIT_CONCEPTS = {
    Beginner: [
      { topic: 'Git Basics', doc: 'https://git-scm.com/doc', facts: [
        { q: 'Which command initializes a repository?', options: ['git init', 'git start', 'git create', 'git new'], answer: 0, e: 'git init creates a new Git repository.' },
        { q: 'Which command stages changes?', options: ['git add', 'git commit', 'git push', 'git stage'], answer: 0, e: 'git add stages changes for commit.' },
        { q: 'Which command saves changes to history?', options: ['git commit', 'git save', 'git push', 'git store'], answer: 0, e: 'git commit records changes in the repository.' },
        { q: 'Which command shows file status?', options: ['git status', 'git log', 'git diff', 'git show'], answer: 0, e: 'git status displays the working tree status.' },
        { q: 'Which command views commit history?', options: ['git log', 'git history', 'git show', 'git status'], answer: 0, e: 'git log shows the commit history.' },
        { blank: 'The git ________ command stages changes for commit.', options: ['add', 'commit', 'push', 'stage'], e: 'git add moves changes to the staging area.', answer: 0 }
      ]},
      { topic: 'Branching', doc: 'https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell', facts: [
        { q: 'Which command creates a branch?', options: ['git branch', 'git checkout -b', 'git branch -c', 'All of the above'], answer: 3, e: 'Both git branch and git checkout -b create branches.' },
        { q: 'Which command switches branches?', options: ['git checkout', 'git switch', 'git branch', 'Both checkout and switch'], answer: 3, e: 'Both git checkout and git switch change the current branch.' },
        { q: 'Which command merges branches?', options: ['git merge', 'git join', 'git combine', 'git rebase'], answer: 0, e: 'git merge integrates changes from another branch.' }
      ]}
    ],
    Intermediate: [
      { topic: 'Collaboration', doc: 'https://git-scm.com/book/en/v2/Git-Basics-Working-with-Remotes', facts: [
        { q: 'Which command pushes to remote?', options: ['git push', 'git pull', 'git fetch', 'git sync'], answer: 0, e: 'git push uploads local commits to a remote repository.' },
        { q: 'Which command pulls from remote?', options: ['git pull', 'git push', 'git fetch', 'git merge'], answer: 0, e: 'git pull fetches and merges changes from a remote.' },
        { q: 'Which command resolves conflicts?', options: ['Manual editing + commit', 'git resolve', 'git fix', 'git merge --fix'], answer: 0, e: 'Merge conflicts are resolved by editing and committing.' },
        { q: 'What is a pull request?', options: ['A request to merge changes', 'A request to pull code', 'A remote fetch', 'A branch deletion'], answer: 0, e: 'A pull request proposes changes for review and merge.' },
        { feature: 'git rebase', purpose: 'Reapply commits on top of another branch tip', e: 'Rebasing creates a linear history by moving commits.' }
      ]}
    ]
  };

  var GO_CONCEPTS = {
    Beginner: [
      { topic: 'Go Basics', doc: 'https://go.dev/doc/', facts: [
        { q: 'Which keyword starts a function?', options: ['func', 'function', 'def', 'fn'], answer: 0, e: 'func declares a function in Go.' },
        { q: 'How do you declare a variable in Go?', options: ['var x int', 'int x', 'x := 5', 'Both var and :='], answer: 3, e: 'Go supports both var declarations and short := declarations.' },
        { q: 'What is a goroutine?', options: ['A lightweight thread managed by Go runtime', 'A function', 'A data structure', 'A package'], answer: 0, e: 'Goroutines are lightweight concurrent execution threads.' },
        { q: 'What is a channel?', options: ['A communication pipe between goroutines', 'A data type', 'A network connection', 'A file pipe'], answer: 0, e: 'Channels enable communication between goroutines.' },
        { blank: 'Go uses the ________ keyword to declare functions.', options: ['func', 'function', 'def', 'fn'], e: 'func is the Go function keyword.', answer: 0 }
      ]},
      { topic: 'Go Types', doc: 'https://go.dev/ref/spec#Types', facts: [
        { q: 'What is a struct in Go?', options: ['A composite data type grouping fields', 'A class', 'An interface', 'A map'], answer: 0, e: 'A struct is a collection of fields.' },
        { q: 'What is an interface in Go?', options: ['A set of method signatures', 'A class', 'A struct', 'A function'], answer: 0, e: 'Interfaces define behavior through method sets.' },
        { q: 'What is a slice?', options: ['A dynamically-sized array view', 'A fixed array', 'A map', 'A struct'], answer: 0, e: 'A slice is a flexible view into an array.' },
        { feature: 'defer', purpose: 'Schedule a function call to run after the surrounding function returns', e: 'defer pushes a function call onto a stack for later execution.' }
      ]}
    ]
  };

  var DOCKER_CONCEPTS = {
    Beginner: [
      { topic: 'Docker Basics', doc: 'https://docs.docker.com/get-started/', facts: [
        { q: 'What is Docker?', options: ['A containerization platform', 'A virtual machine', 'A programming language', 'A database'], answer: 0, e: 'Docker packages applications into containers.' },
        { q: 'What is a container?', options: ['A lightweight, runnable package of code and dependencies', 'A virtual machine', 'A process', 'A service'], answer: 0, e: 'Containers are isolated environments for running applications.' },
        { q: 'What is an image?', options: ['A read-only template for creating containers', 'A running container', 'A Dockerfile', 'A volume'], answer: 0, e: 'An image is a blueprint for a container.' },
        { q: 'Which command runs a container?', options: ['docker run', 'docker start', 'docker create', 'docker exec'], answer: 0, e: 'docker run creates and starts a container.' },
        { q: 'What is a Dockerfile?', options: ['A text file with instructions to build an image', 'A configuration file', 'A log file', 'A volume definition'], answer: 0, e: 'A Dockerfile contains commands to assemble an image.' },
        { blank: 'A Docker _________ is a read-only template for creating containers.', options: ['image', 'container', 'volume', 'network'], e: 'Images are the build artifacts for containers.', answer: 0 }
      ]},
      { topic: 'Docker Compose', doc: 'https://docs.docker.com/compose/', facts: [
        { q: 'What is Docker Compose?', options: ['Tool for defining multi-container apps', 'A container runtime', 'An image builder', 'A monitoring tool'], answer: 0, e: 'Compose defines and runs multi-container Docker applications.' },
        { q: 'Which file defines Compose services?', options: ['docker-compose.yml', 'Dockerfile', 'compose.json', 'services.yml'], answer: 0, e: 'docker-compose.yml defines services, networks, and volumes.' },
        { q: 'Which command starts Compose services?', options: ['docker-compose up', 'docker-compose start', 'docker-compose run', 'docker-compose build'], answer: 0, e: 'docker-compose up starts all defined services.' },
        { feature: 'Docker volumes', purpose: 'Persist data beyond container lifecycle', e: 'Volumes provide persistent storage for containers.' }
      ]}
    ]
  };

  var NODEJS_CONCEPTS = {
    Beginner: [
      { topic: 'Node.js Basics', doc: 'https://nodejs.org/en/docs/', facts: [
        { q: 'What is Node.js?', options: ['JavaScript runtime built on V8', 'A browser', 'A framework', 'A database'], answer: 0, e: 'Node.js runs JavaScript outside the browser using V8.' },
        { q: 'Which object represents the current module?', options: ['module', 'exports', 'require', '__dirname'], answer: 0, e: 'The module object represents the current module.' },
        { q: 'Which function loads a module?', options: ['require()', 'import()', 'load()', 'include()'], answer: 0, e: 'require() imports modules in CommonJS.' },
        { q: 'What is npm?', options: ['Node package manager', 'Node process manager', 'Node project manager', 'Node performance monitor'], answer: 0, e: 'npm is the default package manager for Node.js.' },
        { blank: 'Node.js uses the ________ module system.', options: ['CommonJS', 'ES Modules', 'AMD', 'UMD'], e: 'Node.js primarily uses CommonJS (require/module.exports).', answer: 0 }
      ]},
      { topic: 'Express.js', doc: 'https://expressjs.com/', facts: [
        { q: 'What is Express?', options: ['A web framework for Node.js', 'A database', 'A testing tool', 'A build tool'], answer: 0, e: 'Express is a minimal web framework for Node.js.' },
        { q: 'Which method handles GET requests?', options: ['app.get()', 'app.post()', 'app.use()', 'app.all()'], answer: 0, e: 'app.get() registers a route handler for GET requests.' },
        { q: 'What is middleware?', options: ['Functions with access to request/response objects', 'A database layer', 'A view engine', 'A routing system'], answer: 0, e: 'Middleware functions execute during the request-response cycle.' },
        { q: 'Which property holds URL parameters?', options: ['req.params', 'req.query', 'req.body', 'req.url'], answer: 0, e: 'req.params contains route parameters.' },
        { feature: 'Express Router', purpose: 'Create modular route handlers', e: 'Router allows grouping route handlers for modularity.' }
      ]}
    ]
  };

  var DSA_CONCEPTS = {
    Beginner: [
      { topic: 'Arrays', doc: 'https://www.geeksforgeeks.org/array-data-structure/', facts: [
        { q: 'What is the time complexity of accessing an array element by index?', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'], answer: 0, e: 'Array access by index is constant time O(1).' },
        { q: 'What is the time complexity of searching in an unsorted array?', options: ['O(n)', 'O(1)', 'O(log n)', 'O(n^2)'], answer: 0, e: 'Linear search in an unsorted array is O(n).' },
        { q: 'Which algorithm sorts an array in O(n log n) average?', options: ['Merge sort', 'Bubble sort', 'Selection sort', 'Insertion sort'], answer: 0, e: 'Merge sort has O(n log n) time complexity.' },
        { q: 'What is a linked list?', options: ['A linear data structure with nodes pointing to next', 'An array', 'A tree', 'A graph'], answer: 0, e: 'A linked list consists of nodes connected by pointers.' },
        { blank: 'Array indexing has _________ time complexity.', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'], e: 'Accessing array elements by index is O(1).', answer: 0 }
      ]},
      { topic: 'Trees', doc: 'https://www.geeksforgeeks.org/binary-tree-data-structure/', facts: [
        { q: 'What is a binary tree?', options: ['A tree where each node has at most 2 children', 'A tree with two roots', 'A sorted array', 'A graph with cycles'], answer: 0, e: 'A binary tree has at most two children per node.' },
        { q: 'What is a binary search tree?', options: ['A BST where left <= root < right', 'A sorted array', 'A tree with two children', 'A hash table'], answer: 0, e: 'In a BST, the left subtree has smaller values, the right has larger.' },
        { q: 'How do you traverse a tree in-order?', options: ['Left, Root, Right', 'Root, Left, Right', 'Left, Right, Root', 'Root, Right, Left'], answer: 0, e: 'In-order traversal visits left, root, then right.' },
        { feature: 'recursion', purpose: 'Solve problems by breaking into smaller subproblems', e: 'Recursion is commonly used for tree traversals.' }
      ]}
    ],
    Intermediate: [
      { topic: 'Graphs', doc: 'https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/', facts: [
        { q: 'What is BFS?', options: ['Breadth-first search explores level by level', 'A sorting algorithm', 'A tree traversal', 'A path algorithm'], answer: 0, e: 'BFS explores all vertices at the current level before moving deeper.' },
        { q: 'What is DFS?', options: ['Depth-first search explores as far as possible', 'A sorting algorithm', 'A shortest path algorithm', 'A tree search'], answer: 0, e: 'DFS explores a path fully before backtracking.' },
        { q: 'What is Dijkstra\'s algorithm?', options: ['Finds shortest paths from a source node', 'Sorts a graph', 'Finds cycles', 'Spanning tree'], answer: 0, e: 'Dijkstra\'s finds the shortest path in a weighted graph.' },
        { q: 'What is dynamic programming?', options: ['Solving problems by combining subproblem solutions', 'A sorting algorithm', 'A search technique', 'A memory optimization'], answer: 0, e: 'DP breaks problems into overlapping subproblems and caches results.' }
      ]}
    ]
  };

  QuizSystem._CONCEPTS = {
    html: HTML_CONCEPTS,
    css: CSS_CONCEPTS,
    javascript: JS_CONCEPTS,
    python: PYTHON_CONCEPTS,
    java: JAVA_CONCEPTS,
    sql: SQL_CONCEPTS,
    cpp: CPP_CONCEPTS,
    react: REACT_CONCEPTS,
    git: GIT_CONCEPTS,
    go: GO_CONCEPTS,
    docker: DOCKER_CONCEPTS,
    nodejs: NODEJS_CONCEPTS,
    dsa: DSA_CONCEPTS
  };

  var REMAINING_COURSES = ['mysql', 'rust', 'typescript', 'c', 'csharp', 'kotlin', 'linux', 'mongodb', 'pandas', 'swift', 'security'];
  REMAINING_COURSES.forEach(function(cid) {
    if (!QuizSystem._CONCEPTS[cid]) {
      QuizSystem._CONCEPTS[cid] = JSON.parse(JSON.stringify(QuizSystem._CONCEPTS.javascript));
    }
  });
})();
