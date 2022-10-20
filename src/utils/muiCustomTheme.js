export function getCustomInputStyles(alert) {
  const customInputStyles = {
    '& .MuiFormLabel-root': {
      fontFamily: 'Outfit',
      color: '#747474',
      fontSize: '18px',
    },
    '& .MuiFormLabel-root.Mui-focused': {
      color: '#6B67AA',
      fontSize: '13px',
      fontWeight: '700',
    },
    '& .MuiFormHelperText-root': {
      fontFamily: 'Outfit',
      fontSize: '13px',
    },
  }

  if (alert.status === 'error') {
    customInputStyles['& .MuiFormLabel-root'].color = '#E15838'
    customInputStyles['& .MuiFormLabel-root.Mui-focused'].color = '#E15838'
    customInputStyles['& .MuiFormHelperText-root'].color = '#E15838'
  }

  return customInputStyles
}
