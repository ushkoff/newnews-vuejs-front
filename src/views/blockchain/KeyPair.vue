<template lang="pug">
  div
    .def-page-header(:style="{'background-image': `url('${publicPath}assets/img/pages/blockchain/header.jpg')`}")
      .container(class="d-flex align-items-center justify-content-center justify-content-md-start pt-5")
        span.def-page-header-name(class="pl-4 pr-4 pt-2 pb-2") Key Pair
    .container(class="mt-4 mt-md-5")
      .row
        div(class="col-12 col-xl-8")

          //- attention block
          div(class="pl-4 pr-4 pl-lg-5 pr-lg-5 mb-4")
            .nn-def-description
              span.attention Attention!
              p
                | <span class="bold">The keys issued to you will not be saved in the database! You will not be able to restore them!</span>
                br
                | Copy your keys to a place convenient for you.
                | For a while, the keys will be stored in the site session, but do not rely on this alone!

          //- Change mode block (GET keys or SET existing)
          .profile-settings-block(class="mt-4 ml-4 mr-4 ml-lg-5 mr-lg-5 mt-lg-5")
              span.profile-settings-title
                | Action: {{ actionMode }} | <a href="#">Key Pair</a>
              span.profile-settings-line
              form(class="mt-3")
                .form-check
                  input#radioGet.form-check-input(type="radio" name="radioGet" value="GET" v-model="actionMode")
                  label.form-check-label(for="radioGet") GET
                .form-check(class="mt-2")
                  input#radioSet.form-check-input(type="radio"  name="radioSet" value="SET" v-model="actionMode")
                  label.form-check-label(for="radioSet") SET
          
          //- attention [GET] block
          div(class="pl-4 pr-4 pl-lg-5 pr-lg-5 mt-4")
            .nn-def-description
              span.attention Already have keys?
              p If yes, then switch the mode to <span class="bold">"SET"</span> and enter your keys and 'Nonce' value in the form.

          //- GET [GENERATE] KEYS

          .get-key-pair-form(v-if="actionMode === 'GET'" class="mt-1")
            form.nn-def-form(class="p-4 p-lg-5 pb-5" @submit.prevent="getKeyPair")
              div
                span.nn-def-label 1 Public Key
                div(class="d-flex flex-nowrap pt-2")
                  input#publicKeyField(type="text" :value="publicKey" class="nn-def-input pl-2 pr-2 pl-lg-3 pr-lg-3" readonly placeholder="Your public key will be here...")
                  .nn-def-input-desc(@click="$copy('publicKeyField')" class="copy-btn") Copy
              div(class="mt-4 mt-lg-5")
                span.nn-def-label 2 Secret Key
                div(class="d-flex flex-nowrap pt-2")
                  input#secretKeyField(type="text" :value="secretKey" class="nn-def-input pl-2 pr-2 pl-lg-3 pr-lg-3" readonly placeholder="Your secret key will be here...")
                  .nn-def-input-desc(@click="$copy('secretKeyField')" class="copy-btn") Copy
              button(type="submit" class="d-block mx-auto mt-5") Generate

          //- SET KEYS

          .get-key-pair-form(v-if="actionMode === 'SET'" class="mt-3")
            form.nn-def-form(class="p-4 p-lg-5 pb-5" @submit.prevent="validate")
              div
                span.nn-def-label 1 Public Key
                input#textPublicKey(
                  type="text" :maxlength="maxKeyLength" v-model.trim="textPublicKey" class="nn-def-input pl-2 pr-2 pl-lg-3 pr-lg-3" placeholder="Enter your public key here..."
                  :class="{invalid: ($v.textPublicKey.$dirty && !$v.textPublicKey.minLength)}"
                )
                .nn-def-input-error(v-if="$v.textPublicKey.$dirty && !$v.textPublicKey.minLength" class="mt-2") "Public Key" field is too short
              div(class="mt-4 mt-lg-5")
                span.nn-def-label 2 Secret Key
                input#textSecretKey(
                  type="text" :maxlength="maxKeyLength" v-model.trim="textSecretKey" class="nn-def-input pl-2 pr-2 pl-lg-3 pr-lg-3" placeholder="Enter your secret key here..."
                  :class="{invalid: ($v.textSecretKey.$dirty && !$v.textSecretKey.minLength)}"
                )
                .nn-def-input-error(v-if="$v.textSecretKey.$dirty && !$v.textSecretKey.minLength" class="mt-2") "Secret Key" field is too short
              div(class="mt-4 mt-lg-5")
                span.nn-def-label 3 Nonce
                input#textNonceField(
                  type="text" :maxlength="10" v-model.trim="textNonceField" class="nn-def-input pl-2 pr-2 pl-lg-3 pr-lg-3" placeholder="Enter your nonce value here..."
                  :class="{invalid: ($v.textNonceField.$dirty && !$v.textNonceField.integer)}"
                )
                .nn-def-input-error(v-if="$v.textNonceField.$dirty && !$v.textNonceField.integer" class="mt-2") "Nonce" value must be integer
              button(type="submit" class="d-block mx-auto mt-5") Set

        div(class="col-12 col-xl-4")
          Sidebar

</template>

<script>
import Sidebar from '@/components/app/Sidebar'
import { integer, minLength, maxLength } from 'vuelidate/lib/validators'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'key-pair',
  metaInfo () {
    return { title: this.$title('Key Pair') }
  },
  components: {
    Sidebar
  },
  data: () => ({
    publicPath: process.env.BASE_URL,
    actionMode: 'GET',
    textPublicKey: '',
    textSecretKey: '',
    textNonceField: '',
    maxKeyLength: 256,
    publicKey: '',
    secretKey: ''
  }),
  validations: {
    textPublicKey: { minLength: minLength(5), maxLength: maxLength(257) },
    textSecretKey: { minLength: minLength(5), maxLength: maxLength(257) },
    textNonceField: { integer, maxLength: maxLength(11) }
  },
  computed: mapGetters(['keyPair', 'nonce']),
  methods: {
    ...mapActions(['retrieveKeyPair', 'generateKeyPair', 'setKeyPair']),

    async getKeyPair () {
      await this.generateKeyPair().then(() => {
        this.publicKey = this.keyPair.publicKey
        this.secretKey = this.keyPair.secretKey

        this.$swal.fire(
            'Success',
            "Your keys and 'Nonce' value have been created.\nDO NOT FORGET to save them!",
            'success'
        )
      })
    },
    async saveKeyPair () {
      const data = {
        publicKey: this.textPublicKey,
        secretKey: this.textSecretKey,
        nonce: this.textNonceField
      }

      await this.setKeyPair(data).then(() => {
        this.$router.push({ name: 'add-news' })
        this.$swal.fire(
            'Success',
            'Your keys and `Nonce` value have been updated.',
            'success'
        )
      })
    },
    validate () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return false
      }
      this.saveKeyPair()
    },

    recognizeActionMode () {
      this.retrieveKeyPair()
      if (this.keyPair != null || this.nonce != null) {
        this.actionMode = 'SET'
        this.textPublicKey = this.keyPair.publicKey || ''
        this.textSecretKey = this.keyPair.secretKey || ''
        this.textNonceField = this.nonce || ''
      }
    }
  },
  mounted() {
    this.recognizeActionMode()
  }
}
</script>

<style lang="scss" scoped>
// @import '@/assets/scss/utils/vars';
// @import '@/assets/scss/utils/mixins';

.nn-def-form {
  .copy-btn { cursor: pointer }
}
</style>
