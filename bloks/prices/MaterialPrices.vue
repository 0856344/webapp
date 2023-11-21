<template v-editable="blok">
  <Pricelist :priceList="priceList" />
</template>

<script>
import Pricelist from "./Pricelist.vue";

export default {
  props: ["blok"],
  components: {
    Pricelist,
  },
  middleware: "authenticated",
  data() {
    return {
      materials: [],
    };
  },
  computed: {
    priceList() {
      return {
        title: this.$t("materials"),
        billedInCredits: false,
        items: this.materials.map((m) => {
          return {
            name: m.external_name,
            price: m.price,
            unit: m.unit_name,
            category: m.category,
            category_description: m.category_description,
          };
        }),
      };
    },
  },
  async mounted() {
    this.materials = await this.$store.dispatch("getMaterials");
    let materials = Object.assign([], this.materials);
    materials = materials.sort(function (a, b) {
      if (a.external_name > b.external_name) {
        return 1;
      } else if (a.external_name < b.external_name) {
        return -1;
      } else {
        return 0;
      }
    });
    this.materials = materials;
  },
};
</script>
