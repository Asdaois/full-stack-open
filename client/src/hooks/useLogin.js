import loginService from 'services/loginService'

const { useState } = require('react')

const useLogin = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' })



  return { user, credentials, handleCredentials, handleLogin }
}

export default useLogin
