<template lang="pug">
  .login-register-page-bg(:style="{'background-image': `url('${publicPath}assets/img/pages/auth/background.jpg')`}")

    NewnewsLoader(v-if="loading")

    .login-register-form-container(v-else class="shadow p-5")
      router-link(:to="{ name: 'home' }" class="company-name") {{ appTitle }}
      span.company-website(class="ml-1") {{ appUrl }}
      form.main-form(@submit.prevent="submitHandler" class="mt-4")
        div
          label(for="chooseCountryField") Country
          select.auth-input(
            id="chooseCountryField"
            v-model.trim="countryCode"
            :class="{invalid: countryIsEmpty}"
          )
            option(selected="selected" value="choose" disabled) Choose your country
            option(
              v-for="country in countries"
              :key="country.alpha2Code"
              :value="country.alpha2Code"
            ) {{ country.name }}
          .nn-def-input-error(v-if="countryIsEmpty" class="mt-2") "Country" field is required

        button(type="submit" class="mt-5") OK

</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'select-location',
  data: () => ({
    loading: true,
    publicPath: process.env.BASE_URL,
    appTitle: process.env.VUE_APP_TITLE,
    appUrl: process.env.VUE_APP_URL,

    countryCode: 'choose',
    countries: null,
    countryIsEmpty: false
  }),
  computed: mapGetters(['allCountries']),
  methods: {
    ...mapActions(['fetchAllCountries']),

    async submitHandler () {
      if (this.countryCode === 'choose') {
        this.countryIsEmpty = true
        return false
      } else {
        this.countryIsEmpty = false
      }

      this.$swal.fire({
        title: 'Success',
        text: 'Back to registration page',
        icon: 'success',
        allowOutsideClick: false
      })
      this.$router.push({
        name: 'register',
        query: {
          countryCode: encodeURI(this.countryCode)
        }
      })
    },

    async getCountries () {
      await this.fetchAllCountries().then(() => {
        this.countries = this.allCountries
        this.loading = false
      })
    },
  },
  async mounted () {
    await this.getCountries()
  }
}
</script>

<style lang="scss" scoped>
// @import '@/assets/scss/utils/vars';
// @import '@/assets/scss/utils/mixins';

.nn-def-input-error {
  color: #fff;
}
.login-register-form-container {
  width: 550px;
  @media (max-width: 550px) {
    width: 100%;
  }
}
</style>
