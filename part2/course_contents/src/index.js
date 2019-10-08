import React from 'react'
import ReactDOM from 'react-dom'
import Course from './Course'


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
