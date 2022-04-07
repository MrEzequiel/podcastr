import IEpisode from '../interface/IEpisode'
import { IEpisode as IEpisodePlayer } from '../context/PlayerContext'

export const formatEpisodeFromPlayer = (episode: IEpisode): IEpisodePlayer => {
  return {
    duration: episode.file.duration,
    members: episode.members,
    thumbnail: episode.thumbnail,
    title: episode.title,
    url: episode.file.url,
  }
}

export const formatArrayEpisodeFromPlayer = (
  episodes: IEpisode[]
): IEpisodePlayer[] => {
  return episodes.map(formatEpisodeFromPlayer)
}
