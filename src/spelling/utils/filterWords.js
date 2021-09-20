const fs = require('fs');
const {
    validatedWords,
    toValidate,
} = require('./updatingWords.json');

const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const newValidatedWords = validatedWords.slice();

let currentIndex = 0;
const recursiveAsyncReadLine = function () {
    rl.question(`${toValidate[currentIndex]} `, (answer) => {
        if (answer === 'exit') {
            fs.writeFileSync('updatingWords.json', JSON.stringify({
                validatedWords: newValidatedWords,
                toValidate: toValidate.slice(currentIndex),
            }));
            return rl.close();
        };
        if (answer !== 'n') newValidatedWords.push(toValidate[currentIndex]);
        currentIndex++;
        recursiveAsyncReadLine();
    });
};
recursiveAsyncReadLine();
