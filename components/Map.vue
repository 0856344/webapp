<template>
  <div v-editable="blok" class="map">
    <img class="placeholder" src="~/assets/img/map.png" alt="" />
  </div>
</template>

<script>
export default {
  props: ["blok"],
  data() {
    return {
      mapTypeControl: false,
      markers: [],
      styles: [
        {
          featureType: "administrative",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#f85e5e",
            },
          ],
        },
        {
          featureType: "landscape",
          stylers: [
            {
              color: "#f2f3ee",
            },
          ],
        },
        {
          featureType: "poi",
          stylers: [
            {
              visibility: "off",
            },
          ],
        },
        {
          featureType: "road",
          stylers: [
            {
              saturation: -100,
            },
            {
              lightness: 45,
            },
          ],
        },
        {
          featureType: "road.arterial",
          elementType: "labels.icon",
          stylers: [
            {
              visibility: "off",
            },
          ],
        },
        {
          featureType: "road.highway",
          stylers: [
            {
              visibility: "simplified",
            },
          ],
        },
        {
          featureType: "transit",
          stylers: [
            {
              visibility: "off",
            },
          ],
        },
        {
          featureType: "water",
          stylers: [
            {
              color: "#72a4b2",
            },
            {
              visibility: "on",
            },
          ],
        },
      ],
    };
  },
  computed: {
    options() {
      return {
        styles: this.styles,
      };
    },
  },
  created() {
    this.markers = [
      {
        position: {
          lat: Number(this.blok.lat),
          lng: Number(this.blok.lon),
        },
      },
    ];
  },
};
</script>

<style lang="scss">
.map {
  @include media-breakpoint-down(lg) {
    @include margin-page-wide;
  }
  .gmaps {
    width: 100%;
    height: 70vh;
  }
  .placeholder {
    width: 100%;
    height: auto;
  }
}
</style>
