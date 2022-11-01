import Navbar from '../../components/navbar/Navbar'
import { TextField, Box } from '@mui/material'
import './createEvent.scss'
import { useEffect, useState } from 'react'
import client from '../../utils/client'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import SlotPicker from '../../components/slotPicker/SlotPicker'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { ArrowBackIosOutlined } from '@mui/icons-material'

const initInputs = {
  title: '',
  description: '',
  posterUrl: '',
  deadline: null,
}

const initAlert = {
  title: { status: '' },
  deadline: { status: '' },
  slots: { status: '' },
}

const initSlot = { startTime: null, endTime: null, location: '' }

export default function CreateEvent() {
  const [pageAction, setPageAction] = useState('Host')
  const [inputs, setInputs] = useState(initInputs)
  const [slots, setSlots] = useState([initSlot])
  const [alert, setAlert] = useState(initAlert)
  const [needsDesc, setNeedsDesc] = useState(false)
  const [needsPoster, setNeedsPoster] = useState(false)
  const [failErr, setFailErr] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const params = useParams()

  useEffect(() => {
    if (location.pathname.includes('/events/edit')) {
      setPageAction('Edit')

      client
        .get(`/events/${params.id}`)
        .then((res) => {
          const event = res.data.data.event

          if (event.description) {
            setNeedsDesc(true)
          }
          if (event.posterUrl) {
            setNeedsPoster(true)
          }

          setInputs({
            title: event.title,
            description: event.description,
            posterUrl: event.posterUrl,
            deadline: event.invitation.expiresAt,
          })
          setSlots(event.slots)
        })
        .catch((res) => {
          console.error(res)
        })
    }
  }, [location, params])

  useEffect(() => {
    setAlert((a) => ({ ...a, slots: initAlert.slots }))
    setFailErr('')
  }, [slots])

  function handleInput(e) {
    const { name, value } = e.target
    setAlert({ ...alert, [name]: initAlert[name] })
    setFailErr('')
    setInputs({ ...inputs, [name]: value })
  }

  function getErrorStyle(target) {
    if (alert[target].status === 'error') {
      return { color: '#e15838' }
    }
  }

  function checkValidFields() {
    if (!inputs.title) {
      setAlert({ ...alert, title: { status: 'error' } })
      setFailErr('An event must have a title')
      return false
    }

    if (!inputs.deadline) {
      setAlert({ ...alert, deadline: { status: 'error' } })
      setFailErr('An event must have a voting deadline')
      return false
    }

    if (slots.length === 1 && !slots[0].startTime && !slots[0].endTime) {
      setAlert({ ...alert, slots: { status: 'error' } })

      setFailErr('An event must have at least one slot')
      return false
    }
    return true
  }

  function handleCreateEvent(e) {
    e.preventDefault()

    if (checkValidFields()) {
      if (pageAction === 'Host') {
        client
          .post('/events', { ...inputs, slots })
          .then((res) => {
            navigate(`/events/${res.data.data.id}`)
          })
          .catch((res) => {
            const message = res.response.data.message
            if (res.response.data.message.includes('title')) {
              setAlert({ title: { status: 'error' } })
            }
            setFailErr(message)
          })
      } else if (pageAction === 'Edit') {
        client
          .patch(`/events/${params.id}`, { ...inputs, slots })
          .then((res) => {
            navigate(`/events/${res.data.data.id}`)
          })
          .catch((res) => {
            const message = res.response.data.message
            if (res.response.data.message.includes('title')) {
              setAlert({ title: { status: 'error' } })
            }
            setFailErr(message)
          })
      }
    }
  }

  function handleCancel() {
    if (location.pathname.includes('/events/edit') && location.state?.prePage === 'event') {
      navigate(`/events/${params.id}`)
    } else {
      navigate('/dashboard')
    }
  }

  return (
    <div className='create-event'>
      <Navbar page='init' />

      <div className='go-back-wrap' onClick={() => navigate('/dashboard')}>
        <p className='go-back'>
          <ArrowBackIosOutlined className='icon' />
          Back to dashboard
        </p>
      </div>

      <main>
        <div className='container'>
          <h2>{pageAction} a New Event</h2>
          <Box
            className='box'
            component='form'
            autoComplete='off'
            onSubmit={handleCreateEvent}
            noValidate
          >
            <div className='input-wrap'>
              <p className='left' style={getErrorStyle('title')}>
                Title *:{' '}
              </p>
              <TextField
                required
                className='input-field right'
                variant='outlined'
                type='text'
                name='title'
                placeholder='My Event'
                value={inputs.title}
                color={alert.title.status}
                focused={alert.title.status === 'error'}
                onChange={handleInput}
              />
            </div>

            {needsDesc ? (
              <div className='input-wrap'>
                <p className='left'>Description: </p>
                <TextField
                  className='input-field right'
                  variant='outlined'
                  type='text'
                  placeholder='Add event description'
                  name='description'
                  value={inputs.description}
                  onChange={handleInput}
                />
              </div>
            ) : (
              <p className='click-to-add' onClick={() => setNeedsDesc(true)}>
                + Add description
              </p>
            )}

            {needsPoster ? (
              <div className='input-wrap'>
                <p className='left'>Poster URL: </p>
                <TextField
                  className='input-field right'
                  variant='outlined'
                  placeholder='Add poster URL'
                  type='text'
                  name='posterUrl'
                  value={inputs.posterUrl}
                  onChange={handleInput}
                />
              </div>
            ) : (
              <p className='click-to-add' onClick={() => setNeedsPoster(true)}>
                + Add poster url
              </p>
            )}

            <div className='input-wrap time-picker'>
              <p className='left' style={getErrorStyle('deadline')}>
                Voting deadline *:{' '}
              </p>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  className='right'
                  disablePast
                  renderInput={(props) => <TextField {...props} />}
                  name='startTime'
                  value={inputs.deadline}
                  onChange={(newValue) => {
                    setAlert({ ...alert, deadline: initAlert.deadline })
                    setFailErr('')
                    setInputs({ ...inputs, deadline: dayjs(newValue).toJSON() })
                  }}
                />
              </LocalizationProvider>
            </div>

            <div className='input-wrap slots-wrap'>
              <p className='left' style={getErrorStyle('slots')}>
                Slots *:{' '}
              </p>
              <ul className='right'>
                {slots.map((slot, index) => (
                  <li key={index} className='slot-wrap'>
                    <SlotPicker
                      index={index}
                      slot={slot}
                      slots={slots}
                      setSlots={setSlots}
                      deadline={inputs.deadline}
                    />
                  </li>
                ))}
              </ul>
            </div>

            <p className='click-to-add' onClick={() => setSlots([...slots, initSlot])}>
              + Add slot
            </p>

            {failErr && <p id='fail-alert'>Failed: {failErr}</p>}
            <div className='btn-wrap'>
              <button className='submit-btn' type='submit'>
                {pageAction.toUpperCase()}
              </button>
              <button className='cancel-btn' onClick={handleCancel}>
                CANCEL
              </button>
            </div>
          </Box>
        </div>
      </main>
    </div>
  )
}
