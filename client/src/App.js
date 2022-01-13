import React, { useEffect, useState } from 'react'

import LoginForm from 'components/LoginForm'
import loginService from 'services/loginService'
import BlogsApp from 'apps/blogs/BlogApp'

const App = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
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
    } catch (error) {
      console.error('Some error happen while login')
    }
  }

  const loginForm = (
    <LoginForm
      credentials={credentials}
      handleLogin={handleLogin}
      handleCredentials={handleCredentials}
    />
  )

  const apps = (
    <div className=''>
      <div className=''>{user} logged in</div>
      <BlogsApp />
    </div>
  )

  return (
    <div className='p-4 box-border'>
      {user === null ? loginForm : apps}
    </div>
  )
}

export default App
