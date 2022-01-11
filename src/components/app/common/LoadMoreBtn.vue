<template lang="pug">
  div
    .load-more-btn(
      @click="$emit('click')"
      :class="addClass"
      class="mx-auto d-flex justify-content-center align-items-center"
    )
      <i class="fas fa-angle-double-down"></i>
</template>

<script>
export default {
  name: 'load-more-btn',
  props: { addClass: String }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/utils/vars';
@import '@/assets/scss/utils/mixins';

.load-more-btn {
  @include size(75px);
  border-radius: 50%;
  border: 2px solid $purple-font-base;
  &:hover {
    .fa-angle-double-down {
      margin-top: 10px;
    }
  }
  cursor: pointer;
  .fa-angle-double-down {
    @include trans01s;
    color: $purple-font-base;
    font-size: 25px;
  }
  @media screen and (max-width: $smDesktopWidth) {
    @include size(60px);
    .fa-angle-double-down {
      font-size: 20px;
    }
  }
}

.style-for-large-content {
  margin: 102.5px auto;
}
.style-for-medium-content {
  margin: 50px auto;
}
</style>
