import React from 'react'
import ReactDOM from 'react-dom'


const Header = (props) => {
    return (
        <h1>{props.course}</h1>
    )
}

const Part = (props) => {
    return (
        <p>{props.part.name} {props.part.exercises}</p>
    )
}

const Content = (props) => {
    const parts = props.parts
    const components_part = parts.map((part) => <Part key={part.id} part={part} />)
    return (
        <>
            {components_part}
        </>
    )


}
const Course = (props) => {
    return (
        <div>
            <Header course={props.course_json.name} />
            <Content parts={props.course_json.parts} />
            <Total parts={props.course_json.parts} />

        </div>
    )
}
const Total = (props) => {
    const parts = props.parts
    const totalAmount = parts.reduce((sum, part) => sum + part.exercises, 0)

    return (
        <>
           <b> total of {totalAmount} exercises</b>
        </>
    )
}

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10,
                id: 1
            },
            {
                name: 'Using props to pass data',
                exercises: 7,
                id: 2
            },
            {
                name: 'State of a component',
                exercises: 14,
                id: 3
            },
            {
                name: 'Redux',
                exercises: 11,
                id: 4
            }

        ]
    }


    return (
        <div>
            <Course course_json={course} />
        </div>
    )
}



ReactDOM.render(<App />, document.getElementById('root'))
