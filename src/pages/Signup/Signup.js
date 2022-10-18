import './signup.scss'
import Navbar from '../../components/navbar/Navbar'
import { TextField, Box } from '@mui/material'
import { getCustomInputStyles } from '../../utils/muiCustomTheme'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const initAlert = {
  username: ' ',
  email: ' ',
  password: ' ',
  confirmPassword: ' ',
}

const initInputs = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
}

export default function Signup() {
  const [inputs, setInputs] = useState(initInputs)
  const [alert, setAlert] = useState(initAlert)
  const navigate = useNavigate()

  useEffect(() => {
    setInputs(initInputs)
    setAlert(initAlert)
  }, [])

  function handleInput(e) {
    const { name, value } = e.target
    setAlert({ ...alert, [name]: ' ' })
    if (!value) {
      setAlert({ ...alert, [name]: 'This field cannot be empty' })
    }

    setInputs({ ...inputs, [name]: value })
  }

  function areAllFieldsValid() {
    const inputKeys = Object.keys(initInputs)
    for (let i = 0; i < inputKeys.length; i++) {
      const key = inputKeys[i]

      if (!inputs[key]) {
        setAlert({ ...alert, [key]: 'This field cannot be empty' })
        return false
      }

      if (key === 'email') {
        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if (!inputs[key].match(validRegex)) {
          setAlert({ ...alert, email: 'Invalid email address' })
          return false
        }
      }
    }

    const findError = Object.values(alert).find((alert) => alert !== ' ')
    if (findError) {
      return false
    }
    return true
  }

  function handleLogin(e) {
    e.preventDefault()

    if (areAllFieldsValid()) {
      console.log('navigate')
      navigate('/signup/check-email')
    }
  }

  return (
    <div className='signup'>
      <Navbar page='signup' />

      <main className='signup-form'>
        <div className='container'>
          <div className='titles'>
            <h2>Join us!</h2>
            <p>Enter your details below to create an account.</p>
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
              label='USERNAME'
              type='text'
              name='username'
              value={inputs.username}
              color={alert.username !== ' ' && 'error'}
              helperText={alert.username}
              sx={getCustomInputStyles(alert.username)}
              onChange={handleInput}
            />

            <TextField
              required
              className='input-field'
              variant='standard'
              label='EMAIL'
              type='email'
              name='email'
              value={inputs.email}
              color={alert.email !== ' ' && 'error'}
              helperText={alert.email}
              sx={getCustomInputStyles(alert.email)}
              onChange={handleInput}
            />

            <TextField
              required
              className='input-field'
              variant='standard'
              label='PASSWORD'
              type='password'
              name='password'
              value={inputs.password}
              color={alert.password !== ' ' && 'error'}
              helperText={alert.password}
              sx={getCustomInputStyles(alert.password)}
              onChange={handleInput}
            />

            <TextField
              required
              className='input-field'
              variant='standard'
              label='CONFIRM PASSWORD'
              type='password'
              name='confirmPassword'
              value={inputs.confirmPassword}
              color={alert.confirmPassword !== ' ' && 'error'}
              helperText={alert.confirmPassword}
              sx={getCustomInputStyles(alert.confirmPassword)}
              onChange={handleInput}
            />

            <button type='submit'>CREATE AN ACCOUNT</button>
          </Box>
        </div>
      </main>
    </div>
  )
}
