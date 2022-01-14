import React from 'react'

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3} exercises1={exercises1} exercises2={exercises2} exercises3={exercises3} />
      <Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3} />
    </div>
  )
}

const Header = (props) => {  
  return (
    <div>
      <h1>{props.course}</h1>
      </div>  
      )
    }
const Content = (props) => {  
  return (  
    <div>
      <Part first={props.part1} second={props.excercises1}/>
      <Part first={props.part2} second={props.excercises2}/>
      <Part first={props.part3} second={props.excercises3}/>
    </div>  
    )
  }
                                      
const Total = (props) => { 
  return (     
  <div>
    <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
    </div>
    )
}

const Part = (props) => {
  return (
    <div>
      <p>
        {props.first} {props.second}
      </p>
    </div>
  )
}

export default App