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

export const PlayerWithEpisode = styled.div`
  width: 100%;

  .fade-enter {
    opacity: 0;
  }
  .fade-exit {
    opacity: 1;
  }
  .fade-enter-active {
    opacity: 1;
  }
  .fade-exit-active {
    opacity: 0;
  }
  .fade-enter-active,
  .fade-exit-active {
    transition: opacity 500ms;
  }

  .thumbnail-wrapper {
    position: relative;
    width: 100%;
    height: 20rem;
    border-radius: 1.5rem;
    overflow: hidden;
  }

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;

  strong {
    font-family: ${props => props.theme.font.heading};
    font-family: 600;
    font-size: 1.25rem;
    margin-top: 2rem;
  }

  span {
    margin-top: 1rem;
    font-size: 0.875rem;
    opacity: 0.6;
    line-height: 1.5rem;
  }
`

interface IFooterProps {
  isEmpty: boolean
}

export const PlayerFooter = styled.footer<IFooterProps>`
  align-self: stretch;

  ${props => props.isEmpty && `opacity: 0.5`}
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
  isActive?: boolean
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
  transition: all 0.2s ease;

  position: relative;

  svg {
    color: ${props =>
      props.isActive ? props.theme.colors.green500 : props.theme.colors.white};
  }

  ${props =>
    props.isActive &&
    css`
      &:after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 50%;
        transform: translateX(-50%);
        display: block;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: ${props => props.theme.colors.green500};

        @keyframes appear {
          from {
            transform: translateX(-50%) scale(0);
            opacity: 0;
          }
          to {
            transform: translateX(-50%) scale(1);
            opacity: 1;
          }
        }

        animation: appear 200ms ease forwards;
      }
    `}

  &:disabled {
    cursor: default;
    opacity: 0.5;
  }

  &:hover:not(:disabled) {
    filter: ${props =>
      !props.isActive ? 'brightness(0.8)' : 'brightness(0.95)'};
  }

  ${props =>
    props.isBig &&
    css`
      width: 4rem;
      height: 4rem;
      border-radius: 1rem;
      font-size: 1.75rem;
      background: ${props => props.theme.colors.purple400};

      &:hover:not(:disabled) {
        filter: brightness(0.95);
        transform: scale(0.99);
      }
    `}
`
