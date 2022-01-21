import React from 'react'

const Course = ({ name, parts }) => {
    return (
        <div>
            <Header name={name} />
            {parts.map(parts =>
                <Content key={parts.id} name={parts.name} exercises={parts.exercises} />)}
            <Total parts={parts} />
        </div>
    )
}

const Header = ({ name }) => {
    return (
        <div>
            <h1>{name}</h1>
        </div>
    )
}
const Content = (props) => {
    return (
        <div>
            <Part first={props.name} second={props.exercises} />
        </div>
    )
}

const Total = ({ parts }) => {
    const total =
        parts.reduce((previousValue, currentValue) => { return previousValue + currentValue.exercises }, 0)
    return (
        <div>
            <b>Number of exercises {total}</b>
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

export default Course