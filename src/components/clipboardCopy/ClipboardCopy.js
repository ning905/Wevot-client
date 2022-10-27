import { useState } from 'react'
import './clipboardCopy.scss'

export default function ClipboardCopy({ copyText }) {
  const [isCopied, setIsCopied] = useState(false)

  async function copyTextToClipboard(text) {
    return await navigator.clipboard.writeText(text)
  }

  const handleCopyClick = () => {
    copyTextToClipboard(copyText)
      .then(() => {
        setIsCopied(true)
        setTimeout(() => {
          setIsCopied(false)
        }, 1500)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <div className='clipboard'>
      <input type='text' value={copyText} readOnly />
      <button onClick={handleCopyClick}>
        <span>{isCopied ? 'Copied!' : 'Copy'}</span>
      </button>
    </div>
  )
}
