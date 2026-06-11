var fs = require('fs');
var src = fs.readFileSync(__dirname + '/interview-data.js', 'utf8');

function esc(s) { s = String(s); return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n'); }

// Build concepts with JS objects, not deep array nesting
var courseConcepts = {};
function add(course, term, diff, def, kps, code) {
  if (!courseConcepts[course]) courseConcepts[course] = [];
  courseConcepts[course].push({term: term, diff: diff, def: def, kps: kps, code: code});
}

add('python', 'Functools (lru_cache, partial)', 'Intermediate', 'Functional utilities for memoization and partial application', ['lru_cache caches results', 'partial fixes arguments', 'wraps preserves metadata']);
add('python', 'Pathlib', 'Intermediate', 'Object-oriented filesystem paths', ['Path objects replace os.path', 'Path.glob(), Path.rglob()', 'Cross-platform path handling']);
add('python', 'Collections Module', 'Intermediate', 'Specialized container data types', ['Counter, defaultdict, namedtuple', 'deque for O(1) appends/pops', 'OrderedDict keeps insertion order']);
add('python', 'Context Managers', 'Intermediate', 'Managing resources with the with statement', ['__enter__/__exit__', 'contextlib.contextmanager', 'Exception handling in __exit__'], 'class ManagedFile:\n    def __init__(self, name):\n        self.name = name\n    def __enter__(self):\n        self.f = open(self.name, \'w\')\n        return self.f\n    def __exit__(self, *args):\n        self.f.close()');

add('javascript', 'WeakMap & WeakSet', 'Advanced', 'Garbage-collectible key-value pairs', ['Keys must be objects', 'No iteration methods', 'Prevents memory leaks']);
add('javascript', 'Atomics & SharedArrayBuffer', 'Advanced', 'Shared memory for concurrent threads', ['Atomics.add, Atomics.load', 'SharedArrayBuffer for workers', 'Sequential consistency']);
add('javascript', 'Proxy & Reflect', 'Advanced', 'Meta-programming', ['Proxy wraps objects with traps', 'Reflect for default behavior', 'Useful for validation']);

add('java', 'Records (Java 14+)', 'Intermediate', 'Compact class declarations for data carriers', ['Auto: constructor, equals, toString', 'Immutable by default', 'Can add methods and constructors']);
add('java', 'CompletableFuture', 'Advanced', 'Async programming with futures', ['thenApply, thenCompose', 'supplyAsync, runAsync', 'exceptionally for errors']);
add('java', 'Stream API', 'Intermediate', 'Functional operations on collections', ['map, filter, reduce, collect', 'Lazy evaluation pipeline', 'Parallel streams']);

add('react', 'SyntheticEvent', 'Intermediate', 'React cross-browser event wrapper', ['Wraps native event', 'Event pooling pre-17', 'e.persist() for async']);
add('react', 'Render Props', 'Intermediate', 'Sharing code via function-as-child props', ['Function as child pattern', 'Less common since hooks', 'Also: HOC pattern']);
add('react', 'HOC (Higher-Order Component)', 'Intermediate', 'Function returning wrapped component', ['withAuth, withLogging', 'Props name collision risk']);

add('sql', 'EXISTS vs IN', 'Intermediate', 'Subquery semantics comparison', ['EXISTS: early exit on match', 'IN: collect results first', 'EXISTS faster for large subs']);
add('sql', 'Date/Time Functions', 'Beginner', 'Working with dates in SQL', ['NOW(), CURRENT_DATE, EXTRACT()', 'DATE_ADD, DATEDIFF', 'TIMESTAMP vs DATETIME']);
add('sql', 'Views', 'Beginner', 'Virtual tables from SELECT queries', ['Simplifies complex queries', 'Updatable views restrictions', 'Can limit column access']);

add('html', 'ContentEditable', 'Intermediate', 'Making elements editable in browser', ['contenteditable="true"', 'document.execCommand legacy', 'contenteditable API modern']);
add('html', 'Dialog Element', 'Intermediate', 'Native modal dialog', ['<dialog> for modals', 'showModal() for open', '::backdrop for styling']);
add('html', 'Forms & Validation', 'Beginner', 'Native HTML form validation', ['required, pattern, min, max', ':valid / :invalid CSS', 'Constraint Validation API']);

add('css', 'Specificity Calculator', 'Intermediate', 'How CSS specificity is calculated', ['Inline > ID > Class > Element', '!important overrides all', 'Selector weight calculation']);
add('css', 'Inheritance in CSS', 'Beginner', 'Property inheritance behavior', ['Text properties inherit (color)', 'Box properties dont (margin)', 'inherit, initial, unset values']);
add('css', 'CSS Grid vs Flexbox', 'Intermediate', 'When to use which layout system', ['Grid: 2D layouts', 'Flexbox: 1D layouts', 'Grid for page, Flex for components']);

add('git', 'Reflog', 'Advanced', 'Recovery log for all ref changes', ['git reflog shows all HEAD moves', 'Recover lost commits', 'Local only, not shared']);
add('git', 'Worktrees', 'Intermediate', 'Multiple working directories in one repo', ['git worktree add ../other', 'Work on branches simultaneously', 'Shared objects directory']);
add('git', 'Stashing', 'Beginner', 'Temporarily save uncommitted changes', ['git stash push -m "msg"', 'git stash pop, apply, drop', 'git stash list']);

add('docker', 'Container Resource Limits', 'Intermediate', 'Limiting CPU and memory for containers', ['--memory, --cpus flags', 'Docker compose deploy.resources', 'OOM kills when exceeding memory']);
add('docker', 'Docker Secrets', 'Intermediate', 'Managing sensitive data in swarm', ['docker secret create', 'Mounted as tmpfs in container', 'Swarm mode only']);
add('docker', 'Networking', 'Intermediate', 'Docker network types', ['bridge, host, overlay, none', '--network flag for container', 'Custom networks for isolation']);

add('dsa', 'Quickselect', 'Advanced', 'Finding kth smallest in O(n) average', ['Partition + recursive select', 'O(n) avg, O(n^2) worst', 'In-place algorithm']);
add('dsa', 'Radix Sort', 'Intermediate', 'Non-comparison sort for integers', ['O(nk) time, O(n+k) space', 'Sorts by LSD to MSD digits', 'Stable sorting algorithm']);
add('dsa', 'Bloom Filter', 'Advanced', 'Space-efficient probabilistic set', ['No false negatives', 'Tunable false positive rate', 'k hash functions, m bits']);

add('cpp', 'RTTI (typeid)', 'Advanced', 'Runtime type information', ['typeid operator', 'dynamic_cast for safe downcast', 'Requires virtual function']);
add('cpp', 'Type Casting', 'Intermediate', 'C++ type casting operators', ['static_cast: compile-time', 'dynamic_cast: runtime RTTI', 'reinterpret_cast: bit patterns']);
add('cpp', 'Const Correctness', 'Intermediate', 'Const for immutability guarantees', ['const member functions', 'const references for params', 'constexpr for compile-time']);

add('typescript', 'satisfies Operator', 'Intermediate', 'Type checking without widening', ['satisfies checks type without changing it', 'Preserves literal types', 'TS 4.9+ feature']);
add('typescript', 'typeof & keyof', 'Intermediate', 'Type query and key extraction', ['typeof val gives type of value', 'keyof T gives keys of type', 'Combined for mapped types']);
add('typescript', 'Decorators', 'Advanced', 'Annotations for class members', ['@decorator syntax', 'Class, method, accessor decorators', 'Experimental in TS 5.x']);

add('go', 'JSON Encoding', 'Intermediate', 'Marshaling/unmarshaling JSON', ['json.Marshal / json.Unmarshal', 'Struct tags: json:"field"', 'Custom MarshalJSON']);
add('go', 'Goroutine Leaks', 'Advanced', 'Avoiding goroutine leaks', ['Use context cancellation', 'Select with ctx.Done()', 'Ensure channels closed']);
add('go', 'Embedded Structs', 'Intermediate', 'Composition over inheritance', ['Anonymous struct fields', 'Method promotion', 'Override promoted methods']);

add('rust', 'HashMap & Collections', 'Intermediate', 'Standard library collection types', ['HashMap, BTreeMap, HashSet', 'Vec, String, VecDeque', 'Entry API for maps']);
add('rust', 'Closures & Captures', 'Intermediate', 'Anonymous functions capturing environment', ['Fn, FnMut, FnOnce traits', 'move keyword for ownership', 'Function trait implementation']);
add('rust', 'Pattern Matching', 'Intermediate', 'Destructuring with match and if let', ['match arms exhaustive', 'Tuple, struct, enum patterns', 'Guards with if condition']);

add('mysql', 'Transactions', 'Intermediate', 'BEGIN, COMMIT, ROLLBACK', ['Atomic group of operations', 'ROLLBACK on error', 'Implicit commit on DDL']);
add('mysql', 'Stored Procedures', 'Intermediate', 'Server-side SQL routines', ['CREATE PROCEDURE syntax', 'IN, OUT, INOUT params', 'Reduces network round-trips']);
add('mysql', 'Views (MySQL)', 'Beginner', 'Virtual tables for query simplification', ['CREATE VIEW AS SELECT', 'Simplifies complex joins', 'Limited DML on views']);

add('linux', 'SSH Key Management', 'Intermediate', 'Managing SSH keys for passwordless auth', ['ssh-keygen, ssh-copy-id', 'authorized_keys file', 'ssh-agent for key forwarding']);
add('linux', 'Environment Variables', 'Beginner', 'Shell env variable management', ['export VAR=value', '$VAR, ${VAR:-default}', 'env, printenv, set']);
add('linux', 'Job Control', 'Beginner', 'Background and foreground process mgmt', ['Ctrl+Z suspends', 'bg resumes background', 'fg brings foreground']);

add('mongodb', 'Geospatial Queries', 'Intermediate', 'Location-based queries with GeoJSON', ['2dsphere index for geo data', '$near, $geoWithin', 'GeoJSON format']);
add('mongodb', 'Bulk Operations', 'Intermediate', 'Batch writes', ['bulkWrite with ordered option', 'insertMany, updateMany', 'Ordered vs unordered']);
add('mongodb', 'TTL Indexes', 'Intermediate', 'Auto-expire documents', ['expireAfterSeconds option', 'Background thread every 60s', 'Good for session data']);

add('c', 'Variadic Functions', 'Intermediate', 'Functions accepting variable arguments', ['stdarg.h for variable args', 'va_list, va_start, va_arg', 'printf family']);
add('c', 'Enums', 'Beginner', 'Named integer constants', ['enum keyword', 'Auto-incrementing values', 'Type-safe in C++ not C']);
add('c', 'Typedef', 'Beginner', 'Creating type aliases', ['typedef existing_type new_name', 'Common: typedef struct', 'Improves readability']);

add('csharp', 'Null-Conditional Operators', 'Intermediate', 'Safe navigation and default operators', ['?. for safe chaining', '?? for defaults', '??= for assignment']);
add('csharp', 'Yield Return', 'Intermediate', 'Iterator with lazy evaluation', ['yield return for IEnumerable', 'yield break to stop', 'Deferred execution']);
add('csharp', 'LINQ Methods', 'Intermediate', 'LINQ extension methods', ['Where, Select, OrderBy', 'GroupBy, Join, Aggregate', 'Deferred vs immediate']);

add('kotlin', 'Type Aliases', 'Beginner', 'Alternative names for existing types', ['typealias provides semantic names', 'Compile-time only', 'Improves readability']);
add('kotlin', 'Destructuring Declarations', 'Beginner', 'Unpacking objects into variables', ['val (name, age) = person', 'component1()-component5()', 'Data classes auto-gen']);
add('kotlin', 'Extension Functions', 'Intermediate', 'Adding methods to existing classes', ['fun String.reverse()', 'Statically dispatched', 'Cannot access private members']);

add('swift', 'Access Control', 'Intermediate', 'Access levels for encapsulation', ['open, public, internal', 'fileprivate, private', 'Default is internal']);
add('swift', 'Result Type', 'Intermediate', 'Success/failure enum for async ops', ['Result<Success, Failure>', '.success(), .failure()', 'Combine with async/await']);
add('swift', 'Optionals & Unwrapping', 'Beginner', 'Safe nil handling', ['if let, guard let', '?? nil coalescing', 'Optional chaining ?.']);

add('pandas', 'Categorical Data', 'Intermediate', 'Efficient encoding for repeated strings', ['astype("category")', 'Memory reduction for strings', 'Ordered categories']);
add('pandas', 'Reshaping', 'Intermediate', 'Wide to long format conversion', ['pivot, melt, stack, unstack', 'Wide to long format', 'Tidy data principles']);
add('pandas', 'Time Series', 'Intermediate', 'Datetime-indexed data operations', ['pd.to_datetime(), pd.date_range', 'resample() for frequency', 'rolling() for windows']);

add('security', 'Rate Limiting', 'Intermediate', 'Limiting request rates', ['Token bucket, sliding window', '429 Too Many Requests', 'Redis-based rate limiting']);
add('security', 'Input Validation', 'Beginner', 'Validating user inputs', ['Whitelist vs blacklist', 'Sanitize on output', 'Context-specific validation']);
add('security', 'AuthN vs AuthZ', 'Beginner', 'Identity vs permissions', ['AuthN: who you are', 'AuthZ: what you can do', 'JWT for both']);

add('dbms', 'Denormalization', 'Intermediate', 'Read optimization with redundancy', ['Read perf, write cost', 'Data redundancy for speed', 'Used in data warehouses']);
add('dbms', 'Data Warehousing', 'Intermediate', 'Analytical database design', ['Star schema, snowflake schema', 'ETL vs ELT', 'OLTP vs OLAP']);
add('dbms', 'Sharding', 'Advanced', 'Horizontal partitioning', ['Hash-based, range-based', 'Consistent hashing', 'Cross-shard queries complex']);

add('oop', 'Law of Demeter', 'Intermediate', 'Principle of least knowledge', ['Only talk to immediate friends', 'Reduces coupling', 'Dont chain too deep']);
add('oop', 'Information Hiding', 'Beginner', 'Hiding implementation details', ['Private fields and methods', 'Public API surface', 'Encapsulation principle']);
add('oop', 'Polymorphism', 'Beginner', 'Many forms via overrides and overloading', ['Runtime: virtual dispatch', 'Compile-time: overloading', 'Interfaces for contract']);

add('os', 'Memory-Mapped Files', 'Intermediate', 'mmap() for file I/O', ['Pages loaded on demand', 'Shared memory for IPC', 'Faster than read/write']);
add('os', 'Context Switch Cost', 'Advanced', 'Performance cost of switching processes', ['TLB flush overhead', 'Cache pollution', 'Mode switch user/kernel']);
add('os', 'Interrupts vs Polling', 'Intermediate', 'CPU notification mechanisms', ['Interrupts: hardware signals', 'Polling: CPU checks', 'Interrupts efficient for rare']);

add('networks', 'ARP Protocol', 'Intermediate', 'IP to MAC address resolution', ['ARP cache, ARP spoofing', 'Broadcast request, unicast reply', 'IPv6 uses NDP']);
add('networks', 'TLS Handshake', 'Intermediate', 'Encrypted connection establishment', ['ClientHello, ServerHello, cert', '1-RTT for full handshake', 'TLS 1.3: 0-RTT']);
add('networks', 'Load Balancers', 'Intermediate', 'Distributing traffic across servers', ['Round Robin, Least Connections', 'Layer 4 vs Layer 7', 'Health checks']);

add('system-design', 'Service Discovery', 'Intermediate', 'Finding service instances dynamically', ['Client-side vs server-side', 'Consul, Eureka, etcd', 'Health checks + registry']);
add('system-design', 'Back-of-envelope Calc', 'Intermediate', 'Estimating capacity and QPS', ['QPS estimation from DAU', 'Storage per year', 'Bandwidth estimation']);
add('system-design', 'Database Scaling', 'Intermediate', 'Vertical vs horizontal scaling', ['Vertical: bigger machine', 'Horizontal: read replicas', 'CQRS pattern']);

// Extra rich topics (with code examples) as 2nd topic per course
var topic2 = {
  python: { name: 'Advanced Python', concepts: [
    ['Async/Await', 'Intermediate', 'Asynchronous programming', 'import asyncio\nasync def fetch(url):\n    async with aiohttp.ClientSession() as session:\n        async with session.get(url) as resp:\n            return await resp.text()'],
    ['Type Hints', 'Intermediate', 'Optional static type annotations', 'from typing import List, Optional\ndef process(items: List[int]) -> Optional[str]:\n    if not items: return None\n    return str(sum(items))'],
  ]},
  javascript: { name: 'JS Async & Security', concepts: [
    ['Web Workers', 'Advanced', 'Background thread scripts', 'const w = new Worker(\'worker.js\');\nw.postMessage({cmd:\'compute\'});\nw.onmessage = (e) => console.log(e.data);'],
    ['CORS', 'Intermediate', 'Cross-Origin Resource Sharing', 'Access-Control-Allow-Origin: https://example.com\nAccess-Control-Allow-Methods: GET, POST'],
  ]},
  java: { name: 'Java Features', concepts: [
    ['JDBC & Connection Pooling', 'Intermediate', 'Database connectivity', 'HikariConfig config = new HikariConfig();\nconfig.setJdbcUrl("jdbc:postgresql://localhost/db");\ntry (Connection c = ds.getConnection();\n    PreparedStatement s = c.prepareStatement("SELECT * FROM users WHERE id=?")) {\n    s.setInt(1, 42);\n}'],
    ['Serialization', 'Intermediate', 'Object byte stream conversion', 'class User implements Serializable {\n    private static final long serialVersionUID = 1L;\n    private transient String password;\n}'],
  ]},
  react: { name: 'React Patterns', concepts: [
    ['Error Boundaries', 'Intermediate', 'Catching render errors', 'class ErrorBoundary extends React.Component {\n    state = { hasError: false };\n    static getDerivedStateFromError() { return {hasError: true}; }\n    componentDidCatch(error, info) { logError(error, info); }\n    render() { return this.state.hasError ? <h1>Error</h1> : this.props.children; }\n}'],
    ['Portals', 'Intermediate', 'Render outside parent DOM', 'function Modal({children}) {\n    return ReactDOM.createPortal(<div className="modal">{children}</div>, document.getElementById(\'modal-root\'));\n}'],
  ]},
  sql: { name: 'Advanced SQL', concepts: [
    ['Window Functions', 'Advanced', 'Row calculations with OVER()', 'SELECT department, name, salary,\n    RANK() OVER (PARTITION BY department ORDER BY salary DESC) as rank\nFROM employees;'],
    ['CTE & Recursive', 'Intermediate', 'Temporary result sets', 'WITH RECURSIVE org AS (\n    SELECT id, name, 1 as lvl FROM employees WHERE manager_id IS NULL\n    UNION ALL\n    SELECT e.id, e.name, o.lvl+1 FROM employees e JOIN org o ON e.manager_id = o.id\n) SELECT * FROM org;'],
  ]},
  html: { name: 'HTML APIs', concepts: [
    ['Web Components', 'Advanced', 'Reusable custom elements', 'class MyBtn extends HTMLElement {\n    constructor() { super(); this.attachShadow({mode:\'open\'}); this.shadowRoot.innerHTML = `<button>Click</button>`; }\n}\ncustomElements.define(\'my-btn\', MyBtn);'],
    ['Canvas API', 'Intermediate', '2D graphics drawing', 'const ctx = c.getContext(\'2d\');\nctx.fillStyle = \'blue\';\nctx.fillRect(10,10,100,50);'],
  ]},
  css: { name: 'Modern CSS', concepts: [
    ['CSS Grid', 'Intermediate', '2D layout system', '.grid {\n    display: grid;\n    grid-template-columns: repeat(3, 1fr);\n    gap: 16px;\n}'],
    ['Custom Properties', 'Beginner', 'CSS variables', ':root { --primary: #007bff; }\n.btn { background: var(--primary); }'],
  ]},
  git: { name: 'Advanced Git', concepts: [
    ['Rebasing', 'Intermediate', 'Reapply commits on new base', 'git rebase -i HEAD~3\n# pick, reword, squash, fixup'],
    ['Cherry-pick', 'Intermediate', 'Apply specific commits', 'git cherry-pick abc1234'],
  ]},
  docker: { name: 'Docker Advanced', concepts: [
    ['Docker Compose', 'Intermediate', 'Multi-container definition', 'services:\n  web:\n    build: .\n    ports: ["3000:3000"]'],
    ['Multi-stage Builds', 'Intermediate', 'Smaller final images', 'FROM node:20 AS builder\nCOPY . .\nRUN npm run build\nFROM node:20-alpine\nCOPY --from=builder /app/dist ./dist'],
  ]},
  dsa: { name: 'More DSA', concepts: [
    ['Sliding Window', 'Intermediate', 'Window over array for subarray problems', 'function maxSum(arr, k) {\n    let s = 0, m = 0;\n    for (let i = 0; i < k; i++) s += arr[i];\n    m = s;\n    for (let i = k; i < arr.length; i++) {\n        s += arr[i] - arr[i-k];\n        m = Math.max(m, s);\n    }\n    return m;\n}'],
    ['Two Pointers', 'Intermediate', 'Pointers for efficient traversal', 'function isPalindrome(s) {\n    let l = 0, r = s.length - 1;\n    while (l < r) if (s[l++] !== s[r--]) return false;\n    return true;\n}'],
  ]},
  cpp: { name: 'Modern C++', concepts: [
    ['Smart Pointers', 'Intermediate', 'Auto memory management', 'auto p1 = make_unique<int>(42);\nauto p2 = move(p1);'],
    ['Move Semantics', 'Advanced', 'Resource transfer', 'class Buffer {\n    char* d;\npublic:\n    Buffer(Buffer&& o) noexcept : d(o.d) { o.d = nullptr; }\n    ~Buffer() { delete[] d; }\n};'],
  ]},
  typescript: { name: 'Advanced TS', concepts: [
    ['Utility Types', 'Intermediate', 'Built-in transformations', 'type PartialUser = Partial<User>;\ntype Preview = Pick<User, \'id\' | \'name\'>;'],
    ['Mapped Types', 'Advanced', 'Property transformation', 'type Readonly<T> = { readonly [K in keyof T]: T[K]; };'],
  ]},
  go: { name: 'Go Concurrency', concepts: [
    ['Goroutines & Channels', 'Intermediate', 'Lightweight concurrency', 'func worker(id int, jobs <-chan int, res chan<- int) {\n    for j := range jobs { res <- j * 2 }\n}\nfor w := 0; w < 3; w++ { go worker(w, jobs, res) }'],
    ['Context Package', 'Advanced', 'Deadlines and cancellation', 'ctx, cancel := context.WithTimeout(r.Context(), 5*time.Second)\ndefer cancel()'],
  ]},
  rust: { name: 'Rust Features', concepts: [
    ['Ownership & Borrowing', 'Intermediate', 'Memory management rules', 'let s = String::from("hello");\nlet s2 = s;  // moved\nfn borrow(s: &String) -> usize { s.len() }'],
    ['Traits', 'Intermediate', 'Shared behavior', 'trait Summary { fn summarize(&self) -> String; }\nimpl Summary for Article {\n    fn summarize(&self) -> String { format!("{}: {}", self.title, self.content) }\n}'],
  ]},
  mysql: { name: 'MySQL Advanced', concepts: [
    ['Indexing Strategies', 'Intermediate', 'Optimal index creation', 'CREATE INDEX idx_lastname ON employees(last_name);\nCREATE INDEX idx_dept_salary ON employees(department_id, salary);'],
    ['Partitioning', 'Advanced', 'Table splitting', 'CREATE TABLE orders (id INT, order_date DATE)\nPARTITION BY RANGE (YEAR(order_date)) (\n    PARTITION p2022 VALUES LESS THAN (2023),\n    PARTITION p_future VALUES LESS THAN MAXVALUE\n);'],
  ]},
  linux: { name: 'Linux Advanced', concepts: [
    ['Systemd', 'Intermediate', 'Init system for services', 'systemctl start nginx\nsystemctl enable nginx\njournalctl -u nginx -f'],
    ['Shell Scripting', 'Intermediate', 'Bash programming', '#!/bin/bash\nset -euo pipefail\nfor f in /var/log/*.log; do\n    echo "Processing $f"\ndone'],
  ]},
  mongodb: { name: 'MongoDB Advanced', concepts: [
    ['Aggregation Pipeline', 'Intermediate', 'Data processing pipeline', 'db.orders.aggregate([\n    {$match: {status:"completed"}},\n    {$group: {_id:"$customer_id", total:{$sum:"$amount"}}},\n])'],
    ['Index Types', 'Intermediate', 'Various index types', 'db.users.createIndex({email:1}, {unique:true})\ndb.articles.createIndex({title:"text", body:"text"})'],
  ]},
  c: { name: 'C Advanced', concepts: [
    ['Pointers & Memory', 'Intermediate', 'Direct memory access', 'int *p = malloc(10 * sizeof(int));\np[0] = 42;\nfree(p);\np = NULL;'],
    ['Function Pointers', 'Intermediate', 'Storing function addresses', 'int add(int a, int b) { return a+b; }\nint op(int (*fn)(int,int), int x, int y) { return fn(x,y); }'],
  ]},
  csharp: { name: 'Advanced C#', concepts: [
    ['Async/Await', 'Intermediate', 'Task-based async', 'async Task<string> FetchAsync(string url) {\n    using var c = new HttpClient();\n    return await c.GetStringAsync(url);\n}'],
    ['Delegates & Events', 'Intermediate', 'Type-safe function pointers', 'public delegate void Handler(string m);\nFunc<int,int,int> add = (a,b) => a+b;'],
  ]},
  kotlin: { name: 'Kotlin Features', concepts: [
    ['Coroutines', 'Intermediate', 'Lightweight concurrency', 'suspend fun fetch(id: Int): String {\n    delay(1000)\n    return api.get(id)\n}\nfun main() = runBlocking {\n    val r = async { fetch(1) }\n    println(r.await())\n}'],
    ['Sealed Classes', 'Intermediate', 'Restricted class hierarchies', 'sealed class State {\n    data class Success(val d: String): State()\n    object Loading: State()\n}'],
  ]},
  swift: { name: 'Swift Advanced', concepts: [
    ['ARC', 'Intermediate', 'Automatic Reference Counting', 'class Person {\n    var apt: Apartment?\n    deinit { print("gone") }\n}\nclass Apartment {\n    weak var tenant: Person?\n}'],
    ['POP', 'Intermediate', 'Protocol-Oriented Programming', 'protocol Drawable { var area: Double { get } }\nextension Drawable { func draw() { print("drawing") } }'],
  ]},
  pandas: { name: 'Advanced Pandas', concepts: [
    ['GroupBy', 'Intermediate', 'Split-apply-combine', 'df.groupby(\'dept\')[\'salary\'].agg([\'mean\', \'sum\'])'],
    ['Merge, Join & Concat', 'Intermediate', 'Combining DataFrames', 'inner = pd.merge(df1, df2, on=\'id\')\npd.concat([df1, df2], ignore_index=True)'],
  ]},
  security: { name: 'Security Concepts', concepts: [
    ['SQL Injection Prevention', 'Intermediate', 'SQL injection protection', 'const {rows} = await pool.query(\'SELECT * FROM users WHERE name = $1\', [userInput]);'],
    ['OAuth 2.0', 'Intermediate', 'Authorization framework', 'GET /authorize?response_type=code&client_id=X&redirect_uri=Y'],
  ]},
  dbms: { name: 'Advanced DBMS', concepts: [
    ['ACID Properties', 'Intermediate', 'Transaction reliability', 'BEGIN;\nUPDATE accounts SET balance = balance - 100 WHERE id = 1;\nCOMMIT;'],
    ['Normalization', 'Intermediate', 'Reducing redundancy', '-- 1NF: atomic values\n-- 2NF: no partial dependency\n-- 3NF: no transitive dependency'],
  ]},
  oop: { name: 'More OOP', concepts: [
    ['SOLID Principles', 'Intermediate', 'Five OOP design principles', '// S: single responsibility\n// O: open for extension\n// L: Liskov substitution\n// I + D: ISP + DIP'],
    ['Design Patterns (Creational)', 'Intermediate', 'Singleton, Factory, Builder', 'class Singleton {\n    static #inst;\n    constructor() { if (Singleton.#inst) return Singleton.#inst; Singleton.#inst = this; }\n}'],
  ]},
  os: { name: 'Advanced OS', concepts: [
    ['Process Scheduling', 'Intermediate', 'CPU scheduling algorithms', '// FCFS, SJF, Round Robin, MFQ\n// Metrics: throughput, turnaround, response time'],
    ['Memory Paging', 'Advanced', 'Virtual memory management', '// Page table: virtual -> physical\n// TLB caches translations\n// Multi-level page table'],
  ]},
  networks: { name: 'Advanced Networking', concepts: [
    ['TCP vs UDP', 'Intermediate', 'Transport protocol comparison', '// TCP: reliable, ordered, connection-oriented\n// UDP: fast, connectionless\n// QUIC: UDP-based reliable'],
    ['DNS', 'Intermediate', 'Domain Name System', '// dig example.com A\n// Root -> TLD -> Authoritative\n// Records: A, AAAA, CNAME, MX'],
  ]},
  system: { name: 'System Design Patterns', concepts: [
    ['CAP Theorem', 'Intermediate', 'Consistency, Availability, Partition Tolerance', '// Pick 2 of 3\n// CP: HBase, etcd\n// AP: Cassandra, DynamoDB'],
    ['Caching Strategies', 'Intermediate', 'Cache-aside, write-through, write-behind', '// Cache-aside: check, miss -> load\n// Write-through: cache + DB\n// TTL + LRU for eviction'],
  ]},
};

// Insert concepts into first topic of each course
var courses = Object.keys(courseConcepts);
courses.sort().reverse();

courses.forEach(function(courseId) {
  var concepts = courseConcepts[courseId];
  var courseStart = "  '" + courseId + "': {";
  var pos = src.indexOf(courseStart);
  if (pos < 0) { console.log('NF: ' + courseId); return; }

  // Find first topic's concepts array close: "\n      ]},"
  var firstTopicClose = src.indexOf("\n      ]},", pos + courseStart.length);
  if (firstTopicClose < 0) { console.log('NC: ' + courseId); return; }
  firstTopicClose++; // skip past the \n

  var conceptsText = concepts.map(function(c) {
    var parts = ["        { term: '" + esc(c.term) + "', difficulty: '" + c.diff + "',",
        "            definition: '" + esc(c.def) + "',"];
    if (c.code) parts.push("            codeExample: '" + esc(c.code) + "',");
    parts.push("            keyPoints: " + JSON.stringify(c.kps));
    parts.push("        }");
    return parts.join('\n');
  }).join(',\n');

  // Insert before the "      ]},"
  src = src.slice(0, firstTopicClose) + ',\n' + conceptsText + '\n      ' + src.slice(firstTopicClose);
  console.log('OK: ' + courseId + ' (+' + concepts.length + ')');
});

// Add 2nd topics
var t2Courses = Object.keys(topic2);
t2Courses.sort().reverse();

t2Courses.forEach(function(courseId) {
  var t2 = topic2[courseId];
  // The courseId in topic2 may differ from interview-data key
  var actualId = courseId === 'system' ? 'system-design' : courseId;
  var courseStart = "  '" + actualId + "': {";
  var pos = src.indexOf(courseStart);
  if (pos < 0) { console.log('T2 NF: ' + actualId); return; }

  var closeMarker = "    ]\n  },";
  var closePos = src.indexOf(closeMarker, pos + courseStart.length);
  if (closePos < 0) {
    closeMarker = "    ]\n  }";
    closePos = src.lastIndexOf(closeMarker);
    if (closePos < 0 || closePos < pos) { console.log('T2 NC: ' + actualId); return; }
  }

  var conceptsText = t2.concepts.map(function(c) {
    var parts = ["        { term: '" + esc(c[0]) + "', difficulty: '" + c[1] + "',",
        "            definition: '" + esc(c[2]) + "',"];
    if (c[3]) parts.push("            codeExample: '" + esc(c[3]) + "',");
    parts.push("            keyPoints: []");
    parts.push("        }");
    return parts.join('\n');
  }).join(',\n');
  var newBlock = "      { name: '" + esc(t2.name) + "', concepts: [\n" + conceptsText + "\n      ]},";
  src = src.slice(0, closePos - 1) + ',\n' + newBlock + '\n' + src.slice(closePos);
  console.log('T2 OK: ' + actualId);
});

fs.writeFileSync(__dirname + '/interview-data.js', src, 'utf8');
console.log('DONE');
