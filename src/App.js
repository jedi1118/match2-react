import { React, useState, createContext } from 'react';
import GameContext from './GameContext.js';
import Match2 from './Match2.js';
import GameData from './GameData.js';

// import logo from './logo.svg';
import './App.css';

function App() {
    const [selected, setSelected] = useState([]);

    return (
        <div className="App">
            <GameContext.Provider value={{ selected, setSelected, GameData }}>
                <Match2 />
            </GameContext.Provider>
        </div>
    );
}

export default App;

