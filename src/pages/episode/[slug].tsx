import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import { MdArrowBack, MdPause, MdPlayArrow } from 'react-icons/md'

import IEpisode from '../../interface/IEpisode'
import {
  DescriptionContainer,
  EpisodeWrapper,
  HeaderContainer,
  ThumbnailContainer,
} from '../../styles/EpisodeStyle'
import loadEpisodes from '../../lib/loadEpisodes'
import Head from 'next/head'
import Image from 'next/image'
import usePlayerContext from '../../context/PlayerContext/usePlayerContext'
import { formatEpisodeFromPlayer } from '../../helpers/formatFromPlayer'

export const getStaticPaths: GetStaticPaths = async () => {
  const episodesForPath = await loadEpisodes({
    params: {
      _limit: 2,
      _sort: 'published_at',
      _order: 'desc',
    },
  })

  const paths = episodesForPath.map(episode => ({
    params: {
      slug: episode.id,
    },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ctx => {
  const episode = await loadEpisodes({
    params: {
      id: ctx.params?.slug,
    },
  })

  return {
    props: {
      episode: episode[0],
    },
    revalidate: 60 * 60 * 24, // 1 day
  }
}

interface IProps {
  episode: IEpisode
}

const Episode: NextPage<IProps> = ({ episode }) => {
  const { play, episodes, currentEpisodeIndex, isPlaying, setPlayingState } =
    usePlayerContext()

  const verifyThisEpisodeIsPlaying = () => {
    return (
      isPlaying &&
      currentEpisodeIndex !== null &&
      episodes[currentEpisodeIndex].url === episode.file.url
    )
  }

  return (
    <EpisodeWrapper>
      <Head>
        <title>Podcastr - {episode.title}</title>
      </Head>

      <ThumbnailContainer>
        <Link href="/">
          <a>
            <button className="back">
              <MdArrowBack />
            </button>
          </a>
        </Link>

        <div className="thumbnail-container">
          <Image
            layout="fill"
            src={episode.thumbnail}
            alt={episode.title}
            objectFit="cover"
          />
        </div>

        <button
          onClick={() => {
            if (verifyThisEpisodeIsPlaying()) {
              setPlayingState(false)
            } else {
              play(formatEpisodeFromPlayer(episode))
            }
          }}
        >
          {verifyThisEpisodeIsPlaying() ? <MdPause /> : <MdPlayArrow />}
        </button>
      </ThumbnailContainer>

      <HeaderContainer>
        <h1>{episode.title}</h1>
        <span>{episode.members}</span>
        <span>{episode.published_at}</span>
        <span>{episode.file.duration}</span>
      </HeaderContainer>

      <DescriptionContainer
        dangerouslySetInnerHTML={{
          __html: episode.description,
        }}
      />
    </EpisodeWrapper>
  )
}

export default Episode
