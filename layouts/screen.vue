<template>
  <div>
    <div class="screen-container">
      <main id="main" role="main">
        <nuxt />
      </main>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
body {
  background-color: $color-bright-bg;
  width: 100%;
  overflow-x: hidden;
  font-family: $font-primary;
  line-height: 1;
  font-size: 18px;
  color: #000;
  margin: 0;
  padding: 0;
}

* {
  box-sizing: border-box;
}

a {
  color: $color-orange;
  text-decoration: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease-out;
}

.page-enter,
.page-leave-active {
  opacity: 0;
  transform-origin: 50% 50%;
}

.layout-container {
  overflow: hidden;
}

.login-spacer {
  height: 26px;
  display: block;
}

h3 {
  margin-top: 1em;
  font-weight: bold;
  font-size: 3rem;
  @include media-breakpoint-down(sm) {
    font-size: 2rem;
  }
}

.form {
  margin: 0 1em 2em;

  .form-item {
    display: grid;
    @include media-breakpoint-up(sm) {
      grid-template-columns: 28% 72%;
    }
    margin-bottom: 1em;

    .label {
      @include media-breakpoint-up(sm) {
        text-align: right;
      }
      font-weight: bold;
      text-transform: uppercase;
      font-size: 0.7em;
      margin: 7px 10px 0 0;
    }

    .input-text,
    .input-textarea {
      outline: none;
      border: 1px solid #fff;
      flex-grow: 1;
      padding: 5px 10px;
      width: 100%;
      max-width: 100%;
      font-size: 0.8em;
      @include media-breakpoint-down(xs) {
        margin: 1vh 0;
      }

      &:focus {
        border-color: $color-orange;
      }
    }

    .input-textarea {
      height: 10em;
      min-height: 30vh;
      line-height: 1.8;
      resize: vertical;
    }
  }

  .button-row {
    text-align: right;

    .input-button-primary {
      cursor: pointer;
      background-color: $color-orange;
      color: #fff;
      min-width: 30%;
      border: 1px solid lighten($color-orange, 10);
      padding: 7px 12px 8px;
      line-height: 1;
      outline: none;

      &:focus {
        background-color: lighten($color-orange, 10);
      }
    }
  }

  .body {
    flex: 3;

    textarea,
    input {
      width: 100%;
    }
  }
}
</style>
