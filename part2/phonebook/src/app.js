import React, { useState } from 'react'

const Person = (props) => {
  return (
    <p>{ props.name }</p>

  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])

  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const personsObject = { name: newName }
    const names = persons.map((person)=> person.name)
    

    names.includes(newName) ? alert(`${newName} is already added to phonebook`) : setPersons(persons.concat(personsObject))
    setNewName('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

const person_components = persons.map((person) => <Person key={person.name} name={person.name}/>)


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {person_components}

    </div>
  )
}

export default App