import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const handleAnecdotesClick = () => {
        const anecdotesIndex = Math.floor(Math.random() * anecdotes.length)


        setSelected(anecdotesIndex)

    }
    const [vote, setVote] = useState(new Array(anecdotes.length).fill(0))
    const handleVoteClick = () => {
        const copy = [...vote]
        copy[selected] += 1

        setVote(copy)
    }
console.log(vote)
    const highestNumberOfVote = Math.max(...vote)
    console.log(highestNumberOfVote)
    const highestVoteIndex = vote.indexOf(highestNumberOfVote)
    console.log(highestVoteIndex)

    return (
        <div>
            <h1>Anecdotes of the day</h1>
            {props.anecdotes[selected]} <br />
            <p>Has {vote[selected]} votes</p>
            <button onClick={() => handleAnecdotesClick()}>next anecdotes</button>
            <button onClick={() => handleVoteClick()}>vote</button>
            <h1>Anecdote with most votes</h1>
            {props.anecdotes[highestVoteIndex]} 
        </div>
    )

}
const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)