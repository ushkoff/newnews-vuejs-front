<template lang="pug">
  div
    div(class="pl-4 pr-4 pl-lg-5 pr-lg-5")
      span.your-balance(class="d-block mt-1 mb-4 mb-lg-5") Your balance: <em v-if="!userBalanceLoading">{{ userBalance }} <span>NWC</span></em> <em v-else>loading...</em>
      .nn-def-description
        span.warning Warning:
        span
          | <span class="bold"> Only one node can be used per transaction.</span>
          br
          | Of course, you can add as many nodes as you like, but only one node can be used. More details: <router-link :to="{ name: 'privacy-policy' }">NN transactions</router-link>.

    //- Select: with signature or not
    .profile-settings-block(class="mt-4 ml-4 mr-4 ml-lg-5 mr-lg-5 mt-lg-5")
      span.profile-settings-title
        | Send transaction with signature? {{ signatureMode }}
      span.profile-settings-line
      form(class="mt-3")
        .form-check
          input#radioYes.form-check-input(type="radio" name="radioYes" value="YES" v-model="signatureMode")
          label.form-check-label(for="radioYes") With signature
        .form-check(class="mt-2")
          input#radioNo.form-check-input(@change="checkIfExistDelegatNodes()" type="radio" name="radioNo" value="NO" v-model="signatureMode")
          label.form-check-label(for="radioNo") Unsigned (only DELEGAT)

    //- Select transaction mode form
    .profile-settings-block(class="mt-4 ml-4 mr-4 ml-lg-5 mr-lg-5 mt-lg-5")
      span.profile-settings-title
        | Transaction type: {{ transactionMode }} | <router-link :to="{ name: 'home' }">NN transactions</router-link>
      span.profile-settings-line
      form(class="mt-3")
        .form-check
          input#radioDefault.form-check-input(type="radio" name="radioDefault" value="DEFAULT" v-model="transactionMode")
          label.form-check-label(for="radioDefault") From address to address
        .form-check(class="mt-2")
          input#radioSettingDelegate.form-check-input(type="radio" name="radioSettingDelegate" value="DELEGATE" v-model="transactionMode")
          label.form-check-label(for="radioSettingDelegate") Setting a delegate
        .form-check(class="mt-2")
          input#radioBecomeValidation.form-check-input(type="radio" name="radioBecomeValidation" value="BEVAL" v-model="transactionMode")
          label.form-check-label(for="radioBecomeValidation") Become a validator
        .form-check(class="mt-2")
          input#radioNews.form-check-input(type="radio" name="radioNews" value="NEWS" v-model="transactionMode")
          label.form-check-label(for="radioNews") News transaction

    DefaultTransactionForm(v-if="transactionMode === 'DEFAULT'" :withSignature="withSignature" :nodesComponentKey="nodesComponentKey" :userID="userID" :publicKey="publicKey" :secretKey="secretKey" :nonce="nonce" :userBalance="userBalance")
    //- DelegateTransactionForm(v-if="transactionMode === 'DELEGATE'" :withSignature="withSignature" :nodesComponentKey="nodesComponentKey" :userID="userID" :publicKey="publicKey" :secretKey="secretKey" :nonce="nonce")
    //- BevalTransactionForm(v-if="transactionMode === 'BEVAL'" :withSignature="withSignature" :nodesComponentKey="nodesComponentKey" :userID="userID" :publicKey="publicKey" :privateKey="privateKey" :nonceValue="nonceValue")
    //- NewsTransactionForm(v-if="transactionMode === 'NEWS'" :withSignature="withSignature" :nodesComponentKey="nodesComponentKey" :userID="userID" :publicKey="publicKey" :privateKey="privateKey" :nonceValue="nonceValue")

</template>

<script>
import DefaultTransactionForm from '@/components/blockchain/transactions/DefaultTransactionForm'
// import DelegateTransactionForm from '@/components/blockchain/transactions/DelegateTransactionForm'
// import BevalTransactionForm from '@/components/blockchain/transactions/transaction-forms/BevalTransactionForm'
// import NewsTransactionForm from '@/components/blockchain/transactions/transaction-forms/NewsTransactionForm'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'transactions-form',
  data: () => ({
    signatureMode: 'YES',
    transactionMode: 'DEFAULT',
    nodesComponentKey: 0,
    userBalanceLoading: true
  }),
  props: {
    userID: Number,
    publicKey: String,
    secretKey: String,
    nonce: String
  },
  components: {
    DefaultTransactionForm,
    // DelegateTransactionForm,
    // BevalTransactionForm,
    // NewsTransactionForm
  },
  computed: {
    ...mapGetters(['userBalance', 'delegatNodesExist', 'ordinaryAndIENodesExist']),
    withSignature () {
      return this.signatureMode == 'YES' ? true : false // eslint-disable-line
    }
  },
  watch: {
    signatureMode () {
      this.nodesComponentKey++
      sessionStorage.removeItem('selectedNodes')
    }
  },
  methods: {
    ...mapActions(['fetchUserBalance', 'retrieveOrdinaryAndIEAndDelegatNodes']),

    checkIfExistDelegatNodes () {
      if (!this.delegatNodesExist) { // If there is no DELEGAT nodes in localStorage
        this.$swal.fire({
          title: 'DELEGAT nodes?',
          text: 'To send an unsigned transaction you need to add a DELEGAT node',
          icon: 'question',
          showCancelButton: true,
          allowOutsideClick: false
        }).then((result) => {
          if (result.isConfirmed) {
            this.$router.push({ name: 'add-node' })
          } else if (result.dismiss) {
            this.signatureMode = 'YES'
          }
        })
      }
    },
    async checkIfNodesAdded () {
      await this.retrieveOrdinaryAndIEAndDelegatNodes()

      if (this.ordinaryAndIENodesExist == false && this.delegatNodesExist == false) {
        this.$swal.fire({
          title: 'ORDINARY/IE/DELEGAT nodes?',
          text: 'To make a transaction, you need to add node to the list of nodes',
          icon: 'question',
          showCancelButton: false,
          allowOutsideClick: false
        }).then((result) => {
          if (result.isConfirmed) {
            this.$router.push({ name: 'add-node' })
          }
        })
      }
    },
    async getUserBalance () {
      await this.fetchUserBalance(this.publicKey).then(() => {
        this.userBalanceLoading = false
      })
    }
  },
  async mounted () {
    await this.checkIfNodesAdded()
    await this.getUserBalance()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/utils/vars';
@import '@/assets/scss/utils/mixins';

.your-balance {
  font-family: 'Montserrat';
  font-size: rem(20px);
  color: $grey-font-dark;
  em {
    color: $blue-title-base;
    font-weight: 500;
    span { font-style: normal }
  }
}

</style>
