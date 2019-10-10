import React, { useState } from 'react'

const Person = (props) => {
  return (
    <p>{ props.name} {props.number}</p>
    

  )
}


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' ,number: '04522456'}
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personsObject = { name: newName , number: newNumber }
    const names = persons.map((person)=> person.name)
    

    names.includes(newName) ? alert(`${newName} is already added to phonebook`) : setPersons(persons.concat(personsObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange =(event)=>{
    setNewNumber(event.target.value)
  }

  const person_components = persons.map((person) => <Person key={person.name} name={person.name} number={person.number}/>)

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
          <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
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