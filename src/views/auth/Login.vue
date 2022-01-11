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
          label(for="emailField") Email Address
          input.auth-input(
            type="text" v-model.trim="email" id="emailField" class="p-3" maxlength="256"
            :class="{invalid: ($v.email.$dirty && (!$v.email.required || !$v.email.email)) }"
          )
          .nn-def-input-error(v-if="$v.email.$dirty && !$v.email.required" class="mt-2") "Email" field is required
          .nn-def-input-error(v-if="$v.email.$dirty && !$v.email.email" class="mt-2") Please enter a valid email
        div(class="mt-3")
          label(for="passwordField") Password
          input.auth-input(
            type="password" v-model.trim="password" id="passwordField" maxlength="101" class="p-3" autocomplete="on"
            :class="{invalid: ($v.password.$dirty && (!$v.password.required || !$v.password.minLength))}"
          )
          .nn-def-input-error(v-if="$v.password.$dirty && !$v.password.required" class="mt-2") "Password" field is required
          .nn-def-input-error(v-if="$v.password.$dirty && !$v.password.minLength" class="mt-2") Password is too short

        .nn-def-input-error(
          v-if="errMsg != null"
          class="server-side-errors mt-3"
        ) {{ errMsg }}

        //- Resend email confirmation letter
        .nn-def-input-error(
          v-if="emailConfirmResendBtn"
          class="email-resend-button server-side-errors mt-3"
        ) If you are sure that the letter did not arrive, you can <a @click.prevent="resendEmailHandler">resend the letter</a>.

        button(type="submit" class="mt-4") Sign In
        .under-submit-links(class="d-flex justify-content-between mt-2")
          router-link(:to="{ name: 'register' }" class="d-block") Sign Up
          router-link(:to="{ name: 'lost-password' }" class="d-block") Lost your password?

        router-link(:to="{ name: 'global-news' }" class="back-btn mt-4")
          <i class="fas fa-long-arrow-alt-left mr-1"></i>
          span Back to News

</template>

<script>
import { required, email, minLength, maxLength } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'

export default {
  name: 'login-page',
  metaInfo () {
    return { title: this.$title('Login') }
  },
  data: () => ({
    loading: false,
    publicPath: process.env.BASE_URL,
    appTitle: process.env.VUE_APP_TITLE,
    appUrl: process.env.VUE_APP_URL,
    sitekey: process.env.VUE_APP_RECAPTCHA_SITE_KEY,

    email: '',
    password: '',
    errMsg: null,
    emailConfirmResendBtn: false
  }),
  validations: {
    email: { required, email, maxLength: maxLength(256) },
    password: { required, minLength: minLength(10), maxLength: maxLength(101) }
  },
  methods: {
    ...mapActions(['login', 'resendEmailConfirmation']),

    async submitHandler (recaptchaToken) {
      this.loading = true
      
      const data = {
        email: this.email,
        password: this.password,
        recaptchaToken
      }

      await this.login(data).then(() => {
        this.$router.push({ name: 'global-news' })
      }).catch((errMsg) => {
        this.loading = false
        this.errMsg = errMsg

        // Recognizing error about not verified email
        const regex = /confirm|verify/
        if (errMsg.match(regex))
            this.emailConfirmResendBtn = true

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
    },
    async resendEmailHandler () {
      await this.resendEmailConfirmation(this.email).then(() => {
        this.$swal.fire(
          'Success', 'A confirmation link sent to your email', 'success'
        )
        this.$router.push({ name: 'global-news' })
      }).catch((errMsg) => {
        this.$swal.fire(
          'Ooops...', errMsg, 'error'
        )
      })
    },
    clearVariables () {
      this.login = ''
      this.password = ''
      this.errMsg = null
      this.emailConfirmResendBtn = false
    }
  },
  mounted () {
    // If user went from "successful email verification" link
    if (this.$route.query.verification === 'true') {
      this.$swal.fire(
        'Success',
        'Your email verified successfully!',
        'success'
      )
    }
  },
  beforeRouteUpdate (to, from, next) {
    if (to.name === 'login') {
      next()
      this.clearVariables()
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
.email-resend-button {
  font-size: rem(14px);
  a {
    cursor: pointer;
    font-style: italic;
    text-decoration: underline;
  }
}
</style>
