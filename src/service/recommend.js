import { get } from './base'

export function getRecommend () {
  return get('/api/getRecommend')
}

export function getAlbum (album) {
  return get('/api/getAlum', {
    id: album.id
  })
}
