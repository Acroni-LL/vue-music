import MusicList from '@/components/music-list/music-list'
import storage from 'good-storage'
import { processSongs } from '@/service/song'

export default function createDetailComponent (name, key, fetch) {
  return {
    name,
    components: {
      MusicList
    },
    props: {
      data: Object
    },
    data () {
      return {
        songs: [],
        loading: true
      }
    },
    computed: {
      computedData () {
        let ret = null
        const data = this.data
        if (data) {
          ret = data
        } else {
          const cached = storage.session.get(key)
          if (cached && cached.mid === this.$route.params.id) {
            ret = cached
          }
        }
        return ret
      },
      pic () {
        const data = this.computedData
        return data && this.data.pic
      },
      title () {
        const data = this.computedData
        return data && this.data.name
      }
    },
    async created () {
      const data = this.computedData
      if (!data) {
        const path = this.$route.matched[0].path
        this.$router.push([
          path
        ])
        return
      }
      const result = await fetch(data)
      this.songs = await processSongs(result.songs)
      this.loading = false
    }
  }
}
