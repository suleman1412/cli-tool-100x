# File Operations CLI

This Node.js script provides a command-line interface (CLI) for performing various file operations.

## Features

- Count words in a file
- Count lines in a file
- Search for a term in a file

## Installation

1. Ensure you have Node.js installed on your system.
2. Clone this repository or download the `index.js` file.
3. Install the required dependencies:
   ```
   npm install commander fs
   ```

## Usage

Run the script using Node.js:

### Available Commands

1. Count words in a file:
   ```
   node index.js count <file>
   ```

2. Count lines in a file:
   ```
   node index.js lines <file>
   ```

3. Search for a term in a file:
   ```
   node index.js search <file> <term>
   ```

## Examples

1. Count words in a file:
   ```
   node index.js count example.txt
   ```
   Output: `There are 42 words in example.txt`

2. Count lines in a file:
   ```
   node index.js lines example.txt
   ```
   Output: `example.txt has 10 lines`

3. Search for a term in a file:
   ```
   node index.js search example.txt "hello"
   ```
   Output: `The term "hello" is present in the file.` or `The term "hello" is NOT present in the file.`

## Note

- Make sure the file you're operating on exists in the same directory as the script or provide the full path to the file.
- The search function is case-insensitive.

## Error Handling

The script includes basic error handling:
- If there's an error reading the file, it will log the error to the console.
- For the search function, if the file is not found, it will return an error.

## Contributing

Feel free to fork this repository and submit pull requests to contribute to this project. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)