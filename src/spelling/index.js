import React, {
    useState,
    useEffect,
} from 'react';
import {
    generatePuzzle,
    scoreWord,
} from './gameplay';

const ALPHABET = new Set('abcdefghijklmnopqrstuvwxyz'.split(''));

/*
puzzle: {
    letters: [],
    centerLetter: '',
    validWords: [],
    milestones: [{ name, points }],
}

TODO:
- styling/layout that is actually good
- message w/ why word is invalid/already found/score/is pangram
- ability to see all milestones & point values (click to open?)
- visualization of progress w/ milestones
- sort pangrams at top of found words list and make them bold/otherwise distinctive
- color code letters in typed word by center vs valid vs invalid
*/

export const SpellingGame = () => {
    const [puzzle, setPuzzle] = useState(null);
    const [outerLetters, setOuterLetters] = useState([]);
    const [foundWords, setFoundWords] = useState([]);
    const [score, setScore] = useState(0);
    const [currentRank, setCurrentRank] = useState('');
    const [guess, setGuess] = useState('');

    const getNewPuzzle = () => {
        const puzzle = generatePuzzle();
        setPuzzle(puzzle);
        setOuterLetters(shuffleArray(puzzle.letters.filter(l => l !== puzzle.centerLetter)));
        setFoundWords([]);
        setScore(0);
        setGuess('');
        setCurrentRank(puzzle.milestones[0].name);
    };
    useEffect(getNewPuzzle, []);

    const addFoundWord = (word) => {
        setFoundWords(foundWords.slice().concat([word]).sort());
    };
    const updateScore = (newScore) => {
        setScore(newScore);
        // name of milestone w/ greatest points where newScore >= points
        const surpassed = puzzle.milestones.filter(m => newScore >= m.points);
        const milestone = surpassed[surpassed.length - 1];
        setCurrentRank(milestone.name);
    };

    const clickLetter = (letter) => setGuess(`${guess}${letter}`);
    const backspace = () => setGuess(guess.slice(0, guess.length - 1));
    const shuffleLetters = () => setOuterLetters(shuffleArray(outerLetters));

    const guessIsValid = () => {
        if (foundWords.includes(guess)) return false;
        return puzzle.validWords.includes(guess);
    };

    const enterGuess = () => {
        if (guessIsValid()) {
            const points = scoreWord(guess);
            updateScore(score + points);
            addFoundWord(guess);
        }
        setGuess('');
    };

    const keyboardEventListener = (e) => {
        if (!puzzle) return;
        const { key } = e;
        if (key === ' ') {
            shuffleLetters();
        } else if (key === 'Enter') {
            enterGuess();
        } else if (key === 'Backspace') {
            backspace();
        } else if (ALPHABET.has(key)) {
            clickLetter(key);
        }
    };
    useEffect(() => {
        document.body.addEventListener('keydown', keyboardEventListener);
        return () => document.body.removeEventListener('keydown', keyboardEventListener);
    }, [keyboardEventListener]);

    if (!puzzle) {
        return (
            <h2>Spelling Game</h2>
        );
    }

    const { centerLetter } = puzzle;

    return (
        <div>
            <h2>Spelling Game</h2>
            <button onClick={getNewPuzzle} style={styles.newGameButton}>
                New game
            </button>
            <div style={styles.guessContainer}>
                <div style={styles.guess}>
                    <span>{guess}</span>
                </div>
                <button style={styles.enterButton} onClick={enterGuess}>
                    Enter
                </button>
                <button style={styles.enterButton} onClick={backspace}>
                    Backspace
                </button>
                <button style={styles.enterButton} onClick={() => setGuess('')}>
                    Clear
                </button>
            </div>
            <div>
                <div>
                    {outerLetters.slice(0, 3).map((letter) => (
                        <LetterButton letter={letter} onClick={() => clickLetter(letter)} />
                    ))}
                </div>
                <LetterButton
                    letter={centerLetter}
                    isCenter={true}
                    onClick={() => clickLetter(centerLetter)}
                />
                <div>
                    {outerLetters.slice(3).map((letter) => (
                        <LetterButton letter={letter} onClick={() => clickLetter(letter)} />
                    ))}
                </div>
            </div>
            <button
                style={styles.shuffleButton}
                onClick={shuffleLetters}
            >
                Shuffle
            </button>
            <p>{`Score: ${score}`}</p>
            <p>{`Rank: ${currentRank}`}</p>
            <div>
                <h4>Found words:</h4>
                <ul>
                    {foundWords.map((word) => (
                        <li key={word}>{word}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

const LetterButton = ({
    letter,
    isCenter = false,
    onClick,
}) => (
    <button
        style={isCenter ? styles.centerLetter : styles.letter}
        onClick={onClick}
    >
        {letter.toUpperCase()}
    </button>
);

const shuffleArray = (arr) => arr.map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

const buttonPanelWidth = 210;

const styles = {
    letter: {
        color: 'black',
        fontSize: 28,
        width: buttonPanelWidth / 3,
        textAlign: 'center',
    },
    centerLetter: {
        color: 'green',
        fontSize: 28,
        width: buttonPanelWidth,
        textAlign: 'center',
    },
    newGameButton: {
        marginBottom: 16,
    },
    enterButton: {
        height: 24,
        marginLeft: 10,
    },
    shuffleButton: {
        height: 24,
        marginTop: 10,
    },
    guess: {
        border: '1px solid green',
        marginBottom: 10,
        fontSize: 20,
        textAlign: 'center',
        width: 200,
        minHeight: 24,
    },
    guessContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
};
