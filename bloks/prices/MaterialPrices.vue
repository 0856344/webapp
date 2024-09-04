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
      articles: [],
    };
  },
  computed: {
    priceList() {
      return {
        title: this.$t("materials"),
        billedInCredits: false,
        items: this.articles.map((article) => {
          return {
            name: article.full_name,
            price: article.netto_price + (article.netto_price * (article.tax_percent / 100)),
            unit: article.unit ? article.unit.name : 'Stück',
            category: article.category.name,
            category_description: '',
          };
        }),
      };
    },
  },
  async mounted() {
    let products = await this.$store.dispatch("getMaterials");
    this.processMaterials(products);
  },
  methods: {
    processMaterials(products) {
      // Step 1: Filter non-visible products
      let filteredProducts = products.filter(product => product.visible !== 0);

      // Step 2: Sort the filtered products alphabetically by product.name
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name));

      // Step 3: Create a new array with all articles
      let allArticles = [];
      filteredProducts.forEach(product => {
        if (product.articles && product.articles.length > 0) {
          product.articles.forEach(article => {
            article.unit = product.unit;
            article.category = product.category;
          });
          allArticles = allArticles.concat(product.articles);
        }
      });

      this.articles = allArticles;
    }
  }
};
</script>
