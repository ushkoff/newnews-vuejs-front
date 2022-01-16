<template lang="pug">
  div
    .def-page-header(:style="{'background-image': `url('${publicPath}assets/img/pages/transactions/header.jpg')`}")
      .container(class="d-flex align-items-center justify-content-center justify-content-md-start pt-5")
        span.def-page-header-name(class="pl-4 pr-4 pt-2 pb-2") {{ pubkey }}
        span.def-page-header-name(class="text-truncate pl-4 pr-4") {{ pubkey }}
    .container(class="pt-4")
      AuthNavbar

      .row(class="mt-4 mt-md-5")
        div(class="col-12 col-xl-8")
          TransactionForm(
            v-if="!loading"
            :userID="parseInt(userID)"
            :publicKey="keyPair.publicKey"
            :secretKey="keyPair.secretKey"
            :nonce="nonce"
          )

        div(class="col-12 col-xl-4")
          Sidebar

</template>

<script>
import AuthNavbar from '@/components/app/navigation/AuthNavbar'
import TransactionForm from '@/components/blockchain/transactions/TransactionForm'
import Sidebar from '@/components/app/Sidebar'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'transactions',
  metaInfo () {
    return {
      title: this.$title('Transactions')
    }
  },
  data: () => ({
    loading: true,
    publicPath: process.env.BASE_URL,
    pubkey: '',
    userID: null
  }),
  computed: mapGetters(['userLoggedIn', 'userData', 'keyPair', 'nonce']),
  components: {
    AuthNavbar,
    TransactionForm,
    Sidebar
  },
  methods: {
    ...mapActions(['fetchUserData', 'doesKeyPairExist', 'retrieveKeyPair']),

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
    },
    async loadUserData () {
      if (this.userLoggedIn) {
        await this.fetchUserData().then(() => {
          this.userID = this.userData.id
        })
      } else this.$router.push({ name: 'page-404' })
    },
  },
  async mounted() {
    await this.checkIfKeyPairExists()
    await this.loadUserData()
    await this.retrieveKeyPair().then(() => {
        this.pubkey = this.keyPair.publicKey
        this.loading = false
    })
  },
  beforeRouteEnter (to, from, next) {
    if (to.name == 'transactions')
      sessionStorage.removeItem('selectedNodes')
    next()
  },
  beforeRouteLeave (to, from, next) {
    sessionStorage.removeItem('selectedNodes')
    next()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/utils/vars';
@import '@/assets/scss/utils/mixins';

.def-page-header {
  .def-page-header-name {
    font-size: rem(35px) !important;
    text-transform: none !important;
    letter-spacing: -1px;
    line-height: rem(45px);
    &:last-child { display: none }
  }
  @media screen and (max-width: $smDesktopWidth) {
    height: 200px !important;
    .def-page-header-name {
      &:first-child { display: none !important }
      &:last-child {
        display: block;
        font-size: rem(27px) !important;
      }
    }
  }
}
</style>
