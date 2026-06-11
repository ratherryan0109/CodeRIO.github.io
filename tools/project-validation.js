var ProjectValidation = {
  QUESTIONS: [
    { id: 'pv_1', question: 'Which of the following best describes the MVC pattern?', options: ['Model-View-Controller separates data, UI, and logic', 'Model-View-Component is a React pattern', 'Module-View-Controller handles routing', 'Managed-View-Component is for state management'], answer: 0, topic: 'Architecture' },
    { id: 'pv_2', question: 'What is the primary purpose of a RESTful API?', options: ['Style state transitions between server and client', 'Real-time communication between peers', 'File transfer protocol replacement', 'Database management interface'], answer: 0, topic: 'API Design' },
    { id: 'pv_3', question: 'Which principle ensures a class has only one reason to change?', options: ['Open/Closed Principle', 'Single Responsibility Principle', 'Liskov Substitution Principle', 'Interface Segregation Principle'], answer: 1, topic: 'SOLID' },
    { id: 'pv_4', question: 'What does ACID stand for in databases?', options: ['Atomicity, Consistency, Isolation, Durability', 'Automated, Consistent, Isolated, Durable', 'Atomic, Concurrent, Isolated, Durable', 'Asynchronous, Consistent, Integrated, Durable'], answer: 0, topic: 'Databases' },
    { id: 'pv_5', question: 'What is the main advantage of using version control?', options: ['Track changes and collaborate with others', 'Automatically deploy code', 'Compile code faster', 'Optimize database queries'], answer: 0, topic: 'DevOps' },
    { id: 'pv_6', question: 'Which HTTP method is used to update a resource?', options: ['GET', 'POST', 'PUT', 'DELETE'], answer: 2, topic: 'API Design' },
    { id: 'pv_7', question: 'What does CI/CD stand for?', options: ['Continuous Integration / Continuous Deployment', 'Code Integration / Code Deployment', 'Continuous Improvement / Continuous Delivery', 'Code Inspection / Code Debugging'], answer: 0, topic: 'DevOps' },
    { id: 'pv_8', question: 'What is the purpose of a package manager?', options: ['Manage project dependencies and versions', 'Compile source code to binary', 'Run unit tests', 'Deploy applications to production'], answer: 0, topic: 'Tooling' },
    { id: 'pv_9', question: 'Which data structure uses LIFO principle?', options: ['Queue', 'Stack', 'Tree', 'Graph'], answer: 1, topic: 'Data Structures' },
    { id: 'pv_10', question: 'What is the time complexity of binary search?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'], answer: 1, topic: 'Algorithms' },
    { id: 'pv_11', question: 'What does SQL injection attack exploit?', options: ['Unsanitized user input in queries', 'Weak password hashing', 'Unencrypted network traffic', 'Buffer overflow vulnerabilities'], answer: 0, topic: 'Security' },
    { id: 'pv_12', question: 'Which testing level tests individual units of code?', options: ['Integration testing', 'Unit testing', 'System testing', 'Acceptance testing'], answer: 1, topic: 'Testing' },
    { id: 'pv_13', question: 'What is the purpose of an API gateway?', options: ['Route requests to appropriate microservices', 'Store API documentation', 'Generate API keys', 'Monitor database performance'], answer: 0, topic: 'Architecture' },
    { id: 'pv_14', question: 'What does NoSQL stand for?', options: ['Not Only SQL', 'No Structured Query Language', 'Non-relational Object Storage', 'New Object Storage Language'], answer: 0, topic: 'Databases' },
    { id: 'pv_15', question: 'What is the main benefit of using TypeScript over JavaScript?', options: ['Static type checking at compile time', 'Faster runtime performance', 'Smaller bundle size', 'Built-in database connectivity'], answer: 0, topic: 'Languages' },
    { id: 'pv_16', question: 'What is the purpose of a unit test mock?', options: ['Simulate dependencies for isolated testing', 'Speed up test execution', 'Generate test data', 'Document test cases'], answer: 0, topic: 'Testing' },
    { id: 'pv_17', question: 'What does the "O" in SOLID stand for?', options: ['Open for extension, closed for modification', 'Object-oriented programming', 'Optimized code structure', 'Ordered execution'], answer: 0, topic: 'SOLID' },
    { id: 'pv_18', question: 'What is a microservice architecture?', options: ['Small, independent services that communicate via APIs', 'A single large application with all features', 'A database management system', 'A frontend framework for web apps'], answer: 0, topic: 'Architecture' },
    { id: 'pv_19', question: 'What is the purpose of a load balancer?', options: ['Distribute traffic across multiple servers', 'Increase database storage', 'Compress image files', 'Encrypt network traffic'], answer: 0, topic: 'DevOps' },
    { id: 'pv_20', question: 'What is an ORM?', options: ['Object-Relational Mapping for database interaction', 'Online Resource Management', 'Object Request Model', 'Open Runtime Module'], answer: 0, topic: 'Databases' },
    { id: 'pv_21', question: 'Which design pattern ensures a class has only one instance?', options: ['Factory Pattern', 'Singleton Pattern', 'Observer Pattern', 'Strategy Pattern'], answer: 1, topic: 'Design Patterns' },
    { id: 'pv_22', question: 'What is the purpose of a CDN?', options: ['Deliver content from geographically distributed servers', 'Compile and deploy code', 'Centralize database storage', 'Create development environments'], answer: 0, topic: 'DevOps' },
    { id: 'pv_23', question: 'What is the difference between authentication and authorization?', options: ['AuthN = who you are, AuthZ = what you can do', 'AuthN = what you can do, AuthZ = who you are', 'They are the same thing', 'AuthN is for APIs, AuthZ is for web apps'], answer: 0, topic: 'Security' },
    { id: 'pv_24', question: 'What is caching used for?', options: ['Store frequently accessed data for faster retrieval', 'Encrypt sensitive information', 'Backup database content', 'Compress application files'], answer: 0, topic: 'Performance' },
    { id: 'pv_25', question: 'What is a webhook?', options: ['HTTP callback triggered by an event', 'A debugging tool for web applications', 'A type of database connection', 'A frontend component library'], answer: 0, topic: 'API Design' },
    { id: 'pv_26', question: 'What does async/await help with?', options: ['Write asynchronous code in a synchronous style', 'Speed up CPU-bound operations', 'Handle database migrations', 'Optimize CSS rendering'], answer: 0, topic: 'Languages' },
    { id: 'pv_27', question: 'What is the purpose of a polyfill?', options: ['Provide modern functionality in older browsers', 'Fill polygon shapes in SVG', 'Optimize image loading', 'Encrypt JavaScript code'], answer: 0, topic: 'Frontend' },
    { id: 'pv_28', question: 'What is a race condition?', options: ['Two operations compete to modify shared data', 'A type of sorting algorithm', 'A database indexing strategy', 'A network protocol'], answer: 0, topic: 'Concurrency' },
    { id: 'pv_29', question: 'What does JWT stand for?', options: ['JSON Web Token', 'Java Web Tool', 'JavaScript Widget Toolkit', 'JSON Wire Transfer'], answer: 0, topic: 'Security' },
    { id: 'pv_30', question: 'What is the purpose of a database index?', options: ['Speed up query performance', 'Store backup data', 'Encrypt table contents', 'Manage user permissions'], answer: 0, topic: 'Databases' },
    { id: 'pv_31', question: 'What does TDD stand for?', options: ['Test-Driven Development', 'Task-Driven Design', 'Type-Driven Development', 'Time-Driven Deployment'], answer: 0, topic: 'Testing' },
    { id: 'pv_32', question: 'What is a container in Docker?', options: ['Lightweight, standalone executable package', 'A virtual machine with full OS', 'A database management system', 'A text editor plugin'], answer: 0, topic: 'DevOps' },
    { id: 'pv_33', question: 'What is the purpose of an SSL certificate?', options: ['Encrypt communication between client and server', 'Speed up website loading', 'Validate user login', 'Manage database connections'], answer: 0, topic: 'Security' },
    { id: 'pv_34', question: 'What is the difference between PUT and PATCH?', options: ['PUT replaces the entire resource, PATCH partially updates', 'PATCH replaces the entire resource, PUT partially updates', 'PUT is for creating, PATCH is for deleting', 'There is no difference'], answer: 0, topic: 'API Design' },
    { id: 'pv_35', question: 'What is a virtual DOM?', options: ['Lightweight representation of the real DOM in memory', 'A virtual machine for running JavaScript', 'A database management tool', 'A CSS preprocessor'], answer: 0, topic: 'Frontend' },
    { id: 'pv_36', question: 'What is the purpose of Webpack?', options: ['Bundle JavaScript modules and assets', 'Manage database connections', 'Run unit tests', 'Deploy applications'], answer: 0, topic: 'Tooling' },
    { id: 'pv_37', question: 'What does XSS stand for?', options: ['Cross-Site Scripting', 'XML Style Sheets', 'Extended Server Security', 'Cross-Source Syntax'], answer: 0, topic: 'Security' },
    { id: 'pv_38', question: 'What is the purpose of a firewall?', options: ['Monitor and control network traffic', 'Compile application code', 'Manage user authentication', 'Optimize database queries'], answer: 0, topic: 'Security' },
    { id: 'pv_39', question: 'What is a design pattern?', options: ['Reusable solution to common software problems', 'A CSS styling technique', 'A database schema design', 'A user interface layout'], answer: 0, topic: 'Design Patterns' },
    { id: 'pv_40', question: 'What does the "D" in SOLID stand for?', options: ['Dependency Inversion Principle', 'Data-Driven Design', 'Dynamic Programming', 'Distributed Systems'], answer: 0, topic: 'SOLID' },
    { id: 'pv_41', question: 'What is the purpose of a linter?', options: ['Analyze code for potential errors and style issues', 'Compile and bundle code', 'Deploy applications to servers', 'Manage database migrations'], answer: 0, topic: 'Tooling' },
    { id: 'pv_42', question: 'What is a CD (Continuous Delivery) pipeline?', options: ['Automated process to deploy code to production', 'A database backup system', 'A user authentication flow', 'A frontend build tool'], answer: 0, topic: 'DevOps' },
    { id: 'pv_43', question: 'What is the purpose of a message queue?', options: ['Enable asynchronous communication between services', 'Store database records temporarily', 'Cache web pages for faster loading', 'Manage user sessions'], answer: 0, topic: 'Architecture' },
    { id: 'pv_44', question: 'What does CRUD stand for?', options: ['Create, Read, Update, Delete', 'Compile, Run, Update, Deploy', 'Cache, Retrieve, Upload, Distribute', 'Connect, Request, Update, Disconnect'], answer: 0, topic: 'API Design' },
    { id: 'pv_45', question: 'What is the purpose of environment variables?', options: ['Configure application behavior without code changes', 'Declare JavaScript variables', 'Set CSS custom properties', 'Define HTML metadata'], answer: 0, topic: 'DevOps' },
    { id: 'pv_46', question: 'What is a data structure?', options: ['A way to organize and store data efficiently', 'A type of database', 'A programming language feature', 'A file format for data exchange'], answer: 0, topic: 'Data Structures' },
    { id: 'pv_47', question: 'What is the purpose of a Dockerfile?', options: ['Define how to build a Docker image', 'Configure Docker networking', 'Manage Docker volumes', 'Store Docker credentials'], answer: 0, topic: 'DevOps' },
    { id: 'pv_48', question: 'What is the Open/Closed Principle?', options: ['Open for extension, closed for modification', 'Open for modification, closed for extension', 'Open for inheritance, closed for implementation', 'Open for testing, closed for deployment'], answer: 0, topic: 'SOLID' },
    { id: 'pv_49', question: 'What is the purpose of error handling in code?', options: ['Gracefully manage unexpected situations', 'Speed up code execution', 'Reduce memory usage', 'Minimize code size'], answer: 0, topic: 'Best Practices' }
  ],

  getQuestions(count) {
    count = count || 10;
    var shuffled = this.QUESTIONS.slice().sort(function() { return Math.random() - 0.5; });
    return shuffled.slice(0, Math.min(count, this.QUESTIONS.length));
  },

  getByTopic(topic) {
    return this.QUESTIONS.filter(function(q) { return q.topic === topic; });
  },

  getTopics() {
    var topics = {};
    this.QUESTIONS.forEach(function(q) { topics[q.topic] = (topics[q.topic] || 0) + 1; });
    return Object.keys(topics).map(function(k) { return { name: k, count: topics[k] }; });
  },

  validateSubmission(submissionData) {
    var score = 0;
    var total = submissionData.answers ? submissionData.answers.length : 0;
    var details = [];
    if (submissionData.answers) {
      submissionData.answers.forEach(function(answer, i) {
        var q = QuizSystem.QUESTION_BANKS[submissionData.courseId]?.questions?.find(function(x) { return x.id === answer.questionId; });
        if (!q) q = this.QUESTIONS.find(function(x) { return x.id === answer.questionId; });
        if (q) {
          var correct = answer.selected === q.answer;
          if (correct) score++;
          details.push({ questionId: answer.questionId, correct: correct, selected: answer.selected, expected: q.answer });
        }
      }.bind(this));
    }
    var pct = total > 0 ? Math.round((score / total) * 100) : 0;
    var passed = pct >= 70;
    var result = { score: score, total: total, percentage: pct, passed: passed, details: details, date: new Date().toISOString() };

    if (passed && typeof LearningTracker !== 'undefined') {
      LearningTracker._awardAP('project_validation', 50);
      if (typeof AchievementSystem !== 'undefined') AchievementSystem.checkAndAward(submissionData.courseId);
    }
    var validations = Utils.getStorage('project_validations', []);
    validations.push(result);
    Utils.setStorage('project_validations', validations);
    return result;
  },

  generateChallenge(courseId) {
    var qs = this.getQuestions(5);
    var courseQs = [];
    if (courseId) {
      var bank = typeof QuizSystem !== 'undefined' ? QuizSystem.QUESTION_BANKS[courseId] : null;
      if (bank && bank.questions) {
        courseQs = bank.questions.sort(function() { return Math.random() - 0.5; }).slice(0, 5).map(function(q) {
          return { id: q.id, question: q.question, options: q.options, answer: q.answer, difficulty: q.difficulty };
        });
      }
    }
    return { questions: qs.concat(courseQs), generatedAt: new Date().toISOString() };
  }
};
