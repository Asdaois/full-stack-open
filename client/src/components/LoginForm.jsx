import React from 'react'

const LoginForm = ({ credentials, handleLogin, handleCredentials }) => {
  return (
    <form onSubmit={handleLogin}>
      <label htmlFor='username'>username</label>
      <input
        type='text'
        name='username'
        value={credentials.username}
        onChange={handleCredentials}
      />

      <label htmlFor='password'>password</label>
      <input
        type='password'
        name='password'
        value={credentials.password}
        onChange={handleCredentials}
      />
      <button type='submit' className='btn btn-green'>
        LOGIN
      </button>
    </form>
  )
}

export default LoginForm
