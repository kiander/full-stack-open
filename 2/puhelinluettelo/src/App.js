import React, { useState, useEffect } from 'react'
import personsService from './services/persons'
import './index.css'


const App = () =>
{
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() =>
    {
        personsService
            .getAll()
            .then(response =>
            {
                setPersons(response.data)
            })
    }, [])
    console.log('render', persons.length, 'persons')

    const addPerson = (event) =>
    {
        event.preventDefault()
        const personObject = {
            name: newName,
            number: newNumber
        }
        if (persons.filter(person => person.name === newName).length > 0)
        {
            window.alert(`${newName} is already in the phonebook`)
        } else
        {
            personsService
                .create(personObject)
                .then(response =>
                {
                    setErrorMessage(
                        `Added ${personObject.name}`
                    )
                    setTimeout(() =>
                    {
                        setErrorMessage(null)
                    }, 5000)
                    console.log(response)
                    setPersons(persons.concat(personObject))
                })
                .catch(error =>
                {
                    console.log(error.response.data)
                    setErrorMessage(
                        `${Object.values(error.response.data)}`
                    )
                    setTimeout(() =>
                    {
                        setErrorMessage(null)
                    }, 5000)
                })

        }

        setNewName('')
        setNewNumber('')
    }

    const handleNewName = (event) =>
    {
        console.log(event.target.value)
        setNewName(event.target.value)
    }

    const handleNewNumber = (event) =>
    {
        console.log(event.target.value)
        setNewNumber(event.target.value)
    }

    const handleDelete = (id, name) =>
    {
        if (window.confirm(`Delete ${name} ?`))
        {
            personsService
                .remove(id)
                .then(response =>
                {
                    console.log(response)
                })
            setPersons(persons.filter((person) => person.id !== id))
        }
        setErrorMessage(
            `Name '${name}' deleted`
        )
        setTimeout(() =>
        {
            setErrorMessage(null)
        }, 5000)
    }

    console.log(persons)

    return (
        <div >
            <h2 > Phonebook </h2>
            <Notification message={errorMessage}
            />
            <PersonForm addPerson={addPerson}
                newName={newName}
                handleNewName={handleNewName}
                newNumber={newNumber}
                handleNewNumber={handleNewNumber}
            />
            <h2> Numbers </h2>
            <RenderPerson persons={persons}
                handleDelete={handleDelete}
            /> </div>
    )

}

const Notification = ({ message }) =>
{
    if (message === null)
    {
        return null
    }
    return (<div className="error" > {message} </div>)
}

const Person = ({person, handleDelete}) => {
    return ( 
        <div> {person.name} {person.number} 
            <button value={person}
                onClick={
                    () => handleDelete(person.id, person.name)
                }> Delete 
            </button> 
        </div >
    )
}

const RenderPerson = ({persons, handleDelete}) => {
    return ( <ul> {
                    persons.map(person =>
                        <Person key={person.id}
                            person={person}
                            handleDelete={handleDelete}
                        />)
                } 
            </ul>
        )
    }

const PersonForm = ({addPerson, newName, handleNewName, newNumber, handleNewNumber}) => {
    return ( 
        <form onSubmit={addPerson}>
        <div>
            name: < input value={newName}
                onChange={handleNewName}
            /> 
            </div>
        <div>
            number: < input value={newNumber}
                onChange={handleNewNumber}
            />
        </div>
        <div>
            <button type="submit" >
                add 
            </button>
        </div > 
        </form>

    )
}

export default App