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
        div(class="mt-3")
          label(for="emailField") Email Address
          input.auth-input(
            type="text" v-model.trim="email" id="emailField" class="p-3" maxlength="256"
            :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
          )
          .nn-def-input-error(v-if="$v.email.$dirty && !$v.email.required" class="mt-2") "Email" field is required
          .nn-def-input-error(v-if="$v.email.$dirty && !$v.email.email" class="mt-2") Please enter a valid email

        <label for="agreeDocuments" class="login-register-checkbox mt-4"> I agree to the NewNews <router-link :to="{name: 'privacy-policy'}">Privacy Policy</router-link>.
          input(type="checkbox" v-model="agreeDocuments" id="agreeDocuments")
          span.checkmark
        </label>
        .nn-def-input-error(v-if="$v.agreeDocuments.$dirty && !$v.agreeDocuments.checked" class="mt-1") Please agree to the privacy policy

        .nn-def-input-error(
          v-if="errMsg != null"
          class="server-side-errors mt-3"
        ) {{ errMsg }}

        button(type="submit" class="mt-4") Change
        .under-submit-links(class="d-flex justify-content-between mt-2")
          router-link(:to="{ name: 'login' }" class="d-block") Sign In
          router-link(:to="{ name: 'register' }" class="d-block") Sign Up

        router-link(:to="{ name: 'global-news' }" class="back-btn mt-4")
          <i class="fas fa-long-arrow-alt-left mr-1"></i>
          span Back to News

</template>

<script>
import { required, email, maxLength } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'

export default {
  name: 'lost-password',
  data: () => ({
    loading: false,
    publicPath: process.env.BASE_URL,
    appTitle: process.env.VUE_APP_TITLE,
    appUrl: process.env.VUE_APP_URL,
    sitekey: process.env.VUE_APP_RECAPTCHA_SITE_KEY,

    email: '',
    agreeDocuments: false,
    errMsg: null
  }),
  validations: {
    email: { required, email, maxLength: maxLength(256) },
    agreeDocuments: { checked: v => v }
  },
  methods: {
    ...mapActions(['requestPasswordReset']),

    async submitHandler (recaptchaToken) {
      this.loading = true

      const data = {
        email: this.email,
        recaptchaToken
      }
      await this.requestPasswordReset(data).then(() => {
        this.$swal.fire(
          'Success',
          `A confirmation link sent to your email <br> (${this.email})`,
          'success'
        )
        this.$router.push({ name: 'home' })
      }).catch(errMsg => {
        console.log(errMsg)

        this.loading = false
        this.errMsg = errMsg

        this.$refs.recaptcha.reset()
      })
    },
    validate () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return false
      }
      this.$refs.recaptcha.execute()
    },
    onCaptchaExpired () {
      this.$refs.recaptcha.reset()
    }
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
