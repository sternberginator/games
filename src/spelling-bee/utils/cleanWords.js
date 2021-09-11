const fs = require('fs');

const wordFile = 'CollinsScrabbleWords2019.txt';
const minLen = 4;
const nUniqueLetters = 7;

const raw = fs.readFileSync(wordFile).toString();
const words = raw.split('\r\n').filter(w => {
    if (w.length < minLen) return false;
    return Array.from(new Set(w.split(''))).length <= nUniqueLetters;
}).map(w => w.toLowerCase());
const pangrams = words.filter(w => Array.from(new Set(w.split(''))).length === nUniqueLetters);

fs.writeFileSync('../wordLists.json', JSON.stringify({
    words,
    pangrams,
}));
// fs.writeFileSync('updatingWords.json', JSON.stringify({
//     validatedWords: [],
//     toValidate: words,
// }));
