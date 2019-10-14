import React, { useState, useEffect } from 'react'
import personsService from './services/persons'

const Person = (props) => {
  return (
    <p>{props.person.name} {props.person.number} <button onClick={() => { props.handleDelete(props.person) }} >delete</button></p>


  )
}

const Persons = (props) => {
  const person_components = props.persons.map((person) => <Person key={person.id} person={person} handleDelete={props.handleDelete} />)
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
    personsService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const createPerson = (persons, name, number) => {
    const personObject = { name: newName, number: newNumber }
    setPersons(persons.concat(personObject))
    personsService
      .create(personObject)
      .then(response => {
        console.log(response)
      })
  }

  const updatePerson = (persons, name, number) => {
    if (window.confirm(`${name} is already added to the phonebook, replace old number with a new one?`)) {
      let updatedPerson = persons.filter(person => person.name === name)[0]
      updatedPerson.number = number
      personsService
        .update(updatedPerson.id, updatedPerson)
        .then(response => {
          console.log(response)
        })
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    const names = persons.map((person) => person.name)
    names.includes(newName) ? updatePerson(persons, newName, newNumber) : createPerson(persons, newName, newNumber)
    setNewName('')
    setNewNumber('')
    setNewSearch('')
  }

  const handleNameChange = (event) => {

    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleDeletePerson = (personToDelete) => {
    if (window.confirm("Delete " + personToDelete.name + "?")) {
      personsService.deletePerson(personToDelete.id)
        .then(response => {
          personsService
            .getAll()
            .then(response => {
              setPersons(response.data)
            })
        })
    }

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
      <Persons persons={showedPersons} handleDelete={handleDeletePerson} />
    </div>

  )
}

export default App