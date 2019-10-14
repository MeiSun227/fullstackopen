import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Person = (props) => {
  return (
    <p>{props.name} {props.number}</p>


  )
}

const Persons = (props) => {
  const person_components = props.persons.map((person) => <Person key={person.name} name={person.name} number={person.number} />)
  return (
    <>
      {person_components}
    </>
  )
}

const PersonForm = (props) => {

  return (
    <>
      <div>
        name: <input value={props.newName} onChange={props.handleNameChange} />
        <div>number: <input value={props.newNumber} onChange={props.handleNumberChange} /></div>
      </div>

      <div>
        <button type="submit">add</button>
      </div>
    </>
  )
}

const Filter = (props) => {
  return (
    <>
      filter shown name <input value={props.search} onChange={props.handleSearchChange} />
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setNewSearch] = useState('')

  useEffect(() => { 
    axios
    .get('http://localhost:3001/persons') 
    .then(response => {
      setPersons(response.data)
    })
    },[])
 
 
    const addPerson = (event) => {
    event.preventDefault()
    const personsObject = { name: newName, number: newNumber }
    const names = persons.map((person) => person.name)


    names.includes(newName) ? alert(`${newName} is already added to phonebook`) : setPersons(persons.concat(personsObject))
    setNewName('')
    setNewNumber('')
    setNewSearch('')

    axios
    .post('http://localhost:3001/persons', personsObject)
    .then(response => {
      console.log(response)
    })
  }

  const handleNameChange = (event) => {

    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const nameToShow = persons.filter(person => person.name.toUpperCase().includes(search.toUpperCase()))

  const showedPersons = search ? nameToShow : persons

  const handleSearchChange = (event) => {

    setNewSearch(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <form onSubmit={addPerson}>
        <Filter handleSearchChange={handleSearchChange} search={search} />
        <h2>add new number</h2>
        <PersonForm handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber} />
      </form>
      <h2>Numbers</h2>
      <Persons persons={showedPersons} />
    </div>

  )
}

export default App