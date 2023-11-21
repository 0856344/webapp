<template>
  <div
    class="grid items-baseline gap-2 grow sm:py-2 sm:h-8 sm:w-full"
    v-bind:class="{
      'sm:grid-cols-contact': isContact,
      'sm:grid-flow-col': !isContact,
    }"
  >
    <label
      class="block font-bold sm:text-end"
      v-bind:class="{ 'text-xs': isContact, uppercase: isContact }"
      :for="id"
    >
      {{ label }}
    </label>
    <input
      :id="id"
      v-bind:value="value"
      class="px-2 border-2 rounded-sm sm:min-w-fit focus:border-orange"
      v-bind:class="{
        'bg-white': !disabled,
        'border-white': isContact,
        'border-gray-300': !isContact,
      }"
      v-on:input="$emit('input', $event.target.value)"
      v-on:focus="$emit('focus', $event.target.value)"
      :disabled="disabled"
    />
  </div>
</template>

<script>
export default {
  props: ["value", "label", "disabled", "isContact"],
  computed: {
    id: function () {
      const lowerCaseLabel = this.label
        ?.replace(/[^a-zA-Z0-9]/g, "")
        .toLowerCase();
      const hashCode = (str) =>
        str
          .split("")
          .reduce((s, c) => (Math.imul(31, s) + c.charCodeAt(0)) | 0, 0);
      return `${lowerCaseLabel}-${hashCode(lowerCaseLabel + Date.now())}`;
    },
  },
};
</script>
