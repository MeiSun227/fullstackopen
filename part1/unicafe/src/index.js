import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <h1>{props.header}</h1>
    
  )
}


const App = () => {
  // save clicks of each button to own state
  const header = 'Give feedback'
  const statistic = 'Statistics'
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {

    const newGood = good + 1
    console.log(good);
    setGood(newGood)
  }
  const handleNeutralClick = () => {

    const newNeutral = neutral + 1
    console.log(neutral);
    setNeutral(newNeutral)
  }
const handleBadClick = () => {
  const newBad = bad + 1
    console.log(bad);
    setBad(newBad)
}
  return (
    <div>
      <Header header={header} />
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>
     
      <Header header={statistic} />
      <p>good: {good}</p>
      <p>neutral: {neutral}</p>
      <p>bad: {bad}</p>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)


