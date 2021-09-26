<template>
  <!-- <nav class="navbar"> -->
    <div class="searchBar">
    <input
      class="input is-rounded"
      type="text"
      placeholder="Search your notes"
      v-model="searchQuery"
    />
    </div>
  <!-- </nav> -->
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Navbar',
  data () {
    return {
      showNav: false,
      searchQuery: ''
    }
  },
  watch: {
    searchQuery: function () {
      this.search()
    }
  },
  methods: {
    ...mapActions(['searchQueryChange']),
    search () {
      this.searchQueryChange({
        query: this.searchQuery
      })
    },
    closeMenu () {
      this.showNav = false
    }
  }
}
</script>
<style>
.searchBar {
  padding: 30px 5px 20px 5px;
}
</style>
