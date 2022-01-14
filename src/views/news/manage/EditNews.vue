<template lang="pug">
  div
    .def-page-header(:style="{'background-image': `url('${publicPath}assets/img/pages/news/manage/header.jpg')`}")
      .container(class="d-flex align-items-center justify-content-center justify-content-md-start pt-5")
        span.def-page-header-name(class="pl-4 pr-4") Edit News
    .container(class="pt-4")
      AuthNavbar

      .row(class="mt-4 mt-md-5")
        div(class="col-12 col-xl-8")

          EditNewsForm

          YourNews

        div(class="col-12 col-xl-4")
          Sidebar

</template>

<script>
import AuthNavbar from '@/components/app/navigation/AuthNavbar'
import EditNewsForm from '@/components/news/manage/EditNewsForm'
import YourNews from '@/components/news/YourNews'
import Sidebar from '@/components/app/Sidebar'

export default {
  name: 'edit-news',
  metaInfo () {
    return { title: this.$title('Edit News') }
  },
  data: () => ({
    publicPath: process.env.BASE_URL
  }),
  components: {
    AuthNavbar,
    EditNewsForm,
    YourNews,
    Sidebar
  }
}
</script>

<style lang="scss" scoped>
// @import '@/assets/scss/utils/vars';
// @import '@/assets/scss/utils/mixins';
</style>
