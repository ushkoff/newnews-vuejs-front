<template lang="pug">
  .user-auth-navbar
    ul(class="p-0 m-0 d-flex justify-content-center justify-content-md-end flex-wrap")
      router-link(
        v-for="link in navLinks"
        :key="link.route"
        :to="{ name: link.route }"
        tag="li"
        active-class="active"
        class="m-3"
      )
        a(href="#") <i :class="link.faIcon" class="mr-1"></i> <span>{{ link.title }}</span>

</template>

<script>
import authNavList from '@/config/navigation/auth'

export default {
  name: 'auth-navbar',
  data: () => ({
    navLinks: authNavList.authNavLinks
  })
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/utils/vars';
@import '@/assets/scss/utils/mixins';

.user-auth-navbar {
  background-color: $grey-bg-base;
  ul {
    li a {
      font-family: 'Montserrat';
      font-size: rem(16px);
      color: $grey-font-for-bg;
      text-decoration: none;
      .fa-newspaper, .fa-wallet, .fa-cog, .fa-question-circle
      { color: $grey-icon-base }
    }
    li.active {
      a span { text-decoration: underline }
    }
  }
}
</style>
