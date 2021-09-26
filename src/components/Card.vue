<template>
  <div>
    <div class="column">
      <article class="notification" :class="item.color">
        <button class="delete" @click="$emit('deleteDoc', item.id)"></button>
        <div>
          <h5 class="doc-header">
            <strong>{{ item.title }}</strong>
          </h5>
          <p class="doc-body">{{ item.value }}</p>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item'],
  name: 'Card',
  data: function () {
    return {
      currentDoc: this.item
    }
  },
  methods: {}
}
</script>

<style scoped>
.doc-header {
  text-transform: uppercase;
}
.doc-body {
  margin-bottom: 0;
  display: -webkit-box;
  max-width: 200px;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
