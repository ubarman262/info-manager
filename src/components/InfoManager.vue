<template>
  <div>
    <form class="box" style="text-align: start">
      <div class="field">
        <label class="label">Title</label>
        <div class="control">
          <input
            class="input"
            type="text"
            placeholder="Enter title"
            id="modaltitle"
            v-model="title"
          />
        </div>
      </div>

      <div class="field">
        <label class="label">Value</label>
        <div class="control">
          <textarea
          id="modalvalue"
            class="textarea"
            placeholder="Enter value"
            v-model="value"
          />
          <button
            class="button is-small is-success"
            :class="isLoading"
            @click="fileInput"
          >
            Upload Image
          </button>
          <input
            type="file"
            ref="inputImage"
            style="display: none"
            @change="previewImage"
            accept="image/*"
          /><br />
          <img :src="img1" style="max-width: 50% !important;" />
        </div>
      </div>

      <button class="button is-info is-rounded is-fullwidth" @click="$emit('save', title, value, img1)">
        Save
      </button>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/storage'

export default {
  name: 'InfoAdder',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      caption: '',
      img1: '',
      imageData: null,
      imageURL: '',
      isLoading: '',
      title: '',
      value: ''
    }
  },
  methods: {
    create () {
      const post = {
        photo: this.img1,
        caption: this.caption
      }
      firebase
        .database()
        .ref('PhotoGallery')
        .push(post)
        .then(response => {})
        .catch(err => {
          console.log(err)
        })
    },
    fileInput () {
      this.$refs.inputImage.click()
    },
    previewImage (event) {
      this.uploadValue = 0
      this.img1 = null
      this.imageData = event.target.files[0]
      this.onUpload()
    },
    onUpload () {
      this.isLoading = 'is-loading'
      this.img1 = null
      const storageRef = firebase
        .storage()
        .ref(`${this.imageData.name}`)
        .put(this.imageData)
      storageRef.on(
        `state_changed`,
        snapshot => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        },
        error => {
          console.log(error.message)
        },
        () => {
          this.uploadValue = 100
          storageRef.snapshot.ref.getDownloadURL().then(url => {
            this.img1 = url
            setTimeout(() => {
              this.isLoading = ''
            }, 2000)
          })
        }
      )
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form {
  text-align: initial;
}
</style>
