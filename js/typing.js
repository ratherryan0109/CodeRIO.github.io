const typingQuotes = [
  "Programming is not only about writing code but also about learning how to think logically, solve real-world problems efficiently, and continuously improve through practice, experimentation, debugging, and consistency every single day.",
  "The best developers in the world are not those who know the most programming languages but those who deeply understand problem solving, algorithms, systems, scalability, architecture, and how technology impacts users globally.",
  "Typing speed is an essential skill for programmers because faster typing combined with accuracy allows developers to write code efficiently, think continuously, and maintain focus during complex software development tasks.",
  "Every great software engineer starts as a beginner who spends countless hours learning fundamentals, building projects, failing repeatedly, fixing bugs, and improving their logical thinking through persistence and discipline.",
  "Building projects consistently is one of the fastest ways to improve programming because practical implementation teaches concepts more effectively than passively watching tutorials or reading documentation endlessly.",
  "Modern web development combines creativity and engineering through responsive design, accessibility, animations, APIs, databases, performance optimization, and scalable architectures for real-world applications.",
  "Artificial intelligence is rapidly transforming software engineering by automating repetitive tasks, enhancing productivity, improving data analysis, and helping developers create smarter applications for global users.",
  "The internet has created unlimited opportunities for developers to learn skills, contribute to open-source projects, build startups, freelance globally, and create innovative products from anywhere in the world.",
  "Consistency beats motivation because developers who practice coding regularly, even for short periods daily, improve much faster than those who rely only on occasional bursts of inspiration or temporary excitement.",
  "Debugging is one of the most important programming skills because understanding why software breaks and how to systematically fix issues teaches deeper concepts than simply writing working code initially.",
  "Learning data structures and algorithms strengthens logical thinking, improves coding interview performance, and helps developers create software solutions that are efficient, scalable, and optimized for performance.",
  "Technology evolves rapidly, which means successful programmers continuously learn new frameworks, languages, tools, and concepts while still maintaining a strong understanding of computer science fundamentals.",
  "The future belongs to developers who can combine technical knowledge with creativity, communication, adaptability, teamwork, and the ability to solve meaningful real-world problems efficiently.",
  "Cloud computing has revolutionized software development by allowing developers to build scalable applications, deploy globally within minutes, and manage infrastructure efficiently through distributed systems.",
  "Cybersecurity is becoming increasingly important because modern applications handle sensitive user data, financial transactions, and critical systems that require secure architecture and continuous vulnerability monitoring.",
  "Full stack developers understand both frontend and backend technologies, allowing them to create complete applications while effectively communicating across design, development, databases, and deployment workflows.",
  "Competitive programming improves speed, logical reasoning, optimization skills, and the ability to solve complex algorithmic problems under pressure, making it valuable for technical interviews and engineering growth.",
  "Developers who focus on building real-world projects gain practical experience with APIs, authentication, databases, deployment, optimization, debugging, scalability, and user experience design simultaneously.",
  "Software engineering is not just about code but about collaboration, planning, architecture, testing, documentation, version control, deployment, and maintaining systems reliably over long periods of time.",
  "The most successful programmers are lifelong learners who remain curious, adaptable, disciplined, and committed to improving both their technical expertise and their understanding of how technology serves people."
];

const typingAnimals = [
  { name: "Turtle", emoji: "🐢", min: 0, max: 20, image: "https://cdn-icons-png.flaticon.com/512/3069/3069172.png", message: "Steady and careful typing pace with strong focus on accuracy." },
  { name: "Panda", emoji: "🐼", min: 21, max: 40, image: "https://cdn-icons-png.flaticon.com/512/1998/1998610.png", message: "Balanced typing speed with smooth consistency and rhythm." },
  { name: "Horse", emoji: "🐎", min: 41, max: 60, image: "https://cdn-icons-png.flaticon.com/512/1998/1998610.png", message: "Fast and powerful typing performance with strong momentum." },
  { name: "Cheetah", emoji: "🐆", min: 61, max: 90, image: "https://cdn-icons-png.flaticon.com/512/3069/3069127.png", message: "Extremely fast typing speed with impressive control." },
  { name: "Falcon", emoji: "🦅", min: 91, max: 200, image: "https://cdn-icons-png.flaticon.com/512/1864/1864514.png", message: "Elite lightning-fast typing skills built for competitive speed." }
];

const typingRanks = [
  { title: "Beginner Typist", min: 0, max: 20 },
  { title: "Developing Typist", min: 21, max: 40 },
  { title: "Efficient Typist", min: 41, max: 60 },
  { title: "Advanced Typist", min: 61, max: 80 },
  { title: "Professional Typist", min: 81, max: 100 },
  { title: "Elite Typist", min: 101, max: 120 },
  { title: "Master Typist", min: 121, max: 200 }
];

function initTypingTest() {
  const quoteEl = document.getElementById('quote');
  const hiddenInput = document.getElementById('hidden-input');
  const timerEl = document.getElementById('timer');
  const wpmEl = document.getElementById('wpm');
  const cpmEl = document.getElementById('cpm');
  const accuracyEl = document.getElementById('accuracy');
  const mistakesEl = document.getElementById('mistakes');
  const typingBox = document.getElementById('typingBox');
  const startIndicator = document.getElementById('startIndicator');
  const resultModal = document.getElementById('resultModal');
  const retryBtn = document.getElementById('retryBtn');
  const progressFill = document.getElementById('progressFill');

  if (!quoteEl) return;

  let quote = '';
  let timer = 60;
  let interval = null;
  let currentIndex = 0;
  let mistakes = 0;
  let started = false;
  let testActive = false;
  let totalKeystrokes = 0;

  function loadQuote() {
    quote = typingQuotes[Math.floor(Math.random() * typingQuotes.length)];
    quoteEl.innerHTML = '';
    quote.split('').forEach(char => {
      const span = document.createElement('span');
      span.textContent = char;
      quoteEl.appendChild(span);
    });
    if (quoteEl.children[0]) quoteEl.children[0].classList.add('active');
  }

  loadQuote();

  typingBox.addEventListener('click', () => {
    if (timer > 0) {
      testActive = true;
      hiddenInput.focus();
    }
  });

  function startTimer() {
    interval = setInterval(() => {
      timer--;
      timerEl.textContent = timer;
      if (timer <= 0) finishTest();
    }, 1000);
  }

  function finishTest() {
    clearInterval(interval);
    testActive = false;
    hiddenInput.blur();
    showResult();

    const speed = parseInt(wpmEl.textContent);
    const accuracy = parseInt(accuracyEl.textContent);
    const history = Utils.getStorage('typing_history', []);
    history.push({ wpm: speed, accuracy: accuracy, cpm: parseInt(cpmEl.textContent), mistakes: mistakes, date: new Date().toISOString() });
    Utils.setStorage('typing_history', history);

    const activity = Utils.getStorage('coderio_activity', []);
    activity.unshift({ text: 'Typing test: ' + speed + ' WPM (' + accuracy + '% acc)', time: new Date().toISOString(), type: 'orange' });
    Utils.setStorage('coderio_activity', activity.slice(0, 50));

    if (typeof AchievementSystem !== 'undefined') {
      AchievementSystem.checkAndAward();
    }
    if (typeof DailyGoals !== 'undefined') {
      DailyGoals.recordProgress('typingTests', 1);
    }
  }

  function updateStats() {
    const words = currentIndex / 5;
    const wpm = Math.round(words);
    const cpm = currentIndex;
    const accuracy = currentIndex > 0 ? Math.round(((currentIndex - mistakes) / currentIndex) * 100) : 100;
    const consistency = currentIndex > 0 ? Math.round((1 - mistakes / totalKeystrokes) * 100) : 100;

    wpmEl.textContent = wpm;
    cpmEl.textContent = cpm;
    accuracyEl.textContent = accuracy;
    if (mistakesEl) mistakesEl.textContent = mistakes;

    if (progressFill) {
      const progress = (currentIndex / quote.length) * 100;
      progressFill.style.width = Math.min(progress, 100) + '%';
    }
  }

  function showResult() {
    const speed = parseInt(wpmEl.textContent);
    const accuracy = parseInt(accuracyEl.textContent);

    const animal = typingAnimals.find(a => speed >= a.min && speed <= a.max) || typingAnimals[0];
    const rank = typingRanks.find(r => speed >= r.min && speed <= r.max) || typingRanks[0];

    document.getElementById('animal-image').src = animal.image;
    document.getElementById('animal-name').textContent = `${animal.emoji} ${animal.name}`;
    document.getElementById('animal-rank').textContent = rank.title;
    document.getElementById('animal-message').textContent = animal.message;
    document.getElementById('finalWpm').textContent = speed;
    document.getElementById('finalAccuracy').textContent = accuracy + '%';
    document.getElementById('finalCpm').textContent = cpmEl.textContent;
    document.getElementById('finalMistakes').textContent = mistakes;
    document.getElementById('finalConsistency').textContent = (currentIndex > 0 ? Math.round((1 - mistakes / totalKeystrokes) * 100) : 100) + '%';

    resultModal.classList.add('show');
  }

  retryBtn.addEventListener('click', () => {
    location.reload();
  });

  hiddenInput.addEventListener('focus', () => {
    if (startIndicator) startIndicator.classList.add('hidden');
  });

  document.addEventListener('keydown', e => {
    if (!testActive || timer <= 0) return;

    if (e.key === 'Backspace') {
      e.preventDefault();
      return;
    }

    const chars = quoteEl.querySelectorAll('span');
    const currentChar = chars[currentIndex];
    if (!currentChar) return;

    if (!started) {
      if (e.key === chars[0].textContent) {
        started = true;
        startTimer();
      } else {
        return;
      }
    }

    if (e.key.length > 1 && e.key !== ' ') return;

    currentChar.classList.remove('active');
    totalKeystrokes++;

    if (e.key === currentChar.textContent) {
      currentChar.classList.add('correct');
    } else {
      currentChar.classList.add('incorrect');
      mistakes++;
    }

    currentIndex++;

    if (chars[currentIndex]) {
      chars[currentIndex].classList.add('active');
    } else {
      finishTest();
      return;
    }

    updateStats();
  });
}
