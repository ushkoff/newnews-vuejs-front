<template lang="pug">
  div
    .def-page-header(:style="{'background-image': `url('${publicPath}assets/img/pages/news/manage/header.jpg')`}")
      .container(class="d-flex align-items-center justify-content-center justify-content-md-start pt-5")
        span.def-page-header-name(class="pl-4 pr-4") Add News
    .container(class="pt-4")
      AuthNavbar

      .row(class="mt-4 mt-md-5")
        div(class="col-12 col-xl-8")

          AddNewsForm

          YourNews

        div(class="col-12 col-xl-4")
          Sidebar

</template>

<script>
import AuthNavbar from '@/components/app/navigation/AuthNavbar'
import AddNewsForm from '@/components/news/manage/AddNewsForm'
import YourNews from '@/components/news/YourNews'
import Sidebar from '@/components/app/Sidebar'
import { mapActions } from 'vuex'

export default {
  name: 'add-news',
  metaInfo () {
    return { title: this.$title('Add News') }
  },
  data: () => ({
    publicPath: process.env.BASE_URL
  }),
  components: {
    AuthNavbar,
    AddNewsForm,
    YourNews,
    Sidebar
  },
  methods: {
    ...mapActions(['doesKeyPairExist']),

    async checkIfKeyPairExists () {
      let msg
      await this.doesKeyPairExist().then((response) => {
        msg = response
      })

      if (typeof msg == 'string') {
        this.$swal.fire({
          title: 'Key pair?',
          text: `To add news, add or generate your ${msg}`,
          icon: 'question',
          allowOutsideClick: false
        }).then((result) => {
          if (result.value) this.$router.push({ name: 'key-pair' })
        })
      }
    }
  },
  async mounted () {
    this.checkIfKeyPairExists()
  },
  beforeRouteLeave (to, from, next) {
    next()
  }
}
</script>

<style lang="scss" scoped>
// @import '@/assets/scss/utils/vars';
// @import '@/assets/scss/utils/mixins';

</style>
