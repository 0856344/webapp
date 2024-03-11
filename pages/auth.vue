<template>
  <section class="flex p-4 content-center justify-center text-center" style="margin: 60px 0 100px 0">
    <div v-if="error">
      <div v-if="error.errorDescription == 'verify-mail'">
        <div role="alert">
          <div class="bg-gray-900 text-white font-bold rounded-t px-4 py-2">
            Uuups
          </div>
          <div class="border border-gray-900 rounded-b bg-gray-100 px-4 py-3">
            <p>
              {{ $t("youHaveToConfirmYourEmailForRegistration") }}<br><br>
              {{ $t("anotherVerificationEmailHasBeenSentTo") }}
            </p>
            <p>{{ $t("checkSpamFolder") }}</p>
          </div>
        </div>
      </div>
      <div v-else>
        <div role="alert">
          <div class="bg-gray-900 text-white font-bold rounded-t px-4 py-2">
            Uuups
          </div>
          <div class="border border-gray-900 rounded-b bg-gray-100 px-4 py-3">
            <p>
              {{ $t("anErrorHasOccurred") }}<code>{{ error }}</code>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <big-loading-spinner></big-loading-spinner>
    </div>
  </section>
</template>

<script>
import BigLoadingSpinner from "@/components/spinners/BigLoadingSpinner.vue";

export default {
  components: {BigLoadingSpinner},
  data () {
    return {
      error: null,
    };
  },
  created () {
    if (process.client) {
      const hash = this.$route.hash;
      this.$store
        .dispatch("auth", { hash })
        .then((r) => {
          this.$router.push(
            localStorage.getItem("pathToLoadAfterLogin") || "/"
          );
        })
        .catch((err) => {
          if (err.errorDescription === "verify-mail") {
            this.error = err;
            this.$router.replace("/auth").catch(() => true);
          } else {
            this.$router.push("/");
          }
        });
    }
  },
};
</script>

<style lang="scss" scoped>
.auth {
  background-color: rgb(199 199 199 / 50%);
  border-radius: 15px;

  code {
    color: #ff6c6c;
  }

  .loading {
    padding-top: 20vh;
    text-align: center;

    svg {
      display: inline-block;
      animation: spin 4s infinite linear;
    }
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
