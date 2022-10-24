export const initAlert = {
  username: { status: '', content: ' ' },
  email: { status: '', content: ' ' },
  password: { status: '', content: ' ' },
  confirmedPassword: { status: '', content: ' ' },
}

export const userValidRegex = {
  username: /^[a-zA-Z0-9]+$/,
  email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  password: /^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/,
  confirmedPassword: /^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/,
}

export const error = {
  emptyField: { status: 'error', content: 'This field cannot be empty' },
  invalid: (fieldName) => {
    return { status: 'error', content: `Invalid ${fieldName}` }
  },
  usernameRequire: { status: 'error', content: '*Username can only contain letters and numbers' },
  passRequire: {
    status: '',
    content:
      '*Password must have a minimum of 8 characters and contain at least one upper case letter, one lower case letter, one number, and one special character',
  },
  diffPass: { status: 'error', content: 'Confirmed password must be the same as the password' },
}

export function filedHasContent(fieldKey, filedValue, alert, setAlert) {
  console.log('checking: ', fieldKey)
  if (!filedValue) {
    setAlert({ ...alert, [fieldKey]: error.emptyField })
    return false
  }
  return true
}

export function areAllFieldsValid(initInputs, inputs, alert, setAlert) {
  const inputKeys = Object.keys(initInputs)
  for (let i = 0; i < inputKeys.length; i++) {
    const key = inputKeys[i]

    if (!inputs[key]) {
      setAlert({ ...alert, [key]: error.emptyField })
      return false
    }

    if (key === 'password' || key === 'confirmedPassword') {
      if (inputs[key].match(userValidRegex[key])) {
        setAlert({ ...alert, [key]: error.invalid(key) })
        return false
      }
    } else if (!inputs[key].match(userValidRegex[key])) {
      setAlert({ ...alert, [key]: error.invalid(key) })
      return false
    }
  }

  const findError = Object.values(alert).find((alert) => alert.status === 'error')
  if (findError) {
    return false
  }
  return true
}
