import React from 'react'

function Result(props) {
  return (
    <>
    
        <div className="score-section">
            <h2>Done!</h2>
            <h4>Total Points :{props.points}</h4>
            <h4>correct questions : {props.correct}</h4>
            <button onClick={props.handlePlayAgain}>Play Again</button>
        </div>

    </>
  )
}

export default Result
