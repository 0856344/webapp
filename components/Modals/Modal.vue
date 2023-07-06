<template>
  <transition name="fade">
    <div class="modal" v-show="showModal">
      <div class="modal-content">
        <slot></slot>
      </div>
    </div>

    <Modal
      :show="showModal"
      class="modal bg-white rounded-lg shadow-lg overflow-hidden fade-transition text-left"
      @click="handleClose"
    >
      <div>
        <ModalHeader v-text="headerText" class="bg-gray-100 dark:bg-gray-700" />

        <ModalContent style="min-height: 100px">
          <p class="dark:text-white text-md">
            {{ contentText }}
          </p>
        </ModalContent>

        <ModalFooter>
          <div class="flex items-start ml-auto">
            <CancelButton
              component="button"
              type="button"
              dusk="cancel-action-button"
              class="ml-auto mr-3"
              @click="handleClose"
            />

            <LoadingButton
              ref="submitButton"
              type="submit"
              @click="handleConfirm"
              :loading="loading"
            >
              {{ submitText }}
            </LoadingButton>
          </div>
        </ModalFooter>
      </div>
    </Modal>
  </transition>
</template>

<script>
export default {
  name: "GeneralModal",
  props: {
    showModal: Boolean,
    headerText: String,
    contentText: String,
    submitText: String,
    loading: Boolean,
  },
  watch: {
    errorMsg(value) {
      console.log("errorMsg", value);
    },
  },
  methods: {
    handleClose() {
      this.$emit("close");
    },

    handleConfirm() {
      this.$emit("confirm");
    },
  },
};
</script>

<style scoped lang="scss">
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 2rem;
  border-radius: 4px;
}
</style>
