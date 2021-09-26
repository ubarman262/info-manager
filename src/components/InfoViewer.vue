/* eslint-disable camelcase */
<template>
  <div class="container">
    <sui-modal v-model="open">
      <sui-modal-content scrolling image style="margin-top: 40%">
        <info-manager @save="save" />
      </sui-modal-content>
    </sui-modal>
    <masonry
      :cols="{ default: 4, 1000: 3, 700: 2, 400: 2 }"
      :gutter="{ default: '10px', 700: '0px' }"
    >
      <card
        v-for="(item, index) in items"
        :key="index"
        :item="item"
        @deleteDoc="deleteDoc"
      />
    </masonry>
    <a href="#" class="float" @click="openModal">
      <div class="add-icon">
        <font-awesome-icon icon="plus" size="2x" />
      </div>
    </a>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import clone from 'just-clone'
export default {
  name: 'InfoViewer',
  components: {
    Card: () => import('@/components/Card'),
    InfoManager: () => import('@/components/InfoManager')
  },
  watch: {
    getSearchQuery: function () {
      this.updateItems(this.getSearchQuery)
    }
  },
  computed: mapGetters(['getSearchQuery']),
  data () {
    return {
      API_URL: process.env.API_URL,
      active: false,
      itemsMaster: [],
      items: [],
      open: false,
      searchText: this.getSearchQuery,
      colors: [
        'is-primary',
        'is-link',
        'is-info',
        'is-success',
        'is-warning',
        'is-danger',
        ''
      ]
    }
  },
  mounted () {
    this.getitems()
  },
  methods: {
    ...mapActions(['getSearchQuery']),
    getitems () {
      this.axios.get(this.API_URL + '/doc').then(response => {
        this.items = response.data
        this.itemsMaster = clone(this.items)
      })
    },
    updateItems (query) {
      query = query.toLowerCase()
      if (query !== '') {
        this.items = this.items.filter(el => {
          if (el.title.toLowerCase().includes(query)) {
            return el
          }
        })
      } else {
        console.log(this.itemsMaster)
        this.items = this.itemsMaster
      }
    },
    deleteDoc (id) {
      this.axios.delete(this.API_URL + '/doc/' + id).then(response => {
        this.active = true
        setTimeout(() => {
          this.active = false
        }, 3000)
      })
      this.items.splice(
        this.items.findIndex(doc => doc.id === id),
        1
      )
    },
    append () {
      for (let i = 0; i < 20; i++) {
        this.items.push({
          title: `Item ${this.items.length}`,
          content: 'Content'
        })
      }
    },
    openModal () {
      this.open = !this.open
    },
    save (title, value, imageURL) {
      var body = {
        title: title,
        value: value,
        imageURL: imageURL,
        color: this.colors[Math.floor(Math.random() * this.colors.length)]
      }
      this.axios.post(this.API_URL + '/doc', body).then(response => {
        this.openModal()
        this.getitems()
      })
    }
  }
}
</script>

<style scoped>
.container {
  padding: 2%;
  margin-top: 5%;
}

#message {
  position: relative;
  top: 380px;
}

.float {
  position: fixed;
  width: 60px;
  height: 60px;
  bottom: 40px;
  right: 40px;
  background-color: #0c9;
  color: #fff;
  border-radius: 50px;
  text-align: center;
  box-shadow: 2px 2px 3px #999;
}

.my-float {
  margin-top: 22px;
}

.add-icon {
  padding: 14px;
}
</style>
