import { Box, Popover } from '@mui/material'
import { memo, useState } from 'react'

function Cell({ active, colIndex, rowIndex }) {
  // const [anchorEl, setAnchorEl] = useState(null)

  // const handlePopoverOpen = (event) => {
  //   setAnchorEl(event.currentTarget)
  // }

  // const handlePopoverClose = () => {
  //   setAnchorEl(null)
  // }

  // const id = `${colIndex}${rowIndex}`

  // const open = Boolean(anchorEl)

  return <Box className={'block' + (active === 1 ? '--active' : '')} />

  // return (
  //   <>
  //     <Box aria-owns={open ? id : undefined} aria-haspopup='true' onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose} className={'block' + (active === 1 ? '--active' : '')} />
  //     <Popover
  //       id={id}
  //       sx={{
  //         pointerEvents: 'none',
  //       }}
  //       open={open}
  //       anchorEl={anchorEl}
  //       anchorOrigin={{
  //         vertical: 'bottom',
  //         horizontal: 'left',
  //       }}
  //       transformOrigin={{
  //         vertical: 'top',
  //         horizontal: 'left',
  //       }}
  //       onClose={handlePopoverClose}
  //       disableRestoreFocus
  //     >
  //       {`${colIndex}/${rowIndex}`}
  //     </Popover>
  //   </>
  // )
}

function Gui({ pGame }) {
  return (
    <div style={{ width: '100%' }}>
      {pGame.map((cRow, rowIndex) => (
        <Box display='flex' flexDirection='row' key={rowIndex}>
          {cRow.map((cell, colIndex) => (
            <Cell key={rowIndex + colIndex + '' + cell} active={cell} rowIndex={rowIndex} colIndex={colIndex} />
          ))}
        </Box>
      ))}
    </div>
  )
}

// export default (Gui, (prevProps, nextProps) => {
export default memo(Gui, (prevProps, nextProps) => prevProps.calc === nextProps.calc)
