<template lang="pug">
  div
    .def-page-header(:style="{'background-image': `url('${publicPath}assets/img/pages/news/manage/header.jpg')`}")
      .container(class="d-flex align-items-center justify-content-center justify-content-md-start pt-5")
        span.def-page-header-name(class="pl-4 pr-4") Add News
    .container(class="pt-4")
      AuthNavbar

      .row(class="mt-4 mt-md-5")
        div(class="col-12 col-xl-8")

          AddNewsForm(@submitted="sendNewsToNodesData")

          YourNews

        div(class="col-12 col-xl-4")
          Sidebar

</template>

<script>
import catList from '@/config/links/categories'
import AuthNavbar from '@/components/app/navigation/AuthNavbar'
import AddNewsForm from '@/components/news/manage/AddNewsForm'
import YourNews from '@/components/news/YourNews'
import Sidebar from '@/components/app/Sidebar'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'add-news',
  metaInfo () {
    return { title: this.$title('Add News') }
  },
  data: () => ({
    publicPath: process.env.BASE_URL,
    categories: catList.categories,
    dispatchedNewsIEDomains: [],
    dispatchedNewsDomains: [],
    unsentNewsDomainsInfo: {},
    modalAlerts: [],
    fullNewsWebsiteLink: null
  }),
  components: {
    AuthNavbar,
    AddNewsForm,
    YourNews,
    Sidebar
  },
  computed: mapGetters(['fullNodeNewsObject', 'shortNodeNewsObject', 'msgNodeObject', 'getFullNewsLink', 'getPreviewAndHref']),
  methods: {
    ...mapActions(['doesKeyPairExist', 'storeFullNodeNews', 'sendNewsToIE', 'sendNewsToOrdinaryNode']),

    sendNewsToNodesData (data) {
      // {} data:
      // title, content, categoryID, userID, refs
      // pickedOrdinaryNodes, pickedIENodes, IEDomains, onlyShortNews
      // hash, signature, publicKey
      // newsAddedOnWebsite

      if (data.newsAddedOnWebsite) {
        this.modalAlerts.push({
          title: 'Success',
          icon: 'success',
          text: 'Your news has been added to our website.'
        })
        // If only to website
        if (Object.keys(data).length == 1) {
          this.finishActions()
          return false
        }
      }

      // nodes
      const fullNewsData = {
        publicKey: data.publicKey,
        input: data.title + '_' + data.content,
        refs: data.refs,
        signature: data.signature
      }
      const fullNewsObject = this.fullNodeNewsObject(fullNewsData)

      console.log('FULL', fullNewsObject)
      
      //
      // SHORT NEWS ONLY OR NOT
      //
      if (!data.onlyShortNews) { // If also save fullnews on IE
        this.sendNewsToIENodes(fullNewsObject, data)
      } else { // If only short news -> save to website storage
        this.dispatchedNewsIEDomains.push(process.env.VUE_APP_API) // link on backend API
      }

      //
      // IF NO CONNECTION TO IE NODES
      //
      if (this.dispatchedNewsIEDomains.length === 0) { // If no connection to any IE nodes
        this.dispatchedNewsIEDomains.push(process.env.VUE_APP_API)
      }

      const linksOnFullNews = this.getLinksOnFullNews(data.hash)
      const categoryTitle = this.categories[data.categoryID - 1].title
      const previewAndHref = this.getPreviewAndHref({ title: data.title, links: linksOnFullNews })

      const shortNewsObject = this.shortNodeNewsObject({ categoryTitle, previewAndHref })

      console.log('SHORT', fullNewsObject)

      if (data.onlyShortNews) { // if on IE sending short news
        this.sendNewsToIENodes(shortNewsObject, data, previewAndHref)
      }
      this.sendNewsToOrdinaryNodes(shortNewsObject, previewAndHref, data)

      this.dispatchedNewsDomains = this.dispatchedNewsDomains.concat(this.dispatchedNewsIEDomains)

      if (!((this.dispatchedNewsDomains.length === 1) && (this.dispatchedNewsDomains[0] === process.env.VUE_APP_API))) {
        if (data.onlyShortNews) {
          this.saveFullNewsOnWebsite(fullNewsObject, data.hash, data.userID)
        }
        // if (data.panopticonNodes) this.sendNewsToPanopticonNodes(data.panopticonNodes[0], data.authorPublicKey, data.hash)
      }

      sessionStorage.removeItem('selectedNodes')

      this.showErrorsAlert()
      this.showDispatchedNewsDomains()

      this.finishActions()
    },

    async sendNewsToIENodes (nodeNewsObject, data, previewAndHref = '') { // eslint-disable-line
      const pickedIENodes = data.pickedIENodes
      const pickedIEDomains = Object.keys(pickedIENodes)
      if (pickedIEDomains.length !== 0) {
        pickedIEDomains.forEach(async function (element, index) {
          let currentDomain = pickedIEDomains[index]

          // if (data.onlyShortNews) { // If sending short news to node
          //   if (previewAndHref.length > data.pickedIENodes[currentDomain].EM_NEWS_PREV_HREF_LEN) {
          //     if (this.unsentNewsDomainsInfo[currentDomain]) {
          //       this.unsentNewsDomainsInfo[currentDomain].prevHrefLenError = 1
          //     } else {
          //       this.unsentNewsDomainsInfo[currentDomain] = { 'prevHrefLenError': 1 }
          //     }
          //     return true // continue
          //   }
          // }

          // if (pickedIENodes[currentDomain].T_PRV_NONCE <= 0) {
          //   if (this.unsentNewsDomainsInfo[currentDomain]) {
          //     this.unsentNewsDomainsInfo[currentDomain].tempPrvNonceError = 1
          //   } else {
          //     this.unsentNewsDomainsInfo[currentDomain] = { 'tempPrvNonceError': 1 }
          //   }
          //   return true // continue
          // }

          const newsData = {
            publicKey: data.publicKey,
            data: nodeNewsObject,
            spaceID: pickedIENodes[currentDomain].SPACE_ID,
            LS: pickedIENodes[currentDomain].LS,
            prvNonce: pickedIENodes[currentDomain].T_PRV_NONCE,
          }
          const msg = this.msgNodeObject(newsData)

          let link = currentDomain 
          if (data.onlyShortNews) link += '/emnews'
          else link += '/stor2'

          await this.sendNewsToIE(link, msg, currentDomain).then(() => {
            this.dispatchedNewsIEDomains.push(currentDomain)
          })
        }.bind(this))
      }
    },
    async sendNewsToOrdinaryNodes (shortNewsObject, previewAndHref, data) {
      const pickedOrdinaryNodes = data.pickedOrdinaryNodes
      const pickedOrdinaryDomains = Object.keys(pickedOrdinaryNodes)

      if (pickedOrdinaryDomains.length !== 0) {
        pickedOrdinaryDomains.forEach(async function (element, index) {
          let currentDomain = pickedOrdinaryDomains[index]

          // if (previewAndHref.length > data.pickedOrdinaryNodes[currentDomain].ANY_NEWS_PREV_HREF_LEN) {
          //   if (this.unsentNewsDomainsInfo[currentDomain]) {
          //     this.unsentNewsDomainsInfo[currentDomain].prevHrefLenError = 1
          //   } else {
          //     this.unsentNewsDomainsInfo[currentDomain] = { 'prevHrefLenError': 1 }
          //   }
          //   return true // continue
          // }

          // if (pickedOrdinaryNodes[currentDomain].T_PRV_NONCE <= 0) {
          //   if (this.unsentNewsDomainsInfo[currentDomain]) {
          //     this.unsentNewsDomainsInfo[currentDomain].tempPrvNonceError = 1
          //   } else {
          //     this.unsentNewsDomainsInfo[currentDomain] = { 'tempPrvNonceError': 1 }
          //   }
          //   return true // continue
          // }

          const newsData = {
            publicKey: data.publicKey,
            data: shortNewsObject,
            spaceID: pickedOrdinaryNodes[currentDomain].SPACE_ID,
            LS: pickedOrdinaryNodes[currentDomain].LS,
            prvNonce: pickedOrdinaryNodes[currentDomain].T_PRV_NONCE,
          }
          const msg = this.msgNodeObject(newsData)

          await this.sendNewsToOrdinaryNode({ currentDomain, msg }).then(() => {
            this.dispatchedNewsDomains.push(currentDomain)
          })
        }.bind(this))
      }
    },
    async saveFullNewsOnWebsite (fullNewsObject, hash, userID) {
      const data = {
        hash,
        contentJson: JSON.stringify(fullNewsObject),
        userID
      }
      await this.storeFullNodeNews(data).then(() => {
        this.modalAlerts.push({
          title: 'Success',
          icon: 'success',
          html: `
            <b>Attention!</b> Since the full news was not sent to any of the nodes, we saved your full news in the ${process.env.VUE_APP_TITLE} storage of our site.<br>
            <b>Link:</b> ${this.fullNewsWebsiteLink}
          `
        })
      }).catch((msg) => {
        this.modalAlerts.push({
          title: 'Error',
          icon: 'error',
          html: `<b>Attention!</b> The news was not added to the ${process.env.VUE_APP_TITLE} website storage. The link to the full news that is stored on the website is invalid.${msg}`
        })
      })
    },

    showErrorsAlert () {
      const domainsErrorsInfo = this.unsentNewsDomainsInfo
      const domainsErrors = Object.keys(domainsErrorsInfo)

      if (domainsErrors.length !== 0) {
        let domainsPrevHrefErrorHtml = ''
        // let domainsTempPrvNonceErrorHtml = ''
        domainsErrors.forEach(function (element, index) {
          if (domainsErrorsInfo[this[index]].prevHrefLenError) {
            domainsPrevHrefErrorHtml += `<b><span>${this[index]}</span>;</b> `
          }
          // if (domainsErrorsInfo[this[index]].tempPrvNonceError) {
          //   domainsTempPrvNonceErrorHtml += `<b><span>${this[index]}</span>;</b> `
          // }
        }, domainsErrors)

        if (domainsPrevHrefErrorHtml !== '') {
          domainsPrevHrefErrorHtml += `
            doesn't support that many characters in a field NEWS_PREV_HREF_LEN (title + IE domains with full news links).
            <b>NO NEWS</b> has been sent to <b>THESE NODES</b>. To fix the problem, try to reduce the number of full news nodes or read node documentation. <br>
          `
          this.modalAlerts.push({
            title: 'Failure with some nodes',
            icon: 'error',
            html: domainsPrevHrefErrorHtml,
            allowOutsideClick: false
          })
        }
        // if (domainsTempPrvNonceErrorHtml !== '') {
        //   domainsTempPrvNonceErrorHtml += `
        //     cannot receive your news. Check the T_PRV_NONCE field, its value must be greater than zero.<br>
        //     <b>Wait some time until next state</b>.
        //   `
        //   this.modalAlerts.push({
        //     title: 'Failure with some nodes',
        //     icon: 'error',
        //     html: domainsTempPrvNonceErrorHtml,
        //     allowOutsideClick: false
        //   })
        // }
      }
    },
    showDispatchedNewsDomains () {
      const dispatchedDomains = this.dispatchedNewsDomains
      let dispatchedDomainsHTML = ''

      if ((dispatchedDomains.length !== 0) && !((dispatchedDomains.length === 1) && (dispatchedDomains[0] === process.env.VUE_APP_API))) {
        dispatchedDomainsHTML += `
          <b>${dispatchedDomains.join('; ')}</b> have successfully received your news!<br>
          (including ORDINARY, IE and data for PANOPTICON nodes)<br>
          <b>No more nodes received the news!</b> Perhaps there is no connection to these nodes (information in the console). Otherwise read node documentation.
        `
        this.modalAlerts.push({
          title: 'Success',
          icon: 'success',
          html: dispatchedDomainsHTML,
          allowOutsideClick: false
        })
      } else {
        dispatchedDomainsHTML = `
          No nodes accepted your news.<br>
          (including ORDINARY, IE and data for PANOPTICON)<br>
          <b>Ignore this message if you haven't added any nodes.</b><br>
          Perhaps there is no connection to the nodes (information in the console). Otherwise read node documentation.<br>
        `
        this.modalAlerts.push({
          title: 'Failure',
          icon: 'error',
          html: dispatchedDomainsHTML,
          allowOutsideClick: false
        })
      }
    },

    getLinksOnFullNews (hash) {
      let linksOnFullNews = []
      this.dispatchedNewsIEDomains.forEach(function (part, index) {
        let link = this.getFullNewsLink({ IEDomain: this.dispatchedNewsIEDomains[index], hash })
        linksOnFullNews.push(link)
      }.bind(this), this.dispatchedNewsIEDomains)

      return linksOnFullNews
    },
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
    finishActions () {
      this.$swal.queue(this.modalAlerts)
      this.$router.push({ name: 'local-news' })
    }
  },
  async mounted () {
    this.checkIfKeyPairExists()
  },
  beforeRouteEnter (to, from, next) {
    if (to.name == 'add-news')
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
// @import '@/assets/scss/utils/vars';
// @import '@/assets/scss/utils/mixins';

</style>
