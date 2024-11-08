<template>
  <div>
    <loading-spinner v-if="loading"></loading-spinner>
    <div v-if="!loading && freeSeats && team && team.length > 0" class="section">
<!--      show add new member to team if seats are free-->
      <div v-if="freeSeats.length > 0">
        <form class="flex flex-col gap-4 mx-4 sm:mx-0 sm:mr-4" @submit.prevent="sendInvitation">
          <h2>Teammitglied hinzufügen ({{this.freeSeats.length}}/{{this.team.length}} Plätze verfügbar)</h2>
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
<!--      <div v-if="freeSeats.length === 0">-->
<!--        <h2> ({{this.freeSeats.length}}/{{this.team.length}} Plätze verfügbar)</h2>-->
<!--      </div>-->

      <h2 class="mt-6">Team ({{this.freeSeats.length}}/{{this.team.length}} Plätze verfügbar)</h2>
<!--      <div v-if="freeSeats.length === 0">-->
<!--        <h2>Team ({{this.freeSeats.length}}/{{this.team.length}} Plätze verfügbar)</h2>-->
<!--      </div>-->
      <form v-for="member in team" :key="member.id"  class="flex flex-col gap-4 mx-4 sm:mx-0 sm:mr-4 mt-6" @submit.prevent="cancelTeamMember(member)">
        <div v-if="member.emailAddress && member.emailAddress !== ''">
          <hr class="my-4">
          <h3>{{ member.firstName }} {{member.lastName}}</h3>

          <TextInput :label="'Vorname'" v-model="member.firstName"  :isContact="true" :disabled="true"/>
          <TextInput :label="'Nachname'" v-model="member.lastName"  :isContact="true" :disabled="true"/>
          <TextInput :label="'E-Mail Adresse'" v-model="member.emailAddress"  :isContact="true" :disabled="true"/>

<!--          <div class="flex justify-center w-full sm:justify-end">-->
<!--                      <div v-if="loading">Saving…</div>-->
<!--                      <button-->
<!--                        v-else-->
<!--                        type="submit"-->
<!--                        class="w-full py-2 mt-6 text-white rounded-sm bg-red ring-2 ring-red-300 cursor:pointer disabled:cursor-default disabled:bg-gray-700 disabled:ring-gray-300 sm:max-w-max sm:px-12 hover:bg-gray-900 hover:ring-gray-300"-->
<!--                        >-->
<!--                        &lt;!&ndash;          <font-awesome-icon icon="save" />&ndash;&gt;-->
<!--                        kündigen-->
<!--                      </button>-->
<!--          </div>-->
          <p class="my-8">
            Bitte kontaktiere den
            <a href="mailto:frontdesk@grandgarage.eu">Frontdesk</a> um die Mitgliedschaft anzupassen.
          </p>
          <p>Mitgliedschaften laufen bei einer Kündigung immer bis zum letzten Tag des nächsten Monats. </p>
          <p>Wenn du eine Mitgliedschaft jetzt beendest, dann läuft die Mitgliedschaft bis: <strong> {{new Date(getCancelDate()).toLocaleDateString('DE', { day: '2-digit',month: 'long',year: 'numeric' })}} </strong></p>
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
        const team = await this.$store.dispatch("getTeam", this.$store.state.member.id)
        this.$store.commit('setTeam', team);
        // get team
        this.team = this.$store.state.team;
        // get free seats
        this.freeSeats = this.team.filter((member)=>{
          return (member.emailAddress === null || member.emailAddress === '')
        })
        if (this.freeSeats.length > 0) {
          this.$store.commit('setHasTeamFreeSeats', true)
        } else {
          this.$store.commit('setHasTeamFreeSeats', false)
        }
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
        this.loading=true
        // check mail address (free & valid)
        const isMailValid = await this.checkMail(this.newTeamMember.email);
        if (isMailValid) {
          // set data in fabman
          this.freeSeats[0].firstName = this.newTeamMember.firstName
          this.freeSeats[0].lastName = this.newTeamMember.lastName
          this.freeSeats[0].emailAddress = this.newTeamMember.email
          await this.updateMember()
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
          await this.$store.dispatch('registerUser', registerAuth0Data)
          const data = {
            email: this.newTeamMember.email,
          };
          await this.$store.dispatch("recoverPassword", data);
          await this.reload()
        }
        this.loading=false


        },
      async cancelTeamMember($member) {
        // TODO cancel
        //console.log('$member: ', $member)
      },
      getCancelDate() {
        const today = new Date(); // Aktuelles Datum
        const year = today.getFullYear();
        const month = today.getMonth(); // Monate sind 0-basiert (0 = Januar, 11 = Dezember)

        // Letzter Tag des nächsten Monats (kein Problem mit Zeitzonen)
        let cancelDate = new Date(Date.UTC(year, month + 2, 1));
        cancelDate.setUTCDate(cancelDate.getUTCDate() - 1);

        return cancelDate.toISOString(); // Im ISO 8601-Format
      },
      async checkMail(eMailAddress) {
        let payload = {
          email: eMailAddress,
        }
        // get captcha token for password check
        await this.$recaptchaLoaded()
        let token = await this.$recaptcha('submit') // Execute reCAPTCHA with action "submit"
        let captchaData = {
          'g-recaptcha-response': token,
        }
        payload = { ...payload, ...captchaData }
        try {
          await this.$store.dispatch('checkMail', payload)

          //this.loadingCheckEmailStatus = 'E-Mail Adresse ist verfügbar'
          return true
          }
          catch (e) {
          // this.loadingEmail = false
          // this.mailCheck = false
          const errorStatus = e?.response?.status

          if (e.error) {
            this.errorMessage = 'Ein Fehler ist aufgetreten: "' + e.error + '"'
          }

          if (errorStatus) {
            switch (errorStatus) {
              case 401:
                this.$toast.show('Ein User mit dieser Email Adresse existiert bereits.', {
                  theme: 'bubble',
                })
                break
              case 429:
                this.$toast.show('E-Mail-Verifizierung nicht möglich. Bitte warten, um Fehler zu vermeiden.', {
                  theme: 'bubble',
                })
                break
              default:
                this.$toast.show('Ein Fehler ist aufgetreten. ', e.code, {
                  theme: 'bubble',
                })
                break
            }
            // this.mailCheck = false
          }
        }
      },

      },
  }
</script>
