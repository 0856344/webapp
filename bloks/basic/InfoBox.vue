<template>
  <div v-editable="blok" class="info-box flex bg-white justify-between items-center px-4 py-3 relative my-3">
    <div class="box-content flex flex-col my-2.5">
      <div v-if="blok.title" class="relative text-lg font-bold leading-6 tracking-wide flex">
        <div>
          <div class="block sm:inline">
            <font-awesome-icon icon="info-circle" class="icon text-orange-500"></font-awesome-icon>
          </div>
        </div>
        <span class="ml-2">{{ blok.title }}</span>
      </div>
      <div v-if="blok.text">
        <span>
          <p class="text-base leading-7 tracking-normal mt-0"><markdown :value="blok.text" /></p>
        </span>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: ['blok'],
};
</script>
