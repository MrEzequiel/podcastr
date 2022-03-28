import type { NextPage, GetStaticProps } from 'next'

import IEpisode from '../interface/IEpisode'
import {
  AllEpisodes,
  EpisodeDetails,
  HomeWrapper,
  LatestEpisode,
} from '../styles/HomeStyle'

import { MdPlayArrow } from 'react-icons/md'
import Link from 'next/link'
import loadEpisodes from '../lib/loadEpisodes'

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
  return (
    <HomeWrapper>
      <LatestEpisode>
        <h2>Últimos lançamentos</h2>

        <ul>
          {latestEpisodes.map(episode => (
            <li key={episode.id}>
              <img
                width={192}
                height={192}
                src={episode.thumbnail}
                alt={episode.title}
              />

              <EpisodeDetails>
                <Link href={`/episode/${episode.id}`}>{episode.title}</Link>
                <p>{episode.members}</p>
                <span>{episode.published_at}</span>
                <span>{episode.file.duration}</span>
              </EpisodeDetails>

              <button>
                <MdPlayArrow />
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
              {allEpisodes.map(episode => (
                <tr key={episode.id}>
                  <td>
                    <img
                      width={120}
                      height={120}
                      src={episode.thumbnail}
                      alt={episode.title}
                    />
                  </td>
                  <td>
                    <Link href={`/episode/${episode.id}`}>{episode.title}</Link>
                  </td>
                  <td>{episode.members}</td>
                  <td style={{ width: 100 }}>{episode.published_at}</td>
                  <td>{episode.file.duration}</td>
                  <td>
                    <button>
                      <MdPlayArrow />
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
