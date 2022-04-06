import React, { createContext, useState } from 'react'

interface IEpisode {
  title: string
  members: string
  thumbnail: string
  duration: number
  url: string
}

interface IPlayerContext {
  episodes: IEpisode[]
  currentEpisodeIndex: number | null
  isPlaying: boolean

  play: (episode: IEpisode) => void
  togglePlay: () => void
  setPlayingState: (isPlaying: boolean) => void
}

export const PlayerContext = createContext({} as IPlayerContext)

const PlayerContextProvider: React.FC = ({ children }) => {
  const [episodes, setEpisodes] = useState<IEpisode[]>([])
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState<number | null>(
    null
  )
  const [isPlaying, setIsPlaying] = useState<boolean>(false)

  const play = (episode: IEpisode) => {
    setEpisodes([episode])
    setCurrentEpisodeIndex(0)
    setIsPlaying(true)
  }

  const togglePlay = () => {
    setIsPlaying(prev => !prev)
  }

  const setPlayingState = (isPlaying: boolean) => {
    setIsPlaying(isPlaying)
  }

  return (
    <PlayerContext.Provider
      value={{
        episodes,
        currentEpisodeIndex,
        isPlaying,
        play,
        togglePlay,
        setPlayingState,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}

export default PlayerContextProvider
