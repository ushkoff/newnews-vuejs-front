<template lang="pug">
  div
    .refresh-btn(
      @click="$emit('click')"
      :class="addClass"
    )
      <i class="fas fa-sync"></i>

</template>

<script>
export default {
  name: 'refresh-btn',
  props: { addClass: String }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/utils/vars';
@import '@/assets/scss/utils/mixins';

.refresh-btn {
  display: inline-block;
  font-size: rem(20px);
  cursor: pointer;
  .fa-sync {
    color: $blue-font-light;
  }
  transform: rotate(0);
  @include trans02s;
  &:hover { transform: rotate(30deg) }
}
</style>
