<template lang="pug">
  div
    .only-confirmed-btn(
      :class="addClass"
    )
      input#onlyConfirmedCheck(
        type="checkbox"
        class="mr-2"
        @change="$emit('change', $event.target.checked)"
        :checked="checked"
      )
      label(for="onlyConfirmedCheck") {{ title }}

</template>

<script>
export default {
  name: 'checkbox-component',
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    title: String,
    checked: Boolean,
    addClass: String
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/utils/vars';
@import '@/assets/scss/utils/mixins';

.only-confirmed-btn {
  display: flex;
  align-items: center;
  font-family: 'Montserrat';
  color: $grey-font-for-bg;
  font-size: rem(14px);
  font-weight: 500;
  label {
    position: relative;
    bottom: -4px;
  }
}

</style>
