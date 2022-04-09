import { Box, Button, Slider, Typography, Grid } from '@mui/material'
import { SketchPicker as ColorPickTool } from 'react-color'

function BTN({ children, ...props }) {
  return (
    <Button {...props}>
      <Typography sx={{ minWidth: 100 }}>{children}</Typography>
    </Button>
  )
}

export default function Menu(props) {
  const { setRunning, setHeight, setWidth, setColor, setBgColor, setSpeed, speed, color, bgColor, height, width } = props
  const resetEngine = new Event('resetEngine', { bubbles: true })
  const stopEngine = new Event('stopEngine', { bubbles: true })
  const startEngine = new Event('startEngine', { bubbles: true })

  return (
    <Grid container spacing={2} display='flex' alignItems='center' p={2}>
      <Grid item>
        <Button href="https://www.google.com/search?q=conway+game+of+life" rel="noopener nofollow">Googles Version</Button>
        </Grid>
      <Grid item>
        <BTN onClick={(e) => document.dispatchEvent(startEngine)}>Start</BTN>
      </Grid>
      <Grid item>
        <BTN onClick={(e) => document.dispatchEvent(stopEngine)}>Stop</BTN>
      </Grid>
      <Grid item>
        <BTN onClick={(e) => document.dispatchEvent(resetEngine)}>Reset</BTN>
      </Grid>
      <Grid item xs>
        <Grid container spacing={2} flexDirection='column' sx={{ mt: '2rem' }}>
          <Grid item xs>
            <Typography>Width: {width}</Typography>
            <Slider
              onChangeCommitted={() => document.dispatchEvent(startEngine)}
              onChange={({ target }) => {
                document.dispatchEvent(stopEngine)
                setWidth(target.value)
              }}
              aria-label='Width'
              defaultValue={width}
              getAriaValueText={(it) => it}
              valueLabelDisplay='auto'
              step={1}
              min={20}
              max={150}
            />
          </Grid>
          <Grid item xs>
            <Typography>Height: {height}</Typography>

            <Slider
              onChangeCommitted={() => document.dispatchEvent(startEngine)}
              onChange={({ target }) => {
                document.dispatchEvent(stopEngine)
                setHeight(target.value)
              }}
              aria-label='Height'
              defaultValue={height}
              getAriaValueText={(it) => it}
              valueLabelDisplay='auto'
              step={1}
              min={20}
              max={100}
            />
          </Grid>
          <Grid item xsF>
            <Typography>
              Speed: {speed} ({Math.round(100000 / speed) / 100}FPS)
            </Typography>
            <Slider
              onChangeCommitted={() => document.dispatchEvent(startEngine)}
              onChange={({ target }) => {
                document.dispatchEvent(stopEngine)
                setSpeed(target.value)
              }}
              aria-label='Speed'
              defaultValue={speed}
              getAriaValueText={(it) => `${1000 / it} FPS`}
              valueLabelDisplay='auto'
              step={5}
              min={0}
              max={2000}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs>
        <Typography>Color</Typography>
        <ColorPickTool onChange={({ hex }) => setColor(hex)} color={color} />
      </Grid>

      <Grid item xs>
        <Typography>Background-Color</Typography>
        <ColorPickTool onChange={({ hex }) => setBgColor(hex)} color={bgColor} />
      </Grid>
    </Grid>
  )
}
