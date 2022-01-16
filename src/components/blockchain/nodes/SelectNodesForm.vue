<template lang="pug">
  .choose-node-form(class="mt-5")
    span.nn-def-label(class="d-block mb-2") Node Domain or IP
    input(name='tags-manual-suggestions' placeholder='Domain name...')

</template>

<script>
import Tagify from '@yaireo/tagify'

export default {
  props: {
    ordinaryNodes: Object,
    IENodes: Object
  },
  data: () => ({
    response: {
      pickedOrdinaryNodes: {},
      pickedIENodes: {},
    //   STOR1_HREF_LEN_MAX: 0,
    //   STOR2_INPUT_LEN_MAX: 0,
    //   STOR2_REFS_LEN_MAX: 0,
    //   // TOPIC_LEN_MAX: 0,
    //   PREV_HREF_LEN_MAX: 0
    }
  }),
  mounted () {
    const ordinaryDomainPrefix = '<ORDINARY>'
    const IEDomainPrefix = '<IE>'

    const ordinaryDomains = Object.keys(this.ordinaryNodes) // take domains name from nodes object
    const IEDomains = Object.keys(this.IENodes)

    ordinaryDomains.forEach(function (part, index) {
      this[index] = ordinaryDomainPrefix + ' ' + this[index]
    }, ordinaryDomains)

    IEDomains.forEach(function (part, index) {
      this[index] = IEDomainPrefix + ' ' + this[index]
    }, IEDomains)

    const domains = ordinaryDomains.concat(IEDomains)

    let input = document.querySelector('input[name=tags-manual-suggestions]')
    // init Tagify script on the above inputs
    let tagify = new Tagify(input, {
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
        this.response.pickedOrdinaryNodes[domain] = this.ordinaryNodes[domain]

        // if (this.nodes.ordinaryNodes[0][domain].STOR1_HREF_LEN > this.response.STOR1_HREF_LEN_MAX) this.response.STOR1_HREF_LEN_MAX = this.nodes.ordinaryNodes[0][domain].STOR1_HREF_LEN
        // if (this.nodes.ordinaryNodes[0][domain].STOR2_INPUT_LEN > this.response.STOR2_INPUT_LEN_MAX) this.response.STOR2_INPUT_LEN_MAX = this.nodes.ordinaryNodes[0][domain].STOR2_INPUT_LEN
        // if (this.nodes.ordinaryNodes[0][domain].STOR2_REFS_LEN > this.response.STOR2_REFS_LEN_MAX) this.response.STOR2_REFS_LEN_MAX = this.nodes.ordinaryNodes[0][domain].STOR2_REFS_LEN
        // // if (this.nodes.ordinaryNodes[0][domain].G_TOPIC_LEN > this.response.TOPIC_LEN_MAX) this.response.TOPIC_LEN_MAX = this.nodes.ordinaryNodes[0][domain].G_TOPIC_LEN
        // if (this.nodes.ordinaryNodes[0][domain].ANY_NEWS_PREV_HREF_LEN > this.response.PREV_HREF_LEN_MAX) this.response.PREV_HREF_LEN_MAX = this.nodes.ordinaryNodes[0][domain].ANY_NEWS_PREV_HREF_LEN
      }
      if (value.includes(IEDomainPrefix)) {
        let regex = new RegExp(IEDomainPrefix + ' ')
        let domain = value.replace(regex, '')
        this.response.pickedIENodes[domain] = this.IENodes[domain]

        // if (this.nodes.IENodes[0][domain].STOR1_HREF_LEN > this.response.STOR1_HREF_LEN_MAX) this.response.STOR1_HREF_LEN_MAX = this.nodes.IENodes[0][domain].STOR1_HREF_LEN
        // if (this.nodes.IENodes[0][domain].STOR2_INPUT_LEN > this.response.STOR2_INPUT_LEN_MAX) this.response.STOR2_INPUT_LEN_MAX = this.nodes.IENodes[0][domain].STOR2_INPUT_LEN
        // if (this.nodes.IENodes[0][domain].STOR2_REFS_LEN > this.response.STOR2_REFS_LEN_MAX) this.response.STOR2_REFS_LEN_MAX = this.nodes.IENodes[0][domain].STOR2_REFS_LEN
        // // if (this.nodes.IENodes[0][domain].E_TOPIC_LEN > this.response.TOPIC_LEN_MAX) this.response.TOPIC_LEN_MAX = this.nodes.IENodes[0][domain].E_TOPIC_LEN
        // if (this.nodes.IENodes[0][domain].EM_NEWS_PREV_HREF_LEN > this.response.PREV_HREF_LEN_MAX) this.response.PREV_HREF_LEN_MAX = this.nodes.IENodes[0][domain].EM_NEWS_PREV_HREF_LEN
      }

      sessionStorage.setItem('selectedNodes', JSON.stringify(this.response))
    }.bind(this))

    // CODE FOR REMOVE EVENT

    tagify.on('remove', function (e) {
      let value = e.detail.data.value

      if (value.includes(ordinaryDomainPrefix)) {
        let regex = new RegExp(ordinaryDomainPrefix + ' ')
        let domain = value.replace(regex, '')
        delete this.response.pickedOrdinaryNodes[domain]

        // if (this.nodes.ordinaryNodes[0][domain].STOR1_HREF_LEN > this.response.STOR1_HREF_LEN_MAX) this.response.STOR1_HREF_LEN_MAX = this.nodes.ordinaryNodes[0][domain].STOR1_HREF_LEN
        // if (this.nodes.ordinaryNodes[0][domain].STOR2_INPUT_LEN > this.response.STOR2_INPUT_LEN_MAX) this.response.STOR2_INPUT_LEN_MAX = this.nodes.ordinaryNodes[0][domain].STOR2_INPUT_LEN
        // if (this.nodes.ordinaryNodes[0][domain].STOR2_REFS_LEN > this.response.STOR2_REFS_LEN_MAX) this.response.STOR2_REFS_LEN_MAX = this.nodes.ordinaryNodes[0][domain].STOR2_REFS_LEN
        // // if (this.nodes.ordinaryNodes[0][domain].G_TOPIC_LEN > this.response.TOPIC_LEN_MAX) this.response.TOPIC_LEN_MAX = this.nodes.ordinaryNodes[0][domain].G_TOPIC_LEN
        // if (this.nodes.ordinaryNodes[0][domain].ANY_NEWS_PREV_HREF_LEN > this.response.PREV_HREF_LEN_MAX) this.response.PREV_HREF_LEN_MAX = this.nodes.ordinaryNodes[0][domain].ANY_NEWS_PREV_HREF_LEN
      }
      if (value.includes(IEDomainPrefix)) {
        let regex = new RegExp(IEDomainPrefix + ' ')
        let domain = value.replace(regex, '')
        delete this.response.pickedIENodes[domain]

        // if (this.nodes.IENodes[0][domain].STOR1_HREF_LEN > this.response.STOR1_HREF_LEN_MAX) this.response.STOR1_HREF_LEN_MAX = this.nodes.IENodes[0][domain].STOR1_HREF_LEN
        // if (this.nodes.IENodes[0][domain].STOR2_INPUT_LEN > this.response.STOR2_INPUT_LEN_MAX) this.response.STOR2_INPUT_LEN_MAX = this.nodes.IENodes[0][domain].STOR2_INPUT_LEN
        // if (this.nodes.IENodes[0][domain].STOR2_REFS_LEN > this.response.STOR2_REFS_LEN_MAX) this.response.STOR2_REFS_LEN_MAX = this.nodes.IENodes[0][domain].STOR2_REFS_LEN
        // // if (this.nodes.IENodes[0][domain].E_TOPIC_LEN > this.response.TOPIC_LEN_MAX) this.response.TOPIC_LEN_MAX = this.nodes.IENodes[0][domain].E_TOPIC_LEN
        // if (this.nodes.IENodes[0][domain].EM_NEWS_PREV_HREF_LEN > this.response.PREV_HREF_LEN_MAX) this.response.PREV_HREF_LEN_MAX = this.nodes.IENodes[0][domain].EM_NEWS_PREV_HREF_LEN
      }

      if (Object.keys(this.response.pickedOrdinaryNodes).length === 0 && Object.keys(this.response.pickedIENodes).length === 0) {
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
