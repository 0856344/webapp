<template>
  <div
    class="voting-button"
    :class="{'voting-button__detail': isOnDetail}"
    @click.prevent="vote()"
  >
    <img
      class="medal-icon"
      src="~/assets/img/medal-variant-with-star.svg"
    >
    <p class="number">
      {{ votes }}
    </p>
  </div>
</template>

<script>
export default {
  props: ['isOnDetail', 'propVote', 'uuid'],
  data () {
    return {
      votes: null
    }
  },
  created () {
    if (this.propVote == null) {
      this.$store.dispatch('getVotesByUuids', { uuids: [this.uuid] }).then(r => { this.votes = r[this.uuid] })
    } else {
      this.votes = this.propVote
    }
  },
  methods: {
    vote () {
      if (!localStorage.getItem('hasAlreadyVoted')) {
        localStorage.setItem('hasAlreadyVoted', 'voted')
        this.votes++
        this.$store.dispatch('voteBlog', { uuid: this.uuid }).then(r => console.log(r))
      }
    }
  }
}
</script>

<style lang="scss">

    .voting-button {
      cursor: pointer;
        display: flex;
        margin: 0 20px;

        .medal-icon {
            max-height: 1em;
            height: 100%;
            width: auto;
        }

        .number {
            margin: 0;
            font-size: 1rem;
        }

        &__detail {
            margin: 10px 0;

            .medal-icon {
                max-height: 2em;
                height: 100%;
                width: auto;
            }

            .number {
                margin: 0;
                font-size: 2rem;
            }
        }
    }
</style>
