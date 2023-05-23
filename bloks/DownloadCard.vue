<template>
  <div v-editable="blok" class="download-item">
    <div
        class="display-grid-item"
        @click="showModal(blok.file.filename)">
      <img :src="blok.file.filename" alt="" width="300px" height="330px" class="download-card-image" @click="showModal(blok.file.filename)">
    </div>
    <a class="filelink" :href="blok.file.filename" target="_blank">
    <div class="title">
      <p>
        {{ blok.name }}
      </p>
    </div>
    </a>
    <div id="modal" class="modal" >
      <div class="modal-display">
        <a class="xButton" href="javascript:void(0)"
           @click="closeModal()">&times;</a>
        <div class="display-image">
          <img id="modal-img" class="modal-img"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['blok'],
  created () {
  },
  methods: {
    showModal (src) {
      const modal = document.getElementById('modal')
      modal.style.setProperty('display', 'flex')
      const modalImg = document.getElementById('modal-img')
      modalImg.src = src
    },
    closeModal () {
      const modal = document.getElementById('modal')
      modal.style.setProperty('display', 'none')
      this.currentPosition = 0
    }
  }
}
</script>

<style lang="scss" scoped>

.download-item {
  margin-left: 5%;
  margin-right: 5%;
  display: flex;
  justify-content: space-around;
  flex-flow: column;
  width: 300px;
  height: 450px;
  .filelink {
    color: inherit;
  }
  .download-card-image {
    object-fit: cover;
  }
  .title {
    display: flex;
    justify-content: center;
    background: $color-orange;
    font-size: 1rem;
    text-transform: uppercase;
    font-weight: bold;
    margin-bottom: .2rem;
    p{
      color: white;
    }
  }

  .subtitle {
    font-size: .75rem;
  }
}

.modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.74);
  z-index: 100;

  .modal-display {
    display: flex;
    flex-flow: column;
    opacity: 1;
  }
  .xButton {
    align-self: flex-end;
    color: white;
    text-decoration: white;
    font-weight: bold;
    font-size: 3rem;
    line-height: 1;
  }
  .display-image {
    display: flex;
    .arrow-left{
      padding-right: 0.5rem;
      color: #ffffff;
      font-size: 3rem;
      line-height: 1;
      font-weight: 700;
      align-self: center;
      @media (min-width: 768px) {
        padding-right: 2.5rem;
      }
    }
    .arrow-right{
      padding-left: 0.5rem;
      color: #ffffff;
      font-size: 3rem;
      line-height: 1;
      font-weight: 700;
      align-self: center;
      @media (min-width: 768px) {
        padding-left: 2.5rem;
      }
    }
    .modal-img{
      object-fit: scale-down;
      width: 300px;
      height: 500px;
      @media (min-width: 768px) {
        width: 500px;
      }
      @media (min-width: 1024px) {
        width: 600px;
      }
    }
  }
}
</style>
