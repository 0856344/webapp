<template>
  <transition name="fade">
    <div class="modal" v-show="show" @click.stop>
      <div
        class="modal-content relative mx-auto z-20 max-w-xl bg-white rounded-lg shadow-lg overflow-hidden fade-transition text-left"
      >
        <h3
          v-text="headerText"
          class="uppercase tracking-wide font-bold text-sm border-b border-gray-100 py-4 px-8 bg-gray-100"
        />

        <div class="py-3 px-8" style="min-height: 100px">
          <p class="text-sm">
            {{ contentText }}
          </p>
          <ul
            v-show="data?.length > 0"
            class="flex flex-col rounded data-field bg-gray-100 text-sm list-disc text-left p-4"
          >
            <li v-for="item in data" :key="item.id" class="mb-2">
              {{ item.value }}
            </li>
          </ul>
        </div>

        <div class="bg-gray-100 px-6 py-3 flex text-sm">
          <div class="flex items-start ml-auto">
            <button
              @click="handleClose"
              class="input-button-white mr-1 shadow-md"
            >
              <font-awesome-icon icon="ban" />
              <span>Abbrechen</span>
            </button>

            <button
              class="input-button-primary shadow-md flex"
              :class="{
                'bg-gray-500 cursor-not-allowed': loading,
                'bg-blue-500': !loading,
              }"
              :disabled="loading"
              @click="handleConfirm"
            >
              <loading-spinner-button v-if="loading" class="mr-2" />
              <font-awesome-icon v-else icon="check" class="mr-2" />
              <span>{{ loading ? 'Lade...' : submitText }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import loadingSpinnerButton from '~/components/spinners/LoadingSpinnerButton.vue';

export default {
  name: 'GeneralModal',
  components: { loadingSpinnerButton },
  props: {
    show: Boolean,
    headerText: String,
    contentText: String,
    submitText: String,
    loading: Boolean,
    data: Array,
    id: String,
  },
  methods: {
    handleClose() {
      this.$emit('close');
    },
    handleConfirm() {
      this.$emit('confirm');
    },
  },
};
</script>

<style scoped lang="scss">
.modal {
  z-index: 1001;
  box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 3px 0 rgba(0, 0, 0, 0.1),
    0 1px 2px -1px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.modal-content {
  font-size: 21px;
  margin-top: 25px;
  text-align: center;
}
.data-field {
  padding: 1em 1em 1em 2em;
}
</style>
