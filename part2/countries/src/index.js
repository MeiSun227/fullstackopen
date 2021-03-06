import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios'

const Country = (props) => {
    return (
        <>
            <p>{props.country.name}  </p>  <button onClick={() => props.buttonFunction(props.country.name)}>show</button>
        </>
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
            <img src={props.country.flag} height="120" width="240" alt="not found"></img>
            <Weather city={props.country.capital}/>
        </>
    )
}

const Weather = (props) => {
    const [weather, setWeather] = useState('')
    const key = "a018616bcba97f9da69ec73400c8f84e"
    const city = props.city
    useEffect(() => {
        axios
            .get(`http://api.weatherstack.com/current?access_key=${key}&query=${city}`)
            .then(response => {
                console.log(response.data.current)
                setWeather(response.data.current)
            })
    }, [])
    return (
        <>
        <h2>Weather in {city}</h2>
        <p><b>temperature: </b>{weather.temperature} celsius</p>
        <img src={weather.weather_icons} height="120" width="180" alt="not found"></img>
        <p><b>wind: </b>{weather.wind_speed} kph direction {weather.wind_dir}</p>
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

    const handleSearchChange = (event) => {
        setNewSearch(event.target.value)
    }

    const handleClick = (country_name) => {
        setNewSearch(country_name)
    }

    const countriesToShow = countries.filter(country => country.name.toUpperCase().includes(search.toUpperCase()))
    const showedCountriesList = search ? countriesToShow : []
    const countriesComponets = showedCountriesList.map((country) => <Country key={country.alpha3Code} country={country} buttonFunction={handleClick} />)
    const displayCompenents = showedCountriesList.length === 1 ? <DetailOfCountry country={showedCountriesList[0]} /> : countriesComponets 
    

    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {

                setNewCountries(response.data)
            })
    }, [])

    return (
        <div>
            find countries:  <input value={search} onChange={handleSearchChange} />
            <div>{displayCompenents}</div>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));


