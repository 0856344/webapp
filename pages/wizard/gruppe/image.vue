<!--TODO remove - unused after MS24 reopening-->
<template>
  <div class="section">
    <h2>Foto</h2>
    <p>Für deine persönliche Member-Card lade bitte noch dein Bild hoch.</p>
    <form class="form">
      <div v-if="this.onboardingData.image64" class="form-item">
        <span class="label">{{ $t("Image-Preview") }}</span>
        <img
          id="imgId"
          class="profilePic"
          v-if="this.onboardingData.image64"
          :src="this.onboardingData.imageUrl"
        />
      </div>
      <div class="form-item">
        <span class="label">{{ $t("Upload-Image") }}</span>
        <input type="file" accept=".png, .jpg, .jpeg" @change="onChange" />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    onboardingData: {
      type: Object,
      required: false,
    },
  },
  async mounted() {
    window.scrollTo(0, 0);
  },
  data() {
    return {
      loading: false,
    };
  },
  beforeRouteEnter(to, from, next) {
    if (
      from.path === "/wizard/onboarding/contact" ||
      from.path === "/wizard/onboarding/payment"
    ) {
      next();
    } else {
      next("/wizard/onboarding/userInformation");
    }
  },
  computed: {},
  methods: {
    onChange(e) {
      const file = e.target.files[0];
      if (file.size > 2000000) {
        alert("Es sind nur Bilddateien unter 2MB erlaubt");
        return false;
      }
      this.onboardingData.imageUrl = URL.createObjectURL(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        // TODO: ratio check
        //const img = document.getElementById('imgId')
        // const width = img.offsetWidth
        // const height = img.offsetHeight
        this.onboardingData.image64 = reader.result;
      };
      this.onboardingData.image64 = reader.readAsDataURL(file);
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  margin-left: -6em;
  @include media-breakpoint-down(md) {
    margin-left: 0em;
  }
}

.red {
  color: $color-red;
}

.form-item {
  min-width: 27em;
  @include media-breakpoint-down(md) {
    min-width: auto;
  }
}

img {
  width: 27em;
  height: auto;
  @include media-breakpoint-down(md) {
    width: 250px;
  }
}
</style>
