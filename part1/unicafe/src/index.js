import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <h1>{props.header}</h1>

  )
}

const Statistic = ({ text, value }) => {
  return (
    <p>{text} {value}</p>
  )
}

const Statistics = ({ statistic, good, bad, neutral }) => {

  const sum = () => {
    return good + neutral + bad
  }

  const averageCalculate = () => {
    const value = good * 1 + neutral * 0 + bad * -1

    const average = (value / sum()).toFixed(2)
    if (sum() === 0) {
      return 0
    }
    console.log(average);
    return average
  }

  const positiveCalculate = () => {
    if (sum() === 0) {
      return 0
    }
    return (good / sum() * 100).toFixed(2) + "%"


  }
  if (sum() === 0) {
    return (
      <div>
        <Header header={statistic} />
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <Header header={statistic} />
      <Statistic text="good: " value={good} />
      <Statistic text="neutral: " value={neutral} />
      <Statistic text="bad: " value={bad} />
      <Statistic text="all: " value={sum()} />
      <Statistic text="average: " value={averageCalculate()} />
      <Statistic text="positive:  " value={positiveCalculate()} />
    </div>)
}
const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>{text}</button>
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
    setGood(newGood)
  }
  const handleNeutralClick = () => {

    const newNeutral = neutral + 1
    setNeutral(newNeutral)
  }
  const handleBadClick = () => {
    const newBad = bad + 1
    setBad(newBad)
  }

  return (
    <div>
      <Header header={header} />
      <Button onClick={handleGoodClick} text="good" />
      <Button onClick={handleNeutralClick} text="neutral" />
      <Button onClick={handleBadClick} text="bad" />

      <Statistics statistic={statistic} good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)


