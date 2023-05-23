<template>
  <div v-editable="blok" class="image-gallery">
    <div
        v-for="s in blok.Images"
        :key="s._uid"
        class="image-row"
        :style="{ 'background-image': 'url(' + $resizeImage(s.image, '450x500') + ')', 'width': '350px'}">
    </div>
  </div>
</template>

<script>

export default {
  props: ['blok']
// computed: {
// urls () {
// return this.images.map((i) => {
// return i.image
// })
// },
// thumbnail () {
// return this.images[0].image
// }
// }
}
</script>

<style lang="scss" scoped>

.image-gallery {
  text-align: center;
  margin-top: 3em;
  .image-row{
    display: inline-block;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    height: 19em;
    @media screen and (max-width: 1050px) {
      width: 250px !important;
      height: 240px !important;
      margin-bottom: 2em;
    }
  }
}
</style>
