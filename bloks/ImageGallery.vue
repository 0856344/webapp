<template>
  <div v-editable="blok" class="image-gallery text-center mt-12 flex flex-wrap justify-center gap-3">
    <div
        v-for="s in blok.Images"
        :key="s._uid"
        class="inline-block"
    >
        <div v-if="s.pdf"
            class="bg-no-repeat transition-transform transform hover:scale-105 w-full max-w-xs">
            <a v-if="s.pdf" :href="s.pdf.filename" target="_blank" class="hover:cursor-pointer">
              <img :src="s.image.filename" loading="lazy" :style="{ 'background-image': 'url(' + $resizeImage(s.image, '450x500') + ')'}" class="max-h-80">
            </a>
        </div>
      <div v-else
        class="image-row bg-contain bg-center bg-no-repeat"
        :style="{ 'background-image': 'url(' + $resizeImage(s.image, '450x500') + ')', 'width': '320px', 'height': '18em'}">
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: ['blok']
}
</script>

<style lang="scss" scoped>

.image-gallery {
  .image-row{
    @media screen and (max-width: 1050px) {
      width: 250px !important;
      height: 240px !important;
      margin-bottom: 2em;
    }
  }
}
</style>
