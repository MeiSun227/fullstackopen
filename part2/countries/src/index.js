import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios'

const Country = (props) => {
    return (
        <p>{props.name} </p>
    )
}

const DetailOfCountry = (props) => {
    return (
        <>
            <h1>{props.country.name}</h1>
            <p>Capital: {props.country.capital}</p>
            <p>Population: {props.country.population}</p>
            <h2>languages</h2>
            <Languages languages={props.country.languages} />
            <img src={props.country.flag} height="120" width="240"></img>

        </>
    )
}

const Languages = (props) => {
    const languages = props.languages.map((language) => <Language key={language.name} language={language} />)
    return (
        <ul>
            {languages}
        </ul>
    )

}

const Language = (props) => {
    return (
        <li>{props.language.name}</li>
    )

}

const App = () => {
    const [countries, setNewCountries] = useState([])
    const [search, setNewSearch] = useState('')

    const countriesToShow = countries.filter(country => country.name.toUpperCase().includes(search.toUpperCase()))
    const showedCountriesList = search ? countriesToShow : []
    const countriesComponets = showedCountriesList.map((country) => <Country key={country.alpha3Code} name={country.name} />)
    const displayCompenets = showedCountriesList.length === 1 ? <DetailOfCountry country={showedCountriesList[0]} /> : countriesComponets

    const handleSearchChange = (event) => {
        setNewSearch(event.target.value)
    }

    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {

                setNewCountries(response.data)
            })
    }, [])
    console.log(countriesToShow)

    return (
        <div>
            find countries:  <input value={search} onChange={handleSearchChange} />
            <div>{displayCompenets}</div>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));


