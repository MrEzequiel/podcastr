import styled from 'styled-components'

export const HomeWrapper = styled.div`
  padding: 0 4rem;
  padding-bottom: 3rem;

  h2 {
    margin-top: 3rem;
    margin-bottom: 1.5rem;
  }

  ul {
    list-style: none;
  }
`

export const LatestEpisode = styled.section`
  ul {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;

    @media (max-width: 1650px) {
      grid-template-columns: 1fr;
    }

    li {
      background: ${({ theme }) => theme.colors.white};
      border: 1px solid ${({ theme }) => theme.colors.gray100};
      padding: 1.25rem;
      border-radius: 1.5rem;
      position: relative;
      display: flex;
      align-items: center;

      .thumbnail-container {
        position: relative;
        overflow: hidden;
        width: 6rem;
        height: 6rem;
        border-radius: 1rem;
        object-fit: cover;
      }
    }
  }

  button {
    position: absolute;
    right: 2rem;
    bottom: 2rem;

    transition: all 0.2s ease-in-out;

    &.playing {
      transform: scale(1.05);
      box-shadow: 0 0 12px -6px ${({ theme }) => theme.colors.purple300};
      border-color: ${({ theme }) => theme.colors.purple300};
    }

    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      color: ${({ theme }) => theme.colors.purple300};
      font-size: 1.5rem;
    }

    width: 2.5rem;
    height: 2.5rem;
    background: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.gray100};
    border-radius: 0.675rem;
  }
`

export const EpisodeDetails = styled.div`
  flex: 1;
  margin-left: 1rem;

  a {
    display: block;
    color: ${({ theme }) => theme.colors.gray800};
    font-family: ${({ theme }) => theme.font.heading};
    font-weight: 600;
    text-decoration: none;
    line-height: 1.4rem;

    &:hover {
      text-decoration: underline;
      color: ${({ theme }) => theme.colors.purple800};
    }
  }

  p {
    font-size: 0.875rem;
    margin-top: 0.5rem;

    max-width: 70%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  span {
    display: inline-block;
    margin-top: 0.5rem;
    font-size: 0.875rem;

    &:last-child {
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

export const AllEpisodes = styled.section`
  & > div {
    overflow-x: auto;
  }

  table {
    min-width: 700px;
    width: 100%;

    table tbody {
      display: table;
      width: 100%;
    }

    th,
    td {
      padding: 0.75rem 1rem;
      border-bottom: 1px solid ${({ theme }) => theme.colors.gray100};
    }

    th {
      color: ${({ theme }) => theme.colors.gray200};
      text-transform: uppercase;
      font: 500 0.75rem ${({ theme }) => theme.font.heading};
    }

    td {
      font-size: 0.875rem;
      position: relative;

      .thumbnail-container {
        position: relative;
        width: 52px;
        height: 52px;
      }

      a {
        color: ${({ theme }) => theme.colors.gray800};
        font: 600 1rem/1.4rem ${({ theme }) => theme.font.heading};
        text-decoration: none;

        &:hover {
          text-decoration: underline;
          color: ${({ theme }) => theme.colors.purple800};
        }
      }
      button {
        display: flex;
        align-items: center;
        justify-content: center;

        transition: all 0.2s ease-in-out;

        &.playing {
          transform: scale(1.05);
          box-shadow: 0 0 12px -6px ${({ theme }) => theme.colors.purple300};
          border-color: ${({ theme }) => theme.colors.purple300};
        }

        svg {
          color: ${({ theme }) => theme.colors.purple300};
          font-size: 1.25rem;
        }

        width: 2rem;
        height: 2rem;
        background: ${({ theme }) => theme.colors.white};
        border: 1px solid ${({ theme }) => theme.colors.gray100};
        border-radius: 0.5rem;
      }
    }
  }
`
