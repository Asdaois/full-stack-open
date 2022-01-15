import React, { useState } from 'react'
import loginService from 'services/loginService'
import LoginForm from './LoginForm'
import Togglable from './Togglable'
const DEFAULT_CREDENTIALS = { username: '', password: '' }

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ ...DEFAULT_CREDENTIALS })
  const [loginErrorMessage, setLoginErrorMessage] = useState('')

  const handleCredentials = ({ target }) => {
    setCredentials({ ...credentials, [target.name]: target.value })
  }

  const handleLogin = async e => {
    try {
      console.log('?')
      e.preventDefault()
      const user = await loginService.login({
        ...credentials
      })

      console.log('??')
      window.localStorage.setItem('username', user.username)
      window.localStorage.setItem('token', user.token)

      onLogin(user)
      console.log('???')
      setCredentials({ ...DEFAULT_CREDENTIALS })
    } catch (error) {
      setLoginErrorMessage('some error happen while login')
    }
  }
  return (
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
  )
}

export default Login
