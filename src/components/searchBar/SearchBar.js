import { FormControl, InputAdornment, OutlinedInput } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import './searchBar.scss'

export default function SearchBar({ query, setQuery }) {
  function handleInput(e) {
    setQuery(e.target.value)
  }

  return (
    <>
      <FormControl
        sx={{
          height: '3.25rem',
          width: '60%',
          backgroundColor: 'rgba(255, 255, 255, 0.4)',
          borderRadius: '15px',
        }}
        variant='outlined'
      >
        <OutlinedInput
          id='outlined-adornment-search-bar'
          type='text'
          placeholder='Search'
          sx={{ borderRadius: '15px', height: '3.25rem' }}
          value={query}
          onChange={handleInput}
          startAdornment={
            <InputAdornment position='start'>
              <SearchIcon />
            </InputAdornment>
          }
        />
      </FormControl>
    </>
  )
}
