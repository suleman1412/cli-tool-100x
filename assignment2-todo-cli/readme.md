# Todo CLI Application

A command-line interface (CLI) application for managing todos, built with Node.js and Commander.js.

## Features

- Add new todos with priority and group
- List all todos
- Filter todos by priority and group
- Update existing todos
- Delete todos
- Persistent storage using JSON file

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/todo-cli.git
   cd todo-cli
   ```

2. Install dependencies:
   ```
   npm install
   ```

## Usage

Run the application using Node.js:



### Available Commands

1. Add a new todo:
   ```
   node todoOps.js addTodo <body> [options]
   ```
   Options:
   - `-p, --priority <level>`: Set priority level (high, medium, low) (default: "medium")
   - `-g, --group <group>`: Specify which group (default: "default")

2. List all todos:
   ```
   node todoOps.js getAll [options]
   ```
   Options:
   - `-p, --priority <level>`: Filter by priority level (high, medium, low)
   - `-g, --group <group>`: Filter by group

3. Update a todo:
   ```
   node todoOps.js updateTodo <id> <newBody>
   ```

4. Delete todos:
   ```
   node todoOps.js deleteTodo <id...>
   ```

## Examples

1. Add a new high-priority todo to the work group:
   ```
   node todoOps.js addTodo "Finish project report" -p high -g work
   ```

2. List all high-priority todos:
   ```
   node todoOps.js getAll -p high
   ```

3. Update a todo:
   ```
   node todoOps.js updateTodo 1 "Updated todo description"
   ```

4. Delete multiple todos:
   ```
   node todoOps.js deleteTodo 2 3 4
   ```

## Data Storage

Todos are stored in a `todos.json` file in the same directory as the application. This file is created automatically when you add your first todo.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)