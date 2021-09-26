const state = {
  searchQuery: ''
}

const getters = {
  getSearchQuery: state => state.searchQuery
}

const actions = {
  async searchQueryChange ({ commit }, query) {
    commit('queryChange', query)
  }
}

const mutations = {
  queryChange: (state, query) => (state.searchQuery = query.query)
}

export default {
  state,
  getters,
  actions,
  mutations
}
