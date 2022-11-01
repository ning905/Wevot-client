import { Delete, Edit, MoreVert } from '@mui/icons-material'
import { IconButton, Menu, MenuItem } from '@mui/material'
import { useState } from 'react'

const ITEM_HEIGHT = 48

export default function VertDotMenu({ isHost, handleEdit, handleDelete }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const open = Boolean(anchorEl)

  function handleClick(event) {
    setAnchorEl(event.currentTarget)
  }

  function handleClose() {
    setAnchorEl(null)
    setIsDeleting(false)
  }

  return (
    <div className='vert-dot-menu'>
      <IconButton
        aria-label='more'
        id='long-button'
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup='true'
        onClick={handleClick}
      >
        <MoreVert />
      </IconButton>
      <Menu
        id='long-menu'
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '7.5rem',
          },
        }}
      >
        {isHost && (
          <MenuItem
            onClick={() => {
              handleClose()
              handleEdit()
            }}
            className='menu-item'
            style={{ display: 'flex', justifyContent: 'flex-start', gap: '0.5rem' }}
          >
            <Edit fontSize='small' />
            Edit
          </MenuItem>
        )}

        <MenuItem
          onClick={() => setIsDeleting(true)}
          className='menu-item'
          style={{
            display: isDeleting ? 'none' : 'flex',
            justifyContent: 'flex-start',
            gap: '0.5rem',
          }}
        >
          <Delete fontSize='small' />
          Delete
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleClose()
            handleDelete()
          }}
          className='menu-item'
          style={{
            display: isDeleting ? 'flex' : 'none',
            justifyContent: 'flex-start',
            gap: '0.5rem',
            color: '#e15838',
          }}
        >
          <Delete fontSize='small' />
          Confirm
        </MenuItem>
      </Menu>
    </div>
  )
}
