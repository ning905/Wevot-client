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

      <div className='votes-wrap'>pppp</div>
    </div>
  )
}
