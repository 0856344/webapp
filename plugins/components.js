import Vue from 'vue'
import Page from '~/components/Page.vue'
import Teaser from '~/components/Teaser.vue'
import GeneralHeader from '~/components/GeneralHeader.vue'
import AboutTeaser from '~/components/AboutTeaser.vue'
import AboutInfo from '~/components/AboutInfo.vue'
import IntroList from '~/components/IntroList.vue'
import Grid from '~/components/Grid.vue'
import Feature from '~/components/Feature.vue'
import SitemapItem from '~/components/SitemapItem.vue'
import FAQBlock from '~/components/FAQBlock.vue'
import FAQItem from '~/components/FAQItem.vue'
import DownloadItem from '~/components/DownloadItem.vue'
import LocationDescription from '~/components/LocationDescription.vue'
import FeedbackForm from '~/components/FeedbackForm.vue'

import TeamMember from '~/components/TeamMember.vue'
import TeamMemberPreview from '~/components/TeamMemberPreview.vue'
import Mainstage from '~/components/Mainstage.vue'
import Map from '~/components/Map.vue'
import MembershipGrid from '~/components/MembershipGrid.vue'
import MembershipPlan from '~/components/MembershipPlan.vue'
import CenteredText from '~/components/CenteredText.vue'
import ContactInfo from '~/components/ContactInfo.vue'
import InfoBox from '~/components/InfoBox.vue'
import NewsFeedItem from '~/components/NewsFeedItem.vue'
import WorkshopBestOf from '~/components/WorkshopBestOf.vue'
import WorkshopPreview from '~/components/WorkshopPreview.vue'
import WorkshopHeader from '~/components/WorkshopHeader.vue'
import WorkshopInfo from '~/components/WorkshopInfo.vue'
import WorkshopListItem from '~/components/WorkshopListItem.vue'

import CorporateContent from '~/components/CorporateContent.vue'

import EventListItem from '~/components/EventListItem.vue'

import MachineListItem from '~/components/MachineListItem.vue'
import MachineStatusListItem from '~/components/MachineStatusListItem.vue'
import Machine from '~/components/Machine.vue'
import JobTeaser from '~/components/JobTeaser.vue'
import JobList from '~/components/JobList.vue'
import JobOpening from '~/components/JobOpening.vue'
import PageList from '~/components/PageList.vue'
import PageCard from '~/components/PageCard.vue'

import ImageGallery from '~/components/ImageGallery.vue'
import ImageSlideshow from '~/components/ImageSlideshow.vue'
import ImageSlideshowBlue from '~/components/ImageSlideshowBlue.vue'
import SpotlightSlider from '~/components/SpotlightSlider.vue'
import TextImage from '~/components/TextImage.vue'
import Text from '~/components/Text.vue'
import Video from '~/components/Video.vue'

import LinksSlideshow from '../components/LinksSlideshow'

import LoginForm from '~/components/LoginForm.vue'
import RegisterForm from '~/components/RegisterForm.vue'
import RegisterSuccessForm from '~/components/RegisterSuccessForm.vue'
import RecoverForm from '~/components/RecoverForm.vue'
import RecoverSuccessForm from '~/components/RecoverSuccessForm.vue'

import StoryBlokLink from '~/components/StoryBlokLink.vue'
import MainNavItem from '~/components/MainNavItem.vue'
import MainNavMobileItem from '~/components/MainNavMobileItem.vue'

import Markdown from '~/components/Markdown.vue'
import Loading from '~/components/Loading.vue'
import LoadingSpinner from '~/components/LoadingSpinner.vue'
import Checkbox from '~/components/Checkbox.vue'

import LevelSlider from '~/components/LevelSlider.vue'
import LevelItem from '~/components/LevelItem.vue'

import Package from '~/components/Package.vue'
import Training from '~/components/Training.vue'
import Course from '~/components/Course.vue'

import ExtrasGrid from '~/components/ExtrasGrid.vue'
import ExtraItem from '~/components/ExtraItem.vue'
import Icon from '~/components/Icon.vue'

import PriceTable from '~/components/PriceTable.vue'
import PriceTableItem from '~/components/PriceTableItem.vue'
import MachinePreview from '~/components/MachinePreview'
import MakerPreview from '../components/MakerPreview'
import CookieManager from '../components/CookieManager'
import LanguageInput from '../components/LanguageInput'
import PressContact from '../components/PressContact'
import PressImageSlider from '../components/PressImageSlider'
import PressPost from '../components/PressPost'
import GiftPage from '../components/GiftPage'
import TeamImageSlider from '../components/TeamImageSlider'
import MaterialPrices from '../components/MaterialPrices'
import PressGallery from '../components/PressGallery'
import ContactPerson from '../components/ContactPerson'
import ContactPreview from '../components/ContactPreview'
import PretixOceaneye from '../components/PretixOceaneye'
import PretixCalendar from '../components/PretixCalendar'
import TwoVideosColumn from '@/components/TwoVideosColumn'
import DownloadCard from '../components/DownloadCard'
import SingleImage from '@/components/SingleImage.vue'
import LogoText from '@/components/LogoText.vue'
import CreditPackage from '~/components/CreditPackage.vue'
import FabmanCalendar from '@/components/calendar/FabmanCalendar.vue'
import MachineCard from '@/components/machines/MachineCard.vue'
import ButtonLink from '@/components/ButtonLink.vue'

import MemberShipPlanSG from '@/components/MemberShipPlanSG.vue'
import MemberShipGridSG from '@/components/MemberShipGridSG.vue'

import SliderContainer from '@/components/SliderContainer.vue'
import SliderSlide from '@/components/SliderSlide.vue'

Vue.component('material-prices', MaterialPrices)
Vue.component('page', Page)
Vue.component('general-header', GeneralHeader)
Vue.component('teaser', Teaser)
Vue.component('about-teaser', AboutTeaser)
Vue.component('about-info', AboutInfo)
Vue.component('intro-list', IntroList)
Vue.component('grid', Grid)
Vue.component('feature', Feature)
Vue.component('sitemap-item', SitemapItem)
Vue.component('team-member', TeamMember)
Vue.component('team-member-preview', TeamMemberPreview)
Vue.component('mainstage', Mainstage)
Vue.component('map-view', Map)
Vue.component('membership-grid', MembershipGrid)
Vue.component('membership-plan', MembershipPlan)
Vue.component('centered-text', CenteredText)
Vue.component('contact-info', ContactInfo)
Vue.component('info-box', InfoBox)
Vue.component('news-feed-item', NewsFeedItem)
Vue.component('workshop-best-of', WorkshopBestOf)
Vue.component('workshop-preview', WorkshopPreview)
Vue.component('machine-preview', MachinePreview)
Vue.component('maker-preview', MakerPreview)

Vue.component('workshop-header', WorkshopHeader)
Vue.component('workshop-info', WorkshopInfo)
Vue.component('workshop-list-item', WorkshopListItem)
Vue.component('corporate-content', CorporateContent)

Vue.component('event-list-item', EventListItem)

Vue.component('package', Package)
Vue.component('training', Training)
Vue.component('course', Course)

Vue.component('machine-list-item', MachineListItem)
Vue.component('machine-status-list-item', MachineStatusListItem)
Vue.component('machine', Machine)
Vue.component('job-teaser', JobTeaser)
Vue.component('job-list', JobList)
Vue.component('job-opening', JobOpening)
Vue.component('page-list', PageList)
Vue.component('page-card', PageCard)

Vue.component('login-form', LoginForm)
Vue.component('register-form', RegisterForm)
Vue.component('recover-form', RecoverForm)
Vue.component('register-success-form', RegisterSuccessForm)
Vue.component('recover-success-form', RecoverSuccessForm)

Vue.component('spotlight-slider', SpotlightSlider)
Vue.component('image-gallery', ImageGallery)
Vue.component('image-slideshow', ImageSlideshow)
Vue.component('image-slideshow-blue', ImageSlideshowBlue)
Vue.component('text-image', TextImage)
Vue.component('text-blok', Text)
Vue.component('links-slideshow', LinksSlideshow)
Vue.component('video-blok', Video)

Vue.component('faq-block', FAQBlock)
Vue.component('faq-item', FAQItem)
Vue.component('download-item', DownloadItem)

Vue.component('extras-grid', ExtrasGrid)
Vue.component('extra-item', ExtraItem)
Vue.component('icon', Icon)

Vue.component('price-table', PriceTable)
Vue.component('price-table-item', PriceTableItem)

Vue.component('level-slider', LevelSlider)
Vue.component('level-item', LevelItem)

Vue.component('location-description', LocationDescription)

Vue.component('main-nav-item', MainNavItem)
Vue.component('main-nav-mobile-item', MainNavMobileItem)
Vue.component('sb-link', StoryBlokLink)
Vue.component('markdown', Markdown)

Vue.component('loading', Loading)
Vue.component('loading-spinner', LoadingSpinner)
Vue.component('checkbox', Checkbox)

Vue.component('feedback-form', FeedbackForm)
Vue.component('cookie-manager', CookieManager)
Vue.component('language-input', LanguageInput)
Vue.component('location-description', LocationDescription)

Vue.component('press-contact', PressContact)
Vue.component('press-image-slider', PressImageSlider)
Vue.component('press-overview', PressPost)
Vue.component('gift-page', GiftPage)
Vue.component('team-image-slider', TeamImageSlider)
Vue.component('press-gallery', PressGallery)
Vue.component('contact-person', ContactPerson)
Vue.component('contact-preview', ContactPreview)
Vue.component('pretix-oceaneye', PretixOceaneye)
Vue.component('pretix-calendar', PretixCalendar)
Vue.component('two-videos-column', TwoVideosColumn)
Vue.component('download-card', DownloadCard)
Vue.component('single-image', SingleImage)
Vue.component('logo-text', LogoText)
Vue.component('credit-package', CreditPackage)
Vue.component('fabman-calendar', FabmanCalendar)
Vue.component('machine-card', MachineCard)
Vue.component('button-link', ButtonLink)

Vue.component('membership-plan-sg', MemberShipPlanSG)
Vue.component('membership-grid-sg', MemberShipGridSG)
Vue.component('slider-container', SliderContainer)
Vue.component('slider-slide', SliderSlide)
