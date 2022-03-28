import convertDurationToTimeString from '../utils/convertDurationToTimeString'
import { parseISO, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import IEpisode from '../interface/IEpisode'
import api from '../services/api'
import { AxiosRequestConfig } from 'axios'

const loadEpisodes = async (
  options?: AxiosRequestConfig
): Promise<IEpisode[]> => {
  const { data } = await api('episodes', options)

  const formattedData = (episode: IEpisode) => ({
    ...episode,
    published_at: format(parseISO(episode.published_at), 'd MMM yy', {
      locale: ptBR,
    }),
    file: {
      duration: convertDurationToTimeString(episode.file.duration),
    },
  })

  return data.map((episode: IEpisode) => formattedData(episode))
}

export default loadEpisodes
