import React from 'react';
import MathQuiz from '../Components/MathQuiz';

const LandingPage = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent:'space-around' }}>
            <div >
                <MathQuiz />
            </div>
            <div >
                <MathQuiz />
            </div>
        </div>
    )
}

export default LandingPage
