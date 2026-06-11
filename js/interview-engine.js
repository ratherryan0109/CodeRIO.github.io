var InterviewEngine = {
  _BANKS: {},
  _COMPANIES_BY_DIFFICULTY: {
    Beginner: ['TCS', 'Infosys', 'Wipro', 'Accenture', 'Cognizant'],
    Intermediate: ['Amazon', 'Microsoft', 'Flipkart', 'Uber', 'Swiggy', 'Paytm'],
    Advanced: ['Google', 'Meta', 'Apple', 'Netflix', 'Twitter', 'Stripe', 'Databricks']
  },
  _VIDEO_REF: {
    python: { channel: 'Telusko', id: 'sPCrFiy3_sE' },
    javascript: { channel: 'Hitesh Choudhary', id: 'ssQhuqVX5zE' },
    java: { channel: 'Apna College', id: 'yRpLlJmQu2s' },
    react: { channel: 'CodeWithHarry', id: 'RGKi6LdUBl4' },
    sql: { channel: 'Apna College', id: 'hlMXC7NTHJ0' },
    dsa: { channel: 'Striver', id: '4iF2Q1dZz-o' },
    html: { channel: 'CodeWithHarry', id: 'BsDoLVMnmZs' },
    css: { channel: 'CodeWithHarry', id: 'Edsxf_NBFrw' },
    git: { channel: 'Apna College', id: 'gwWK6EMg9TI' },
    docker: { channel: 'CodeWithHarry', id: 'gD7F4AClGFQ' },
    nodejs: { channel: 'Hitesh Choudhary', id: 'LHfTp8IxTBY' },
    typescript: { channel: 'Hitesh Choudhary', id: 'B4dwymeVxMg' },
    cpp: { channel: 'Apna College', id: 'mQSp9c4BoEw' },
    go: { channel: 'FreeCodeCamp', id: 'YS4e4q9oBaU' },
    rust: { channel: 'FreeCodeCamp', id: 'zF34dRivLOw' },
    linux: { channel: 'FreeCodeCamp', id: 'sWbUDq4S3Yk' },
    mongodb: { channel: 'CodeWithHarry', id: 'J6mDkcqR7-o' },
    mysql: { channel: 'Apna College', id: 'hlMXC7NTHJ0' },
    c: { channel: 'Apna College', id: 'irqbmH4S0sA' },
    csharp: { channel: 'FreeCodeCamp', id: 'GhQdlIFylQ8' },
    kotlin: { channel: 'FreeCodeCamp', id: 'F9UC9DYvI' },
    swift: { channel: 'FreeCodeCamp', id: 'comt0E7eP28' },
    pandas: { channel: 'Telusko', id: 'C2aGgGtvZ_k' },
    security: { channel: 'FreeCodeCamp', id: 'q5QfHc3J6Nc' },
    dbms: { channel: 'Gate Smashers', id: 'kDL6o2sOXaA' },
    oop: { channel: 'Apna College', id: 'bSrm9RXwBbk' },
    os: { channel: 'Gate Smashers', id: 'bkSWqO5tAIk' },
    networks: { channel: 'Gate Smashers', id: 'IPvYjXCsTg' },
    system_design: { channel: 'Gaurav Sen', id: 'x7EHsaMLYtQ' }
  },
  _PHRASINGS: {
    conceptual: [
      'Explain {term} in {course}. What are its key features and use cases?',
      'What is {term} and how does it work in {course}? Provide examples.',
      'Describe {term} in detail. How would you implement it in a real {course} project?',
      'Discuss {term} - its purpose, syntax, and common usage patterns in {course}.',
      'What do you understand by {term}? Explain with relevant code snippets.'
    ],
    scenario: [
      'Scenario: {scenario}',
      'You encounter this in a {course} project: {scenario}. Walk through your solution.',
      'How would you handle the following situation in {course}: {scenario}',
      'Imagine you are working on a {course} codebase and face this: {scenario}. What steps do you take?',
      'Practical scenario: {scenario} Discuss your approach to solving this in {course}.'
    ],
    code_analysis: [
      'Analyze the following {course} code. What does it do and what will be the output?',
      'Study this {course} code snippet carefully. Explain its purpose and predict the output.',
      'What will the following {course} code do? Walk through the execution step by step.',
      'Examine this {course} code. Identify what it does and describe the expected output.'
    ],
    debugging: [
      'Find and fix the bug in this {course} code.',
      'The following {course} code contains a bug. Identify the issue and provide the corrected version.',
      'Debug this {course} snippet. What is wrong and how would you fix it?',
      'Spot the error in this {course} code and explain how to correct it.',
      'There is a bug hidden in this {course} code. Can you find it and suggest the fix.'
    ],
    real_interview: [
      '[Real Interview Question - {company}] Explain how {term} works in {course}. Provide examples and discuss edge cases.',
      '[{company} Interview] Describe {term} in {course} with practical examples and trade-offs.',
      'This question was asked at {company}: Discuss {term} in {course}. Include implementation details and common pitfalls.',
      '[Real Interview - {company}] Walk through {term} in {course}. What are the advanced use cases?',
      '{company} interview question: Explain {term} thoroughly as used in {course} development.'
    ],
    compare_contrast: [
      'Compare and contrast "{term}" with {compare} in {course}. When would you use each?',
      'How does {term} differ from {compare} in {course}? Discuss their strengths and weaknesses.',
      '{term} vs {compare} in {course}: What are the key differences and when should you choose one over the other?',
      'Analyze the differences between {term} and {compare} in the context of {course}. Provide use cases for each.',
      'Compare "{term}" and {compare} in {course}. What are the trade-offs involved in choosing one?'
    ],
    best_practice: [
      'What are the best practices for using {term} in {course}?',
      'How should {term} be properly used in {course}? Discuss conventions and patterns.',
      'Describe the recommended approach for working with {term} in {course} projects.',
      'What guidelines should you follow when implementing {term} in {course}?',
      'Share the best practices and common patterns for {term} in {course} development.'
    ],
    system_design: [
      'Design {term}. What are the key components, trade-offs, and scalability considerations?',
      'How would you architect a system using {term}? Discuss components, data flow, and scaling.',
      'System design: Design {term}. Cover requirements, architecture, and scaling strategies.',
      'Walk through the design of {term}. Include high-level architecture, key components, and trade-offs.',
      'Design and explain {term} at scale. What are the main design decisions and their implications?'
    ],
    fill_blank: [
      'Fill in the blank: {blank}',
      'Complete the following statement about {course}: {blank}',
      'What is missing in this {course} sentence? {blank}',
      'Fill the gap: {blank}'
    ],
    output_prediction: [
      'What will be the output of this {course} code?',
      'Predict the output of the following {course} snippet.',
      'Trace through this {course} code and determine what it prints.',
      'What does this {course} program output? Explain your reasoning.',
      'Study the following {course} code and state the exact output.'
    ]
  },

  _expandText(concept, difficulty, section, courseId, templateType) {
    var counts = { Beginner: [3, 4], Intermediate: [5, 7], Advanced: [8, 10] };
    var range = counts[difficulty] || counts.Intermediate;
    var numPars = range[0] + Math.floor(Math.random() * (range[1] - range[0] + 1));
    var term = concept.term || concept.feature || 'this concept';
    var course = courseId.toUpperCase();
    var def = concept.definition || concept.def || '';
    var detail = concept.detail || concept.e || '';
    var kp = concept.keyPoints || [];
    var cm = concept.commonMistakes || [];
    var fu = concept.followUps || [];
    var compare = concept.compareWith || '';
    var realWorld = concept.realWorld || '';
    var isCodeType = templateType === 'code_analysis' || templateType === 'debugging' || templateType === 'output_prediction';
    var transitions = ['First,', 'Additionally,', 'Furthermore,', 'In contrast,', 'Moreover,', 'Finally,'];
    var paragraphs = [];
    if (section === 'overview') {
      var builders = [
        function() { return '<p>' + (def ? term + ' is defined as ' + def + '. ' : term + ' is a fundamental concept in ' + course + ' development. ') + 'Understanding ' + term + ' is essential for writing effective ' + course + ' code, as it forms the basis for more advanced topics and practical implementations.' + (kp.length > 0 ? ' Some of the core aspects include ' + kp.slice(0, Math.min(3, kp.length)).join(', ') + '.' : '') + '</p>'; },
        function() { return '<p>The relevance of ' + term + ' in ' + course + ' extends across multiple domains and use cases. ' + (detail ? detail + ' ' : '') + 'Developers who have a strong grasp of ' + term + ' can architect better solutions and debug issues more effectively in their day-to-day work.' + (kp.length > 2 ? ' For instance, ' + kp[2] + ' is one of the key characteristics that makes ' + term + ' valuable in practice.' : '') + '</p>'; },
        function() { return '<p>When working with ' + term + ' in ' + course + ', it is important to recognize its broader impact on application design and performance. ' + (compare ? 'Unlike ' + compare + ', ' + term + ' offers distinct advantages in certain scenarios, and knowing when to use each is a mark of an experienced developer. ' : 'Understanding how ' + term + ' influences the overall architecture of ' + course + ' applications helps in making better design decisions. ') + 'This conceptual understanding translates directly into cleaner, more maintainable code.</p>'; },
        function() { return '<p>In modern ' + course + ' development, ' + term + ' appears in various forms and contexts across different frameworks and libraries. ' + (kp.length > 0 ? kp.slice(0, 2).join(' and ') + ' are among the most important aspects to remember when applying this concept. ' : '') + 'Mastering ' + term + ' requires both theoretical knowledge and hands-on practice, as true understanding comes from applying the concept in real projects and solving actual problems.</p>'; },
        function() { return '<p>For those learning ' + course + ', ' + term + ' represents an important milestone in the learning journey. ' + (kp.length > 1 ? 'The concept of ' + kp[1] + ' is particularly noteworthy and worth studying in depth. ' : '') + 'Mastering ' + term + ' opens the door to more advanced topics and enables developers to take on more complex challenges with confidence.</p>'; },
        function() { return '<p>The impact of ' + term + ' on code quality in ' + course + ' cannot be overstated. ' + (cm.length > 0 ? 'Common mistakes such as ' + cm.slice(0, Math.min(2, cm.length)).join(' and ') + ' highlight why careful attention to this concept is necessary. ' : '') + 'Proper understanding and application of ' + term + ' leads to more robust, maintainable, and performant code in production environments.</p>'; },
        function() { return '<p>In technical interviews, ' + term + ' is a frequently tested topic in ' + course + ' discussions at all levels. ' + (fu.length > 0 ? 'Interviewers often probe deeper with questions like "' + fu[0] + '" to gauge true understanding. ' : '') + 'Being able to discuss ' + term + ' confidently and in depth is a strong indicator of overall ' + course + ' proficiency.</p>'; }
      ];
      for (var i = 0; i < numPars; i++) {
        if (i > 0 && i % 2 === 0 && kp.length > 0) {
          var items = kp.slice(0, Math.min(5, kp.length));
          var ul = '<ul class="iq-key-points">';
          items.forEach(function(item) { ul += '<li>' + item + '</li>'; });
          ul += '</ul>';
          paragraphs.push(ul);
        } else {
          var p = builders[i % builders.length]();
          if (i > 0) { p = '<p><strong>' + transitions[(i - 1) % transitions.length] + '</strong> ' + p.substring(3); }
          paragraphs.push(p);
        }
      }
    } else {
      var builders = [
        function() { return '<p>Examining ' + term + ' more deeply reveals how it operates internally within the ' + course + ' runtime or compilation process. ' + (detail ? detail + ' ' : def ? 'Based on its definition, ' + def + ', we can trace through the mechanics step by step. ' : '') + 'This internal understanding is crucial for debugging complex issues and optimizing performance.</p>'; },
        function() { return '<p>Several key aspects of ' + term + ' deserve closer examination. ' + (kp.length >= 2 ? 'First, ' + kp[0] + '. Additionally, ' + kp[1] + ' plays a significant role in how ' + term + ' behaves. ' : kp.length === 1 ? kp[0] + ' is the primary characteristic that defines how ' + term + ' works. ' : 'Understanding how ' + term + ' behaves requires exploring its interactions with other parts of ' + course + '. ') + 'These details form the foundation of practical knowledge that developers apply daily.</p>'; },
        function() { return '<p>When working with ' + term + ' in ' + course + ', developers frequently make mistakes that lead to subtle bugs. ' + (cm.length >= 2 ? 'The most common issues include ' + cm.slice(0, 2).join(' and ') + '. ' : cm.length === 1 ? cm[0] + ' is a particularly frequent error. ' : 'Being aware of potential pitfalls is important for writing reliable code. ') + 'Recognizing and avoiding these mistakes is a clear sign of growing expertise with ' + term + '.</p>'; },
        function() { return '<p>Performance considerations are an important aspect of using ' + term + ' effectively. ' + (kp.length > 0 ? 'For instance, ' + kp[0] + ' has direct implications for how efficiently your code runs. ' : '') + 'Understanding the performance characteristics of ' + term + ' helps developers make informed decisions about when and how to use it.</p>'; },
        function() { return '<p>Advanced usage of ' + term + ' involves combining it with other ' + course + ' features to create elegant solutions. ' + (kp.length > 3 ? kp[3] + ' is an example of how ' + term + ' can be leveraged in sophisticated ways. ' : 'Experienced developers find creative ways to apply ' + term + ' beyond basic tutorials. ') + 'These advanced patterns make ' + term + ' a versatile tool in the hands of skilled practitioners.</p>'; },
        function() { return '<p>A thoughtful comparison helps contextualize ' + term + ' within the broader ' + course + ' landscape. ' + (compare ? 'When compared with ' + compare + ', ' + term + ' offers distinct advantages in certain scenarios. ' : 'Understanding how ' + term + ' relates to similar concepts provides a more complete mental model. ') + 'This comparative knowledge is invaluable when making architectural decisions.</p>'; },
        function() { return '<p>Edge cases involving ' + term + ' can lead to unexpected behavior if not properly understood. ' + (cm.length > 1 ? 'For example, ' + cm[cm.length - 1] + ' is an edge case that catches many developers off guard. ' : '') + 'Thorough testing with various inputs uncovers these edge cases and ensures robustness.</p>'; },
        function() { return '<p>Following established best practices for ' + term + ' ensures your ' + course + ' code remains clean and maintainable. ' + (kp.length > 2 ? kp[2] + ' is one such practice that experienced developers always follow. ' : '') + 'Adopting these conventions saves countless hours of debugging and refactoring.</p>'; },
        function() { return '<p>In production ' + course + ' systems, ' + term + ' is used in ways not immediately obvious from documentation. ' + (realWorld ? realWorld + ' ' : 'Large-scale applications leverage ' + term + ' to solve real business problems. ') + 'Studying real-world usage provides invaluable practical insight.</p>'; },
        function() { return '<p>When preparing for ' + course + ' interviews, mastering ' + term + ' is a wise investment. ' + (fu.length > 0 ? 'Be prepared for follow-ups like "' + fu[0] + '" which test deeper understanding. ' : '') + 'Top companies expect candidates to discuss ' + term + ' with confidence and depth.</p>'; },
        function() { return '<p>' + term + ' integrates with other components of the ' + course + ' ecosystem in important ways. ' + (kp.length > 1 ? 'For instance, ' + kp[1] + ' demonstrates how ' + term + ' interacts with related features. ' : '') + 'Understanding these integration points helps build more cohesive applications.</p>'; },
        function() { return '<p>Taking a deeper look at ' + term + ' reveals subtle behaviors with significant implications. ' + (def ? 'The definition - ' + def + ' - only scratches the surface. ' : '') + 'This depth separates those who merely know about ' + term + ' from those who have truly mastered it.</p>'; }
      ];
      for (var i = 0; i < numPars; i++) {
        if (i > 0 && i % 3 === 0 && cm.length > 0) {
          var items = cm.slice(0, Math.min(4, cm.length));
          var ul = '<ul class="iq-explanation-points">';
          items.forEach(function(item) { ul += '<li>' + item + '</li>'; });
          ul += '</ul>';
          paragraphs.push(ul);
        } else if (isCodeType && i > 0 && i % 4 === 0 && kp.length > 0) {
          var steps = kp.slice(0, Math.min(5, kp.length));
          var ol = '<ol class="iq-trace">';
          steps.forEach(function(step, si) { ol += '<li><strong>Step ' + (si + 1) + ':</strong> ' + step + '</li>'; });
          ol += '</ol>';
          paragraphs.push(ol);
        } else {
          var p = builders[i % builders.length]();
          if (i > 0) { p = '<p><strong>' + transitions[(i - 1) % transitions.length] + '</strong> ' + p.substring(3); }
          paragraphs.push(p);
        }
      }
    }
    return paragraphs.join('');
  },

  getQuestions(courseId) {
    if (this._BANKS[courseId]) return this._BANKS[courseId];
    var data = INTERVIEW_DATA[courseId];
    if (!data) return [];
    var questions = this._generateFromData(data, courseId);
    this._BANKS[courseId] = questions;
    return questions;
  },

  _generateFromData(data, courseId) {
    var questions = [];
    data.topics.forEach(function(topic) {
      topic.concepts.forEach(function(concept, ci) {
        var templates = InterviewEngine._getTemplates(concept, topic, courseId);
        templates.forEach(function(t) {
          var q = InterviewEngine._callTemplate(t, concept, topic, courseId, ci);
          if (q) questions.push(q);
        });
      });
    });
    var deduped = InterviewEngine._dedupe(questions);
    return deduped;
  },

  _dedupe(qs) {
    var seen = {};
    return qs.filter(function(q) {
      var key = q.question.substring(0, 60).toLowerCase();
      if (seen[key]) return false;
      seen[key] = true;
      return true;
    });
  },

  _getTemplates(concept, topic, courseId) {
    var t = [];
    if (concept.term) { t.push('conceptual'); t.push('real_interview'); }
    if (concept.scenario) t.push('scenario');
    if (concept.codeExample && concept.codeExplanation) t.push('code_analysis');
    if (concept.bugCode) t.push('debugging');
    if (concept.compareWith) t.push('compare_contrast');
    if (concept.bestPractice || (concept.keyPoints && concept.keyPoints.length > 0)) t.push('best_practice');
    if (courseId === 'system_design' || concept.systemDesign) t.push('system_design');
    if (concept.definition) t.push('fill_blank');
    if (concept.codeExample && concept.codeOutput) t.push('output_prediction');
    return t.length > 0 ? t : ['conceptual'];
  },

  _callTemplate(type, concept, topic, courseId, idx) {
    var fn = InterviewEngine['_tmpl_' + type];
    return fn ? fn(concept, topic, courseId, idx) : null;
  },

  _tmpl_conceptual(concept, topic, courseId, idx) {
    if (!concept.term && !concept.feature) return null;
    var label = concept.term || concept.feature;
    var difficulty = concept.difficulty || 'Intermediate';
    var readingTime = difficulty === 'Beginner' ? '2 min' : difficulty === 'Intermediate' ? '3 min' : '6 min';
    var companies = InterviewEngine._COMPANIES_BY_DIFFICULTY[difficulty] || InterviewEngine._COMPANIES_BY_DIFFICULTY.Intermediate;
    var videoRef = InterviewEngine._VIDEO_REF[courseId];
    var phrasings = InterviewEngine._PHRASINGS.conceptual;
    var phrasing = phrasings[idx % phrasings.length];
    var question = phrasing.replace(/\{term\}/g, label).replace(/\{course\}/g, courseId.toUpperCase());
    return {
      id: courseId + '_conceptual_' + idx ,
      courseId: courseId, difficulty: difficulty, type: 'conceptual', topic: topic.name,
      readingTime: readingTime,
      companies: companies.slice(0, 3 + (idx % 3)),
      question: question,
      answer: {
        overview: InterviewEngine._expandText(concept, difficulty, 'overview', courseId, 'conceptual'),
        keyConcepts: (function() {
          var base = concept.keyPoints || [];
          var extras = ['Definition and purpose', 'Core characteristics', 'Relationship to other features', 'Best practices and conventions', 'Common use cases in ' + courseId.toUpperCase()];
          var result = base.slice();
          while (result.length < 4) { result.push(extras[result.length % extras.length]); }
          return result.slice(0, 8);
        })(),
        detailedExplanation: InterviewEngine._expandText(concept, difficulty, 'detailedExplanation', courseId, 'conceptual'),
        codeExample: concept.codeExample ? { language: InterviewEngine._getLang(courseId), code: concept.codeExample, lineNumbers: true, output: concept.codeOutput || '' } : null,
        realWorldExample: concept.realWorld || ('Used extensively in ' + courseId.toUpperCase() + ' projects for building robust applications.'),
        interviewTips: (function() {
          var tips = [];
          tips.push('Interviewers often ask about ' + label + ' to test your understanding of core ' + courseId.toUpperCase() + ' concepts.');
          tips.push('Be ready to explain both the theory behind ' + label + ' and its practical application in real code.');
          tips.push('Demonstrate depth by discussing edge cases, performance implications, and alternative approaches.');
          if (concept.keyPoints && concept.keyPoints.length > 0) { tips.push('Mention specific key points like ' + concept.keyPoints.slice(0, 2).join(' and ') + ' to show thorough preparation.'); }
          tips.push('Prepare a concise code example that illustrates ' + label + ' in action to reinforce your explanation.');
          return tips.join(' ');
        })(),
        commonMistakes: (function() {
          var base = concept.commonMistakes || [];
          var extras = ['Confusing with similar concepts', 'Incorrect implementation patterns', 'Not considering edge cases', 'Overlooking performance implications', 'Misunderstanding scope or lifetime', 'Applying concept in wrong context', 'Ignoring language-specific behavior', 'Failing to handle errors properly'];
          var result = base.slice();
          while (result.length < 5) { result.push(extras[result.length % extras.length]); }
          return result.slice(0, 8);
        })(),
        followUpQuestions: (function() {
          var base = concept.followUps || [];
          var extras = ['How does this compare to alternatives?', 'What are the performance implications?', 'How would you implement this from scratch?', 'What happens at scale?', 'How do you test this effectively?', 'Can you describe a real project where this was critical?'];
          var result = base.slice();
          while (result.length < 4) { result.push(extras[result.length % extras.length]); }
          return result.slice(0, 7);
        })(),
        video: videoRef ? { title: courseId.toUpperCase() + ' - ' + label, channel: videoRef.channel, thumbnail: 'https://img.youtube.com/vi/' + videoRef.id + '/hqdefault.jpg', url: 'https://youtube.com/watch?v=' + videoRef.id } : null
      }
    };
  },

  _tmpl_scenario(concept, topic, courseId, idx) {
    if (!concept.scenario && !concept.term) return null;
    var label = concept.term || concept.feature || 'concept';
    var difficulty = concept.difficulty || 'Intermediate';
    var companies = InterviewEngine._COMPANIES_BY_DIFFICULTY[difficulty];
    var scenarioText = concept.scenario || ('You are working on a ' + courseId.toUpperCase() + ' project and need to apply ' + label + '. How would you approach it?');
    var phrasings = InterviewEngine._PHRASINGS.scenario;
    var phrasing = phrasings[idx % phrasings.length];
    var question = phrasing.replace(/\{scenario\}/g, scenarioText).replace(/\{course\}/g, courseId.toUpperCase()).replace(/\{term\}/g, label);
    return {
      id: courseId + '_scenario_' + idx ,
      courseId: courseId, difficulty: difficulty, type: 'scenario', topic: topic.name,
      readingTime: difficulty === 'Beginner' ? '2 min' : difficulty === 'Intermediate' ? '4 min' : '8 min',
      companies: companies.slice(0, 2 + (idx % 3)),
      question: question,
      answer: {
        overview: InterviewEngine._expandText(concept, difficulty, 'overview', courseId, 'scenario'),
        keyConcepts: (function() {
          var base = concept.keyPoints || [];
          var extras = ['Problem analysis', 'Solution design', 'Implementation approach', 'Testing and validation', 'Edge case handling', 'Performance considerations', 'Code organization', 'Error handling strategy'];
          var result = base.slice();
          while (result.length < 6) { result.push(extras[result.length % extras.length]); }
          return result.slice(0, 10);
        })(),
        detailedExplanation: InterviewEngine._expandText(concept, difficulty, 'detailedExplanation', courseId, 'scenario'),
        codeExample: concept.codeExample ? { language: InterviewEngine._getLang(courseId), code: concept.codeExample, lineNumbers: true } : null,
        realWorldExample: concept.realWorld || ('Teams commonly encounter this when building ' + courseId.toUpperCase() + ' applications at scale.'),
        interviewTips: (function() {
          var tips = [];
          tips.push('Walk through your thought process step by step when answering scenario questions.');
          tips.push('Interviewers want to see how you approach problems, not just the final answer.');
          tips.push('Start by clarifying requirements and constraints before diving into implementation.');
          tips.push('Discuss multiple approaches and explain why you chose one over the alternatives.');
          tips.push('Mention how you would test, monitor, and maintain your solution in production.');
          return tips.join(' ');
        })(),
        commonMistakes: (function() {
          var base = concept.commonMistakes || [];
          var extras = ['Jumping to implementation without understanding requirements', 'Ignoring edge cases', 'Over-engineering the solution', 'Not considering scalability', 'Forgetting non-functional requirements'];
          var result = base.slice();
          while (result.length < 5) { result.push(extras[result.length % extras.length]); }
          return result.slice(0, 8);
        })(),
        followUpQuestions: (function() {
          var base = concept.followUps || [];
          var extras = ['How would you test this solution?', 'What if the scale increases 10x?', 'How would you handle failure scenarios?', 'Can you think of an alternative approach?'];
          var result = base.slice();
          while (result.length < 4) { result.push(extras[result.length % extras.length]); }
          return result.slice(0, 7);
        })()
      }
    };
  },

  _tmpl_code_analysis(concept, topic, courseId, idx) {
    if (!concept.codeExample) return null;
    var difficulty = concept.difficulty || 'Intermediate';
    var companies = InterviewEngine._COMPANIES_BY_DIFFICULTY[difficulty];
    var phrasings = InterviewEngine._PHRASINGS.code_analysis;
    var phrasing = phrasings[idx % phrasings.length];
    var question = phrasing.replace(/\{course\}/g, courseId.toUpperCase());
    return {
      id: courseId + '_code_' + idx ,
      courseId: courseId, difficulty: difficulty, type: 'code_analysis', topic: topic.name,
      readingTime: difficulty === 'Beginner' ? '2 min' : difficulty === 'Intermediate' ? '3 min' : '6 min',
      companies: companies.slice(0, 2 + (idx % 2)),
      question: question,
      questionCode: concept.codeExample,
      answer: {
        overview: InterviewEngine._expandText(concept, difficulty, 'overview', courseId, 'code_analysis'),
        keyConcepts: (function() {
          var base = concept.keyPoints || [];
          var extras = ['Code execution flow', 'Output prediction', 'Language semantics', 'Data flow analysis', 'Control flow understanding', 'Variable scope and lifetime', 'Type system behavior'];
          var result = base.slice();
          while (result.length < 6) { result.push(extras[result.length % extras.length]); }
          return result.slice(0, 10);
        })(),
        detailedExplanation: concept.codeExplanation || concept.e || InterviewEngine._expandText(concept, difficulty, 'detailedExplanation', courseId, 'code_analysis'),
        codeExample: undefined,
        realWorldExample: concept.realWorld || 'Similar patterns appear in production ' + courseId.toUpperCase() + ' codebases regularly.',
        interviewTips: (function() {
          var tips = [];
          tips.push('Read the code carefully before answering. Pay attention to data types, scope, and control flow.');
          tips.push('Walk through execution line by line, tracking variable values as they change.');
          tips.push('Mention language-specific behaviors that affect the output.');
          tips.push('Discuss alternative ways to write the same logic and their trade-offs.');
          tips.push('Be systematic in your analysis to show methodical thinking skills.');
          return tips.join(' ');
        })(),
        commonMistakes: (function() {
          var base = concept.commonMistakes || [];
          var extras = ['Misreading code logic', 'Forgetting language-specific behavior', 'Not considering edge cases', 'Overlooking implicit type conversions', 'Missing side effects'];
          var result = base.slice();
          while (result.length < 5) { result.push(extras[result.length % extras.length]); }
          return result.slice(0, 8);
        })(),
        followUpQuestions: (function() {
          var base = concept.followUps || [];
          var extras = ['How would you modify this for edge case X?', 'What is the time complexity?', 'Can you optimize this further?'];
          var result = base.slice();
          while (result.length < 4) { result.push(extras[result.length % extras.length]); }
          return result.slice(0, 7);
        })()
      }
    };
  },

  _tmpl_debugging(concept, topic, courseId, idx) {
    if (!concept.bugCode) return null;
    var code = concept.bugCode;
    var difficulty = concept.difficulty || 'Intermediate';
    var companies = InterviewEngine._COMPANIES_BY_DIFFICULTY[difficulty];
    var phrasings = InterviewEngine._PHRASINGS.debugging;
    var phrasing = phrasings[idx % phrasings.length];
    var question = phrasing.replace(/\{course\}/g, courseId.toUpperCase());
    return {
      id: courseId + '_debug_' + idx ,
      courseId: courseId, difficulty: difficulty, type: 'debugging', topic: topic.name,
      readingTime: difficulty === 'Beginner' ? '3 min' : difficulty === 'Intermediate' ? '4 min' : '8 min',
      companies: companies.slice(0, 2 + (idx % 3)),
      question: question,
      questionCode: code,
      answer: {
        overview: InterviewEngine._expandText(concept, difficulty, 'overview', courseId, 'debugging'),
        keyConcepts: (function() {
          var base = concept.keyPoints || [];
          var extras = ['Bug identification', 'Root cause analysis', 'Correct implementation', 'Defensive programming', 'Error handling patterns', 'Code review techniques'];
          var result = base.slice();
          while (result.length < 6) { result.push(extras[result.length % extras.length]); }
          return result.slice(0, 10);
        })(),
        detailedExplanation: concept.bugExplanation || concept.e || InterviewEngine._expandText(concept, difficulty, 'detailedExplanation', courseId, 'debugging'),
        codeExample: concept.fixedCode ? { language: InterviewEngine._getLang(courseId), code: concept.fixedCode, lineNumbers: true, output: concept.fixedOutput || '' } : null,
        realWorldExample: 'This is a frequently encountered bug in ' + courseId.toUpperCase() + ' production code.',
        interviewTips: (function() {
          var tips = [];
          tips.push('First identify symptoms, then trace back to the root cause.');
          tips.push('Explain what the correct behavior should be before showing the fix.');
          tips.push('Discuss how to prevent this class of bugs in the future.');
          tips.push('Show your systematic debugging methodology.');
          tips.push('Mention testing strategies that would catch this bug before production.');
          return tips.join(' ');
        })(),
        commonMistakes: (function() {
          var base = concept.commonMistakes || [];
          var extras = ['Fixing symptoms instead of root cause', 'Introducing new bugs while fixing', 'Not understanding why the bug occurs', 'Overlooking similar patterns elsewhere'];
          var result = base.slice();
          while (result.length < 5) { result.push(extras[result.length % extras.length]); }
          return result.slice(0, 8);
        })(),
        followUpQuestions: (function() {
          var base = concept.followUps || [];
          var extras = ['How would you prevent this bug in the future?', 'Can you write a test for this?', 'How would you debug this in production?'];
          var result = base.slice();
          while (result.length < 4) { result.push(extras[result.length % extras.length]); }
          return result.slice(0, 7);
        })()
      }
    };
  },

  _tmpl_real_interview(concept, topic, courseId, idx) {
    if (!concept.term && !concept.feature) return null;
    var label = concept.term || concept.feature;
    var difficulty = concept.difficulty || 'Intermediate';
    var companies = InterviewEngine._COMPANIES_BY_DIFFICULTY[difficulty];
    var realCompany = companies[idx % companies.length];
    var phrasings = InterviewEngine._PHRASINGS.real_interview;
    var phrasing = phrasings[idx % phrasings.length];
    var question = phrasing.replace(/\{term\}/g, label).replace(/\{course\}/g, courseId.toUpperCase()).replace(/\{company\}/g, realCompany);
    return {
      id: courseId + '_real_' + idx ,
      courseId: courseId, difficulty: difficulty, type: 'real_interview', topic: topic.name,
      readingTime: difficulty === 'Beginner' ? '3 min' : difficulty === 'Intermediate' ? '5 min' : '8 min',
      companies: [realCompany].concat(companies.slice(0, 2)),
      question: question,
      answer: {
        overview: InterviewEngine._expandText(concept, difficulty, 'overview', courseId, 'real_interview'),
        keyConcepts: (function() {
          var base = concept.keyPoints || [];
          var extras = ['Implementation details', 'Edge cases', 'Performance considerations', 'Trade-offs', 'Internal mechanics', 'Integration patterns', 'Testing approaches'];
          var result = base.slice();
          while (result.length < 6) { result.push(extras[result.length % extras.length]); }
          return result.slice(0, 10);
        })(),
        detailedExplanation: InterviewEngine._expandText(concept, difficulty, 'detailedExplanation', courseId, 'real_interview'),
        codeExample: concept.codeExample ? { language: InterviewEngine._getLang(courseId), code: concept.codeExample, lineNumbers: true } : null,
        realWorldExample: concept.realWorld || ('At ' + realCompany + ', this concept is used extensively in their ' + courseId.toUpperCase() + ' codebase.'),
        interviewTips: (function() {
          var tips = [];
          tips.push(realCompany + ' interviewers focus on depth of knowledge rather than surface-level familiarity.');
          tips.push('Be prepared to discuss trade-offs, alternatives, and internal implementation details.');
          tips.push('Show how you have applied ' + label + ' in real projects with measurable outcomes.');
          tips.push('Connect the concept to system design and architectural decisions.');
          tips.push('Demonstrate thought leadership by discussing emerging trends and future directions.');
          return tips.join(' ');
        })(),
        commonMistakes: (function() {
          var base = concept.commonMistakes || [];
          var extras = ['Superficial answers without depth', 'Not mentioning trade-offs', 'Unable to provide real code examples', 'Failing to connect theory to practice'];
          var result = base.slice();
          while (result.length < 5) { result.push(extras[result.length % extras.length]); }
          return result.slice(0, 8);
        })(),
        followUpQuestions: (function() {
          var base = concept.followUps || [];
          var extras = ['Compare with alternative approaches', 'How would you implement this from scratch?', 'What are the scaling limitations?'];
          var result = base.slice();
          while (result.length < 4) { result.push(extras[result.length % extras.length]); }
          return result.slice(0, 7);
        })(),
        video: concept.video ? InterviewEngine._VIDEO_REF[courseId] ? { title: courseId.toUpperCase() + ' - ' + label, channel: InterviewEngine._VIDEO_REF[courseId].channel, thumbnail: 'https://img.youtube.com/vi/' + InterviewEngine._VIDEO_REF[courseId].id + '/hqdefault.jpg', url: 'https://youtube.com/watch?v=' + InterviewEngine._VIDEO_REF[courseId].id } : null : null
      }
    };
  },

  _tmpl_compare_contrast(concept, topic, courseId, idx) {
    if (!concept.term && !concept.compareWith) return null;
    var label = concept.term || 'concept';
    var compare = concept.compareWith || 'alternative approaches';
    var difficulty = concept.difficulty || 'Intermediate';
    var companies = InterviewEngine._COMPANIES_BY_DIFFICULTY[difficulty];
    var phrasings = InterviewEngine._PHRASINGS.compare_contrast;
    var phrasing = phrasings[idx % phrasings.length];
    var question = phrasing.replace(/\{term\}/g, label).replace(/\{compare\}/g, compare).replace(/\{course\}/g, courseId.toUpperCase());
    return {
      id: courseId + '_compare_' + idx ,
      courseId: courseId, difficulty: difficulty, type: 'compare_contrast', topic: topic.name,
      readingTime: difficulty === 'Beginner' ? '3 min' : difficulty === 'Intermediate' ? '4 min' : '6 min',
      companies: companies.slice(0, 3),
      question: question,
      answer: {
        overview: InterviewEngine._expandText(concept, difficulty, 'overview', courseId, 'compare_contrast'),
        keyConcepts: (function() {
          var base = concept.keyPoints || [];
          var extras = ['Similarities', 'Key differences', 'Trade-offs', 'Use cases for each', 'Performance comparison', 'Learning curve', 'Ecosystem support'];
          var result = base.slice();
          while (result.length < 6) { result.push(extras[result.length % extras.length]); }
          return result.slice(0, 10);
        })(),
        detailedExplanation: concept.comparison || concept.e || InterviewEngine._expandText(concept, difficulty, 'detailedExplanation', courseId, 'compare_contrast'),
        codeExample: concept.codeExample ? { language: InterviewEngine._getLang(courseId), code: concept.codeExample, lineNumbers: true } : null,
        realWorldExample: 'In production systems, the choice between these depends on performance requirements, team expertise, and scalability needs.',
        interviewTips: (function() {
          var tips = [];
          tips.push('Structure your answer: similarities first, then differences, then when to use each.');
          tips.push('Always give concrete examples highlighting practical differences.');
          tips.push('Avoid presenting one option as universally better - context matters.');
          tips.push('Discuss migration paths and compatibility concerns between approaches.');
          tips.push('Show awareness of real-world trade-offs with specific scenarios.');
          return tips.join(' ');
        })(),
        commonMistakes: (function() {
          var base = concept.commonMistakes || [];
          var extras = ['Presenting one as universally better', 'Not considering context', 'Forgetting to mention trade-offs', 'Superficial comparison without depth'];
          var result = base.slice();
          while (result.length < 5) { result.push(extras[result.length % extras.length]); }
          return result.slice(0, 8);
        })(),
        followUpQuestions: (function() {
          var base = concept.followUps || [];
          var extras = ['What are the performance implications?', 'How does this affect maintainability?', 'Can they be used together?'];
          var result = base.slice();
          while (result.length < 4) { result.push(extras[result.length % extras.length]); }
          return result.slice(0, 7);
        })()
      }
    };
  },

  _tmpl_best_practice(concept, topic, courseId, idx) {
    if (!concept.term && !concept.bestPractice) return null;
    var label = concept.term || concept.feature || 'concept';
    var practice = concept.bestPractice || concept.e || 'following best practices';
    var difficulty = concept.difficulty || 'Beginner';
    var companies = InterviewEngine._COMPANIES_BY_DIFFICULTY[difficulty];
    var phrasings = InterviewEngine._PHRASINGS.best_practice;
    var phrasing = phrasings[idx % phrasings.length];
    var question = phrasing.replace(/\{term\}/g, label).replace(/\{course\}/g, courseId.toUpperCase());
    return {
      id: courseId + '_bestprac_' + idx ,
      courseId: courseId, difficulty: difficulty, type: 'best_practice', topic: topic.name,
      readingTime: difficulty === 'Beginner' ? '2 min' : difficulty === 'Intermediate' ? '3 min' : '5 min',
      companies: companies.slice(0, 3),
      question: question,
      answer: {
        overview: InterviewEngine._expandText(concept, difficulty, 'overview', courseId, 'best_practice'),
        keyConcepts: (function() {
          var base = concept.keyPoints || [];
          var extras = ['Best practices overview', 'Common pitfalls', 'Code quality standards', 'Performance optimization', 'Security considerations', 'Maintainability', 'Testing strategies'];
          var result = base.slice();
          while (result.length < 6) { result.push(extras[result.length % extras.length]); }
          return result.slice(0, 10);
        })(),
        detailedExplanation: typeof practice === 'string' && practice.split(' ').length > 10 ? practice : InterviewEngine._expandText(concept, difficulty, 'detailedExplanation', courseId, 'best_practice'),
        codeExample: concept.codeExample ? { language: InterviewEngine._getLang(courseId), code: concept.codeExample, lineNumbers: true } : null,
        realWorldExample: 'Top engineering teams follow these practices when working with ' + label + ' in production.',
        interviewTips: (function() {
          var tips = [];
          tips.push('Show that you care about code quality with specific practices and examples.');
          tips.push('Explain not just what the practice is, but why it matters.');
          tips.push('Mention how you enforce these practices in a team setting.');
          tips.push('Discuss how these practices evolve with changing requirements.');
          tips.push('Connect best practices to business outcomes like reduced bugs.');
          return tips.join(' ');
        })(),
        commonMistakes: (function() {
          var base = concept.commonMistakes || [];
          var extras = ['Ignoring best practices for shortcuts', 'Not keeping up with evolving standards', 'Blindly following rules without understanding why', 'Over-applying patterns'];
          var result = base.slice();
          while (result.length < 5) { result.push(extras[result.length % extras.length]); }
          return result.slice(0, 8);
        })(),
        followUpQuestions: (function() {
          var base = concept.followUps || [];
          var extras = ['How do you enforce these practices in a team?', 'What tools help automate these?', 'When would you deviate from best practices?'];
          var result = base.slice();
          while (result.length < 4) { result.push(extras[result.length % extras.length]); }
          return result.slice(0, 7);
        })()
      }
    };
  },

  _tmpl_system_design(concept, topic, courseId, idx) {
    if (courseId !== 'system_design' && courseId !== 'dsa' && !concept.systemDesign) return null;
    var label = concept.term || concept.feature || 'a system';
    var difficulty = 'Advanced';
    var companies = InterviewEngine._COMPANIES_BY_DIFFICULTY.Advanced;
    var phrasings = InterviewEngine._PHRASINGS.system_design;
    var phrasing = phrasings[idx % phrasings.length];
    var question = concept.systemDesign || phrasing.replace(/\{term\}/g, label).replace(/\{course\}/g, courseId.toUpperCase());
    return {
      id: courseId + '_design_' + idx ,
      courseId: courseId, difficulty: difficulty, type: 'system_design', topic: topic.name,
      readingTime: '10 min',
      companies: companies.slice(0, 3),
      question: question,
      answer: {
        overview: InterviewEngine._expandText(concept, difficulty, 'overview', courseId, 'system_design'),
        keyConcepts: (function() {
          var base = concept.keyPoints || [];
          var extras = ['Requirements gathering', 'High-level design', 'Component breakdown', 'Data modeling', 'Scalability strategies', 'Performance optimization', 'Reliability', 'Security', 'Monitoring', 'Cost optimization'];
          var result = base.slice();
          while (result.length < 6) { result.push(extras[result.length % extras.length]); }
          return result.slice(0, 10);
        })(),
        detailedExplanation: concept.detail || concept.e || InterviewEngine._expandText(concept, difficulty, 'detailedExplanation', courseId, 'system_design'),
        codeExample: null,
        realWorldExample: 'Companies like Google, Amazon, and Netflix have built similar systems at massive scale.',
        interviewTips: (function() {
          var tips = [];
          tips.push('Structure: Requirements, Estimation, Data Model, High-level Design, Deep Dive, Trade-offs.');
          tips.push('Always clarify requirements before jumping into the design.');
          tips.push('Discuss trade-offs explicitly for every design decision.');
          tips.push('Show how the system handles failure scenarios.');
          tips.push('Consider operational aspects like deployment and monitoring.');
          return tips.join(' ');
        })(),
        commonMistakes: (function() {
          var base = concept.commonMistakes || [];
          var extras = ['Jumping to design without requirements', 'Ignoring non-functional requirements', 'Not discussing trade-offs', 'Single point of failure', 'Over-engineering'];
          var result = base.slice();
          while (result.length < 5) { result.push(extras[result.length % extras.length]); }
          return result.slice(0, 8);
        })(),
        followUpQuestions: (function() {
          var base = concept.followUps || [];
          var extras = ['How would you handle 10x traffic?', 'What database would you choose and why?', 'How do you ensure reliability?'];
          var result = base.slice();
          while (result.length < 4) { result.push(extras[result.length % extras.length]); }
          return result.slice(0, 7);
        })(),
        video: InterviewEngine._VIDEO_REF[courseId] ? { title: 'System Design - ' + label, channel: 'Gaurav Sen', thumbnail: 'https://img.youtube.com/vi/x7EHsaMLYtQ/hqdefault.jpg', url: 'https://youtube.com/watch?v=x7EHsaMLYtQ' } : null
      }
    };
  },

  _tmpl_fill_blank(concept, topic, courseId, idx) {
    if (!concept.term && !concept.feature) return null;
    var label = concept.term || concept.feature;
    var difficulty = 'Beginner';
    if (concept.difficulty === 'Advanced' || concept.difficulty === 'Intermediate') difficulty = 'Intermediate';
    var companies = InterviewEngine._COMPANIES_BY_DIFFICULTY[difficulty];
    var def = concept.definition || concept.def || (label + ' is a key concept in ' + courseId.toUpperCase());
    var blankPatterns = [
      'In {course}, _____ refers to: ' + def,
      '_____ is the term used in {course} for: ' + def,
      'The {course} concept of _____ means that ' + (def.charAt(0).toLowerCase() + def.slice(1))
    ];
    var blankSentence = blankPatterns[idx % blankPatterns.length];
    var phrasings = InterviewEngine._PHRASINGS.fill_blank;
    var phrasing = phrasings[idx % phrasings.length];
    var question = phrasing.replace(/\{blank\}/g, blankSentence).replace(/\{course\}/g, courseId.toUpperCase());
    return {
      id: courseId + '_fillblank_' + idx ,
      courseId: courseId, difficulty: difficulty, type: 'fill_blank', topic: topic.name,
      readingTime: difficulty === 'Beginner' ? '2 min' : '3 min',
      companies: companies.slice(0, 3),
      question: question,
      answer: {
        overview: 'The correct answer is "' + label + '". ' + InterviewEngine._expandText(concept, difficulty, 'overview', courseId, 'fill_blank'),
        keyConcepts: (function() {
          var base = concept.keyPoints || [];
          var extras = ['Definition recall', 'Concept application', 'Contextual understanding', 'Related terminology', 'Practical usage', 'Common associations'];
          var result = base.slice();
          while (result.length < 6) { result.push(extras[result.length % extras.length]); }
          return result.slice(0, 10);
        })(),
        detailedExplanation: InterviewEngine._expandText(concept, difficulty, 'detailedExplanation', courseId, 'fill_blank'),
        codeExample: concept.codeExample ? { language: InterviewEngine._getLang(courseId), code: concept.codeExample, lineNumbers: true, output: concept.codeOutput || '' } : null,
        realWorldExample: concept.realWorld || ('Understanding ' + label + ' is essential for mastering ' + courseId.toUpperCase() + ' development.'),
        interviewTips: 'Fill-in-the-blank questions test your ability to recall specific terminology accurately. Make sure you understand the precise definition and can distinguish it from similar terms. Practice explaining the concept in your own words to reinforce your understanding.',
        commonMistakes: (function() {
          var base = concept.commonMistakes || [];
          var extras = ['Confusing with similar-sounding terms', 'Partial understanding leading to incorrect answers', 'Not reading the full context of the question'];
          var result = base.slice();
          while (result.length < 5) { result.push(extras[result.length % extras.length]); }
          return result.slice(0, 8);
        })(),
        followUpQuestions: (function() {
          var base = concept.followUps || [];
          var extras = ['Can you explain this concept in more detail?', 'How does this relate to other concepts?', 'Can you provide a real-world example?'];
          var result = base.slice();
          while (result.length < 4) { result.push(extras[result.length % extras.length]); }
          return result.slice(0, 7);
        })(),
        video: InterviewEngine._VIDEO_REF[courseId] ? { title: courseId.toUpperCase() + ' - ' + label, channel: InterviewEngine._VIDEO_REF[courseId].channel, thumbnail: 'https://img.youtube.com/vi/' + InterviewEngine._VIDEO_REF[courseId].id + '/hqdefault.jpg', url: 'https://youtube.com/watch?v=' + InterviewEngine._VIDEO_REF[courseId].id } : null
      }
    };
  },

  _tmpl_output_prediction(concept, topic, courseId, idx) {
    if (!concept.codeExample) return null;
    var label = concept.term || 'code snippet';
    var difficulty = concept.difficulty || 'Intermediate';
    var companies = InterviewEngine._COMPANIES_BY_DIFFICULTY[difficulty];
    var phrasings = InterviewEngine._PHRASINGS.output_prediction;
    var phrasing = phrasings[idx % phrasings.length];
    var question = phrasing.replace(/\{course\}/g, courseId.toUpperCase());
    return {
      id: courseId + '_output_' + idx ,
      courseId: courseId, difficulty: difficulty, type: 'output_prediction', topic: topic.name,
      readingTime: difficulty === 'Beginner' ? '2 min' : difficulty === 'Intermediate' ? '3 min' : '5 min',
      companies: companies.slice(0, 2 + (idx % 2)),
      question: question,
      questionCode: concept.codeExample,
      answer: {
        overview: InterviewEngine._expandText(concept, difficulty, 'overview', courseId, 'output_prediction'),
        keyConcepts: (function() {
          var base = concept.keyPoints || [];
          var extras = ['Step-by-step execution tracing', 'Understanding program flow', 'Variable state tracking', 'Output prediction', 'Language-specific behaviors', 'Common output patterns'];
          var result = base.slice();
          while (result.length < 6) { result.push(extras[result.length % extras.length]); }
          return result.slice(0, 10);
        })(),
        detailedExplanation: concept.codeExplanation || ('Let us trace through this ' + courseId.toUpperCase() + ' code step by step. ' + (concept.codeOutput ? 'The expected output is: ' + concept.codeOutput + '. ' : '') + InterviewEngine._expandText(concept, difficulty, 'detailedExplanation', courseId, 'output_prediction')),
        codeExample: undefined,
        realWorldExample: concept.realWorld || 'Understanding output prediction helps debug unexpected behavior in production ' + courseId.toUpperCase() + ' applications.',
        interviewTips: (function() {
          var tips = [];
          tips.push('Trace through the code line by line, tracking variable values at each step.');
          tips.push('Pay attention to language-specific behaviors like hoisting and scope rules.');
          tips.push('Consider edge cases like empty inputs and boundary values.');
          tips.push('Explain your reasoning process out loud to show systematic thinking.');
          tips.push('Verify your answer by mentally simulating execution before responding.');
          return tips.join(' ');
        })(),
        commonMistakes: (function() {
          var base = concept.commonMistakes || [];
          var extras = ['Missing subtle language semantics', 'Not considering variable scope', 'Overlooking type coercion rules', 'Incorrect operator precedence'];
          var result = base.slice();
          while (result.length < 5) { result.push(extras[result.length % extras.length]); }
          return result.slice(0, 8);
        })(),
        followUpQuestions: (function() {
          var base = concept.followUps || [];
          var extras = ['What would happen if we changed this line?', 'How would you modify this for different output?', 'What is the time complexity?'];
          var result = base.slice();
          while (result.length < 4) { result.push(extras[result.length % extras.length]); }
          return result.slice(0, 7);
        })()
      }
    };
  },

  _getLang(courseId) {
    var map = {
      python: 'python', javascript: 'javascript', java: 'java', react: 'jsx',
      cpp: 'cpp', c: 'c', csharp: 'csharp', go: 'go', rust: 'rust',
      swift: 'swift', kotlin: 'kotlin', typescript: 'typescript',
      html: 'html', css: 'css', sql: 'sql', nodejs: 'javascript',
      mongodb: 'javascript', git: 'bash', docker: 'dockerfile',
      linux: 'bash', pandas: 'python', mysql: 'sql'
    };
    return map[courseId] || 'javascript';
  }
};
