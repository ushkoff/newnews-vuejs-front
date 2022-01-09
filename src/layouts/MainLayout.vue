<template lang="pug">
  div

    Header

    main.content-wrapper
      router-view

    Footer

</template>

<script>
import Header from '@/components/app/Header'
import Footer from '@/components/app/Footer'

export default {
  name: 'main-layout',
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/utils/vars';
@import '@/assets/scss/utils/mixins';

.btn-to-top {
  @include size(50px);
  background-color: $black-bg-lightex-trans !important;
  border: none;
  cursor: pointer;
  transition: all .15s;
  &:hover { background-color: $black-bg-mid-trans !important }
  .fa-angle-up {
    font-size: 20px;
    position: relative;
  }
  @media screen and (max-width: $smDesktopWidth) {
    @include size(40px);
  }
}
</style>
