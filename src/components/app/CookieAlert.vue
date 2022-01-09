<template lang="pug">
  .cookie-attention(v-if="!isCookieAccepted")
    .container
      div(class="p-2 d-flex justify-content-center align-items-center")
        p(class="m-0")
          | Our website uses cookies: <router-link :to="{ path: 'privacy-policy' }" class="cookie-policy-link">Privacy Policy</router-link> 
        button.agree-cookie-btn(
          @click="acceptCookie"
          class="pt-2 pb-2 pl-4 pr-4 pl-md-5 pr-md-5 rounded"
        ) OK
</template>

<script>
import cfg from '@/config/common'

export default {
  name: 'cookie-alert',
  data: () => ({
    cookieAlertExpiresInDays: cfg.cookieAlertExpiresInDays,
    isCookieAccepted: false
  }),
  methods: {
    getCookieAccepted() {
      this.isCookieAccepted = this.$cookie.get('acceptedCookie') != null
    },
    acceptCookie () {
      this.$cookie.set('acceptedCookie', true, parseInt(this.cookieAlertExpiresInDays), null, null, true, 'Lax')
      this.getCookieAccepted()
    }
  },
  mounted() {
    this.getCookieAccepted()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/utils/vars';
@import '@/assets/scss/utils/mixins';

.cookie-attention {
  z-index: 1500;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: $black-bg-base-trans;
  @include trans01s;
  p {
    font-size: rem(12px);
    color: $grey-font-light-header;
    a {
      color: $grey-font-light-header;
      text-decoration: underline;
    }
  }
  .agree-cookie-btn {
    width: 100px;
    margin-left: 25px;
    border: 2px dashed $success-color !important;
    background-color: transparent;
    font-family: 'Montserrat';
    font-size: rem(14px);
    font-weight: 500;
    color: $success-color;
    @include trans01s;
    &:hover {
      border: 2px solid $success-color !important;
    }
  }
}
</style>
