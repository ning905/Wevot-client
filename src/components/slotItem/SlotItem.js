import { Avatar, AvatarGroup } from '@mui/material'
import { initVoteAlert } from '../../pages/Event/Event'
import { slotEndFormatTime, slotStartFormatTime } from '../../utils/formatTime'
import './slotItem.scss'

export default function SlotItem({ slot, votedSlots, setVotedSlots, setAlert, isParticipant }) {
  let className = 'slot-item'
  const selected = votedSlots.find((s) => s.id === slot.id)
  if (selected) {
    className += ' selected'
  }
  if (!isParticipant) {
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

  return (
    <div className={className} onClick={handleSelect}>
      <div className='time-wrap'>
        {slotStartFormatTime(slot.startTime)} - {slotEndFormatTime(slot.startTime, slot.endTime)}
      </div>

      <div className='votes-wrap'>
        <AvatarGroup max={4}>
          {slot.participants.map((par, index) => (
            <Avatar key={index} alt={par.email} src={getAvatar(par.name, par.email)} />
          ))}
        </AvatarGroup>
      </div>
    </div>
  )
}
