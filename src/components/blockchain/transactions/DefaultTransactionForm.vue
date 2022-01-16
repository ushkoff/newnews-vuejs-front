<template lang="pug">
div
  form.nn-def-form(class="p-4 p-lg-5 pb-5" @submit.prevent="validate")

    //- Select node to make a transaction
    SelectTransactionNodesForm(:withSignature="withSignature" :key="nodesComponentKey")
    .nn-def-input-error(v-if="nodesInputError" class="mt-3") Select the node you want to use to make a transaction

    div(class="mt-5")
      span.nn-def-label 1 Your Public Key
      div(class="d-flex flex-nowrap pt-2")
        input#publicKeyField(type="text" :value="publicKey" class="nn-def-input pl-2 pr-2 pl-lg-3 pr-lg-3" readonly)
        .nn-def-input-desc(@click="$copy('publicKeyField')" class="copy-btn") Copy

    div(class="mt-4 mt-lg-5")
      span.nn-def-label 2 Recipient
      input#recipientPublicKey(
        type="text"
        v-model.trim="recipientPublicKey"
        placeholder="Recipient's public key..."
        :maxlength="recipientMaxLength"
        class="nn-def-input mt-2 pl-2 pr-2 pl-lg-3 pr-lg-3"
        :class="{invalid: ($v.recipientPublicKey.$dirty && !$v.recipientPublicKey.required) || (recipientPublicKey === publicKey)}"
      )
      .nn-def-input-error(v-if="$v.recipientPublicKey.$dirty && !$v.recipientPublicKey.required" class="mt-2") "Recipient" field is required
      .nn-def-input-error(v-if="recipientPublicKey === publicKey" class="mt-2") You cannot transfer money to yourself

    div(class="mt-4 mt-lg-5")
      span.nn-def-label 3 Amount
      div(class="d-flex flex-nowrap pt-2")
        input#transactionAmount(
          type="text"
          placeholder="Amount..."
          v-model.trim="transactionAmount"
          :maxlength="amountMaxLength"
          class="nn-def-input pl-2 pr-2 pl-lg-3 pr-lg-3"
          :class="{invalid: ($v.transactionAmount.$dirty && !$v.transactionAmount.required) || ($v.transactionAmount.$dirty && !$v.transactionAmount.numeric)}"
        )
        .nn-def-input-desc NWC
      .nn-def-input-error(v-if="$v.transactionAmount.$dirty && !$v.transactionAmount.required" class="mt-2") "Amount" field is required
      .nn-def-input-error(v-if="$v.transactionAmount.$dirty && !$v.transactionAmount.numeric" class="mt-2") "Amount" field is numeric
      .nn-def-input-error(v-if="balanceError" class="mt-2") There are not enough funds on your balance

    .agree-with-docs(class="mt-5 d-flex")
      input#agreeNewsOffer(type="checkbox" v-model="agreeTransferRules" class="mr-2")
      label(for="agreeNewsOffer") I correctly wrote the recipient's address and agree with the <router-link to="{ name: 'privacy-policy' }">Transfer Offer</router-link> of NewNews.
    .nn-def-input-error(v-if="$v.agreeTransferRules.$dirty && !$v.agreeTransferRules.checked" class="mt-1") Please agree to the terms of the news

    .nn-def-input-error(
    v-if="errMsg != null"
    class="server-side-errors mt-3"
    ) {{ errMsg }}

    button(type="submit" class="d-block mx-auto mt-5") Send

</template>

<script>
import SelectTransactionNodesForm from '@/components/blockchain/transactions/SelectTransactionNodesForm'
import { required, maxLength, numeric } from 'vuelidate/lib/validators'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'default-transaction-form',
  data: () => ({
    recipientPublicKey: '',
    transactionAmount: '',
    recipientMaxLength: 256,
    amountMaxLength: 50,
    agreeTransferRules: false,
    nodesInputError: false,
    balanceError: false,
    errMsg: null,
    pickedNodesData: {}
  }),
  props: {
    withSignature: Boolean,
    userID: Number,
    publicKey: String,
    secretKey: String,
    nonce: String,
    userBalance: Number,
    nodesComponentKey: Number
  },
  components: {
    SelectTransactionNodesForm
  },
  validations: {
    recipientPublicKey: { required, maxLength: maxLength(257) },
    transactionAmount: { required, numeric, maxLength: maxLength(51) },
    agreeTransferRules: { checked: v => v }
  },
  computed: mapGetters(['msgNodeObject']),
  methods: {
    ...mapActions(['getDefaultTransactionObject', 'sendDefaultNodeTransaction']),

    async submitTransaction () {
      let pickedNode
      let pickedNodeDomain
      let defTransactionObject

      let data = {
        sender: this.publicKey,
        recipient: this.recipientPublicKey,
        amount: this.transactionAmount,
        marker: '',
        withSignature: true,
        secretKey: this.secretKey,
        ls: pickedNode.LS,
        nonce: this.nonce,
      }

      // If Any Node
      if (this.withSignature) {
        pickedNodeDomain = Object.keys(this.pickedNodesData.pickedAnyNodes)[0]
        pickedNode = this.pickedNodesData.pickedAnyNodes[pickedNodeDomain]
        defTransactionObject = this.getDefaultTransactionObject(data)
      // If DELEGAT node only
      } else {
        pickedNodeDomain = Object.keys(this.pickedNodesData.pickedDelegatNodes)[0]
        pickedNode = this.pickedNodesData.pickedDelegatNodes[pickedNodeDomain]
        data.withSignature = false
        defTransactionObject = this.getDefaultTransactionObject(data)
      }

    //   if (pickedNode.T_PRV_NONCE <= 0) {
    //     this.$router.push({ name: 'settings-page' })
    //     this.$swal.fire({
    //       title: 'Failure',
    //       icon: 'error',
    //       html: 'Check the T_PRV_NONCE field of this node, its value must be greater than zero.<br><b>Wait some time until next state</b>..'
    //     })
    //     return false
    //   }

      const msgData = {
        publicKey: this.publicKey,
        data: defTransactionObject,
        spaceID: pickedNode.SPACE_ID,
        LS: pickedNode.LS,
        prvNonce: pickedNode.T_PRV_NONCE
      }
      const msg = this.msgNodeObject(msgData)

      await this.sendDefaultNodeTransaction({ pickedNodeDomain, msg, withSignature: this.withSignature }).then(() => {
        this.$router.push({ name: 'settings' })
        this.$swal.fire({
            title: 'Success',
            icon: 'success',
            text: 'Transaction completed successfully'
        })
        sessionStorage.removeItem('selectedNodes')
      }).catch(() => {
        this.$router.push({ name: 'settings' })
        this.$swal.fire({
          title: 'Failure',
          icon: 'error',
          text: 'Perhaps there is no connection to this node (information in the console). Otherwise read node documentation.'
        })
      })
    },

    validate () {
      this.nodesInputError = false
      this.balanceError = false
      this.loadNodesData()

      if (this.recipientPublicKey === this.publicKey) return false
      if (this.transactionAmount > this.userBalance) {
        this.balanceError = true
        return false
      }
      if (this.$v.$invalid) {
        this.$v.$touch()
        return false
      }

      this.submitTransaction()
    },
    loadNodesData () {
      const response = JSON.parse(sessionStorage.getItem('selectedNodes'))
      if ((response === null) || (response === 'undefined')) {
        this.nodesInputError = true
        return false
      } else this.pickedNodesData = response
    }
  },
  mounted () {
    if (this.$route.query.recipient) {
      this.recipientPublicKey = this.$route.query.recipient
    }
  },
  created () {
    localStorage.setItem('chosenTransactionNodes', null)
  }
}
</script>

<style lang="scss" scoped>
// @import '@/assets/scss/utils/vars';
// @import '@/assets/scss/utils/mixins';

.copy-btn { cursor: pointer }

</style>
