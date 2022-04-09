import { Fragment, useEffect, useState } from 'react'
import Menu from './Menu.jsx'
import Engine from './Engine.jsx'

export default function App() {
  const [running, setRunning] = useState(true)
  const [height, setHeight] = useState(20)
  const [width, setWidth] = useState(60)
  const [color, setColor] = useState('#fff200')
  const [bgColor, setBgColor] = useState('#ff0000')
  const [speed, setSpeed] = useState(200)

  const engineResetCallback = (event) => {
    setRunning(() => true)
  }

  const engineStopCallback = (event) => {
    event.stopImmediatePropagation()
    setRunning(() => false)
  }
  const engineStartCallback = (event) => {
    event.stopImmediatePropagation()
    setRunning(() => true)
  }

  document.addEventListener('resetEngine', engineResetCallback)
  document.addEventListener('stopEngine', engineStopCallback)
  document.addEventListener('startEngine', engineStartCallback)

  const css = `
  body {
    background-color: ${running ? '#c1e1c5' : '#fad0c3'} 
  }
      .block--active {
      background-color: ${color} !important;
      }
      .block,
      .block--active {
      background-color: ${bgColor};
      }
`

  return (
    <Fragment>
      <style>{css}</style>
      <Menu setRunning={setRunning} setHeight={setHeight} setWidth={setWidth} setColor={setColor} setBgColor={setBgColor} setSpeed={setSpeed} height={height} width={width} color={color} bgColor={bgColor} speed={speed} />
      <Engine running={running} gridHeight={height} gridWidth={width} color={color} bgcolor={bgColor} speed={speed} />
    </Fragment>
  )
}
