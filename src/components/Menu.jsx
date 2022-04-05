import { Box, Button, Slider, Typography } from '@mui/material'

function BTN({ children, ...props }) {
  return (
    <Button {...props}>
      <Typography sx={{ minWidth: 100 }}>{children}</Typography>
    </Button>
  )
}

export default function Menu(props) {
  const { setRunning, setHeight, setWidth, setColor, setBgColor, setSpeed } = props

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
      <BTN onClick={(e) => setRunning(true)}>Start</BTN>
      <BTN onClick={(e) => setRunning(false)}>Stop</BTN>
      <Box sx={{ width: 300 }}>
        <Slider onChange={({ target }) => setWidth(target.value)} aria-label='Width' defaultValue={20} getAriaValueText={(it) => it} valueLabelDisplay='auto' step={1} marks min={20} max={100} />
        <Slider onChange={({ target }) => setHeight(target.value)} aria-label='Height' defaultValue={20} getAriaValueText={(it) => it} valueLabelDisplay='auto' step={1} marks min={20} max={100} />
        <Slider onChange={({ target }) => setSpeed(target.value)} aria-label='Speed' defaultValue={1000} getAriaValueText={(it) => `${1000 / it} FPS`} valueLabelDisplay='auto' step={1} marks min={100} max={2000} />
      </Box>
    </Box>
  )
}
