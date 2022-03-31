import { Fragment, useEffect, useState } from 'react'
import Menu from './Menu.jsx'
import Engine from './Engine.jsx'

export default function App() {
  const [running, setRunning] = useState(true)

  return (
    <Fragment>
      <Menu setRunning={setRunning} />
      <Engine running={running} />
    </Fragment>
  )
}
