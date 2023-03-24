import Vue from 'vue'
import VueCollapse from 'vue2-collapse'
import Notifications from 'vue-notification/dist/ssr.js'
import { VueReCaptcha } from 'vue-recaptcha-v3'

Vue.use(Notifications)
Vue.use(VueCollapse)

Vue.use(VueReCaptcha, {
    siteKey: process.env.RECAPTCHA_SITE_KEY,
    loaderOptions: {
        autoHideBadge: true
    }
})
