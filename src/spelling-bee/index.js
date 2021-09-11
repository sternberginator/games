import React, {
    useState,
    useEffect,
} from 'react';
import {
    generatePuzzle,
    scoreWord,
} from './gameplay';

export const SpellingBee = () => {
    const [puzzle, setPuzzle] = useState(null);
    const getNewPuzzle = () => {
        const puzzle = generatePuzzle();
        setPuzzle(puzzle);
    };
    useEffect(getNewPuzzle, []);

    const [foundWords, setFoundWords] = useState([]);
    const addFoundWord = (word) => {
        setFoundWords(foundWords.slice().concat([word]).sort());
    };

    const [guess, setGuess] = useState('');

    if (!puzzle) {
        return (
            <h2>Spelling Bee</h2>
        );
    }

    const { centerLetter } = puzzle;
    const outerLetters = puzzle.letters.filter(l => l !== centerLetter);

    return (
        <div>
            <h2>Spelling Bee</h2>
            <button onClick={getNewPuzzle} style={styles.newGameButton}>New game</button>
            <div style={styles.guess}>
                <span>{guess}</span>
            </div>
            <div>
                <div>
                    {outerLetters.slice(0, 3).map((letter) => (
                        <button style={styles.letter}>
                            {letter.toUpperCase()}
                        </button>
                    ))}
                </div>
                <button style={styles.centerLetter}>
                    {centerLetter.toUpperCase()}
                </button>
                <div>
                    {outerLetters.slice(3).map((letter) => (
                        <button style={styles.letter}>
                            {letter.toUpperCase()}
                        </button>
                    ))}
                </div>
            </div>
            <div>
                <h4>Found words:</h4>
                <ul>
                    {foundWords.map((word) => (
                        <li>{word}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

const styles = {
    letter: {
        color: 'black',
        fontSize: 28,
        width: 40,
        textAlign: 'center',
    },
    centerLetter: {
        color: 'green',
        fontSize: 28,
        width: 120,
        textAlign: 'center',
    },
    newGameButton: {
        marginBottom: 10,
    },
    guess: {
        border: '1px solid green',
        marginBottom: 10,
        fontSize: 20,
        textAlign: 'center',
        width: 200,
        minHeight: 24,
    },
};
