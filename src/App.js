import React from 'react';
import Leftpart from './leftpart/Leftpart';
import Timeline from './Timeline'
import './gantt.css';

function App() {
    return(
        <div className="gantt">
            <Leftpart />
            <Timeline />
        </div>
    )
}

export default App;