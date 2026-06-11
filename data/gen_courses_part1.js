const fs = require("fs");
const path = require("path");
const lessonsPath = path.join(__dirname, "lessons.json");
function M(id, title, diff, dur, obj, con, ex, qz, vid) { return {id,title,difficulty:diff,duration:dur,objectives:obj,content:con,exercises:ex,quiz:qz,videos:vid}; }
function C(title, lang, code, exp) { return {type:"code",title,language:lang,code,explanation:exp}; }
function E(code, desc) { return {code,desc}; }
function Q(q, opts, a) { return {question:q,options:opts,answer:a}; }
function V(t, c, u) { return {title:t,creator:c,url:u}; }
function P(v) { return {type:"paragraph",value:v}; }
function A(v) { return {type:"analogy",value:v}; }
const csharp_modules = [
  M(1,"Intro to C#","Beginner","30 min",["Understand .NET/C#","Setup environment","First C# program","Basic syntax"],[
    P("C# is a modern, object-oriented language by Microsoft running on .NET. Used for web apps, desktop software, games (Unity), and enterprise systems."),
    A("C# is like a well-organized toolbox. The .NET runtime is the workshop. Each library is a tool, and C# code tells the tools what to build."),
    P("C# was created by Anders Hejlsberg in 2000 as part of Microsoft's .NET initiative, combining C++ power with Visual Basic simplicity."),
    C("First Program","csharp","using System;\nclass Program\n{\n  static void Main(string[] args)\n  {\n    Console.WriteLine(\"Hello, World!\");\n    string name = Console.ReadLine();\n    Console.WriteLine($\"Welcome, {name}!\");\n  }\n}",[
      E("using System;","Imports System namespace"),
      E("class Program","Entry point class"),
      E("static void Main","Program entry point"),
      E("Console.WriteLine","Output to console"),
      E("$ interpolation","String interpolation with $"),
    ]),
  ],["Write Hello World","Read name and print greeting","Use string interpolation"],[]),
  M(2,"Variables & Data Types","Beginner","35 min",["Value vs reference types","Built-in data types","var keyword","Type conversion"],[
    P("C# is strongly typed. Core types: int, long, float, double, decimal, char, bool, string. Value types store data directly; reference types store references."),
    A("Value types are sticky notes with the value written. Reference types say 'look in filing cabinet drawer 5'."),
    C("Variables","csharp","int age = 25;\ndouble price = 19.99;\nchar grade = 'A';\nbool isActive = true;\nstring name = \"Alice\";\nvar count = 100;\ndecimal salary = 55000.00m;\nint num = 42;\ndouble converted = (double)num;\nstring str = num.ToString();\nint parsed = int.Parse(\"123\");",[
      E("int, double, char, bool, string","Core data types"),
      E("var","Compiler infers type"),
      E("decimal m suffix","High precision financial"),
      E("int.Parse / TryParse","String to number parsing"),
    ]),
  ],["Create variables of each type","Use var and check inferred type","Parse string to int"],[]),
  M(3,"Control Flow","Beginner","40 min",["if/else and switch patterns","for, while, foreach loops","break and continue"],[
    P("C# offers if/else, switch with pattern matching, for, foreach, while. Foreach works with any IEnumerable."),
    A("Control flow is like traffic signals. if/else is a fork, switch is a roundabout with exits, loops are a roundabout you circle until your exit."),
    C("Control Flow","csharp","int score = 85;\nif (score >= 90) Console.WriteLine(\"A\");\nelse if (score >= 80) Console.WriteLine(\"B\");\nelse Console.WriteLine(\"C\");\nstring status = score >= 60 ? \"Pass\" : \"Fail\";\nswitch (score) {\n  case >= 90: Console.WriteLine(\"Excellent\"); break;\n  default: Console.WriteLine(\"Keep trying\"); break;\n}\nfor (int i = 0; i < 5; i++) Console.WriteLine(i);\nstring[] fruits = {\"apple\",\"banana\"};\nforeach (var f in fruits) Console.WriteLine(f);",[
      E("if/else if/else","Multi-branch condition"),
      E("Ternary ? :","Inline conditional"),
      E("switch with patterns","Pattern matching cases"),
      E("foreach","Enumerate over collections"),
    ]),
  ],["Write grade calculator","Loop array with foreach","Count down with for loop"],[]),
  M(4,"Arrays & Collections","Beginner","40 min",["Arrays and multidimensional","List<T> and Dictionary<T>","LINQ basics"],[
    P("Arrays have fixed size. List<T> is dynamic. Dictionary<TKey,TValue> stores key-value pairs. System.Collections.Generic provides type-safe collections."),
    A("An array is a parking lot with numbered spaces (fixed). List is a valet lot that expands. Dictionary is a coat check - give token, get coat."),
    C("Collections","csharp","int[] numbers = {1,2,3,4,5};\nArray.Reverse(numbers);\nList<string> names = new List<string>();\nnames.Add(\"Alice\");\nnames.AddRange(new[]{\"Bob\",\"Charlie\"});\nDictionary<string,int> ages = new() {{\"Alice\",25},{\"Bob\",30}};\nages[\"Charlie\"] = 35;\nvar filtered = names.Where(n => n.Length > 3).ToList();",[
      E("int[]","Fixed-size array"),
      E("List<T>","Dynamic generic list"),
      E("Dictionary<TKey,TValue>","Key-value pairs"),
      E("LINQ Where()","Filter with lambda"),
    ]),
  ],["Create list with AddRange","Build dictionary with LINQ","Filter names by length"],[]),
  M(5,"Methods & Parameters","Beginner","40 min",["Define methods","ref, out, in modifiers","Overloading","Optional/named args"],[
    P("Methods encapsulate logic. C# supports overloading, ref/out/in, optional params, and named arguments."),
    C("Methods","csharp","class Calculator {\n  public int Add(int a, int b) => a + b;\n  public double Add(double a, double b) => a + b;\n  public void Swap(ref int a, ref int b) { int t = a; a = b; b = t; }\n  public bool TryDivide(int a, int b, out double r) {\n    if (b == 0) { r = 0; return false; }\n    r = (double)a / b; return true;\n  }\n  public void Log(string msg, int level = 1) { Console.WriteLine($\"[{level}] {msg}\"); }\n}\nvar calc = new Calculator();\ncalc.Swap(ref x, ref y);\ncalc.TryDivide(10, 0, out double r);\ncalc.Log(\"Error\", level: 3);",[
      E("=> expression body","Arrow syntax"),
      E("ref","Pass by reference"),
      E("out","Return multiple values"),
      E("Method overloading","Same name diff params"),
      E("Optional params","Default values"),
    ]),
  ],["Write Swap with ref","Create TryParse with out","Overload for int/double"],[]),
  M(6,"OOP: Classes & Objects","Intermediate","50 min",["Classes with properties","Constructors","Encapsulation","Static members"],[
    P("C# is fully object-oriented. Classes use auto-properties, object initializers, and static members."),
    A("A class is a blueprint for a house. Properties are house features. Static members are shared community features."),
    C("Classes","csharp","public class Student {\n  public string Name { get; set; }\n  public int Age { get; private set; }\n  public static int Count { get; private set; }\n  public Student(string name, int age) {\n    Name = name; Age = age; Count++;\n  }\n  public string Introduce() => $\"Hi, I'm {Name}\";\n  public static string School => \"Code Academy\";\n}\nvar s = new Student(\"Alice\",20) { Name = \"Alice Smith\" };\nConsole.WriteLine(Student.Count);",[
      E("get; set;","Auto-properties"),
      E("private set","External read-only"),
      E("static member","Shared across instances"),
      E("Object initializer","Set post-construction"),
    ]),
  ],["Create Person class with props","Add static counter","Use initializer syntax"],[]),
  M(7,"Inheritance & Polymorphism","Intermediate","45 min",["Derived classes","virtual/override","Abstract classes","Polymorphism"],[
    P("Inheritance allows extending base classes. Virtual methods can be overridden. Abstract classes define contracts."),
    A("Inheritance is like a family tree. Car is a Vehicle. Child inherits from parent but can add or modify."),
    C("Inheritance","csharp","public abstract class Animal {\n  public string Name { get; }\n  public Animal(string n) => Name = n;\n  public abstract void MakeSound();\n  public virtual void Sleep() => Console.WriteLine(\"Zzz...\");\n}\npublic class Dog : Animal {\n  public Dog(string n) : base(n) {}\n  public override void MakeSound() => Console.WriteLine(\"Woof!\");\n}\npublic class Cat : Animal {\n  public Cat(string n) : base(n) {}\n  public override void MakeSound() => Console.WriteLine(\"Meow!\");\n}\nAnimal pet = new Dog(\"Buddy\");\npet.MakeSound();",[
      E("abstract class","Cannot instantiate"),
      E("abstract method","No impl, must override"),
      E("virtual method","Optional override"),
      E(": base()","Call parent constructor"),
    ]),
  ],["Create Shape/Circle/Rectangle","Override CalculateArea()","Use virtual method"],[]),
  M(8,"Interfaces & Abstract Classes","Intermediate","45 min",["Interface contracts","Multiple interfaces","Default methods (C# 8)"],[
    P("Interfaces define contracts. C# 8+ has default implementations. Classes can implement multiple interfaces."),
    C("Interfaces","csharp","public interface IDrawable {\n  void Draw();\n  void Print() => Console.WriteLine(\"Default print\");\n}\npublic interface ISerializable { string Serialize(); }\npublic class Circle : IDrawable, ISerializable {\n  public double Radius { get; set; }\n  public void Draw() => Console.WriteLine(\"Drawing circle\");\n  public string Serialize() => $\"{{\"radius\": {Radius}}}\";\n}\nIDrawable d = new Circle{Radius=5};\nd.Draw();",[
      E("interface","Contract declaration"),
      E("I prefix naming","Convention"),
      E("Default methods (C#8)","Interface with default impl"),
      E("Multiple interfaces","Comma-separated"),
    ]),
  ],["Create IPaymentProcessor","Implement multiple intfs","Use default method"],[]),
  M(9,"Exception Handling","Intermediate","35 min",["try/catch/finally","Custom exceptions","using statement"],[
    P("Exceptions signal errors. Use try/catch to handle, finally for cleanup. using ensures IDisposable is disposed."),
    C("Exceptions","csharp","try {\n  int[] nums = {1,2,3};\n  Console.WriteLine(nums[5]);\n} catch (IndexOutOfRangeException ex) {\n  Console.WriteLine($\"Index error: {ex.Message}\");\n} catch (Exception ex) {\n  Console.WriteLine($\"Error: {ex.Message}\");\n} finally {\n  Console.WriteLine(\"Cleanup\");\n}\nusing var reader = new StreamReader(\"file.txt\");\nstring content = reader.ReadToEnd();\npublic class InvalidAgeException : Exception {\n  public InvalidAgeException(string msg) : base(msg) {}\n}\nif (age < 0) throw new InvalidAgeException(\"Negative\");",[
      E("try/catch","Handle exceptions"),
      E("finally","Always runs"),
      E("using statement","Auto-dispose resource"),
      E("throw","Raise exception"),
    ]),
  ],["Divide with try/catch","Custom exception class","Using file resource"],[]),
  M(10,"LINQ","Intermediate","50 min",["Method vs query syntax","Filter, project, aggregate","Deferred execution"],[
    P("LINQ provides consistent querying over collections, databases (EF), and XML. Method syntax (fluent) and query syntax are equivalent."),
    A("LINQ is like a search engine for data. Instead of manually sorting items, tell LINQ what you want (where, order, select) and it finds it."),
    C("LINQ","csharp","var nums = new[] {1,2,3,4,5,6,7,8,9,10};\nvar evens = nums.Where(n => n%2==0);\nvar squares = nums.Select(n => n*n);\nvar sorted = nums.OrderByDescending(n => n);\nvar result = from n in nums where n > 3 orderby n descending select n*2;\nvar sum = nums.Sum();\nvar avg = nums.Average();\nvar first = nums.First(n => n%2==0);\nvar any = nums.Any(n => n>100);\nvar grouped = nums.GroupBy(n => n%2==0 ? \"Even\" : \"Odd\");",[
      E("Where()","Filter"),
      E("Select()","Transform"),
      E("OrderBy / ThenBy","Sort"),
      E("Sum/Average/Max","Aggregation"),
      E("First/Any/All","Element ops"),
    ]),
  ],["Filter/sort product list","Group by category","Project with Select"],[]),
  M(11,"Delegates & Events","Intermediate","50 min",["Delegate types","Multicast delegates","Events with event keyword","Lambdas"],[
    P("Delegates are type-safe function pointers. Events use publish-subscribe. Func/Action are built-in delegates."),
    A("A delegate is like a restaurant order form. Multiple forms clipped together is a multicast delegate."),
    C("Delegates & Events","csharp","public delegate void Notify(string msg);\npublic class Publisher {\n  public event Notify OnNotify;\n  public void Raise(string msg) => OnNotify?.Invoke(msg);\n}\npub.OnNotify += m => Console.WriteLine($\"Lambda: {m}\");\npub.Raise(\"Hello!\");\nFunc<int,int,int> add = (a,b) => a+b;\nAction<string> log = m => Console.WriteLine(m);\nPredicate<int> isEven = n => n%2==0;",[
      E("delegate","Custom delegate type"),
      E("event keyword","Event declaration"),
      E("?.Invoke()","Null-safe invocation"),
      E("Func/Action/Predicate","Built-in delegates"),
    ]),
  ],["Create custom delegate","Subscribe event handlers","Use Func and Action"],[]),
  M(12,"Generics","Intermediate","40 min",["Generic classes/methods","Constraints with where","Built-in generics"],[
    P("Generics enable type-safe code reuse without boxing. Constraints restrict valid types at compile time."),
    A("Generics are like an adjustable mold. Instead of a cutter per shape, one adjustable cutter works for any shape."),
    C("Generics","csharp","public class Repository<T> where T : class {\n  List<T> _items = new();\n  public void Add(T item) => _items.Add(item);\n  public T Get(int i) => _items[i];\n}\npublic T Max<T>(T a, T b) where T : IComparable<T> {\n  return a.CompareTo(b) >= 0 ? a : b;\n}\nvar repo = new Repository<string>();\nrepo.Add(\"Hello\");",[
      E("<T> where T : class","Generic with constraint"),
      E("List<T>","Generic list"),
      E("IComparable<T> constraint","Enables comparison"),
      E("Generic method","Type param on method"),
    ]),
  ],["Create generic Stack<T>","Add IDisposable constraint","Generic method for arrays"],[]),
  M(13,"File I/O","Intermediate","40 min",["StreamReader/Writer","File static methods","Binary and JSON serialization"],[
    P("System.IO provides file classes. StreamReader/Writer for text, File/Directory for static helpers."),
    C("File I/O","csharp","File.WriteAllText(\"data.txt\",\"Hello\");\nFile.AppendAllText(\"data.txt\",\"\\nNew line\");\nstring text = File.ReadAllText(\"data.txt\");\nstring[] lines = File.ReadAllLines(\"data.txt\");\nusing var reader = new StreamReader(\"data.txt\");\nstring? line;\nwhile ((line = reader.ReadLine()) != null) Console.WriteLine(line);\nstring[] files = Directory.GetFiles(\".\",\"*.txt\");\nusing var sw = new StreamWriter(\"data.json\");\nstring json = JsonSerializer.Serialize(new {Name = \"Alice\"});\nsw.Write(json);",[
      E("File.WriteAllText","Write string"),
      E("File.ReadAllLines","Read lines"),
      E("StreamReader.ReadLine","Line-by-line"),
      E("Directory.GetFiles","List files"),
      E("JsonSerializer","JSON (System.Text.Json)"),
    ]),
  ],["Write user input to file","Read and count lines","Serialize to JSON"],[]),
  M(14,"Async/Await","Advanced","50 min",["async/await pattern","Task.WhenAll/WhenAny","Error handling in async"],[
    P("Async/await enables non-blocking operations. I/O-bound ops (files, network) benefit most. Tasks represent async work."),
    A("Async/await is like ordering food. Place order (start task), read magazine (other work), food arrives (await)."),
    C("Async/Await","csharp","public async Task<string> FetchDataAsync(string url) {\n  using var client = new HttpClient();\n  return await client.GetStringAsync(url);\n}\npublic async Task ProcessMultipleAsync() {\n  var t1 = FetchDataAsync(\"https://api.example.com/1\");\n  var t2 = FetchDataAsync(\"https://api.example.com/2\");\n  string[] results = await Task.WhenAll(t1, t2);\n  var first = await Task.WhenAny(t1, t2);\n}\npublic async Task Run() {\n  try { await FetchDataAsync(\"https://bad.url\"); }\n  catch (HttpRequestException ex) { Console.WriteLine($\"Error: {ex.Message}\"); }\n}\nusing var stream = new StreamReader(\"data.txt\");\nstring content = await stream.ReadToEndAsync();",[
      E("async Task<T>","Async method returning value"),
      E("await","Suspend until complete"),
      E("Task.WhenAll","Wait all tasks"),
      E("Task.WhenAny","Wait first task"),
      E("HttpClient","Async HTTP"),
    ]),
  ],["Fetch API with HttpClient","Run parallel WhenAll","Handle async errors"],[]),
  M(15,"Entity Framework Core","Advanced","55 min",["DbContext and entities","CRUD operations","LINQ with EF Core"],[
    P("EF Core is Microsoft's ORM mapping DB tables to C# objects. LINQ queries translate to SQL. Migrations manage schema."),
    C("EF Core","csharp","public class Blog {\n  public int Id { get; set; }\n  public string Title { get; set; } = \"\";\n  public List<Post> Posts { get; set; } = new();\n}\npublic class Post {\n  public int Id { get; set; }\n  public string Title { get; set; } = \"\";\n  public int BlogId { get; set; }\n  public Blog Blog { get; set; } = null!;\n}\npublic class AppDbContext : DbContext {\n  public DbSet<Blog> Blogs => Set<Blog>();\n  protected override void OnConfiguring(DbContextOptionsBuilder ob)\n    => ob.UseSqlServer(\"Server=.;Database=BlogDb;Trusted_Connection=true;\");\n}\nusing var db = new AppDbContext();\ndb.Blogs.Add(new Blog{Title=\"My Blog\"});\nawait db.SaveChangesAsync();\nvar blogs = await db.Blogs.Where(b => b.Title.Contains(\"Blog\")).Include(b => b.Posts).ToListAsync();",[
      E("DbContext","DB session"),
      E("DbSet<T>","Table representation"),
      E("Add / SaveChangesAsync","Create and persist"),
      E("Include()","Eager loading"),
      E("LINQ to SQL","Query translation"),
    ]),
  ],["Define Blog/Post one-to-many","Add migration","Query with Include"],[]),
  M(16,"ASP.NET Core Web API","Advanced","60 min",["Web API project setup","Controllers and actions","Dependency injection","Middleware pipeline"],[
    P("ASP.NET Core is cross-platform for building web APIs. Features DI, middleware pipeline, attribute routing."),
    A("ASP.NET Core is like a restaurant kitchen. Controllers are chefs, middleware is workflow, DI is ingredient supplier."),
    C("ASP.NET Core API","csharp","[ApiController]\n[Route(\"api/[controller]\")]\npublic class ProductsController : ControllerBase {\n  private readonly AppDbContext _db;\n  public ProductsController(AppDbContext db) { _db = db; }\n  [HttpGet]\n  public async Task<ActionResult<List<Product>>> GetAll()\n    => await _db.Products.ToListAsync();\n  [HttpGet(\"{id}\")]\n  public async Task<ActionResult<Product>> Get(int id) {\n    var p = await _db.Products.FindAsync(id);\n    if (p == null) return NotFound();\n    return p;\n  }\n  [HttpPost]\n  public async Task<ActionResult<Product>> Create(Product p) {\n    _db.Products.Add(p); await _db.SaveChangesAsync();\n    return CreatedAtAction(nameof(Get), new{id=p.Id}, p);\n  }\n}\nvar builder = WebApplication.CreateBuilder(args);\nbuilder.Services.AddControllers();\nvar app = builder.Build();\napp.MapControllers();\napp.Run();",[
      E("[ApiController]","API-specific behaviors"),
      E("[Route]","URL pattern"),
      E("ControllerBase","API base class"),
      E("ActionResult<T>","Typed response"),
      E("DI constructor","Auto-injected services"),
    ]),
  ],["Create CRUD Products API","Add validation","Search endpoint"],[]),
];
const go_modules = [
  M(1,"Intro to Go","Beginner","30 min",["Go philosophy","Setup Go","First program","go run/build/fmt"],[
    P("Go is statically typed, compiled, created at Google (2009) by Griesemer, Pike, Thompson. Emphasizes simplicity, fast compilation, built-in concurrency."),
    A("Go is like a well-designed kitchen knife. Does one thing well, sharp (fast), easy to maintain, no unnecessary features."),
    C("First Go Program","go","package main\nimport \"fmt\"\nfunc main() {\n  fmt.Println(\"Hello, World!\")\n  var name string\n  fmt.Print(\"Enter name: \")\n  fmt.Scan(&name)\n  fmt.Printf(\"Welcome, %s!\\n\", name)\n}",[
      E("package main","Executable package"),
      E("import \"fmt\"","Formatting package"),
      E("func main()","Entry point"),
      E("fmt.Scan(&var)","Read input"),
      E("fmt.Printf","Formatted output"),
    ]),
  ],["Hello World with fmt","Printf with verbs","Read name and greet"],[]),
  M(2,"Variables & Data Types","Beginner","35 min",["var, :=, const","Basic types","Type inference/conversion"],[
    P("Go is statically typed with type inference. var for explicit, := for short declaration. const for compile-time values."),
    C("Variables","go","const Pi = 3.14159\nfunc main() {\n  var age int = 25\n  var name = \"Alice\"\n  count := 100\n  var price float64 = 19.99\n  var isActive bool = true\n  var x int = 42\n  var y float64 = float64(x)\n  var a,b,c int = 1,2,3\n  fmt.Printf(\"Type: %T, Value: %v\\n\", name, name)\n}",[
      E("var name type","Explicit declaration"),
      E(":= short decl","Type inference"),
      E("const","Compile-time constant"),
      E("float64(x)","Explicit conversion"),
      E("%T format verb","Print type"),
    ]),
  ],["var and := declarations","Constants for days","Convert int to float64"],[]),
  M(3,"Control Flow","Beginner","40 min",["if with init","switch without break","for loops only","defer"],[
    P("Go simplifies: only for loops, switch without break, if with short statement. Defer schedules call on function return."),
    A("Go's for is a Swiss Army knife - traditional for, while (for cond), infinite (for {}). Defer is a post-it: 'do this on leaving'."),
    C("Control Flow","go","score := 85\nif score >= 90 { fmt.Println(\"A\") } else if score >= 80 { fmt.Println(\"B\") }\nif age := 20; age >= 18 { fmt.Println(\"Adult\") }\nswitch score {\ncase 90,100: fmt.Println(\"Excellent\")\ncase 80: fmt.Println(\"Good\")\ndefault: fmt.Println(\"Keep trying\")\n}\nfor i := 0; i < 5; i++ { fmt.Println(i) }\nj := 0\nfor j < 3 { fmt.Println(j); j++ }\ndefer fmt.Println(\"World\")\nfmt.Println(\"Hello\")",[
      E("if; else if; else","Conditional branching"),
      E("if with init","Scoped variable"),
      E("switch","No break needed"),
      E("for init;cond;post","C-style for"),
      E("for cond","While-style"),
      E("defer","Run on return"),
    ]),
  ],["Grade calculator if/else","Switch for weekday","Defer completion msg"],[]),
  M(4,"Functions","Beginner","40 min",["Multiple returns","Named returns","Variadic functions","Closures"],[
    P("Go functions can return multiple values. Named returns, variadic params, closures are built-in."),
    C("Functions","go","func divide(a,b float64) (float64,error) {\n  if b == 0 { return 0, fmt.Errorf(\"div by zero\") }\n  return a/b, nil\n}\nfunc stats(numbers ...int) (sum int, avg float64) {\n  for _, n := range numbers { sum += n }\n  if len(numbers) > 0 { avg = float64(sum)/float64(len(numbers)) }\n  return\n}\nfunc main() {\n  r, err := divide(10,2)\n  s, a := stats(1,2,3,4,5)\n  counter := func() func() int {\n    i := 0\n    return func() int { i++; return i }\n  }()\n}",[
      E("func (params) (returns)","Declaration"),
      E("Multiple returns","result, error pattern"),
      E("Named returns","Pre-declared return vars"),
      E("...int variadic","Variable args"),
      E("Naked return","return without values"),
    ]),
  ],["Function with multiple returns","Variadic sum","Closure counter"],[]),
  M(5,"Arrays, Slices & Maps","Intermediate","45 min",["Fixed arrays","Dynamic slices","Maps","Range iteration"],[
    P("Arrays have fixed length. Slices are dynamic referencing underlying arrays. Maps are unordered key-value pairs."),
    A("Array is a fixed parking lot. Slice is a view into it that can grow. Map is coat check: give token, get coat."),
    C("Collections","go","var arr [5]int = [5]int{1,2,3,4,5}\nslice := []int{1,2,3}\nslice = append(slice, 4,5)\nsub := arr[1:4]\ns := make([]int, 3, 5)\nages := map[string]int{\"Alice\":25,\"Bob\":30}\nages[\"Charlie\"] = 35\ndelete(ages,\"Bob\")\nage, exists := ages[\"Alice\"]\nfor k, v := range ages { fmt.Printf(\"%s: %d\\n\",k,v) }\nfor i, v := range slice { fmt.Println(i,v) }",[
      E("[5]int","Fixed-size array"),
      E("[]int slice","Dynamic view"),
      E("append(s,...)","Add elements"),
      E("make(type,len,cap)","Allocate with capacity"),
      E("map[K]V{}","Key-value literal"),
      E("range","Collection iteration"),
    ]),
  ],["Slice append 5 elements","Build product map","Range iterate sum"],[]),
  M(6,"Structs & Methods","Intermediate","45 min",["Struct types","Value/pointer receivers","Embedding (composition)"],[
    P("Go uses structs for data (not classes). Methods via receivers. Go favors composition over inheritance via embedding."),
    A("Struct is a form with fields. Method is a stamp 'Processed by X'. Pointer receiver writes on original; value receiver on copy."),
    C("Structs","go","type Address struct { Street string; City string }\ntype Person struct {\n  Name string\n  Age int\n  Address  // embedded\n}\nfunc (p Person) Greet() string {\n  return fmt.Sprintf(\"Hi, I'm %s\", p.Name)\n}\nfunc (p *Person) Birthday() { p.Age++ }\np := Person{Name:\"Alice\",Age:25,Address:Address{\"123 Main\",\"NYC\"}}\nfmt.Println(p.Greet())\nfmt.Println(p.City)  // promoted\np.Birthday()",[
      E("type struct{}","Data type definition"),
      E("Value receiver (p T)","Receiver is copied"),
      E("Pointer receiver (p *T)","Modifies original"),
      E("Embedded struct","Composition via embedding"),
      E("Promoted fields","Direct access to embedded"),
    ]),
  ],["Create Product struct","Pointer receiver UpdatePrice","Embed Address in Company"],[]),
  M(7,"Interfaces","Intermediate","40 min",["Interface definition","Implicit satisfaction","Empty interface","Type assertions"],[
    P("Interfaces are satisfied implicitly. Has all methods = implements it. Empty interface (any) accepts any type."),
    A("Interface is like a power outlet. Any device with the right plug shape works. No need to declare 'I'm pluggable'."),
    C("Interfaces","go","type Speaker interface { Speak() string }\ntype Dog struct{}\nfunc (d Dog) Speak() string { return \"Woof!\" }\ntype Cat struct{}\nfunc (c Cat) Speak() string { return \"Meow!\" }\nfunc introduce(s Speaker) { fmt.Println(s.Speak()) }\nanimals := []Speaker{Dog{},Cat{}}\nfor _, a := range animals { introduce(a) }\nif dog, ok := animals[0].(Dog); ok { fmt.Println(\"It's a dog\") }\nvar x interface{} = \"hello\"\nswitch v := x.(type) {\ncase int: fmt.Println(\"int\",v)\ncase string: fmt.Println(\"string\",v)\n}",[
      E("type Speaker interface","Interface def"),
      E("Implicit satisfaction","No implements keyword"),
      E("any / interface{}","Accepts any type"),
      E("x.(T) assertion","Extract concrete type"),
      E("Type switch","Switch on dynamic type"),
    ]),
  ],["Create Shape interface","Implement on multiple structs","Use type assertion"],[]),
  M(8,"Pointers","Intermediate","35 min",["& and * operators","Pointer to struct","Nil pointer safety"],[
    P("Go has pointers but no arithmetic. & takes address, * dereferences. Pointers avoid copying and allow mutation."),
    A("Pointer is like a home address. Instead of moving your house, give the address (&). They visit (*) to see inside."),
    C("Pointers","go","x := 42\nptr := &x\nfmt.Println(*ptr)  // 42\n*ptr = 100\nfmt.Println(x)  // 100\n\ntype Counter struct{ Value int }\nfunc increment(c *Counter) { c.Value++ }\nc := Counter{0}\nincrement(&c)\nfmt.Println(c.Value)  // 1\n\nvar nilPtr *int\nif nilPtr != nil { fmt.Println(*nilPtr) }\n\np := new(int)\n*p = 10",[
      E("&x","Address of x"),
      E("*ptr","Dereference"),
      E("*Type","Pointer type"),
      E("nil check","Safety before deref"),
      E("new(T)","Zero value pointer"),
    ]),
  ],["Swap ints with pointers","NewPerson constructor","Check nil before deref"],[]),
  M(9,"Error Handling","Intermediate","40 min",["Error interface","Sentinel errors","Custom errors","panic/recover"],[
    P("Go treats errors as values (not exceptions). Functions return error. Custom errors implement Error(). Panic/recover for exceptional cases."),
    A("Errors are like check engine lights. Function returns status (err != nil) and you decide. Panic is fire alarm for true emergencies."),
    C("Error Handling","go","var ErrNotFound = errors.New(\"not found\")\ntype ValidationError struct { Field string; Value interface{} }\nfunc (e *ValidationError) Error() string {\n  return fmt.Sprintf(\"invalid %s: %v\", e.Field, e.Value)\n}\nfunc findItem(id int) (string, error) {\n  if id <= 0 { return \"\", &ValidationError{\"id\",id} }\n  if id > 100 { return \"\", ErrNotFound }\n  return fmt.Sprintf(\"Item #%d\",id), nil\n}\nitem, err := findItem(50)\nif errors.Is(err, ErrNotFound) { fmt.Println(\"not found\") }\nvar ve *ValidationError\nif errors.As(err, &ve) { fmt.Println(ve.Field) }\ndefer func() {\n  if r := recover(); r != nil { fmt.Println(\"Recovered:\", r) }\n}()\npanic(\"oh no\")",[
      E("error interface","Error() string method"),
      E("errors.New()","Simple error"),
      E("Custom error type","Struct with Error()"),
      E("errors.Is/As","Error inspection"),
      E("panic/recover","Exception handling"),
    ]),
  ],["ReadFile returning error","Custom ConfigError","Use recover safely"],[]),
  M(10,"Goroutines & Channels","Advanced","55 min",["go keyword","Channels (buffered/unbuffered)","select statement","WaitGroup"],[
    P("Goroutines are lightweight threads. Channels connect them. Select waits on multiple channel ops. Concurrency is built-in."),
    A("Goroutines are checkout lines. Channels are conveyor belts between lines. Select is watching multiple belts at once."),
    C("Concurrency","go","func worker(id int, jobs <-chan int, results chan<- int) {\n  for job := range jobs {\n    time.Sleep(time.Second)\n    results <- job * 2\n  }\n}\njobs := make(chan int, 5)\nresults := make(chan int, 5)\nfor w := 1; w <= 3; w++ { go worker(w, jobs, results) }\nfor j := 1; j <= 5; j++ { jobs <- j }\nclose(jobs)\nfor r := 1; r <= 5; r++ { <-results }\nch1 := make(chan string, 1)\nch2 := make(chan string, 1)\nch1 <- \"one\"; ch2 <- \"two\"\nselect {\ncase msg1 := <-ch1: fmt.Println(\"Got:\",msg1)\ncase msg2 := <-ch2: fmt.Println(\"Got:\",msg2)\ndefault: fmt.Println(\"no msg\")\n}\nvar wg sync.WaitGroup\nfor i := 1; i <= 3; i++ {\n  wg.Add(1)\n  go func(id int) { defer wg.Done(); fmt.Println(id) }(i)\n}\nwg.Wait()",[
      E("go func()","Launch goroutine"),
      E("chan Type","Channel type"),
      E("<-chan / chan<-","Directional channels"),
      E("close(chan)","Signal no more sends"),
      E("select","Multiplex channels"),
      E("sync.WaitGroup","Wait for goroutines"),
    ]),
  ],["Worker pool with goroutines","Buffered channel queue","select with timeout"],[]),
  M(11,"Packages & Modules","Intermediate","35 min",["Packages","Exported/unexported","Go modules","Third-party deps"],[
    P("Go organizes code into packages. Uppercase = exported, lowercase = unexported. Modules are versioned package groups."),
    C("Packages","go","// math/operations.go\npackage math\nfunc Add(a,b int) int { return a+b }\nfunc subtract(a,b int) int { return a-b }\nfunc init() { fmt.Println(\"math initialized\") }\n// main.go\npackage main\nimport (\n  \"fmt\"\n  \"mymodule/math\"\n  \"github.com/google/uuid\"\n)\nfunc main() {\n  sum := math.Add(3,4)\n  id := uuid.New()\n}",[
      E("package name","Namespace"),
      E("Exported (Uppercase)","Public"),
      E("Unexported (lowercase)","Package-private"),
      E("init()","Auto-exec on import"),
      E("go.mod","Module definition"),
    ]),
  ],["Create math package","Use unexported helper","go get dependency"],[]),
  M(12,"File I/O","Intermediate","40 min",["os.ReadFile/WriteFile","bufio.Scanner","JSON encode/decode"],[
    P("Standard library provides os, io, bufio, encoding packages for file I/O. os.ReadFile/WriteFile for simple ops, bufio for efficient reading."),
    C("File I/O","go","type Person struct {\n  Name string `json:\"name\"`\n  Age int `json:\"age\"`\n}\n// Write\nerr := os.WriteFile(\"data.txt\",[]byte(\"Hello\"),0644)\n// Read\ncontent, _ := os.ReadFile(\"data.txt\")\n// Append\nf, _ := os.OpenFile(\"data.txt\",os.O_APPEND|os.O_WRONLY,0644)\nf.WriteString(\"\\nNew line\")\nf.Close()\n// Buffered scans\nfile, _ := os.Open(\"data.txt\")\nscanner := bufio.NewScanner(file)\nfor scanner.Scan() { fmt.Println(scanner.Text()) }\nfile.Close()\n// JSON\np := Person{\"Alice\",25}\njsonData, _ := json.Marshal(p)\nos.WriteFile(\"person.json\",jsonData,0644)\nvar loaded Person\nraw, _ := os.ReadFile(\"person.json\")\njson.Unmarshal(raw, &loaded)",[
      E("os.ReadFile/WriteFile","Simple file ops"),
      E("os.OpenFile flags","Append/write modes"),
      E("bufio.Scanner","Line-by-line"),
      E("json.Marshal/Unmarshal","JSON serialization"),
      E("struct tags","JSON field mapping"),
    ]),
  ],["Read file count lines","Encode/decode JSON","Write CSV"],[]),
  M(13,"Testing","Intermediate","40 min",["testing package","Table-driven tests","Benchmarks","Examples"],[
    P("Go has built-in testing. Test files end _test.go. Table-driven tests are idiomatic. Benchmarks measure performance."),
    A("Testing is like a quality inspector. Table-driven tests are checklists - each row is an inspection item."),
    C("Testing","go","// main_test.go\npackage main\nimport \"testing\"\nfunc TestSum(t *testing.T) {\n  tests := []struct{\n    name string\n    input []int\n    want int\n  }{\n    {\"empty\", []int{}, 0},\n    {\"multiple\", []int{1,2,3}, 6},\n  }\n  for _, tt := range tests {\n    t.Run(tt.name, func(t *testing.T) {\n      got := Sum(tt.input)\n      if got != tt.want { t.Errorf(\"got %d, want %d\", got, tt.want) }\n    })\n  }\n}\nfunc BenchmarkSum(b *testing.B) {\n  nums := []int{1,2,3,4,5}\n  for i := 0; i < b.N; i++ { Sum(nums) }\n}\nfunc ExampleSum() {\n  fmt.Println(Sum([]int{1,2,3}))\n  // Output: 6\n}",[
      E("TestXxx(t *testing.T)","Test function signature"),
      E("Table-driven tests","Slice of test cases"),
      E("t.Run subtests","Named sub-tests"),
      E("b.N benchmarks","Auto-tuned iterations"),
      E("Example functions","Testable docs"),
    ]),
  ],["Table-driven test for IsEven","Benchmark Sum","Write Example function"],[]),
  M(14,"Web Server","Intermediate","50 min",["net/http server","Routing","JSON responses","Middleware"],[
    P("Go's net/http provides production-quality HTTP server. Handler interface, ServeMux for routing, built-in JSON encoding."),
    C("Web Server","go","type Product struct {\n  ID int `json:\"id\"`\n  Name string `json:\"name\"`\n  Price float64 `json:\"price\"`\n}\nvar products = []Product{{1,\"Laptop\",999.99},{2,\"Mouse\",29.99}}\nfunc logging(next http.Handler) http.Handler {\n  return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {\n    log.Printf(\"%s %s\", r.Method, r.URL.Path)\n    next.ServeHTTP(w, r)\n  })\n}\nfunc productsHandler(w http.ResponseWriter, r *http.Request) {\n  w.Header().Set(\"Content-Type\",\"application/json\")\n  json.NewEncoder(w).Encode(products)\n}\nmux := http.NewServeMux()\nmux.HandleFunc(\"GET /api/products\", productsHandler)\nserver := &http.Server{\n  Addr: \":8080\",\n  Handler: logging(mux),\n  ReadTimeout: 10 * time.Second,\n}\nlog.Fatal(server.ListenAndServe())",[
      E("http.Handler","ServeHTTP method"),
      E("http.HandleFunc","Route handler"),
      E("json.NewEncoder(w)","JSON response"),
      E("Middleware pattern","Wrap handler in handler"),
      E("http.Server config","Timeouts/address"),
    ]),
  ],["Build GET /api/items","JSON response middleware","Health check endpoint"],[]),
];
const rust_modules = [
  M(1,"Intro to Rust","Beginner","30 min",["Rust goals","Install with rustup","First program","Cargo toolchain"],[
    P("Rust is a systems language focused on safety, speed, concurrency. Created at Mozilla (2010), now Rust Foundation. Memory safety without GC."),
    A("Rust is like a car with advanced safety. Borrow checker is automatic braking preventing crashes at compile time."),
    C("First Rust","rust","fn main() {\n  println!(\"Hello, World!\");\n  let mut name = String::new();\n  println!(\"Enter name: \");\n  std::io::stdin().read_line(&mut name).expect(\"Failed\");\n  println!(\"Welcome, {}!\", name.trim());\n}",[
      E("fn main()","Entry point"),
      E("println!()","Print macro"),
      E("let mut name = String::new()","Mutable string"),
      E("read_line(&mut name)","Read input"),
      E(".expect()","Unwrap or panic"),
    ]),
  ],["Hello World","Read and greet","cargo new project"],[]),
  M(2,"Variables & Mutability","Beginner","35 min",["let bindings","Shadowing vs mut","const","Scope"],[
    P("Variables immutable by default. Shadowing redeclares same name (can change type). Constants are compile-time evaluated."),
    A("Immutability is like 'paint wet'. You can repaint (shadow) but not modify. mut gives permission to touch up."),
    C("Variables","rust","let x = 5;\nlet mut y = 10;\ny += 5;\nlet name = \"Alice\";\nlet name = name.len();  // shadowing changes type!\nconst MAX_SPEED: u32 = 120;\nlet outer = 1;\n{\n  let inner = 2;\n  println!(\"inner: {}, outer: {}\", inner, outer);\n}\nlet (a,b) = (10,20);",[
      E("let x = 5","Immutable binding"),
      E("let mut y = 10","Mutable binding"),
      E("Shadowing","New var same name"),
      E("const NAME: T","Compile-time constant"),
      E("Block scope {}","Local variable scope"),
    ]),
  ],["Create immut/mut variables","Shadow string to length","Declare PI constant"],[]),
  M(3,"Data Types","Beginner","35 min",["Scalar types","Compound types (tuples, arrays)","Type inference"],[
    P("Scalar: i32, u64, f64, bool, char. Compound: tuples, arrays. Integer sizes explicit: i8, i16, i32, i64. char is 4 bytes (Unicode)."),
    C("Data Types","rust","let a: i32 = -42;\nlet b: u64 = 100;\nlet pi: f64 = 3.14159;\nlet is_rust: bool = true;\nlet heart: char = '\u2764';\nlet person: (&str, u8, bool) = (\"Alice\",25,true);\nlet (name,age,active) = person;\nlet arr: [i32; 5] = [1,2,3,4,5];\nlet zeros = [0; 3];\nlet index: usize = 2;\nlet mut x: u8 = 250;\nx = x.wrapping_add(10);",[
      E("i32, u64, f64, bool, char","Scalar types"),
      E("(type,type,...)","Tuple type"),
      E("[type; length]","Array type"),
      E("tuple.0 / destructuring","Tuple access"),
      E("wrapping_add()","Safe overflow"),
    ]),
  ],["Create tuple for product","Array of 10 zeros","Safe math with wrapping_add"],[]),
  M(4,"Functions & Control Flow","Beginner","40 min",["fn with params","Expressions vs statements","match","loop, while, for"],[
    P("fn keyword defines functions. Last expression is returned. Match is powerful pattern matching. loop can break with value."),
    A("Match is like a vending machine. Each arm is a button, press matching one, get the item."),
    C("Functions & Control Flow","rust","fn add(a: i32, b: i32) -> i32 { a + b }\nfn describe(n: i32) -> &'\''static str {\n  match n {\n    0 => \"zero\",\n    1..=9 => \"small\",\n    _ if n % 2 == 0 => \"even\",\n    _ => \"other\",\n  }\n}\nlet mut count = 0;\nlet result = loop {\n  count += 1;\n  if count == 10 { break count * 2; }\n};\nlet mut n = 3;\nwhile n > 0 { println!(\"{}...\",n); n -= 1; }\nfor i in 0..5 { println!(\"i = {}\",i); }\nlet words = [\"hello\",\"world\"];\nfor (idx,word) in words.iter().enumerate() { println!(\"{}: {}\",idx,word); }",[
      E("fn name(params) -> Type","Function declaration"),
      E("Expression (no ;)","Return value"),
      E("match { arm => }","Pattern matching"),
      E("loop with break value","Infinite -> value"),
      E("0..5 range","Exclusive range"),
      E("for with enumerate","Index + value"),
    ]),
  ],["Write fibonacci fn","Grade with match","Loop break with value"],[]),
  M(5,"Ownership","Intermediate","50 min",["Ownership rules","Move semantics","Clone","Copy trait"],[
    P("Three rules: each value has one owner, only one owner, owner out of scope = dropped. Memory safety without GC."),
    A("Ownership is like a library book. Only one person has the original. Borrow it (reference) and return it. Clone is a photocopy."),
    C("Ownership","rust","let s1 = String::from(\"hello\");\nlet s2 = s1;  // MOVED\n// println!(\"{}\", s1);  ERROR!\nlet a = String::from(\"world\");\nlet b = a.clone();  // deep copy\nprintln!(\"a={}, b={}\", a, b);  // both OK\nlet x = 5;\nlet y = x;  // Copy (stack)\nprintln!(\"x={}, y={}\", x, y);  // both OK\nfn take(s: String) { println!(\"{}\", s); }\nlet name = String::from(\"Alice\");\ntake(name);\n// println!(\"{}\", name);  ERROR\nfn gives() -> String { String::from(\"yours\") }\nfn takes_and_gives(s: String) -> String { s }",[
      E("let s2 = s1","Move transfers ownership"),
      E("s1.clone()","Deep copy (heap)"),
      E("Copy trait","Auto-copy stack types"),
      E("Move into function","Ownership transferred"),
      E("Return ownership","Value moved back"),
    ]),
  ],["Move String, verify error","Clone struct, use both","Fn takes and returns"],[]),
  M(6,"References & Borrowing","Intermediate","40 min",["&T immutable ref","&mut T mutable ref","Borrowing rules","No dangling"],[
    P("References borrow without owning. One &mut OR many &. References always valid. Compiler prevents dangling."),
    A("&T is 'look but no touch' pass (many). &mut T is 'you can edit' pass (only one at a time)."),
    C("References","rust","let mut s = String::from(\"hello\");\nlet r1 = &s;\nlet r2 = &s;  // many immutable OK\nprintln!(\"{} and {}\", r1, r2);\nlet r3 = &mut s;  // one mutable\nr3.push_str(\" world\");\nfn calculate_length(s: &String) -> usize { s.len() }\nlet len = calculate_length(&s);  // s still valid\nfn modify(s: &mut String) { s.push_str(\"d!\"); }\nmodify(&mut s);\n// fn dangle() -> &String {\n//   let s = String::from(\"hello\");\n//   &s  // ERROR: returns ref to local\n// }",[
      E("&T reference","Immutable borrow"),
      E("&mut T reference","Mutable borrow"),
      E("One &mut OR many &","Borrowing rule"),
      E("Reference params","Borrow without owning"),
      E("No dangling references","Use-after-free prevented"),
    ]),
  ],["Function taking &String","Mutable ref to append","Violate borrowing rule"],[]),
  M(7,"Slices","Intermediate","35 min",["String slices &str","Array slices","&str parameter (flexible)"],[
    P("Slices reference contiguous sequences. &str references part of String. &[i32] references part of array. Always borrowed."),
    C("Slices","rust","let s = String::from(\"hello world\");\nlet hello = &s[0..5];\nlet world = &s[6..11];\nlet whole = &s[..];\nlet literal: &str = \"hello\";\nfn first_word(s: &str) -> &str {\n  let bytes = s.as_bytes();\n  for (i, &item) in bytes.iter().enumerate() {\n    if item == b'\'' ' { return &s[0..i]; }\n  }\n  &s[..]\n}\nlet word = first_word(&s);\nlet arr = [1,2,3,4,5];\nlet slice = &arr[1..4];\nfn sum_slice(s: &[i32]) -> i32 { s.iter().sum() }\nprintln!(\"Sum: {}\", sum_slice(slice));\nfn print_it(s: &str) { println!(\"{}\", s); }\nprint_it(&my_string);  // &String -> &str\nprint_it(\"literal\");   // &str works directly",[
      E("&s[start..end]","Slice (end exclusive)"),
      E("&str vs String","Slice vs owned string"),
      E("&[i32] array slice","Array portion ref"),
      E("String coercion","&String -> &str auto"),
    ]),
  ],["First word slice function","Array slice average","&str param flexibility"],[]),
  M(8,"Structs","Intermediate","40 min",["Named/tuple/unit structs","Methods in impl","Associated functions","derive(Debug)"],[
    P("Three struct flavors: named-field, tuple struct (newtype), unit struct (zero-size). Methods in impl blocks."),
    C("Structs","rust","struct User { username: String, email: String, active: bool }\nstruct Color(u8,u8,u8);\nstruct AlwaysEqual;\nimpl User {\n  fn display(&self) -> String {\n    format!(\"{} <{}>\", self.username, self.email)\n  }\n  fn update_email(&mut self, new: &str) {\n    self.email = String::from(new);\n  }\n  fn new(name: String, email: String) -> User {\n    User { username: name, email, active: true }\n  }\n}\nlet mut u1 = User::new(\"alice\".into(),\"a@ex.com\".into());\nprintln!(\"{}\", u1.display());\nu1.update_email(\"new@ex.com\");\nlet u2 = User { username: \"bob\".into(), ..u1 };\nlet red = Color(255,0,0);\n#[derive(Debug)]\nstruct Point { x: i32, y: i32 }\nlet p = Point{ x:10, y:20 };\nprintln!(\"Point: {:?}\", p);",[
      E("struct Field { }","Named fields"),
      E("struct Name(type);","Tuple struct (newtype)"),
      E("impl Struct { fn }","Methods block"),
      E("&self parameter","Borrows instance"),
      E("Struct::new()","Constructor convention"),
      E("..struct update","Field spread"),
      E("#[derive(Debug)]","Auto Debug trait"),
    ]),
  ],["Create Product struct","Constructor fn","Struct update syntax"],[]),
  M(9,"Enums & Pattern Matching","Intermediate","45 min",["Enum with data","Option<T> (no null)","Result<T,E>","if let, ? operator"],[
    P("Enums are algebraic data types. Option<T> replaces null. Result<T,E> handles errors. Match is exhaustive."),
    A("Enums are like a multi-tool. Option is a box that may or may not contain something. Result is: your order or a complaint form."),
    C("Enums","rust","enum Message {\n  Quit,\n  Move { x: i32, y: i32 },\n  Write(String),\n  ChangeColor(u8,u8,u8),\n}\nimpl Message {\n  fn call(&self) {\n    match self {\n      Message::Quit => println!(\"Quit\"),\n      Message::Move{x,y} => println!(\"Move ({},{})\",x,y),\n      Message::Write(t) => println!(\"Text: {}\",t),\n      Message::ChangeColor(r,g,b) => println!(\"RGB ({},{},{})\",r,g,b),\n    }\n  }\n}\nfn divide(a: f64, b: f64) -> Option<f64> {\n  if b == 0.0 { None } else { Some(a/b) }\n}\nfn parse_int(s: &str) -> Result<i32, String> {\n  s.parse().map_err(|_| format!(\"Cannot parse '\"'{}'\"'\", s))\n}\nfn process() -> Result<i32, String> {\n  let a = parse_int(\"42\")?;\n  let b = parse_int(\"10\")?;\n  Ok(a+b)\n}\nlet double = divide(10.0,3.0).map(|v| v*2.0).unwrap_or(0.0);\nif let Some(v) = divide(10.0,2.0) { println!(\"Got: {}\", v); }",[
      E("enum { Variant }","Enum with optional data"),
      E("match { => }","Exhaustive matching"),
      E("Option<T> Some/None","Null-safe value"),
      E("Result<T,E> Ok/Err","Error handling enum"),
      E("? operator","Propagate error"),
      E("if let Pattern","Single variant check"),
    ]),
  ],["TrafficLight enum","Option safe divide","? operator function"],[]),
  M(10,"Modules & Cargo","Intermediate","40 min",["mod keyword","pub visibility","Cargo.toml","doc tests"],[
    P("Modules organize code. pub controls visibility. Cargo manages builds, deps, tests, docs. Each file is a module."),
    C("Modules","rust","// src/lib.rs\npub mod math {\n  pub fn add(a:i32,b:i32)->i32{ a+b }\n  fn internal_helper(){}\n  pub mod advanced {\n    pub fn multiply(a:i32,b:i32)->i32{ a*b }\n  }\n}\n// src/main.rs\nuse my_crate::math;\nfn main() { println!(\"{}\", math::add(3,4)); }\n// Cargo.toml\n// [package]\n// name = \"my_crate\"\n// version = \"0.1.0\"\n// edition = \"2021\"\n// [dependencies]\n// serde = { version = \"1.0\", features = [\"derive\"] }\npub use crate::front_of_house::hosting;  // re-export\n/// Adds two numbers\n/// ```\n/// let result = add(2, 3);\n/// assert_eq!(result, 5);\n/// ```\npub fn add(a: i32, b: i32) -> i32 { a + b }",[
      E("mod name { }","Module definition"),
      E("pub fn / pub struct","Public visibility"),
      E("use path::item","Import"),
      E("pub use re-export","External access to path"),
      E("Cargo.toml","Dependencies/config"),
      E("/// doc tests","Doc + test examples"),
    ]),
  ],["Module hierarchy with pub","External crate from crates.io","Doc test for fn"],[]),
  M(11,"Collections","Intermediate","40 min",["Vec<T>","HashMap<K,V>","HashSet","String methods"],[
    P("Vec is growable array. HashMap stores key-value pairs. HashSet is unique elements. String is growable UTF-8."),
    C("Collections","rust","let mut v: Vec<i32> = Vec::new();\nv.push(1); v.push(2);\nlet v2 = vec![1,2,3];\nlet third = &v2[2];\nlet third = v2.get(2);\nfor i in &v { println!(\"{}\", i); }\nfor i in &mut v { *i *= 2; }\nuse std::collections::HashMap;\nlet mut scores = HashMap::new();\nscores.insert(\"Alice\".into(), 100);\nlet score = scores.get(\"Alice\");\nscores.entry(\"Charlie\".into()).or_insert(75);\nuse std::collections::HashSet;\nlet mut set = HashSet::new();\nset.insert(1); set.insert(2); set.insert(1);\nlet mut s = String::from(\"hello\");\ns.push_str(\" world\");\ns.push('!');\nlet s1 = String::from(\"Hello, \");\nlet s2 = String::from(\"world!\");\nlet s3 = s1 + &s2;",[
      E("Vec::new()","Dynamic array"),
      E("v.push(item)","Add to end"),
      E("v.get(i) -> Option","Safe indexing"),
      E("HashMap insert/get","Key-value"),
      E(".entry().or_insert()","Entry API"),
      E("s1 + &s2","String concat (moves s1)"),
    ]),
  ],["Vec sum numbers","Freq counter HashMap","HashSet dedup"],[]),
  M(12,"Error Handling","Intermediate","40 min",["panic! vs Result","Combinators map/and_then","Custom error types","? operator"],[
    P("panic! for unrecoverable, Result for recoverable. Idiomatic Rust returns Result. ? propagates errors."),
    C("Error Handling","rust","use std::fs::File;\nuse std::io::{self, Read};\n#[derive(Debug)]\npub enum MyError {\n  Io(io::Error),\n  Parse(std::num::ParseIntError),\n  NotFound(String),\n}\nimpl std::fmt::Display for MyError {\n  fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {\n    match self {\n      MyError::Io(e) => write!(f, \"IO: {}\", e),\n      MyError::Parse(e) => write!(f, \"Parse: {}\", e),\n      MyError::NotFound(s) => write!(f, \"Not found: {}\", s),\n    }\n  }\n}\nimpl std::error::Error for MyError {}\nimpl From<io::Error> for MyError {\n  fn from(e: io::Error) -> Self { MyError::Io(e) }\n}\nfn read_number(path: &str) -> Result<i32, MyError> {\n  let mut contents = String::new();\n  File::open(path)?.read_to_string(&mut contents)?;\n  Ok(contents.trim().parse()?)\n}\nlet result: Result<i32, &str> = Ok(10);\nlet doubled = result.map(|v| v*2).unwrap_or(0);\nlet res: Result<i32, &str> = opt.ok_or(\"was None\");",[
      E("Result<T,E>","Recoverable error"),
      E("? operator","Propagate upward"),
      E("Custom error type","Display + Error impl"),
      E("From trait","Error conversion"),
      E("map/and_then/unwrap_or","Combinators"),
      E("ok_or()","Option -> Result"),
    ]),
  ],["Custom error with From impls","? for multiple errors","Chain fallible ops"],[]),
  M(13,"Generics & Traits","Intermediate","50 min",["Generic <T>","Trait definitions","Trait bounds","impl Trait"],[
    P("Generics enable type-safe reuse. Traits define shared behavior. Trait bounds constrain generics. impl Trait is concise."),
    A("Generics are a mold for any shape. Traits are certifications. Trait bounds: 'only certified flyers allowed'."),
    C("Generics & Traits","rust","fn largest<T: PartialOrd>(list: &[T]) -> &T {\n  let mut largest = &list[0];\n  for item in list { if item > largest { largest = item; } }\n  largest\n}\ntrait Summary {\n  fn summarize(&self) -> String;\n  fn prefix(&self) -> String { String::from(\"Summary: \") }\n}\nstruct Article { title: String, content: String }\nimpl Summary for Article {\n  fn summarize(&self) -> String {\n    format!(\"{}: {}\", self.title, &self.content[..20.min(self.content.len())])\n  }\n}\nstruct Tweet { text: String }\nimpl Summary for Tweet {\n  fn summarize(&self) -> String { format!(\"Tweet: {}\", self.text) }\n}\nfn notify(item: &impl Summary) {\n  println!(\"{}{}\", item.prefix(), item.summarize());\n}\nfn process<T,U>(a: &T, b: &U) -> String\nwhere T: Summary, U: std::fmt::Debug\n{ format!(\"{} | {:?}\", a.summarize(), b) }\nimpl<T: std::fmt::Display> Summary for T {\n  fn summarize(&self) -> String { format!(\"Display: {}\", self) }\n}\nfn returns_summarizable() -> impl Summary {\n  Article { title: \"Breaking\".into(), content: \"News!\".into() }\n}",[
      E("fn<T: Bound>(t:T)","Generic + trait bound"),
      E("trait Name { fn(); }","Trait definition"),
      E("impl Trait for Type","Implement trait"),
      E("&impl Trait param","Bound sugar"),
      E("where T: Bound","Where clause"),
      E("Blanket impl","For all with bound"),
      E("impl Trait return","Opaque return type"),
    ]),
  ],["Printable trait default","Generic max PartialOrd","Trait for custom struct"],[]),
  M(14,"Lifetimes","Advanced","45 min",["'\''a annotation","Functions with lifetimes","Elision rules","'\''static"],[
    P("Lifetimes ensure references valid as long as used. '\''a syntax. Most inferred via elision. '\''static lives entire program."),
    A("Lifetimes are library due dates. '\''a means 'ref valid until date a'. '\''static is permanent reference, never leaves library."),
    C("Lifetimes","rust","fn longest<'\''a>(x: &'\''a str, y: &'\''a str) -> &'\''a str {\n  if x.len() > y.len() { x } else { y }\n}\nstruct Excerpt<'\''a> { part: &'\''a str }\nimpl<'\''a> Excerpt<'\''a> {\n  fn level(&self) -> i32 { 3 }\n  fn announce(&self, announcement: &str) -> &str {\n    println!(\"Attention: {}\", announcement);\n    self.part\n  }\n}\nfn first_word(s: &str) -> &str {  // elided\n  let bytes = s.as_bytes();\n  for (i, &item) in bytes.iter().enumerate() {\n    if item == b'\'' ' { return &s[0..i]; }\n  }\n  &s[..]\n}\nstatic HELLO: &str = \"Hello\";\nfn static_ref() -> &'\''static str { \"I live forever\" }\nlet string1 = String::from(\"long\");\nlet string2 = String::from(\"longer\");\nlet result = longest(&string1, &string2);\nlet novel = String::from(\"Once upon...\");\nlet excerpt = Excerpt { part: &novel[..10] };",[
      E("&'\''a T","Lifetime annotation"),
      E("fn<'\''a>(x:&'\''a)->&'\''a","Lifetime in function"),
      E("struct Name<'\''a>","Struct with ref field"),
      E("Elision rules","Compiler inference"),
      E("'\''static","Program lifetime"),
    ]),
  ],["Longest fn with lifetimes","Struct with reference","Fix lifetime error"],[]),
  M(15,"Closures & Iterators","Advanced","50 min",["|| closure syntax","Fn/FnMut/FnOnce","Iterator adapters","Lazy evaluation"],[
    P("Closures capture environment. Iterators are lazy. Adapters (map, filter) chain transformations until consumed (collect)."),
    A("Closures are Polaroid pictures capturing the moment. Iterators are assembly lines - transform happens, but nothing moves until the end."),
    C("Closures & Iterators","rust","let add_one = |x| x + 1;\nlet multiply = |a:i32,b:i32| -> i32 { a*b };\nlet x = 10;\nlet add_x = |y| x + y;  // captures x\nfn call_fn<F: Fn()>(f: F) { f() }\nfn call_fn_mut<F: FnMut()>(mut f: F) { f() }\nfn call_fn_once<F: FnOnce()>(f: F) { f() }\nlet mut count = 0;\ncall_fn(|| println!(\"Fn\"));\ncall_fn_mut(|| count += 1);\ncall_fn_once(|| println!(\"Once\"));\nlet numbers = vec![1,2,3,4,5];\nlet evens: Vec<i32> = numbers\n  .iter()\n  .filter(|&n| n%2==0)\n  .map(|n| n*n)\n  .collect();\nlet lazy = numbers.iter().map(|n| { println!(\"Proc {}\",n); n*2 });\nprintln!(\"Nothing processed yet\");\nlet result: Vec<i32> = lazy.collect();\nlet sum: i32 = numbers.iter().sum();\nlet any = numbers.iter().any(|&n| n>3);\nlet all = numbers.iter().all(|&n| n>0);\nstruct Counter { count: u32 }\nimpl Iterator for Counter {\n  type Item = u32;\n  fn next(&mut self) -> Option<Self::Item> {\n    self.count += 1;\n    if self.count < 6 { Some(self.count) } else { None }\n  }\n}",[
      E("|params| expr","Closure syntax"),
      E("Fn / FnMut / FnOnce","Capture trait"),
      E(".iter().filter().map()","Adapter chain"),
      E(".collect()","Consumer"),
      E("Lazy iteration","Adapters deferred"),
      E("sum/count/any/all","Consumers"),
      E("Custom Iterator","Implement next()"),
    ]),
  ],["Filter/map on Vec","Closure capturing env","Custom Counter iterator"],[]),
  M(16,"Concurrency & Testing","Advanced","55 min",["std::thread","mpsc channels","Arc<Mutex>","Send/Sync","Unit/integration tests"],[
    P("Threads via std::thread, channels for message passing, Arc<Mutex> for shared state. Rust eliminates data races at compile time via Send/Sync."),
    A("Concurrency is a busy kitchen. Threads are chefs, channels are order tickets, Arc<Mutex> is the shared cookbook only one chef uses at a time."),
    C("Concurrency & Testing","rust","use std::thread;\nuse std::sync::mpsc;\nuse std::sync::{Arc, Mutex};\nlet (tx, rx) = mpsc::channel();\nthread::spawn(move || {\n  tx.send(String::from(\"hello\")).unwrap();\n});\nlet received = rx.recv().unwrap();\nprintln!(\"Got: {}\", received);\nlet counter = Arc::new(Mutex::new(0));\nlet mut handles = vec![];\nfor _ in 0..10 {\n  let counter = Arc::clone(&counter);\n  handles.push(thread::spawn(move || {\n    let mut num = counter.lock().unwrap();\n    *num += 1;\n  }));\n}\nfor handle in handles { handle.join().unwrap(); }\nprintln!(\"Result: {}\", *counter.lock().unwrap());\n// unit test\n#[cfg(test)]\nmod tests {\n  #[test]\n  fn it_works() {\n    let result = 2 + 2;\n    assert_eq!(result, 4);\n  }\n  #[test]\n  #[should_panic]\n  fn failing_test() { panic!(\"fail\"); }\n}",[
      E("thread::spawn","Create thread"),
      E("mpsc::channel","Message passing"),
      E("Arc<Mutex<T>>","Shared mutable state"),
      E("lock().unwrap()","Acquire mutex lock"),
      E("Send trait","Thread-safe transfer"),
      E("Sync trait","Thread-safe sharing"),
      E("#[test]","Unit test attribute"),
    ]),
  ],["Channel send/receive","Arc<Mutex> shared counter","Write test with assert_eq"],[]),
];
function addQuizzesAndVideos(modules, courseSpecificQ, courseSpecificV) {
  return modules.map(m => {
    m.quiz = courseSpecificQ[m.id - 1] || [];
    m.videos = courseSpecificV[m.id - 1] || [];
    return m;
  });
}

const csharpQuiz = [
  [Q("What platform does C# run on?",[".NET Framework","JVM","Node.js","Python Runtime"],0),Q("Entry point method name?",["Main","Start","Run","Execute"],0),Q("String interpolation prefix?",["$","@","#","%"],0),Q("C# creator?",["Anders Hejlsberg","James Gosling","Bjarne Stroustrup","Dennis Ritchie"],0)],
  [Q("Which is a reference type?",["int","bool","string","char"],2),Q("decimal literal suffix?",["d","m","f","l"],1),Q("TryParse returns?",["Parsed value","bool success","string","void"],1),Q("Default value for int?",["0","null","undefined","false"],0)],
  [Q("Foreach works with?",["IEnumerable","IEnumerator only","Arrays only","Lists only"],0),Q("Ternary needs how many operands?",["3","2","1","4"],0),Q("C# switch can use?",["Pattern matching","Only constants","Strings only","Numbers only"],0),Q("break in switch?",["Exits case","Continues loop","Returns value","Skips iteration"],0)],
  [Q("Array size can change?",["No","Yes","Only with Array.Resize","Depends"],2),Q("Dictionary key must be?",["Unique","Nullable","int type","string type"],0),Q("ToList() executes?",["Immediately","Deferred","Never","On enumeration"],0),Q("What is a Dictionary?",["Key-value pairs","Linked list","Queue","Stack"],0)],
  [Q("out parameter must be?",["Assigned before return","Initialized before call","Optional","Reference type"],0),Q("Expression-bodied method uses?",["=>","->","==",":="],0),Q("Named arguments improve?",["Readability","Performance","Type safety","Encapsulation"],0),Q("ref modifier passes by?",["Reference","Value","Copy","Pointer"],0)],
  [Q("Static method called on?",["Class","Instance","Object","Namespace"],1),Q("Private set allows?",["Internal modification","No modification","Public get","Private get"],0),Q("Auto-property generates?",["Backing field","No field","Static field","Readonly field"],0),Q("Object initializer uses?",["{}","()","[]","<>"],0)],
  [Q("Abstract method has?",["No body","Default body","Virtual body","Static body"],0),Q("Sealed class prevents?",["Inheritance","Instantiation","Override","Access"],1),Q("base() calls?",["Parent constructor","Child constructor","Default constructor","Static constructor"],0),Q("Polymorphism uses?",["Base type ref","Child type ref","Static binding","Value type"],0)],
  [Q("Interface naming convention?",["I prefix","Interface suffix","No convention","Abstract prefix"],0),Q("Class can implement?",["Multiple interfaces","One interface","Two interfaces","Unlimited"],0),Q("Default interface method added in?",["C# 6","C# 8","C# 10","C# 12"],1),Q("Abstract class vs interface?",["Abstract has state","Same thing","Interface has fields","Abstract is sealed"],0)],
  [Q("Finally block always?",["Executes","Conditional","Skips on error","Optional catch"],0),Q("Custom exception extends?",["Exception","Object","ApplicationException","SystemException"],0),Q("using auto-calls?",["Dispose()","Close()","Exit()","Clean()"],0),Q("throw keyword?",["Raises exception","Catches exception","Ignores error","Logs warning"],0)],
  [Q("LINQ return is?",["Deferred until iteration","Immediate","After ToList","Never"],0),Q("Query syntax starts with?",["from","select","where","let"],0),Q("First() throws if?",["No matches","Null value","Multiple matches","Empty predicate"],0),Q("OrderBy defaults to?",["Ascending","Descending","Alphabetical","Unsorted"],0)],
  [Q("Event can be invoked?",["Only inside declaring class","From anywhere","From subscribers","Via delegate"],0),Q("Multicast delegate chains?",["Multiple methods","Multiple returns","Multiple params","Multiple classes"],0),Q("Func returns value, Action returns?",["void","int","bool","object"],0),Q("Predicate returns?",["bool","int","string","void"],0)],
  [Q("Generics eliminate?",["Boxing/unboxing","Inheritance","Polymorphism","Abstraction"],0),Q("Constraint keyword?",["where","constraint","extends","implements"],0),Q("Multiple constraints use?",["class, new()","class;new()","class|new()","class&new()"],0),Q("Default type parameter is?",["T","object","var","dynamic"],0)],
  [Q("AppendAllText adds to?",["End of file","Start of file","New file","Overwrites"],0),Q("StreamReader best for?",["Large files","Small files","Binary files","Directories"],0),Q("Path.Combine does?",["Joins paths safely","Creates directory","Finds file","Deletes file"],0),Q("File.ReadAllLines returns?",["string[]","string","List<string>","IEnumerable"],0)],
  [Q("Async method naming convention?",["Async suffix","Task prefix","Await prefix","No convention"],0),Q("await does what to thread?",["Releases thread","Blocks thread","Creates thread","Destroys thread"],0),Q("Deadlock risk with?",[".Result / .Wait()","await","WhenAll","ConfigureAwait"],0),Q("Task.WhenAll does?",["Waits all tasks","Waits first task","Cancels tasks","Creates tasks"],0)],
  [Q("Migration tool?",["dotnet ef migrations","npm run migrate","EF Tool CLI","SQL scripts"],0),Q("Include() does?",["Eager loading","Lazy loading","Explicit loading","No loading"],0),Q("SaveChangesAsync returns?",["int rows","bool success","void","Task"],0),Q("DbSet<T> maps to?",["Database table","C# array","JSON file","XML doc"],0)],
  [Q("ActionResult<T> is?",["Typed vs untyped","Sync vs async","GET vs POST","JSON vs XML"],0),Q("Middleware runs in?",["Pipeline order","Reverse order","All at once","Random order"],0),Q("Scoped lifetime is?",["Per request","Singleton","Transient","Per thread"],0),Q("ControllerBase provides?",["HTTP helpers","Database access","JSON parsing","Logging"],0)],
];

const csharpVideos = [
  [V("C# Full Course","freeCodeCamp","https://www.youtube.com/embed/0p0JLFj2rD8"),V("C# Tutorial","CodeWithHarry","https://www.youtube.com/embed/lfkBfW9uiq0")],
  [V("C# Variables","Programming with Mosh","https://www.youtube.com/embed/8o3CkfGcVJc")],
  [V("C# Control Flow","freeCodeCamp","https://www.youtube.com/embed/3I1B1jR2SpM")],
  [V("C# Collections","Programming with Mosh","https://www.youtube.com/embed/7r1LKfwa5ks")],
  [V("C# Methods","freeCodeCamp","https://www.youtube.com/embed/HqkE6xrq3L4")],
  [V("C# OOP","Programming with Mosh","https://www.youtube.com/embed/0p0JLFj2rD8")],
  [V("C# Inheritance","freeCodeCamp","https://www.youtube.com/embed/2p5b1YgBHfU")],
  [V("C# Interfaces","Programming with Mosh","https://www.youtube.com/embed/SvM3GRQv7cI")],
  [V("C# Exceptions","freeCodeCamp","https://www.youtube.com/embed/3I1B1jR2SpM")],
  [V("C# LINQ","Programming with Mosh","https://www.youtube.com/embed/z3PzGmMCLNM")],
  [V("C# Delegates & Events","freeCodeCamp","https://www.youtube.com/embed/0p0JLFj2rD8")],
  [V("C# Generics","Programming with Mosh","https://www.youtube.com/embed/vkGz7Moy1Wg")],
  [V("C# File I/O","freeCodeCamp","https://www.youtube.com/embed/0p0JLFj2rD8")],
  [V("C# Async/Await","Programming with Mosh","https://www.youtube.com/embed/2p5b1YgBHfU")],
  [V("EF Core Tutorial","freeCodeCamp","https://www.youtube.com/embed/0p0JLFj2rD8")],
  [V("ASP.NET Core API","freeCodeCamp","https://www.youtube.com/embed/0p0JLFj2rD8")],
];
const goQuiz = [
  [Q("Go created at?",["Google","Microsoft","Apple","IBM"],0),Q("Entry point signature?",["func main()","function main()","void main()","int main()"],0),Q("No semicolons because?",["Go inserts them","Compiler ignores","Not required","Syntax error"],0),Q("Go mascot?",["Gopher","Doge","Duck","Python"],0)],
  [Q("Short declaration operator?",[":=","=","var","const"],0),Q("Default string value?",["\"\"","nil","0","undefined"],0),Q("Explicit conversion in Go?",["Required","Automatic","Implicit","Optional"],0),Q("Zero value for int?",["0","nil","false","undefined"],0)],
  [Q("Go switch needs break?",["No, breaks auto","Yes, explicit","Only default","Only fallthrough"],0),Q("Go has while keyword?",["No, use for cond","Yes, while","Yes, do while","Only for"],0),Q("Defer executes when?",["Function returns","Immediately","Program exits","Block ends"],0),Q("for cond is same as?",["while","do-while","foreach","for init;cond;"],0)],
  [Q("Error type is returned as?",["Last value","First value","Pointer","Interface"],0),Q("Naked return valid only with?",["Named returns","Multiple returns","Single return","Error return"],0),Q("Variadic syntax?",["...int","int...","[]int","var int"],0),Q("Closure captures?",["Environment variables","Global vars","Package vars","OS vars"],0)],
  [Q("Slice vs array main diff?",["Variable length","Fixed length","Type safety","Performance"],0),Q("Map returns zero value if?",["Key missing","Key present","Map nil","Map empty"],0),Q("append may allocate?",["New underlying array","Same array","Panic","Overwrite"],0),Q("make allocates?",["Slice/map/chan","Array only","Struct only","Pointer only"],0)],
  [Q("Pointer receiver modifies?",["Original struct","Copy of struct","Both","Neither"],0),Q("Embedding is like?",["Composition","Inheritance","Interface","Abstract"],0),Q("Method receiver goes where?",["Between func and name","After func","Before func","Inside body"],0),Q("Promoted field?",["Direct access to embedded field","Must qualify","Private field","Static field"],0)],
  [Q("Go interfaces satisfied?",["Implicitly","Explicitly","By declaration","By import"],0),Q("Empty interface accepts?",["Any type","Only structs","Only pointers","Only builtins"],0),Q("Type assertion returns?",["Value and bool","Only value","Only bool","Nothing"],0),Q("Interface value stores?",["Dynamic type + value","Pointer only","Value only","Type only"],0)],
  [Q("Pointer arithmetic allowed?",["No","Yes","Only for arrays","Only for structs"],0),Q("new(T) returns?",["*T","T","nil","&T"],0),Q("Dereferencing nil causes?",["Panic","Error return","Zero value","Noop"],0),Q("& operator does?",["Takes address","Dereferences","Multiplies","Logical AND"],0)],
  [Q("Go errors are?",["Values returned","Exceptions thrown","Runtime halts","Warnings"],0),Q("errors.Is checks?",["Error chain equality","Type assertion","String match","Nil check"],0),Q("Recover works only in?",["Deferred function","Main function","Any function","Goroutine"],0),Q("error is an?",["Interface","Struct","String","Function"],0)],
  [Q("Goroutine stack starts?",["Small (KB), grows","Large (MB), fixed","OS thread size","Dynamic"],0),Q("Unbuffered channel blocks?",["Both send/receive","Only send","Only receive","Never"],0),Q("Closing channel signals?",["No more data","Causes panic","Blocks","Deletes channel"],0),Q("WaitGroup.Add must be called?",["Before goroutine","Inside goroutine","After goroutine","Anywhere"],0)],
  [Q("Exported names start with?",["Uppercase","Lowercase","Underscore","Any letter"],0),Q("init() runs when?",["Package imported","Function called","Program ends","Variable set"],0),Q("go mod init creates?",["go.mod","main.go","module cache","vendor dir"],0),Q("Package alias syntax?",["import f \"fmt\"","import \"fmt\" as f","using f = fmt","from fmt import"],0)],
  [Q("os.ReadFile returns?",["([]byte, error)","(string, error)","(io.Reader, error)","(int, error)"],0),Q("File permission 0644 means?",["Owner rw, others r","All rwx","Owner rwx, others r","Owner r"],0),Q("bufio.Scanner default split?",["Lines","Words","Bytes","Runes"],0),Q("json.Unmarshal needs?",["Pointer to target","Value to target","Nil","Slice"],0)],
  [Q("Test file suffix?",["_test.go",".test.go","_spec.go","_test.py"],0),Q("go test -v shows?",["Verbose output","Coverage","Benchmarks","Race detection"],0),Q("b.N determined by?",["Framework auto","User set value","Compiler","Constant"],0),Q("t.Run runs?",["Subtest","Main test","Benchmark","Example"],0)],
  [Q("Handler interface method?",["ServeHTTP(w,r)","Handle(w,r)","Serve(w,r)","Process(w,r)"],0),Q("Default mux is?",["http.ServeMux","http.DefaultMux","http.NewRouter","gorilla/mux"],0),Q("log.Fatal calls?",["os.Exit(1)","panic()","return","os.Exit(0)"],0),Q("Content-Type for JSON?",["application/json","text/json","json/application","text/plain"],0)],
];

const goVideos = [
  [V("Go Full Course","freeCodeCamp","https://www.youtube.com/embed/YS4e4q9oBaU"),V("Go Tutorial","CodeWithHarry","https://www.youtube.com/embed/JoJ8Sw5YVCA")],
  [V("Go Variables","freeCodeCamp","https://www.youtube.com/embed/YS4e4q9oBaU")],
  [V("Go Control Flow","Traversy Media","https://www.youtube.com/embed/YS4e4q9oBaU")],
  [V("Go Functions","Programming with Mosh","https://www.youtube.com/embed/YS4e4q9oBaU")],
  [V("Go Slices & Maps","Traversy Media","https://www.youtube.com/embed/YS4e4q9oBaU")],
  [V("Go Structs","freeCodeCamp","https://www.youtube.com/embed/YS4e4q9oBaU")],
  [V("Go Interfaces","Programming with Mosh","https://www.youtube.com/embed/YS4e4q9oBaU")],
  [V("Go Pointers","freeCodeCamp","https://www.youtube.com/embed/YS4e4q9oBaU")],
  [V("Go Error Handling","freeCodeCamp","https://www.youtube.com/embed/YS4e4q9oBaU")],
  [V("Go Concurrency","freeCodeCamp","https://www.youtube.com/embed/YS4e4q9oBaU")],
  [V("Go Modules","Traversy Media","https://www.youtube.com/embed/YS4e4q9oBaU")],
  [V("Go File I/O","freeCodeCamp","https://www.youtube.com/embed/YS4e4q9oBaU")],
  [V("Go Testing","freeCodeCamp","https://www.youtube.com/embed/YS4e4q9oBaU")],
  [V("Go Web Server","Traversy Media","https://www.youtube.com/embed/YS4e4q9oBaU")],
];
const rustQuiz = [
  [Q("Rust originally from?",["Mozilla","Google","Microsoft","Apple"],0),Q("println! is a?",["Macro","Function","Method","Keyword"],0),Q("cargo new creates?",["New project","New file","New module","New build"],0),Q("rustup manages?",["Toolchain versions","File system","Memory","Network"],0)],
  [Q("Rust vars default to?",["Immutable","Mutable","Null","Undefined"],0),Q("Shadowing allows?",["Type change","Only value change","Only mut change","Reference change"],0),Q("const must have?",["Explicit type","Automatic inference","mut keyword","String type"],0),Q("Block scope is?",["Curly braces","Parentheses","Brackets","Indentation"],0)],
  [Q("Default integer type?",["i32","i64","u32","isize"],0),Q("Rust char size?",["4 bytes","1 byte","2 bytes","8 bytes"],0),Q("usize depends on?",["Architecture (32/64)","Always 64","Always 32","Runtime"],0),Q("Array type syntax?",["[T; n]","[T, n]","(T; n)","{T; n}"],0)],
  [Q("Return keyword needed for last expr?",["No","Yes","Only early return","Only match"],0),Q("Match arms use?",["Patterns =>","Cases :","If conditions","Loop bodies"],0),Q("0..5 includes?",["0,1,2,3,4","0,1,2,3,4,5","1,2,3,4","1,2,3,4,5"],0),Q("loop break can return?",["A value","Nothing","Always 0","Error"],0)],
  [Q("Which types implement Copy?",["Ints, bools, floats","Strings, Vecs","All types","Only pointers"],0),Q("After move, original is?",["Invalidated","Still valid","Null","Copied"],0),Q("Clone vs Copy?",["Explicit vs implicit deep","Heap vs stack","All of above"],3),Q("Owner goes out of scope?",["Value dropped","Value leaked","Error","Undefined"],0)],
  [Q("How many mutable refs?",["One","Unlimited","Two","Zero"],0),Q("Dangling ref causes?",["Compile error","Runtime crash","Undefined behavior","Warning"],0),Q("Ref goes out of scope, value?",["Still valid","Dropped","Moved","Freed"],0),Q("Borrowing rules prevent?",["Data races","Memory leaks","Stack overflow","Division by zero"],0)],
  [Q("String slice type is?",["&str","String","&String","str"],0),Q("String literal type?",["&str","String","str","&String"],0),Q("Slice stores?",["Pointer + length","Pointer only","Length only","Copy of data"],0),Q("Slice indexing is?",["start..end","start:end","start,end","[start:end]"],0)],
  [Q("Method first parameter?",["&self","self","&mut self","Self"],0),Q("Tuple struct fields by?",[".0, .1, etc","name","index","&self"],0),Q("derive(Debug) enables?",["{:?} formatting","Display trait","Comparison","Clone"],0),Q("Struct field spread uses?",["..","...","*","&"],0)],
  [Q("Option replaces what?",["Null","Exceptions","Booleans","Arrays"],0),Q("Match must be?",["Exhaustive","Partial","Optional","Default"],0),Q("? operator propagates?",["Error upward","Value only","Panic","Warning"],0),Q("if let handles?",["Single pattern","All patterns","None","Errors"],0)],
  [Q("Default visibility in module?",["Private","Public","Crate-only","Global"],0),Q("cargo doc generates?",["HTML docs","Binary","Library","Tests"],0),Q("dev-dependencies for?",["Tests only","Production","All builds","Benchmarks"],0),Q("pub use does?",["Re-exports","Creates module","Moves file","Deletes path"],0)],
  [Q("Vec uses heap?",["Yes","No","Stack only","Static"],0),Q("HashMap iteration order?",["Random","Insertion order","Sorted","Deterministic"],0),Q("String concat moves?",["Left operand","Right operand","Both","Neither"],0),Q("HashSet stores?",["Unique elements","Duplicates","Key-value pairs","Indexed items"],0)],
  [Q("panic! is for?",["Unrecoverable errors","Recoverable errors","Warnings","Logging"],0),Q("? operator returns from?",["Current function","Current block","Main only","Loop"],0),Q("Box<dyn Error> allows?",["Multiple error types","Only one type","No runtime cost","Static dispatch"],0),Q("Result<T,E> returns?",["Ok or Err","True or False","Some or None","Pass or Fail"],0)],
  [Q("Traits are like?",["Interfaces","Abstract classes","Mixins","Modules"],0),Q("Blanket impl applies to?",["All satisfying bound","One type only","Built-in types","User types only"],0),Q("Where clause goes?",["After fn signature","Before generics","Inside body","Module level"],0),Q("impl Trait return is?",["Opaque type","Concrete type","Generic type","Dynamic type"],0)],
  [Q("Lifetime annotations start with?",["'\''","\"","&","~"],0),Q("'\''static means?",["Program lifetime","Shortest lifetime","Stack lifetime","Heap lifetime"],0),Q("Elision rules do what?",["Infer common lifetimes","Remove annotations","Add annotations","Optimize code"],0),Q("Lifetime ensures?",["Validity of references","Memory size","Type safety","Thread safety"],0)],
  [Q("Iterator adapters are?",["Lazy","Eager","Both","Neither"],0),Q("FnMut allows?",["Mutable capture","Move capture","Copy capture","Static capture"],0),Q("collect() is a?",["Consumer","Adapter","Closure","Trait"],0),Q("Closure captures by?",["Reference or value","Always reference","Always value","Pointer only"],0)],
  [Q("thread::spawn returns?",["JoinHandle","Thread","Result","Option"],0),Q("Arc provides?",["Atomic reference counting","Async I/O","Memory allocation","File system"],0),Q("Mutex lock() returns?",["MutexGuard","Raw pointer","bool","Option"],0),Q("#[test] runs with?",["cargo test","cargo run","cargo build","cargo check"],0)],
];

const rustVideos = [
  [V("Rust Full Course","freeCodeCamp","https://www.youtube.com/embed/zF34dRivLOw"),V("Rust Tutorial","CodeWithHarry","https://www.youtube.com/embed/nTpU0jFh3kE")],
  [V("Rust Variables","Programming with Mosh","https://www.youtube.com/embed/zF34dRivLOw")],
  [V("Rust Data Types","freeCodeCamp","https://www.youtube.com/embed/zF34dRivLOw")],
  [V("Rust Functions","Traversy Media","https://www.youtube.com/embed/zF34dRivLOw")],
  [V("Rust Ownership","freeCodeCamp","https://www.youtube.com/embed/zF34dRivLOw")],
  [V("Rust Borrowing","Programming with Mosh","https://www.youtube.com/embed/zF34dRivLOw")],
  [V("Rust Slices","freeCodeCamp","https://www.youtube.com/embed/zF34dRivLOw")],
  [V("Rust Structs","Traversy Media","https://www.youtube.com/embed/zF34dRivLOw")],
  [V("Rust Enums","freeCodeCamp","https://www.youtube.com/embed/zF34dRivLOw")],
  [V("Rust Modules & Cargo","Traversy Media","https://www.youtube.com/embed/zF34dRivLOw")],
  [V("Rust Collections","freeCodeCamp","https://www.youtube.com/embed/zF34dRivLOw")],
  [V("Rust Error Handling","freeCodeCamp","https://www.youtube.com/embed/zF34dRivLOw")],
  [V("Rust Generics & Traits","Programming with Mosh","https://www.youtube.com/embed/zF34dRivLOw")],
  [V("Rust Lifetimes","freeCodeCamp","https://www.youtube.com/embed/zF34dRivLOw")],
  [V("Rust Closures & Iterators","freeCodeCamp","https://www.youtube.com/embed/zF34dRivLOw")],
  [V("Rust Concurrency","freeCodeCamp","https://www.youtube.com/embed/zF34dRivLOw")],
];
const data = JSON.parse(fs.readFileSync(lessonsPath, "utf8"));

data["csharp"] = {
  title: "C#",
  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
  modules: addQuizzesAndVideos(csharp_modules, csharpQuiz, csharpVideos)
};
data["go"] = {
  title: "Go",
  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
  modules: addQuizzesAndVideos(go_modules, goQuiz, goVideos)
};
data["rust"] = {
  title: "Rust",
  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg",
  modules: addQuizzesAndVideos(rust_modules, rustQuiz, rustVideos)
};

fs.writeFileSync(lessonsPath, JSON.stringify(data, null, 2), "utf8");
console.log("Generated " + lessonsPath);
