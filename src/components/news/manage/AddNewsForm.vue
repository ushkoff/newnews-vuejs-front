<template lang="pug">
  .add-news-form
    vue-recaptcha(
      ref="recaptcha"
      size="invisible"
      :sitekey="sitekey"
      @verify="submitHandler"
      @expired="onCaptchaExpired"
    )

    .loading-div(v-show="loading")
      DefaultLoader(addClass="relative h-0")

    form.nn-def-form(v-show="!loading" ref="addNewsForm" class="pl-4 pr-4 pb-4 pl-lg-5 pr-lg-5 pb-lg-5" @submit.prevent="validate")

      //- Select mode

      .profile-settings-block
        span.profile-settings-title
          | Place where to add news: <span ref="newsModeTitle">{{ addingNewsMode }}</span> | <router-link :to="{ name: 'home' }">NN news</router-link>
        span.profile-settings-line
        form(class="mt-3" @change="changeAddingMode")
          .form-check
            input#checkWebsite.form-check-input(type="checkbox" name="checkWebsite" v-model="addingNewsWebsite")
            label.form-check-label(for="checkWebsite") Website
          .form-check(class="mt-2")
            input#checkNodes.form-check-input(type="checkbox" @change="checkIfNodesAdded()" name="checkNodes" v-model="addingNewsNodes")
            label.form-check-label(for="checkNodes") Nodes

      //- Form to select specific nodes to send news
      SelectNodesForm(v-if="showSelectNodesForm" :ordinaryNodes="ordinaryNodes" :IENodes="IENodes")
      .nn-def-input-error(v-if="nodesInputError" class="mt-3") Select the node to which you want to send the news

      div(class="mt-5")
        span.nn-def-label 1 News Title
        input#textTitleNews(
          type="text" :maxlength="maxTitleNews" v-model.trim="textTitleNews" placeholder="Title..." class="nn-def-input mt-2 pl-2 pr-2 pl-lg-3 pr-lg-3"
          :class="{invalid: ($v.textTitleNews.$dirty && !$v.textTitleNews.required) || ($v.textTitleNews.$dirty && !$v.textTitleNews.minLength)}"
        )
        .nn-def-input-error(v-if="$v.textTitleNews.$dirty && !$v.textTitleNews.required" class="mt-2") "News Title" field is required
        .nn-def-input-error(v-if="$v.textTitleNews.$dirty && !$v.textTitleNews.minLength" class="mt-2") "News Title" field is too short
        .nn-def-counter(class="mt-1") <span v-text="newsTitleCounter"></span>/{{ maxTitleNews }}

      div(class="mt-4")
        span.nn-def-label 2 News Content
        #addNewsEditor
        .nn-def-input-error(v-if="errorTextContentNews && firstHasBeenValidated" class="mt-2") "News Content" field is too short
        .nn-def-counter(class="mt-1") <span id="newsContentCounter"></span>/{{ maxContentNews }}

      div(class="mt-4")
        span.nn-def-label 3 News Category
        select.nn-def-input(
          v-model.trim="chooseCategory" class="mt-2 pl-2 pr-2 pl-lg-3 pr-lg-3"
          :class="{invalid: (chooseCategory === 'Choose...' && firstHasBeenValidated)}"
        )
          option(disabled) Choose...
          option(
            v-for="cat in categories"
            :key="cat.slug"
            :value="cat.id"
          ) {{ cat.title }}
        .nn-def-input-error(v-if="chooseCategory === 'Choose...' && firstHasBeenValidated" class="mt-2") "News Category" is required

      div(class="mt-4")
        span.nn-def-label 4 News References
        input#textRefsNews(
          type="text" :maxlength="maxRefsNews" v-model.trim="textRefsNews" placeholder="If possible, enter a link to the resource. If there are many links, then use ; " class="nn-def-input mt-2 pl-2 pr-2 pl-lg-3 pr-lg-3"
          :class="{invalid: ($v.textTitleNews.$dirty && !$v.textTitleNews.maxLength) || refsLenError}"
        )
        .nn-def-counter(class="mt-1") <span v-text="newsRefsCounter"></span>/{{ maxRefsNews }}
        .nn-def-input-error(v-if="$v.textTitleNews.$dirty && !$v.textTitleNews.maxLength" class="mt-2") "News References" field is too long
        .nn-def-input-error(v-if="refsLenError" class="mt-2") The length of the field is greater than the allowable length of this field in nodes

      .agree-with-docs(class="mt-4 d-flex")
        input#agreeNewsOffer(type="checkbox" v-model="agreeNewsRules" class="mr-2")
        label(for="agreeNewsOffer") I confirm the authenticity of the news and agree with the <router-link :to="{ name: 'privacy-policy' }" target="_blank">News Offer</router-link> of NewNews.
      .nn-def-input-error(v-if="$v.agreeNewsRules.$dirty && !$v.agreeNewsRules.checked" class="mt-1") Please agree to the terms of the news

      .nn-def-input-error(v-if="inputLenError" class="mt-1") The length of the INPUT (title + content) is greater than the allowable length of this field in nodes
      .nn-def-input-error(v-if="prevHrefLenError" class="mt-1") The length of the PREV_HREF (title + IE news link) is greater than the allowable length of this field in nodes

      .nn-def-input-error(
        v-if="errMsg != null"
        class="server-side-errors mt-3"
      ) {{ errMsg }}

      button(type="submit" class="d-block mx-auto mt-5") Share

</template>

<script>
import cfg from '@/config/news'
import catList from '@/config/links/categories'
import Quill from 'quill'
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import { mapGetters, mapActions } from 'vuex'
// nodes
import SelectNodesForm from '@/components/blockchain/nodes/SelectNodesForm'

export default {
  name: 'add-news-form',
  data: () => ({
    loading: false,
    sitekey: process.env.VUE_APP_RECAPTCHA_SITE_KEY,
    maxTitleNews: cfg.maxArticleTitle,
    maxContentNews: cfg.maxArticleContent,
    maxRefsNews: cfg.maxArticleRefs,
    categories: catList.categories,
    
    firstHasBeenValidated: false,
    textTitleNews: '',
    textContentNews: '',
    textRefsNews: '',
    htmlContentNews: null,
    errorTextContentNews: true,
    chooseCategory: 'Choose...',
    agreeNewsRules: false,
    errMsg: null,

    userID: null,
    userCountry: null,
    userCountryCode: null,

    // nodes
    addingNewsMode: 'Website',
    addingNewsWebsite: true,
    addingNewsNodes: false,
    onlyShortNews: false,
    showSelectNodesForm: false,
    inputLenError: false,
    refsLenError: false,
    prevHrefLenError: false,
    nodesInputError: false,
    pickedOrdinaryNodes: {},
    pickedIENodes: {}
  }),
  components: {
    SelectNodesForm
  },
  validations: {
    textTitleNews: { required, minLength: minLength(10), maxLength: maxLength(101) },
    textRefsNews: { maxLength: maxLength(501) },
    agreeNewsRules: { checked: v => v }
  },
  computed: {
    ...mapGetters(['userLoggedIn', 'userData', 'ordinaryAndIENodesExist', 'ordinaryNodes', 'IENodes', 'articleCryptoData']),
    newsTitleCounter () {
      return this.maxTitleNews - this.textTitleNews.length
    },
    newsRefsCounter () {
      return this.maxRefsNews - this.textRefsNews.length
    }
  },
  methods: {
    ...mapActions(['fetchUserData', 'storeArticle', 'retrieveOrdinaryAndIENodes', 'retrieveKeyPair', 'fetchArticleCryptoData']),

    async submitHandler (recaptchaToken) {
      this.loading = true

      const data = {
        title: this.textTitleNews,
        content: this.textContentNews,
        refs: this.textRefsNews
      }
      await this.fetchArticleCryptoData(data)
      
      if (this.addingNewsWebsite) {
        const data = {
          categoryID: this.chooseCategory,
          userID: this.userID,
          title: this.textTitleNews,
          contentHtml: this.htmlContentNews,
          country: this.userCountry,
          countryCode: this.userCountryCode,
          publicKey: this.articleCryptoData.publicKey,
          signature: this.articleCryptoData.signature,
          refs: this.textRefsNews,
          recaptchaToken
        }
        await this.storeArticle(data).catch((errMsg) => {
          this.loading = false
          this.errMsg = errMsg
          this.$refs.recaptcha.reset()
        })
      }

      // nodes
      if (this.addingNewsNodes) {
        const addToNodesData = {
          newsAddedOnWebsite: this.addingNewsWebsite,
          pickedOrdinaryNodes: this.pickedOrdinaryNodes,
          pickedIENodes: this.pickedIENodes,
          hash: this.articleCryptoData.hash,
          signature: this.articleCryptoData.signature,
          publicKey: this.articleCryptoData.publicKey,
          categoryID: this.chooseCategory,
          userID: this.userID,
          title: this.textTitleNews,
          content: this.textContentNews,
          refs: this.textRefsNews,
          onlyShortNews: this.onlyShortNews
        }
        this.$emit('submitted', addToNodesData)
      }
      if (this.addingNewsWebsite && !this.addingNewsNodes) {
        this.$emit('submitted', { newsAddedOnWebsite: true })
      }
    },
    async validate () {
      this.clearVariables()

      if (this.$v.$invalid || this.chooseCategory === 'Choose...' || this.errorTextContentNews || (!this.addingNewsWebsite && !this.addingNewsNodes)) {
        this.$v.$touch()
        return false
      }

      // nodes
      if (this.addingNewsNodes) {
        await this.nodeNewsValidation().then((response) => {
          if (response == false)
            return false
        })
      }

      this.$refs.recaptcha.execute()
    },
    onCaptchaExpired () {
      this.$refs.recaptcha.reset()
    },

    // nodes
    changeAddingMode () {
      this.$refs.newsModeTitle.style.color = '#393838' // set to default color
      if (this.addingNewsWebsite && this.addingNewsNodes) this.addingNewsMode = 'Website and Nodes'
      if (this.addingNewsWebsite && !this.addingNewsNodes) this.addingNewsMode = 'Website'
      if (!this.addingNewsWebsite && this.addingNewsNodes) this.addingNewsMode = 'Nodes'
      if (!this.addingNewsWebsite && !this.addingNewsNodes) {
        this.addingNewsMode = '[choose mode]'
        this.$refs.newsModeTitle.style.color = '#E71C12' // set to red
      }
    },
    async nodeNewsValidation () {
      const response = JSON.parse(sessionStorage.getItem('selectedNodes'))
      if ((response === null) || (response === 'undefined')) {
        this.nodesInputError = true
        return false
      }

      this.pickedOrdinaryNodes = response.pickedOrdinaryNodes
      this.pickedIENodes = response.pickedIENodes

      // // const STOR1_HREF_LEN_MAX = response.STOR1_HREF_LEN_MAX - for alternative
      // const STOR2_INPUT_LEN_MAX = parseInt(response.STOR2_INPUT_LEN_MAX)
      // const STOR2_REFS_LEN_MAX = parseInt(response.STOR2_REFS_LEN_MAX) // "textRefsNews" value validation
      // // const PREV_HREF_LEN_MAX = response.PREV_HREF_LEN_MAX // this.textTitleNews + link on IE --> validation in parent component

      // if ((this.textTitleNews + ' ' + this.textContentNews).length > STOR2_INPUT_LEN_MAX) {
      //   this.inputLenError = true
      //   return false
      // }
      // if (this.textRefsNews.length > STOR2_REFS_LEN_MAX) {
      //   this.refsLenError = true
      //   return false
      // }

      if (Object.keys(this.pickedIENodes).length === 0) // there is only ORDINARY news
        this.onlyShortNews = true
      else { // ask how user want to add news to IE: in fullnews format or short news.
        await this.$swal.fire({
          title: 'News format',
          text: 'What news format do you want to send to the nodes?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Full news',
          cancelButtonText: 'Short news',
          allowOutsideClick: false
        }).then((result) => {
          if (result.dismiss) { // if short news, then save news to NN IE (json full news)
            this.onlyShortNews = true
          }
        })
      }
    },
    async checkIfNodesAdded () {
      this.showSelectNodesForm = this.showSelectNodesForm ? false : true // eslint-disable-line
      await this.retrieveOrdinaryAndIENodes().then(() => {
        if (!this.ordinaryAndIENodesExist) {
          this.$swal.fire({
            title: 'ORDINARY/IE nodes?',
            text: 'To add news to nodes, you need to add node(s) to the list of nodes',
            icon: 'question',
            showCancelButton: true,
            allowOutsideClick: false
          }).then((result) => {
            if (result.isConfirmed) {
              this.$router.push({ name: 'add-node' })
            } else if (result.dismiss) {
              this.addingNewsNodes = false
              this.changeAddingMode()
              this.showSelectNodesForm = false
            }
          })
        }
      })
    },
    clearVariables () {
      this.firstHasBeenValidated = true
      this.refsLenError = false
      this.inputLenError = false
      this.prevHrefLenError = false
      this.nodesInputError = false
      this.onlyShortNews = false
    },

    startQuillEditor () {
      //
    },
    quillSettings() {
        //
        // quill text editor
        // 
        const addNewsEditor = document.getElementById('addNewsEditor')
        const toolbarOptions = [
        [{ 'header': 2 }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['clean']
        ]
        const quillConfig = {
        modules: {
            toolbar: toolbarOptions
        },
        formats: ['header', 'bold', 'italic', 'underline', 'strike', 'list', 'clean'],
        placeholder: 'Content...',
        theme: 'snow'
        }
        const Delta = Quill.import('delta')
        const quill = new Quill(addNewsEditor, quillConfig)
        // Store accumulated changes
        let change = new Delta()
        quill.on('text-change', (delta) => {
        change = change.compose(delta)
        this.textContentNews = quill.getText() // text without formatting
        this.htmlContentNews = quill.root.innerHTML // html
        })
        // Check for unsaved data
        window.onbeforeunload = function () {
        if (change.length() > 0) {
            return 'There are unsaved changes. Are you sure you want to leave?'
        }
        }
        // News content counter
        const newsContentLimit = this.maxContentNews
        const newsContentCounter = document.getElementById('newsContentCounter')
        newsContentCounter.innerText = newsContentLimit
        quill.on('text-change', () => {
        newsContentCounter.innerText = 2501 - quill.getLength()
        if (quill.getLength() > newsContentLimit) {
            quill.deleteText(newsContentLimit, quill.getLength())
        }
        if (quill.getLength() < 150) this.errorTextContentNews = true
        if (quill.getLength() >= 150) this.errorTextContentNews = false
        })
        // styles for "#add-news-editor"
        addNewsEditor.previousSibling.style.marginTop = '0.5rem'
        addNewsEditor.previousSibling.style.backgroundColor = '#fff'
        addNewsEditor.previousSibling.style.borderColor = '#D6D6D6'
    },
    async loadUserData () {
      if (this.userLoggedIn) {
        await this.fetchUserData().then(() => {
          this.userID = this.userData.id
          this.userCountry = this.userData.country
          this.userCountryCode = this.userData.countryCode
        })
      } else this.$router.push({ name: 'page-404' })
    },
  },
  async mounted () {
    await this.loadUserData()
    this.retrieveKeyPair()
    this.quillSettings()
  }
}
</script>

<style lang="scss" scoped>
// styles for "quill" text editor
@import '~quill/dist/quill.snow.css';
@import '@/assets/scss/utils/vars';
@import '@/assets/scss/utils/mixins';

.loading-div {
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.nn-def-form {
  #addNewsEditor {
    background-color: #fff;
    height: 300px;
    font-family: 'Source Sans Pro';
    font-size: rem(16px) !important;
    color: $grey-font-dark;
    border: 1px solid $grey-line-light;
    border-top: 0;
  }
}
</style>
