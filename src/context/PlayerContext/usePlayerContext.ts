import { useContext } from 'react'
import { PlayerContext } from '.'

const usePlayerContext = () => {
  const ctx = useContext(PlayerContext)

  if (!ctx)
    throw new Error('usePlayerContext must be used within a <PlayerContext />')

  return ctx
}

export default usePlayerContext
