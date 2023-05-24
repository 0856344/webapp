<script>
export default {
  props: ['theme'],
  data () {
    return {
      show: false
    }
  },
  methods: {
    toggle: function () {
      this.show = !this.show
    },
    beforeEnter: function (el) {
      el.style.height = '0'
    },
    enter: function (el) {
      el.style.height = el.scrollHeight + 10 + 'px'
    },
    beforeLeave: function (el) {
      el.style.height = el.scrollHeight + 'px'
    },
    leave: function (el) {
      el.style.height = '0'
    }
  }
}
</script>

<template>
    <div class="accordion" :class="theme">
        <div class="header" @click="toggle">
            <slot name="header"></slot>
            <!-- TODO - fix arrow rotation -->
            <i id="accordionIcon" class="fa fa-2x fa-angle-down header-icon" :class="{ 'rotate': show }"></i>
        </div>
        <transition name="accordion"
                    @before-enter="beforeEnter" @enter="enter"
                    @before-leave="beforeLeave" @leave="leave">
            <div class="body" v-show="show">
                <div class="body-inner">
                    <slot></slot>
                </div>
            </div>
        </transition>
    </div>
</template>

<style scoped lang="scss">
.accordion {
  -webkit-box-shadow: 5px 5px 10px 0 rgba(0, 0, 0, 0.2);
  box-shadow: 5px 5px 10px 0 rgba(0, 0, 0, 0.2);
  font-family: inherit;
  margin-bottom: 20px;
  background-color: $color-primary;
  border-radius: 6px;
  font-weight: bold;

  .header {
    text-transform: uppercase;
    height: 50px;
    line-height: 40px;
    padding: 6px 40px 0 15px;
    position: relative;
    color: #fff;
    cursor: pointer;
    font-weight: bold;
    font-size: 1.2rem;
  }

  .header-icon {
    position: absolute;
    top: 8px;
    right: 18px;
    transition-duration: 0.5s;

    &.rotate {
      transform: rotate(180deg);
      transition-duration: 0.5s;
    }
  }

  .body {
    /*   display: none; */
    overflow: hidden;
    background-color: #fff;
    border: 2px solid white;
    border-top: 0;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    transition: 0.5s ease-out;
  }

  .body-inner {
    padding: 3% 2%;
    overflow-wrap: break-word;
      height: 100%;
  }

  .primary {
    background-color: $color-primary;

    &.body {
      border-color: $color-primary;
    }
  }

  .secondary {
    background-color: $color-secondary;

    &.body {
      border-color: $color-secondary;
    }
  }
}
</style>
