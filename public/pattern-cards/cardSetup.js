const cards = ["red", "green", "purple"].map(val => {
    return [
        { color: val, shape: "oval" },
        { color: val, shape: "diamond" },
        { color: val, shape: "squiggle" },
    ];
}).reduce((res, elt) => res.concat(elt)).map(val => {
    return [
        Object.assign({ fill: "solid" }, val),
        Object.assign({ fill: "shaded" }, val),
        Object.assign({ fill: "none" }, val),
    ];
}).reduce((res, elt) => res.concat(elt)).map(val => {
    return [
        Object.assign({ num: [5] }, val),
        Object.assign({ num: [3, 7] }, val),
        Object.assign({ num: [2, 5, 8] }, val),
    ];
}).reduce((res, elt) => res.concat(elt));

const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));

/*
class Game {
    constructor() {
        // status: 'deck', 'dealt', 'discarded'
        this.deck = cards.map((c) => ({
            ...c,
            status: 'deck',
        }));
    }

    pickCards(numCards) {
        const chosen = new Set();
        while (chosen.size < numCards) {
            chosen.add(getRandomInt(this.deck.length));
        }
        this.dealtCards = Array.from(chosen).map((i) => {
            this.deck[i].status = 'dealt';
            return this.deck[i];
        });
    }

    replaceCards(dealtCardIndices) {
        const validCards = this.deck.filter((c) => c.status === 'deck');
        if (validCards.length < dealtCardIndices.length) throw new Error('Out of cards!');

        const newCards = new Set();
        while (newCards.size < dealtCardIndices.length) {
            const i = getRandomInt(this.deck.length);
            if (this.deck[i].status === 'deck') {
                newCards.add(i);
            }
        }

        Array.from(newCards).forEach((deckIndex, i) => {
            const dealtCardIndex = dealtCardIndices[i];
            // mark previous card as discarded
            this.dealtCards[dealtCardIndex].status = 'discarded';
            // mark new card as dealt
            this.deck[deckIndex].status = 'dealt';
            // replace previous card with new card
            this.dealtCards[dealtCardIndex] = this.deck[deckIndex];
        });
    }
}
*/

const pickCards = (numCards) => {
    const chosen = new Set();
    while (chosen.size < numCards) {
        chosen.add(getRandomInt(cards.length));
    }
    return Array.from(chosen.keys()).map(i => ({
        ...cards[i],
    }));
};

const validate = (col1, col2, col3) => {
    if (col1 === col2) return col2 === col3;
    return col1 !== col3 && col2 !== col3;
};

const verifySet = (c1, c2, c3) => {
    return validate(c1.color, c2.color, c3.color) && validate(c1.shape, c2.shape, c3.shape)
        && validate(c1.fill, c2.fill, c3.fill) && validate(c1.num.length, c2.num.length, c3.num.length);
};

const boardHasValidSet = (dealtCards) => {
    for (let i = 0; i < dealtCards.length; i++) {
        for (let j = 0; j < dealtCards.length; j++) {
            if (i >= j) continue;
            for (let k = 0; k < dealtCards.length; k++) {
                if (i >= k || j >= k) continue;
                if (verifySet(dealtCards[i], dealtCards[j], dealtCards[k])) {
                    return true;
                }
            }
        }
    }
    return false;
};
