<template>
  <nuxt-link :to="`/${blok.full_slug ?? $route.params.language + 'machines'}`">
    <div class="flex flex-col p-10 sm:p-6 min-w-full">
      <div class="relative flex flex-col items-center">
        <img :src="$resizeImage(content.image, '450x450')" alt="" />
        <div
          v-show="this.state.machines !== this.state.operational"
          class="absolute top-1 left-1 bg-orange text-white px-2 py-1 rounded-md mt-1 text-sm flex items-center gap-1">
          <font-awesome-icon icon="fa-triangle-exclamation" class="text-lg drop-shadow" />
          <span v-show="this.state.machines > 1"
            >{{ `${this.state.operational} von ${this.state.machines} online` }}
          </span>
          <span v-show="this.state.machines <= 1" class="drop-shadow">Offline</span>
        </div>
      </div>
      <div class="">
        <h3 class="text-gray-900 font-sans-secondary my-2 break-words">
          {{ content.title }}
        </h3>
        <div class="text-sm uppercase flex flex-wrap gap-1">
          <span class="bg-blue rounded-md text-white px-1" :key="tag.id" v-for="tag in tags">
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
  export default {
    props: ['blok', 'state'],
    computed: {
      content() {
        return this.blok.content
      },
      tags() {
        return this.blok.tag_list
      },
    },
    data() {
      return {
        showTooltip: false,
      }
    },
  }
</script>
