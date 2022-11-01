import './login.scss'
import Navbar from '../../components/navbar/Navbar'
import { TextField, Box } from '@mui/material'
import { getCustomInputStyles } from '../../utils/muiCustomTheme'
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { error, fieldHasContent } from '../../utils/validRegex'
import client from '../../utils/client'
import { UserContext } from '../../context/UserContext'

const initInputs = { identifier: '', password: '' }

const initAlert = {
  identifier: { status: '', content: ' ' },
  password: { status: '', content: ' ' },
}
const tokenKey = process.env.REACT_APP_USER_TOKEN

export default function Login() {
  const [inputs, setInputs] = useState(initInputs)
  const [alert, setAlert] = useState(initAlert)
  const [accountError, setAccountError] = useState('')
  const { currentUser, userAction } = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (currentUser && localStorage.getItem(tokenKey)) {
      navigate('/dashboard')
    }
  }, [currentUser])

  function handleInput(e) {
    setAccountError('')
    const { name, value } = e.target
    setAlert({ ...alert, [name]: initAlert[name] })
    if (!value) {
      setAlert({ ...alert, [name]: error.emptyField })
    }

    setInputs({ ...inputs, [name]: value })
  }

  function handleLogin(e) {
    e.preventDefault()

    const bothFieldsHasContent =
      fieldHasContent('identifier', inputs.identifier, alert, setAlert) &&
      fieldHasContent('password', inputs.password, alert, setAlert)

    if (bothFieldsHasContent) {
      client
        .post('/users/login', inputs)
        .then((res) => {
          const data = res.data.data
          const token = data.token
          const tokenKey = process.env.REACT_APP_USER_TOKEN
          localStorage.setItem(tokenKey, token)
          userAction({ type: 'LOGIN', payload: data.user })

          navigate('/dashboard', { replace: true })
        })
        .catch((res) => {
          const data = res.response.data
          setAccountError(data.message)
        })
    }
  }

  return (
    <div className='login'>
      <Navbar page='login' />

      <main>
        <div className='container'>
          <div className='titles'>
            <h2>Welcome to Wevot!</h2>
            <p>Please log in</p>
            {accountError && <p id='account-error'>Failed: {accountError}</p>}
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
              type='text'
              name='identifier'
              value={inputs.identifier}
              color={alert.identifier.status}
              helperText={alert.identifier.content}
              sx={getCustomInputStyles(alert.identifier)}
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
                value={inputs.password}
                color={alert.password.status}
                helperText={alert.password.content}
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
