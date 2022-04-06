import React, { useEffect, useMemo, useRef } from 'react'
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

const Player: React.FC = () => {
  const theme = useTheme()
  const {
    episodes,
    currentEpisodeIndex,
    isPlaying,
    togglePlay,
    setPlayingState,
  } = usePlayerContext()
  const audioRef = useRef<HTMLAudioElement | null>(null)

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
    audioRef.current.volume = 0.1
  }, [])

  return (
    <>
      {hasEpisodes && (
        <audio
          src={episodes[currentEpisodeIndex].url}
          ref={audioRef}
          onPlay={() => {
            setPlayingState(true)
          }}
          onPause={() => {
            setPlayingState(false)
          }}
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
            <span>00:00</span>

            <PlayerSlider>
              {hasEpisodes ? (
                <Slider
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

            <span>00:00</span>
          </PlayerProgress>

          <PlayerActions>
            <ButtonAction type="button" disabled={!hasEpisodes}>
              <MdShuffle />
            </ButtonAction>
            <ButtonAction type="button" disabled={!hasEpisodes}>
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
            <ButtonAction type="button" disabled={!hasEpisodes}>
              <MdKeyboardArrowRight />
            </ButtonAction>
            <ButtonAction type="button" disabled={!hasEpisodes}>
              <MdRepeat />
            </ButtonAction>
          </PlayerActions>
        </PlayerFooter>
      </PlayerContainer>
    </>
  )
}

export default Player
