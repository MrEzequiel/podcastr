import styled from 'styled-components'

export const LoadingChangePage = styled.div<{
  isLoading: boolean
}>`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 50px;
  width: 50px;
  overflow: hidden;
  border-radius: 0.5rem;
  background-color: ${props => props.theme.colors.white};
  border: 3px solid ${props => props.theme.colors.gray200};
  box-shadow: 0 0 14px 3px rgba(0, 0, 0, 0.1);

  position: fixed;
  bottom: 50px;
  left: 50px;

  @keyframes loading {
    to {
      transform: rotate(360deg);
    }
    from {
      transform: rotate(0deg);
    }
  }

  & > div {
    position: relative;
    width: 30px;
    height: 30px;
  }

  --speed: 500ms;

  &.loading-enter {
    opacity: 0;
    transform: scale(0.9);
  }
  &.loading-enter-active {
    opacity: initial;
    transform: scale(1);
    transition: opacity var(--speed), transform var(--speed);
    transition-timing-function: ease-in-out;
  }

  // exit animation
  &.loading-exit {
    opacity: 1;
  }
  &.loading-exit-active {
    opacity: 0;
    transform: scale(0.9);
    transition: opacity var(--speed), transform var(--speed);
    transition-timing-function: ease-in-out;
  }

  animation: ${props =>
    props.isLoading ? 'loading 1.8s infinite ease-in-out' : 'none'};
`
