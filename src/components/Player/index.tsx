import Image from 'next/image'
import React from 'react'
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
} from './style'

import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdPlayArrow,
  MdRepeat,
  MdShuffle,
} from 'react-icons/md'

const Player: React.FC = () => {
  return (
    <PlayerContainer>
      <PlayerHeader>
        <Image src="/playing.svg" alt="Tocando agora" width={30} height={30} />
        <strong>Tocando agora</strong>
      </PlayerHeader>

      <PlayerEmpty>
        <strong>Selecione um podcast para ouvir</strong>
      </PlayerEmpty>

      <PlayerFooter isPlaying={false}>
        <PlayerProgress>
          <span>00:00</span>

          <PlayerSlider>
            <PlayerEmptySlider />
          </PlayerSlider>

          <span>00:00</span>
        </PlayerProgress>

        <PlayerActions>
          <ButtonAction type="button">
            <MdShuffle />
          </ButtonAction>
          <ButtonAction type="button">
            <MdKeyboardArrowLeft />
          </ButtonAction>
          <ButtonAction type="button" isBig>
            <MdPlayArrow />
          </ButtonAction>
          <ButtonAction type="button">
            <MdKeyboardArrowRight />
          </ButtonAction>
          <ButtonAction type="button">
            <MdRepeat />
          </ButtonAction>
        </PlayerActions>
      </PlayerFooter>
    </PlayerContainer>
  )
}

export default Player
