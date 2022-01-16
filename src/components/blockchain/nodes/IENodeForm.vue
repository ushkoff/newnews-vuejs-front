<template lang="pug">
  form.nn-def-form(class="p-4 p-lg-5 pb-5" @submit.prevent="createNode()")
    div
      span.nn-def-label Domain Name Or IP address
      input#domainNameField(
        type="text" v-model.trim="domainName" class="nn-def-input pl-2 pr-2 pl-lg-3 pr-lg-3" maxlength="256" placeholder="Enter URL with domain or with IP:port..."
        :class="{invalid: ($v.domainName.$dirty && !$v.domainName.required) || ($v.domainName.$dirty && !$v.domainName.urlOrIP)}"
      )
      .nn-def-input-error(v-if="$v.domainName.$dirty && !$v.domainName.required" class="mt-2") "Domain Name" field is required
      .nn-def-input-error(v-if="$v.domainName.$dirty && !$v.domainName.urlOrIP" class="mt-2") "Domain Name" field must be full URL (https://domain or https://IP:port)
    div(class="mt-4 mt-lg-5")
      span.nn-def-label SPACE_ID
      input#spaceIDField(
        type="text" v-model.trim="spaceID" class="nn-def-input pl-2 pr-2 pl-lg-3 pr-lg-3" maxlength="256" placeholder="Enter SPACE_ID ..."
        :class="{invalid: ($v.spaceID.$dirty && !$v.spaceID.required) }"
      )
      .nn-def-input-error(v-if="$v.spaceID.$dirty && !$v.spaceID.required" class="mt-2") "SPACE_ID" field is required
    //- div(class="mt-4 mt-lg-5")
    //-   span.nn-def-label P_PRV_NONCE
    //-   input#permPrvNonceField(
    //-     type="text" v-model.trim="permPrvNonce" class="nn-def-input pl-2 pr-2 pl-lg-3 pr-lg-3" maxlength="256" placeholder="Enter P_PRV_NONCE..."
    //-     :class="{invalid: ($v.permPrvNonce.$dirty && !$v.permPrvNonce.required) || ($v.permPrvNonce.$dirty && !$v.permPrvNonce.integer) }"
    //-   )
    //-   .nn-def-input-error(v-if="$v.permPrvNonce.$dirty && !$v.permPrvNonce.required" class="mt-2") "P_PRV_NONCE" field is required
    //-   .nn-def-input-error(v-if="$v.permPrvNonce.$dirty && !$v.permPrvNonce.integer" class="mt-2") "P_PRV_NONCE" field is integer
    //- div(class="mt-4 mt-lg-5")
    //-   span.nn-def-label T_PRV_NONCE
    //-   input#tempPrvNonceField(
    //-     type="text" v-model.trim="tempPrvNonce" class="nn-def-input pl-2 pr-2 pl-lg-3 pr-lg-3" maxlength="256" placeholder="Enter T_PRV_NONCE... Default value is P_PRV_NONCE field value"
    //-     :class="{invalid: ($v.tempPrvNonce.$dirty && !$v.tempPrvNonce.integer) }"
    //-   )
    //-   .nn-def-input-error(v-if="$v.tempPrvNonce.$dirty && !$v.tempPrvNonce.integer" class="mt-2") "T_PRV_NONCE" field is integer
    //- div(class="mt-4 mt-lg-5")
    //-   span.nn-def-label LS
    //-   input#LSField(
    //-     type="text" v-model.trim="LS" class="nn-def-input pl-2 pr-2 pl-lg-3 pr-lg-3" maxlength="256" placeholder="Enter LS..."
    //-     :class="{invalid: ($v.LS.$dirty && !$v.LS.required) }"
    //-   )
    //-   .nn-def-input-error(v-if="$v.LS.$dirty && !$v.LS.required" class="mt-2") "LS" field is required
    div(class="mt-4 mt-lg-5")
      span.nn-def-label STOR1_HREF_LEN
      input#hrefLenField(
        type="text" v-model.trim="hrefLen" class="nn-def-input pl-2 pr-2 pl-lg-3 pr-lg-3" maxlength="256" placeholder="Enter STOR1_HREF_LEN..."
        :class="{invalid: ($v.hrefLen.$dirty && !$v.hrefLen.required) || ($v.hrefLen.$dirty && !$v.hrefLen.integer) }"
      )
      .nn-def-input-error(v-if="$v.hrefLen.$dirty && !$v.hrefLen.required" class="mt-2") "STOR1_HREF_LEN" field is required
      .nn-def-input-error(v-if="$v.hrefLen.$dirty && !$v.hrefLen.integer" class="mt-2") "STOR1_HREF_LEN" field is integer
    div(class="mt-4 mt-lg-5")
      span.nn-def-label STOR2_INPUT_LEN
      input#inputLenField(
        type="text" v-model.trim="inputLen" class="nn-def-input pl-2 pr-2 pl-lg-3 pr-lg-3" maxlength="256" placeholder="Enter STOR2_INPUT_LEN..."
        :class="{invalid: ($v.inputLen.$dirty && !$v.inputLen.required) || ($v.inputLen.$dirty && !$v.inputLen.integer) }"
      )
      .nn-def-input-error(v-if="$v.inputLen.$dirty && !$v.inputLen.required" class="mt-2") "STOR2_INPUT_LEN" field is required
      .nn-def-input-error(v-if="$v.inputLen.$dirty && !$v.inputLen.integer" class="mt-2") "STOR2_INPUT_LEN" field is integer
    div(class="mt-4 mt-lg-5")
      span.nn-def-label STOR2_REFS_LEN
      input#refsLenField(
        type="text" v-model.trim="refsLen" class="nn-def-input pl-2 pr-2 pl-lg-3 pr-lg-3" maxlength="256" placeholder="Enter STOR2_REFS_LEN..."
        :class="{invalid: ($v.refsLen.$dirty && !$v.refsLen.required) || ($v.refsLen.$dirty && !$v.refsLen.integer) }"
      )
      .nn-def-input-error(v-if="$v.refsLen.$dirty && !$v.refsLen.required" class="mt-2") "STOR2_REFS_LEN" field is required
      .nn-def-input-error(v-if="$v.refsLen.$dirty && !$v.refsLen.integer" class="mt-2") "STOR2_REFS_LEN" field is integer
    //- div(class="mt-4 mt-lg-5")
    //-   span.nn-def-label E_TOPIC_LEN
    //-   input#eTopicLenField(
    //-     type="text" v-model.trim="eTopicLen" class="nn-def-input pl-2 pr-2 pl-lg-3 pr-lg-3" maxlength="256" placeholder="Enter E_TOPIC_LEN..."
    //-     :class="{invalid: ($v.eTopicLen.$dirty && !$v.eTopicLen.required) || ($v.eTopicLen.$dirty && !$v.eTopicLen.integer) }"
    //-   )
    //-   .nn-def-input-error(v-if="$v.eTopicLen.$dirty && !$v.eTopicLen.required" class="mt-2") "E_TOPIC_LEN" field is required
    //-   .nn-def-input-error(v-if="$v.eTopicLen.$dirty && !$v.eTopicLen.integer" class="mt-2") "E_TOPIC_LEN" field is integer
    div(class="mt-4 mt-lg-5")
      span.nn-def-label EM_NEWS_PREV_HREF_LEN
      input#emPrevHrefLenField(
        type="text" v-model.trim="emPrevHrefLen" class="nn-def-input pl-2 pr-2 pl-lg-3 pr-lg-3" maxlength="256" placeholder="Enter EM_NEWS_PREV_HREF_LEN..."
        :class="{invalid: ($v.emPrevHrefLen.$dirty && !$v.emPrevHrefLen.required) || ($v.emPrevHrefLen.$dirty && !$v.emPrevHrefLen.integer) }"
      )
      .nn-def-input-error(v-if="$v.emPrevHrefLen.$dirty && !$v.emPrevHrefLen.required" class="mt-2") "EM_NEWS_PREV_HREF_LEN" field is required
      .nn-def-input-error(v-if="$v.emPrevHrefLen.$dirty && !$v.emPrevHrefLen.integer" class="mt-2") "EM_NEWS_PREV_HREF_LEN" field is integer

    //- Submit form
    button(type="submit" class="d-block mx-auto mt-5") Add

</template>

<script>
import { helpers, required, maxLength, integer, url, or } from 'vuelidate/lib/validators'

// https://stackoverflow.com/questions/53500266/regexp-to-validate-url-with-port-or-ip-with-port-js
const ipAddressWithPort = helpers.regex('ipAddressWithPort', /^((https?:\/\/)|(www.))(?:([a-zA-Z]+)|(\d+\.\d+.\d+.\d+)):\d{4}$/)

export default {
  name: 'IE-node-form',
  data: () => ({
    nodelist: [{}],
    existSameNode: false,
    domainName: '',
    spaceID: '',
    // permPrvNonce: '',
    // tempPrvNonce: '',
    // LS: '',
    hrefLen: '',
    inputLen: '',
    refsLen: '',
    // eTopicLen: '',
    emPrevHrefLen: ''
  }),
  validations: {
    domainName: { required, urlOrIP: or(url, ipAddressWithPort), maxLength: maxLength(256) },
    spaceID: { required, maxLength: maxLength(256) },
    // permPrvNonce: { required, maxLength: maxLength(256), integer },
    // tempPrvNonce: { maxLength: maxLength(256), integer },
    // LS: { required, maxLength: maxLength(256) },
    hrefLen: { required, maxLength: maxLength(256), integer },
    inputLen: { required, maxLength: maxLength(256), integer },
    refsLen: { required, maxLength: maxLength(256), integer },
    // eTopicLen: { required, maxLength: maxLength(256), integer },
    emPrevHrefLen: { required, maxLength: maxLength(256), integer }
  },
  methods: {
    loadNodeList () {
      this.nodelist = JSON.parse(localStorage.getItem('IE')) || {}
    },
    storeNodelist () {
      //
      // IE node
      //
      // "http://someempire.com":{
      //       "SPACE_ID":"oG4zqcmj0F63viSFAyTlpTw7qZOZP9LCiYmswgvhPaYY8ZenHy7iUJHFLILR4VVitpKNWXzTVeKIlcvLBPEvhw==",
      //       "P_PRV_NONCE":45,
      //       "T_PRV_NONCE":10,
      //       "LS":"74f3151a9b4df2935fe1f2727f39ca3e0457b0bfe2288eaef92d519b8ea96e9a",
      //       "E_TOPIC_LEN":100,
      //       "EM_NEWS_PREV_HREF_LEN":200,
      //       "STOR1_HREF_LEN":30,
      //       "STOR2_INPUT_LEN":80,
      //       "STOR2_REFS_LEN":200
      //   }

      // if (this.tempPrvNonce === '') this.tempPrvNonce = this.permPrvNonce // is equal to Perm on start

      // create new IE node record object
      const record = {
        SPACE_ID: this.spaceID,
        // P_PRV_NONCE: this.permPrvNonce,
        // T_PRV_NONCE: this.tempPrvNonce,
        // LS: this.LS,
        STOR1_HREF_LEN: this.hrefLen,
        STOR2_INPUT_LEN: this.inputLen,
        STOR2_REFS_LEN: this.refsLen,
        // E_TOPIC_LEN: this.eTopicLen,
        EM_NEWS_PREV_HREF_LEN: this.emPrevHrefLen
      }

      // add it to IE node list
      this.nodelist[this.domainName] = record

      // save
      localStorage.setItem('IE', JSON.stringify(this.nodelist))

      this.$router.push({ name: 'settings' })
      this.$swal.fire(
        'Success',
        'New IE node has been added.',
        'success'
      )
    },
    async createNode () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return false
      }

      await this.checkIfSuchNodeExists(this.domainName)
      if (!this.existSameNode) {
        this.storeNodelist()
      }
    },
    async checkIfSuchNodeExists (domainName) {
      for (const [key, value] of Object.entries(this.nodelist)) { // eslint-disable-line
        if (key === domainName) {
          this.existSameNode = true
          this.$swal.fire({
            title: 'Node exists!',
            text: 'Do you want to replace an existing node with the same name?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes'
          }).then((result) => {
            if (result.value) {
              this.storeNodelist()
            }
          })
        }
      }
    }
  },
  mounted () {
    this.loadNodeList()
  }
}
</script>

<style lang="scss" scoped>
// @import '@/assets/scss/utils/vars';
// @import '@/assets/scss/utils/mixins';

</style>
