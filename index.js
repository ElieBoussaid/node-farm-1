
const fs = require('fs');



const textIn = fs.readFileSync('./txt/input.txt' ,'utf-8' );

console.log(textIn);

const textOut = `haha ben haha is a test ${textIn}  is date ${Date.now()}`;

fs.writeFileSync('./txt/mehdiOutput.txt' , textOut);
console.log('File was written');
