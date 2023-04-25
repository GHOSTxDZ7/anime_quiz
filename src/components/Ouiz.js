import './Quiz.css';
import React, { useState } from 'react'
import questions_data from './Questions'
import Result from './Result';
import correctSound from '../assets/correctSound.mp3'
import incorrectSound from '../assets/incorrectSound.mp3'

export default function Ouiz() {

    const [currentq, setCurrentq] = useState(Math.floor(Math.random() * 41))
    const [points, setPoints] = useState(0)
    const [correct, setCorrect] = useState(0)
    const [showResult, setShowResult] = useState(false)
    const [selectd, setSelectd] = useState(false)
    const [qindex, setQindex] = useState(0)

    const handleOptions = (iscorrect) => {
        if (iscorrect){
            setPoints(points + 10)
            setCorrect(correct + 1)
            document.getElementById('correct').play()
        }
        else{
            document.getElementById('incorrect').play()
        }
        setSelectd(true)
    }

    const handleNext = () => {
        
        const qlist = [];
        while (qlist.length < 9) {
            const randomNum = Math.floor(Math.random() * 41); // generate random number between 0 and 40
            if (!qlist.includes(randomNum)) { // check if the number is not already in the array
                qlist.push(randomNum); // add the number to the array
    }
  }
        let nextq = qlist[qindex]
        setSelectd(false)
        if (qindex < 9) {
            setCurrentq(nextq)
            setQindex(qindex+1)
        }
        else {
            setShowResult(true)
            setQindex(0)
        }
        
    }

    const handlePlayAgain = () => {
        setCurrentq(Math.floor(Math.random() * 41))
        setPoints(0)
        setCorrect(0)
        setQindex(0)
        setShowResult(false)
    }

    const handleOptionColor = (iscorrect) => {
        if(selectd && iscorrect){
            return "correct"
        }
        else if(selectd && !iscorrect){
            return "wrong"
        }
        else{
            return "button"
        }
    }
    
    

    return (
        <>
        <audio id="correct" src={correctSound}></audio>
        <audio id="incorrect" src={incorrectSound}></audio>
        <div className='quiz-body'>
            <div className="app">
                {showResult ? (<Result points={points} correct={correct} handlePlayAgain={handlePlayAgain} />) : (<>
                    <div className="question-section">
                        <h5>Points: {points}</h5>
                        <div className="question-count">
                            <span>Question {qindex+1}/10</span>
                        </div>
                        <div className="question">
                            {questions_data[currentq].question}
                        </div>
                    </div>
                    <div className="answer-section">
                        {questions_data[currentq].options.map((opt, i) => {
                            return <button className={handleOptionColor(opt.iscorrect)} disabled={selectd} onClick={() => handleOptions(opt.iscorrect)} key={i}>{opt.option}</button>
                        })}

                        <div className="actions">
                            <button onClick={handlePlayAgain}>Restart</button>
                            <button disabled={!selectd} onClick={handleNext}>Next</button>
                        </div>
                    </div>
                </>)}

            </div>
        </div>
    </>
    )
}

