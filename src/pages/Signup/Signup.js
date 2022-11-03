import './signup.scss'
import Navbar from '../../components/navbar/Navbar'
import { TextField, Box } from '@mui/material'
import { getCustomInputStyles } from '../../utils/muiCustomTheme'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { areAllFieldsValid, error, userValidRegex } from '../../utils/validRegex'
import client from '../../utils/client'
import { UserContext } from '../../context/UserContext'

const initInputs = {
  username: '',
  email: '',
  password: '',
  confirmedPassword: '',
}

const initAlert = {
  username: { status: '', content: ' ' },
  email: { status: '', content: ' ' },
  password: { status: '', content: ' ' },
  confirmedPassword: { status: '', content: ' ' },
}

export default function Signup() {
  const [inputs, setInputs] = useState(initInputs)
  const [alert, setAlert] = useState(initAlert)
  const [serverError, setServerError] = useState('')
  const { currentUser } = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    setInputs(initInputs)
    setAlert(initAlert)

    if (currentUser) {
      navigate('/dashboard')
    }
  }, [currentUser, navigate])

  function handleInput(e) {
    const { name, value } = e.target
    setAlert({ ...alert, [name]: initAlert[name] })

    if (name === 'username') {
      if (!value.match(userValidRegex[name])) {
        setAlert({
          ...alert,
          [name]: error.usernameRequire,
        })
      }
    }

    if (name === 'password') {
      if (value.match(userValidRegex[name])) {
        setAlert({
          ...alert,
          [name]: error.passRequire,
        })
      }
    }

    if (name === 'confirmedPassword' && value !== inputs.password) {
      setAlert({ ...alert, [name]: error.diffPass })
    }

    if (!value) {
      setAlert({ ...alert, [name]: error.emptyField })
    }

    setInputs({ ...inputs, [name]: value })
  }

  function handleSignup(e) {
    e.preventDefault()

    if (areAllFieldsValid(initInputs, inputs, alert, setAlert)) {
      client
        .post('/users/signup', inputs)
        .then((res) => {
          if (res.data.status === 'success') {
            navigate(`/signup/check-email/${inputs.username}`)
          }
        })
        .catch((res) => {
          const data = res.response.data
          if (Object.keys(inputs).includes(data.message.field)) {
            setAlert({
              ...alert,
              [data.message.field]: { status: 'error', content: data.message.content },
            })
          } else {
            setServerError(data.message)
            setTimeout(() => {
              setServerError('')
            }, '3000')
          }
        })
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
            {serverError && <p id='server-error'>Failed: {serverError}</p>}
          </div>

          <Box
            className='box'
            component='form'
            autoComplete='off'
            onSubmit={handleSignup}
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
              color={alert.username.status}
              helperText={alert.username.content}
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
              color={alert.email.status}
              helperText={alert.email.content}
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
              color={alert.password.status}
              helperText={alert.password.content}
              sx={getCustomInputStyles(alert.password)}
              onChange={handleInput}
            />

            <TextField
              required
              className='input-field'
              variant='standard'
              label='CONFIRM PASSWORD'
              type='password'
              name='confirmedPassword'
              value={inputs.confirmedPassword}
              color={alert.confirmedPassword.status}
              helperText={alert.confirmedPassword.content}
              sx={getCustomInputStyles(alert.confirmedPassword)}
              onChange={handleInput}
            />

            <button type='submit'>CREATE AN ACCOUNT</button>
          </Box>
        </div>
      </main>
    </div>
  )
}
