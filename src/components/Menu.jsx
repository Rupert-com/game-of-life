import { Box, Button, Typography } from '@mui/material'

function BTN({ children, ...props }) {
  return (
    <Button {...props}>
      <Typography sx={{ minWidth: 100 }}>{children}</Typography>
    </Button>
  )
}

export default function Menu(props) {
  const { setRunning } = props

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
      <BTN onClick={(e) => setRunning(true)}>Start</BTN>
      <BTN onClick={(e) => setRunning(false)}>Stop</BTN>
    </Box>
  )
}
