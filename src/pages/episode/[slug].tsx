import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import { MdArrowBack, MdArrowForward, MdPlayArrow } from 'react-icons/md'

import IEpisode from '../../interface/IEpisode'
import api from '../../services/api'
import convertDurationToTimeString from '../../utils/convertDurationToTimeString'
import {
  DescriptionContainer,
  EpisodeWrapper,
  HeaderContainer,
  ThumbnailContainer,
} from './style'

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ctx => {
  const { data } = await api('episodes')

  const episode = data.episodes.find(
    (episode: IEpisode) => episode.id === ctx.params?.slug
  )
  const formattedEpisode = {
    ...episode,
    published_at: format(parseISO(episode.published_at), 'd MMM yy', {
      locale: ptBR,
    }),
    file: {
      duration: convertDurationToTimeString(episode.file.duration),
    },
  }

  return {
    props: {
      episode: formattedEpisode,
    },
    revalidate: 60 * 60 * 24, // 1 day
  }
}

interface IProps {
  episode: IEpisode
}

const Episode: NextPage<IProps> = ({ episode }) => {
  console.log(episode)
  return (
    <EpisodeWrapper>
      <ThumbnailContainer>
        <Link href="/">
          <a>
            <button className="back">
              <MdArrowBack />
            </button>
          </a>
        </Link>

        <img src={episode.thumbnail} alt={episode.title} />

        <button>
          <MdPlayArrow />
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
