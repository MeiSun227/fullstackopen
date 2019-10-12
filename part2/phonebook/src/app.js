import React, { useState } from 'react'

const Person = (props) => {
  return (
    <p>{ props.name} {props.number}</p>
    

  )
}


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setNewSearch] = useState('')


  const addPerson = (event) => {
    event.preventDefault()
    const personsObject = { name: newName , number: newNumber }
    const names = persons.map((person)=> person.name)
    

    names.includes(newName) ? alert(`${newName} is already added to phonebook`) : setPersons(persons.concat(personsObject))
    setNewName('')
    setNewNumber('')
    setNewSearch('')
  }

  const handleNameChange = (event) => {
   
    setNewName(event.target.value)
  }
  const handleNumberChange =(event)=>{
    setNewNumber(event.target.value)
  }

const nameToShow = persons.filter( person => person.name.toUpperCase().includes(search.toUpperCase()))
console.log(nameToShow)

const showPerson = search ? nameToShow : persons

const handleSearchChange =(event) =>{
 
  setNewSearch (event.target.value)
  console.log(search)
}

  const person_components = showPerson.map((person) => <Person key={person.name} name={person.name} number={person.number} />)

  return (
    <div>
      <h1>Phonebook</h1>
      <form onSubmit={addPerson}>
        filter shown name <input value={search} onChange={handleSearchChange}/>
        <h2>add new number</h2>
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