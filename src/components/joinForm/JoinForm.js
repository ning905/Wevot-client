import './joinForm.scss'
import { Dialog, DialogActions, DialogContent, TextField } from '@mui/material'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getCustomInputStyles } from '../../utils/muiCustomTheme'
import { useContext, useEffect, useState } from 'react'
import { areAllFieldsValid, error } from '../../utils/validRegex'
import client from '../../utils/client'
import { UserContext } from '../../context/UserContext'

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
  const { currentUser } = useContext(UserContext)
  const [inputs, setInputs] = useState(initInputs)
  const [alert, setAlert] = useState(initInputAlert)
  const [joinAnother, setJoinAnother] = useState(false)
  const [resErr, setResErr] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const param = useParams()
  const visitViaLink = location.pathname.includes('/participate')

  useEffect(() => {
    setJoinAnother(false)

    if (currentUser) {
      setInputs((inputs) => ({ ...inputs, email: currentUser.email }))
    }
    if (visitViaLink) {
      setInputs((inputs) => ({ ...inputs, code: param.code }))
    }
  }, [currentUser, param.code, visitViaLink])

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

  function handleJoinAnother() {
    setJoinAnother(true)
    setInputs({ ...inputs, code: '' })
  }

  function handleJoin() {
    if (areAllFieldsValid(initInputs, inputs, alert, setAlert)) {
      if (visitViaLink) {
        navigate(`/events/participate/${inputs.code}`, { state: { userInfo: inputs } })
        handleClose()
      } else {
        client
          .get(`/events/participate/${inputs.code}`)
          .then((res) => {
            if (res.data.status === 'success') {
              navigate(`/events/participate/${inputs.code}`, { state: { userInfo: inputs } })
            }
          })
          .catch((res) => {
            setResErr(res.response.data.message)
          })
      }
    }
  }

  return (
    <Dialog open={open} onClose={handleClose} className='join-form-dialog'>
      <div className='text-wrap'>
        <h2>Please provide your details</h2>
        {resErr && <p className='error'>Failed: {resErr}</p>}
      </div>

      <DialogContent className='inputs-wrap'>
        {(!visitViaLink || joinAnother) && (
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
        )}
        {!currentUser && (
          <>
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
          </>
        )}
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

      <DialogActions className='btn-wrap'>
        <button onClick={handleJoin} className='join-btn'>
          JOIN
        </button>
        {visitViaLink && (
          <button onClick={handleJoinAnother} className='join-another-btn'>
            JOIN Another
          </button>
        )}
      </DialogActions>
    </Dialog>
  )
}
