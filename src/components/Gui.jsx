import { Box, Popover } from '@mui/material'
import { memo, useState } from 'react'

function Cell({ active, colIndex, rowIndex, showPopover }) {
  const [anchorEl, setAnchorEl] = useState(undefined)

  if (!showPopover) return <Box className={'block' + (active === 1 ? '--active' : '')} />

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(undefined)
  }

  const onClick = () => {
    document.dispatchEvent(new CustomEvent('updateCell', { bubbles: true, detail: { colIndex, rowIndex, updateTo: active ? 0 : 1 } }))
  }

  const id = `${colIndex}${rowIndex}`

  const open = Boolean(anchorEl)
  return (
    <>
      <Box aria-owns={open ? id : undefined} aria-haspopup='true' onClick={onClick} onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose} className={'block' + (active === 1 ? '--active' : '')} />
      <Popover
        id={id}
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        {`${colIndex}/${rowIndex}`}
      </Popover>
    </>
  )
}

function Gui({ pGame, calc, lastRound }) {
  return (
    <div style={{ width: '100%' }}>
      {pGame.map((cRow, rowIndex) => (
        <Box display='flex' flexDirection='row' key={rowIndex}>
          {cRow.map((cell, colIndex) => (
            <Cell key={rowIndex + colIndex + '' + cell} active={cell} rowIndex={rowIndex} colIndex={colIndex} showPopover={lastRound} />
          ))}
        </Box>
      ))}
    </div>
  )
}

// true kein rerender
// false rerender
export default memo(Gui, (prevProps, nextProps) => {
  if (nextProps.lastRound !== prevProps.lastRound) return false
  const cRVal = prevProps.calc === nextProps.calc
  return cRVal
})
