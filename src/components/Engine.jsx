import { useEffect, useState } from 'react'
import Gui from './Gui'

const DIED = 0,
  ACTIVE = 1,
  BORDER = 2,
  initGame = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]

export default function Engine(props) {
  const { running } = props
  const gridHeight = 20
  const gridWidth = 20

  const [game, setGame] = useState(initGame)
  const [calc, setCalc] = useState(0)

  const getNeighbourhood = (rowIndex, colIndex) => {
    let bN
    let cN = colIndex > 0 ? game[rowIndex].slice(colIndex - 1, colIndex + 2) : [2, ...game[rowIndex].slice(colIndex, colIndex + 2)] // wird eh aufgefüllt
    let aN

    if (rowIndex === 0) bN = [2, 2, 2]
    else if (rowIndex >= gridHeight - 1) aN = [2, 2, 2]

    if (!bN) bN = colIndex > 0 ? game[rowIndex - 1].slice(colIndex - 1, colIndex + 2) : [2, ...game[rowIndex - 1].slice(colIndex, colIndex + 2)]
    if (!aN) aN = colIndex > 0 ? game[rowIndex + 1].slice(colIndex - 1, colIndex + 2) : [2, ...game[rowIndex + 1].slice(colIndex, colIndex + 2)]

    if (bN.length < 3)
      if (colIndex > 1) {
        bN = [...bN, 2]
      } else {
        bN = [2, ...bN]
      }

    if (cN.length < 3)
      if (colIndex > 1) {
        cN = [...cN, 2]
      } else {
        cN = [2, ...cN]
      }

    if (aN.length < 3)
      if (colIndex > 1) {
        aN = [...aN, 2]
      } else {
        aN = [2, ...aN]
      }

    return [bN, cN, aN]
  }

  const countNeighbours = (neighbourhood, countIf = [ACTIVE, DIED]) => {
    let count = 0

    neighbourhood.forEach((row) => {
      count += row.filter((it) => it === ACTIVE).map((it) => it).length
    })

    return count
  }

  const processStep = async () =>
    new Promise((res, rej) => {
      const mod = game
      const cGame = game

      const setStatus = (rowIndex, colIndex, status) => {
        mod[rowIndex][colIndex] = status
      }

      cGame.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
          switch (cell) {
            case DIED:
              {
                const cneighbourhood = getNeighbourhood(rowIndex, colIndex)
                const neighboursActive = countNeighbours(cneighbourhood, [ACTIVE])

                if (neighboursActive === 3) {
                  // Rule 4: Reproduction
                  setStatus(rowIndex, colIndex, ACTIVE)
                }
              }

              break

            case BORDER:
              break

            case ACTIVE:
              {
                const cneighbourhood = getNeighbourhood(rowIndex, colIndex)
                const neighboursActiveDied = countNeighbours(cneighbourhood, [ACTIVE])

                if (neighboursActiveDied < 2) {
                  // Rule 1: Any live cell with fewer than two live neighbours dies, as if by underpopulation.
                  setStatus(rowIndex, colIndex, DIED)
                } else if (neighboursActiveDied <= 3) {
                  // Rule 2:
                  // setStatus(rowIndex, colIndex, ACTIVE)
                } else {
                  // Rule 3:
                  setStatus(rowIndex, colIndex, DIED)
                }
              }

              break

            default:
          }
        })
      })
      res(mod)
    })

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log('process')
      processStep().then((v) => {
        setCalc((p) => p + 1)
        setGame(v)
        console.log('end process')
      })
    }, 200)
    return () => {
      console.log('clear')
      clearInterval(intervalId)
    }
  }, [])

  return <Gui game={game} calc={calc} running={running} key={calc} />
}
