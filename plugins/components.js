import Vue from 'vue'

/**
 * VUE COMPONENTS
 */
import Markdown from '@/components/Markdown.vue'
import Loading from '@/components/Loading.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import Checkbox from '@/components/Checkbox.vue'
import CookieManager from '@/components/CookieManager.vue'
import Map from '@/components/Map.vue'
import Accordion from '@/components/Accordion.vue'
import BigLoadingSpinner from '@/components/BigLoadingSpinner.vue'

/**
 * STORYBLOK COMPONENTS
 */
import Page from '@/bloks/Page.vue'
import Teaser from '@/bloks/Teaser.vue'
import GeneralHeader from '@/bloks/GeneralHeader.vue'
import AboutTeaser from '@/bloks/AboutTeaser.vue'
import AboutInfo from '@/bloks/AboutInfo.vue'
import IntroList from '@/bloks/IntroList.vue'
import Grid from '@/bloks/Grid.vue'
import Feature from '@/bloks/Feature.vue'
import SitemapItem from '@/bloks/SitemapItem.vue'
import FAQBlock from '@/bloks/FAQBlock.vue'
import FAQItem from '@/bloks/FAQItem.vue'
import DownloadItem from '@/bloks/_default/DownloadItem.vue'
import LocationDescription from '@/bloks/LocationDescription.vue'
import FeedbackForm from '@/bloks/FeedbackForm.vue'

import TeamMember from '@/bloks/person/TeamMember.vue'
import TeamMemberPreview from '@/bloks/person/TeamMemberPreview.vue'
import Mainstage from '@/bloks/Mainstage.vue'
import MembershipGrid from '@/bloks/MembershipGrid.vue'
import MembershipPlan from '@/bloks/MembershipPlan.vue'
import CenteredText from '@/bloks/_default/CenteredText.vue'
import ContactInfo from '@/bloks/person/ContactInfo.vue'
import InfoBox from '@/bloks/_default/InfoBox.vue'
import NewsFeedItem from '@/bloks/NewsFeedItem.vue'
import WorkshopBestOf from '@/bloks/workshops/WorkshopBestOf.vue'
import WorkshopPreview from '@/bloks/workshops/WorkshopPreview.vue'
import WorkshopHeader from '@/bloks/workshops/WorkshopHeader.vue'
import WorkshopInfo from '@/bloks/workshops/WorkshopInfo.vue'
import WorkshopListItem from '@/bloks/workshops/WorkshopListItem.vue'
import CorporateContent from '@/bloks/CorporateContent.vue'

import EventListItem from '@/bloks/EventListItem.vue'

import MachineListItem from '@/bloks/machines/MachineListItem.vue'

import MachineStatusListItem from '@/bloks/machines/MachineStatusListItem.vue'
import Machine from '@/bloks/machines/Machine.vue'
import JobTeaser from '@/bloks/JobTeaser.vue'
import JobList from '@/bloks/JobList.vue'
import JobOpening from '@/bloks/JobOpening.vue'
import PageList from '@/bloks/PageList.vue'
import PageCard from '@/bloks/PageCard.vue'
import ImageGallery from '@/bloks/ImageGallery.vue'

import ImageSlideshow from '@/bloks/ImageSlideshow.vue'
import ImageSlideshowBlue from '@/bloks/ImageSlideshowBlue.vue'
import SpotlightSlider from '@/bloks/SpotlightSlider.vue'
import TextImage from '@/bloks/_default/TextImage.vue'
import Text from '@/bloks/_default/Text.vue'
import Video from '@/bloks/Video.vue'
import LinksSlideshow from '../bloks/LinksSlideshow.vue'

import LoginForm from '@/bloks/LoginForm.vue'

import RegisterForm from '@/bloks/RegisterForm.vue'
import RegisterSuccessForm from '@/bloks/RegisterSuccessForm.vue'
import RecoverForm from '@/bloks/RecoverForm.vue'
import RecoverSuccessForm from '@/bloks/RecoverSuccessForm.vue'
import StoryBlokLink from '@/bloks/StoryBlokLink.vue'

import MainNavItem from '@/bloks/MainNavItem.vue'
import MainNavMobileItem from '@/bloks/MainNavMobileItem.vue'

import LevelSlider from '@/bloks/LevelSlider.vue'
import LevelItem from '@/bloks/LevelItem.vue'
import Package from '@/bloks/Package.vue'
import Training from '@/bloks/Training.vue'
import Course from '@/bloks/Course.vue'
import ExtrasGrid from '@/bloks/ExtrasGrid.vue'
import ExtraItem from '@/bloks/ExtraItem.vue'
import Icon from '@/bloks/Icon.vue'
import PriceTable from '@/bloks/prices/PriceTable.vue'
import PriceTableItem from '@/bloks/prices/PriceTableItem.vue'
import MachinePreview from '@/bloks/machines/MachinePreview.vue'
import MakerPreview from '../bloks/person/MakerPreview.vue'
import LanguageInput from '../bloks/LanguageInput.vue'
import PressContact from '../bloks/person/PressContact.vue'
import PressImageSlider from '../bloks/PressImageSlider.vue'
import PressPost from '../bloks/PressPost.vue'
import GiftPage from '../bloks/GiftPage.vue'
import TeamImageSlider from '../bloks/TeamImageSlider.vue'
import MaterialPrices from '../bloks/prices/MaterialPrices.vue'
import PressGallery from '../bloks/PressGallery.vue'
import ContactPerson from '../bloks/person/ContactPerson.vue'
import ContactPreview from '../bloks/person/ContactPreview.vue'
import PretixOceaneye from '../bloks/PretixOceaneye.vue'
import PretixCalendar from '../bloks/calendar/PretixCalendar.vue'
import TwoVideosColumn from '@/bloks/TwoVideosColumn.vue'
import DownloadCard from '../bloks/DownloadCard.vue'
import SingleImage from '@/bloks/SingleImage.vue'
import LogoText from '@/bloks/LogoText.vue'
import CreditPackage from '@/bloks/CreditPackage.vue'
import FabmanCalendar from '@/bloks/calendar/FabmanCalendar.vue'
import MachineCard from '@/bloks/machines/MachineCard.vue'
import ButtonLink from '@/bloks/_default/ButtonLink.vue'
import FabmanMachine from '@/bloks/machines/FabmanMachine.vue'
import MembershipPlanSG from '@/bloks/MembershipPlanSG.vue'
import MembershipGridSG from '@/bloks/MembershipGridSG.vue'

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
Vue.component('fabman-machine', FabmanMachine)

Vue.component('membership-plan-sg', MembershipPlanSG)
Vue.component('membership-grid-sg', MembershipGridSG)
Vue.component('accordion', Accordion)
Vue.component('big-loading-spinner', BigLoadingSpinner)
