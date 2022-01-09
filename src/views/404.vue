<template lang="pug">
  .page-not-found(class="text-center")
    .page-not-found-title(class="d-block mb-2") 404
    span Page not found<br><br>
    a(
      @click="$router.go(-1)"
      class="go-back-btn"
    ) Go back

</template>

<script>
export default {
  name: 'page-404',
  metaInfo () {
    return { title: this.$title('Page not found') }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/utils/vars';
@import '@/assets/scss/utils/mixins';

.page-not-found {
  display: block;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  &-title {
    font-family: 'Montserrat';
    font-size: rem(80px);
    line-height: rem(80px);
    color: $error-color;
  }
  span {
    font-size: rem(14px);
  }
  .go-back-btn {
    font-size: rem(16px);
    font-weight: 600;
    text-decoration: underline;
    color: $link-blue-base;
    &:hover {
      cursor: pointer;
      color: $link-blue-base;
    }
  }
}
</style>
