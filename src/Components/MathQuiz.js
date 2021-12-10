import React, { useState, useEffect } from 'react';
import { commonFunctions } from '../Helpers/commonFunctions';

const INITIAL_QUIZ_PARAMETERS = {
    noOfQuestions: 10,
    min: 0,
    max: 10,
    add: true,
    subtract: true,
    multiply: true,
    divide: true

}

const operators = ['add', 'subtract', 'divide', 'multiply'];
const MathQuiz = () => {

    const [quizParameters, setQuizParameters] = useState(INITIAL_QUIZ_PARAMETERS);
    const [num, setnum] = useState(1);
    const [answer, setAnswer] = useState('');
    const [chosenAnswers, setChosenAnswers] = useState([]);
    const [quiz, setQuiz] = useState([]);
    const [score, setScore] = useState(null);


    const generateQuestions = () => {
        /* This function is used to generate the questionare*/
        let availableOperators = [];
        operators.forEach(el => { if (quizParameters[el]) { availableOperators.push(el) } })
        if (availableOperators.length === 0) {
            alert('Please Choose Atleast one operator')
        } else {
            let questions = [];
            for (let i = 0; i < quizParameters.noOfQuestions; i++) {
                let randomNum1 = Math.floor(Math.random() * (quizParameters.max - quizParameters.min + 1)) + Number(quizParameters.min);
                let randomNum2 = Math.floor(Math.random() * (quizParameters.max - quizParameters.min + 1)) + Number(quizParameters.min);



                let chosenOperand = availableOperators[Math.floor(Math.random() * (availableOperators.length))];
                let answer = null;
                let statement = `${chosenOperand.toUpperCase()} ${randomNum1} and ${randomNum2}`;
                switch (chosenOperand) {
                    case 'add':
                        answer = randomNum1 + randomNum2;
                        break;
                    case 'subtract':
                        answer = randomNum1 - randomNum2;
                        break;
                    case 'divide':
                        answer = randomNum1 / randomNum2;
                        break;
                    case 'multiply':
                        answer = randomNum1 * randomNum2;
                        break;


                }
                questions.push({ statement, answer })
            }

            setQuiz(questions)
            setScore(null)
            setChosenAnswers([])
            setnum(1)

        }

    }

    useEffect(() => {
        /* THIS IS USED TO COMPUTE THE RESULT OF THE QUIZ */

        if (num > quizParameters.noOfQuestions) {
            let tempScore = 0;
           
            chosenAnswers.map((answer, i) => {
                if (quiz[i].statement.includes('DIVIDE')) {

                    if (commonFunctions.round(answer) == commonFunctions.round(quiz[i].answer)) {
                        tempScore = tempScore + 1
                    }
                } else {
                    if (answer == quiz[i].answer) {
                        tempScore = tempScore + 1
                    }

                }


            })
          
            setScore(tempScore)

        }
    }, [chosenAnswers])

    const submitAnswer = () => {
        /* THIS IS USED TO SUBMIT THE ANSWER */
        setnum(val => val + 1);
        setChosenAnswers(val => [...val, answer.length > 0 ? answer : 'DNA']);
        setAnswer('')
    }

    return (
        <div>
            <center>
                <div>
                    <h3>How many questions do you want to answer?</h3>
                    <input type="number" min="5" value={quizParameters.noOfQuestions} onChange={(e) => setQuizParameters({ ...quizParameters, noOfQuestions: e.target.value })} />
                    <h3>Min Operand Value</h3>
                    <input type="number" value={quizParameters.min} onChange={(e) => setQuizParameters({ ...quizParameters, min: e.target.value })} />
                    <h3>Max Operand Value</h3>
                    <input type="number" value={quizParameters.max} onChange={(e) => setQuizParameters({ ...quizParameters, max: e.target.value })} />
                    <br />
                    {operators.map((el, i) => {
                        return <div key={i}>{el.toUpperCase()} <input type="checkbox" defaultChecked={quizParameters[el]} value={quizParameters[el]} onChange={(e) => setQuizParameters({ ...quizParameters, [el]: !quizParameters[el] })} /></div>
                    })}
                    <h5>Give rounded answers up to 2 places for division questions , for Infinity write Infinity , for undefined answers dont write anything </h5>
                    <button onClick={generateQuestions}>Start Quiz</button>
                </div>
                {quiz.length > 0 && num <= quizParameters.noOfQuestions &&
                    <div>
                        <h2>
                            Question {num}: {quiz && quiz[num - 1].statement}
                        </h2>
                        <input autoFocus type="text" value={answer} onChange={e => setAnswer(e.target.value)} />
                        <div> <button onClick={submitAnswer}>NEXT</button></div>
                    </div>
                }


                {score !== null && score >= 0 && <div>
                    <h3>RESULT</h3>
                    <h5>Score: {score}</h5>
                    <h3>SUMMARY</h3>
                    {quiz.map((el, i) => {
                        return (
                            <div key={i}>
                                <div style={commonFunctions.round(chosenAnswers[i]) == commonFunctions.round(el.answer) ? { color: 'green' } : { color: 'red' }}>Question) {el.statement}</div>
                                <div > {el.answer}</div>
                            </div>

                        )

                    })}
                </div>}


            </center>

        </div>
    )
}

export default MathQuiz
