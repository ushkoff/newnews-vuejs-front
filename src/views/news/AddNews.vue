<template lang="pug">
  div
    .def-page-header(:style="{'background-image': `url('${publicPath}assets/img/pages/news/manage/header.jpg')`}")
      .container(class="d-flex align-items-center justify-content-center justify-content-md-start pt-5")
        span.def-page-header-name(class="pl-4 pr-4") Add News
    .container(class="pt-4")
      AuthNavbar

      .row(class="mt-4 mt-md-5")
        div(class="col-12 col-xl-8")

          // AddNewsForm(@submitted="getNewsDataForNodes")

          YourNews

        div(class="col-12 col-xl-4")
          Sidebar

</template>

<script>
import AuthNavbar from '@/components/app/navigation/AuthNavbar'
// import AddNewsForm from '@/components/news manage/AddNewsForm'
import YourNews from '@/components/news/YourNews'
import Sidebar from '@/components/app/Sidebar'
// import catList from '@/NN config/link-lists/categories'

export default {
  name: 'add-news',
  metaInfo () {
    return { title: this.$title('Add News') }
  },
  data: () => ({
    publicPath: process.env.BASE_URL,
    // categories: catList.categories,
    // linkOnNewsInWebsiteStorage: '',
    // dispatchedNewsIEDomains: [],
    // dispatchedNewsDomains: [],
    // unsentNewsDomainsInfo: {},
    // modalAlerts: []
  }),
  components: {
    AuthNavbar,
    // AddNewsForm,
    YourNews,
    Sidebar
  },
  methods: {
    // getNewsDataForNodes (data) {
    //   if (data) {
    //     // What we have in data object:
    //     // title, content, category_id, refs
    //     // pickedOrdinaryNodes, pickedIENodes, IEDomains, onlyShortNews
    //     // hash, signature, authorPublicKey
    //     // newsAddedOnWebsite

    //     if (data.newsAddedOnWebsite) {
    //       this.modalAlerts.push({
    //         title: 'Success',
    //         icon: 'success',
    //         text: 'Your news has been added to our website.'
    //       })
    //     }

    //     if (data.newsWebsiteAndPanopticon) {
    //       this.sendNewsToPanopticonNodes(data.panopticonNodes[0], data.authorPublicKey, data.hash)
    //     }

    //     if (!data.newsWebsiteAndPanopticon) {
    //       let fullNewsObject = this.$nodeFullNewsObject(data.authorPublicKey, (data.title + '_' + data.content), data.refs, data.signature)

    //       if (!data.onlyShortNews) { // If also save fullnews on IE
    //         this.sendNewsToIENodes(fullNewsObject, data)
    //       } else { // If only short news -> save to website storage
    //         this.dispatchedNewsIEDomains.push(process.env.VUE_APP_API) // link on backend API
    //       }

    //       if (this.dispatchedNewsIEDomains.length === 0) { // If no connection to any IE nodes
    //         this.dispatchedNewsIEDomains.push(process.env.VUE_APP_API)
    //       }

    //       let linksOnFullNews = []
    //       this.dispatchedNewsIEDomains.forEach(function (part, index) {
    //         let link = this.makeLinkToFullNews(this.dispatchedNewsIEDomains[index], data.hash)
    //         linksOnFullNews.push(link)
    //       }.bind(this), this.dispatchedNewsIEDomains)

    //       let categoryTitle = this.categories[data.category_id - 1].title
    //       let previewAndHref = this.makePreviewAndHref(data.title, linksOnFullNews)

    //       let shortNewsObject = this.$nodeShortNewsObject(categoryTitle, previewAndHref)

    //       if (data.onlyShortNews) { // if on IE sending short news
    //         this.sendNewsToIENodes(shortNewsObject, data, previewAndHref)
    //       }
    //       this.sendNewsToOrdinaryNodes(shortNewsObject, previewAndHref, data)

    //       this.dispatchedNewsDomains = this.dispatchedNewsDomains.concat(this.dispatchedNewsIEDomains)

    //       if (!((this.dispatchedNewsDomains.length === 1) && (this.dispatchedNewsDomains[0] === process.env.VUE_APP_API))) {
    //         if (data.onlyShortNews) {
    //           this.saveNodeNewsToWebsiteStorage(fullNewsObject, data.hash)
    //         }
    //         if (data.panopticonNodes) this.sendNewsToPanopticonNodes(data.panopticonNodes[0], data.authorPublicKey, data.hash)
    //       }

    //       localStorage.setItem('chooseNodesFormResponse', null)
    //     }

    //     this.showErrorsAlert()
    //     this.showDispatchedNewsDomains()

    //     this.$swal.queue(this.modalAlerts)

    //     this.$router.push({ name: 'local-news' })
    //   }
    // },
    // async sendNewsToIENodes (nodeNewsObject, data, previewAndHref = '') {
    //   const pickedIENodes = data.pickedIENodes
    //   const pickedIEDomains = Object.keys(pickedIENodes)
    //   if (pickedIEDomains.length !== 0) {
    //     pickedIEDomains.forEach(async function (element, index) {
    //       let currentDomain = pickedIEDomains[index]

    //       if (data.onlyShortNews) { // If sending short news to node
    //         if (previewAndHref.length > data.pickedIENodes[currentDomain].EM_NEWS_PREV_HREF_LEN) {
    //           if (this.unsentNewsDomainsInfo[currentDomain]) {
    //             this.unsentNewsDomainsInfo[currentDomain].prevHrefLenError = 1
    //           } else {
    //             this.unsentNewsDomainsInfo[currentDomain] = { 'prevHrefLenError': 1 }
    //           }
    //           return true // continue
    //         }
    //       }

    //       if (pickedIENodes[currentDomain].T_PRV_NONCE <= 0) {
    //         if (this.unsentNewsDomainsInfo[currentDomain]) {
    //           this.unsentNewsDomainsInfo[currentDomain].tempPrvNonceError = 1
    //         } else {
    //           this.unsentNewsDomainsInfo[currentDomain] = { 'tempPrvNonceError': 1 }
    //         }
    //         return true // continue
    //       }

    //       let msg = this.$nodeMsgObject(data.authorPublicKey, nodeNewsObject, pickedIENodes[currentDomain].SPACE_ID, pickedIENodes[currentDomain].LS, pickedIENodes[currentDomain].T_PRV_NONCE)

    //       let link
    //       if (data.onlyShortNews) {
    //         link = currentDomain + '/emnews'
    //       } else {
    //         link = currentDomain + '/stor2'
    //       }

    //       await this.$http.post(link, msg).then((response) => {
    //         if ((response.data === 1) || (response.data === '1')) {
    //           this.$decrementTempPrvNonce('IE', currentDomain)
    //           this.dispatchedNewsIEDomains.push(currentDomain)
    //         } else { console.log('Wrong answer from ' + currentDomain) } // eslint-disable-line
    //       }).catch((e) => {
    //         console.log('No connection to ' + currentDomain) // eslint-disable-line
    //         throw e
    //       })
    //     }.bind(this))
    //   }
    // },
    // async sendNewsToOrdinaryNodes (shortNewsObject, previewAndHref, data) {
    //   const pickedOrdinaryNodes = data.pickedOrdinaryNodes
    //   const pickedOrdinaryDomains = Object.keys(pickedOrdinaryNodes)

    //   if (pickedOrdinaryDomains.length !== 0) {
    //     pickedOrdinaryDomains.forEach(async function (element, index) {
    //       let currentDomain = pickedOrdinaryDomains[index]

    //       if (previewAndHref.length > data.pickedOrdinaryNodes[currentDomain].ANY_NEWS_PREV_HREF_LEN) {
    //         if (this.unsentNewsDomainsInfo[currentDomain]) {
    //           this.unsentNewsDomainsInfo[currentDomain].prevHrefLenError = 1
    //         } else {
    //           this.unsentNewsDomainsInfo[currentDomain] = { 'prevHrefLenError': 1 }
    //         }
    //         return true // continue
    //       }

    //       if (pickedOrdinaryNodes[currentDomain].T_PRV_NONCE <= 0) {
    //         if (this.unsentNewsDomainsInfo[currentDomain]) {
    //           this.unsentNewsDomainsInfo[currentDomain].tempPrvNonceError = 1
    //         } else {
    //           this.unsentNewsDomainsInfo[currentDomain] = { 'tempPrvNonceError': 1 }
    //         }
    //         return true // continue
    //       }

    //       let msg = this.$nodeMsgObject(data.authorPublicKey, shortNewsObject, pickedOrdinaryNodes[currentDomain].SPACE_ID, pickedOrdinaryNodes[currentDomain].LS, pickedOrdinaryNodes[currentDomain].T_PRV_NONCE)

    //       await this.$http.post(currentDomain + '/anynews', msg).then((response) => {
    //         if ((response.data === 1) || (response.data === '1')) {
    //           this.$decrementTempPrvNonce('ORDINARY', currentDomain)
    //           this.dispatchedNewsDomains.push(currentDomain)
    //         } else { console.log('Wrong answer from ' + currentDomain) } // eslint-disable-line
    //       }).catch((e) => {
    //         console.log('No connection to ' + currentDomain) // eslint-disable-line
    //         throw e
    //       })
    //     }.bind(this))
    //   }
    // },
    // async sendNewsToPanopticonNodes (panopticonNodes, publicKey, hash) {
    //   const panopticonDomains = Object.keys(panopticonNodes)

    //   if (panopticonDomains.length !== 0) {
    //     panopticonDomains.forEach(async function (element, index) {
    //       let currentDomain = panopticonDomains[index]

    //       let panopticonObject = this.$nodePanopticonObject(publicKey, hash, panopticonNodes[currentDomain].SPACE_ID, panopticonNodes[currentDomain].NONCE)

    //       await this.$http.post(currentDomain + '/panopticon', panopticonObject).then((response) => {
    //         if ((response.data === 1) || (response.data === '1')) {
    //           this.$incrementPanopticonNonce(currentDomain)
    //           this.dispatchedNewsDomains.push(currentDomain)
    //         } else { console.log('Wrong answer from ' + currentDomain) } // eslint-disable-line
    //       }).catch((e) => {
    //         console.log('No connection to ' + currentDomain) // eslint-disable-line
    //         throw e
    //       })
    //     }.bind(this))
    //   }
    // },
    // async saveNodeNewsToWebsiteStorage (fullNewsObject, hash) {
    //   const data = {
    //     hash,
    //     content_json: JSON.stringify(fullNewsObject)
    //   }
    //   await this.$http.post(this.$api + '/news/encoded/store', data).then((response) => {
    //     console.log('News successfully saved in ' + process.env.VUE_APP_TITLE + ' website storage')
    //     this.modalAlerts.push({
    //       title: 'Success',
    //       icon: 'success',
    //       html: `
    //         <b>Attention!</b> Since the full news was not sent to any of the nodes, we saved your full news in the ${process.env.VUE_APP_TITLE} storage of our site.<br>
    //         <b>Link:</b> ${this.linkOnNewsInWebsiteStorage}
    //       `
    //     })
    //   }).catch((e) => {
    //     this.modalAlerts.push({
    //       title: 'Error',
    //       icon: 'error',
    //       html: `<b>Attention!</b> The news was not added to the ${process.env.VUE_APP_TITLE} website storage. The link to the full news that is stored on the website is invalid.`
    //     })
    //     throw e
    //   })
    // },
    // makeLinkToFullNews (IEDomain, hash) {
    //   let link
    //   if (IEDomain === process.env.VUE_APP_API) { // if IE is NewNews storage
    //     link = IEDomain + '/news/encoded/' + hash
    //     this.linkOnNewsInWebsiteStorage = link
    //   } else {
    //     link = IEDomain + '/getstore/' + hash
    //   }

    //   return link
    // },
    // makePreviewAndHref (title, links) {
    //   let previewAndHref = title

    //   links.forEach(function (element, index) {
    //     previewAndHref += '_' + this[index]
    //   }, links)

    //   return previewAndHref
    // },
    // showErrorsAlert () {
    //   const domainsErrorsInfo = this.unsentNewsDomainsInfo
    //   const domainsErrors = Object.keys(domainsErrorsInfo)

    //   if (domainsErrors.length !== 0) {
    //     let domainsPrevHrefErrorHtml = ''
    //     let domainsTempPrvNonceErrorHtml = ''
    //     domainsErrors.forEach(function (element, index) {
    //       if (domainsErrorsInfo[this[index]].prevHrefLenError) {
    //         domainsPrevHrefErrorHtml += `<b><span>${this[index]}</span>;</b> `
    //       }
    //       if (domainsErrorsInfo[this[index]].tempPrvNonceError) {
    //         domainsTempPrvNonceErrorHtml += `<b><span>${this[index]}</span>;</b> `
    //       }
    //     }, domainsErrors)

    //     if (domainsPrevHrefErrorHtml !== '') {
    //       domainsPrevHrefErrorHtml += `
    //         doesn't support that many characters in a field NEWS_PREV_HREF_LEN (title + IE domains with full news links).
    //         <b>NO NEWS</b> has been sent to <b>THESE NODES</b>. To fix the problem, try to reduce the number of full news nodes or read node documentation. <br>
    //       `
    //       this.modalAlerts.push({
    //         title: 'Failure with some nodes',
    //         icon: 'error',
    //         html: domainsPrevHrefErrorHtml,
    //         allowOutsideClick: false
    //       })
    //     }
    //     if (domainsTempPrvNonceErrorHtml !== '') {
    //       domainsTempPrvNonceErrorHtml += `
    //         cannot receive your news. Check the T_PRV_NONCE field, its value must be greater than zero.<br>
    //         <b>Wait some time until next state</b>.
    //       `
    //       this.modalAlerts.push({
    //         title: 'Failure with some nodes',
    //         icon: 'error',
    //         html: domainsTempPrvNonceErrorHtml,
    //         allowOutsideClick: false
    //       })
    //     }
    //   }
    // },
    // showDispatchedNewsDomains () {
    //   const dispatchedDomains = this.dispatchedNewsDomains
    //   let dispatchedDomainsHTML = ''

    //   if ((dispatchedDomains.length !== 0) && !((dispatchedDomains.length === 1) && (dispatchedDomains[0] === process.env.VUE_APP_API))) {
    //     dispatchedDomainsHTML += `
    //       <b>${dispatchedDomains.join('; ')}</b> have successfully received your news!<br>
    //       (including ORDINARY, IE and data for PANOPTICON nodes)<br>
    //       <b>No more nodes received the news!</b> Perhaps there is no connection to these nodes (information in the console). Otherwise read node documentation.
    //     `
    //     this.modalAlerts.push({
    //       title: 'Success',
    //       icon: 'success',
    //       html: dispatchedDomainsHTML,
    //       allowOutsideClick: false
    //     })
    //   } else {
    //     dispatchedDomainsHTML = `
    //       No nodes accepted your news.<br>
    //       (including ORDINARY, IE and data for PANOPTICON)<br>
    //       <b>Ignore this message if you haven't added any nodes.</b><br>
    //       Perhaps there is no connection to the nodes (information in the console). Otherwise read node documentation.<br>
    //     `
    //     this.modalAlerts.push({
    //       title: 'Failure',
    //       icon: 'error',
    //       html: dispatchedDomainsHTML,
    //       allowOutsideClick: false
    //     })
    //   }
    // },
    // checkIfExistPublicAndPrivateKeys () {
    //   if (!localStorage.getItem('PUB') || !localStorage.getItem('PRV')) {
    //     this.$swal.fire({
    //       title: 'Key pair?',
    //       text: 'To add news, add or generate your public and private keys',
    //       icon: 'question',
    //       allowOutsideClick: false
    //     }).then((result) => {
    //       if (result.value) this.$router.push({ name: 'key-pair' })
    //     })
    //   }
    // }
  },
  async mounted () {
    // this.checkIfExistPublicAndPrivateKeys()
  },
  beforeRouteLeave (to, from, next) {
    // localStorage.setItem('chooseNodesFormResponse', null)
    next()
  }
}
</script>

<style lang="scss" scoped>
// @import '@/assets/scss/utils/vars';
// @import '@/assets/scss/utils/mixins';

</style>
