import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from 'react-router-dom';
import {
    SpellingGame,
} from './spelling';
const {
    PUBLIC_URL,
} = process.env;

function App() {
    return (
        <Router>
            <div style={styles.container}>
                <Switch>
                    <Route path="/spelling">
                        <Link to="/">Back to home</Link>
                        <SpellingGame />
                    </Route>
                    <Route path="/">
                        <h1>Games</h1>
                        <nav>
                            <ul>
                                <li>
                                    <a href={`${PUBLIC_URL}/pattern-cards/index.html`}>Pattern-matching cards</a>
                                </li>
                                <li>
                                    <Link to="/spelling">Spelling Game</Link>
                                </li>
                            </ul>
                        </nav>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

const styles = {
    container: {
        margin: 10,
    },
};

export default App;
