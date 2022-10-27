import './avatarForm.scss'
import { Dialog, DialogActions, DialogContent, TextField } from '@mui/material'
import { useContext, useState } from 'react'
import { getCustomInputStyles } from '../../utils/muiCustomTheme'
import { error } from '../../utils/validRegex'
import client from '../../utils/client'
import { UserContext } from '../../context/UserContext'

const initInputAlert = { status: '', content: ' ' }

export default function AvatarForm({ open, setOpen }) {
  const [url, setUrl] = useState('')
  const [alert, setAlert] = useState(initInputAlert)
  const [resErr, setResErr] = useState('')
  const { currentUser, userAction } = useContext(UserContext)

  function handleClose() {
    setOpen(false)
    setUrl('')
    setAlert(initInputAlert)
    setResErr('')
  }

  function handleInput(e) {
    setAlert(initInputAlert)
    setUrl(e.target.value)
  }

  function handleChangeAvatar() {
    if (!url) {
      setAlert(error.emptyField)
    } else {
      client
        .patch(`/users/${currentUser.id}`, { profileImgUrl: url })
        .then((res) => {
          userAction({ type: 'UPDATE', payload: res.data.data })
          handleClose()
        })
        .catch((res) => {
          setResErr(res.response.data.message)
        })
    }
  }

  return (
    <Dialog open={open} onClose={handleClose} className='avatar-form-dialog'>
      <div className='text-wrap'>
        <h2>Please provide your new img url</h2>
        {resErr && <p className='error'>Failed: {resErr}</p>}
      </div>
      <DialogContent className='input-wrap'>
        <TextField
          className='input-field'
          variant='standard'
          label='IMAGE URL'
          type='text'
          name='url'
          value={url}
          color={alert.status}
          helperText={alert.content}
          sx={getCustomInputStyles(alert)}
          onChange={handleInput}
        />
      </DialogContent>

      <DialogActions className='btn-wrap'>
        <button onClick={handleChangeAvatar}>UPDATE</button>
      </DialogActions>
    </Dialog>
  )
}
