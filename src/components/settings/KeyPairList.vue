<template lang="pug">
  .nodelist-block(class="pl-md-5 pl-4 pr-md-5 pr-5 pt-5 pb-4")
    NewnewsLoader(v-if="loading")
    div(v-else)
      .profile-settings-block(class="nodelist pb-2")
        span.profile-settings-title
          | Key Pair | <router-link class="add-node-btn" :to="{ name: 'key-pair' }">Set Key Pair</router-link>
        span.profile-settings-line

        ul(class="pl-2 pr-2 pb-3")

          div(v-if="keyPair.publicKey != null" class="d-flex")
            mark.node-type-title Public Key
            span.domain-name(class="d-block text-truncate ml-2") {{ keyPair.publicKey }}

          br(v-if="nonce != null")
          div(v-if="nonce != null" class="d-flex")
            mark.node-type-title NONCE
            span.domain-name(class="d-block text-truncate ml-2") {{ nonce }}

        div(v-if="!keyPairIsEmpty" class="d-flex justify-content-end")
          div.copy-nodes-block(class="d-flex flex-column align-items-end")
            button.copy-nodes-btn(@click="copyKeyPairJSON" class="mt-4") Copy JSON
            span *secret key is too private

        div(v-if="keyPairIsEmpty")
          span.nodelist-empty-phrase(
            class="text-break pl-2 d-block mb-2"
          ) Your "key pair" is empty...

</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'key-pair-list',
  data: () => ({
    loading: true,
    keyPairIsEmpty: false
  }),
  computed: mapGetters(['keyPair', 'nonce']),
  methods: {
    ...mapActions(['retrieveKeyPair']),

    loadKeyPairList () {
      this.retrieveKeyPair().then(() => {
        if (this.keyPair.publicKey == null && this.nonce == null)
            this.keyPairIsEmpty = true
        this.loading = false
      })
    },

    copyKeyPairJSON () {
      let finalArray = []
      const keyPairObject = {
        'PUB': this.keyPair.publicKey,
        'NONCE': this.nonce
      }
      finalArray.push(keyPairObject)

      // create dummy input to copy text
      let dummy = document.createElement('textarea')
      document.body.appendChild(dummy)
      dummy.value = JSON.stringify(finalArray)
      dummy.select()
      dummy.setSelectionRange(0, 99999) // For mobile devices
      navigator.clipboard.writeText(dummy.value)
      document.body.removeChild(dummy)

      this.$swal.fire(
        'Copied!',
        'You can use any JSON to Plain Text converter if you need',
        'success'
      )
    }
  },
  mounted () {
    this.loadKeyPairList()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/utils/vars';
@import '@/assets/scss/utils/mixins';

.nodelist-block {
  position: relative;
  min-height: 200px;
  background-color: $grey-bg-light;
  .nodelist {
    max-width: 450px;
    .add-node-btn {
      color: $info-color;
    }
    .copy-nodes-block {
      .copy-nodes-btn {
        font-size: rem(15px);
        width: 100px;
      }
      span {
        font-size: rem(15px);
        font-style: italic;
        color: $blue-font-base;
      }
    }
    ul {
      font-family: 'Open Sans';
      font-size: rem(15px);
      color: $grey-font-dark;
      .node-type-title {
        font-size: rem(13px);
        font-weight: 600;
      }
      .circle {
        font-size: rem(8px);
        position: relative;
        bottom: -0.5px;
      }
      .domain-name {
        max-width: 200px;
      }
    }
    button.remove {
      background-color: transparent;
      font-family: 'Open Sans';
      font-size: rem(13px);
      font-weight: 600;
      color: $grey-font-light;
      text-decoration: underline;
      @include trans01s;
      &:hover {
        color: $grey-font-dark;
      }
    }
    .nodelist-empty-phrase {
      font-family: 'Open Sans';
      font-size: rem(16px);
      color: $grey-font-base;
    }
  }
}
</style>
