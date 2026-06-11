var fs = require('fs');
var src = fs.readFileSync(__dirname + '/interview-data.js', 'utf8');

function esc(s) { return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n'); }

function makeConcept(term, difficulty, definition, extra) {
  var ex = extra || {};
  var parts = ["        { term: '" + esc(term) + "', difficulty: '" + difficulty + "',"];
  parts.push("            definition: '" + esc(definition) + "',");
  if (ex.codeExample) parts.push("            codeExample: '" + esc(ex.codeExample) + "',");
  if (ex.keyPoints) parts.push("            keyPoints: " + JSON.stringify(ex.keyPoints));
  parts.push("        }");
  return parts.join('\n');
}

var extras = {
  'python': [
    ['Python\'s `__slots__`', 'Advanced', 'Reducing memory usage by preventing __dict__ creation', {codeExample: 'class Point:\n    __slots__ = (\'x\', \'y\')\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n# No __dict__ allowed: point.z raises AttributeError', keyPoints: ['Reduces memory per instance', 'Faster attribute access', 'No __dict__ created', 'Useful for many instances']}],
    ['Abstract Base Classes (ABC)', 'Intermediate', 'Defining interfaces with ABC', {codeExample: 'from abc import ABC, abstractmethod\nclass Shape(ABC):\n    @abstractmethod\n    def area(self): pass\nclass Circle(Shape):\n    def __init__(self, r): self.r = r\n    def area(self): return 3.14 * self.r ** 2', keyPoints: ['ABC enforces method implementation', '@abstractmethod decorator', 'Cannot instantiate ABC directly']}],
    ['Property Decorator', 'Intermediate', 'Getters/setters with @property', {codeExample: 'class Person:\n    def __init__(self, name):\n        self._name = name\n    @property\n    def name(self): return self._name\n    @name.setter\n    def name(self, v):\n        if not isinstance(v, str): raise TypeError\n        self._name = v', keyPoints: ['@property for computed/getter', '@setter for validation', 'Encapsulation with property syntax']}],
  ],
  'javascript': [
    ['Generator Functions', 'Intermediate', 'Functions yielding values lazily', {codeExample: 'function* fibonacci() {\n    let [a, b] = [0, 1];\n    while (true) {\n        yield a;\n        [a, b] = [b, a + b];\n    }\n}\nfor (const n of fibonacci()) { if (n > 100) break; console.log(n); }', keyPoints: ['function* with yield', 'Lazy evaluation', 'Next(), return(), throw()']}],
    ['Proxy & Reflect', 'Advanced', 'Intercepting operations on objects', {codeExample: 'const handler = {\n    get(target, prop) {\n        if (prop in target) return target[prop];\n        return "default";\n    },\n    set(target, prop, value) {\n        if (prop === \'age\' && (typeof value !== \'number\' || value < 0)) throw Error();\n        target[prop] = value;\n        return true;\n    }\n};\nconst p = new Proxy({}, handler);', keyPoints: ['Proxy: traps for get/set/delete/apply', 'Reflect: default behavior', 'Used for validation, logging, reactivity']}],
  ],
  'java': [
    ['Optional Class', 'Intermediate', 'Container for nullable values', {codeExample: 'Optional<String> name = Optional.ofNullable(getName());\nString result = name.orElse("default");\nname.ifPresent(System.out::println);\nString upper = name.map(String::toUpperCase).orElse("N/A");', keyPoints: ['Avoids null checks', 'map, flatMap, filter, ifPresent', 'orElse, orElseGet, orElseThrow']}],
    ['CompletableFuture', 'Advanced', 'Async programming with Future composition', {codeExample: 'CompletableFuture.supplyAsync(() -> fetchData())\n    .thenApply(data -> process(data))\n    .thenAccept(result -> save(result))\n    .exceptionally(err -> { log(err); return null; });', keyPoints: ['supplyAsync for async tasks', 'thenApply/thenAccept for chaining', 'exceptionally for error handling', 'allOf/anyOf for composition']}],
  ],
  'react': [
    ['StrictMode', 'Beginner', 'Development mode checks for potential problems', {codeExample: '<React.StrictMode>\n    <App />\n</React.StrictMode>', keyPoints: ['Double-invokes effects in dev', 'Detects unsafe lifecycles', 'No runtime impact in production']}],
    ['Context API', 'Intermediate', 'Prop drilling alternative for shared state', {codeExample: 'const Theme = React.createContext(\'light\');\nfunction App() {\n    return <Theme.Provider value="dark"><Toolbar /></Theme.Provider>;\n}\nfunction Toolbar() { const t = useContext(Theme); return <div>{t}</div>; }', keyPoints: ['Provider/Consumer pattern', 'useContext for consumption', 'Avoid overuse (performance)']}],
  ],
  'sql': [
    ['COALESCE & NULLIF', 'Intermediate', 'NULL handling functions', {codeExample: 'SELECT COALESCE(middle_name, \'\') AS middle_name\nSELECT NULLIF(a, b) -- returns NULL if a=b else a', keyPoints: ['COALESCE: first non-null', 'NULLIF: equality becomes null', 'Use for clean defaults']}],
    ['CASE Expression', 'Beginner', 'Conditional logic in SQL', {codeExample: 'SELECT name,\n    CASE\n        WHEN salary > 80000 THEN \'high\'\n        WHEN salary > 50000 THEN \'mid\'\n        ELSE \'low\'\n    END AS bracket\nFROM employees;', keyPoints: ['CASE WHEN ... THEN ... ELSE ... END', 'Search vs simple CASE', 'Can appear in SELECT, WHERE, ORDER BY']}],
  ],
  'html': [
    ['Picture & Source', 'Intermediate', 'Responsive images with art direction', {codeExample: '<picture>\n    <source media="(min-width: 1024px)" srcset="large.jpg">\n    <source media="(min-width: 768px)" srcset="medium.jpg">\n    <img src="small.jpg" alt="responsive">\n</picture>', keyPoints: ['Art direction per breakpoint', 'WebP with fallback', 'srcset for resolution switching']}],
    ['Template Element', 'Intermediate', 'Browser-side HTML templates', {codeExample: '<template id="card">\n    <div class="card"><h2></h2><p></p></div>\n</template>\n<script>\n    const t = document.getElementById(\'card\');\n    const clone = t.content.cloneNode(true);\n    clone.querySelector(\'h2\').textContent = "Title";\n    document.body.appendChild(clone);\n</script>', keyPoints: ['Inert until cloned', 'content property for DocumentFragment', 'Used in Web Components']}],
  ],
  'css': [
    ['CSS Variables with calc()', 'Beginner', 'Dynamic calculations with variables', {codeExample: ':root { --base: 16px; --ratio: 1.5; }\nh1 { font-size: calc(var(--base) * var(--ratio) * var(--ratio)); }\n.box { width: calc(100% - var(--spacing) * 2); }', keyPoints: ['calc() for runtime math', 'Combine with var() for theming', 'Mixed units: calc(100% - 20px)']}],
    ['Container Queries', 'Intermediate', 'Styling based on container size', {codeExample: '.card-container { container-type: inline-size; }\n@container (min-width: 400px) {\n    .card { display: grid; grid-template-columns: 1fr 2fr; }\n}', keyPoints: ['Query container size not viewport', 'container-type: inline-size', 'Components that adapt to their parent']}],
  ],
  'git': [
    ['Git Aliases', 'Beginner', 'Shortcuts for common git commands', {codeExample: 'git config --global alias.co checkout\ngit config --global alias.br branch\ngit config --global alias.st status\ngit config --global alias.lg "log --graph --oneline --all"', keyPoints: ['Save typing with aliases', 'Per-user or per-repo', 'Complex commands as aliases']}],
    ['Submodules', 'Intermediate', 'Including other repos within a repo', {codeExample: 'git submodule add https://github.com/lib/lib.git libs/lib\ngit submodule update --init --recursive\ngit clone --recurse-submodules https://github.com/my/project.git', keyPoints: ['Pinned to specific commit', 'Need --recursive for clone', 'Updates need manual commit']}],
  ],
  'docker': [
    ['Docker Context & Multi-Arch', 'Intermediate', 'Building for multiple architectures', {codeExample: 'docker buildx create --use\ndocker buildx build --platform linux/amd64,linux/arm64 --push -t user/app:latest .\ndocker manifest inspect user/app:latest', keyPoints: ['buildx for multi-arch builds', '--platform flag for target', 'ARM64 + AMD64 images']}],
    ['Docker Swarm', 'Intermediate', 'Native Docker orchestration', {codeExample: 'docker swarm init\ndocker service create --name web --replicas 3 -p 80:80 nginx\ndocker service scale web=5\ndocker stack deploy -c docker-compose.yml myapp', keyPoints: ['Swarm: built-in orchestration', 'Services vs containers', 'Stacks from compose files']}],
  ],
  'dsa': [
    ['Binary Search', 'Intermediate', 'Finding element in sorted array in O(log n)', {codeExample: 'function binarySearch(arr, target) {\n    let l = 0, r = arr.length - 1;\n    while (l <= r) {\n        const m = Math.floor((l + r) / 2);\n        if (arr[m] === target) return m;\n        if (arr[m] < target) l = m + 1;\n        else r = m - 1;\n    }\n    return -1;\n}', keyPoints: ['O(log n) time', 'Requires sorted array', 'Lower/upper bound variants']}],
    ['Merge Sort', 'Intermediate', 'Divide-and-conquer sorting O(n log n)', {codeExample: 'function mergeSort(arr) {\n    if (arr.length <= 1) return arr;\n    const m = Math.floor(arr.length / 2);\n    const l = mergeSort(arr.slice(0, m));\n    const r = mergeSort(arr.slice(m));\n    return merge(l, r);\n}\nfunction merge(l, r) {\n    const res = [];\n    while (l.length && r.length) res.push(l[0] < r[0] ? l.shift() : r.shift());\n    return [...res, ...l, ...r];\n}', keyPoints: ['O(n log n), stable', 'O(n) auxiliary space', 'Divide and conquer']}],
  ],
  'cpp': [
    ['Virtual Functions & VTable', 'Advanced', 'Polymorphism through virtual dispatch', {codeExample: 'class Base {\npublic:\n    virtual void speak() { cout << "base\\n"; }\n    virtual ~Base() = default;\n};\nclass Derived : public Base {\npublic:\n    void speak() override { cout << "derived\\n"; }\n};\nBase* b = new Derived();\nb->speak();  // "derived"', keyPoints: ['virtual keyword enables polymorphism', 'VTable: array of function pointers', 'Override with override keyword', 'Virtual destructor for proper cleanup']}],
    ['Operator Overloading', 'Intermediate', 'Custom operators for user-defined types', {codeExample: 'class Vector {\npublic:\n    int x, y;\n    Vector operator+(const Vector& o) const { return {x+o.x, y+o.y}; }\n    Vector& operator+=(const Vector& o) { x+=o.x; y+=o.y; return *this; }\n    bool operator==(const Vector& o) const { return x==o.x && y==o.y; }\n};', keyPoints: ['++, +, -, *, ==, << can be overloaded', 'Preserve expected semantics', 'Some operators cannot (::, ., ?:)']}],
  ],
  'typescript': [
    ['Tuple Types', 'Beginner', 'Fixed-length arrays with typed positions', {codeExample: 'type Point = [number, number];\nconst p: Point = [10, 20];\ntype NamedPoint = [string, number, number];\nconst np: NamedPoint = ["origin", 0, 0];\n// Variadic tuples\ntype StrNum<Rest extends unknown[]> = [string, ...Rest];', keyPoints: ['Fixed length and types per position', 'Optional elements with ?', 'Variadic with ...rest']}],
    ['Branded Types', 'Advanced', 'Nominal typing simulation with brands', {codeExample: 'type Brand<T, B> = T & { __brand: B };\ntype UserId = Brand<string, "UserId">;\ntype OrderId = Brand<string, "OrderId">;\nfunction getUser(id: UserId) {}\ngetUser("abc" as UserId);  // OK\n// getUser("abc");  // Error', keyPoints: ['Structural typing workaround', 'Compile-time type safety', 'Zero runtime cost']}],
  ],
  'go': [
    ['Defer, Panic, Recover', 'Intermediate', 'Deferred execution and error recovery', {codeExample: 'func readFile(name string) (data []byte, err error) {\n    f, err := os.Open(name)\n    if err != nil { return nil, err }\n    defer f.Close()  // runs on return\n    defer func() {\n        if r := recover(); r != nil { err = fmt.Errorf("panic: %v", r) }\n    }()\n    return io.ReadAll(f)\n}', keyPoints: ['defer: LIFO, for cleanup', 'panic: runtime error', 'recover: catch panic in deferred']}],
    ['Reflection', 'Advanced', 'Inspecting types and values at runtime', {codeExample: 'import "reflect"\nfunc inspect(v interface{}) {\n    t := reflect.TypeOf(v)\n    fmt.Println("Type:", t.Name())\n    if t.Kind() == reflect.Struct {\n        for i := 0; i < t.NumField(); i++ {\n            f := t.Field(i)\n            fmt.Printf("  %s: %s\\n", f.Name, f.Type)\n        }\n    }\n}', keyPoints: ['reflect.TypeOf and reflect.ValueOf', 'Kind() for underlying type', 'Can read struct tags']}],
  ],
  'rust': [
    ['Iterators & Closures', 'Intermediate', 'Composing data transformations', {codeExample: 'let v: Vec<i32> = vec![1,2,3,4,5];\nlet result: Vec<i32> = v.iter()\n    .filter(|x| *x % 2 == 0)\n    .map(|x| x * x)\n    .collect();\n// Lazy: nothing executes until collect()', keyPoints: ['Iterators are lazy', 'Adaptors: map, filter, take, skip', 'Consumers: collect, sum, count']}],
    ['Concurrency (Send + Sync)', 'Advanced', 'Thread safety marker traits', {codeExample: '// Send: ownership can be transferred between threads\n// Sync: reference can be shared between threads\n// Most types auto-implement\n// Rc: !Send, Arc: Send + Sync\n// Mutex: Sync (across threads)\n// Cell: !Sync (single-thread)\nuse std::sync::{Arc, Mutex};\nlet counter = Arc::new(Mutex::new(0));\nlet c = counter.clone();\nstd::thread::spawn(move || { *c.lock().unwrap() += 1; });', keyPoints: ['Send: move across threads', 'Sync: share reference across threads', 'Arc for shared ownership, Mutex for mutation']}],
  ],
  'mysql': [
    ['JSON Data Type', 'Intermediate', 'JSON support in MySQL', {codeExample: 'CREATE TABLE events (\n    id INT PRIMARY KEY,\n    data JSON\n);\nINSERT INTO events VALUES (1, \'{"user": "john", "action": "login"}\');\nSELECT data->>"$.user" FROM events WHERE JSON_EXTRACT(data, "$.action") = "login"', keyPoints: ['JSON column with validation', 'Path expressions: $.key', 'JSON indexes via generated columns']}],
    ['Performance Schema', 'Advanced', 'MySQL performance monitoring', {codeExample: 'SELECT * FROM performance_schema.events_statements_summary_by_digest\nORDER BY sum_timer_wait DESC LIMIT 10;\n\nSHOW STATUS LIKE \'Threads_connected\';\nSHOW VARIABLES LIKE \'max_connections\';\nSHOW ENGINE INNODB STATUS\\G', keyPoints: ['Performance schema for query analysis', 'SHOW STATUS for metrics', 'InnoDB status for lock info']}],
  ],
  'linux': [
    ['Disk Management (fdisk, mount)', 'Intermediate', 'Managing disks and filesystems', {codeExample: 'sudo fdisk -l\nsudo mkfs.ext4 /dev/sdb1\nsudo mount /dev/sdb1 /mnt/data\nsudo blkid\n# /etc/fstab entry:\nUUID=xxx /mnt/data ext4 defaults 0 2\ndf -h\ndu -sh *', keyPoints: ['fdisk for partition management', 'mkfs creates filesystem', 'mount/umount for access', 'fstab for auto-mount']}],
    ['Package Management (apt, yum)', 'Beginner', 'Installing and managing software', {codeExample: 'sudo apt update\nsudo apt install -y nginx\nsudo apt remove nginx\nsudo apt autoremove\n# RPM-based:\nsudo yum install nginx\nsudo dnf install nginx', keyPoints: ['apt for Debian/Ubuntu', 'yum/dnf for RHEL/Fedora', 'Update index before install']}],
  ],
  'mongodb': [
    ['Text Search', 'Intermediate', 'Full-text search with text indexes', {codeExample: 'db.articles.createIndex({title: "text", body: "text"})\ndb.articles.find(\n    {$text: {$search: "mongodb indexing"}},\n    {score: {$meta: "textScore"}}\n).sort({score: {$meta: "textScore"}})', keyPoints: ['Text index for multiple fields', '$text query operator', 'textScore for relevance sorting', 'Excludes stop words, stems']}],
    ['Validation', 'Intermediate', 'Document schema validation', {codeExample: 'db.createCollection("users", {\n    validator: {\n        $jsonSchema: {\n            bsonType: "object",\n            required: ["name", "email"],\n            properties: {\n                name: { bsonType: "string" },\n                email: { bsonType: "string", pattern: "^.+@.+$" },\n                age: { bsonType: "int", minimum: 0 }\n            }\n        }\n    },\n    validationAction: "error"\n})', keyPoints: ['$jsonSchema for validation', 'Requires field types', 'validationAction: warn or error']}],
  ],
  'c': [
    ['Linked List Implementation', 'Intermediate', 'Singly/doubly linked list in C', {codeExample: 'struct Node { int data; struct Node* next; };\nstruct Node* head = NULL;\n\nvoid insert(int val) {\n    struct Node* n = malloc(sizeof(struct Node));\n    n->data = val; n->next = head;\n    head = n;\n}\n\nvoid delete(int val) {\n    struct Node **cur = &head;\n    while (*cur && (*cur)->data != val) cur = &(*cur)->next;\n    if (*cur) { struct Node* tmp = *cur; *cur = tmp->next; free(tmp); }\n}', keyPoints: ['Dynamic nodes with malloc/free', 'Pointer-to-pointer for delete', 'O(n) search and delete']}],
    ['Macro vs Inline Function', 'Intermediate', 'Compile-time substitution comparison', {codeExample: '#define SQUARE(x) ((x)*(x))\n// Problem: SQUARE(++x) expands to ((++x)*(++x))\n\nstatic inline int square(int x) { return x * x; }\n// Safe: arguments evaluated once\n// Type checking, debugging support', keyPoints: ['Macros: text substitution, no type check', 'Inline: type-safe, single evaluation', 'Prefer inline over macro for functions']}],
  ],
  'csharp': [
    ['Records', 'Intermediate', 'Immutable reference types with value semantics', {codeExample: 'public record Person(string Name, int Age);\nvar p1 = new Person("John", 30);\nvar p2 = p1 with { Age = 31 };  // non-destructive mutation\n// Auto: equality, ToString, GetHashCode, Deconstruct\n// Positional records: primary constructor properties', keyPoints: ['Immutable by default', 'Value-based equality', 'with expression for cloning', 'Deconstruct for pattern matching']}],
    ['Pattern Matching', 'Intermediate', 'Expressive pattern matching in C#', {codeExample: 'switch (shape) {\n    case Circle { Radius: > 0 } c:\n        return c.Area;\n    case Rectangle { Width: > 0, Height: > 0 } r:\n        return r.Area;\n    case null:\n        return 0;\n    default:\n        throw new ArgumentException();\n}\n// Property patterns, tuple patterns, list patterns', keyPoints: ['Type patterns, property patterns', 'Discard _ for anything', 'Relational patterns (> , <)', 'List patterns (C# 11)']}],
  ],
  'kotlin': [
    ['Scope Functions', 'Intermediate', 'let, apply, also, run, with', {codeExample: 'val result = person?.let { process(it) }\nval config = Person().apply {\n    name = "John"\n    age = 30\n}\nrun { println("computation: ${1+2}") }\n"hello".also { println(it) }', keyPoints: ['let: context as it, returns lambda result', 'apply: context as this, returns context', 'also: context as it, returns context', 'run: context as this, returns lambda result']}],
    ['Inline & Reified', 'Advanced', 'Performance optimization with inline functions', {codeExample: 'inline fun <reified T> checkType(x: Any): Boolean {\n    return x is T  // reified allows is check\n}\n\ninline fun measure(block: () -> Unit) {\n    val start = System.nanoTime()\n    block()\n    println("took ${System.nanoTime() - start}ns")\n}', keyPoints: ['inline: eliminates function call overhead', 'reified: access type at runtime', 'crossinline for non-local returns']}],
  ],
  'swift': [
    ['Key Paths', 'Advanced', 'Type-safe references to properties', {codeExample: 'struct Person { let name: String; let age: Int }\nlet nameKeyPath = \\Person.name\nlet p = Person(name: "John", age: 30)\nlet name = p[keyPath: nameKeyPath]\n// WritableKeyPath for mutable\n// Collection sorting:\npeople.sorted(by: \\Person.name)', keyPoints: ['Type-safe property references', '\\Type.property syntax', 'DynamicMemberLookup for dynamic']}],
    ['Codable', 'Intermediate', 'JSON encoding/decoding', {codeExample: 'struct User: Codable {\n    let name: String\n    let age: Int\n}\nlet json = \'{"name":"John","age":30}\'.data(using: .utf8)!\nlet user = try JSONDecoder().decode(User.self, from: json)\nlet data = try JSONEncoder().encode(user)', keyPoints: ['Automatic conformance for all properties Codable', 'Custom CodingKeys for mapping', 'JSONEncoder/JSONDecoder']}],
  ],
  'pandas': [
    ['MultiIndex', 'Intermediate', 'Hierarchical indexing', {codeExample: 'arrays = [[\'A\', \'A\', \'B\', \'B\'], [1, 2, 1, 2]]\nidx = pd.MultiIndex.from_arrays(arrays)\ndf = pd.DataFrame({\'val\': [10, 20, 30, 40]}, index=idx)\ndf.loc[\'A\']  # select first level\n# xs for cross-section\ndf.xs(1, level=1)', keyPoints: ['Multiple index levels', 'xs() for cross-section', 'Useful for grouped/panel data']}],
    ['Performance Optimization', 'Advanced', 'Speeding up pandas operations', {codeExample: '# Use vectorized operations\n# Avoid iterrows\n# Use .loc instead of chained indexing\n# Specify dtypes: df[col] = df[col].astype(\'category\')\n# Use query for filtering: df.query(\'age > 30 & city == "NYC"\')\n# Use eval for compute: df.eval(\'total = price * qty\')\n# Parquet format for IO', keyPoints: ['Vectorized > apply > iterrows', 'Specify dtypes (category, float32)', 'query/eval for expression eval', 'Parquet for efficient storage']}],
  ],
  'security': [
    ['OIDC (OpenID Connect)', 'Intermediate', 'Identity layer on OAuth 2.0', {codeExample: '// ID Token (JWT):\n{\n  "iss": "https://accounts.google.com",\n  "sub": "1234567890",\n  "aud": "client_id",\n  "exp": 1311281970,\n  "iat": 1311280970,\n  "email": "user@example.com"\n}\n// Verify: validate signature, iss, aud, exp', keyPoints: ['ID token (JWT) for authentication', 'Access token for authorization', 'Standard scopes: openid, profile, email']}],
    ['Secrets Management', 'Intermediate', 'Storing and accessing secrets securely', {codeExample: '# .env file (never commit):\nDB_PASSWORD=xxx\n# Vault:\nvault kv put secret/myapp password=xxx\n# Environment variables:\nexport DB_PASSWORD=$(vault kv get -field=password secret/myapp)\n# Cloud: AWS Secrets Manager, GCP Secret Manager, Azure Key Vault', keyPoints: ['Never hardcode secrets', 'Vault for centralized secrets', 'Environment vars for runtime', 'Cloud provider secret managers']}],
  ],
  'dbms': [
    ['Query Optimization', 'Intermediate', 'Techniques for faster queries', {codeExample: '-- Use EXPLAIN to check plan\n-- Avoid SELECT *\n-- Use EXISTS over IN for subqueries\n-- Index columns used in WHERE, JOIN, ORDER BY\n-- Avoid functions in WHERE: WHERE YEAR(date) = 2024 -> bad\n-- Instead: WHERE date >= \'2024-01-01\' AND date < \'2025-01-01\'\n-- Use covering indexes', keyPoints: ['EXPLAIN to understand plans', 'Index for WHERE/JOIN/ORDER BY', 'Sargable predicates avoid functions', 'Covering index avoids table access']}],
    ['CAP Theorem & BASE', 'Intermediate', 'Distributed database trade-offs', {codeExample: '// CAP: Consistency, Availability, Partition tolerance\n// Pick 2\n// CA: SQL databases (single node)\n// CP: HBase, MongoDB (with strict consistency)\n// AP: Cassandra, CouchDB\n\n// ACID: Atomicity, Consistency, Isolation, Durability\n// BASE: Basically Available, Soft state, Eventually consistent\n// NoSQL typically BASE, SQL typically ACID', keyPoints: ['CAP: choose 2 of 3', 'ACID vs BASE trade-off', 'Eventual consistency for high availability']}],
  ],
  'oop': [
    ['Multiple Inheritance (Diamond Problem)', 'Advanced', 'Resolving ambiguous method resolution', {codeExample: '// C++: virtual inheritance solves\nclass A { public: void foo(); };\nclass B : public virtual A {};\nclass C : public virtual A {};\nclass D : public B, public C {};\n// D::foo() resolves to A::foo()\n\n// Java/C#: interfaces only (no diamond)\n// Python: MRO (C3 linearization)\nclass A: pass\nclass B(A): pass\nclass C(A): pass\nclass D(B, C): pass\n# D.__mro__ = (D, B, C, A)', keyPoints: ['Diamond: D inherits B, C from A', 'Virtual inheritance solves (C++)', 'MRO in Python (C3 linearization)', 'No multiple inheritance in Java/C#']}],
    ['MVC Architecture', 'Intermediate', 'Model-View-Controller pattern', {codeExample: '// Model: data + business logic\nclass UserModel {\n    constructor() { this.users = []; }\n    add(n) { this.users.push(n); this.notify(); }\n}\n// View: UI rendering\nclass UserView { render(users) { users.forEach(u => console.log(u)); } }\n// Controller: handles input\nclass UserController {\n    constructor(m, v) { this.model = m; this.view = v; }\n    addUser(name) { this.model.add(name); this.view.render(this.model.users); }\n}', keyPoints: ['Model: data and logic', 'View: presentation', 'Controller: input handling', 'Separation of concerns']}],
  ],
  'os': [
    ['Filesystem Hierarchy (FHS)', 'Beginner', 'Standard Linux directory layout', {codeExample: '/bin  - essential user binaries\n/boot - boot loader files\n/dev  - device files\n/etc  - configuration files\n/home - user home directories\n/lib  - shared libraries\n/proc - process info (virtual)\n/root - root user home\n/sbin - system binaries\n/tmp  - temporary files\n/usr  - user programs and data\n/var  - variable data (logs, spools)', keyPoints: ['Rooted tree structure', 'Virtual filesystems: /proc, /sys', '/usr for shareable data', '/var for changing data']}],
    ['Buffer Overflow', 'Advanced', 'Memory safety vulnerability and prevention', {codeExample: '// Vulnerable code:\nvoid vuln(char *str) {\n    char buf[64];\n    strcpy(buf, str);  // no bounds check!\n}\n\n// Prevention:\n// 1. Stack canaries\n// 2. ASLR (Address Space Layout Randomization)\n// 3. NX bit (non-executable stack)\n// 4. Safe functions: strncpy, snprintf\n// 5. Memory-safe languages (Rust, Go)\n// 6. Compiler flags: -fstack-protector', keyPoints: ['Writing past buffer corrupts stack', 'ROP for bypassing NX', 'Stack canaries detect overflows', 'ASLR randomizes addresses']}],
  ],
  'networks': [
    ['CDN & Edge Computing', 'Intermediate', 'Content delivery networks and edge functions', {codeExample: '// CDN: cache content at edge\n// - Static: images, CSS, JS\n// - Dynamic: personalized (limited)\n// CloudFront: origin -> edge\n// Workers: serve at edge (Cloudflare Workers, Lambda@Edge)\n\n// Edge worker example (Cloudflare):\naddEventListener(\'fetch\', event => {\n    event.respondWith(handle(event.request));\n});\nasync function handle(req) {\n    const url = new URL(req.url);\n    if (url.pathname === \'/api/geo\') {\n        return new Response(req.cf.country, {status: 200});\n    }\n    return fetch(req);\n}', keyPoints: ['Edge caches static content', 'Edge functions reduce origin load', 'Geo-based routing via DNS', 'POPs (Points of Presence) worldwide']}],
    ['WebSocket', 'Intermediate', 'Full-duplex persistent connection', {codeExample: '// Client\nconst ws = new WebSocket(\'wss://server.com/socket\');\nws.onopen = () => ws.send(\'Hello\');\nws.onmessage = (e) => console.log(e.data);\nws.onclose = () => console.log(\'closed\');\n\n// Server (Node.js)\nconst WebSocket = require(\'ws\');\nconst wss = new WebSocket.Server({port: 8080});\nwss.on(\'connection\', (ws) => {\n    ws.on(\'message\', (msg) => {\n        ws.send(`Echo: ${msg}`);\n    });\n});', keyPoints: ['Full-duplex over single TCP', 'HTTP upgrade handshake', 'Persistent, low-latency', 'Used for chat, games, live updates']}],
  ],
  'system-design': [
    ['API Gateway', 'Intermediate', 'Single entry point for microservices', {codeExample: '// Functions:\n// 1. Routing: /api/users -> user-service\n// 2. Auth: validate JWT before backend\n// 3. Rate limiting: per-client\n// 4. Aggregation: combine multiple responses\n// 5. Transformation: modify request/response\n\n// Tools:\n// - Kong (open source)\n// - AWS API Gateway\n// - Nginx + Lua\n// - Traefik\n\n// BFF (Backend For Frontend)\n// - Mobile BFF returns optimized payload\n// - Web BFF returns HTML + data\n// Each client gets tailored API', keyPoints: ['Single entry point', 'Cross-cutting: auth, rate limit, logging', 'Request routing to services', 'Can aggregate responses (BFF)']}],
    ['Leader Election', 'Intermediate', 'Electing a coordinator in distributed systems', {codeExample: '// Algorithms:\n\n// 1. Bully Algorithm\n// - Highest ID node becomes coordinator\n// - Node sends ELECTION to higher IDs\n// - If no response, it wins\n// - If higher responds, it takes over\n\n// 2. Raft Leader Election\n// - Terms, timeout-based\n// - Candidate requests votes\n// - Majority needed\n// - Random timeouts prevent split votes\n\n// 3. ZooKeeper/etcd\n// - Ephemeral znodes / leases\n// - First to create /election/leader- becomes leader\n// - Watchers notify on failure\n\nconst { Etcd3 } = require(\'etcd3\');\nconst client = new Etcd3();\nconst lease = await client.lease().seconds(10);\nawait lease.put(\'leader\').value(\'server-1\');\n// If this instance dies, lease expires, leader changes', keyPoints: ['Bully: highest ID wins', 'Raft: majority vote', 'ZooKeeper: ephemeral znodes']}],
  ],
};

var courseIds = Object.keys(extras);
courseIds.sort().reverse();

courseIds.forEach(function(courseId) {
  var concepts = extras[courseId];
  var topicName = courseId.replace(/-/g, ' ').replace(/\b\w/g, function(c) { return c.toUpperCase(); }) + ' Addl';
  var conceptsText = concepts.map(function(c) {
    return makeConcept(c[0], c[1], c[2], c[3]);
  }).join(',\n');

  var courseStart = "  '" + courseId + "': {";
  var pos = src.indexOf(courseStart);
  if (pos < 0) { console.log('NOT FOUND: ' + courseId); return; }

  var closeMarker = "    ]\n  },";
  var closePos = src.indexOf(closeMarker, pos + courseStart.length);
  if (closePos < 0) {
    closeMarker = "    ]\n  }";
    closePos = src.lastIndexOf(closeMarker);
    if (closePos < 0 || closePos < pos) { console.log('NO CLOSE: ' + courseId); return; }
  }

  src = src.slice(0, closePos - 1) + ',\n      { name: \'' + topicName + '\', concepts: [\n' + conceptsText + '\n      ]},' + '\n' + src.slice(closePos);
  console.log('OK: ' + courseId);
});

fs.writeFileSync(__dirname + '/interview-data.js', src, 'utf8');
console.log('DONE');
