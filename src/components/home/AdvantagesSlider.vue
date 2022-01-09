<template lang="pug">
  div
    section.advantages-slider
      swiper(:options="swiperOption" ref="mySwiper")
        swiper-slide
          .slider-component(
            class="swiper-lazy"
            :data-background="`${publicPath}assets/img/pages/home/advantages-slider/decentralization.jpeg`"
          )
            .swiper-lazy-preloader
            .container
              .slider-img-desc(class="col-fhd-3 col-xl-4 col-lg-5 col-md-8 col-12  mx-auto p-4 d-flex align-items-center")
                .img-icon <i class="fas fa-university"></i>
                div(class="ml-4")
                  .img-title Decentralization
                  .img-desc The advantage of our cryptocurrency is decentralization.
        swiper-slide
          .slider-component(
            class="swiper-lazy"
            :data-background="`${publicPath}assets/img/pages/home/advantages-slider/your-news.jpg`"
          )
            .swiper-lazy-preloader
            .container
              .slider-img-desc(class="col-fhd-3 col-xl-4 col-lg-5 col-md-8 col-12  mx-auto p-4 d-flex align-items-center")
                .img-icon <i class="fas fa-align-center"></i>
                div(class="ml-4")
                  .img-title Your news
                  .img-desc On our site you can among the first to add your interesting news.
        swiper-slide
          .slider-component(
            class="swiper-lazy"
            :data-background="`${publicPath}assets/img/pages/home/advantages-slider/earn-nwc.jpeg`"
          )
            .swiper-lazy-preloader
            .container
              .slider-img-desc(class="col-fhd-3 col-xl-4 col-lg-5 col-md-8 col-12  mx-auto p-4 d-flex align-items-center")
                .img-icon <i class="fas fa-hand-holding-usd"></i>
                div(class="ml-4")
                  .img-title Receive NWC
                  .img-desc Get rewarded for your true news in NewsCoin.

    <button class="prev-arrow arrow left">
      <svg width="60px" height="80px" viewBox="0 0 50 80" xml:space="preserve">
        <polyline fill="none" stroke="#5C5A5A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" points="45.63,75.8 0.375,38.087 45.63,0.375"/>
      </svg>
    </button>
    <button class="next-arrow arrow right">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="60px" height="80px" viewBox="0 0 50 80" xml:space="preserve">
        <polyline fill="none" stroke="#5C5A5A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" points="0.375,0.375 45.63,38.087 0.375,75.8 "/>
      </svg>
    </button>

</template>

<script>
export default {
  name: 'advantages-slider',
  data: () => ({
    publicPath: process.env.BASE_URL,
    swiperOption: {
      speed: 500,
      loop: true,
      autoplay: {
        delay: 10000
      },
      navigation: {
        nextEl: '.next-arrow',
        prevEl: '.prev-arrow'
      },
      preloadImages: false,
      lazy: {
        loadOnTransitionStart: true
      }
    }
  }),
  computed: {
    swiper () { return this.$refs.mySwiper.swiper }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/utils/vars';
@import '@/assets/scss/utils/mixins';

.advantages-slider {
  .slider-component {
    height: 100vh;
    @include bgImage();
    position: relative;
    .slider-img-desc {
      background-color: $grey-bg-base-trans;
      position: absolute;
      left: 50%;
      transform: translate(-50%, 0);
      bottom: 80px;
      @media screen and (max-width: $smDesktopWidth) {
        bottom: 40px;
      }
      @media screen and (max-width: $tableWidth) {
        bottom: 0 !important;
      }
      .fa-align-center, .fa-hand-holding-usd, .fa-university {
        color: $grey-icon-base;
        font-size: 80px;
        opacity: 0.75;
      }
      .img-title {
        font-size: rem(18px);
        font-weight: 700;
        line-height: 38px;
        color: $grey-font-title;
      }
      .img-desc {
        font-size: rem(16px);
        line-height: 22px;
        color: $grey-font-title;
      }
    }
  }
}
// arrows
button {
  z-index: 1;
  -webkit-appearance: none;
  background: transparent;
  border: 0 !important;
  outline:0 !important;
}
.arrow {
  cursor: pointer;
  position: absolute;
  top: 50%;
  margin-top: -45px;
  width: 70px;
  height: 90px;
}
.left {
  left: 7%;
  @media screen and (max-width: $phoneWidth) {
      left: 0;
  }
}
.right {
  right: 7%;
  @media screen and (max-width: $phoneWidth) {
      right: 0;
  }
}
.left:hover polyline,
.left:focus polyline {
  stroke-width: 3;
}
.left:active polyline {
  stroke-width: 6;
  transition: all 100ms ease-in-out;
}
.right:hover polyline,
.right:focus polyline {
  stroke-width: 3;
}
.right:active polyline {
  stroke-width: 6;
  transition: all 100ms ease-in-out;
}
polyline {
  transition: all 250ms ease-in-out;
}
</style>
