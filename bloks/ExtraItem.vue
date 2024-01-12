<template>
  <div v-editable="blok">
    <div class="p-4 bg-white shadow-md shadow-gray-300">
      <div class="flex items-start font-sans-secondary text-blue-500 relative">
        <h2 class="m-0">
          {{ blok.title }}
        </h2>
        <div v-if="blok.icon" class="fill-white absolute -right-6 -top-6 bg-orange rounded-full w-8 h-8 flex items-center justify-center">
          <icon v-if="blok.icon" :name="blok.icon" />
        </div>
      </div>
      <div class="text-base">
        <markdown
          v-if="blok.description"
          class="text"
          :value="blok.description"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["blok"],
};
</script>

<style scoped>
 ::v-deep p:last-child {
  margin-bottom: 0;
}
</style>