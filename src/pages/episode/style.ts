import styled from 'styled-components'

export const EpisodeWrapper = styled.div`
  max-width: 45rem;
  padding: 3rem 2rem;
  margin: 0 auto;
`

export const ThumbnailContainer = styled.div`
  position: relative;

  img {
    width: 100%;
    height: 15rem;
    object-fit: cover;
    border-radius: 1rem;
  }

  button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    width: 3rem;
    height: 3rem;
    border-radius: 0.75rem;
    border: none;
    transition: all 0.2s ease-in-out;

    svg {
      color: ${({ theme }) => theme.colors.white};
      font-size: 1.2rem;
    }

    &.back {
      left: -1.5rem;
      background: ${({ theme }) => theme.colors.purple500};
    }

    &:not(.back) {
      right: -1.625rem;
      width: 3.25rem;
      height: 3.25rem;

      background: ${({ theme }) => theme.colors.green500};
      box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.1);

      svg {
        font-size: 1.4rem;
      }
    }

    &:hover {
      box-shadow: none;
    }

    display: flex;
    align-items: center;
    justify-content: center;
  }
`

export const HeaderContainer = styled.header`
  padding-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray100};

  h1 {
    margin-top: 2rem;
    margin-bottom: 1.5rem;
  }

  span {
    display: inline-block;
    font-size: 0.875rem;

    & + span {
      margin-left: 0.5rem;
      padding-left: 0.7rem;
      position: relative;

      &::before {
        content: '';
        width: 4px;
        height: 4px;
        background: #ddd;
        border-radius: 50%;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
`

export const DescriptionContainer = styled.div`
  margin-top: 2rem;
  line-height: 1.675rem;
  color: ${({ theme }) => theme.colors.gray800};

  p {
    margin: 1.5rem 0;
  }
`
