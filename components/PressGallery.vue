<template>
  <div>
    <ul   class="grid-container">
      <li v-for="i in imageList"  :key="i.uuid" class="grid-image">
        <a  :href="i.pdf.filename" target="_blank">
        <img :src="i.image.filename" loading="lazy" >
        </a>
      </li>
      <li></li>
    </ul>
<!--    <ul
        class="grid-container">
    </ul>
        <ul>
          <li v-for="i in imageList"  :key="i.uuid" >
            <img :src="i.image.filename" loading="lazy">
          </li>
          <li></li>
        </ul>-->
    <!--    <div id="modal" class="modal">
          <div class="modal-display">
            <a class="xButton" href="javascript:void(0)"
               @click="closeModal()">&times;</a>
            <div class="display-image">
              <a id="arrow-left" class="arrow-left" href="javascript:void(0)"
                 @click="changeImage(-1)">&lt;</a>
              <img id="modal-img" class="modal-img"/>
              <a id="arrow-right" class="arrow-right" href="javascript:void(0)"
                 @click="changeImage(1)">></a>
            </div>
          </div>
        </div>-->
  </div>
</template>

<script>
export default {
  name: 'PressGallery',
  props: ['images'],
  data () {
    return {
      container: null,
      currentPosition: 0
    }
  },
  computed: {
    imageList () {
      return this.images
    }
  }
  /*  methods: {
      showModal (src) {
        const modal = document.getElementById('modal')
        modal.style.setProperty('display', 'flex')
        const modalImg = document.getElementById('modal-img')
        modalImg.src = src
        this.imageList.forEach((item, index) => {
          if (item.image.filename === src) {
            this.currentPosition = index
          }
        })
        this.checkForEnd()
      },
      closeModal () {
        const modal = document.getElementById('modal')
        modal.style.setProperty('display', 'none')
        this.currentPosition = 0
      },
      changeImage (val) {
        if (this.currentPosition + val === this.imageList.length || this.currentPosition + val < 0) {
          return
        }
        const modalImg = document.getElementById('modal-img')
        const rightArrow = document.getElementById('arrow-right')

        this.currentPosition = this.currentPosition + val
        this.checkForEnd()
        this.imageList.forEach((item, index) => {
          if (this.currentPosition === index) {
            modalImg.src = item.image.filename
          }
        })
      },
      checkForEnd () {
        const rightArrow = document.getElementById('arrow-right')
        if (this.currentPosition === this.imageList.length - 1) {
          rightArrow.style.setProperty('opacity', '0')
        } else {
          rightArrow.style.setProperty('opacity', '1')
        }
        const leftArrow = document.getElementById('arrow-left')
        if (this.currentPosition === 0) {
          leftArrow.style.setProperty('opacity', '0')
        } else {
          leftArrow.style.setProperty('opacity', '1')
        }
      }
    }*/
}
</script>

<style lang="scss"  >
// BASIC
.grid-container{
  display: flex;
  flex-wrap: wrap;
  ul {
    display: flex;
    flex-wrap: wrap;
  }

  li {
    height: 20vh;
    flex-grow: 1;
    list-style: none;
  }

  li:last-child {
    // There's no science in using "10" here. In all my testing, this delivered the best results.
    flex-grow: 10;
  }

  img {
    max-height: 100%;
    min-width: 100%;
    object-fit: cover;
    vertical-align: bottom;
    padding:10px;
  }
}

  // ADVANCED

  // Portrait

  @media (max-aspect-ratio: 1/1) {
    li {
      height: 15vh;
    }
  }

  // Short screens

  @media (max-height: 480px) {
    li {
      height: 80vh;
    }
  }

  // Smaller screens in portrait

  @media (max-aspect-ratio: 1/1) and (max-width: 480px) {
    ul {
      flex-direction: row;
    }

    li {
      height: auto;
      width: 100%;
    }
    img {
      width: 100%;
      max-height: 75vh;
      min-width: 0;
      &:hover {
        .grid-image {
          transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
          --transform-scale-x: 1.1;
          --transform-scale-y: 1.1;
          opacity: 0.75;
          --tw-scale-x: 1.1;
          --tw-scale-y: 1.1;
          --tw-border-spacing-x: 0;
          --tw-border-spacing-y: 0;
          --tw-translate-x: 0;
          --tw-translate-y: 0;
          --tw-rotate: 0;
          --tw-skew-x: 0;
          --tw-skew-y: 0;
          transition-duration: 500ms;
        }
      }
    }
  }
}

.image-title{
  color: black;
  font-size: 1.2rem;
}

.grid-image {

  &:hover {
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
    --transform-scale-x: 1.25;
    --transform-scale-y: 1.25;
    opacity: 0.75;
    --tw-scale-x: 1.25;
    --tw-scale-y: 1.25;
    --tw-border-spacing-x: 0;
    --tw-border-spacing-y: 0;
    --tw-translate-x: 0;
    --tw-translate-y: 0;
    --tw-rotate: 0;
    --tw-skew-x: 0;
    --tw-skew-y: 0;
    transition-duration: 500ms;
  }
}

.relative {
  position: relative;
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
      object-fit: cover;
      width: 300px;
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
