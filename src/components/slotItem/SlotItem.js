import { Avatar, AvatarGroup, Popover } from '@mui/material'
import { useState } from 'react'
import { initVoteAlert } from '../../pages/Event/Event'
import { slotEndFormatTime, slotStartFormatTime } from '../../utils/formatTime'
import SlotParInfo from '../slotParInfo/SlotParInfo'
import SlotParList from '../slotParList/SlotParList'
import './slotItem.scss'

export default function SlotItem({
  slot,
  votedSlots,
  setVotedSlots,
  setAlert,
  isParticipant,
  expired,
}) {
  const [anchorEl, setAnchorEl] = useState(null)
  const [targetPar, setTargetPar] = useState(null)
  const [openParList, setOpenParList] = useState(false)
  const openPop = Boolean(anchorEl)

  let className = 'slot-item'
  const selected = votedSlots.find((s) => s.id === slot.id)
  if (selected) {
    className += ' selected'
  }
  if (!isParticipant && !expired) {
    className += ' selectable'
  }

  function getAvatar(name, email) {
    const base = 'http://ui-avatars.com/api/?bold=true&background=CACACA&color=fff&name='

    if (name) {
      return base + name[0]
    }

    return base + email[0]
  }

  function handleSelect() {
    setAlert(initVoteAlert)

    if (!isParticipant) {
      if (selected) {
        const arr = votedSlots.filter((s) => s.id !== slot.id)
        setVotedSlots(arr)
      } else {
        setVotedSlots([...votedSlots, slot])
      }
    }
  }

  function handlePopoverOpen(event, par) {
    setAnchorEl(event.currentTarget)
    setTargetPar(par)
  }

  function handlePopoverClose() {
    setAnchorEl(null)
  }

  function handleClickOpenParList() {
    setOpenParList(true)
  }

  return (
    <div className={className} onClick={!isParticipant && !expired ? handleSelect : undefined}>
      <div className='time-wrap'>
        {slotStartFormatTime(slot.startTime)} - {slotEndFormatTime(slot.startTime, slot.endTime)}
      </div>

      <div className='location-wrap'>{slot.location}</div>

      <div className='votes-wrap'>
        <AvatarGroup max={4} sx={{ width: 'fit-content' }} onClick={handleClickOpenParList}>
          {slot.participants.map((par, index) => (
            <div key={index}>
              <Avatar
                alt={par.email}
                src={getAvatar(par.name, par.email)}
                aria-owns={openPop ? 'mouse-over-popover' : undefined}
                aria-haspopup='true'
                onMouseEnter={(event) => {
                  handlePopoverOpen(event, par)
                }}
                onMouseLeave={handlePopoverClose}
              />
              <Popover
                id='mouse-over-popover'
                sx={{
                  pointerEvents: 'none',
                }}
                open={openPop}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 75,
                  horizontal: 'left',
                }}
                PaperProps={{
                  sx: {
                    borderRadius: '25px',
                    boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.25)',
                    width: 'fit-content',
                  },
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
              >
                <SlotParInfo par={targetPar} getAvatar={getAvatar} />
              </Popover>
            </div>
          ))}
        </AvatarGroup>
        <SlotParList
          open={openParList}
          setOpen={setOpenParList}
          pars={slot.participants}
          getAvatar={getAvatar}
        />
      </div>
    </div>
  )
}
