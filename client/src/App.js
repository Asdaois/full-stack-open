import BlogsApp from 'apps/BlogApp'
import DataCountries from 'apps/DataCountriesApp'
import NotesApp from 'apps/NotesApp'
import Home from 'components/Home'
import LoginForm from 'components/LoginForm'
import Togglable from 'components/Togglable'

import React, { useEffect, useState } from 'react'
import {
  Link,
  Route,
  Routes,
  useNavigate
} from 'react-router-dom'

import loginService from 'services/loginService'

const App = () => {
  const DEFAULT_CREDENTIALS = { username: '', password: '' }
  const [credentials, setCredentials] = useState({ ...DEFAULT_CREDENTIALS })
  const [user, setUser] = useState(null)
  const [loginErrorMessage, setLoginErrorMessage] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const userLogged = window.localStorage.getItem('username')
    if (userLogged) {
      setUser(userLogged)
      return
    }

    navigate('/login')
  }, [])

  const handleCredentials = ({ target }) => {
    setCredentials({ ...credentials, [target.name]: target.value })
  }

  const handleLogin = async e => {
    e.preventDefault()
    try {
      const user = await loginService.login({
        ...credentials
      })

      window.localStorage.setItem('username', user.username)
      window.localStorage.setItem('token', user.token)
      setUser(user.username)
      setCredentials({ ...DEFAULT_CREDENTIALS })
      navigate('/')
    } catch (error) {
      setLoginErrorMessage('some error happen while login')
    }
  }

  const handleLogout = async e => {
    e.preventDefault()

    setUser(null)
    window.localStorage.clear()
    navigate('/login')
  }

  if (user === null) {
    return (
      <div className='p-4 box-border'>
        <Togglable buttonLabel='login'>
          <LoginForm
            credentials={credentials}
            handleLogin={handleLogin}
            handleCredentials={handleCredentials}
          />
          <div className='' data-cy='login-error-message'>
            {loginErrorMessage}
          </div>
        </Togglable>
      </div>
    )
  }

  return (
    <div className='p-4 box-border'>
      <nav className='flex items-center justify-between'>
        <div className='flex gap-2'>
          <Link to=''>Home</Link>
          <Link to='blogs'>Blogs</Link>
          <Link to='notes'>Notes</Link>
          <Link to='countries-weather'>Countries Weather</Link>
        </div>

        <div className='flex items-center mr-40'>
          {user} logged in
          <button
            onClick={handleLogout}
            className='text-xl btn btn-red'
            data-button='logout'
          >
            logout
          </button>
        </div>
      </nav>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/blogs' element={<BlogsApp />} />
        <Route path='/notes/*' element={<NotesApp />} />
        <Route path='/countries-weather' element={<DataCountries />} />
      </Routes>
    </div>
  )
}

export default App
