<template>
  <div>
    <div class="dropdown">
      <button
        class="dropbtn"
        @click="language = switchLanguage.oppositeLanguage"
      >
        {{ loadedLanguage.lang }}
      </button>
      <div class="dropdown-content">
        <option v-modal="to">
          <a
            v-for="l in $i18n.locales"
            :key="l.code"
            :value="l.code"
            @click="language = l.code"
            >{{ l.code }}</a
          >
        </option>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LanguageInput",
  data: () => ({
    language: "de",
  }),
  watch: {
    language: function (to) {
      this.$router.push("/" + to);
    },
  },
  computed: {
    loadedLanguage() {
      if (this.$route.path === "/en") {
        return {
          lang: "en",
        };
      } else {
        return {
          lang: "de",
        };
      }
    },
    currentLanguage() {
      return {
        selected: this.localeLocation(this.language),
      };
    },
    switchLanguage() {
      if (this.currentLanguage.selected.name === "de___de") {
        return {
          oppositeLanguage: "en",
        };
      } else {
        return {
          oppositeLanguage: "de",
        };
      }
    },
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.dropbtn {
  background-color: #f2f3ee;
  padding: 16px;
  border: none;
  text-transform: uppercase;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: white;
  min-width: 50px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  text-transform: uppercase;
  color: #000;
  text-decoration: none;
  font-weight: bold;
  font-size: 0.9rem;
  padding: 8px;
}

.dropdown-content a {
  color: black;
  display: block;
  padding: 16px;
  text-align: left;
}

.dropdown-content a:hover {
  color: $color-secondary;
  white-space: nowrap;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown:hover .dropbtn {
  background-color: black;
  color: white;
}
</style>
