<template>
  <div>
    <component :is="this.blok.level" v-editable="blok" :class="getClasses">{{ blok.title }}</component>
  </div>
</template>

<script>
  export default {
    components: {},
    props: ['blok'],

    computed: {
      getClasses() {
        const classes = []
        switch (this.blok.space) {
          case 'none':
            classes.push('m-0 p-0')
            break;
          case 'some':
            classes.push('my-4')
            break;
          case 'some-t':
            classes.push('mt-4')
            break;
          case 'some-b':
            classes.push('mb-4')
            break;
          case 'lots':
            classes.push('my-16')
            break;
          case 'lots-t':
            classes.push('mt-16')
            break;
          case 'lots-b':
            classes.push('mb-16')
            break;
          default:
            classes.push('m-0 p-0')
            break;
        }
        if (this.blok.center) {
          classes.push('text-center')
        }
        switch (this.blok.color) {
          case 'blue':
            classes.push('text-blue')
            break;
          case 'orange':
            classes.push('text-orange')
            break;
        }
        return classes.join(' ')
      },
    },
  }
</script>
