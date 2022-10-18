import './login.scss'
import Navbar from '../../components/navbar/Navbar'
import { TextField, Box } from '@mui/material'
import { getCustomInputStyles } from '../../utils/muiCustomTheme'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const initAlert = { email: ' ', password: ' ' }

export default function Login() {
  const [inputs, setInputs] = useState({})
  const [alert, setAlert] = useState(initAlert)

  function handleInput(e) {
    const { name, value } = e.target
    setAlert({ ...alert, [name]: ' ' })
    if (!value) {
      setAlert({ ...alert, [name]: 'This field cannot be empty' })
    }

    setInputs({ ...inputs, [name]: value })
  }

  function handleLogin(e) {
    e.preventDefault()
  }

  return (
    <div className='login'>
      <Navbar page='login' />

      <main>
        <div className='container'>
          <div className='titles'>
            <h2>Welcome to Wevot!</h2>
            <p>Please log in</p>
          </div>

          <Box
            className='box'
            component='form'
            autoComplete='off'
            onSubmit={handleLogin}
            noValidate
          >
            <TextField
              required
              className='input-field'
              variant='standard'
              label='EMAIL / USERNAME'
              type='email'
              name='email'
              color={alert.email !== ' ' && 'error'}
              helperText={alert.email}
              sx={getCustomInputStyles(alert.email)}
              onChange={handleInput}
            />
            <div className='password-wrap'>
              <TextField
                required
                className='input-field'
                variant='standard'
                label='PASSWORD'
                type='password'
                name='password'
                color={alert.password !== ' ' && 'error'}
                helperText={alert.password}
                sx={getCustomInputStyles(alert.password)}
                onChange={handleInput}
              />

              <Link className='forgot-password'>Forgot Password?</Link>
            </div>

            <button type='submit'>LOG IN</button>
          </Box>
        </div>
      </main>
    </div>
  )
}
