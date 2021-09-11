import {
    words,
    pangrams,
} from './wordLists.json';

const MILESTONES = {
    Beginner: 0,
    'Good Start': 2,
    'Moving Up': 5,
    Good: 8,
    Solid: 15,
    Nice: 25,
    Great: 40,
    Amazing: 50,
    Genius: 70,
    'Queen Bee': 100,
};

const generatePuzzle = () => {
    const pangram = pangrams[randInt(0, pangrams.length)];
    const letters = getLetters(pangram);
    const centerLetter = letters[randInt(0, 7)];
    const lettersSet = new Set(letters);
    const validWords = words.filter((w) => {
        const l = getLetters(w);
        if (!l.includes(centerLetter)) return false;
        return l.reduce((valid, current) => valid && lettersSet.has(current), true);
    });
    const totalPoints = validWords.reduce((p, w) => p + scoreWord(w), 0);
    const milestones = Object.entries(MILESTONES).reduce((res, entry) => {
        const [key, val] = entry;
        return {
            ...res,
            [key]: Math.ceil(totalPoints * (val / 100)),
        };
    }, {});
    return {
        letters,
        centerLetter,
        validWords,
        milestones,
    };
};

const scoreWord = (word) => {
    if (word.length === 4) return 1;
    if (getLetters(word).length === 7) return word.length + 7;
    return word.length;
};

const getLetters = (word) => Array.from(new Set(word.split('')));

const randInt = (min, max) => Math.floor(Math.random() * (max - min) + min);

export {
    generatePuzzle,
    scoreWord,
};
