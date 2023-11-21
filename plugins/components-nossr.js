import Vue from 'vue'

import VueAwesomeSwiper from 'vue-awesome-swiper/dist/ssr'
import DatePick from 'vue-date-pick'
import MarqueeText from 'vue-marquee-text-component'

Vue.use(VueAwesomeSwiper)

// eslint-disable-next-line vue/no-reserved-component-names
Vue.component('marquee', MarqueeText)
Vue.component('date-pick', DatePick)
