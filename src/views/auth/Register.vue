<template lang="pug">
  .login-register-page-bg(:style="{'background-image': `url('${publicPath}assets/img/pages/auth/background.jpg')`}")
    //- Google ReCaptcha
    vue-recaptcha(
      ref="recaptcha"
      size="invisible"
      :sitekey="sitekey"
      @verify="submitHandler"
      @expired="onCaptchaExpired"
    )

    NewnewsLoader(v-if="loading")

    .login-register-form-container(v-else class="shadow p-5")
      router-link(:to="{ name: 'home' }" class="company-name") {{ appTitle }}
      span.company-website(class="ml-1") {{ appUrl }}
      form.main-form(@submit.prevent="validate" class="mt-4")
        div
          label(for="usernameField") Username
          input.auth-input(
            type="text" v-model.trim="username" id="usernameField" class="p-3" maxlength="25"
            :class="{invalid: ($v.username.$dirty && (!$v.username.required || !$v.username.minLength)) || (!isUsernameValid)}"
          )
          .nn-def-input-error(v-if="$v.username.$dirty && !$v.username.required" class="mt-2") "Username" field is required
          .nn-def-input-error(v-if="$v.username.$dirty && !$v.username.minLength" class="mt-2") "Username" field is too short
          .nn-def-input-error(v-if="$v.username.$dirty && !$v.username.maxLength" class="mt-2") "Username" field is too long
          .nn-def-input-error(v-if="!isUsernameValid" class="mt-2") Username should only accept Latin letters and numbers
        div(class="mt-3")
          label(for="emailField") Email Address
          input.auth-input(
            type="text" v-model.trim="email" id="emailField" class="p-3" maxlength="256"
            :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
          )
          .nn-def-input-error(v-if="$v.email.$dirty && !$v.email.required" class="mt-2") "Email" field is required
          .nn-def-input-error(v-if="$v.email.$dirty && !$v.email.email" class="mt-2") Please enter a valid email
        div(class="mt-3")
          label(for="passwordField") Password
          input.auth-input(
            type="password" v-model.trim="password" id="passwordField" maxlength="101" class="p-3"
            :class="{invalid: ($v.password.$dirty && !$v.password.required) || (!isPasswordValid)}"
          )
          .nn-def-input-error(v-if="$v.password.$dirty && !$v.password.required" class="mt-2") "Password" field is required
          .nn-def-input-error(v-if="$v.password.$dirty && !$v.password.minLength" class="mt-2") "Password" field is too short
          .nn-def-input-error(v-if="$v.password.$dirty && !$v.password.maxLength" class="mt-2") "Password" field is too long
          .nn-def-input-error(v-if="!isPasswordValid" class="mt-2") Password should only accept Latin letters and numbers
        div(class="mt-3")
          label(for="confirmPasswordField") Confrim Password
          input.auth-input(
            type="password" v-model.trim="confirmPassword" id="confirmPasswordField" maxlength="101" class="p-3"
            :class="{invalid: ($v.confirmPassword.$dirty && !$v.confirmPassword.sameAsPassword)}"
          )
          .nn-def-input-error(v-if="$v.confirmPassword.$dirty && !$v.confirmPassword.sameAsPassword" class="mt-2") Passwords must be identical

        <label for="agreeDocuments" class="login-register-checkbox mt-4"> I agree to the NewNews <router-link :to="{name: 'privacy-policy'}">Privacy Policy</router-link>.
          input(type="checkbox" v-model="agreeDocuments" id="agreeDocuments")
          span.checkmark
        </label>
        .nn-def-input-error(v-if="$v.agreeDocuments.$dirty && !$v.agreeDocuments.checked" class="mt-1") Please agree to the privacy policy

        .nn-def-input-error(
          v-if="errMsg != null"
          class="server-side-errors mt-3"
        ) {{ errMsg }}

        button(type="submit" class="mt-4") Sign Up
        .under-submit-links(class="d-flex justify-content-between mt-2")
          router-link(:to="{ name: 'login' }" class="d-block") Sign In

        router-link(:to="{ name: 'global-news' }" class="back-btn mt-4")
          <i class="fas fa-long-arrow-alt-left mr-1"></i>
          span Back to News

</template>

<script>
import { required, email, sameAs, minLength, maxLength } from 'vuelidate/lib/validators'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'register-page',
  data: () => ({
    loading: false,
    publicPath: process.env.BASE_URL,
    appTitle: process.env.VUE_APP_TITLE,
    appUrl: process.env.VUE_APP_URL,
    sitekey: process.env.VUE_APP_RECAPTCHA_SITE_KEY,

    username: '',
    email: '',
    country: '',
    timezone: '',
    password: '',
    confirmPassword: '',
    agreeDocuments: false,
    errMsg: null,
    regex: /^[a-zA-Z0-9]*$/
  }),
  validations: {
    username: { required, minLength: minLength(2), maxLength: maxLength(25) },
    email: { required, email, maxLength: maxLength(256) },
    password: { required, minLength: minLength(10), maxLength: maxLength(101) },
    confirmPassword: { sameAsPassword: sameAs('password') },
    agreeDocuments: { checked: v => v }
  },
  computed: {
    ...mapGetters(['countryData']),
    countryCode: {
      get () { return decodeURI(this.$route.query.countryCode) },
      set (newCode) { return newCode }
    },
    isUsernameValid () { return (this.username).match(this.regex) },
    isPasswordValid () { return (this.password).match(this.regex) }
  },
  methods: {
    ...mapActions(['register', 'getCountryByCode']),

    validate () {
      if (this.country === '' || this.timezone === '') {
        this.showLocationError()
        return false
      }
      if (this.$v.$invalid || (this.isUsernameValid === null) || (this.isPasswordValid === null)) {
        this.$v.$touch()
        return false
      }
      this.$refs.recaptcha.execute()
    },
    onCaptchaExpired () {
      this.$refs.recaptcha.reset()
    },
    async submitHandler (recaptchaToken) {
      this.loading = true

      const data = {
        username: this.username,
        email: this.email,
        password: this.password,
        country: this.country,
        countryCode: this.countryCode,
        timezone: this.timezone,
        recaptchaToken
      }
      await this.register(data).then(() => {
        this.$swal.fire(
          'Success',
          `A confirmation link sent to your email <br>  (${this.email})`,
          'success'
        )
        this.$router.push({ name: 'home' })
      }).catch((errMsg) => {
        this.loading = false
        this.errMsg = errMsg

        this.$refs.recaptcha.reset()
      })
    },

    async checkIfCountrySelected () {
      if (!this.countryCode || this.countryCode === 'undefined' || this.countryCode === '') {
        this.$swal.fire({
          title: 'Country?',
          text: 'To show you local news, we need to know your country',
          icon: 'question',
          allowOutsideClick: false
        }).then((result) => {
          if (result.value) this.$router.push({ name: 'select-location' })
        })
      } else {
        await this.loadCountryData()
      }
    },
    async loadCountryData () {
      await this.getCountryByCode(this.countryCode).then(() => {
        this.country = this.countryData.name
        this.timezone = this.countryData.timezones[0]
      }).catch((e) => {
        this.showLocationError()
        throw e
      })
    },

    showLocationError () {
      this.$swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Your country data is invalid.',
        confirmButtonText: 'Turn back',
        allowOutsideClick: false
      }).then((result) => {
        if (result.value) this.$router.push({ name: 'select-location' })
      })
    },
    clearVariables (countryCode) {
      this.countryCode = countryCode
      this.username = ''
      this.email = ''
      this.password = ''
      this.confirmPassword = ''
      this.agreeDocuments = false
      this.errMsg = null
      this.timezone = ''
    }
  },
  async mounted () {
    await this.checkIfCountrySelected()
  },
  beforeRouteUpdate (to, from, next) {
    if (to.name === 'register') {
      next()
      this.clearVariables(to.query.countryCode)
    }
    next()
  }
}
</script>

<style lang="scss" scoped>
// @import '@/assets/scss/utils/vars';
// @import '@/assets/scss/utils/mixins';

.nn-def-input-error {
  color: #fff
}
</style>
