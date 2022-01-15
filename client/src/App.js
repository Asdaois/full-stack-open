import BlogsApp from 'apps/BlogApp'
import DataCountries from 'apps/DataCountriesApp'
import NotesApp from 'apps/NotesApp'
import Home from 'components/Home'
import Login from 'components/Login'
import Navbar from 'components/Navbar'

import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'

const App = () => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const userLogged = window.localStorage.getItem('username')
    if (userLogged) {
      setUser(userLogged)
      return
    }

    navigate('/login')
  }, [])

  const login = user => {
    setUser(user)
    navigate('/')
    console.log('hola')
  }

  const handleLogout = async e => {
    e.preventDefault()

    setUser(null)
    window.localStorage.clear()
    navigate('login')
  }

  return (
    <div className='p-4 box-border'>
      <Navbar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path='/login' element={<Login onLogin={login} />} />
        <Route path='/' element={<Home />} />
        <Route path='/blogs' element={<BlogsApp />} />
        <Route path='/notes/*' element={<NotesApp />} />
        <Route path='/countries-weather' element={<DataCountries />} />
      </Routes>
    </div>
  )
}

export default App
