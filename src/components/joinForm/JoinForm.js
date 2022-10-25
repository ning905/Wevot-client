import './joinForm.scss'
import { Dialog, DialogActions, DialogContent, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { getCustomInputStyles } from '../../utils/muiCustomTheme'
import { useState } from 'react'
import { areAllFieldsValid, error } from '../../utils/validRegex'
import client from '../../utils/client'

const initInputAlert = {
  code: { status: '', content: ' ' },
  email: { status: '', content: ' ' },
  name: { status: '', content: ' ' },
}

const initInputs = {
  code: '',
  email: '',
  name: '',
}

export default function JoinForm({ open, setOpen }) {
  const [inputs, setInputs] = useState(initInputs)
  const [alert, setAlert] = useState(initInputAlert)
  const [resErr, setResErr] = useState('')
  const navigate = useNavigate()

  function handleClose() {
    setOpen(false)
    setInputs(initInputs)
    setAlert(initInputAlert)
    setResErr('')
  }

  function handleInput(e) {
    setResErr('')
    const { name, value } = e.target
    setAlert({ ...alert, [name]: initInputAlert[name] })

    if (name !== 'name' && !value) {
      setAlert({ ...alert, [name]: error.emptyField })
    }

    setInputs({ ...inputs, [name]: value })
  }

  function handleJoin() {
    console.log('inputs: ', inputs)
    if (areAllFieldsValid(initInputs, inputs, alert, setAlert)) {
      console.log('all valid')
      client
        .get(`/events/participate/${inputs.code}`)
        .then((res) => {
          console.log('response: ', res)
          if (res.data.status === 'success') {
            navigate(`/events/participate/${inputs.code}`)
          }
        })
        .catch((res) => {
          console.log('response: ', res.response.data)
          const data = res.response.data
          setResErr(data.message)
        })
    }
  }

  return (
    <div className='join-form'>
      <Dialog open={open} onClose={handleClose}>
        <h2>Please provide the event code</h2>
        {resErr && <p>Failed: {resErr}</p>}
        <DialogContent>
          <TextField
            required
            className='input-field'
            variant='standard'
            label='EVENT CODE'
            type='text'
            name='code'
            value={inputs.code}
            color={alert.code.status}
            helperText={alert.code.content}
            sx={getCustomInputStyles(alert.code)}
            onChange={handleInput}
          />
          <TextField
            required
            className='input-field'
            variant='standard'
            label='EMAIL'
            type='text'
            name='email'
            value={inputs.email}
            color={alert.email.status}
            helperText={alert.email.content}
            sx={getCustomInputStyles(alert.email)}
            onChange={handleInput}
          />
          <TextField
            className='input-field'
            variant='standard'
            label='NAME'
            type='text'
            name='name'
            value={inputs.name}
            sx={getCustomInputStyles()}
            onChange={handleInput}
          />
        </DialogContent>

        <DialogActions>
          <button onClick={handleJoin}>JOIN</button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
