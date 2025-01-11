import { useState, React, useContext } from 'react';

import Cell from './Cell.js';
import './Match2.css';
import GameData from './GameData.js';

function Match2() {
    return GameData.map((item) => <Cell key={item.idx} index={item.idx} />)
}
export default Match2;