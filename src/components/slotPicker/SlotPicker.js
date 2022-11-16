import './slotPicker.scss'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { TextField } from '@mui/material'
import { useEffect, useState } from 'react'

export default function SlotPicker({ index, slot, slots, setSlots, deadline }) {
  const [needsLocation, setNeedsLocation] = useState(false)
  const [slotInputs, setSlotInputs] = useState({})
  const slotBeforeEdit = slot

  useEffect(() => {
    setSlotInputs({ startTime: slot.startTime, endTime: slot.endTime, location: slot.location })

    if (slot.location) {
      setNeedsLocation(true)
    }
  }, [slot])

  useEffect(() => {
    if (slots) {
      if (
        slotInputs.startTime === slotBeforeEdit.startTime &&
        slotInputs.endTime === slotBeforeEdit.endTime &&
        slotInputs.location === slotBeforeEdit.location
      ) {
        setSlots((pre) =>
          pre.map((s, i) => {
            if (i === index) return slotBeforeEdit
            return s
          })
        )
      } else if (slotInputs.startTime && slotInputs.endTime) {
        setSlots((pre) =>
          pre.map((s, i) => {
            if (i === index) return slotInputs
            return s
          })
        )
      }
    }
    // eslint-disable-next-line
  }, [index, slotInputs])

  return (
    <div className='slot-picker'>
      <LocalizationProvider dateAdapter={AdapterDayjs} className='time-picker left'>
        <DateTimePicker
          disablePast
          minDateTime={dayjs(deadline)}
          renderInput={(props) => <TextField {...props} />}
          label='Start Time'
          name='startTime'
          value={slotInputs.startTime}
          onChange={(newValue) =>
            setSlotInputs({ ...slotInputs, startTime: dayjs(newValue).toJSON() })
          }
        />
      </LocalizationProvider>

      <p>to</p>

      <LocalizationProvider dateAdapter={AdapterDayjs} className='time-picker right'>
        <DateTimePicker
          disablePast
          minDateTime={dayjs(slotInputs.startTime)}
          renderInput={(props) => <TextField {...props} />}
          label='End Time'
          name='endTime'
          value={slotInputs.endTime}
          onChange={(newValue) =>
            setSlotInputs({ ...slotInputs, endTime: dayjs(newValue).toJSON() })
          }
        />
      </LocalizationProvider>

      {needsLocation ? (
        <TextField
          className='location-input'
          variant='outlined'
          label='LOCATION'
          placeholder='Add location'
          type='text'
          name='location'
          value={slotInputs.location}
          onChange={(e) => setSlotInputs({ ...slotInputs, location: e.target.value })}
        />
      ) : (
        <p className='click-to-add' onClick={() => setNeedsLocation(true)}>
          + Add location
        </p>
      )}
    </div>
  )
}
