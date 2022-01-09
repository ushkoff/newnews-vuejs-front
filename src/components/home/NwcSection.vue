<template lang="pug">
  .nwc-home-section(class="row mt-5")
    .main-nwc-logo(
      class="col-12 col-lg-4"
      :style="{'background-image': `url('${publicPath}assets/img/pages/home/sections/about-nwc/nwc-outline-icon.jpg')`}"
    )
    .main-nwc-table(class="col-12 col-lg-8 pl-lg-5 pt-4 pt-lg-0")
      blockquote(class="pr-5 mr-3 mr-lg-5 mt-4 mb-4") "Newscoin — it's payment in the first decentralized media in the world. Your key to share news and receive coins. Using newscoin and NewNews platform you don't need other info sources anymore. Resource created by people for people. Info sharing will change forever..."
      table(class="table table-striped" :style="{'background-image': `url('${publicPath}assets/img/pages/home/sections/about-nwc/background.jpg')`}")
        tbody
          tr
            td(class="pt-3 pb-3 pr-3") <span>●</span> Binary structure of the system — <b>Nthread and Dthread</b>
          tr
            td(class="pt-3 pb-3 pr-3") <span>●</span> <b>BlockProof</b> — deleting blockchain is possible now! Dynamic blockchain cleaning using Azula protocol.
          tr
            td(class="pt-3 pb-3 pr-3") <span>●</span> <b>Proof of Foresee</b> — new consensus algorithm. No mining, no stakeholding — burn your stakes and wait for the queue. Splitting of rewards to increase general system's safety.
          tr
            td(class="pt-3 pb-3 pr-3") <span>●</span> <b>Effective like/dislike system</b> created specially for NewNews platform. Not just clicks — hard algorithm under the hood following which we can solve the inflation problem and create the permanent necessity of coins in the system.

      router-link(
        :to="{ name: 'nwc' }"
        class="read-more-nwc"
      ) Read more <i class="fas fa-angle-double-right"></i>

</template>

<script>
export default {
  name: 'nwc-section',
  data: () => ({
    publicPath: process.env.BASE_URL
  })
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/utils/vars';
@import '@/assets/scss/utils/mixins';

.nwc-home-section {
  .main-nwc-logo {
    @include bgImage;
    background-size: contain;
    @media screen and (max-width: $smDesktopWidth) {
      height: 320px;
    }
  }
  .main-nwc-table {
    blockquote {
      font-family: 'Montserrat';
      font-size: rem(18px);
      font-style: italic;
      color: $purple-font-base;
    }
    .table {
      line-height: rem(27px);
      @include bgImage;
    }
  }
  .read-more-nwc {
    @include readMoreBtn;
    font-size: rem(25px);
    font-weight: 400;
    position: relative;
    top: 50px;
    .fa-angle-double-right {
      top: 2px;
    }
  }
}
</style>
