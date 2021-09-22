import {
    words,
    pangrams,
} from './wordLists.json';

const MILESTONES = [
    { name: 'Beginner', pct: 0 },
    { name: 'Good Start', pct: 2 },
    { name: 'Moving Up', pct: 5 },
    { name: 'Good', pct: 8 },
    { name: 'Solid', pct: 15 },
    { name: 'Nice', pct: 25 },
    { name: 'Great', pct: 40 },
    { name: 'Amazing', pct: 50 },
    { name: 'Genius', pct: 70 },
    { name: 'Queen Bee', pct: 100 },
];

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
    const milestones = MILESTONES.map(({ name, pct }) => ({
        name,
        points: Math.ceil(totalPoints * (pct / 100)),
    }));
    const validPangrams = validWords.filter((w) => (new Set(w.split(''))).size === 7);
    return {
        letters,
        centerLetter,
        validWords,
        milestones,
        pangrams: validPangrams,
    };
};

const scoreWord = (word) => {
    if (word.length === 4) return 1;
    if (getLetters(word).length === 7) return word.length + 7;
    return word.length;
};

const hasInvalidLetters = (word, letters) => {
    const wordLetters = word.split('');
    return !wordLetters.every((l) => letters.includes(l));
};

const getLetters = (word) => Array.from(new Set(word.split('')));

const randInt = (min, max) => Math.floor(Math.random() * (max - min) + min);

export {
    generatePuzzle,
    scoreWord,
    hasInvalidLetters,
};
