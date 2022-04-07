import React, { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import {
  ButtonAction,
  PlayerActions,
  PlayerContainer,
  PlayerEmpty,
  PlayerEmptySlider,
  PlayerFooter,
  PlayerHeader,
  PlayerProgress,
  PlayerSlider,
  PlayerWithEpisode,
} from './style'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdPause,
  MdPlayArrow,
  MdRepeat,
  MdShuffle,
} from 'react-icons/md'
import usePlayerContext from '../../context/PlayerContext/usePlayerContext'
import { useTheme } from 'styled-components'
import convertDurationToTimeString, {
  convertTimeStringToNumber,
} from '../../utils/convertDurationToTimeString'

const Player: React.FC = () => {
  const theme = useTheme()
  const {
    episodes,
    currentEpisodeIndex,
    isPlaying,
    togglePlay,
    setPlayingState,
    playNext,
    playPrev,
    isLooping,
    toogleLoop,
    isShuffling,
    toggleShuffle,
    clearPlayerState,
  } = usePlayerContext()

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [progress, setProgress] = useState(0)

  const hasEpisodes = episodes.length > 0 && currentEpisodeIndex !== null

  useEffect(() => {
    if (!audioRef.current) return

    if (hasEpisodes && isPlaying) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying])

  useEffect(() => {
    if (!audioRef.current) return
    audioRef.current.volume = 0.2
  }, [isPlaying])

  const handleSeek = (value: number | number[]) => {
    if (Array.isArray(value)) return

    if (!audioRef.current) return
    audioRef.current.currentTime = value
    setProgress(value)
  }

  const setupProgressListener = () => {
    if (!audioRef.current) return

    audioRef.current.currentTime = 0

    const handleProgress = () => {
      if (!audioRef.current) return
      const currentTime = Math.floor(audioRef.current.currentTime)
      setProgress(currentTime)
    }

    audioRef.current.addEventListener('timeupdate', handleProgress)

    return () => {
      if (!audioRef.current) return
      audioRef.current.removeEventListener('timeupdate', handleProgress)
    }
  }

  const handleEpisodeEnded = () => {
    if (episodes.length === 1) {
      clearPlayerState()
    } else {
      playNext()
    }
  }

  return (
    <>
      {hasEpisodes && (
        <audio
          autoPlay
          loop={isLooping}
          src={episodes[currentEpisodeIndex].url}
          ref={audioRef}
          onPlay={() => {
            setPlayingState(true)
          }}
          onPause={() => {
            setPlayingState(false)
          }}
          onEnded={handleEpisodeEnded}
          onLoadedMetadata={setupProgressListener}
        />
      )}

      <PlayerContainer>
        <PlayerHeader>
          <Image
            src="/playing.svg"
            alt="Tocando agora"
            width={30}
            height={30}
          />
          <strong>Tocando agora</strong>
        </PlayerHeader>

        {episodes.length > 0 && currentEpisodeIndex !== null ? (
          <PlayerWithEpisode>
            <div className="thumbnail-wrapper">
              <Image
                src={episodes[currentEpisodeIndex].thumbnail}
                alt={episodes[currentEpisodeIndex].title}
                layout="fill"
                objectFit="cover"
              />
            </div>

            <strong>{episodes[currentEpisodeIndex].title}</strong>
            <span>{episodes[currentEpisodeIndex].members}</span>
          </PlayerWithEpisode>
        ) : (
          <PlayerEmpty>
            <strong>Selecione um podcast para ouvir</strong>
          </PlayerEmpty>
        )}

        <PlayerFooter isEmpty={!hasEpisodes}>
          <PlayerProgress>
            <span>{convertDurationToTimeString(progress)}</span>

            <PlayerSlider>
              {hasEpisodes ? (
                <Slider
                  value={progress}
                  max={convertTimeStringToNumber(
                    episodes[currentEpisodeIndex].duration.toString()
                  )}
                  onChange={handleSeek}
                  trackStyle={{
                    background: theme.colors.green500,
                  }}
                  railStyle={{
                    background: theme.colors.purple300,
                  }}
                  handleStyle={{
                    borderColor: theme.colors.green500,
                    borderWidth: 4,
                  }}
                />
              ) : (
                <PlayerEmptySlider />
              )}
            </PlayerSlider>

            <span>
              {hasEpisodes
                ? episodes[currentEpisodeIndex].duration
                : '00:00:00'}
            </span>
          </PlayerProgress>

          <PlayerActions>
            <ButtonAction
              type="button"
              disabled={!hasEpisodes || episodes.length === 1}
              isActive={isShuffling}
              onClick={toggleShuffle}
            >
              <MdShuffle />
            </ButtonAction>
            <ButtonAction
              type="button"
              disabled={!hasEpisodes || episodes.length === 1}
              onClick={playPrev}
            >
              <MdKeyboardArrowLeft />
            </ButtonAction>
            <ButtonAction
              type="button"
              isBig
              disabled={!hasEpisodes}
              onClick={togglePlay}
            >
              {isPlaying ? <MdPause /> : <MdPlayArrow />}
            </ButtonAction>
            <ButtonAction
              type="button"
              disabled={!hasEpisodes || episodes.length === 1}
              onClick={playNext}
            >
              <MdKeyboardArrowRight />
            </ButtonAction>
            <ButtonAction
              type="button"
              disabled={!hasEpisodes}
              onClick={toogleLoop}
              isActive={isLooping}
            >
              <MdRepeat />
            </ButtonAction>
          </PlayerActions>
        </PlayerFooter>
      </PlayerContainer>
    </>
  )
}

export default Player
