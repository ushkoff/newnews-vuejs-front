<template lang="pug">
  div
    .faq-block(
      v-for="item in FAQ"
      class="mt-4 p-lg-4 p-3"
      @click="toggleFaqBlock"
    )
      .faq-header(class="d-flex justify-content-between align-items-center")
        .faq-block-title {{ item.title }}
        <i class="fas fa-chevron-down ml-3"></i>
      .faq-block-desc(class="mt-3")
        div(v-html="item.description")

</template>

<script>
import cfg from '@/config/FAQ'

export default {
  name: 'faq',
  data: () => ({
    FAQ: cfg.FAQ
  }),
  methods: {
    toggleFaqBlock (event) {
      event.currentTarget.lastChild.classList.toggle('description-active')
      event.currentTarget.firstChild.childNodes[1].classList.toggle('arrow-active')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/utils/vars';
@import '@/assets/scss/utils/mixins';

.faq-block {
  border: 1px solid $grey-line-light;
  cursor: pointer;
  .faq-header {
    .faq-block-title {
      font-family: 'Montserrat';
      font-size: rem(16px);
      font-weight: 400;
      color: $grey-font-dark;
    }
    .fa-chevron-down {
      color: $grey-icon-light;
      transform: rotate(0);
      @include trans01s;
    }
    .arrow-active {
      transform: rotate(180deg);
    }
  }
  .faq-block-desc {
    display: none;
    font-family: 'Source Sans Pro';
    font-size: rem(16px);
    color: $grey-font-dark;
  }
  .description-active {
    display: block !important;
  }
}
.slide-desc-enter-active {
  transition: all .1s ease;
}
.slide-desc-leave-active {
  transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-desc-enter, .slide-desc-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
