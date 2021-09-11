import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from 'react-router-dom';
import {
    SpellingBee,
} from './spelling-bee';
const {
    PUBLIC_URL,
} = process.env;

function App() {
    return (
        <Router>
            <div style={styles.container}>
                <Switch>
                    <Route path="/spelling-bee">
                        <Link to="/">Back to home</Link>
                        <SpellingBee />
                    </Route>
                    <Route path="/">
                        <h1>Games</h1>
                        <nav>
                            <ul>
                                <li>
                                    <a href={`${PUBLIC_URL}/set/set.html`}>Set</a>
                                </li>
                                <li>
                                    <Link to="/spelling-bee">Spelling Bee</Link>
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
