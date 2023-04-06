<p align="center">
<img src="./docs/graphs/gg-logo.png" width="200">
</p>

# GrandGarage - Website (vueJs)

This badly named repository contains the source code that powers the web application hosted at [grandgarage.eu](https://grandgarage.eu/).<br> It's a member portal to interface with services at Grand Garage, a makerspace in Linz, Austria.

<br><br>

## Setup

1. **Install Dependencies**
   `yarn`

2. **Run local webserver** depending on used environment
   1. `yarn run nuxt-develop`
   2. `yarn run nuxt-staging`
   3. `yarn run nuxt-production`

3. **Use netlify functions**  (works only with valid token) <br>
   1. `yarn lambda-develop`
   2. `yarn lambda-staging`
   3. `yarn lambda-production`
<br>

### Prepare for Deployment

**Generate static HTML**
`yarn run generate`

<br><br>

## Tech Stack

| Platform  | Description / Link                                                                                                 |
|-----------|--------------------------------------------------------------------------------------------------------------------|
| NuxtJs    | a higher-level framework of the JS-framework [vuejs](https://vuejs.org/) / [official website](https://nuxtjs.org/) 
| Storyblok | a modern headless CMS / [official website](www.storyblok.com)                                                      |
| Netlify   | a build and deployment platform / [official website](https://www.netlify.com/with/vue/)                            |

<br>
<p align="center">
<img src="./docs/graphs/architecture.svg" width="200">
</p>

<br><br>

## Contribute
We appreciate contributions of any kind. 

* clone or fork this repository
* get familiar with Nuxt.js
* contribute

We're also [looking for web developers](https://grandgarage.eu/de/jobs) to join our international remote IT team. If you're interested, just get in touch!
