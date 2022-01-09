<template lang="pug">
  .wrapper
    #app
      CookieAlert

      component(:is="layout")
        router-view
</template>

<script>
import EmptyLayout from '@/layouts/EmptyLayout'
import MainLayout from '@/layouts/MainLayout'
import CookieAlert from '@/components/app/CookieAlert'

export default {
  name: 'App',
  computed: {
    layout () {
      return (this.$route.meta.layout || 'empty') + '-layout'
    }
  },
  components: {
    EmptyLayout,
    MainLayout,
    CookieAlert
  }
}
</script>

<style lang="scss">

@import '@/assets/scss/main';

</style>
