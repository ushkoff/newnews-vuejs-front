<template lang="pug">
  div
    .def-page-header(:style="{'background-image': `url('${publicPath}assets/img/pages/user/settings/header.jpg')`}")
      .container(class="d-flex align-items-center justify-content-center justify-content-md-start pt-5")
        span.def-page-header-name(class="pl-4 pr-4") Settings
    .container(class="pt-4")
      AuthNavbar

      .row(class="mt-4 mt-md-5")
        div(class="col-12 col-xl-6")
          .account-info(class="d-flex pt-5 pl-4 pl-md-5 pr-4 pb-4 flex-column flex-md-row align-items-center align-items-md-start")
            <i class="fas fa-user-astronaut"></i>
            ul(class="m-0 p-0 ml-0 ml-md-5 mt-5 mt-md-0")
              li Username: <span>{{ userData.username }}</span>
              li Email: <span>{{ userData.email }}</span>
              li Country: <span>{{ userData.country }} [{{ userData.countryCode }}]</span>
              li Timezone: <span>{{ userData.timezone }}</span>
              li Date registered: <span>{{ userData.dateRegistered }}</span>

          //- SettingsForms

          Blocklist

          NodeList

          KeyPairList


        div(class="col-12 col-xl-6 mt-md-5 mt-xl-0")
          .faq-list(class="p-lg-5 p-4")
            .faq-list-title FAQ
            FAQList

</template>

<script>
import AuthNavbar from '@/components/app/navigation/AuthNavbar'
// import SettingsForms from '@/components/settings/Forms'
import Blocklist from '@/components/settings/Blocklist'
import NodeList from '@/components/settings/NodeList'
import KeyPairList from '@/components/settings/KeyPairList'
import FAQList from '@/components/settings/FAQ'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'settings',
  metaInfo () {
    return { title: this.$title('Settings') }
  },
  data: () => ({
    publicPath: process.env.BASE_URL
  }),
  computed: {
    ...mapGetters(['userData'])
  },
  components: {
    AuthNavbar,
    // SettingsForms,
    Blocklist,
    NodeList,
    KeyPairList,
    FAQList
  },
  methods: {
    ...mapActions(['fetchUserData'])
  },
  async mounted () {
    await this.fetchUserData()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/utils/vars';
@import '@/assets/scss/utils/mixins';

.def-page-header {
  .def-page-header-name {
    letter-spacing: -0.25px;
  }
}
.account-info {
  background-color: $grey-bg-light;
  .fa-user-astronaut {
    display: block;
    font-size: rem(125px);
    color: $grey-icon-light;
  }
  .user-icon {
    @include size(150px);
    @include bgImage();
  }
  ul {
    li {
      font-family: 'Montserrat';
      font-size: rem(18px);
      color: $grey-font-for-bg;
      margin: 15px 0;
      &:first-child { margin-top: 0 }
      span {
        color: $blue-font-base;
        word-break: break-all;
      }
    }
  }
}
.faq-list {
  background-color: $grey-bg-light;
  .faq-list-title {
    font-family: 'Montserrat';
    font-size: rem(18px);
    font-weight: 500;
    color: $grey-font-dark;
  }
  .faq-block-desc {
    a { color: $link-blue-base }
  }
}
</style>
