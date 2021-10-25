# Games App
### Clara Sternberg

## TODOs:

### Deployment

- Maybe try https://betterprogramming.pub/how-to-host-your-react-app-on-github-pages-for-free-919ad201a4cb
- Or just use Heroku

### Pattern matching:

- [ ] make inside of unfilled shapes turn gray with the rest of the card
- [ ] show sets found on the side somewhere?
- [ ] instead of just keeping track of found sets, replace cards when a set is found (but we'll need to keep track of which cards have already been selected) (and then handle getting to the end of the deck)
- [ ] button to redeal if no valid sets are present - or even better, on each new deal check if any sets are present and automatically show a message and redeal

### Spelling game:

- [x] look up scoring
    4 letter word = 1 point
    N letter word = N points
    pangram with N letters = N + 7 points
- [x] select a pangram from list randomly
- [x] pick center letter to use for puzzle
- [x] generate list of possible words for given puzzle
- [ ] (eliminate puzzle if wordlist is too short or something)
- [x] compute scoring milestones
    Beginner 0% of the grand total
    Good Start 2%
    Moving Up 5%
    Good 8%
    Solid 15%
    Nice 25%
    Great 40%
    Amazing 50%
    Genius 70%
- [x] puzzle: { letters, centerLetter, validWords, pangrams, scoring milestones } ?
- [ ] could compile list of reasonable puzzles in a file, to be manually edited
    how about a UI that just offers words from the bank and you can mark it as good or bullshit
    also a way to add words that should be there but aren't (slang etc?) - way to manually
    edit the word bank over time so it works for us - this is optional
    either way word bank stored/used should be independent of the gameplay

UI:
visual layout of letters
keyboard listener w/ letters & spacebar to shuffle
alternate controls: click on letters to type, shuffle button (is there anything else?)
text box w/ styling based on valid/invalid letters
error/success (e.g. "pangram!") messages when a word is entered
list of words found so far
visual display of milestone progress
(click to open) list of what the milestones are

intentionally style differently than the inspirations
