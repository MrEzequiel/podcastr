import styled, { css } from 'styled-components'

export const PlayerContainer = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  height: 100vh;
  width: 26.5rem;
  padding: 3rem 4rem;

  background: ${props => props.theme.colors.purple500};
  color: ${props => props.theme.colors.white};

  strong {
    font-family: ${props => props.theme.font.heading};
    font-family: 600;
  }
`

export const PlayerHeader = styled.header`
  display: flex;
  align-items: center;
  gap: 1rem;
`

export const PlayerEmpty = styled.div`
  width: 100%;
  height: 20rem;
  padding: 4rem;
  text-align: center;

  border: 1.5px dashed ${props => props.theme.colors.purple300};
  border-radius: 1.5rem;
  background: linear-gradient(
    143.8deg,
    rgba(145, 100, 250, 0.8) 0%,
    rgba(0, 0, 0, 0) 100%
  );

  display: flex;
  align-items: center;
  justify-content: center;
`

interface IFooterProps {
  isPlaying: boolean
}

export const PlayerFooter = styled.footer<IFooterProps>`
  align-self: stretch;

  ${props => !props.isPlaying && `opacity: 0.5`}
`

export const PlayerProgress = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;

  span {
    display: inline-block;
    width: 4rem;
    text-align: center;
  }
`

export const PlayerSlider = styled.div`
  flex: 1;
`

export const PlayerEmptySlider = styled.div`
  width: 100%;
  height: 4px;
  background: ${props => props.theme.colors.purple300};
  border-radius: 2px;
`

export const PlayerActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  gap: 1.5rem;
`

interface IPlayerActionProps {
  isBig?: boolean
}

export const ButtonAction = styled.button<IPlayerActionProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  background: transparent;
  border: 0;
  padding: 0.25rem;

  color: #fff;
  font-size: 1.5rem;

  ${props =>
    props.isBig &&
    css`
      width: 4rem;
      height: 4rem;
      border-radius: 1rem;
      font-size: 1.75rem;
      background: ${props => props.theme.colors.purple400};
    `}
`
