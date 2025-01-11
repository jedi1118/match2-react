import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit';

import gameReducer from './gameReducer.js';
import Match2 from './Match2.js';
import './App.css';

const store = configureStore({
    reducer: {
        game: gameReducer,
    }
});

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <Match2 />
            </Provider>
        </div>
    );
}

export default App;

