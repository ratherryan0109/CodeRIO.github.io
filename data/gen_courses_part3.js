const fs = require('fs');
const path = require('path');

const LESSONS_PATH = path.join(__dirname, 'lessons.json');

function M(id, title, diff, dur, obj, con, ex, qz, vid) { return {id,title,difficulty:diff,duration:dur,objectives:obj,content:con,exercises:ex,quiz:qz,videos:vid}; }
function P(v) { return {type:'paragraph', value:v}; }
function A(v) { return {type:'analogy', value:v}; }
function C(title, lang, code, exp) { return {type:'code', title, language:lang, code, explanation:exp}; }
function E(code, desc) { return {code, desc}; }
function Q(q, opts, a) { return {question:q, options:opts, answer:a}; }
function V(t, c, u) { return {title:t, creator:c, url:u}; }

const pandas = {
  "title": "Pandas",
  "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  "modules": [
    M(1, "Introduction to Pandas", "Beginner", "30 min",
      ["Understand what Pandas is", "Learn about Series vs DataFrame", "Install Pandas and set up", "Explore basic Pandas objects"],
      [
        P("Pandas is a powerful Python library for data manipulation and analysis. Built on NumPy, it provides two primary data structures: Series (1D) and DataFrame (2D)."),
        A("Think of a Series as a single column in a spreadsheet, and a DataFrame as the entire spreadsheet with multiple columns, each potentially having different data types."),
        C("Installing and Importing Pandas", "python",
          "# Install: pip install pandas\nimport pandas as pd\n\nprint(pd.__version__)",
          [E("# Install comment", "Install via pip package manager"), E("import pandas as pd", "Standard import alias pd"), E("pd.__version__", "Verify installed version")]
        ),
        P("Pandas makes data tasks like reading CSV files, handling missing data, filtering, grouping, and merging intuitive with concise syntax.")
      ],
      ["Install Pandas and check version", "Create a simple Series from a list", "Create a simple DataFrame from a dict"],
      [
        Q("What does Pandas stand for?", ["Panel Data", "Python Data", "Pandas Data", "Panel Data System"], 0),
        Q("Which is the 2D data structure in Pandas?", ["Series", "DataFrame", "Array", "Panel"], 1),
        Q("Standard import alias for Pandas?", ["np", "pd", "pa", "pt"], 1),
        Q("Pandas is built on top of which library?", ["Matplotlib", "NumPy", "SciPy", "Scikit-learn"], 1)
      ],
      [V("Pandas Full Course", "freeCodeCamp", "https://www.youtube.com/embed/vmEHCJof9hw")]
    ),
    M(2, "Series & DataFrame", "Beginner", "40 min",
      ["Create Series from lists and dicts", "Create DataFrames from dicts and lists", "Access attributes like shape, dtypes, index", "Use head(), tail(), info(), describe()"],
      [
        P("A Series is a labeled 1D array capable of holding any data type. A DataFrame is a 2D labeled data structure with rows and columns."),
        C("Creating Series and DataFrame", "python",
          "import pandas as pd\n\n# Series from list\ns = pd.Series([10, 20, 30, 40], name='scores')\nprint(s)\n\n# DataFrame from dict\ndf = pd.DataFrame({\n    'Name': ['Alice', 'Bob', 'Charlie'],\n    'Age': [25, 30, 35],\n    'City': ['NYC', 'LA', 'Chicago']\n})\nprint(df.shape)\nprint(df.dtypes)\nprint(df.head(2))\nprint(df.describe())",
          [E("Series from list", "Creates labeled 1D array with index"), E("DataFrame from dict", "Keys become columns, values become rows"), E("df.shape", "Returns (rows, columns) tuple"), E("df.dtypes", "Shows data type of each column"), E("df.head(2)", "First 2 rows (default 5)"), E("df.describe()", "Statistical summary of numeric columns")]
        ),
        A("A Series is like a single column list with labels. A DataFrame is like a dictionary of Series objects aligned by row index."),
        P("Key attributes: index (row labels), columns (column labels), values (NumPy array), shape, dtypes, size.")
      ],
      ["Create a Series from a Python dictionary", "Create a DataFrame with 4 columns from a dict", "Use .info() to display DataFrame summary"],
      [
        Q("What does df.shape return?", ["Number of rows", "Number of columns", "Tuple of (rows, columns)", "Total elements"], 2),
        Q("How to view first n rows?", ["head(n)", "first(n)", "top(n)", "begin(n)"], 0),
        Q("Which method gives statistical summary?", ["info()", "summary()", "describe()", "stats()"], 2),
        Q("What does df.dtypes return?", ["Single type", "Type per column", "Type per row", "Data type of index"], 1)
      ],
      [V("Pandas Series and DataFrame", "Corey Schafer", "https://www.youtube.com/embed/zmdjNSmRXF4")]
    ),
    M(3, "Reading & Writing Data", "Beginner", "40 min",
      ["Read CSV files with read_csv()", "Write DataFrames to CSV with to_csv()", "Read Excel files with read_excel()", "Read JSON data with read_json()"],
      [
        P("Pandas can read and write data from various formats: CSV, Excel, JSON, SQL, HTML, and more. The most common are CSV and Excel."),
        C("Reading and Writing Data", "python",
          "import pandas as pd\n\n# Read CSV\ndf = pd.read_csv('data.csv')\n\n# Read with options\ndf = pd.read_csv('data.csv', header=0, index_col=0, parse_dates=['date'])\n\n# Write to CSV\ndf.to_csv('output.csv', index=False)\n\n# Read and write Excel\ndf = pd.read_excel('data.xlsx', sheet_name='Sheet1')\ndf.to_excel('output.xlsx', sheet_name='Results', index=False)\n\n# Read JSON\ndf = pd.read_json('data.json')",
          [E("pd.read_csv()", "Read CSV file into DataFrame"), E("header=0", "Use first row as column names"), E("index_col=0", "Use first column as row index"), E("parse_dates=['date']", "Convert date column to datetime"), E("to_csv('output.csv', index=False)", "Write DataFrame to CSV without row numbers"), E("read_excel / to_excel", "Read and write Excel files")]
        ),
        A("Reading data is like opening a filing cabinet: CSV is the most common folder, Excel is a binder with multiple sheets (tabs), and JSON is a digital card catalog."),
        P("Always inspect data after reading with .head(), .info(), and .shape to confirm it loaded correctly.")
      ],
      ["Read a CSV file and display first 3 rows", "Save a DataFrame to CSV without the index column", "Read a JSON file and check its shape"],
      [
        Q("Which function reads CSV files?", ["load_csv()", "read_csv()", "import_csv()", "open_csv()"], 1),
        Q("What does index=False do in to_csv()?", ["Writes index column", "Omits index column", "Numbers rows", "Skips header"], 1),
        Q("Which parameter parses dates?", ["parse_dates", "convert_dates", "date_format", "datetime"], 0),
        Q("How to read a specific Excel sheet?", ["sheet='Sheet1'", "sheet_name='Sheet1'", "sheet_index=0", "excel_sheet='Sheet1'"], 1)
      ],
      [V("Pandas Read CSV Tutorial", "Data School", "https://www.youtube.com/embed/5r0H5rZASGk")]
    ),
    M(4, "Data Cleaning", "Intermediate", "50 min",
      ["Detect missing values with isnull()", "Drop missing data with dropna()", "Fill missing values with fillna()", "Remove duplicate rows"],
      [
        P("Real-world data is messy with missing values, duplicates, and inconsistent formatting. Pandas provides robust tools for cleaning data."),
        C("Handling Missing Data and Duplicates", "python",
          "import pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('dirty_data.csv')\n\n# Detect missing\nprint(df.isnull().sum())\n\n# Drop rows with any NaN\ndf_clean = df.dropna()\n\n# Drop rows where all values are NaN\ndf_clean = df.dropna(how='all')\n\n# Fill missing values\ndf['Age'].fillna(df['Age'].mean(), inplace=True)\ndf['Name'].fillna('Unknown', inplace=True)\n\n# Fill forward (propagate last valid)\ndf['Sales'].fillna(method='ffill', inplace=True)\n\n# Remove duplicates\ndf.drop_duplicates(subset=['Email'], keep='first', inplace=True)",
          [E("isnull().sum()", "Count missing values per column"), E("dropna()", "Remove rows with any NaN"), E("dropna(how='all')", "Remove rows where ALL values are NaN"), E("fillna(value)", "Replace NaN with specified value"), E("method='ffill'", "Forward fill: propagate last valid value"), E("drop_duplicates(subset=)", "Remove duplicate rows based on column")]
        ),
        A("Missing data is like holes in a sweater. You can patch them (fillna), cut out the damaged section (dropna), or use the surrounding threads to close the gap (ffill/bfill)."),
        P("Always check the extent of missing data before deciding: dropping too many rows loses information, filling incorrectly introduces bias.")
      ],
      ["Find and count all null values in a DataFrame", "Drop rows where any column has NaN", "Fill missing numeric values with the column mean"],
      [
        Q("Which method detects missing values?", ["null()", "isnull()", "missing()", "isna()"], 1),
        Q("What does dropna(how='all') do?", ["Drops if any NaN", "Drops if all NaN", "Drops duplicates", "Keeps all rows"], 1),
        Q("What does method='ffill' do?", ["Fill backward", "Fill forward", "Fill with mean", "Fill with zero"], 1),
        Q("Which method removes duplicates?", ["unique()", "drop_duplicates()", "distinct()", "remove_dup()"], 1)
      ],
      [V("Data Cleaning with Pandas", "freeCodeCamp", "https://www.youtube.com/embed/3jY1Y2DqL8E")]
    ),
    M(5, "Filtering & Selection", "Intermediate", "45 min",
      ["Select rows/columns with loc (label-based)", "Select with iloc (integer-based)", "Boolean indexing with conditions", "Use .isin() and .between()"],
      [
        P("Filtering and selecting data is a core Pandas skill. Use loc for label-based selection, iloc for integer position, and boolean indexing for conditional filtering."),
        C("Filtering and Selection", "python",
          "import pandas as pd\n\ndf = pd.DataFrame({\n    'Name': ['Alice','Bob','Charlie','Diana'],\n    'Age': [25,30,35,28],\n    'Salary': [50000,60000,70000,55000],\n    'Dept': ['HR','IT','IT','HR']\n})\n\n# loc: label-based selection\ndf_alice = df.loc[df['Name'] == 'Alice']\ndf_rows = df.loc[1:3, ['Name', 'Salary']]\n\n# iloc: integer position\ndf_first2 = df.iloc[0:2]\ndf_cell = df.iloc[1, 2]\n\n# Boolean indexing\nhigh_salary = df[df['Salary'] > 55000]\n\n# Multiple conditions\nfiltered = df[(df['Age'] > 28) & (df['Dept'] == 'IT')]\n\n# Using .isin() and .between()\nit_hr = df[df['Dept'].isin(['IT', 'HR'])]\nage_range = df[df['Age'].between(25, 30)]",
          [E("df.loc[row_label, col_label]", "Label-based selection (inclusive endpoint)"), E("df.iloc[row_pos, col_pos]", "Integer position-based slice (exclusive end)"), E("df[boolean_series]", "Filter rows where condition is True"), E("& operator", "Combine multiple conditions (use parentheses)"), E("isin(['IT','HR'])", "Filter rows where column value is in list"), E("between(25, 30)", "Filter values within inclusive range")]
        ),
        A("loc is like looking up an address by street name (label), iloc is like finding coordinates on a grid (position). Boolean indexing is like asking yes/no questions about each row."),
        P("Always use .loc when you know column names and .iloc when working with positional indices. Boolean indexing is the most flexible for complex filters.")
      ],
      ["Select all rows where Age > 30 using boolean indexing", "Select columns 'Name' and 'Age' for rows 0-2 using loc", "Select the value at row 2, column 1 using iloc"],
      [
        Q("Which uses label-based indexing?", ["iloc", "loc", "ix", "iat"], 1),
        Q("Boolean indexing returns?", ["Series of booleans", "Filtered DataFrame", "Index array", "Copy of original"], 1),
        Q("How to combine two conditions with AND?", ["and", "&", "&&", "|"], 1),
        Q("What does between(10, 20) include?", ["10 to 20 exclusive", "10 to 20 inclusive", "10 only", "20 only"], 1)
      ],
      [V("Pandas Indexing", "Data School", "https://www.youtube.com/embed/hJ_T6QcFqEc")]
    ),
    M(6, "Grouping & Aggregation", "Intermediate", "50 min",
      ["Group data with groupby()", "Apply aggregation functions with agg()", "Create pivot tables with pivot_table()", "Use multiple aggregation functions"],
      [
        P("The split-apply-combine strategy: split data into groups, apply a function to each group, combine results into a new structure."),
        C("Grouping and Aggregation", "python",
          "import pandas as pd\n\ndf = pd.DataFrame({\n    'Dept': ['IT','HR','IT','HR','IT'],\n    'Name': ['Alice','Bob','Charlie','Diana','Eve'],\n    'Salary': [70000,50000,80000,55000,75000],\n    'Bonus': [5000,3000,6000,4000,5500]\n})\n\n# Simple groupby with mean\navg_salary = df.groupby('Dept')['Salary'].mean()\n\n# Multiple aggregations\nstats = df.groupby('Dept').agg({\n    'Salary': ['mean', 'max', 'min'],\n    'Bonus': 'sum'\n})\n\n# Pivot table\npivot = pd.pivot_table(\n    df,\n    values='Salary',\n    index='Dept',\n    aggfunc=['mean', 'max']\n)\n\n# GroupBy with transform (per-row)\ndf['Salary_rank'] = df.groupby('Dept')['Salary'].transform('rank')",
          [E("groupby('Dept')", "Split data into Dept groups"), E("['Salary'].mean()", "Select Salary column, compute mean per group"), E("agg(dict)", "Different aggregation per column"), E("pivot_table()", "Spreadsheet-style pivot table"), E("transform('rank')", "Apply function per group, return same shape as original")]
        ),
        A("GroupBy is like sorting laundry: you separate by color (group), wash each pile (apply), and fold them back into separate baskets (combine result)."),
        P("After groupby, you can use .agg() for multiple stats, .transform() to keep original shape with group-wise results, and .filter() to keep groups based on a condition.")
      ],
      ["Group a DataFrame by 'City' and find the average 'Age'", "Use agg() to get min, max, and mean of 'Salary' per department", "Create a pivot table showing mean 'Sales' by 'Region' and 'Quarter'"],
      [
        Q("What does groupby() return?", ["DataFrame", "DataFrameGroupBy object", "Series", "List of DataFrames"], 1),
        Q("Which method applies different functions to different columns?", ["apply()", "agg()", "transform()", "map()"], 1),
        Q("What does transform() return?", ["Smaller grouped result", "Same shape as original", "Series only", "Pivot table"], 1),
        Q("Pivot table value aggregation defaults to?", ["sum", "mean", "count", "max"], 1)
      ],
      [V("Pandas GroupBy", "Corey Schafer", "https://www.youtube.com/embed/qy0fDqo0FkM")]
    ),
    M(7, "Merging & Joining", "Intermediate", "45 min",
      ["Merge DataFrames with merge() (SQL-style joins)", "Concatenate rows with concat()", "Join on index with join()", "Understand inner, outer, left, right joins"],
      [
        P("Combining multiple DataFrames is essential. merge() works like SQL joins on columns, concat() stacks rows or columns, and join() merges on the index."),
        C("Merging and Joining", "python",
          "import pandas as pd\n\nemployees = pd.DataFrame({\n    'emp_id': [1, 2, 3],\n    'name': ['Alice', 'Bob', 'Charlie']\n})\nsalaries = pd.DataFrame({\n    'emp_id': [1, 2, 4],\n    'salary': [70000, 50000, 90000]\n})\n\n# Inner join (only matching emp_id)\ninner = pd.merge(employees, salaries, on='emp_id', how='inner')\n\n# Left join (all employees, match salaries where possible)\nleft = pd.merge(employees, salaries, on='emp_id', how='left')\n\n# Outer join (all IDs from both)\nouter = pd.merge(employees, salaries, on='emp_id', how='outer')\n\n# Concatenating rows\ndf1 = pd.DataFrame({'A': [1, 2]})\ndf2 = pd.DataFrame({'A': [3, 4]})\nstacked = pd.concat([df1, df2], ignore_index=True)\n\n# Join on index\ndf_left = pd.DataFrame({'val': [10, 20]}, index=['a', 'b'])\ndf_right = pd.DataFrame({'val2': [30, 40]}, index=['a', 'c'])\njoined = df_left.join(df_right, how='inner')",
          [E("merge(..., how='inner')", "Only rows with matching keys in both"), E("how='left'", "All left rows, NaN for missing right matches"), E("how='outer'", "All rows from both, NaN where no match"), E("concat([df1, df2])", "Stack DataFrames vertically (axis=0)"), E("join()", "Merge using index labels instead of columns")]
        ),
        A("Merging is like putting two jigsaw puzzles together. Inner join keeps only the pieces that exist in both sets. Outer join combines all pieces, filling gaps with blanks."),
        P("When merging on columns, use the on parameter. When merging on different column names, use left_on and right_on. For index merges, use left_index=True or join().")
      ],
      ["Inner join two DataFrames on a common 'id' column", "Use concat() to stack 3 DataFrames vertically", "Perform a left join and inspect the NaN values"],
      [
        Q("Inner join returns?", ["All rows from both", "Only matching rows", "All left rows", "All right rows"], 1),
        Q("Merge parameter for join type?", ["type", "how", "join", "method"], 1),
        Q("concat axis=0 does what?", ["Stacks columns", "Stacks rows", "Merges on index", "Joins on key"], 1),
        Q("join() differs from merge() by using?", ["Columns", "Index", "Keys", "Values"], 1)
      ],
      [V("Pandas Merge and Concat", "Data School", "https://www.youtube.com/embed/oJR1OS9BQYY")]
    ),
    M(8, "Apply & Vectorized Operations", "Intermediate", "45 min",
      ["Use .apply() for custom row/column functions", "Use .map() for Series value mapping", "Use .applymap() for element-wise operations", "Understand vectorized operations for performance"],
      [
        P("Pandas offers vectorized operations (fast, C-level loops) and .apply() (Python-level loops). Vectorized is always preferred for performance."),
        C("Apply and Vectorized", "python",
          "import pandas as pd\n\ndf = pd.DataFrame({\n    'Name': ['Alice', 'Bob', 'Charlie'],\n    'Salary': [50000, 60000, 70000],\n    'Years': [3, 5, 7]\n})\n\n# Vectorized (fast) - no apply needed\ndf['Salary_k'] = df['Salary'] / 1000\ndf['Raised'] = df['Salary'] * 1.1\n\n# .apply() on column (function per element)\ndf['Name_len'] = df['Name'].apply(len)\n\n# .apply() on DataFrame (row-wise)\ndf['Total'] = df.apply(lambda row: row['Salary'] + row['Years'] * 1000, axis=1)\n\n# .map() for Series value mapping\nrole_map = {'Alice': 'Engineer', 'Bob': 'Designer', 'Charlie': 'Manager'}\ndf['Role'] = df['Name'].map(role_map)\n\n# .applymap() element-wise\nnumeric = df[['Salary', 'Years']]\nformatted = numeric.applymap(lambda x: f'{x:,.0f}')",
          [E("df['Salary'] / 1000", "Vectorized division (fastest approach)"), E("df['Name'].apply(len)", "Apply built-in function to each element"), E("apply(..., axis=1)", "Apply function to each row (axis=1)"), E("Series.map(dict)", "Map values using dictionary lookup"), E("applymap(lambda)", "Apply function to every element in DataFrame")]
        ),
        A("Vectorized operations are like a factory assembly line (all items processed simultaneously). .apply() is like a single worker processing items one by one. Use the factory when possible."),
        P("Avoid .apply() when a built-in vectorized method exists. For simple math, use vectorized. For complex custom logic per row, .apply() is acceptable.")
      ],
      ["Add a new column as double the existing column using vectorized", "Use .apply() with lambda to categorize salaries into 'High'/'Low'", "Use .map() to map numeric codes to category names"],
      [
        Q("Faster: vectorized or .apply()?", ["apply()", "vectorized", "Same speed", "Depends on data"], 1),
        Q("What does axis=1 mean in apply?", ["Apply to each column", "Apply to each row", "Apply to all elements", "Apply to index"], 1),
        Q("Which method maps values element-wise?", ["map()", "apply()", "applymap()", "transform()"], 2),
        Q("What does .map(dict) return?", ["DataFrame", "Series with mapped values", "Boolean Series", "List"], 1)
      ],
      [V("Pandas Apply vs Vectorized", "Data School", "https://www.youtube.com/embed/P_q0tkYdVSk")]
    ),
    M(9, "Time Series", "Advanced", "50 min",
      ["Work with datetime index", "Use resample() for time-based grouping", "Use shift() for lagged values", "Use rolling() for moving window calculations"],
      [
        P("Time series data has a datetime index. Pandas provides powerful tools for resampling, shifting, and rolling window calculations."),
        C("Time Series Operations", "python",
          "import pandas as pd\n\n# Create datetime index\ndates = pd.date_range('2026-01-01', periods=100, freq='D')\ndf = pd.DataFrame({'value': range(100)}, index=dates)\n\n# Resample: aggregate by time period\nweekly = df.resample('W').mean()\nmonthly = df.resample('M').sum()\n\n# Shift: lag or lead values\ndf['yesterday'] = df['value'].shift(1)\ndf['tomorrow'] = df['value'].shift(-1)\ndf['change'] = df['value'] - df['value'].shift(1)\n\n# Rolling window calculations\ndf['rolling_mean'] = df['value'].rolling(window=7).mean()\ndf['rolling_max'] = df['value'].rolling(window=14).max()\n\n# Date filtering\njan = df.loc['2026-01']\nweek1 = df.loc['2026-01-01':'2026-01-07']",
          [E("pd.date_range()", "Create sequence of datetime stamps"), E("resample('W').mean()", "Weekly aggregation using mean"), E("shift(1)", "Shift values down by 1 period (lag)"), E("shift(-1)", "Shift values up by 1 period (lead)"), E("rolling(window=7).mean()", "7-day moving average")]
        ),
        A("Time series with datetime index is like a diary with dates. resample() gives you summaries per week/month. shift() lets you compare today with yesterday. rolling() smooths out daily noise."),
        P("Always ensure your index is datetime type with pd.to_datetime(). Use .dt accessor for date component extraction (year, month, day, weekday).")
      ],
      ["Create a datetime range for all days in 2026", "Resample daily data to monthly averages", "Compute 7-day rolling mean on a time series"],
      [
        Q("What does resample('M') do?", ["Monthly resampling", "Minute resampling", "Multi-index", "Merging"], 0),
        Q("shift(1) creates a?", ["Lag of 1 period", "Lead of 1 period", "Rolling window", "Frequency change"], 0),
        Q("rolling(window=7).mean() computes?", ["7-row moving average", "7-column average", "Group of 7", "Expanding mean"], 0),
        Q("Which creates a datetime index?", ["pd.DatetimeIndex()", "pd.date_range()", "pd.datetime()", "pd.time_range()"], 1)
      ],
      [V("Pandas Time Series", "Corey Schafer", "https://www.youtube.com/embed/_9D6C91n6Js")]
    ),
    M(10, "Visualization", "Intermediate", "45 min",
      ["Create line plots with .plot()", "Histograms with .hist()", "Box plots with .boxplot()", "Customize with Matplotlib"],
      [
        P("Pandas integrates with Matplotlib for quick visualizations. The .plot() method on Series and DataFrame provides a convenient interface for common chart types."),
        C("Pandas Visualization", "python",
          "import pandas as pd\nimport matplotlib.pyplot as plt\n\ndf = pd.DataFrame({\n    'Month': pd.date_range('2026-01-01', periods=12, freq='M'),\n    'Sales': [100, 120, 90, 150, 180, 200, 170, 160, 190, 210, 230, 250],\n    'Expenses': [80, 85, 75, 100, 110, 120, 115, 110, 130, 140, 150, 160]\n})\ndf.set_index('Month', inplace=True)\n\n# Line plot\ndf.plot(figsize=(10, 5), title='Monthly Finances')\nplt.ylabel('Amount ($)')\n\n# Histogram\ndf['Sales'].hist(bins=10, edgecolor='black')\nplt.title('Sales Distribution')\n\n# Box plot\ndf.boxplot(column=['Sales', 'Expenses'])\nplt.title('Expense vs Sales Spread')\n\n# Bar plot\ndf.plot(kind='bar', figsize=(12, 5))\n\nplt.tight_layout()\nplt.show()",
          [E("df.plot(figsize=(10,5))", "Line plot of all numeric columns"), E("df['Sales'].hist(bins=10)", "Histogram with 10 bins"), E("df.boxplot(column=...)", "Box plot to show distribution spread"), E("kind='bar'", "Bar chart instead of line"), E("plt.ylabel / plt.title", "Matplotlib customization")]
        ),
        A("Visualization is like a photograph versus raw data. A table of numbers is hard to scan, but a chart instantly shows trends, outliers, and patterns."),
        P("Use .plot(kind='line'|'bar'|'hist'|'box'|'scatter') for quick plots. For more control, access Matplotlib directly via plt. Set figsize for readability.")
      ],
      ["Create a line plot of daily stock prices", "Plot a histogram of age distribution from a DataFrame", "Create a box plot comparing salaries across departments"],
      [
        Q("Default plot kind in .plot()?", ["bar", "line", "hist", "box"], 1),
        Q("Which method creates a histogram?", ["hist()", "histogram()", "boxplot()", "plot(kind='hist')"], 3),
        Q("Which library does Pandas plot use?", ["Seaborn", "Matplotlib", "Plotly", "Bokeh"], 1),
        Q("figsize parameter is in?", ["Inches", "Pixels", "Centimeters", "Points"], 0)
      ],
      [V("Pandas Visualization", "Data School", "https://www.youtube.com/embed/7B9iA31zCg0")]
    )
  ]
};

const nodejs = {
  "title": "Node.js",
  "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "modules": [
    M(1, "Introduction to Node.js", "Beginner", "30 min",
      ["Understand what Node.js is", "Learn about the V8 engine", "Understand the event loop", "Set up Node.js environment"],
      [
        P("Node.js is a JavaScript runtime built on Chrome's V8 engine. It allows JavaScript to run on the server-side, outside the browser."),
        A("Think of Node.js as JavaScript's escape from the browser jail. It can now read files, talk to databases, and serve web pages just like any other backend language."),
        C("Hello Node.js", "js",
          "// hello.js\nconst http = require('http');\n\nconst server = http.createServer((req, res) => {\n  res.writeHead(200, {'Content-Type': 'text/plain'});\n  res.end('Hello, World!\\n');\n});\n\nserver.listen(3000, () => {\n  console.log('Server running on http://localhost:3000');\n});",
          [E("require('http')", "Import built-in HTTP module"), E("createServer(callback)", "Create HTTP server with request handler"), E("res.writeHead(200, ...)", "Set response status and headers"), E("res.end('Hello')", "Send response and close connection"), E("server.listen(3000)", "Start server on port 3000")]
        ),
        P("Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient for data-intensive real-time applications.")
      ],
      ["Install Node.js and run a simple script", "Create a server that responds with 'Hello Node.js'", "Log 'Server started' when server begins listening"],
      [
        Q("What engine powers Node.js?", ["SpiderMonkey", "V8", "Chakra", "JavaScriptCore"], 1),
        Q("Node.js runs JavaScript where?", ["Browser only", "Server-side", "Mobile only", "Desktop only"], 1),
        Q("Which module creates an HTTP server?", ["http", "server", "net", "tcp"], 0),
        Q("What port does the sample server use?", ["80", "8080", "3000", "5000"], 2)
      ],
      [V("Node.js Crash Course", "Traversy Media", "https://www.youtube.com/embed/fBNz5xF-Kx4")]
    ),
    M(2, "Module System", "Beginner", "35 min",
      ["Understand CommonJS modules", "Use require() to import modules", "Export with module.exports and exports", "Create custom modules"],
      [
        P("Node.js uses the CommonJS module system. Each file is a module. Variables and functions are private by default unless exported."),
        C("Module System", "js",
          "// math.js\nconst add = (a, b) => a + b;\nconst subtract = (a, b) => a - b;\n\nmodule.exports = { add, subtract };\n\n// Or export individually\nexports.multiply = (a, b) => a * b;\n\n// app.js\nconst math = require('./math.js');\nconsole.log(math.add(5, 3));      // 8\nconsole.log(math.multiply(4, 2)); // 8\n\n// Built-in modules\nconst fs = require('fs');\nconst path = require('path');\nconst os = require('os');",
          [E("module.exports = { ... }", "Export object from module"), E("exports.property = ...", "Add single export to exports object"), E("require('./math.js')", "Import local module (relative path)"), E("require('fs')", "Import built-in core module (no ./)"), E("path and os modules", "Path manipulation and OS info utilities")]
        ),
        A("A module is like a toolbox. The tools (functions) inside are hidden until you export them. require() opens the toolbox so you can use the tools in another file."),
        P("Use module.exports for a single value/object, exports.property for named exports. Remember require caches modules - the same instance is returned on repeated calls.")
      ],
      ["Create a module that exports an object with 3 utility functions", "Import and use a core module (e.g., os) in your script", "Use require with a relative path to import a local module"],
      [
        Q("What is the module system called?", ["ES Modules", "CommonJS", "AMD", "UMD"], 1),
        Q("How to export a single object?", ["exports = {}", "module.exports = {}", "export default {}", "exports.default = {}"], 1),
        Q("What does require() return?", ["Promise", "Exported object", "Module wrapper", "File path"], 1),
        Q("Which is NOT a built-in module?", ["fs", "path", "os", "http2"], 3)
      ],
      [V("Node.js Modules", "Web Dev Simplified", "https://www.youtube.com/embed/xHLd36rBhUw")]
    ),
    M(3, "NPM & Package Management", "Beginner", "40 min",
      ["Initialize a project with npm init", "Install packages with npm install", "Understand package.json", "Use semantic versioning"],
      [
        P("NPM (Node Package Manager) is the world's largest software registry. It manages dependencies for your Node.js projects."),
        C("NPM Basics", "bash",
          "# Initialize a project\nnpm init -y\n\n# Install a package\nnpm install express\n\n# Install as dev dependency\nnpm install --save-dev nodemon\n\n# Install globally\nnpm install -g eslint\n\n# Uninstall\nnpm uninstall express\n\n# Install from package.json\nnpm install",
          [E("npm init -y", "Create package.json with defaults"), E("npm install <pkg>", "Install and save to dependencies"), E("--save-dev", "Install as devDependency (not for production)"), E("-g flag", "Install globally (CLI tools)"), E("npm install", "Install all packages listed in package.json")]
        ),
        A("NPM is like an app store for code packages. package.json is your shopping list. npm install is the delivery truck that brings everything to your project."),
        P("Always commit package.json and package-lock.json. Add node_modules to .gitignore. Use --save-dev for tools only needed during development (testing, build tools).")
      ],
      ["Initialize a new Node.js project with npm init -y", "Install express and save it as a dependency", "Create a .gitignore with node_modules"],
      [
        Q("What file tracks dependencies?", ["modules.json", "package.json", "npm.json", "config.json"], 1),
        Q("Flag for global installation?", ["-g", "--global", "-G", "global"], 0),
        Q("Which goes in devDependencies?", ["Express", "Nodemon", "React", "Axios"], 1),
        Q("npm init -y does what?", ["Interactive prompt", "Skip defaults", "Install packages", "Create module"], 1)
      ],
      [V("NPM Crash Course", "Traversy Media", "https://www.youtube.com/embed/2V1UUhBJ62Y")]
    ),
    M(4, "File System Module", "Intermediate", "40 min",
      ["Read files with fs.readFile", "Write files with fs.writeFile", "Use fs.promises for async/await", "Work with directories"],
      [
        P("The fs module provides file I/O operations. Node.js offers both callback-based and promise-based (fs.promises) APIs."),
        C("File System Operations", "js",
          "const fs = require('fs');\nconst fsPromises = require('fs').promises;\n\n// Callback-based\nfs.readFile('input.txt', 'utf8', (err, data) => {\n  if (err) {\n    console.error('Error:', err);\n    return;\n  }\n  console.log(data);\n});\n\n// Write file (overwrite)\nfs.writeFile('output.txt', 'Hello World', 'utf8', (err) => {\n  if (err) throw err;\n  console.log('File written');\n});\n\n// Promise-based (async/await)\nasync function readFile() {\n  try {\n    const data = await fsPromises.readFile('input.txt', 'utf8');\n    console.log(data);\n  } catch (err) {\n    console.error(err);\n  }\n}\n\n// Append to file\nfs.appendFileSync('log.txt', 'New entry\\n');",
          [E("fs.readFile(path, encoding, cb)", "Read file asynchronously with callback"), E("fs.writeFile(path, data, cb)", "Write file (overwrites existing)"), E("fs.promises", "Promise-based version of fs methods"), E("async/await pattern", "Cleaner async code with try/catch"), E("appendFileSync", "Synchronous append (blocking)")]
        ),
        A("File I/O is like reading and writing documents. Callbacks are like asking an assistant to do it and call you back. Promises are like getting a receipt to pick up later."),
        P("Always handle errors in callbacks (check err parameter) or use try/catch with promises. Prefer async/await with fs.promises for cleaner code.")
      ],
      ["Read a text file and print its contents using callbacks", "Write user input to a file using fs.promises", "Append a timestamp to a log file"],
      [
        Q("How to read a file asynchronously?", ["fs.readFileSync", "fs.readFile", "fs.read", "fs.open"], 1),
        Q("What encoding to use for text?", ["binary", "utf8", "base64", "hex"], 1),
        Q("Promise-based fs API location?", ["fs.promises", "fs.async", "promise-fs", "fs/promise"], 0),
        Q("Which method overwrites existing file?", ["appendFile", "writeFile", "updateFile", "createFile"], 1)
      ],
      [V("Node.js File System", "freeCodeCamp", "https://www.youtube.com/embed/5H9TWNs10ps")]
    ),
    M(5, "HTTP Module & Web Servers", "Intermediate", "45 min",
      ["Create HTTP servers with http.createServer", "Handle requests and send responses", "Parse URL and route requests", "Set status codes and headers"],
      [
        P("The http module lets you create web servers without any frameworks. It handles the low-level HTTP protocol."),
        C("HTTP Server with Routing", "js",
          "const http = require('http');\nconst url = require('url');\n\nconst server = http.createServer((req, res) => {\n  const parsedUrl = url.parse(req.url, true);\n  const path = parsedUrl.pathname;\n\n  // Simple routing\n  if (path === '/') {\n    res.writeHead(200, {'Content-Type': 'text/html'});\n    res.end('<h1>Home Page</h1>');\n  } else if (path === '/api') {\n    res.writeHead(200, {'Content-Type': 'application/json'});\n    res.end(JSON.stringify({ message: 'Hello API' }));\n  } else {\n    res.writeHead(404, {'Content-Type': 'text/plain'});\n    res.end('Not Found');\n  }\n});\n\nserver.listen(3000, () => console.log('Server on port 3000'));",
          [E("http.createServer(cb)", "Create server with request listener"), E("req.method", "HTTP method (GET, POST, etc.)"), E("req.url", "Request URL path"), E("url.parse(req.url, true)", "Parse URL with query string"), E("res.writeHead(code, headers)", "Set status and headers"), E("res.end()", "Send response and close")]
        ),
        A("A web server is like a restaurant waiter. The request is the customer's order (what they want). The response is the waiter bringing the food. Status codes tell if everything is OK (200), redirected (301), or missing (404)."),
        P("Always set proper Content-Type header. For JSON APIs, use 'application/json'. For HTML, use 'text/html'. Use meaningful HTTP status codes.")
      ],
      ["Create a server with a /hello route returning JSON", "Add a 404 page for unknown routes", "Log the request method and URL for each request"],
      [
        Q("Which module creates web servers?", ["server", "http", "net", "web"], 1),
        Q("What method to set status and headers?", ["setHeader()", "writeHead()", "status()", "header()"], 1),
        Q("Status code for Not Found?", ["200", "301", "404", "500"], 2),
        Q("How to parse URL query string?", ["url.parse()", "querystring.parse()", "URLSearchParams", "All of the above"], 3)
      ],
      [V("Node.js HTTP Server", "Web Dev Simplified", "https://www.youtube.com/embed/VShtPwEk7RA")]
    ),
    M(6, "Express.js Framework", "Intermediate", "40 min",
      ["Set up Express application", "Define routes with app.get/post", "Use middleware functions", "Handle request parameters"],
      [
        P("Express is the most popular Node.js web framework. It simplifies routing, middleware, request handling, and response generation."),
        C("Express Basics", "js",
          "const express = require('express');\nconst app = express();\nconst port = 3000;\n\n// Middleware to parse JSON\napp.use(express.json());\n\n// Routes\napp.get('/', (req, res) => {\n  res.send('Hello Express!');\n});\n\napp.get('/api/users/:id', (req, res) => {\n  const userId = req.params.id;\n  res.json({ id: userId, name: 'User ' + userId });\n});\n\napp.post('/api/users', (req, res) => {\n  const newUser = req.body;\n  res.status(201).json({ message: 'Created', user: newUser });\n});\n\napp.listen(port, () => console.log(`Listening on port ${port}`));",
          [E("express()", "Create Express application instance"), E("app.use(middleware)", "Register middleware (parsers, logger, etc.)"), E("app.get(path, handler)", "GET route handler"), E("req.params.id", "Route parameter from URL path"), E("req.body", "Parsed JSON request body"), E("res.status(201).json()", "Set status and send JSON response")]
        ),
        A("Express is like a pre-built restaurant kitchen. The http module gives you raw ingredients. Express provides the stove, oven, prep station, and recipe book all ready to go."),
        P("Always use express.json() to parse JSON request bodies. Use route parameters (:id) for dynamic segments. Return proper status codes (201 for created, 404 for not found).")
      ],
      ["Create an Express app with a / route returning 'Hello'", "Add a GET /api/users/:id route returning user data", "Add a POST route that reads JSON from request body"],
      [
        Q("Which method starts the Express server?", ["start()", "listen()", "run()", "serve()"], 1),
        Q("How to access route params like /users/:id?", ["req.query.id", "req.params.id", "req.body.id", "req.url.id"], 1),
        Q("Which middleware parses JSON bodies?", ["express.json()", "express.bodyParser()", "express.urlencoded()", "json-parser"], 0),
        Q("What status code for successful creation?", ["200", "201", "204", "301"], 1)
      ],
      [V("Express.js Crash Course", "Traversy Media", "https://www.youtube.com/embed/L72fhGm1tfE")]
    ),
    M(7, "Routing & Middleware", "Intermediate", "45 min",
      ["Create modular routes with express.Router", "Build custom middleware", "Handle errors with middleware", "Use third-party middleware"],
      [
        P("Express Router allows modular route organization. Middleware functions have access to req, res, and next for request processing pipelines."),
        C("Router and Middleware", "js",
          "const express = require('express');\nconst router = express.Router();\nconst app = express();\n\n// Custom middleware (logger)\nconst logger = (req, res, next) => {\n  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);\n  next();\n};\n\n// Auth middleware\nconst auth = (req, res, next) => {\n  const token = req.headers['authorization'];\n  if (!token) {\n    return res.status(401).json({ error: 'No token' });\n  }\n  req.user = { id: 1, name: 'Alice' };\n  next();\n};\n\napp.use(logger);\napp.use('/api', auth);\n\n// Modular router\nrouter.get('/users', (req, res) => {\n  res.json([{ id: 1, name: 'Alice' }]);\n});\n\nrouter.get('/users/:id', (req, res) => {\n  res.json({ id: req.params.id });\n});\n\napp.use('/api', router);\n\n// Error handling middleware\napp.use((err, req, res, next) => {\n  console.error(err.stack);\n  res.status(500).json({ error: 'Something broke!' });\n});",
          [E("express.Router()", "Create modular route group"), E("middleware(req, res, next)", "Function with next() callback"), E("next()", "Pass control to next middleware/handler"), E("app.use(path, middleware)", "Apply middleware to matching routes"), E("Error middleware (err, req, res, next)", "Handle errors with 4-parameter middleware")]
        ),
        A("Middleware is like a security checkpoint at an airport. Each station checks something (ID, ticket, luggage). If you pass, you move to the next. If something fails, you're stopped. next() sends you to the next checkpoint."),
        P("Middleware runs in order. Place generic middleware (logger, parser) before routes. Place error middleware after all routes. Always call next() in custom middleware.")
      ],
      ["Create a custom logger middleware and apply it globally", "Build an auth middleware that checks headers", "Create a Router for /products routes"],
      [
        Q("What does next() do in middleware?", ["Ends request", "Passes to next middleware", "Sends response", "Throws error"], 1),
        Q("Error middleware has how many params?", ["3", "4", "2", "5"], 1),
        Q("Router organizes routes for?", ["Single file", "Modular grouping", "Error handling", "Static files"], 1),
        Q("What status for unauthorized?", ["400", "401", "403", "404"], 1)
      ],
      [V("Express Middleware", "Web Dev Simplified", "https://www.youtube.com/embed/lY6icfhap2o")]
    ),
    M(8, "Template Engines", "Intermediate", "40 min",
      ["Set up EJS template engine", "Pass data to templates", "Use layouts and partials", "Render dynamic HTML"],
      [
        P("Template engines like EJS and Pug generate HTML dynamically by injecting data into templates. EJS uses plain HTML with JavaScript tags."),
        C("EJS Template Engine", "js",
          "// app.js\nconst express = require('express');\nconst app = express();\n\napp.set('view engine', 'ejs');\napp.set('views', './views');\n\napp.get('/', (req, res) => {\n  res.render('index', {\n    title: 'Home Page',\n    user: { name: 'Alice', age: 25 },\n    items: ['Apple', 'Banana', 'Cherry']\n  });\n});\n\n// views/index.ejs\n/*\n<!DOCTYPE html>\n<html>\n<head>\n  <title><%= title %></title>\n</head>\n<body>\n  <h1>Welcome, <%= user.name %></h1>\n  <ul>\n    <% items.forEach(item => { %>\n      <li><%= item %></li>\n    <% }) %>\n  </ul>\n</body>\n</html>\n*/",
          [E("app.set('view engine', 'ejs')", "Configure EJS as template engine"), E("app.set('views', './views')", "Directory where templates live"), E("res.render('index', data)", "Render template with data object"), E("<%= variable %>", "Output escaped value"), E("<% code %>", "Execute JS code (no output)"), E("<%- variable %>", "Output unescaped (raw HTML)")]
        ),
        A("Templates are like Mad Libs. The template is the story with blanks. The data fills in the blanks. EJS tags (<% %>) are the blank spaces where dynamic content goes."),
        P("Use <%= %> for safe text output (auto-escapes HTML). Use <%- %> only for trusted HTML (XSS risk). Use <% %> for loops and conditionals without output.")
      ],
      ["Set up EJS in an Express app", "Create a profile page that displays user data from server", "Use a forEach loop in EJS to render a list"],
      [
        Q("Which method renders an EJS template?", ["send()", "render()", "view()", "template()"], 1),
        Q("EJS syntax for escaped output?", ["{{ var }}", "<%= var %>", "<%- var %>", "${var}"], 1),
        Q("How to set EJS as view engine?", ["app.use('ejs')", "app.set('view engine', 'ejs')", "app.engine('ejs')", "ejs.set(app)"], 1),
        Q("What does <%- var %> do?", ["Escapes HTML", "Outputs raw HTML", "Comments out", "Executes JS"], 1)
      ],
      [V("Node.js with EJS", "Traversy Media", "https://www.youtube.com/embed/3iVVM_DgWY4")]
    ),
    M(9, "Database Integration with MongoDB & Mongoose", "Advanced", "50 min",
      ["Connect to MongoDB with Mongoose", "Define schemas and models", "Perform CRUD operations", "Use queries and validation"],
      [
        P("Mongoose is an ODM (Object Data Modeling) library for MongoDB and Node.js. It provides a schema-based solution to model application data."),
        C("Mongoose CRUD", "js",
          "const mongoose = require('mongoose');\n\n// Connect\nmongoose.connect('mongodb://localhost:27017/myapp')\n  .then(() => console.log('Connected to MongoDB'))\n  .catch(err => console.error(err));\n\n// Schema and Model\nconst userSchema = new mongoose.Schema({\n  name: { type: String, required: true },\n  email: { type: String, required: true, unique: true },\n  age: { type: Number, min: 0 },\n  createdAt: { type: Date, default: Date.now }\n});\n\nconst User = mongoose.model('User', userSchema);\n\n// Create\nconst user = new User({ name: 'Alice', email: 'alice@test.com', age: 25 });\nawait user.save();\n\n// Read\nconst users = await User.find({ age: { $gte: 21 } });\nconst oneUser = await User.findById('someId');\n\n// Update\nawait User.findByIdAndUpdate('someId', { age: 26 });\n\n// Delete\nawait User.findByIdAndDelete('someId');",
          [E("mongoose.connect(url)", "Connect to MongoDB instance"), E("new mongoose.Schema({...})", "Define document structure and validation"), E("mongoose.model('User', schema)", "Create model from schema"), E("new User(data).save()", "Create and persist document"), E("User.find(query)", "Query documents"), E("findByIdAndUpdate / Delete", "Find and modify/remove by ID")]
        ),
        A("Mongoose is like a smart front desk for a filing room (MongoDB). It checks that the forms (documents) are filled correctly (validation), labels them properly (schema), and provides a system to file and retrieve them (CRUD)."),
        P("Always handle connection errors. Use .env for connection strings. Define validation in schemas for data integrity. Use async/await with try/catch for all database operations.")
      ],
      ["Connect to MongoDB using Mongoose in an Express app", "Define a Product schema with name, price, and category", "Create a route that saves a new user to the database"],
      [
        Q("Mongoose is an ODM for which database?", ["SQLite", "MongoDB", "PostgreSQL", "MySQL"], 1),
        Q("Define document structure with?", ["Model", "Schema", "Collection", "Document"], 1),
        Q("Which method saves a document?", ["store()", "save()", "insert()", "create()"], 1),
        Q("How to require a field in schema?", ["{ field: true }", "{ field: { required: true } }", "{ field: { mandatory: true } }", "{ required: [field] }"], 1)
      ],
      [V("Mongoose Crash Course", "Traversy Media", "https://www.youtube.com/embed/DZBGEVgL2eE")]
    ),
    M(10, "Authentication with JWT & bcrypt", "Advanced", "55 min",
      ["Hash passwords with bcrypt", "Generate JWT tokens", "Verify tokens with middleware", "Create login/register flow"],
      [
        P("Authentication is critical for web apps. bcrypt hashes passwords securely. JWT (JSON Web Tokens) provide stateless authentication."),
        C("JWT Authentication", "js",
          "const bcrypt = require('bcrypt');\nconst jwt = require('jsonwebtoken');\n\nconst SECRET = process.env.JWT_SECRET;\n\n// Register - hash password\napp.post('/register', async (req, res) => {\n  const { name, email, password } = req.body;\n  const hashedPassword = await bcrypt.hash(password, 10);\n  const user = new User({ name, email, password: hashedPassword });\n  await user.save();\n  res.status(201).json({ message: 'User created' });\n});\n\n// Login - verify password + generate token\napp.post('/login', async (req, res) => {\n  const { email, password } = req.body;\n  const user = await User.findOne({ email });\n  if (!user) return res.status(401).json({ error: 'Invalid credentials' });\n\n  const valid = await bcrypt.compare(password, user.password);\n  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });\n\n  const token = jwt.sign({ id: user._id, email: user.email }, SECRET, { expiresIn: '1h' });\n  res.json({ token });\n});\n\n// Auth middleware\nconst authMiddleware = (req, res, next) => {\n  const authHeader = req.headers['authorization'];\n  const token = authHeader && authHeader.split(' ')[1];\n  if (!token) return res.status(401).json({ error: 'No token' });\n\n  try {\n    const decoded = jwt.verify(token, SECRET);\n    req.user = decoded;\n    next();\n  } catch (err) {\n    res.status(403).json({ error: 'Invalid token' });\n  }\n};",
          [E("bcrypt.hash(password, 10)", "Hash password with salt rounds"), E("bcrypt.compare(password, hash)", "Compare password against hash"), E("jwt.sign(payload, secret, options)", "Generate JWT with payload"), E("jwt.verify(token, secret)", "Verify and decode JWT"), E("expiresIn: '1h'", "Token expiration time"), E("Auth middleware", "Check token on protected routes")]
        ),
        A("bcrypt is like a meat grinder - easy to put passwords in, hard to get them out. JWT is like a VIP wristband - once you have it, you can access restricted areas until it expires."),
        P("Never store plain text passwords. Use environment variables for secrets. Set JWT expiration. Store tokens on client side (localStorage or cookies).")
      ],
      ["Set up a /register route that hashes passwords with bcrypt", "Create a /login route that returns a JWT on success", "Build auth middleware that protects /profile route"],
      [
        Q("Which library hashes passwords?", ["crypto", "bcrypt", "md5", "sha256"], 1),
        Q("JWT stands for?", ["JavaScript Web Token", "JSON Web Token", "Java Web Token", "JSON With Token"], 1),
        Q("What does jwt.sign() return?", ["Object", "String (token)", "Boolean", "Buffer"], 1),
        Q("What does bcrypt.compare() return?", ["Hash", "Promise<boolean>", "Token", "User object"], 1)
      ],
      [V("JWT Authentication Tutorial", "Web Dev Simplified", "https://www.youtube.com/embed/7Q17ubqLfiM")]
    ),
    M(11, "REST API Design", "Intermediate", "50 min",
      ["Design RESTful endpoints", "Implement CRUD operations", "Use proper HTTP methods and status codes", "Validate request data"],
      [
        P("REST (Representational State Transfer) is an architectural style for designing networked applications. RESTful APIs use HTTP methods for CRUD."),
        C("REST API for Products", "js",
          "const express = require('express');\nconst router = express.Router();\n\n// GET all products\nrouter.get('/', async (req, res) => {\n  const products = await Product.find();\n  res.json(products);\n});\n\n// GET single product\nrouter.get('/:id', async (req, res) => {\n  const product = await Product.findById(req.params.id);\n  if (!product) return res.status(404).json({ error: 'Not found' });\n  res.json(product);\n});\n\n// POST create product\nrouter.post('/', async (req, res) => {\n  const { name, price, category } = req.body;\n  if (!name || !price) {\n    return res.status(400).json({ error: 'Name and price required' });\n  }\n  const product = new Product({ name, price, category });\n  await product.save();\n  res.status(201).json(product);\n});\n\n// PUT update product\nrouter.put('/:id', async (req, res) => {\n  const product = await Product.findByIdAndUpdate(\n    req.params.id, req.body, { new: true, runValidators: true }\n  );\n  if (!product) return res.status(404).json({ error: 'Not found' });\n  res.json(product);\n});\n\n// DELETE product\nrouter.delete('/:id', async (req, res) => {\n  const product = await Product.findByIdAndDelete(req.params.id);\n  if (!product) return res.status(404).json({ error: 'Not found' });\n  res.status(204).send();\n});\n\nmodule.exports = router;",
          [E("GET /products", "List all resources"), E("GET /products/:id", "Get single resource by ID"), E("POST /products", "Create new resource (201 Created)"), E("PUT /products/:id", "Full update of resource"), E("DELETE /products/:id", "Remove resource (204 No Content)"), E("Input validation", "Check required fields before saving")]
        ),
        A("A REST API is like a library. GET retrieves books (resources). POST adds new books. PUT replaces a book entirely. PATCH updates parts. DELETE removes a book."),
        P("Use nouns for resource names (/users not /getUsers). Use plural form (/products). Use proper HTTP status codes. Version your API (/api/v1/).")
      ],
      ["Design and implement a /tasks CRUD API", "Add input validation for POST /tasks", "Return proper status codes (201, 400, 404, 204)"],
      [
        Q("Which method updates a resource?", ["GET", "POST", "PUT", "DELETE"], 2),
        Q("Status code for successful creation?", ["200", "201", "202", "204"], 1),
        Q("Status code for validation error?", ["404", "400", "401", "403"], 1),
        Q("Status code for delete success?", ["200", "201", "204", "301"], 2)
      ],
      [V("REST API Best Practices", "Traversy Media", "https://www.youtube.com/embed/BRdcRFtV7zM")]
    ),
    M(12, "File Uploads with Multer", "Advanced", "40 min",
      ["Configure multer middleware", "Handle single and multiple file uploads", "Set file size limits and filters", "Serve uploaded files"],
      [
        P("Multer is a Node.js middleware for handling multipart/form-data, primarily used for file uploads. It processes files and makes them available in req.file or req.files."),
        C("File Uploads with Multer", "js",
          "const multer = require('multer');\nconst path = require('path');\n\n// Storage configuration\nconst storage = multer.diskStorage({\n  destination: (req, file, cb) => {\n    cb(null, 'uploads/');\n  },\n  filename: (req, file, cb) => {\n    const uniqueName = Date.now() + '-' + file.originalname;\n    cb(null, uniqueName);\n  }\n});\n\n// File filter (allow images only)\nconst fileFilter = (req, file, cb) => {\n  const allowed = ['.jpg', '.jpeg', '.png', '.gif'];\n  const ext = path.extname(file.originalname).toLowerCase();\n  if (allowed.includes(ext)) {\n    cb(null, true);\n  } else {\n    cb(new Error('Only images allowed'), false);\n  }\n};\n\nconst upload = multer({\n  storage,\n  fileFilter,\n  limits: { fileSize: 5 * 1024 * 1024 } // 5MB\n});\n\n// Single file upload\napp.post('/upload', upload.single('avatar'), (req, res) => {\n  res.json({ file: req.file });\n});\n\n// Multiple files\napp.post('/upload-multiple', upload.array('photos', 5), (req, res) => {\n  res.json({ files: req.files });\n});\n\n// Serve uploaded files\napp.use('/uploads', express.static('uploads'));",
          [E("multer.diskStorage({...})", "Configure where files are saved"), E("upload.single('fieldname')", "Middleware for single file from form field"), E("upload.array('field', max)", "Middleware for multiple files"), E("fileFilter", "Validation function for file types"), E("limits.fileSize", "Maximum file size in bytes"), E("express.static('uploads')", "Serve uploaded files as static assets")]
        ),
        A("Multer is like a mailroom clerk. You give them packages (files), they check the package size and type (filter), stamp it with a unique ID (filename), and file it in the right bin (destination)."),
        P("Create the uploads directory if it doesn't exist. Always validate file types and size on the server. Use unique filenames to prevent overwrites.")
      ],
      ["Create a single file upload route for profile pictures", "Add file type validation to only accept PDFs", "Serve uploaded files statically via /uploads"],
      [
        Q("What does multer handle?", ["JSON data", "Multipart form data", "URL-encoded data", "XML data"], 1),
        Q("Access uploaded single file via?", ["req.file", "req.files", "req.body.file", "req.upload"], 0),
        Q("How to limit file size?", ["maxBytes: 5MB", "limits: { fileSize: 5000000 }", "sizeLimit: 5MB", "maxSize: 5000000"], 1),
        Q("diskStorage destination option does what?", ["Sets filename", "Sets folder path", "Sets encoding", "Sets format"], 1)
      ],
      [V("Multer File Uploads", "Web Dev Simplified", "https://www.youtube.com/embed/9Qzmka1M1Yk")]
    ),
    M(13, "WebSockets & Socket.io", "Advanced", "50 min",
      ["Understand WebSocket protocol", "Set up Socket.io server and client", "Emit and listen to events", "Build real-time features"],
      [
        P("WebSockets provide full-duplex communication over a single TCP connection. Socket.io is a library that simplifies WebSocket usage with fallbacks."),
        C("Socket.io Basics", "js",
          "// server.js\nconst express = require('express');\nconst http = require('http');\nconst { Server } = require('socket.io');\n\nconst app = express();\nconst server = http.createServer(app);\nconst io = new Server(server);\n\nio.on('connection', (socket) => {\n  console.log('User connected:', socket.id);\n\n  // Join a room\n  socket.on('join-room', (room) => {\n    socket.join(room);\n    socket.to(room).emit('user-joined', socket.id);\n  });\n\n  // Chat message event\n  socket.on('chat-message', (data) => {\n    io.to(data.room).emit('new-message', {\n      user: socket.id,\n      text: data.text,\n      time: new Date()\n    });\n  });\n\n  socket.on('disconnect', () => {\n    console.log('User disconnected:', socket.id);\n    io.emit('user-left', socket.id);\n  });\n});\n\nserver.listen(3000, () => console.log('Server on 3000'));\n\n// client.js (browser)\n/*\nconst socket = io('http://localhost:3000');\nsocket.emit('chat-message', { room: 'general', text: 'Hello!' });\nsocket.on('new-message', (msg) => {\n  console.log(msg.user + ': ' + msg.text);\n});\n*/",
          [E("new Server(httpServer)", "Attach Socket.io to HTTP server"), E("io.on('connection', cb)", "Handle new client connections"), E("socket.join(room)", "Subscribe socket to a room"), E("socket.to(room).emit()", "Send event to all in room except sender"), E("io.to(room).emit()", "Send event to all in room including sender"), E("socket.on('event', cb)", "Listen for custom event from client")]
        ),
        A("HTTP is like sending letters - you request, wait, get response. WebSockets are like a phone call - both sides can talk anytime, instantly. Socket.io is the operator connecting the call."),
        P("Use socket.to() to exclude sender, io.to() to include everyone in room. Handle disconnection to clean up. Use rooms for private messaging or group chats.")
      ],
      ["Set up a basic Socket.io server that logs connections", "Create a real-time chat where messages broadcast to all", "Implement rooms so users can join specific chat rooms"],
      [
        Q("Socket.io provides?", ["Real-time bidirectional communication", "REST API framework", "Database ORM", "Authentication"], 0),
        Q("Which method sends to all in a room except sender?", ["socket.emit()", "socket.to(room).emit()", "io.to(room).emit()", "io.emit()"], 1),
        Q("What does socket.join('room') do?", ["Creates a room", "Subscribes to room", "Leaves room", "Deletes room"], 1),
        Q("How to get socket ID?", ["socket.id", "socket.sid", "io.id", "socket.identification"], 0)
      ],
      [V("Socket.io Crash Course", "Traversy Media", "https://www.youtube.com/embed/rhQ5oRJsnBc")]
    ),
    M(14, "Testing with Jest & Supertest", "Advanced", "50 min",
      ["Write unit tests with Jest", "Test HTTP endpoints with Supertest", "Set up test database", "Mock external dependencies"],
      [
        P("Testing ensures code reliability. Jest is a testing framework. Supertest allows HTTP assertions for Express apps."),
        C("Testing with Jest and Supertest", "js",
          "// user.test.js\nconst request = require('supertest');\nconst app = require('../app');\n\n// Unit test with Jest\ndescribe('Utility functions', () => {\n  test('adds 1 + 2 to equal 3', () => {\n    expect(add(1, 2)).toBe(3);\n  });\n\n  test('object assignment', () => {\n    const data = { one: 1 };\n    data['two'] = 2;\n    expect(data).toEqual({ one: 1, two: 2 });\n  });\n});\n\n// API test with Supertest\ndescribe('GET /api/users', () => {\n  test('should return list of users', async () => {\n    const res = await request(app)\n      .get('/api/users')\n      .expect('Content-Type', /json/)\n      .expect(200);\n\n    expect(Array.isArray(res.body)).toBe(true);\n  });\n\n  test('should create a new user', async () => {\n    const newUser = { name: 'Alice', email: 'alice@test.com' };\n    const res = await request(app)\n      .post('/api/users')\n      .send(newUser)\n      .expect(201);\n\n    expect(res.body).toHaveProperty('id');\n    expect(res.body.name).toBe('Alice');\n  });\n});\n\n// Before/after hooks\nbeforeEach(async () => {\n  await User.deleteMany({});\n});\n\nafterAll(async () => {\n  await mongoose.connection.close();\n});",
          [E("describe('name', fn)", "Group related tests"), E("test('name', fn)", "Individual test case"), E("expect(value).toBe(expected)", "Assertion matcher"), E("toEqual()", "Deep equality check"), E("supertest(app)", "HTTP assertions for Express"), E("beforeEach / afterAll", "Setup and teardown hooks")]
        ),
        A("Testing is like proofreading an essay. Unit tests check each sentence (individual function). Integration tests check paragraphs (how functions work together). API tests check the whole document (endpoint responses)."),
        P("Use beforeEach to reset test data. Use afterAll to close connections. Test both success and error cases. Mock external services like databases in unit tests.")
      ],
      ["Write a unit test for a pure function (e.g., calculateTotal)", "Create an API test for GET /api/items using Supertest", "Use beforeEach to seed test data into a test database"],
      [
        Q("Jest test framework is from?", ["Google", "Facebook", "Microsoft", "Amazon"], 1),
        Q("Which library tests HTTP endpoints?", ["Jest", "Mocha", "Supertest", "Chai"], 2),
        Q("toBe vs toEqual difference?", ["toBe for objects", "toEqual deep equality, toBe identity", "toBe checks arrays", "No difference"], 1),
        Q("beforeEach runs?", ["Before all tests", "Before each test", "After each test", "Once at start"], 1)
      ],
      [V("Jest Crash Course", "Traversy Media", "https://www.youtube.com/embed/7r4xVDI2vho")]
    ),
    M(15, "Deployment & Environment", "Intermediate", "40 min",
      ["Use environment variables with dotenv", "Set NODE_ENV for different configs", "Prepare Node app for deployment", "Understand process.env"],
      [
        P("Environment variables keep secrets and configuration out of code. dotenv loads .env files in development. In production, the hosting platform sets them."),
        C("Environment and Deployment", "js",
          "// .env file (never commit!)\nPORT=3000\nDB_URL=mongodb://localhost:27017/myapp\nJWT_SECRET=mysecretkey123\nNODE_ENV=development\n\n// config.js\nrequire('dotenv').config();\n\nconst config = {\n  port: process.env.PORT || 3000,\n  dbUrl: process.env.DB_URL,\n  jwtSecret: process.env.JWT_SECRET,\n  isProduction: process.env.NODE_ENV === 'production',\n  isDevelopment: process.env.NODE_ENV === 'development'\n};\n\nmodule.exports = config;\n\n// app.js\nconst config = require('./config');\n\napp.listen(config.port, () => {\n  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${config.port}`);\n});\n\n// package.json scripts\n\"scripts\": {\n  \"start\": \"node app.js\",\n  \"dev\": \"nodemon app.js\"\n}",
          [E("require('dotenv').config()", "Load .env file into process.env"), E("process.env.VAR", "Access environment variable"), E("PORT || 3000", "Fallback default value"), E("NODE_ENV", "Environment mode flag"), E("package.json scripts", "Define start/dev commands")]
        ),
        A("Environment variables are like post-it notes on your server. They hold configuration that changes between development and production. .env is the sticky note pad for your local machine."),
        P("Add .env to .gitignore! Never commit secrets. Use a .env.example file to document required vars. In production, set env vars through the hosting dashboard.")
      ],
      ["Create a .env file with DB_URL and PORT", "Configure Express to use PORT from env with fallback", "Add start and dev scripts to package.json"],
      [
        Q("Which package loads .env files?", ["config", "dotenv", "env-loader", "cross-env"], 1),
        Q("How to access env vars in Node?", ["env.PORT", "process.env.PORT", "ENV.PORT", "System.env.PORT"], 1),
        Q("What should you NOT commit?", ["package.json", ".env", "app.js", "node_modules"], 1),
        Q("What does NODE_ENV=production do?", ["Enables debug", "Optimizes for prod", "Slows server", "Loads .env"], 1)
      ],
      [V("Node.js Deployment", "Traversy Media", "https://www.youtube.com/embed/4e8q1sT3EaM")]
    ),
    M(16, "Real-World Projects - Full Stack App Structure", "Advanced", "60 min",
      ["Structure a full-stack Node.js project", "Organize folders for scalability", "Set up middleware pipeline", "Create production-ready boilerplate"],
      [
        P("A well-structured project is crucial for maintainability. Follow MVC pattern: Models (data), Views (templates), Controllers (logic)."),
        C("Project Structure", "text",
          "project/\n\u251c\u2500\u2500 src/\n\u2502   \u251c\u2500\u2500 config/         # App configuration\n\u2502   \u2502   \u2514\u2500\u2500 db.js\n\u2502   \u2502   \u2514\u2500\u2500 index.js\n\u2502   \u251c\u2500\u2500 models/         # Mongoose schemas\n\u2502   \u2502   \u2514\u2500\u2500 User.js\n\u2502   \u2502   \u2514\u2500\u2500 Product.js\n\u2502   \u251c\u2500\u2500 routes/         # Express routers\n\u2502   \u2502   \u2514\u2500\u2500 userRoutes.js\n\u2502   \u2502   \u2514\u2500\u2500 productRoutes.js\n\u2502   \u251c\u2500\u2500 controllers/   # Route handler functions\n\u2502   \u2502   \u2514\u2500\u2500 userController.js\n\u2502   \u2502   \u2514\u2500\u2500 productController.js\n\u2502   \u251c\u2500\u2500 middleware/     # Custom middleware\n\u2502   \u2502   \u2514\u2500\u2500 auth.js\n\u2502   \u2502   \u2514\u2500\u2500 errorHandler.js\n\u2502   \u251c\u2500\u2500 utils/          # Helper functions\n\u2502   \u2502   \u2514\u2500\u2500 logger.js\n\u2502   \u251c\u2500\u2500 app.js          # Express setup\n\u2502   \u2514\u2500\u2500 server.js       # Entry point\n\u251c\u2500\u2500 tests/\n\u2502   \u2514\u2500\u2500 routes/\n\u2502   \u2514\u2500\u2500 models/\n\u251c\u2500\u2500 .env\n\u251c\u2500\u2500 .gitignore\n\u251c\u2500\u2500 package.json\n\u2514\u2500\u2500 README.md",
          [E("models/", "Database schema definitions"), E("routes/", "Route definitions (thin)"), E("controllers/", "Business logic (thick)"), E("middleware/", "Auth, error handling, validation"), E("config/", "Configuration files"), E("app.js vs server.js", "Setup vs entry point separation")]
        ),
        P("Key patterns: Dependency injection for testability. Error handling middleware at the end. Environment-aware configuration. Proper folder separation of concerns.")
      ],
      ["Organize an Express app into routes, controllers, and models", "Set up centralized error handling middleware", "Create a base app.js that exports the Express app (without listening)"],
      [
        Q("MVC stands for?", ["Model View Controller", "Module View Component", "Model Value Config", "Main View Control"], 0),
        Q("Where does business logic go?", ["Routes", "Controllers", "Models", "Views"], 1),
        Q("Why separate app.js and server.js?", ["For testing without listening", "Performance", "Convention", "Security"], 0),
        Q("Where do Mongoose schemas belong?", ["routes/", "models/", "controllers/", "middleware/"], 1)
      ],
      [V("Full Stack Node.js Project", "Fireship", "https://www.youtube.com/embed/KMlLzNsWvfw")]
    )
  ]
};

const dsa = {
  "title": "DSA",
  "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  "modules": [
    M(1, "Introduction to DSA & Complexity Analysis", "Beginner", "30 min",
      ["Understand why DSA matters", "Learn Big O notation", "Analyze time and space complexity", "Compare common complexities"],
      [
        P("Data structures organize data efficiently. Algorithms are step-by-step procedures for computation. Together they solve problems optimally."),
        A("Big O is like measuring how long a recipe takes as you double the ingredients. O(1) is a microwave minute. O(n) is chopping each vegetable individually. O(n^2) is comparing every ingredient with every other."),
        C("Complexity Analysis", "python",
          "# O(1) - Constant\narr = [1, 2, 3]\nprint(arr[0])  # Always 1 step\n\n# O(n) - Linear\ndef find_max(arr):\n    max_val = arr[0]\n    for num in arr:      # n steps\n        if num > max_val:\n            max_val = num\n    return max_val\n\n# O(n^2) - Quadratic\ndef bubble_sort(arr):\n    for i in range(len(arr)):        # n\n        for j in range(len(arr)-1):  # n\n            if arr[j] > arr[j+1]:\n                arr[j], arr[j+1] = arr[j+1], arr[j]\n\n# O(log n) - Logarithmic\ndef binary_search(arr, target):\n    left, right = 0, len(arr) - 1\n    while left <= right:\n        mid = (left + right) // 2  # Cuts search space in half\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1",
          [E("O(1) - constant", "Direct array access, always same time"), E("O(n) - linear", "Single loop over n elements"), E("O(n^2) - quadratic", "Nested loops, exponential growth"), E("O(log n) - logarithmic", "Binary search halves the problem each step"), E("Space complexity", "Extra memory used by algorithm")]
        ),
        P("Common complexities from fastest to slowest: O(1) < O(log n) < O(n) < O(n log n) < O(n^2) < O(2^n). Always consider both time and space.")
      ],
      ["Determine the Big O of a nested loop algorithm", "Write an O(n) function to find sum of array", "Identify O(log n) algorithms in real code"],
      [
        Q("O(1) means?", ["Linear time", "Constant time", "Logarithmic time", "Quadratic time"], 1),
        Q("Binary search has which complexity?", ["O(n)", "O(log n)", "O(n log n)", "O(n^2)"], 1),
        Q("Nested loops over same array is typically?", ["O(n)", "O(2n)", "O(n^2)", "O(log n)"], 2),
        Q("What does Big O measure?", ["Lines of code", "Worst-case growth rate", "Best-case runtime", "Memory usage only"], 1)
      ],
      [V("Big O Notation", "freeCodeCamp", "https://www.youtube.com/embed/ZdW4iBu2QjA")]
    ),
    M(2, "Arrays & Strings", "Intermediate", "45 min",
      ["Traverse and manipulate arrays", "Use two-pointer technique", "Implement sliding window", "Solve string problems"],
      [
        P("Arrays are contiguous memory blocks. Strings are arrays of characters. Common patterns: two-pointer and sliding window."),
        C("Two Pointer & Sliding Window", "python",
          "# Two Pointer - find pair with target sum in sorted array\ndef two_sum_sorted(arr, target):\n    left, right = 0, len(arr) - 1\n    while left < right:\n        current = arr[left] + arr[right]\n        if current == target:\n            return [left, right]\n        elif current < target:\n            left += 1\n        else:\n            right -= 1\n    return [-1, -1]\n\n# Sliding Window - max sum of subarray of size k\ndef max_subarray_sum(arr, k):\n    window_sum = sum(arr[:k])\n    max_sum = window_sum\n    for i in range(k, len(arr)):\n        window_sum += arr[i] - arr[i - k]\n        max_sum = max(max_sum, window_sum)\n    return max_sum\n\n# String: palindrome check\ndef is_palindrome(s):\n    left, right = 0, len(s) - 1\n    while left < right:\n        if s[left] != s[right]:\n            return False\n        left += 1\n        right -= 1\n    return True",
          [E("Two pointers: left & right", "Pointers move toward each other from ends"), E("Sliding window", "Window of size k slides across array"), E("window_sum += arr[i] - arr[i-k]", "Add new element, remove old one (O(1))"), E("Palindrome check", "Compare characters from both ends")]
        ),
        A("Two pointers is like two people searching a line of lockers from opposite ends. Sliding window is like a magnifying glass moving across a map, focusing on a fixed-size area at a time."),
        P("Use two-pointer for sorted arrays, palindrome checks, and removing duplicates in-place. Use sliding window for contiguous subarray/substring problems.")
      ],
      ["Reverse an array in-place using two pointers", "Find the longest substring without repeating characters using sliding window", "Check if two strings are anagrams"],
      [
        Q("Two-pointer approach works best on?", ["Unsorted arrays", "Sorted arrays", "Linked lists", "Trees"], 1),
        Q("Sliding window is useful for?", ["Single element access", "Contiguous subarray problems", "Sorting", "Graph traversal"], 1),
        Q("Palindrome compares from?", ["Middle outward", "Both ends inward", "Left to right", "Right to left"], 1),
        Q("Time complexity of sliding window per step?", ["O(n)", "O(1)", "O(log n)", "O(k)"], 1)
      ],
      [V("Two Pointer Technique", "NeetCode", "https://www.youtube.com/embed/2GDiXstVbns")]
    ),
    M(3, "Linked Lists", "Intermediate", "50 min",
      ["Understand singly vs doubly linked lists", "Implement traversal and insertion", "Detect cycles with Floyd's algorithm", "Reverse a linked list"],
      [
        P("A linked list is a linear data structure where each element (node) points to the next. Unlike arrays, elements are not stored contiguously."),
        C("Linked List Operations", "python",
          "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\n# Traversal\ndef traverse(head):\n    current = head\n    while current:\n        print(current.val)\n        current = current.next\n\n# Reverse linked list\ndef reverse(head):\n    prev = None\n    current = head\n    while current:\n        next_temp = current.next\n        current.next = prev\n        prev = current\n        current = next_temp\n    return prev\n\n# Cycle detection (Floyd's algorithm)\ndef has_cycle(head):\n    slow = fast = head\n    while fast and fast.next:\n        slow = slow.next\n        fast = fast.next.next\n        if slow == fast:\n            return True\n    return False",
          [E("class ListNode", "Node with value and next pointer"), E("current = current.next", "Traverse one step forward"), E("Reverse: prev, current, next_temp", "Three pointers to reverse links"), E("Floyd's slow/fast", "Slow moves 1 step, fast moves 2 steps"), E("Cycle detection", "If slow == fast, there's a cycle")]
        ),
        A("A linked list is a treasure hunt where each clue tells you where the next clue is. Traversing means following clues. Reversing means flipping the arrows on a map so the path goes backward."),
        P("Linked lists excel at insertions/deletions at head (O(1)). Arrays are better for random access (O(1)). Floyd's cycle detection uses constant memory.")
      ],
      ["Implement a singly linked list with append and print methods", "Write a function to reverse a linked list iteratively", "Detect if a linked list has a cycle"],
      [
        Q("Linked list node contains?", ["Value only", "Value and next pointer", "Index and value", "Value and previous"], 1),
        Q("Insert at head of linked list?", ["O(n)", "O(1)", "O(log n)", "O(n^2)"], 1),
        Q("Floyd's algorithm detects?", ["Duplicates", "Cycles", "Length", "Sorting"], 1),
        Q("Reverse needs how many pointers?", ["1", "2", "3", "4"], 2)
      ],
      [V("Linked Lists in Python", "freeCodeCamp", "https://www.youtube.com/embed/FSsriWQ0qYE")]
    ),
    M(4, "Stacks & Queues", "Intermediate", "40 min",
      ["Implement stack (LIFO)", "Implement queue (FIFO)", "Use monotonic stack pattern", "Solve real problems with stacks"],
      [
        P("Stacks follow Last-In-First-Out (LIFO). Queues follow First-In-First-Out (FIFO). Both can be implemented using arrays or linked lists."),
        C("Stacks and Queues", "python",
          "# Stack using list\nstack = []\nstack.append(1)  # push\nstack.append(2)\ntop = stack[-1]   # peek\ntop = stack.pop() # pop\n\n# Queue using collections.deque\nfrom collections import deque\nqueue = deque()\nqueue.append(1)    # enqueue\nqueue.append(2)\nfront = queue[0]   # peek\nfront = queue.popleft()  # dequeue\n\n# Monotonic Stack - Next Greater Element\ndef next_greater(arr):\n    result = [-1] * len(arr)\n    stack = []\n    for i in range(len(arr)):\n        while stack and arr[i] > arr[stack[-1]]:\n            idx = stack.pop()\n            result[idx] = arr[i]\n        stack.append(i)\n    return result\n\n# Valid Parentheses\ndef is_valid(s):\n    pairs = {')': '(', '}': '{', ']': '['}\n    stack = []\n    for char in s:\n        if char in pairs:\n            if not stack or stack[-1] != pairs[char]:\n                return False\n            stack.pop()\n        else:\n            stack.append(char)\n    return len(stack) == 0",
          [E("List as stack (append/pop)", "O(1) push/pop at end"), E("deque.popleft()", "O(1) pop from front"), E("Monotonic stack", "Stack maintains increasing/decreasing order"), E("Valid parentheses", "Push opens, pop and match on closes")]
        ),
        A("A stack is like a stack of plates: you add and remove from the top. A queue is like a line at a ticket counter: first person in line gets served first (FIFO)."),
        P("Use stacks for depth-first traversal, parentheses matching, undo operations. Use queues for breadth-first traversal, task scheduling, request buffering.")
      ],
      ["Use a stack to check balanced parentheses", "Implement a queue using two stacks", "Find the next greater element for each array value"],
      [
        Q("Stack is which type?", ["FIFO", "LIFO", "LILO", "FILO"], 1),
        Q("Queue is which type?", ["FIFO", "LIFO", "LILO", "FILO"], 0),
        Q("deque popleft() time complexity?", ["O(n)", "O(1)", "O(log n)", "O(n^2)"], 1),
        Q("Monotonic stack maintains?", ["Random order", "Sorted order", "Increasing/decreasing order", "No order"], 2)
      ],
      [V("Stacks and Queues", "freeCodeCamp", "https://www.youtube.com/embed/3Lt5WBoQYzg")]
    ),
    M(5, "Hash Tables", "Intermediate", "40 min",
      ["Understand hash functions", "Handle collisions (chaining, open addressing)", "Implement hash map operations", "Solve problems with hash tables"],
      [
        P("Hash tables store key-value pairs with O(1) average lookup. A hash function maps keys to array indices. Collisions occur when two keys hash to the same index."),
        C("Hash Tables in Python", "python",
          "# Python dict is a hash table\nd = {}\nd['name'] = 'Alice'    # insert\nprint(d['name'])         # lookup - O(1)\n\n# Custom hash table with chaining\nclass HashTable:\n    def __init__(self, size=10):\n        self.table = [[] for _ in range(size)]\n\n    def _hash(self, key):\n        return hash(key) % len(self.table)\n\n    def put(self, key, value):\n        idx = self._hash(key)\n        for i, (k, v) in enumerate(self.table[idx]):\n            if k == key:           # key exists -> update\n                self.table[idx][i] = (key, value)\n                return\n        self.table[idx].append((key, value))  # new key\n\n    def get(self, key):\n        idx = self._hash(key)\n        for k, v in self.table[idx]:\n            if k == key:\n                return v\n        raise KeyError(key)\n\n# Two Sum using hash table\ndef two_sum(nums, target):\n    seen = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in seen:\n            return [seen[complement], i]\n        seen[num] = i\n    return []",
          [E("hash(key) % size", "Map key to array index"), E("Chaining with list", "Each bucket holds list of (key,value) pairs"), E("put: update or insert", "Check if key exists, update or append"), E("Two Sum with dict", "Store seen numbers, check complement in O(1)")]
        ),
        A("A hash table is like a library with a card catalog. Each book title goes through a system (hash function) that tells you exactly which shelf (bucket) to look on. Multiple books on one shelf = collision."),
        P("Python's dict and set are hash tables. Use for fast lookups, deduplication, and counting frequencies. Hash tables trade memory for speed.")
      ],
      ["Use a dictionary to count character frequencies in a string", "Implement a hash table with linear probing instead of chaining", "Solve Two Sum using a hash map"],
      [
        Q("Average lookup time in hash table?", ["O(n)", "O(1)", "O(log n)", "O(n^2)"], 1),
        Q("Collision resolution method that chains?", ["Open addressing", "Chaining", "Rehashing", "Resizing"], 1),
        Q("Two Sum uses hash map to achieve?", ["O(n) time", "O(1) time", "O(n^2) time", "O(log n) time"], 0),
        Q("Hash function must be?", ["Reversible", "Deterministic", "Random", "Bijective"], 1)
      ],
      [V("Hash Tables Explained", "freeCodeCamp", "https://www.youtube.com/embed/0nfN4zgh_30")]
    ),
    M(6, "Trees & Binary Search Trees", "Intermediate", "55 min",
      ["Understand tree terminology", "Traverse trees (inorder, preorder, postorder)", "Implement BST operations (insert, search, delete)", "Use recursion for tree problems"],
      [
        P("Trees are hierarchical data structures. Binary trees have at most 2 children. BSTs maintain order: left < root < right for fast search."),
        C("Binary Search Tree", "python",
          "class TreeNode:\n    def __init__(self, val):\n        self.val = val\n        self.left = None\n        self.right = None\n\n# BST Insert\ndef insert(root, val):\n    if not root:\n        return TreeNode(val)\n    if val < root.val:\n        root.left = insert(root.left, val)\n    else:\n        root.right = insert(root.right, val)\n    return root\n\n# BST Search\ndef search(root, val):\n    if not root or root.val == val:\n        return root\n    if val < root.val:\n        return search(root.left, val)\n    return search(root.right, val)\n\n# Tree traversals\ndef inorder(root):  # Left, Root, Right\n    if root:\n        inorder(root.left)\n        print(root.val)\n        inorder(root.right)\n\ndef preorder(root):  # Root, Left, Right\n    if root:\n        print(root.val)\n        preorder(root.left)\n        preorder(root.right)\n\ndef postorder(root):  # Left, Right, Root\n    if root:\n        postorder(root.left)\n        postorder(root.right)\n        print(root.val)\n\n# Find min (leftmost)\ndef find_min(root):\n    while root.left:\n        root = root.left\n    return root.val",
          [E("TreeNode(val, left, right)", "Node with value and children"), E("insert recursively", "Compare, recurse left or right"), E("search recursively", "Compare and go left/right, O(log n) average"), E("Inorder: L-Root-R", "Gives sorted order in BST"), E("Preorder: Root-L-R", "Used for tree copy/serialization"), E("Postorder: L-R-Root", "Used for deletion/evaluation")]
        ),
        A("A tree is like a company org chart. The CEO (root) manages directors (children). Each director manages managers, and so on. BST adds the rule: all left employees have lower IDs, all right have higher IDs."),
        P("Use recursion for tree problems. Inorder traversal of BST gives sorted order. BST operations are O(log n) average, O(n) worst (skewed tree).")
      ],
      ["Implement BST insertion and inorder traversal", "Write a function to find the height of a binary tree", "Check if a binary tree is a valid BST"],
      [
        Q("BST left child is always?", ["Greater than root", "Less than root", "Equal to root", "None"], 1),
        Q("Inorder traversal of BST yields?", ["Reverse order", "Sorted order", "Root first", "Leaves first"], 1),
        Q("Average search time in BST?", ["O(n)", "O(log n)", "O(1)", "O(n^2)"], 1),
        Q("Which traversal is Root-Left-Right?", ["Inorder", "Preorder", "Postorder", "Level order"], 1)
      ],
      [V("Binary Search Tree", "freeCodeCamp", "https://www.youtube.com/embed/gxV8CSJwLmM")]
    ),
    M(7, "Heaps & Priority Queues", "Advanced", "45 min",
      ["Understand min-heap and max-heap", "Implement heap operations (insert, extract)", "Use heapify for building heap", "Implement heap sort"],
      [
        P("A heap is a complete binary tree where the parent is smaller (min-heap) or larger (max-heap) than children. Priority queues use heaps for efficient access to the min/max element."),
        C("Heap Operations", "python",
          "import heapq\n\n# Min-heap (default)\nheap = []\nheapq.heappush(heap, 5)\nheapq.heappush(heap, 3)\nheapq.heappush(heap, 7)\nmin_val = heapq.heappop(heap)  # 3\n\n# Max-heap using negatives\nmax_heap = []\nheapq.heappush(max_heap, -5)\nheapq.heappush(max_heap, -3)\nmax_val = -heapq.heappop(max_heap)  # 5\n\n# Heapify an existing list\narr = [9, 7, 5, 3, 1]\nheapq.heapify(arr)  # O(n)\n\n# Heap sort\ndef heap_sort(arr):\n    heapq.heapify(arr)\n    return [heapq.heappop(arr) for _ in range(len(arr))]\n\n# Custom: heap of tuples (priority, item)\nheap = []\nheapq.heappush(heap, (2, 'medium'))\nheapq.heappush(heap, (1, 'high'))\nheapq.heappush(heap, (3, 'low'))\npriority, item = heapq.heappop(heap)  # (1, 'high')",
          [E("heapq.heappush / heappop", "Insert and extract min in O(log n)"), E("heapify(list)", "Convert list to heap in O(n)"), E("Max-heap via negatives", "Push -val, pop and negate back"), E("Heap sort", "heapify + repeated pop gives sorted order"), E("Tuple heap", "Priority queue: (priority, value)")]
        ),
        A("A heap is like a hospital emergency room. The most critical patient (min/max) is always treated first. New patients are added and the triage nurse (heapify) reorders them quickly."),
        P("Use heapq for min-heaps. For max-heaps, store negative values. Heap sort is O(n log n) but not stable. Use heaps for k largest/smallest, median finding, and task scheduling.")
      ],
      ["Use heapq to find the kth smallest element in an array", "Implement a max-heap using heapq with negatives", "Sort an array using heap sort"],
      [
        Q("heapq.heappop returns?", ["Largest element", "Smallest element", "Random element", "Root element"], 1),
        Q("heapify time complexity?", ["O(n)", "O(n log n)", "O(log n)", "O(n^2)"], 0),
        Q("How to simulate max-heap with heapq?", ["Use tuple", "Use negative values", "Use custom comparator", "Use reverse=True"], 1),
        Q("heappush / heappop time complexity?", ["O(1)", "O(log n)", "O(n)", "O(n log n)"], 1)
      ],
      [V("Heaps and Priority Queues", "freeCodeCamp", "https://www.youtube.com/embed/jBkJaYt-KVo")]
    ),
    M(8, "Graphs & Traversal", "Advanced", "55 min",
      ["Represent graphs (adjacency list/matrix)", "Implement BFS (breadth-first search)", "Implement DFS (depth-first search)", "Detect cycles and find connected components"],
      [
        P("Graphs consist of vertices (nodes) and edges (connections). Adjacency lists are memory-efficient for sparse graphs. BFS uses a queue, DFS uses a stack (or recursion)."),
        C("Graph Traversal", "python",
          "from collections import deque\n\n# Adjacency list representation\ngraph = {\n    'A': ['B', 'C'],\n    'B': ['A', 'D', 'E'],\n    'C': ['A', 'F'],\n    'D': ['B'],\n    'E': ['B', 'F'],\n    'F': ['C', 'E']\n}\n\n# BFS - uses queue\ndef bfs(graph, start):\n    visited = set()\n    queue = deque([start])\n    visited.add(start)\n\n    while queue:\n        node = queue.popleft()\n        print(node, end=' ')\n        for neighbor in graph[node]:\n            if neighbor not in visited:\n                visited.add(neighbor)\n                queue.append(neighbor)\n\n# DFS - uses stack (iterative)\ndef dfs_iterative(graph, start):\n    visited = set()\n    stack = [start]\n\n    while stack:\n        node = stack.pop()\n        if node not in visited:\n            print(node, end=' ')\n            visited.add(node)\n            for neighbor in graph[node]:\n                if neighbor not in visited:\n                    stack.append(neighbor)\n\n# DFS recursive\ndef dfs_recursive(graph, node, visited=None):\n    if visited is None:\n        visited = set()\n    visited.add(node)\n    print(node, end=' ')\n    for neighbor in graph[node]:\n        if neighbor not in visited:\n            dfs_recursive(graph, neighbor, visited)\n\n# Find connected components\ndef components(graph):\n    visited = set()\n    count = 0\n    for node in graph:\n        if node not in visited:\n            dfs_recursive(graph, node, visited)\n            count += 1\n    return count",
          [E("Adjacency list", "dict: node -> list of neighbors"), E("BFS queue", "Process level by level (shortest path)"), E("DFS stack", "Depth-first exploration"), E("visited set", "Prevents revisiting nodes"), E("Connected components", "Count how many separate groups")]
        ),
        A("BFS is like dropping a stone in a pond and watching ripples spread outward equally. DFS is like exploring a maze by always turning right until hitting a dead end, then backtracking."),
        P("BFS finds shortest path in unweighted graphs. DFS uses less memory for deep graphs. Use adjacency lists for sparse graphs, matrices for dense graphs.")
      ],
      ["Build an adjacency list for a small graph and traverse it with BFS", "Implement DFS to detect if a path exists between two nodes", "Count the number of connected components in a graph"],
      [
        Q("BFS uses which data structure?", ["Stack", "Queue", "Heap", "Tree"], 1),
        Q("DFS uses which data structure?", ["Queue", "Stack", "Hash table", "Linked list"], 1),
        Q("BFS finds what in unweighted graphs?", ["Maximum path", "Shortest path", "Cycle", "Topological order"], 1),
        Q("Adjacency list is best for?", ["Dense graphs", "Sparse graphs", "Weighted graphs", "Directed graphs"], 1)
      ],
      [V("Graph Algorithms BFS DFS", "freeCodeCamp", "https://www.youtube.com/embed/t2a54E5YI38")]
    ),
    M(9, "Sorting Algorithms", "Intermediate", "50 min",
      ["Implement quick sort (divide and conquer)", "Implement merge sort (stable, O(n log n))", "Understand bubble sort (educational)", "Compare sorting algorithm performance"],
      [
        P("Sorting arranges elements in order. Quick sort uses partitioning. Merge sort uses divide-and-conquer. Bubble sort is simple but slow."),
        C("Sorting Algorithms", "python",
          "# Quick Sort\ndef quick_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    pivot = arr[len(arr) // 2]\n    left = [x for x in arr if x < pivot]\n    middle = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    return quick_sort(left) + middle + quick_sort(right)\n\n# Merge Sort\ndef merge_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    mid = len(arr) // 2\n    left = merge_sort(arr[:mid])\n    right = merge_sort(arr[mid:])\n    return merge(left, right)\n\ndef merge(left, right):\n    result = []\n    i = j = 0\n    while i < len(left) and j < len(right):\n        if left[i] <= right[j]:\n            result.append(left[i])\n            i += 1\n        else:\n            result.append(right[j])\n            j += 1\n    result.extend(left[i:])\n    result.extend(right[j:])\n    return result\n\n# Bubble Sort\ndef bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        for j in range(n - i - 1):\n            if arr[j] > arr[j + 1]:\n                arr[j], arr[j + 1] = arr[j + 1], arr[j]\n    return arr",
          [E("Quick sort pivot", "Pick pivot, partition, recurse on each side"), E("Merge sort divide", "Split array, recursively sort halves"), E("Merge function", "Merge two sorted arrays into one"), E("Bubble sort swaps", "Repeated swaps, large elements bubble up"), E("Time complexities", "Quick: avg O(n log n), Merge: O(n log n), Bubble: O(n^2)")]
        ),
        A("Quick sort is like organizing a crowd into taller and shorter groups around a person (pivot). Merge sort is like merging two sorted stacks of papers. Bubble sort is like bubbles rising to the surface - larger elements float up."),
        P("Use merge sort for stable sorting (maintains relative order). Use quick sort for in-place sorting. Avoid bubble sort in production - it's only for learning.")
      ],
      ["Implement quick sort and sort a list of numbers", "Implement merge sort and trace the merge process", "Compare bubble sort vs merge sort on a large array"],
      [
        Q("Quick sort average time complexity?", ["O(n)", "O(n log n)", "O(n^2)", "O(log n)"], 1),
        Q("Merge sort space complexity?", ["O(1)", "O(n)", "O(log n)", "O(n^2)"], 1),
        Q("Which sort is stable?", ["Quick sort", "Merge sort", "Heap sort", "Selection sort"], 1),
        Q("Bubble sort worst-case complexity?", ["O(n)", "O(n log n)", "O(n^2)", "O(2^n)"], 2)
      ],
      [V("Sorting Algorithms Visualized", "freeCodeCamp", "https://www.youtube.com/embed/PgBzjlCcFvc")]
    ),
    M(10, "Searching Algorithms", "Intermediate", "40 min",
      ["Implement linear search", "Implement binary search (iterative and recursive)", "Find first/last occurrence with binary search", "Search in rotated sorted array"],
      [
        P("Linear search checks each element. Binary search requires sorted data and repeatedly divides the search space in half."),
        C("Searching Algorithms", "python",
          "# Linear Search - O(n)\ndef linear_search(arr, target):\n    for i in range(len(arr)):\n        if arr[i] == target:\n            return i\n    return -1\n\n# Binary Search (iterative) - O(log n)\ndef binary_search(arr, target):\n    left, right = 0, len(arr) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1\n\n# Binary Search (recursive)\ndef binary_search_recursive(arr, target, left, right):\n    if left > right:\n        return -1\n    mid = (left + right) // 2\n    if arr[mid] == target:\n        return mid\n    elif arr[mid] < target:\n        return binary_search_recursive(arr, target, mid + 1, right)\n    else:\n        return binary_search_recursive(arr, target, left, mid - 1)\n\n# Find first occurrence\ndef first_occurrence(arr, target):\n    result = -1\n    left, right = 0, len(arr) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if arr[mid] == target:\n            result = mid\n            right = mid - 1  # Keep searching left\n        elif arr[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return result",
          [E("Linear: check each element", "Simple, works on unsorted data"), E("Binary: mid = (left+right)//2", "Check midpoint, narrow search space"), E("log n complexity", "Halving the search space each step"), E("First/last occurrence", "Don't stop at first match, keep narrowing")]
        ),
        A("Linear search is like looking for a book on a shelf one by one. Binary search is like opening a dictionary to the middle, then deciding if your word is before or after, then repeating on that half."),
        P("Binary search requires sorted data. For unsorted data, linear search is the only option (or sort first). Use binary search variants for first/last occurrence, square root, and rotated arrays.")
      ],
      ["Implement binary search on a sorted array", "Find the first and last occurrence of a target value", "Search for a target in a rotated sorted array"],
      [
        Q("Binary search requires?", ["Sorted data", "Unsorted data", "Linked list", "Hash table"], 0),
        Q("Binary search time complexity?", ["O(n)", "O(log n)", "O(n log n)", "O(1)"], 1),
        Q("Linear search works on?", ["Sorted only", "Any data", "Linked lists only", "Numbers only"], 1),
        Q("How to find first occurrence with binary search?", ["Stop at first match", "Continue searching left", "Continue searching right", "Randomize"], 1)
      ],
      [V("Binary Search Tutorial", "NeetCode", "https://www.youtube.com/embed/s4DPM8ct1pI")]
    ),
    M(11, "Dynamic Programming", "Advanced", "60 min",
      ["Understand memoization (top-down)", "Implement tabulation (bottom-up)", "Solve LCS (Longest Common Subsequence)", "Solve 0/1 knapsack problem"],
      [
        P("Dynamic Programming (DP) solves problems by breaking them into overlapping subproblems and storing results to avoid recomputation. Two approaches: memoization (top-down) and tabulation (bottom-up)."),
        C("Dynamic Programming", "python",
          "# Fibonacci with memoization (top-down)\ndef fib_memo(n, memo={}):\n    if n in memo:\n        return memo[n]\n    if n <= 1:\n        return n\n    memo[n] = fib_memo(n-1, memo) + fib_memo(n-2, memo)\n    return memo[n]\n\n# Fibonacci with tabulation (bottom-up)\ndef fib_tab(n):\n    if n <= 1:\n        return n\n    dp = [0] * (n + 1)\n    dp[1] = 1\n    for i in range(2, n + 1):\n        dp[i] = dp[i-1] + dp[i-2]\n    return dp[n]\n\n# Longest Common Subsequence\ndef lcs(text1, text2):\n    m, n = len(text1), len(text2)\n    dp = [[0] * (n + 1) for _ in range(m + 1)]\n    for i in range(1, m + 1):\n        for j in range(1, n + 1):\n            if text1[i-1] == text2[j-1]:\n                dp[i][j] = 1 + dp[i-1][j-1]\n            else:\n                dp[i][j] = max(dp[i-1][j], dp[i][j-1])\n    return dp[m][n]\n\n# 0/1 Knapsack\ndef knapsack(weights, values, capacity):\n    n = len(weights)\n    dp = [[0] * (capacity + 1) for _ in range(n + 1)]\n    for i in range(1, n + 1):\n        for w in range(capacity + 1):\n            if weights[i-1] <= w:\n                dp[i][w] = max(\n                    values[i-1] + dp[i-1][w - weights[i-1]],\n                    dp[i-1][w]\n                )\n            else:\n                dp[i][w] = dp[i-1][w]\n    return dp[n][capacity]",
          [E("Memoization (top-down)", "Recursive with cache, compute on demand"), E("Tabulation (bottom-up)", "Iterative table, build from base cases"), E("LCS 2D DP", "Compare chars, diagonal or max of left/up"), E("Knapsack DP", "Choose to include or exclude each item")]
        ),
        A("DP is like mountain climbing with memory. Instead of rediscovering the same path, you leave markers (memo) so you don't climb the same section twice. Tabulation is like building stairs from base to peak."),
        P("Start with greedy, then try DP. Identify overlapping subproblems and optimal substructure. For 1D DP (fibonacci), use O(1) space with variable tracking.")
      ],
      ["Compute the nth Fibonacci number using both memoization and tabulation", "Find the Longest Common Subsequence of two strings", "Solve the 0/1 knapsack problem for a given set of items"],
      [
        Q("Memoization is which approach?", ["Bottom-up", "Top-down", "Divide and conquer", "Greedy"], 1),
        Q("Tabulation is which approach?", ["Top-down", "Bottom-up", "Recursive", "Randomized"], 1),
        Q("LCS dp[i][j] when chars match?", ["max(dp[i-1][j], dp[i][j-1])", "1 + dp[i-1][j-1]", "dp[i-1][j-1]", "0"], 1),
        Q("Knapsack decides to?", ["Always take", "Include or exclude each item", "Take fractions", "Take all items"], 1)
      ],
      [V("Dynamic Programming Explained", "freeCodeCamp", "https://www.youtube.com/embed/oBt53YbR9Kk")]
    ),
    M(12, "Greedy & Divide-and-Conquer", "Advanced", "50 min",
      ["Understand greedy choice property", "Implement activity selection", "Understand divide-and-conquer", "Apply merge sort as D&C"],
      [
        P("Greedy algorithms make locally optimal choices hoping for global optimum. Divide-and-conquer splits problems into smaller subproblems, solves them, and combines results."),
        C("Greedy and D&C Algorithms", "python",
          "# Activity Selection (Greedy)\ndef activity_selection(start, finish):\n    n = len(start)\n    activities = sorted(zip(start, finish), key=lambda x: x[1])\n    selected = [activities[0]]\n    last_finish = activities[0][1]\n    for i in range(1, n):\n        if activities[i][0] >= last_finish:\n            selected.append(activities[i])\n            last_finish = activities[i][1]\n    return selected\n\n# Coin Change (Greedy - works for standard denominations)\ndef coin_change_greedy(coins, amount):\n    coins.sort(reverse=True)\n    count = 0\n    for coin in coins:\n        while amount >= coin:\n            amount -= coin\n            count += 1\n    return count if amount == 0 else -1\n\n# Divide and Conquer: Merge Sort\n# (already implemented in module 9)\n\n# D&C: Maximum subarray sum (Kadane's variation)\ndef max_subarray_dc(arr):\n    if len(arr) == 1:\n        return arr[0]\n    mid = len(arr) // 2\n    left_max = max_subarray_dc(arr[:mid])\n    right_max = max_subarray_dc(arr[mid:])\n    cross_max = max_crossing(arr, mid)\n    return max(left_max, right_max, cross_max)\n\ndef max_crossing(arr, mid):\n    left_sum = float('-inf')\n    total = 0\n    for i in range(mid - 1, -1, -1):\n        total += arr[i]\n        left_sum = max(left_sum, total)\n    right_sum = float('-inf')\n    total = 0\n    for i in range(mid, len(arr)):\n        total += arr[i]\n        right_sum = max(right_sum, total)\n    return left_sum + right_sum",
          [E("Greedy: sort by finish time", "Pick earliest finishing, skip overlapping"), E("Greedy coin change", "Use largest coins first (not always optimal)"), E("D&C: divide in half", "Solve left, solve right, combine crossing"), E("Crossing sum", "Maximum subarray that crosses the midpoint")]
        ),
        A("Greedy is like a hiker always choosing the steepest step upward (local max) hoping to reach the peak (global max). D&C is like dividing a big pizza into slices, eating each slice, and knowing the total."),
        P("Greedy works when local optimum leads to global optimum (activity selection, Huffman coding). D&C works for merge sort, quick sort, and problems that can be combined from sub-solutions.")
      ],
      ["Implement activity selection to maximize scheduled activities", "Use greedy algorithm for coin change with standard US coins", "Implement divide-and-conquer to find maximum subarray sum"],
      [
        Q("Greedy algorithms make choices based on?", ["Global optimum", "Local optimum", "Random", "Future analysis"], 1),
        Q("Activity selection sorts by?", ["Start time", "Finish time", "Duration", "Profit"], 1),
        Q("Divide-and-conquer combines?", ["Subproblem solutions", "Random results", "Sorted arrays", "Greedy choices"], 0),
        Q("Merge sort is which paradigm?", ["Greedy", "Divide-and-conquer", "Dynamic programming", "Backtracking"], 1)
      ],
      [V("Greedy Algorithms", "freeCodeCamp", "https://www.youtube.com/embed/bC7o8P_Ste4")]
    )
  ]
};

const lessons = JSON.parse(fs.readFileSync(LESSONS_PATH, 'utf8'));
let added = [];

if (!lessons.pandas) {
  lessons.pandas = pandas;
  added.push('pandas');
}
if (!lessons.nodejs) {
  lessons.nodejs = nodejs;
  added.push('nodejs');
}
if (!lessons.dsa) {
  lessons.dsa = dsa;
  added.push('dsa');
}

fs.writeFileSync(LESSONS_PATH, JSON.stringify(lessons, null, 2), 'utf8');

if (added.length > 0) {
  console.log('Added courses: ' + added.join(', '));
} else {
  console.log('All courses already exist - nothing added.');
}
console.log('DONE');
