<template>
  <div class="w-full" :class="[{ 'flex w-full justify-center': !hasProse && !hasHeader }, { 'grid grid-cols-2 mx': hasProse }]">
    <div v-if="hasProse" class="prose prose-sm sm:prose lg:prose-lg xl:prose-xl">
      <h2>{{ blok.prose_header }}</h2>
      <div v-html="transformedProse"></div>
    </div>
    <button
      class="text-white mx-2 justify-self-center rounded-sm ring-2 cursor:pointer max-w-max hover:bg-gray-900 hover:ring-gray-300"
      v-bind:class="buildClassString" v-on:click="route(blok.url)">
      {{ blok.text }}
    </button>
  </div>
</template>


<script>
export default {
  props: ['blok'],
  computed: {
    buildClassString () {
      const classes = []
      classes.push(`bg-${this.blok.color}`, `ring-${this.blok.color}-300`)
      if (this.blok.size === 'small') {
        classes.push('text-base', 'py-1', 'px-8', 'mt-1')
      } else if (this.blok.size === 'medium') {
        classes.push('text-lg', 'py-2', 'px-12', 'mt-2')
      } else if (this.blok.size === 'large') {
        classes.push('text-3xl', 'py-4', 'px-16', 'mt-4')
      }
      return classes.join(' ')
    },
    hasProse () {
      return this.blok.prose_text
    },
    transformedProse () {
      console.log(JSON.parse(JSON.stringify(this.blok.prose_text)))
      //const data = JSON.parse(this.blok.prose_text)
      let html = ''

      this.blok.prose_text.content.forEach((item) => {
        if (item.type === 'paragraph') {
          let paragraph = '<p>'

          item.content.forEach((content) => {
            let text = content.text

            if (content.marks) {
              content.marks.forEach((mark) => {
                switch (mark.type) {
                  case 'bold':
                    text = `<strong>${text}</strong>`
                    break
                  case 'italic':
                    text = `<em>${text}</em>`
                    break
                  case 'link':
                    text = `<a href="${mark.attrs.href}" target="${mark.attrs.target}">${text}</a>`
                    break
                  default:
                    break
                }
              })
            }

            paragraph += `${text} `
          })

          paragraph += '</p>'
          html += paragraph
        }
      })

      return html
    }
  },
  methods: {
    route (target) {
      this.$router.push(target)
    }
  }
}
</script>
