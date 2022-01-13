<template lang="pug">
div
  .def-page-header(:style="{'background-image': `url('${publicPath}assets/img/pages/nwc/header.jpg')`}")
    .container(class="d-flex align-items-center justify-content-center justify-content-md-start pt-5")
      span.def-page-header-name(class="pl-4 pr-4") NewsCoin (NWC)
  .container(class="mt-4 mt-md-5")
    //- .main-nwc-page-content(class="row no-gutters")
    //-   .nwc-logo(class="col-12 col-lg-4 col-fhd-3" :style="{'background-image': `url('${publicPath}assets/img/newnews/nwc-logo.png')`}")
    //-   .nwc-page-big-arrow(class="d-none col-fhd-3 text-center d-fhd-flex align-items-center justify-content-center")
    //-     <i class="fas fa-angle-double-right"></i>
    //-   .main-nwc-buttons-container(class="col-12 col-lg-8 col-fhd-6 row no-gutters")
    //-     .main-nwc-button.desktop-nwc-button(class="col-12 col-md-6 p-5 d-flex flex-column align-items-center justify-content-center")
    //-       span.nwc-btn-title(class="text-center") Desktop application
    //-       <i class="nwc-btn-icon mt-4 fas fa-desktop"></i>
    //-       button.nwc-btn-download(class="mt-5") Download

    //-     .main-nwc-button.whitepaper-nwc-button(class="col-12 col-md-6 p-5 d-flex flex-column align-items-center justify-content-center")
    //-       span.nwc-btn-title(class="text-center") Whitepaper.pdf
    //-       <i class="nwc-btn-icon mt-4 far fa-file-pdf"></i>
    //-       a.nwc-btn-download(
    //-         @click="downloadWhitepaper"
    //-         class="mt-5"
    //-       ) Download

    .nwc-page-online-whitepaper(class="mt-2 mt-lg-5 pt-5")
      span.main-section-title Online Whitepaper
      embed(src="https://bitcoin.org/bitcoin.pdf" class="w-100 mt-4 mt-lg-5 d-block mx-auto"  type="application/pdf")

</template>

<script>
// import fileDownload from 'js-file-download'

export default {
  name: 'nwc-page',
  metaInfo () {
    return { title: this.$title('NWC') }
  },
  data: () => ({
    publicPath: process.env.BASE_URL
  }),
//   computed: {
//     whitepaperUrl () {
//         return this.$api + '/nwc/download-whitepaper'
//     }
//   },
//   methods: {
//     downloadWhitepaper () {
//       this.$http.get(this.whitepaperUrl).then((response) => {
//         fileDownload(response.data, 'NWC whitepaper.pdf')
//       })
//     }
//   }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/utils/vars';
@import '@/assets/scss/utils/mixins';

.main-nwc-page-content {
  background-color: $grey-bg-dark;
  @media (max-width: $fullHdWidth) {
    background-color: $grey-bg-semi-dark;
  }
  .nwc-logo {
    @include bgImage;
    background-size: contain;
    @media screen and (max-width: $smDesktopWidth) {
      height: 320px;
    }
  }
  .nwc-page-big-arrow {
    background-color: $grey-bg-semi-dark;
    .fa-angle-double-right {
      font-size: rem(50px);
      color: $grey-icon-base;
    }
  }
  .main-nwc-buttons-container {
    .main-nwc-button {
      .nwc-btn-title {
        font-family: 'Montserrat';
        font-size: rem(22px);
        color: $grey-font-dark;
      }
      .nwc-btn-icon {
        font-size: rem(100px);
        color: $grey-icon-base;
      }
      .nwc-btn-download {
        @include bigPurpleBtn;
        width: 200px;
        font-size: rem(18px);
        text-align: center;
        line-height: 45px;
        text-decoration: none;
        cursor: pointer;
      }
    }
    .desktop-nwc-button { background-color: $grey-bg-base }
    .whitepaper-nwc-button { background-color: $grey-bg-light }
  }
}
.nwc-page-online-whitepaper {
  embed {
    width: 75%;
    height: 900px;
    @media (max-width: $desktopWidth) {
      height: 800px;
    }
    @media (max-width: $smDesktopWidth) {
      width: 100%;
    }
    @media(max-width: $tableWidth) {
      height: 600px;
    }
    @media(max-width: $phoneWidth) {
      height: 500px;
    }
    @media(max-width: $smPhoneWidth) {
      height: 400px;
    }
  }
}
</style>
