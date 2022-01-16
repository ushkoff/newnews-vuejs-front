<template lang="pug">
  .choose-node-form
    span.nn-def-label(class="d-block mb-2") Node Domain or IP
    input(name='tags-manual-suggestions' placeholder='Domain name...')

</template>

<script>
import Tagify from '@yaireo/tagify'
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    withSignature: Boolean
  },
  data: () => ({
    nodes: {},
    response: {
      pickedAnyNodes: {},
      pickedDelegatNodes: {},
      anyNodeType: ''
    }
  }),
  computed: mapGetters(['ordinaryNodes', 'IENodes', 'delegatNodes']),
  methods: mapActions(['retrieveOrdinaryAndIEAndDelegatNodes']),
  async mounted () {
    await this.retrieveOrdinaryAndIEAndDelegatNodes()

    const ordinaryDomainPrefix = '<ORDINARY>'
    const IEDomainPrefix = '<IE>'
    const delegatDomainPrefix = '<DELEGAT>'

    const ordinaryDomains = Object.keys(this.ordinaryNodes)
    const IEDomains = Object.keys(this.IENodes)
    const delegatDomains = Object.keys(this.delegatNodes)

    ordinaryDomains.forEach(function (part, index) {
      this[index] = ordinaryDomainPrefix + ' ' + this[index]
    }, ordinaryDomains)

    IEDomains.forEach(function (part, index) {
      this[index] = IEDomainPrefix + ' ' + this[index]
    }, IEDomains)

    delegatDomains.forEach(function (part, index) {
      this[index] = delegatDomainPrefix + ' ' + this[index]
    }, delegatDomains)

    // With signature or not 
    let domains
    if (this.withSignature) {
      domains = ordinaryDomains.concat(IEDomains).concat(delegatDomains)
    } else domains = delegatDomains

    let input = document.querySelector('input[name=tags-manual-suggestions]')
    // init Tagify script on the above inputs
    let tagify = new Tagify(input, {
      maxTags: 1, // because transactions
      whitelist: domains,
      dropdown: {
        position: 'manual',
        maxItems: Infinity,
        enabled: 0,
        classname: 'customSuggestionsList'
      },
      enforceWhitelist: true
    })

    // tagify.on('dropdown:show', onSuggestionsListUpdate)
    // tagify.on('dropdown:hide', onSuggestionsListHide)
    // tagify.on('dropdown:scroll', onDropdownScroll)

    // CODE FOR ADD EVENT

    tagify.on('add', function (e) {
      let value = e.detail.data.value

      if (value.includes(ordinaryDomainPrefix)) {
        let regex = new RegExp(ordinaryDomainPrefix + ' ')
        let domain = value.replace(regex, '')
        this.response.pickedAnyNodes[domain] = this.ordinaryNodes[domain]
        this.response.anyNodeType = 'ORDINARY'
      }
      if (value.includes(IEDomainPrefix)) {
        let regex = new RegExp(IEDomainPrefix + ' ')
        let domain = value.replace(regex, '')
        this.response.pickedAnyNodes[domain] = this.IENodes[domain]
        this.response.anyNodeType = 'IE'
      }
      if (value.includes(delegatDomainPrefix)) {
        let regex = new RegExp(delegatDomainPrefix + ' ')
        let domain = value.replace(regex, '')
        this.response.pickedAnyNodes[domain] = this.delegatNodes[domain]
        this.response.pickedDelegatNodes[domain] = this.delegatNodes[domain]
        this.response.anyNodeType = 'DELEGAT'
      }

      sessionStorage.setItem('selectedNodes', JSON.stringify(this.response))
    }.bind(this))

    // CODE FOR REMOVE EVENT

    tagify.on('remove', function (e) {
      let value = e.detail.data.value

      if (value.includes(ordinaryDomainPrefix)) {
        let regex = new RegExp(ordinaryDomainPrefix + ' ')
        let domain = value.replace(regex, '')
        delete this.response.pickedAnyNodes[domain]
      }
      if (value.includes(IEDomainPrefix)) {
        let regex = new RegExp(IEDomainPrefix + ' ')
        let domain = value.replace(regex, '')
        delete this.response.pickedAnyNodes[domain]
      }
      if (value.includes(delegatDomainPrefix)) {
        let regex = new RegExp(delegatDomainPrefix + ' ')
        let domain = value.replace(regex, '')
        delete this.response.pickedAnyNodes[domain]
        delete this.response.pickedDelegatNodes[domain]
      }

      if (Object.keys(this.response.pickedAnyNodes).length === 0) {
        sessionStorage.removeItem('selectedNodes')
      } else {
        sessionStorage.setItem('selectedNodes', JSON.stringify(this.response))
      }
    }.bind(this))

    renderSuggestionsList()

    // https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentElement
    function renderSuggestionsList () {
      tagify.dropdown.show.call(tagify) // load the list
      tagify.DOM.scope.parentNode.appendChild(tagify.DOM.dropdown)
    }

    // to set styles on form
    let tagifyBlock = document.querySelector('.tagify')
    tagifyBlock.setAttribute('style', '--tags-border-color: #D6D6D6; --placeholder-color: #757575') // $grey-line-light; no-name placeholder color
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/utils/vars';
@import '@/assets/scss/utils/mixins';

.choose-node-form {
  font-size: rem(16px);
  font-family: 'Source Sans Pro';
}

.customSuggestionsList > div{
  max-height: 300px;
  overflow: auto;
}
</style>
