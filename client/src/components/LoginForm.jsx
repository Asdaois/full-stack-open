import PropTypes from 'prop-types'
import React from 'react'

const LoginForm = ({ credentials, handleLogin, handleCredentials }) => {
  return (
    <div className=''>
      <form onSubmit={handleLogin}>
        <label htmlFor='username'>username</label>
        <input
          type='text'
          name='username'
          value={credentials.username}
          onChange={handleCredentials}
          data-cy='input-login-username'
        />

        <label htmlFor='password'>password</label>
        <input
          type='password'
          name='password'
          value={credentials.password}
          onChange={handleCredentials}
          data-cy='input-login-password'
        />
        <button type='submit' className='btn btn-blue' data-cy='login-submit'>
          login
        </button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  credentials: PropTypes.object.isRequired,
  handleCredentials: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired
}

export default LoginForm
