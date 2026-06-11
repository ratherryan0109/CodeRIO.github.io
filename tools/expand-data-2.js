var fs = require('fs');
var src = fs.readFileSync(__dirname + '/interview-data.js', 'utf8');

// Generate a concept string from a concept object
function conStr(c) {
  var parts = [];
  parts.push('{ term: \'' + (c.term || '').replace(/'/g, "\\'") + '\', difficulty: \'' + c.difficulty + '\'');
  if (c.definition) parts.push('definition: \'' + c.definition.replace(/'/g, "\\'") + '\'');
  if (c.codeExample) parts.push('codeExample: \'' + c.codeExample.replace(/'/g, "\\'").replace(/\\/g, '\\\\') + '\'');
  if (c.codeOutput) parts.push('codeOutput: \'' + c.codeOutput.replace(/'/g, "\\'") + '\'');
  if (c.keyPoints) parts.push('keyPoints: ' + JSON.stringify(c.keyPoints));
  if (c.commonMistakes) parts.push('commonMistakes: ' + JSON.stringify(c.commonMistakes));
  if (c.followUps) parts.push('followUps: ' + JSON.stringify(c.followUps));
  if (c.compareWith) parts.push('compareWith: \'' + c.compareWith.replace(/'/g, "\\'") + '\'');
  if (c.scenario) parts.push('scenario: \'' + c.scenario.replace(/'/g, "\\'") + '\'');
  if (c.bugCode) parts.push('bugCode: \'' + c.bugCode.replace(/'/g, "\\'").replace(/\\/g, '\\\\') + '\'');
  if (c.bugExplanation) parts.push('bugExplanation: \'' + c.bugExplanation.replace(/'/g, "\\'") + '\'');
  if (c.fixedCode) parts.push('fixedCode: \'' + c.fixedCode.replace(/'/g, "\\'").replace(/\\/g, '\\\\') + '\'');
  if (c.fixedOutput) parts.push('fixedOutput: \'' + c.fixedOutput.replace(/'/g, "\\'") + '\'');
  if (c.realWorld) parts.push('realWorld: \'' + c.realWorld.replace(/'/g, "\\'") + '\'');
  return '        ' + parts.join(',\n            ') + ' },';
}

// Generate N concepts for a course given a seed
var additions = {
  python: [
    { term: 'Match Statement', difficulty: 'Intermediate', definition: 'Structural pattern matching introduced in Python 3.10', codeExample: 'def handle_command(command):\n    match command.split():\n        case ["quit"]:\n            return "Goodbye"\n        case ["hello", name]:\n            return f"Hello {name}"\n        case ["add", x, y]:\n            return int(x) + int(y)\n        case _:\n            return "Unknown command"', keyPoints: ['Pattern matching with match/case', 'Wildcard _ for default', 'Can match sequences, mappings, classes', 'Guard conditions with if'], commonMistakes: ['Forgetting to handle all cases'] },
    { term: 'Async/Await', difficulty: 'Intermediate', definition: 'Asynchronous programming with coroutines using async/await syntax', codeExample: 'import asyncio\n\nasync def fetch_data(url):\n    print(f"Fetching {url}")\n    await asyncio.sleep(1)\n    return f"Data from {url}"\n\nasync def main():\n    results = await asyncio.gather(\n        fetch_data("url1"),\n        fetch_data("url2"),\n        fetch_data("url3")\n    )\n    print(results)\n\nasyncio.run(main())', keyPoints: ['async def for coroutines', 'await suspends execution', 'asyncio.run() entry point', 'asyncio.gather for concurrency'], commonMistakes: ['Calling async function without await', 'Blocking the event loop'] },
    { term: 'Dask/Parallel Processing', difficulty: 'Advanced', definition: 'Parallel computing library for scaling Python workloads', keyPoints: ['Dask arrays mirror NumPy', 'Dask DataFrames mirror Pandas', 'Distributed scheduler for clusters', 'Lazy evaluation for optimization'], followUps: ['Compare multiprocessing vs threading vs asyncio'] },
    { term: 'Metaclasses', difficulty: 'Advanced', definition: 'Classes that create other classes, controlling class creation', codeExample: 'class SingletonMeta(type):\n    _instances = {}\n    def __call__(cls, *args, **kwargs):\n        if cls not in cls._instances:\n            cls._instances[cls] = super().__call__(*args, **kwargs)\n        return cls._instances[cls]\n\nclass Database(metaclass=SingletonMeta):\n    pass\n\nassert Database() is Database()', keyPoints: ['type is the default metaclass', '__new__ and __init__ on metaclasses', 'Control class creation and behavior', 'Used in ORMs, Django, SQLAlchemy'], compareWith: 'decorators vs metaclasses' },
    { term: 'Descriptors', difficulty: 'Advanced', definition: 'Objects that override attribute access via __get__, __set__, __delete__', codeExample: 'class ValidatedAttribute:\n    def __init__(self, validator):\n        self.validator = validator\n    def __set_name__(self, owner, name):\n        self.name = name\n    def __get__(self, obj, objtype=None):\n        return obj.__dict__.get(self.name)\n    def __set__(self, obj, value):\n        if not self.validator(value):\n            raise ValueError(f"Invalid {self.name}")\n        obj.__dict__[self.name] = value', keyPoints: ['Controls attribute access', 'Used by @property internally', '__set_name__ for automatic naming', 'Powerful for validation/reuse'] },
    { term: 'Slot Classes', difficulty: 'Intermediate', definition: '__slots__ reduces memory by avoiding per-instance __dict__', codeExample: 'class Point:\n    __slots__ = ["x", "y"]\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n\np = Point(1, 2)\nprint(p.x)  # 1\n# p.z = 3  # AttributeError: no attribute z', keyPoints: ['Reduces memory usage significantly', 'Faster attribute access', 'Cannot add new attributes not in __slots__', 'Inheritance requires care'], compareWith: '__slots__ vs regular class' },
  ],
  javascript: [
    { term: 'WeakMap & WeakSet', difficulty: 'Advanced', definition: 'Collections with weak references that allow garbage collection', codeExample: 'let obj = { id: 1 };\nconst wm = new WeakMap();\nwm.set(obj, "private data");\nconsole.log(wm.get(obj));  // "private data"\nobj = null;  // obj garbage collected, WeakMap entry removed\n\n// Use case: private metadata\nconst metadata = new WeakMap();\nclass User {\n  constructor(name) {\n    this.name = name;\n    metadata.set(this, { created: Date.now() });\n  }\n}', keyPoints: ['Keys must be objects', 'No iteration methods (keys/values/entries)', 'Automatic GC when key is collected', 'WeakMap for private data, WeakSet for marking'], commonMistakes: ['Trying to iterate or get size', 'Using primitive keys'] },
    { term: 'Currying', difficulty: 'Intermediate', definition: 'Transforming a function with multiple args into a series of single-arg functions', codeExample: 'const curry = (fn) => {\n  return function curried(...args) {\n    if (args.length >= fn.length) {\n      return fn.apply(this, args);\n    }\n    return (...more) => curried.apply(this, args.concat(more));\n  };\n};\n\nconst add = curry((a, b, c) => a + b + c);\nconsole.log(add(1)(2)(3));  // 6\nconsole.log(add(1, 2)(3));  // 6', keyPoints: ['Creates partially applied functions', 'Useful for configuration', 'fn.length gives parameter count', 'Core concept in functional programming'], compareWith: 'partial application vs currying' },
    { term: 'Service Workers', difficulty: 'Advanced', definition: 'Scripts that run in background, intercepting network requests for offline/caching', codeExample: '// sw.js\nself.addEventListener("install", (event) => {\n  event.waitUntil(\n    caches.open("v1").then((cache) =>\n      cache.addAll(["/", "/index.html", "/app.js"])\n    )\n  );\n});\n\nself.addEventListener("fetch", (event) => {\n  event.respondWith(\n    caches.match(event.request).then((resp) =>\n      resp || fetch(event.request)\n    )\n  );\n});\n\n// Register\nnavigator.serviceWorker.register("/sw.js");', keyPoints: ['Runs on separate thread', 'Lifecycle: install, activate, fetch', 'Cache API for offline storage', 'HTTPS required (except localhost)'] },
    { term: 'Proxy Object', difficulty: 'Advanced', definition: 'Create custom behavior for fundamental operations like property lookup', codeExample: 'const validator = {\n  set(target, key, value) {\n    if (key === "age") {\n      if (typeof value !== "number" || value < 0) {\n        throw new Error("Age must be positive number");\n      }\n    }\n    target[key] = value;\n    return true;\n  }\n};\n\nconst user = new Proxy({}, validator);\nuser.age = 25;  // OK\n// user.age = -5;  // Error\n\n// Logging proxy\nconst logger = new Proxy(target, {\n  get(t, prop) {\n    console.log(`Accessing ${prop}`);\n    return t[prop];\n  }\n});', keyPoints: ['Traps: get, set, has, deleteProperty', 'Useful for validation, logging, memoization', 'RevocableProxy for revocable access', 'Performance overhead'], compareWith: 'Proxy vs Object.defineProperty' },
    { term: 'Generators', difficulty: 'Intermediate', definition: 'Functions that can be paused/resumed using yield, producing sequences', codeExample: 'function* idGenerator() {\n  let id = 1;\n  while (true) {\n    yield id++;\n  }\n}\nconst gen = idGenerator();\nconsole.log(gen.next().value);  // 1\nconsole.log(gen.next().value);  // 2\n\nfunction* range(start, end) {\n  for (let i = start; i <= end; i++) {\n    yield i;\n  }\n}\nfor (const n of range(1, 5)) {\n  console.log(n);  // 1, 2, 3, 4, 5\n}', keyPoints: ['function* syntax', 'yield pauses and returns value', '.next() resumes execution', 'Useful for infinite sequences, lazy eval'] },
    { term: 'ArrayBuffer & TypedArrays', difficulty: 'Advanced', definition: 'Binary data buffers for efficient memory representation', codeExample: 'const buffer = new ArrayBuffer(16);\nconst view = new Uint32Array(buffer);\nview[0] = 42;\nview[1] = 100;\n\nconst dataView = new DataView(buffer);\nconsole.log(dataView.getUint32(0));  // 42\n\nconst encoder = new TextEncoder();\nconst encoded = encoder.encode("Hello");\nconst decoder = new TextDecoder();\nconsole.log(decoder.decode(encoded));  // Hello', keyPoints: ['Fixed-length raw binary data', 'TypedArrays: Int32Array, Uint8Array, Float64Array', 'DataView for mixed types', 'Used in WebSockets, WebGL, File API'] },
  ],
  java: [
    { term: 'Memory Leaks in Java', difficulty: 'Advanced', definition: 'Unreferenced objects that are still reachable, preventing GC', codeExample: '// Common leak: static collections\npublic class Cache {\n    private static Map<String, Data> cache = new HashMap<>();\n    \n    public static void add(String key, Data data) {\n        cache.put(key, data);  // never removed!\n    }\n}\n\n// Fix: WeakHashMap\nprivate static Map<String, Data> cache = new WeakHashMap<>();', keyPoints: ['Static collections growing unbounded', 'Unclosed resources (streams, connections)', 'Inner class holding outer reference', 'ThreadLocal not removed'], followUps: ['How to detect memory leaks with profilers?'] },
    { term: 'try-with-resources', difficulty: 'Intermediate', definition: 'Automatic resource management closing AutoCloseable resources', codeExample: '// Before Java 7\nBufferedReader br = null;\ntry {\n    br = new BufferedReader(new FileReader("file.txt"));\n    System.out.println(br.readLine());\n} finally {\n    if (br != null) br.close();\n}\n\n// Java 7+ try-with-resources\ntry (BufferedReader br = new BufferedReader(\n        new FileReader("file.txt"))) {\n    System.out.println(br.readLine());\n}', keyPoints: ['Resources must implement AutoCloseable', 'Multiple resources separated by ;', 'Closed in reverse order', 'Suppressed exceptions'] },
    { term: 'Functional Interfaces', difficulty: 'Intermediate', definition: 'Interfaces with single abstract method (SAM), usable as lambda targets', codeExample: '@FunctionalInterface\ninterface Transformer<T, R> {\n    R transform(T input);\n}\n\n// Built-in functional interfaces\nFunction<String, Integer> toLength = String::length;\nPredicate<Integer> isEven = n -> n % 2 == 0;\nConsumer<String> print = System.out::println;\nSupplier<Double> random = Math::random;\nUnaryOperator<Integer> square = n -> n * n;\nBinaryOperator<Integer> sum = Integer::sum;', keyPoints: ['@FunctionalInterface annotation', 'Can have default and static methods', 'Common: Function, Predicate, Consumer, Supplier', 'Can be used as lambda types'] },
    { term: 'Type Erasure', difficulty: 'Advanced', definition: 'Generic type information removed at compile time for backward compatibility', codeExample: '// At compile time\nList<String> strings = new ArrayList<>();\nList<Integer> ints = new ArrayList<>();\n\n// At runtime (erased)\n// List strings = new ArrayList();\n// List ints = new ArrayList();\n\n// Bridge methods for polymorphism\npublic class Box<T> {\n    public void set(T value) { }\n}\n// Erased to: public void set(Object value)', keyPoints: ['Type parameters replaced with Object or bounds', 'No runtime generic type info', 'Bridge methods for type safety', 'Cannot use instanceof with generic types'], commonMistakes: ['Cannot create generic arrays: new T[]', 'Cannot use instanceof T'] },
    { term: 'Fork/Join Framework', difficulty: 'Advanced', definition: 'Work-stealing thread pool for divide-and-conquer parallelism', codeExample: 'class SumTask extends RecursiveTask<Long> {\n    private static final int THRESHOLD = 1000;\n    private long[] arr; private int lo, hi;\n    \n    protected Long compute() {\n        if (hi - lo < THRESHOLD) {\n            long sum = 0;\n            for (int i = lo; i < hi; i++) sum += arr[i];\n            return sum;\n        }\n        int mid = (lo + hi) / 2;\n        SumTask left = new SumTask(arr, lo, mid);\n        SumTask right = new SumTask(arr, mid, hi);\n        left.fork();\n        return right.compute() + left.join();\n    }\n}\n\nForkJoinPool pool = ForkJoinPool.commonPool();\nlong result = pool.invoke(new SumTask(arr, 0, arr.length));', keyPoints: ['Work-stealing algorithm', 'RecursiveTask (returns value) vs RecursiveAction', 'fork() and join() for parallelism', 'CommonPool uses available processors'] },
  ],
};

// Insert into each course file by finding course id and inserting before the closing ]},
Object.keys(additions).forEach(function(courseId) {
  var concepts = additions[courseId];
  // Find the course in the file:   'courseId': {
  var coursePattern = "  '" + courseId + "': {";
  var coursePos = src.indexOf(coursePattern);
  if (coursePos < 0) {
    console.log('Course not found: ' + courseId);
    return;
  }
  // Find the LAST ]}, before the next course or before the end
  // We need to find a good insertion point. Let us find the course close pattern.
  // Each course ends with:   ]},\n },\n or just ]},\n  },\n
  var courseClose = '  ]},\n },\n';
  var closePos = src.indexOf(courseClose, coursePos);
  if (closePos < 0) {
    courseClose = '  ]},\n  },\n';
    closePos = src.indexOf(courseClose, coursePos);
  }
  if (closePos < 0) {
    console.log('Could not find course close for ' + courseId);
    return;
  }

  // Insert new concepts just before the course close by appending to the last topic
  var lastTopicClose = '      ]},';
  var lastTopicPos = src.lastIndexOf(lastTopicClose, closePos);
  if (lastTopicPos < 0) {
    console.log('Could not find last topic for ' + courseId);
    return;
  }

  // Generate concept strings
  var lines = [];
  concepts.forEach(function(c) {
    lines.push(conStr(c));
  });
  var insertText = '\n' + lines.join('\n') + '\n';
  src = src.slice(0, lastTopicPos) + insertText + src.slice(lastTopicPos);
  console.log('Added ' + concepts.length + ' concepts to ' + courseId);
});

fs.writeFileSync(__dirname + '/interview-data.js', src, 'utf8');
console.log('Done. File written.');
