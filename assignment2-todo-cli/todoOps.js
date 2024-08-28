// Filesystem based todo list.
// Create a cli that lets a user
// Add a todo
// Delete a todo
// Mark a todo as done
 
// Store all the data in files (todos.json)
const fs = require('fs');
const { Command } = require('commander');
const program = new Command();

function parseTodosFromData(data) { //Function to convert to validate the conversion to JSON and Initializing if not present
  try {
    let parseTodos = JSON.parse(data);
    if (!Array.isArray(parseTodos)) {
      parseTodos = [];
    }
    return parseTodos;
  } catch (parseErr) {
    console.log('Empty file, returning an array in-memory');
    return [];
  }
}
program
  .description('CLI to perform todos operations stored in a file')
  .version('1.0.0');

program.command('addtodo') 
  .description('lets the user add todos in todos.json')
  .argument('<str>', 'add todo')
  .option('-p, --priority <level>', 'Set priority level (high, medium, low)', 'medium')
  .option('-g, --group <group>', 'Specify which group', 'inbox')
  .action((todo, options) => {

    fs.readFile('todos.json', 'utf-8', (err, data) => {
      let highestId = 0;
      
      if (err) {
        console.log('todos.json does not exist. Creating it...');
      }
      
      let Tasks = parseTodosFromData(data)
      highestId = Tasks.reduce((maxId, Tasks) => Math.max(maxId, Tasks.id), 0);
      const newTask = {
              status: 'pending',
              id: highestId + 1,
              body: todo,
              priority: options.priority,
              group: options.group
            } 
      Tasks.push(newTask);
      fs.writeFile('todos.json', JSON.stringify(Tasks, null, 2), (err) => {
        if (err) {
          console.error('Error writing file:', err);
          return;
        }
        console.log('Todo added successfully');
      });
    });
});



program.command('getAll')
  .description('Allows user to get all todos based on a specific criteria')
  .option('-p, --priority <level>', 'Set priority level (high, medium, low)')
  .option('-g, --group <group>', 'Specify which group')
  .action((options) => {
    fs.readFile('todos.json', 'utf-8', (err, data) => {
      if (err) {
        console.log('Error reading file');
        return;
      }
      let tasks = parseTodosFromData(data);
      
      if (tasks.length === 0) {
        console.log('No todos found, empty');
        return;
      }

      // Filter based on priority if option is provided
      if (options.priority) {
        tasks = tasks.filter(task => task.priority === options.priority);
      }

      // Filter based on group if option is provided
      if (options.group) {
        tasks = tasks.filter(task => task.group === options.group);
      }

      if (tasks.length === 0) {
        console.log('No todos match the specified criteria');
        return;
      }

      tasks.forEach((task) => {
        console.log(`${task.status === 'pending' ? '[ ]' : task.status === 'completed' ? '[x]' : '[?]'} ${task.id} ${task.body}`);
      });
    });
});


program.command('updateTodo')
  .description('Allows user to update the todo based on the id provided')
  .argument('<index>', 'Index of the todo')
  .argument('<str>', 'Body of the updated todo')
  .action((idx, newBody) => {
    fs.readFile('todos.json', 'utf-8', (err, data) => {
      if(err){
        console.log("Error reading the file")
        return ;
      }

      let Tasks = parseTodosFromData(data)
      Tasks.forEach((currTask) => {
        if (currTask.id == idx){
          currTask.body = newBody;
          console.log(`Updated todo`)
        }
      })
      fs.writeFile('todos.json', JSON.stringify(Tasks, null, 2), (err) => {
        if (err) {
          console.error('Error updating file:', err);
          return;
        }
      });

    })
})


program.command('checkTodo')
  .argument('<idx>', 'Indice(s) of the todo to check off, if multiple use a comma')
  .option('-s, --separator <symbol>', 'Specify which symbol used to separate', ',')
  .action((index, options) => {
    fs.readFile('todos.json', 'utf-8', (err, data) => {
      if(err){
        console.log("Error reading the file")
        return ;
      }

      let Tasks = parseTodosFromData(data)
      idx = index.trim().split(options.separator)
      idx.forEach((id) => {
        newId = id - 1;
        Tasks[newId].status = 'completed'
      })
      
      fs.writeFile('todos.json', JSON.stringify(Tasks, null, 2), (err) => {
        if (err) {
          console.error('Error updating file:', err);
          return;
        }
        console.log("Todo Checked off")
      });

    })
});


program.command('deleteTodo')
  .description('Allows user to delete todos based on the provided ids')
  .argument('<ids...>', 'IDs of the todos to delete')
  .action((ids) => {
    fs.readFile('todos.json', 'utf-8', (err, data) => {
      if (err) {
        console.log("Error reading the file");
        return;
      }

      let tasks = parseTodosFromData(data);
      const initialLength = tasks.length;

      // Convert ids to numbers
      const idsToDelete = ids.map(Number);

      tasks = tasks.filter(task => !idsToDelete.includes(task.id));

      const deletedCount = initialLength - tasks.length;

      fs.writeFile('todos.json', JSON.stringify(tasks, null, 2), (writeErr) => {
        if (writeErr) {
          console.error('Error writing to file:', writeErr);
          return;
        }
        console.log(`${deletedCount} todo(s) deleted successfully`);
      });
    });
  });


program.parse();