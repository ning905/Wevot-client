import { Dialog, DialogContent } from '@mui/material'
import './slotParList.scss'

export default function SlotParList({ open, setOpen, pars, getAvatar }) {
  function handleClose() {
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      className='slot-par-list-dialog'
      PaperProps={{
        sx: {
          borderRadius: '25px',
          boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.25)',
        },
      }}
    >
      <div className='title-wrap'>
        <h3>
          {pars.length} {pars.length === 1 ? 'person' : 'people'} have voted
        </h3>
      </div>
      <DialogContent className='par-list-wrap' sx={{ padding: 0 }}>
        <ul className='par-list'>
          {pars.map((par, i) => (
            <li className='par-list-item' key={i}>
              <div className='par-info-wrap'>
                <img className='par-avatar' alt={par.email} src={getAvatar(par.name, par.email)} />
                <div className='text-wrap'>
                  {par.name && <p className='par-name'>{par.name}</p>}
                  <p className='par-email'>{par.email}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  )
}
