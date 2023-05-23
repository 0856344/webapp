<template>
  <div
    v-editable="blok"
    class="feedback-form"
  >
    <no-ssr>
      <div
        v-if="loading"
        class="msg"
      >
        {{ $t('loading') }}
      </div>
      <div
        v-else-if="sent"
        class="msg"
      >
        <form
          class="form"
          @submit.prevent="back"
        >
          <div class="form-item">
            <span />
            <p>{{ $t('thankYouForYourFeedback') }}</p>
          </div>
          <div class="button-row">
            <button
              type="submit "
              class="input-button-primary"
            >
              {{ $t('back') }}
            </button>
          </div>
        </form>
      </div>

      <form
        v-else
        class="form"
        name="feedback"
        data-netlify="true"
        netlify-honeypot="bot-field"
        @submit.prevent="handleSubmit"
      >
        <label class="hidden"><input name="bot-field"></label>
        <div data-netlify-recaptcha="true" />
        <label class="form-item">
          <span class="label">{{ $t('name') }}</span>
          <div
            v-if="!user"
            class="body"
          >
            <input
              v-model="form.name"
              class="input-text"
              type="name"
              name="name"
              :placeholder= "[[ $t('yourName') ]]"
            >
          </div>
          <div
            v-else
            class="body"
          >
            <span>{{ form.name }}</span>
          </div>
        </label>
        <label
          v-if="!user"
          class="form-item"
        >
          <span class="label">{{ $t('e-mailAddress') }}</span>
          <div class="body">
            <input
              v-model="form.email"
              class="input-text"
              type="email"
              name="email"
              :placeholder= "[[ $t('yourE-mailAddress') ]]"
            >
          </div>
        </label>
        <label class="form-item">
          <span class="label">{{ $t('message') }}</span>
          <div class="body">
            <textarea
              v-model="form.msg"
              class="input-textarea"
              name="msg"
            />
          </div>
        </label>
        <div class="button-row">
          <button
            type="submit"
            class="input-button-primary"
          >
            {{ $t('send') }}
          </button>
        </div>
      </form>
    </no-ssr>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: ['blok'],
  data () {
    return {
      loading: false,
      sent: false,
      form: {
        name: '',
        email: '',
        msg: ''
      }
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  created () {
    if (this.user) {
      this.form.name = this.user.profile.firstName + ' ' + this.user.profile.lastName
      this.form.email = this.user.profile.emailAddress
    }
  },
  methods: {
    back () {
      this.sent = false
    },
    encode (data) {
      return Object.keys(data)
        .map(
          key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
        )
        .join('&')
    },
    handleSubmit () {
      this.loading = true
      const axiosConfig = {
        header: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }
      axios.post(
        '/',
        this.encode({
          'form-name': 'feedback',
          ...this.form
        }),
        axiosConfig
      ).then(() => {
        this.loading = false
        this.form.msg = ''
        this.sent = true
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss">

.feedback-form {
  max-width: 640px;
  margin: auto;
  .hidden {
    display: none;
  }
}
</style>
