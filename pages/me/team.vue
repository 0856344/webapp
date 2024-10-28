<template>
  <div>
    <loading-spinner v-if="loading"></loading-spinner>
    <div v-if="!loading && freeSeats && team && team.length > 0" class="section">
      <form class="flex flex-col gap-4 mx-4 sm:mx-0 sm:mr-4" @submit.prevent="sendInvitation">
        <h2>neues Teammitglied ({{this.freeSeats.length}}/{{this.team.length}} Plätze verfügbar)</h2>
        <TextInput :label="'Vorname'" v-model="newTeamMember.firstName" :isContact="true" />
        <TextInput :label="'Nachname'" v-model="newTeamMember.lastName" :isContact="true" />
        <TextInput :label="'E-Mail Adresse'" v-model="newTeamMember.email" :isContact="true" />

        <div class="flex justify-center w-full sm:justify-end">
          <div v-if="loading">Saving…</div>
          <button
            v-else
            type="submit"
            class="w-full py-2 mt-6 text-white rounded-sm bg-orange ring-2 ring-orange-300 cursor:pointer disabled:cursor-default disabled:bg-gray-700 disabled:ring-gray-300 sm:max-w-max sm:px-12 hover:bg-gray-900 hover:ring-gray-300"
            :disabled="!newTeamMemberValid">
  <!--          <font-awesome-icon icon="save" />-->
            einladen
          </button>
        </div>
      </form>

    </div>
  </div>
</template>

<script>
  import TextInput from '../../bloks/basic/TextInput.vue'
  import validator from "validator";

  export default {
    middleware: 'authenticated',
    components: { TextInput },
    data() {
      return {
        newTeamMember: {
          firstName:'',
          lastName:'',
          email:'',
        },
        team:null,
        freeSeats:null,
        loading: false,
      }
    },
    async mounted() {
      await this.reload()
    },
    computed: {
      // TODO check if email is free
      newTeamMemberValid() {
        //check, if new team member data is valid && seat is free
        return (this.freeSeats && this.freeSeats.length > 0) && (this.newTeamMember.firstName !== '' && this.newTeamMember.lastName !== '' && validator.isEmail(this.newTeamMember.email))
      }

    },

    methods: {
      async reload() {
        this.loading = true
        // reset data
        this.newTeamMember.firstName = ''
        this.newTeamMember.lastName = ''
        this.newTeamMember.email = ''
        this.freeSeats = null
        this.team = null
        // get team
        this.team = await this.$store.dispatch("getTeam", this.$store.state.member.id)
        // console.log('TEAM: ', this.team)
        // get free seats
        this.freeSeats = this.team.filter((member)=>{
          return (member.emailAddress === null || member.emailAddress === '')
        })
        // console.log('freeSeats: ', this.freeSeats)
        // console.log('freeSeats count: ', this.freeSeats.length)
        // console.log('this.freeSeats[0]: ',this.freeSeats[0])
        this.loading = false
      },
      async updateMember() {
        let payload = Object.assign({}, this.freeSeats[0])
        // get captcha token
        await this.$recaptchaLoaded()
        const token = await this.$recaptcha('submit') // Execute reCAPTCHA with action "submit"
        const captchaData = {
          'g-recaptcha-response': token,
        }
        payload = { ...payload, ...captchaData }
        await this.$store.dispatch('updateTeamMember', payload)
      },
      async sendInvitation() {
        // set data in fabman
        this.freeSeats[0].firstName = this.newTeamMember.firstName
        this.freeSeats[0].lastName = this.newTeamMember.lastName
        this.freeSeats[0].emailAddress = this.newTeamMember.email
        await this.updateMember()
        // console.log('this.freeSeats[0] update: ', this.freeSeats[0])
        // console.log('send invitation: ', this.newTeamMember)
        const registerAuth0Data = {
          email: this.newTeamMember.email,
          password: '123qwe123!A',
          user_metadata: {
            firstName: this.newTeamMember.firstName,
            lastName: this.newTeamMember.lastName,
            address: '',
            city: '',
            zip: '',
          },
        }
        console.log('registerAuth0Data: ', registerAuth0Data)
        const resultRegister = await this.$store.dispatch('registerUser', registerAuth0Data)
        console.log('result: ', resultRegister)
        const data = {
          email: this.newTeamMember.email,
        };
        const resultChangePwd = await this.$store.dispatch("recoverPassword", data);
        console.log('result: ', resultChangePwd)
        await this.reload()
          }
      },
  }
</script>
