import './signup.scss'
import Navbar from '../../components/navbar/Navbar'
import { TextField, Box } from '@mui/material'
import { getCustomInputStyles } from '../../utils/muiCustomTheme'
import { useEffect, useState } from 'react'

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
  const [submitted, setSubmitted] = useState(true)

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
    const findError = Object.values(alert).find((alert) => alert !== ' ')
    if (findError) {
      return false
    }

    const inputKeys = Object.keys(initInputs)
    for (let i = 0; i < inputKeys.length; i++) {
      const key = inputKeys[i]
      if (!inputs[key]) {
        return false
      }
    }

    return true
  }

  function handleLogin(e) {
    e.preventDefault()

    console.log('areAllFieldsValid: ', areAllFieldsValid())

    if (areAllFieldsValid()) {
      setSubmitted(true)
    }
  }

  return (
    <div className='signup'>
      {submitted ? (
        <>
          <Navbar page='home' />

          <main className='submitted'>
            <div className='container'>
              <div className='titles'>
                <h2>Check Your Email</h2>
                <p>We have sent you an email with a link to active your account.</p>
                <p>Please check your email and spam folder.</p>
                <p className='resend'>
                  Can’t find the email? <span className='clickable'>Click here to resend</span>
                </p>
              </div>
              <button type='submit'>DONE</button>
            </div>
          </main>
        </>
      ) : (
        <>
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
        </>
      )}
    </div>
  )
}
