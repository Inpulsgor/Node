const fs = require("fs");
const path = require("path");

/*
* not good example
*/

fs.writeFileSync('example.txt', 'hello world sync');
fs.writeFile('example-async.txt', 'hello world async', (error) => {
	console.log(error);
	fs.readdir('public', (error, data) => {
		if(error) throw new Error(error);

		console.log(data);
	});
});

/*
* better example
*/

const main = async () => {
  // fs example
  await fs.promises.writeFile("example-correct.txt", "hello correct");

  const dirFiles = await fs.promises.readdir("public");
  console.log(dirFiles);

  // const packageJson = await fs.promises.readFile('package.json'); // виведе набір числових значень
  const packageJson = await fs.promises.readFile("package.json", "utf-8"); // виведе в кодуванні utf-8
  console.log(packageJson);

  // path example
console.log(path.join(__dirname, "../../main.js"));
console.log(path.parse("/Users/inpuls/Project/Node/node_modules"));

}

main();
