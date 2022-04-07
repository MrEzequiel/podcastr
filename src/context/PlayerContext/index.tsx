import React, { createContext, useState } from 'react'

export interface IEpisode {
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
  playList: (episodes: IEpisode[], index: number) => void
  playNext: () => void
  playPrev: () => void
  togglePlay: () => void
  setPlayingState: (isPlaying: boolean) => void
  toogleLoop: () => void
  isLooping: boolean
  toggleShuffle: () => void
  isShuffling: boolean
  clearPlayerState: () => void
}

export const PlayerContext = createContext({} as IPlayerContext)

const PlayerContextProvider: React.FC = ({ children }) => {
  const [episodes, setEpisodes] = useState<IEpisode[]>([])
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState<number | null>(
    null
  )
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [isLooping, setIsLooping] = useState<boolean>(false)
  const [isShuffling, setIsShuffling] = useState<boolean>(false)

  const play = (episode: IEpisode) => {
    setEpisodes([episode])
    setCurrentEpisodeIndex(0)
    setIsPlaying(true)
  }

  const playNext = () => {
    if (currentEpisodeIndex === null) return

    if (isShuffling) {
      const nextRandomEpisodeIndex = Math.floor(Math.random() * episodes.length)
      setCurrentEpisodeIndex(nextRandomEpisodeIndex)
      return
    }

    if (currentEpisodeIndex === episodes.length - 1) {
      setCurrentEpisodeIndex(0)
      return
    }
    setCurrentEpisodeIndex(prev => (prev === null ? prev : prev + 1))
  }

  const playPrev = () => {
    if (currentEpisodeIndex === null) return

    if (currentEpisodeIndex === 0) {
      setCurrentEpisodeIndex(episodes.length - 1)
      return
    }
    setCurrentEpisodeIndex(prev => (prev ? prev - 1 : prev))
  }

  const playList = (episodes: IEpisode[], index: number) => {
    setEpisodes(episodes)
    setCurrentEpisodeIndex(index)
    setIsPlaying(true)
  }

  const togglePlay = () => {
    setIsPlaying(prev => !prev)
  }

  const toogleLoop = () => {
    setIsLooping(prev => !prev)
  }

  const toggleShuffle = () => {
    setIsShuffling(prev => !prev)
  }

  const setPlayingState = (isPlaying: boolean) => {
    setIsPlaying(isPlaying)
  }

  const clearPlayerState = () => {
    setEpisodes([])
    setCurrentEpisodeIndex(null)
  }

  return (
    <PlayerContext.Provider
      value={{
        episodes,
        currentEpisodeIndex,
        isPlaying,
        play,
        playList,
        togglePlay,
        setPlayingState,
        playNext,
        playPrev,
        toogleLoop,
        isLooping,
        toggleShuffle,
        isShuffling,
        clearPlayerState,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}

export default PlayerContextProvider
