import React from 'react'

const WebDevCurriculum = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 'e5ou4a6i',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 'aeou46o5eu'
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 'o54eauax4e'
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: '4u56aok4e'
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 'oeuek6aoe4ku'
        }
      ]
    },
    {
      name: 'Node.js',
      id: 'euoa5exk4oe',
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 'eau454dyfa4u6'
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: '4aoeu654k'
        }
      ]
    }
  ]

  return (
    <div className=''>
      <h1>Web development curriculum</h1>
      {courses.map((course) => (
        <Course course={course} key={course.id} />
      ))}
      ;
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Header = ({ courseName }) => {
  return <h2>{courseName}</h2>
}

const Content = ({ parts }) => {
  return (
    <div className=''>
      {parts.map((part, i) => (
        <p key={i}>{`${part.name} ${part.exercises}`}</p>
      ))}
    </div>
  )
}

const Total = ({ parts }) => {
  const total = parts.reduce((prev, curr) => prev + curr.exercises, 0)
  return <strong className=''>Total of {total} exercises</strong>
}

export default WebDevCurriculum
