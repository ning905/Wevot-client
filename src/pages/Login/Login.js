import './login.scss'
import Navbar from '../../components/navbar/Navbar'
import { TextField, Box } from '@mui/material'
import { getCustomInputStyles } from '../../utils/muiCustomTheme'
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { error, filedHasContent } from '../../utils/validRegex'
import client from '../../utils/client'
import { UserContext } from '../../context/UserContext'

const initInputAlert = {
  identifier: { status: '', content: ' ' },
  password: { status: '', content: ' ' },
}

export default function Login() {
  const [inputs, setInputs] = useState({ identifier: '', password: '' })
  const [alert, setAlert] = useState(initInputAlert)
  const [accountError, setAccountError] = useState('')
  const { userAction } = useContext(UserContext)
  const navigate = useNavigate()

  function handleInput(e) {
    setAccountError('')
    const { name, value } = e.target
    setAlert({ ...alert, [name]: initInputAlert[name] })
    if (!value) {
      setAlert({ ...alert, [name]: error.emptyField })
    }

    setInputs({ ...inputs, [name]: value })
  }

  function handleLogin(e) {
    e.preventDefault()

    const bothFieldsHasContent =
      filedHasContent('identifier', inputs.identifier, alert, setAlert) &&
      filedHasContent('password', inputs.password, alert, setAlert)

    if (bothFieldsHasContent) {
      client
        .post('/users/login', inputs)
        .then((res) => {
          const data = res.data.data
          const token = data.token
          const tokenKey = process.env.REACT_APP_USER_TOKEN
          localStorage.setItem(tokenKey, token)
          userAction({ type: 'LOGIN', payload: data.user })

          navigate(`/${data.user.username}`)
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
