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
const Courses =(props)=>{
    const course_componets= props.courses_json.map((course) => <Course course_json ={course} key={course.id}/>)

    return(
        <>
        {course_componets}
        </>
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
    const courses = [
      {
        name: 'Half Stack application development',
        id: 1,
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
      }, 
      {
        name: 'Node.js',
        id: 2,
        parts: [
          {
            name: 'Routing',
            exercises: 3,
            id: 1
          },
          {
            name: 'Middlewares',
            exercises: 7,
            id: 2
          }
        ]
      }
    ]


    return (
        <div>
            <Courses courses_json={courses} />
        </div>
    )
}       



ReactDOM.render(<App />, document.getElementById('root'))
