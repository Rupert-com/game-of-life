import { Fragment, useEffect, useState } from 'react'
import Menu from './Menu.jsx'
import Engine from './Engine.jsx'

export default function App() {
  const [running, setRunning] = useState(true)
  const [height, setHeight] = useState(20)
  const [width, setWidth] = useState(20)
  const [color, setColor] = useState('#aaaaaa')
  const [bgcolor, setBgColor] = useState('#ffffff')
  const [speed, setSpeed] = useState(1000)
  const [calcTime, setCalcTime] = useState()


  return (
    <Fragment>
      <Menu setRunning={setRunning} setHeight={setHeight} setWidth={setWidth} setColor={setColor} setBgColor={setBgColor} setSpeed={setSpeed} />
      <Engine running={running} gridHeight={height} gridWidth={width} color={color} bgcolor={bgcolor} speed={speed}/>
    </Fragment>
  )
}
