import React, { useEffect, useState } from 'react'

import LoginForm from 'components/LoginForm'
import loginService from 'services/loginService'
import BlogsApp from 'apps/BlogApp'
import Togglable from 'components/Togglabel'
import NotesApp from 'apps/NotesApp'

const App = () => {
  const DEFAULT_CREDENTIALS = { username: '', password: '' }
  const [credentials, setCredentials] = useState({ ...DEFAULT_CREDENTIALS })
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userLogged = window.localStorage.getItem('username')

    if (userLogged) {
      setUser(userLogged)
    }
  }, [])
  const handleCredentials = ({ target }) => {
    setCredentials({ ...credentials, [target.name]: target.value })
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({
        ...credentials
      })

      window.localStorage.setItem('username', user.username)
      window.localStorage.setItem('token', user.token)
      setUser(user.username)
      setCredentials({ ...DEFAULT_CREDENTIALS })
    } catch (error) {
      console.error('Some error happen while login')
    }
  }

  const handleLogout = async (e) => {
    e.preventDefault()

    setUser(null)
    window.localStorage.clear()
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
        </Togglable>
      </div>

    )
  }

  return (
    <div className='p-4 box-border'>
      <div className=''>{user} logged in
        <button onClick={handleLogout} className='pt-4 text-xl btn btn-red'>logout</button>
      </div>
      <BlogsApp />
      <NotesApp />
    </div>
  )
}

export default App
