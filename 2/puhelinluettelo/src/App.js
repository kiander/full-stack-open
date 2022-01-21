import React, { useState } from 'react'

const Person = ({ name, number }) => {
  return (
    <div>
      {name} {number}
    </div>
  )
}

const RenderPerson = ({ persons }) => {
  return (
    <ul>
      {persons.map(person =>
        <Person key={person.name} name={person.name} number={person.number} />)}
    </ul>
  )
}

const PersonForm = ({ addPerson, newName, handleNewName, newNumber, handleNewNumber }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input
          value={newName}
          onChange={handleNewName}
        />
      </div>
      <div>
        number: <input
          value={newNumber}
          onChange={handleNewNumber}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>

  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '112' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }
    if (persons.filter(person => person.name === newName).length > 0) {
      window.alert(`${newName} is already in the phonebook`)
    } else {
      setPersons(persons.concat(personObject))
    }

    setNewName('')
    setNewNumber('')
  }

  const handleNewName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  console.log(persons)

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm addPerson={addPerson}
        newName={newName}
        handleNewName={handleNewName}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
      />
      <h2>Numbers</h2>
      <RenderPerson persons={persons} />
    </div>
  )

}

export default App