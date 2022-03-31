import { Box } from '@mui/material'

function getCell(active) {
  return <div className={'block' + (active === 1 ? '--active' : '')} />
}

export default function Gui({ game,  calc, running }) {
  return (
    <>
      {`calculated ${calc} times`}
      {running && `...running`}
      <Box display='flex'>
        {game.map((cRow) => (
          <Box>{cRow.map((cell) => getCell(cell))}</Box>
        ))}
      </Box>
    </>
  )
}
