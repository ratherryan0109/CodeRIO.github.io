var fs = require('fs');
var src = fs.readFileSync(__dirname + '/interview-data.js', 'utf8');

function esc(s) { s = String(s); return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n'); }

function makeConcept(term, difficulty, definition, extra) {
  var ex = extra || {};
  var parts = ["        { term: '" + esc(term) + "', difficulty: '" + difficulty + "',"];
  parts.push("            definition: '" + esc(definition) + "',");
  if (ex.codeExample) parts.push("            codeExample: '" + esc(ex.codeExample) + "',");
  if (ex.compareWith) parts.push("            compareWith: '" + esc(ex.compareWith) + "',");
  if (ex.keyPoints) parts.push("            keyPoints: " + JSON.stringify(ex.keyPoints) + (ex.commonMistakes||ex.followUps ? ',' : ''));
  if (ex.commonMistakes) parts.push("            commonMistakes: " + JSON.stringify(ex.commonMistakes) + (ex.followUps ? ',' : ''));
  if (ex.followUps) parts.push("            followUps: " + JSON.stringify(ex.followUps));
  parts.push("        }");
  return parts.join('\n');
}

// All extra topics by courseId
var extras = {
  'python': {
    topic: 'Advanced Python',
    concepts: [
      ['Context Managers', 'Intermediate', 'Managing resources with the with statement using __enter__/__exit__', {codeExample: 'class ManagedFile:\n    def __init__(self, name):\n        self.name = name\n    def __enter__(self):\n        self.f = open(self.name, \'w\')\n        return self.f\n    def __exit__(self, *args):\n        self.f.close()', keyPoints: ['__enter__ returns resource', '__exit__ handles cleanup', 'contextlib.contextmanager decorator', 'Exception handling in __exit__']}],
      ['GIL (Global Interpreter Lock)', 'Advanced', 'Mutex preventing multiple threads from executing bytecode simultaneously', {keyPoints: ['Only one thread runs at a time', 'I/O-bound: threading useful', 'CPU-bound: use multiprocessing', 'Can release GIL in C extensions'], commonMistakes: ['Assuming threading gives CPU parallelism']}],
      ['Type Hints', 'Intermediate', 'Optional static type annotations via PEP 484', {codeExample: 'from typing import List, Optional\ndef process(items: List[int]) -> Optional[str]:\n    if not items: return None\n    return str(sum(items))', keyPoints: ['PEP 484 type hints', 'mypy for static checking', 'No runtime enforcement', 'Improves IDE autocomplete']}],
      ['Metaclasses', 'Advanced', 'Classes creating classes, customizing class creation', {codeExample: 'class Meta(type):\n    def __new__(mcs, name, bases, dct):\n        dct[\'created\'] = True\n        return super().__new__(mcs, name, bases, dct)\nclass A(metaclass=Meta): pass\nprint(A.created)', keyPoints: ['type is the default metaclass', 'Customize class creation', 'ORMs and frameworks use them', 'Rarely needed in application code']}],
      ['Coroutines & Async/Await', 'Intermediate', 'Asynchronous programming with async/await syntax', {codeExample: 'import asyncio\nasync def fetch(url):\n    async with aiohttp.ClientSession() as session:\n        async with session.get(url) as resp:\n            return await resp.text()\nasync def main():\n    r = await asyncio.gather(fetch(\'url1\'), fetch(\'url2\'))', keyPoints: ['async def for coroutines', 'await suspends to event loop', 'asyncio.run() entry point', 'Best for I/O-bound tasks']}],
      ['Pickle & Serialization', 'Intermediate', 'Serializing Python objects to bytes with pickle', {codeExample: 'import pickle\ndata = {\'nums\': [1,2,3], \'name\': \'test\'}\nblob = pickle.dumps(data)\nrestored = pickle.loads(blob)', keyPoints: ['pickle: Python-only, supports all types', 'json: interoperable but limited', 'Never unpickle untrusted data']}],
      ['Virtual Environments', 'Beginner', 'Isolated Python environments for dependency management', {codeExample: 'python -m venv myenv\nmyenv\\Scripts\\activate\npip install requests\npip freeze > requirements.txt', keyPoints: ['venv built-in since Python 3.3', 'Isolates project dependencies', 'pip for package management', 'poetry/pipenv as alternatives']}],
    ]
  },
  'javascript': {
    topic: 'JavaScript Advanced',
    concepts: [
      ['Web Workers', 'Advanced', 'Running scripts in background threads', {codeExample: '// main.js\nconst w = new Worker(\'worker.js\');\nw.postMessage({cmd:\'compute\', data:1e6});\nw.onmessage = (e) => console.log(e.data);\n// worker.js\nself.onmessage = (e) => { self.postMessage(heavyWork(e.data.data)); };', keyPoints: ['No DOM access in workers', 'Message-based communication', 'Transferable objects for perf', 'SharedWorker for multiple tabs']}],
      ['Symbol Type', 'Intermediate', 'Unique and immutable primitive property keys', {codeExample: 'const sym = Symbol(\'desc\');\nconst obj = { [sym]: \'secret\' };\nobj[sym];\nObject.keys(obj); // []\nSymbol.iterator, Symbol.toStringTag', keyPoints: ['Always unique', 'Private-like property keys', 'Symbol.for() global registry', 'Well-known symbols customize behavior']}],
      ['Event Delegation', 'Intermediate', 'Single listener on parent for multiple children', {codeExample: 'document.querySelector(\'ul\').addEventListener(\'click\', (e) => {\n    const li = e.target.closest(\'li\');\n    if (li) console.log(li.textContent);\n});', keyPoints: ['Event bubbles up', 'e.target identifies source', 'e.closest() for delegation', 'More efficient than many listeners']}],
      ['CORS', 'Intermediate', 'Cross-Origin Resource Sharing security mechanism', {codeExample: 'Access-Control-Allow-Origin: https://example.com\nAccess-Control-Allow-Methods: GET, POST\nAccess-Control-Allow-Headers: Content-Type\nAccess-Control-Allow-Credentials: true', keyPoints: ['Browser same-origin policy', 'Server must include CORS headers', 'Preflight for non-simple requests', 'Credentials require specific header']}],
      ['JWT', 'Intermediate', 'JSON Web Tokens for stateless authentication', {codeExample: 'const jwt = require(\'jsonwebtoken\');\nconst token = jwt.sign({userId:123}, SECRET, {expiresIn:\'1h\'});\nconst decoded = jwt.verify(token, SECRET);', keyPoints: ['Header.Payload.Signature format', 'Stateless: no server-side session', 'Payload is base64 not encrypted', 'Short expiry + refresh tokens']}],
    ]
  },
  'java': {
    topic: 'Java Advanced',
    concepts: [
      ['JPMS (Modules)', 'Advanced', 'Java Platform Module System for strong encapsulation', {codeExample: 'module com.example.app {\n    requires java.sql;\n    requires transitive com.example.common;\n    exports com.example.app.api;\n    opens com.example.app.internal;\n}', keyPoints: ['module-info.java defines module', 'exports makes packages accessible', 'requires transitive propagates deps', 'opens for reflection access']}],
      ['NIO.2 (Files & Paths)', 'Intermediate', 'Modern file I/O API from Java 7', {codeExample: 'Path p = Paths.get("/home/file.txt");\nList<String> lines = Files.readAllLines(p);\nFiles.write(p, "content".getBytes());\nFiles.walk(Paths.get("/home")).filter(Files::isRegularFile).forEach(System.out::println);', keyPoints: ['Files and Paths utility methods', 'Walking and searching file trees', 'Watching directories for changes', 'Memory-mapped files']}],
      ['JDBC & Connection Pooling', 'Intermediate', 'Database connectivity with JDBC and connection pooling', {codeExample: 'HikariConfig config = new HikariConfig();\nconfig.setJdbcUrl("jdbc:postgresql://localhost/db");\nHikariDataSource ds = new HikariDataSource(config);\ntry (Connection c = ds.getConnection(); PreparedStatement s = c.prepareStatement("SELECT * FROM users WHERE id=?")) {\n    s.setInt(1, 42); ResultSet rs = s.executeQuery();\n}', keyPoints: ['PreparedStatement prevents SQL injection', 'Connection pooling reuses connections', 'HikariCP is fastest pool', 'DataSource over DriverManager']}],
      ['Serialization', 'Intermediate', 'Converting objects to byte streams', {codeExample: 'class User implements Serializable {\n    private static final long serialVersionUID = 1L;\n    private transient String password;\n}\nObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("user.ser"));\noos.writeObject(user);', keyPoints: ['serialVersionUID for versioning', 'transient excludes fields', 'Externalizable for custom logic', 'JSON/XML preferred for interoperability']}],
      ['Testing (JUnit 5 + Mockito)', 'Intermediate', 'Unit testing with JUnit 5 and mocking', {codeExample: '@Test\nvoid testAdd() {\n    assertEquals(5, add(2, 3));\n}\n@Test\nvoid testMock() {\n    PaymentService mock = mock(PaymentService.class);\n    when(mock.process(any())).thenReturn(true);\n    OrderProcessor p = new OrderProcessor(mock);\n    assertTrue(p.checkout(order));\n    verify(mock).process(order);\n}', keyPoints: ['JUnit 5: @Test, assertions', 'Mockito: mock(), when(), verify()', 'TDD: Red-Green-Refactor', 'JaCoCo for code coverage']}],
    ]
  },
  'react': {
    topic: 'React Advanced Patterns',
    concepts: [
      ['Error Boundaries', 'Intermediate', 'Components catching errors in child component tree', {codeExample: 'class ErrorBoundary extends React.Component {\n    state = { hasError: false };\n    static getDerivedStateFromError() { return {hasError: true}; }\n    componentDidCatch(error, info) { logError(error, info); }\n    render() { return this.state.hasError ? <h1>Error</h1> : this.props.children; }\n}', keyPoints: ['Catches render/lifecycle errors', 'Does not catch async or event errors', 'Use getDerivedStateFromError', 'Wrap at routing boundaries']}],
      ['Compound Components', 'Advanced', 'Components working together via implicit shared state', {codeExample: 'function Tabs({children}) {\n    const [a, setA] = useState(0);\n    return <Context.Provider value={{a, setA}}>{children}</Context.Provider>;\n}\nTabs.Tab = function({idx, children}) {\n    const {a, setA} = useContext(Context);\n    return <button onClick={()=>setA(idx)} className={a===idx?"active":""}>{children}</button>;\n}', keyPoints: ['Shared state via context', 'Flexible composition', 'Used in UI libraries like Reach UI']}],
      ['React.lazy & Suspense', 'Intermediate', 'Code-splitting components loading on demand', {codeExample: 'const Heavy = React.lazy(() => import(\'./Heavy\'));\nfunction App() {\n    return <Suspense fallback={<Spinner/>}><Heavy/></Suspense>;\n}', keyPoints: ['Dynamic import() for code splitting', 'Suspense provides loading fallback', 'Works with React Router', 'Reduces initial bundle size']}],
      ['Portals', 'Intermediate', 'Rendering children into a DOM node outside parent', {codeExample: 'function Modal({children}) {\n    return ReactDOM.createPortal(<div className="modal">{children}</div>, document.getElementById(\'modal-root\'));\n}', keyPoints: ['Breaks parent DOM hierarchy', 'Events bubble in React tree', 'Useful for modals, tooltips', 'z-index issues avoided']}],
    ]
  },
  'sql': {
    topic: 'Advanced SQL',
    concepts: [
      ['Window Functions', 'Advanced', 'Calculations across rows related to current row', {codeExample: 'SELECT department, name, salary,\n    RANK() OVER (PARTITION BY department ORDER BY salary DESC) as rank,\n    SUM(salary) OVER (PARTITION BY department) as dept_total\nFROM employees;', keyPoints: ['ROW_NUMBER(), RANK(), DENSE_RANK()', 'SUM/AVG with OVER()', 'LAG/LEAD for row comparison', 'PARTITION BY for groups']}],
      ['CTE & Recursive Queries', 'Intermediate', 'Common Table Expressions for temporary result sets', {codeExample: 'WITH RECURSIVE org AS (\n    SELECT id, name, manager_id, 1 as lvl FROM employees WHERE manager_id IS NULL\n    UNION ALL\n    SELECT e.id, e.name, e.manager_id, o.lvl+1 FROM employees e JOIN org o ON e.manager_id = o.id\n) SELECT * FROM org;', keyPoints: ['WITH clause for temp result', 'RECURSIVE for hierarchies', 'Base + recursive step pattern']}],
      ['Isolation Levels', 'Intermediate', 'Transaction isolation and concurrency control', {codeExample: 'SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;\nBEGIN;\nUPDATE accounts SET balance = balance - 100 WHERE id = 1;\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;\nCOMMIT;', keyPoints: ['Read Uncommitted to Serializable', 'Dirty/non-repeatable/phantom reads', 'Higher isolation = lower concurrency']}],
      ['EXPLAIN & Query Tuning', 'Intermediate', 'Analyzing and optimizing query execution plans', {codeExample: 'EXPLAIN ANALYZE\nSELECT u.name, COUNT(o.id)\nFROM users u LEFT JOIN orders o ON u.id = o.user_id\nWHERE u.created_at > \'2024-01-01\'\nGROUP BY u.id ORDER BY 2 DESC LIMIT 10;', keyPoints: ['EXPLAIN shows execution plan', 'Seq Scan vs Index Scan', 'Look for sequential scans on large tables']}],
    ]
  },
  'html': {
    topic: 'HTML Modern APIs',
    concepts: [
      ['Web Components', 'Advanced', 'Reusable custom elements with native browser APIs', {codeExample: 'class MyBtn extends HTMLElement {\n    constructor() { super(); this.attachShadow({mode:\'open\'}); this.shadowRoot.innerHTML = `<button>Click</button>`; }\n}\ncustomElements.define(\'my-btn\', MyBtn);', keyPoints: ['Custom Elements API', 'Shadow DOM for encapsulation', 'HTML Templates (<template>)', 'Framework-independent']}],
      ['Canvas API', 'Intermediate', 'Drawing 2D graphics with JavaScript', {codeExample: '<canvas id="c" width="400" height="200"></canvas>\nconst ctx = c.getContext(\'2d\');\nctx.fillStyle = \'blue\'; ctx.fillRect(10,10,100,50);', keyPoints: ['Pixel-based drawing API', 'Context: 2d or webgl', 'Animation via requestAnimationFrame']}],
      ['PWA (Progressive Web Apps)', 'Intermediate', 'Offline-capable web applications', {codeExample: 'self.addEventListener(\'install\', e => {\n    e.waitUntil(caches.open(\'v1\').then(c => c.addAll([\'/\', \'/index.html\'])));\n});\nself.addEventListener(\'fetch\', e => {\n    e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));\n});', keyPoints: ['Service worker for offline caching', 'Web manifest for installable', 'HTTPS required', 'Cache-first strategy']}],
    ]
  },
  'css': {
    topic: 'Modern CSS',
    concepts: [
      ['CSS Grid', 'Intermediate', 'Two-dimensional layout system', {codeExample: '.grid {\n    display: grid;\n    grid-template-columns: repeat(3, 1fr);\n    grid-template-areas: "h h h" "s m m" "f f f";\n    gap: 16px;\n}', keyPoints: ['Two-dimensional layout', 'grid-template-areas for regions', 'fr unit for fractional space', 'auto-fit/minmax for responsive']}],
      ['Custom Properties', 'Beginner', 'CSS variables with -- prefix and var()', {codeExample: ':root { --primary: #007bff; --spacing: 16px; }\n.btn { background: var(--primary); padding: var(--spacing); }', keyPoints: ['Defined with --name', 'Accessed with var(--name)', 'Cascade overrides contextually', 'Change with media queries or JS']}],
      ['Transitions & Animations', 'Intermediate', 'Smooth property changes', {codeExample: '.box { transition: transform 0.3s ease; }\n.box:hover { transform: scale(1.1); }\n@keyframes slide {\n    from { transform: translateX(-100%); }\n    to { transform: translateX(0); }\n}', keyPoints: ['transition for state changes', '@keyframes for complex sequences', 'GPU: transform and opacity']}],
      ['Responsive Design', 'Beginner', 'Adapting layouts to screen sizes', {codeExample: '@media (min-width: 768px) {\n    .container { grid-template-columns: repeat(2, 1fr); }\n}\n@media (prefers-color-scheme: dark) { body { background: #333; color: #fff; } }', keyPoints: ['Mobile-first with min-width', 'Breakpoints at content needs', 'Relative units: rem, %, vw', 'prefers-color-scheme for dark mode']}],
    ]
  },
  'git': {
    topic: 'Advanced Git',
    concepts: [
      ['Rebasing', 'Intermediate', 'Reapplying commits on top of another base', {codeExample: 'git rebase -i HEAD~3\n# pick, reword, squash, fixup, drop\ngit rebase main', keyPoints: ['Rewrites commit history', 'Interactive rebase for cleanup', 'Never rebase shared commits', 'Squash/fixup for WIP commits']}],
      ['Cherry-pick', 'Intermediate', 'Applying specific commits to current branch', {codeExample: 'git cherry-pick abc1234\ngit cherry-pick abc1234..def5678\ngit cherry-pick -n abc1234', keyPoints: ['Applies commit changes', 'Creates new commit hash', 'Useful for hotfixes', 'Resolve conflicts if they occur']}],
      ['Bisect', 'Advanced', 'Binary search to find bug-introducing commit', {codeExample: 'git bisect start\ngit bisect bad\ngit bisect good v1.0\ngit bisect good  # or bad\n# Git checks commit in the middle each time\ngit bisect reset', keyPoints: ['Binary search O(log n)', 'Automate with git bisect run', 'Identifies regression introduction']}],
    ]
  },
  'docker': {
    topic: 'Docker Advanced',
    concepts: [
      ['Docker Compose', 'Intermediate', 'Multi-container application definition', {codeExample: 'services:\n  web:\n    build: .\n    ports: ["3000:3000"]\n    depends_on:\n      - db\n  db:\n    image: postgres:15\n    volumes:\n      - pgdata:/var/lib/postgresql/data\nvolumes:\n  pgdata:', keyPoints: ['YAML config for services', 'docker-compose up/down', 'Network and volume definitions']}],
      ['Multi-stage Builds', 'Intermediate', 'Reducing image size with multiple FROM', {codeExample: 'FROM node:20 AS builder\nCOPY . .\nRUN npm run build\n\nFROM node:20-alpine\nCOPY --from=builder /app/dist ./dist\nCMD ["node", "dist/server.js"]', keyPoints: ['Separate build and runtime', 'Smaller final images', 'Only copy needed artifacts']}],
      ['Volumes & Bind Mounts', 'Intermediate', 'Persistent data and host file sharing', {codeExample: 'docker volume create mydata\ndocker run -v mydata:/app/data myapp\ndocker run -v $(pwd):/app -w /app node:20 npm run dev', keyPoints: ['Volumes: managed by Docker', 'Bind mounts: host path, dev use', 'tmpfs: in-memory ephemeral']}],
      ['Health Checks', 'Intermediate', 'Container health monitoring', {codeExample: 'HEALTHCHECK --interval=30s --timeout=3s --retries=3 CMD curl -f http://localhost:3000/health || exit 1', keyPoints: ['States: starting, healthy, unhealthy', 'depend_on with condition: service_healthy', 'Useful for orchestration']}],
    ]
  },
  'dsa': {
    topic: 'More DSA Concepts',
    concepts: [
      ['Sliding Window', 'Intermediate', 'Window sliding over array for subarray problems', {codeExample: 'function maxSum(arr, k) {\n    let s = 0;\n    for (let i = 0; i < k; i++) s += arr[i];\n    let m = s;\n    for (let i = k; i < arr.length; i++) {\n        s += arr[i] - arr[i-k];\n        m = Math.max(m, s);\n    }\n    return m;\n}', keyPoints: ['O(n) time, O(1) space', 'Fixed or variable window', 'Subarray/substring problems']}],
      ['Two Pointers', 'Intermediate', 'Two pointers for efficient traversal', {codeExample: 'function isPalindrome(s) {\n    let l = 0, r = s.length - 1;\n    while (l < r) if (s[l++] !== s[r--]) return false;\n    return true;\n}', keyPoints: ['O(n) time for sorted', 'Points move toward each other', 'Pair problems, palindrome check']}],
      ['Trie', 'Intermediate', 'Tree for efficient string matching', {codeExample: 'class Trie {\n    constructor() { this.root = {}; }\n    insert(w) { let n = this.root; for (const c of w) { if (!n[c]) n[c] = {}; n = n[c]; } n.isEnd = true; }\n    search(w) { let n = this.root; for (const c of w) { if (!n[c]) return false; n = n[c]; } return !!n.isEnd; }\n}', keyPoints: ['O(L) for insert/search', 'Used in autocomplete', 'Prefix-based search efficient']}],
      ['Union-Find', 'Advanced', 'Disjoint set for connected components', {codeExample: 'class UnionFind {\n    constructor(n) { this.p = [...Array(n).keys()]; this.r = Array(n).fill(0); }\n    find(x) { if (this.p[x] !== x) this.p[x] = this.find(this.p[x]); return this.p[x]; }\n    union(x, y) {\n        let px = this.find(x), py = this.find(y);\n        if (px === py) return false;\n        if (this.r[px] < this.r[py]) [px, py] = [py, px];\n        this.p[py] = px; if (this.r[px] === this.r[py]) this.r[px]++;\n        return true;\n    }\n}', keyPoints: ['Near O(1) with path compression', 'Connected components, cycle detection', 'Kruskal\'s MST']}],
    ]
  },
  'cpp': {
    topic: 'Modern C++',
    concepts: [
      ['Smart Pointers', 'Intermediate', 'Automatic memory management pointers', {codeExample: 'auto p1 = make_unique<int>(42);\nauto p2 = move(p1);\nauto sp1 = make_shared<int>(10);\nauto sp2 = sp1;\nauto wp = weak_ptr<int>(sp1);', keyPoints: ['unique_ptr: exclusive', 'shared_ptr: ref counting', 'weak_ptr: break circular refs']}],
      ['Move Semantics', 'Advanced', 'Transferring resources with rvalue references', {codeExample: 'class Buffer {\n    char* d;\npublic:\n    Buffer(Buffer&& o) noexcept : d(o.d) { o.d = nullptr; }\n    Buffer& operator=(Buffer&& o) noexcept { if (this != &o) { delete[] d; d = o.d; o.d = nullptr; } return *this; }\n    ~Buffer() { delete[] d; }\n};', keyPoints: ['T&& is rvalue reference', 'std::move casts to rvalue', 'Move steals resources']}],
      ['RAII', 'Intermediate', 'Resource Acquisition Is Initialization', {codeExample: 'class File {\n    FILE* fp;\npublic:\n    File(const char* n) { fp = fopen(n, "r"); }\n    ~File() { if (fp) fclose(fp); }\n    File(const File&) = delete;\n    void read() {}\n};', keyPoints: ['Constructor acquires, destructor releases', 'Exception-safe resource mgmt', 'Core C++ idiom']}],
      ['Lambda Expressions', 'Intermediate', 'Anonymous function objects', {codeExample: 'auto add = [](int a, int b) { return a + b; };\nint m = 3;\nauto times = [m](int x) { return x * m; };\nsort(v.begin(), v.end(), [](int a, int b) { return a > b; });', keyPoints: ['Capture by value [=] or ref [&]', 'Generic lambdas (auto)', 'mutable for modifying captures']}],
    ]
  },
  'typescript': {
    topic: 'Advanced TypeScript',
    concepts: [
      ['Utility Types', 'Intermediate', 'Built-in type transformations', {codeExample: 'type PartialUser = Partial<User>;\ntype Preview = Pick<User, \'id\' | \'name\'>;\ntype NoEmail = Omit<User, \'email\'>;\ntype NameRec = Record<string, User>;', keyPoints: ['Partial, Pick, Omit, Record', 'Readonly, Required, NonNullable', 'Built-in mapped types']}],
      ['Mapped Types', 'Advanced', 'Transforming properties with mapped types', {codeExample: 'type Readonly<T> = { readonly [K in keyof T]: T[K]; };\ntype Optional<T> = { [K in keyof T]?: T[K]; };\ntype Getters<T> = { [K in keyof T as `get${Capitalize<string&K>}`]: () => T[K]; };', keyPoints: ['Iterate keys with keyof', 'Transform with modifiers', 'Template literal for key remapping']}],
      ['Conditional Types', 'Advanced', 'Types depending on conditions', {codeExample: 'type IsString<T> = T extends string ? true : false;\ntype ReturnType<T> = T extends (...a: any[]) => infer R ? R : never;', keyPoints: ['T extends U ? X : Y', 'Distributive over unions', 'infer for type extraction']}],
      ['Generics & Constraints', 'Intermediate', 'Reusable components with type parameters', {codeExample: 'function getProp<T, K extends keyof T>(obj: T, key: K): T[K] { return obj[key]; }\nfunction logLen<T extends {length: number}>(arg: T): T { console.log(arg.length); return arg; }', keyPoints: ['Type params with <T>', 'extends for constraints', 'keyof for object keys']}],
    ]
  },
  'go': {
    topic: 'Go Advanced',
    concepts: [
      ['Interfaces', 'Intermediate', 'Implicit interface satisfaction', {codeExample: 'type Writer interface { Write([]byte) (int, error) }\n// os.File satisfies Writer implicitly\nvar w Writer = os.Stdout\nif sw, ok := w.(*os.File); ok { /* type assertion */ }', keyPoints: ['Implicit satisfaction', 'Empty interface interface{}', 'Type assertion x.(T)', 'Type switch']}],
      ['Goroutines & Channels', 'Intermediate', 'Lightweight concurrency', {codeExample: 'func worker(id int, jobs <-chan int, res chan<- int) {\n    for j := range jobs { res <- j * 2 }\n}\njobs := make(chan int, 10)\nres := make(chan int, 10)\nfor w := 0; w < 3; w++ { go worker(w, jobs, res) }\nfor j := 0; j < 10; j++ { jobs <- j }\nclose(jobs)', keyPoints: ['goroutine: lightweight thread', 'channel: typed conduit', 'select for multiplexing', 'Range over channel']}],
      ['Context Package', 'Advanced', 'Deadlines, cancellation, request-scoped values', {codeExample: 'ctx, cancel := context.WithTimeout(r.Context(), 5*time.Second)\ndefer cancel()\nresult, err := doWork(ctx)\nselect {\ncase <-ctx.Done():\n    return nil, ctx.Err()\ncase res := <-resultCh:\n    return res, nil\n}', keyPoints: ['WithTimeout, WithCancel', 'ctx.Done() channel', 'Propagate through call chain']}],
    ]
  },
  'rust': {
    topic: 'Rust Concepts',
    concepts: [
      ['Ownership & Borrowing', 'Intermediate', 'Memory management rules: one owner', {codeExample: 'let s = String::from("hello");\nlet s2 = s;  // moved\n// println!("{}", s);  // ERROR\nlet s3 = takes(s2);\nfn takes(s: String) -> String { s }\nfn borrow(s: &String) -> usize { s.len() }\nfn modify(s: &mut String) { s.push_str(" world"); }', keyPoints: ['Each value has one owner', 'Move transfers ownership', 'Borrow: &T and &mut T']}],
      ['Lifetimes', 'Advanced', 'Ensuring references are always valid', {codeExample: 'fn longest<\'a>(x: &\'a str, y: &\'a str) -> &\'a str {\n    if x.len() > y.len() { x } else { y }\n}\nstruct Excerpt<\'a> { part: &\'a str }\nfn first(s: &str) -> &str { s.split_whitespace().next().unwrap_or("") }', keyPoints: ['\'a annotation ties lifetimes', 'Elision rules for common patterns', '\'static for program-duration refs']}],
      ['Traits', 'Intermediate', 'Shared behavior definitions', {codeExample: 'trait Summary { fn summarize(&self) -> String; }\nimpl Summary for Article {\n    fn summarize(&self) -> String { format!("{}: {}", self.title, self.content) }\n}\nfn notify<T: Summary>(item: &T) { println!("{}", item.summarize()); }', keyPoints: ['Traits define shared behavior', 'Trait bounds on generics', 'dyn Trait for trait objects']}],
    ]
  },
  'mysql': {
    topic: 'MySQL Advanced',
    concepts: [
      ['Indexing Strategies', 'Intermediate', 'Creating indexes for optimal performance', {codeExample: 'CREATE INDEX idx_lastname ON employees(last_name);\nCREATE INDEX idx_dept_salary ON employees(department_id, salary);\nCREATE UNIQUE INDEX idx_email ON users(email);\nCREATE FULLTEXT INDEX idx_content ON articles(content);', keyPoints: ['B-Tree for range/equality', 'Composite: column order matters', 'Full-text for text search']}],
      ['Partitioning', 'Advanced', 'Splitting large tables into partitions', {codeExample: 'CREATE TABLE orders (id INT, order_date DATE)\nPARTITION BY RANGE (YEAR(order_date)) (\n    PARTITION p2022 VALUES LESS THAN (2023),\n    PARTITION p2023 VALUES LESS THAN (2024),\n    PARTITION p_future VALUES LESS THAN MAXVALUE\n);', keyPoints: ['Range, List, Hash, Key', 'Partition pruning for performance', 'Easier data archiving (DROP PARTITION)']}],
      ['Replication', 'Intermediate', 'Copying data between servers', {codeExample: 'CHANGE REPLICATION SOURCE TO\n    SOURCE_HOST=\'source\',\n    SOURCE_USER=\'repl\',\n    SOURCE_LOG_FILE=\'mysql-bin.000001\',\n    SOURCE_LOG_POS=4;\nSTART REPLICA;', keyPoints: ['Source-replica async replication', 'Binlog: STATEMENT, ROW, MIXED', 'Read scaling, backup, failover']}],
    ]
  },
  'linux': {
    topic: 'Linux Advanced',
    concepts: [
      ['File Permissions & ACLs', 'Beginner', 'rwx permissions and access control', {codeExample: 'chmod 754 file\nchown user:group file\nsetfacl -m u:alice:rwx file\ngetfacl file\nchmod u+s file  # SUID\nchmod +t /tmp   # sticky', keyPoints: ['User/Group/Other rwx', 'SUID, SGID, Sticky bits', 'ACL for fine-grained control']}],
      ['Process Management', 'Beginner', 'Managing processes with ps, top, kill', {codeExample: 'ps aux\ntop\nkill -TERM 1234\nkill -KILL 1234\nnice -n 10 ./slow\nnohup ./script &', keyPoints: ['pid, ppid hierarchy', 'Signals: SIGTERM, SIGKILL', 'nice/renice for priority']}],
      ['Systemd', 'Intermediate', 'Init system for service management', {codeExample: 'systemctl start nginx\nsystemctl enable nginx\nsystemctl status nginx\njournalctl -u nginx -f', keyPoints: ['Unit types: service, socket, timer', 'systemctl for lifecycle', 'Journald for logging']}],
      ['Shell Scripting', 'Intermediate', 'Bash programming basics', {codeExample: '#!/bin/bash\nset -euo pipefail\nfor f in /var/log/*.log; do\n    echo "Processing $f"\ndone\nwhile getopts "d:" opt; do case $opt in d) db="$OPTARG";; esac; done', keyPoints: ['set -euo pipefail', 'Variables, arrays, loops', 'Functions with local vars']}],
    ]
  },
  'mongodb': {
    topic: 'MongoDB Advanced',
    concepts: [
      ['Aggregation Pipeline', 'Intermediate', 'Data processing pipeline stages', {codeExample: 'db.orders.aggregate([\n    {$match: {status:"completed"}},\n    {$group: {_id:"$customer_id", total:{$sum:"$amount"}}},\n    {$sort: {total:-1}},\n    {$limit: 10},\n    {$lookup: {from:"customers", localField:"_id", foreignField:"_id", as:"c"}},\n])', keyPoints: ['Pipeline of stages', '$match early to filter', '$lookup for JOIN']}],
      ['Index Types', 'Intermediate', 'Single, compound, text, geospatial indexes', {codeExample: 'db.users.createIndex({email:1}, {unique:true})\ndb.orders.createIndex({status:1, created_at:-1})\ndb.articles.createIndex({title:"text", body:"text"})\ndb.places.createIndex({location:"2dsphere"})', keyPoints: ['B-Tree for single/compound', 'Text for full-text search', '2dsphere for geospatial']}],
      ['Replica Sets', 'Intermediate', 'Primary-secondary replication', {codeExample: '{\n    _id: "rs0",\n    members: [{_id:0, host:"m1:27017"}, {_id:1, host:"m2:27017"}]\n}', keyPoints: ['One primary, multiple secondaries', 'Oplog for replication', 'Automatic failover', 'Read preferences']}],
    ]
  },
  'c': {
    topic: 'C Advanced',
    concepts: [
      ['Pointers & Memory', 'Intermediate', 'Direct memory access and dynamic allocation', {codeExample: 'int *p = malloc(10 * sizeof(int));\np[0] = 42;\nfree(p);\np = NULL;\nint arr[5] = {1,2,3,4,5};\nint *ptr = arr;\n*(ptr+2) = 10;', keyPoints: ['malloc/calloc/realloc/free', 'Dangling pointers from use-after-free', 'Memory leaks', 'Pointer arithmetic']}],
      ['Function Pointers', 'Intermediate', 'Pointers storing function addresses', {codeExample: 'int add(int a, int b) { return a+b; }\nint op(int (*fn)(int,int), int x, int y) { return fn(x,y); }\nprintf("%d", op(add, 5, 3));', keyPoints: ['Type: ret (*name)(params)', 'Callbacks and strategy pattern', 'Array of function pointers for dispatch']}],
      ['Preprocessor Macros', 'Intermediate', 'Compile-time text substitution', {codeExample: '#define MAX(a,b) ((a)>(b)?(a):(b))\n#define DEBUG(fmt, ...) fprintf(stderr, "[DEBUG] " fmt "\\n", ##__VA_ARGS__)', keyPoints: ['Parentheses around params', 'Do-while-zero for multi-stmt', 'Conditional compilation with #ifdef']}],
    ]
  },
  'csharp': {
    topic: 'Advanced C#',
    concepts: [
      ['LINQ', 'Intermediate', 'Language Integrated Query for data', {codeExample: 'var evens = numbers.Where(n => n%2==0);\nvar squares = numbers.Select(n => n*n);\nvar result = from n in numbers where n>2 orderby n descending select n*2;\nvar orders = db.Orders.Where(o => o.CustomerId==id).OrderByDescending(o => o.Date).Take(10).ToList();', keyPoints: ['Deferred vs immediate execution', 'Method vs query syntax', 'IEnumerable vs IQueryable']}],
      ['Async/Await', 'Intermediate', 'Task-based async programming', {codeExample: 'async Task<string> FetchAsync(string url) {\n    using var c = new HttpClient();\n    return await c.GetStringAsync(url);\n}\nvar t1 = FetchAsync("url1");\nvar t2 = FetchAsync("url2");\nawait Task.WhenAll(t1, t2);', keyPoints: ['async/await syntax sugar', 'Task for async operation', 'ConfigureAwait(false) for libs', 'CancellationToken']}],
      ['Delegates & Events', 'Intermediate', 'Type-safe function pointers', {codeExample: 'public delegate void Handler(string m);\npublic event Handler? Sent;\nFunc<int,int,int> add = (a,b) => a+b;\nAction<string> log = Console.WriteLine;', keyPoints: ['Delegates: type-safe pointers', 'Events: add/remove accessors', 'Multicast delegates with +=', 'Func/Action built-ins']}],
    ]
  },
  'kotlin': {
    topic: 'Kotlin Features',
    concepts: [
      ['Coroutines', 'Intermediate', 'Lightweight concurrency with suspend functions', {codeExample: 'suspend fun fetch(id: Int): String {\n    delay(1000)\n    return api.get(id)\n}\nfun main() = runBlocking {\n    val r = async { fetch(1) }\n    println(r.await())\n}', keyPoints: ['suspend functions', 'launch, async, runBlocking', 'Dispatchers: Main, IO, Default']}],
      ['Extension Functions', 'Beginner', 'Adding functions to existing classes', {codeExample: 'fun String.isEmail() = this.contains("@") && this.contains(".")\n"test@test.com".isEmail()\ninfix fun Int.times(s: String) = s.repeat(this)\nprintln(3 times "Hi ")', keyPoints: ['Receiver type defines target', 'Static dispatch', 'Infix notation available']}],
      ['Sealed Classes', 'Intermediate', 'Restricted class hierarchies', {codeExample: 'sealed class State {\n    data class Success(val d: String): State()\n    data class Error(val m: String): State()\n    object Loading: State()\n}\nfun handle(s: State) = when(s) {\n    is State.Success -> println(s.d)\n    is State.Error -> println(s.m)\n    State.Loading -> println("loading")\n}', keyPoints: ['Exhaustive when matching', 'Subclasses in same module', 'Used for state machines']}],
    ]
  },
  'swift': {
    topic: 'Swift Advanced',
    concepts: [
      ['ARC', 'Intermediate', 'Automatic Reference Counting', {codeExample: 'class Person {\n    var apt: Apartment?\n    deinit { print("gone") }\n}\nclass Apartment {\n    weak var tenant: Person?  // avoid cycle\n    deinit { print("apt gone") }\n}', keyPoints: ['Strong: default, retains', 'Weak: optional, auto-nilled', 'Unowned: non-optional', 'Closure capture [weak self]']}],
      ['Protocol-Oriented Programming', 'Intermediate', 'Emphasizing protocols over inheritance', {codeExample: 'protocol Drawable {\n    var area: Double { get }\n    func draw()\n}\nextension Drawable {\n    func draw() { print("drawing") }\n}\nstruct Circle: Drawable { let r: Double; var area: Double { .pi*r*r } }', keyPoints: ['Protocols define interfaces', 'Extensions provide defaults', 'POP over inheritance']}],
      ['Concurrency (async/await/actor)', 'Intermediate', 'Structured concurrency with actors', {codeExample: 'actor Account {\n    private var bal = 0\n    func deposit(_ a: Int) { bal += a }\n    func balance() -> Int { bal }\n}\nlet acc = Account()\nawait acc.deposit(100)\nprint(await acc.balance())', keyPoints: ['Actor for data-race protection', 'async/await for async code', 'async let for concurrency']}],
    ]
  },
  'pandas': {
    topic: 'Advanced Pandas',
    concepts: [
      ['GroupBy', 'Intermediate', 'Split-apply-combine for grouped data', {codeExample: 'df.groupby(\'dept\')[\'salary\'].agg([\'mean\', \'sum\', \'count\'])\ndf.groupby(\'dept\').agg({\'salary\': [\'mean\',\'median\'], \'bonus\': \'sum\'})\ndf[\'pct\'] = df.groupby(\'dept\')[\'salary\'].transform(lambda x: x/x.sum())', keyPoints: ['groupby() creates GroupBy object', 'agg() for multiple functions', 'transform() returns same shape']}],
      ['Merge, Join & Concat', 'Intermediate', 'Combining DataFrames', {codeExample: 'inner = pd.merge(df1, df2, on=\'id\')\nleft = pd.merge(df1, df2, on=\'id\', how=\'left\')\npd.concat([df1, df2], ignore_index=True)', keyPoints: ['merge: column-based join', 'join: index-based join', 'concat: stacking rows']}],
      ['Missing Data', 'Intermediate', 'Handling NaN/null values', {codeExample: 'df.dropna()\ndf.fillna(0)\ndf.fillna(method=\'ffill\')\ndf[\'A\'].fillna(df[\'A\'].mean())\ndf.interpolate()', keyPoints: ['isna() to detect', 'dropna() to remove', 'fillna() to fill', 'interpolate() for time series']}],
    ]
  },
  'security': {
    topic: 'Security Concepts',
    concepts: [
      ['SQL Injection Prevention', 'Intermediate', 'Protecting against SQL injection attacks', {codeExample: '// SAFE: parameterized query\nconst {rows} = await pool.query(\'SELECT * FROM users WHERE name = $1\', [userInput]);\n// Input validation\nif (!/^[a-zA-Z0-9]+$/.test(userInput)) throw new Error("Invalid");', keyPoints: ['Use parameterized queries', 'Input validation', 'ORM helps but isnt magic', 'Least privilege for DB accounts']}],
      ['OAuth 2.0', 'Intermediate', 'Authorization framework', {codeExample: '// Auth code flow\nGET /authorize?response_type=code&client_id=X&redirect_uri=Y&state=Z\nPOST /token {code, client_id, client_secret, grant_type:"authorization_code"}\n// Response: {access_token, id_token, refresh_token}', keyPoints: ['Authorization Code Flow standard', 'PKCE for mobile/SPA', 'ID token for auth, access token for API']}],
      ['XSS Prevention', 'Beginner', 'Cross-Site Scripting attack prevention', {codeExample: '// Output encoding\ndiv.textContent = userInput;  // safe\ndiv.innerHTML = userInput;    // dangerous\n// CSP header\nContent-Security-Policy: script-src \'self\'', keyPoints: ['Output encoding context-aware', 'Content Security Policy (CSP)', 'HttpOnly cookies']}],
    ]
  },
  'dbms': {
    topic: 'Advanced DBMS',
    concepts: [
      ['ACID Properties', 'Intermediate', 'Atomicity, Consistency, Isolation, Durability', {codeExample: 'BEGIN;\nUPDATE accounts SET balance = balance - 100 WHERE id = 1;\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;\nCOMMIT;\n-- ROLLBACK on error for atomicity', keyPoints: ['Atomicity: all or nothing', 'Consistency: constraints hold', 'Isolation: concurrency control', 'Durability: WAL for crash recovery']}],
      ['Normalization', 'Intermediate', 'Reducing redundancy through normal forms', {codeExample: '-- 1NF: atomic values\n-- 2NF: no partial dependency\n-- 3NF: no transitive dependency\n-- Split: employee(id, name, dept_id), department(dept_id, dept_name)', keyPoints: ['1NF: atomic values', '2NF: no partial dep', '3NF: no transitive dep', 'Normalize for writes, denormalize for reads']}],
      ['Concurrency Control (MVCC)', 'Advanced', 'Multi-version concurrency control for non-blocking reads', {codeExample: '-- MVCC: readers see snapshot at start\n-- Writers create new versions, dont block readers\n-- xmin: creating transaction, xmax: deleting transaction\n-- VACUUM cleans dead tuples\n-- SELECT ... FOR UPDATE for pessimistic locking', keyPoints: ['MVCC: reader-writer non-blocking', 'Deadlock detection', 'Isolation vs performance trade-off']}],
    ]
  },
  'oop': {
    topic: 'More OOP Concepts',
    concepts: [
      ['SOLID Principles', 'Intermediate', 'Five OOP design principles', {codeExample: '// S: one reason to change\n// O: extend without modifying\n// L: subtypes replaceable (Liskov)\n// I: many specific interfaces\n// D: depend on abstractions\nclass ReportGen { generate() {} }\nclass ReportPrint { print() {} }', keyPoints: ['SRP: single responsibility', 'OCP: open for extension', 'LSP: Liskov substitution', 'ISP + DIP']}],
      ['Design Patterns (Creational)', 'Intermediate', 'Singleton, Factory, Builder', {codeExample: 'class Singleton {\n    static #inst;\n    constructor() { if (Singleton.#inst) return Singleton.#inst; Singleton.#inst = this; }\n}\nclass Factory { static create(t) { if(t==="a") return new A(); } }\nclass Builder {\n    setSize(s) { this.s = s; return this; }\n    build() { return this; }\n}', keyPoints: ['Singleton: one instance', 'Factory: encapsulates creation', 'Builder: step-by-step construction']}],
      ['Composition vs Inheritance', 'Beginner', 'Favoring composition over inheritance', {codeExample: '// Inheritance: Dog extends Animal (tight coupling)\n// Composition: Dog { flyBehavior = new CanFly(); }\n// Has-a vs Is-a\n// Strategy pattern uses composition', keyPoints: ['Inheritance: tight coupling', 'Composition: flexible, testable', 'Has-a vs Is-a']}],
    ]
  },
  'os': {
    topic: 'Advanced OS',
    concepts: [
      ['Process Scheduling', 'Intermediate', 'CPU scheduling algorithms', {codeExample: '// FCFS, SJF, Round Robin, Priority\n// MLFQ: most modern OS scheduler\n// Metrics: CPU utilization, throughput, turnaround, response time', keyPoints: ['FCFS: convoy effect', 'SJF: optimal avg waiting', 'Round Robin: time quantum', 'MLFQ: adaptive modern scheduler']}],
      ['Memory Paging', 'Advanced', 'Virtual memory with page tables and TLB', {codeExample: '// Page table: virtual page -> physical frame\n// TLB caches recent translations\n// Multi-level page table for 64-bit\n// Page replacement: LRU, Clock', keyPoints: ['Paging: fixed-size, no external frag', 'TLB accelerates translation', 'Multi-level saves memory']}],
      ['Deadlocks', 'Intermediate', 'Four conditions and prevention', {codeExample: '// Conditions: Mutex, Hold-wait, No-preemption, Circular wait\n// Prevention: break any condition\n// Lock ordering prevents circular wait\n// Bankers algorithm for avoidance', keyPoints: ['Mutex, Hold-wait, No-preemption, Circular wait', 'Prevention: break one condition', 'Avoidance: Bankers algorithm']}],
    ]
  },
  'networks': {
    topic: 'Advanced Networking',
    concepts: [
      ['TCP vs UDP', 'Intermediate', 'Transport protocol comparison', {codeExample: '// TCP: connection-oriented, reliable, ordered\n// 3-way handshake: SYN, SYN-ACK, ACK\n// UDP: connectionless, fast, no guarantees\n// Use cases: TCP for HTTP, UDP for DNS/streaming', keyPoints: ['TCP: reliable, ordered, connection-oriented', 'UDP: fast, lightweight, connectionless', 'QUIC: UDP-based, reliable']}],
      ['DNS', 'Intermediate', 'Domain Name System resolution', {codeExample: '// dig example.com A\n// Root -> TLD (.com) -> Authoritative\n// Records: A, AAAA, CNAME, MX, TXT, NS\n// Caching at each level (TTL)', keyPoints: ['Hierarchical resolution', 'Recursive resolver', 'CNAME for aliases', 'TTL controls caching']}],
      ['HTTP/1.1 vs HTTP/2 vs HTTP/3', 'Intermediate', 'HTTP protocol evolution', {codeExample: '// HTTP/1.1: text, one req per connection\n// HTTP/2: binary, multiplexed, HPACK, server push\n// HTTP/3: QUIC (UDP), 0-RTT, no HOL blocking', keyPoints: ['HTTP/2: multiplexed streams', 'HTTP/3: QUIC, no HOL blocking', 'gRPC uses HTTP/2']}],
    ]
  },
  'system-design': {
    topic: 'Design Patterns & Principles',
    concepts: [
      ['CAP Theorem', 'Intermediate', 'Consistency, Availability, Partition Tolerance trade-off', {codeExample: '// CA: SQL databases (single-node)\n// CP: HBase, etcd (sacrifice A during partition)\n// AP: Cassandra, DynamoDB (sacrifice C)\n// PACELC: Partition or Else Latency vs Consistency', keyPoints: ['Pick 2 of 3', 'CA: single-node SQL', 'CP: consistent on partition', 'AP: available on partition']}],
      ['Caching Strategies', 'Intermediate', 'Cache-aside, write-through, write-behind', {codeExample: '// Cache-aside (lazy): check cache, miss -> load from DB\n// Write-through: write to cache then DB\n// Write-behind: write to cache, async DB write\n// Eviction: LRU, LFU, TTL\n// Thundering herd: mutex on cache miss', keyPoints: ['Cache-aside: most common', 'Write-through: consistent', 'Write-behind: fast but risky', 'TTL + LRU for eviction']}],
      ['Message Queues', 'Intermediate', 'Async communication between services', {codeExample: '// RabbitMQ: AMQP, exchanges, queues\n// Kafka: log-based, partitioned, replayable\n// Pub/Sub: topic with multiple consumers\n// Use: decouple, buffer spikes, async processing', keyPoints: ['Queue: point-to-point', 'Topic: pub-sub fan-out', 'Kafka: log-based, durable, replayable']}],
    ]
  },
};

// Process courses in REVERSE order so earlier string positions stay valid
var courseIds = Object.keys(extras);
courseIds.sort().reverse();

courseIds.forEach(function(courseId) {
  var extra = extras[courseId];
  var conceptsText = extra.concepts.map(function(c) {
    return makeConcept(c[0], c[1], c[2], c[3]);
  }).join(',\n');
  var newBlock = "      { name: '" + esc(extra.topic) + "', concepts: [\n" + conceptsText + "\n      ]},";

  var courseStart = "  '" + courseId + "': {";
  var pos = src.indexOf(courseStart);
  if (pos < 0) { console.log('NOT FOUND: ' + courseId); return; }

  var closeMarker = "    ]\n  },";
  var closePos = src.indexOf(closeMarker, pos + courseStart.length);
  if (closePos < 0) {
    closeMarker = "    ]\n  }";
    closePos = src.lastIndexOf(closeMarker);
    if (closePos < 0 || closePos < pos) { console.log('NO CLOSE for: ' + courseId); return; }
  }

  src = src.slice(0, closePos - 1) + ',\n' + newBlock + '\n' + src.slice(closePos);
  console.log('OK: ' + courseId);
});

fs.writeFileSync(__dirname + '/interview-data.js', src, 'utf8');
console.log('DONE - base 358 + mass-expand 1 topic/course');
