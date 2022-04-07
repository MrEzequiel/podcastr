import type { NextPage, GetStaticProps } from 'next'

import IEpisode from '../interface/IEpisode'
import {
  AllEpisodes,
  EpisodeDetails,
  HomeWrapper,
  LatestEpisode,
} from '../styles/HomeStyle'

import { MdPause, MdPlayArrow } from 'react-icons/md'
import Link from 'next/link'
import loadEpisodes from '../lib/loadEpisodes'
import usePlayerContext from '../context/PlayerContext/usePlayerContext'
import Image from 'next/image'
import { formatArrayEpisodeFromPlayer } from '../helpers/formatFromPlayer'

export const getStaticProps: GetStaticProps = async () => {
  const episodes = await loadEpisodes({
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc',
    },
  })

  const latestEpisodes = episodes.slice(0, 2)
  const allEpisodes = episodes.slice(2, episodes.length)

  return {
    props: {
      latestEpisodes,
      allEpisodes,
    },
    revalidate: 60 * 60 * 8, // 8 hours
  }
}

interface IProps {
  latestEpisodes: IEpisode[]
  allEpisodes: IEpisode[]
}

const Home: NextPage<IProps> = ({ latestEpisodes, allEpisodes }) => {
  const {
    play,
    playList,
    isPlaying,
    currentEpisodeIndex,
    episodes,
    setPlayingState,
  } = usePlayerContext()
  const episodeList = [
    ...formatArrayEpisodeFromPlayer(latestEpisodes),
    ...formatArrayEpisodeFromPlayer(allEpisodes),
  ]

  const verifyThisEpisodeIsPlaying = (thisEpisode: IEpisode) => {
    return (
      isPlaying &&
      currentEpisodeIndex !== null &&
      episodes[currentEpisodeIndex].url === thisEpisode.file.url
    )
  }

  return (
    <HomeWrapper>
      <LatestEpisode>
        <h2>Últimos lançamentos</h2>

        <ul>
          {latestEpisodes.map((episode, index) => (
            <li key={episode.id}>
              <div className="thumbnail-container">
                <Image
                  layout="fill"
                  objectFit="cover"
                  src={episode.thumbnail}
                  alt={episode.title}
                />
              </div>

              <EpisodeDetails>
                <Link href={`/episode/${episode.id}`}>{episode.title}</Link>
                <p>{episode.members}</p>
                <span>{episode.published_at}</span>
                <span>{episode.file.duration}</span>
              </EpisodeDetails>

              <button
                className={verifyThisEpisodeIsPlaying(episode) ? 'playing' : ''}
                onClick={() => {
                  if (verifyThisEpisodeIsPlaying(episode)) {
                    setPlayingState(false)
                  } else {
                    playList(episodeList, index)
                  }
                }}
              >
                {verifyThisEpisodeIsPlaying(episode) ? (
                  <MdPause />
                ) : (
                  <MdPlayArrow />
                )}
              </button>
            </li>
          ))}
        </ul>
      </LatestEpisode>

      <AllEpisodes>
        <h2>Todos os episódios</h2>

        <div>
          <table cellSpacing={0}>
            <thead>
              <tr>
                <th />
                <th>Podcast</th>
                <th>Integrantes</th>
                <th>Data</th>
                <th>Duração</th>
                <th />
              </tr>
            </thead>

            <tbody>
              {allEpisodes.map((episode, index) => (
                <tr key={episode.id}>
                  <td colSpan={1}>
                    <div className="thumbnail-container">
                      <Image
                        layout="fill"
                        style={{
                          borderRadius: '.5rem',
                        }}
                        objectFit="cover"
                        src={episode.thumbnail}
                        alt={episode.title}
                        className="thumbnail"
                      />
                    </div>
                  </td>
                  <td>
                    <Link href={`/episode/${episode.id}`}>{episode.title}</Link>
                  </td>
                  <td>{episode.members}</td>
                  <td style={{ width: 100 }}>{episode.published_at}</td>
                  <td>{episode.file.duration}</td>
                  <td>
                    <button
                      className={
                        verifyThisEpisodeIsPlaying(episode) ? 'playing' : ''
                      }
                      onClick={() => {
                        if (verifyThisEpisodeIsPlaying(episode)) {
                          setPlayingState(false)
                        } else {
                          playList(episodeList, index + latestEpisodes.length)
                        }
                      }}
                    >
                      {verifyThisEpisodeIsPlaying(episode) ? (
                        <MdPause />
                      ) : (
                        <MdPlayArrow />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AllEpisodes>
    </HomeWrapper>
  )
}

export default Home
