import React, { useState } from 'react'

const Statistics = (props) => {
  const sum = props.good + props.neutral + props.bad
  const avg = (props.good - props.bad) / sum
  const pos = (props.good / sum * 100)

  if (sum === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  } else {
    return (
      <div>
        <StatisticLine text="good" value ={props.good} />
        <StatisticLine text="neutral" value ={props.neutral}/>
        <StatisticLine text="bad" value ={props.bad}/>
        <StatisticLine text="all reviews" value ={sum}/>
        <StatisticLine text="average review" value ={avg}/>
        <StatisticLine text="positive reviews" value ={pos}/>
      </div>
    )
  }
}

const StatisticLine = (props) => {
  return (
    <p>{props.text} {props.value}</p>
  )
}
const Button = (props) => { 
  return (
  <button onClick={() => props.handleClick(props.value+1)}>
    {props.text}
  </button>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good+1)
  }
  const handleNeutralClick = () => {
    setNeutral(neutral+1)
  }
  const handleBadClick = () => {
    setBad(bad+1)
  }

  return (
    <div>
      <div>
        <h1>feedback</h1>
        <Button text="good" value={good} handleClick={handleGoodClick}/>
        <Button text="neutral" value={neutral} handleClick={handleNeutralClick}/>
        <Button text="bad" value={bad} handleClick={handleBadClick}/>
      </div>
      <div>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    </div>
  )
}



export default App