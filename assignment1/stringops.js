// Create a command line interface that lets the user specify a file path and the nodejs process counts the number of words inside it.
// Input - node index.js /Users/kirat/file.txt
// Output - You have 10 words in this file
const fs = require('fs');
const program = require('commander');

program
  .name('string ops')
  .description('CLI to do file based operations')
  .version('1.0.0');

program.command('count')
  .description('Count the number of words in the file')
  .argument('<file>', 'file to count')
  .action((file) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const words = data.trim().split(/\s+/).length;
        console.log(`There are ${words} lines in ${file}`);
      }
    });
});

program.command('lines')
.description('Count the number of lines in the file')
.argument("<file>", 'file name')
.action((file) => {
  fs.readFile(file, 'utf-8', (err,data) => {
    if (err) return err;
    else{
      const lines = data.trim().split('\n')
      console.log(`${file} has ${lines.length} lines`)
    }
  })
})

program.command('search')
.description('Returns true or false if match is found')
.argument('<file>' , 'File name')
.argument('<term>', 'Term to search for')
.action((file, term) => {
  fs.readFile(file, 'utf-8', (err, data) => {
    if (err) return err;
    else{
      const found = data.toLowerCase().includes(term.toLowerCase());
      console.log(`The term "${term}" ${found ? 'is present' : 'is NOT present'} in the file.`);
    }
  })
})


program.parse();