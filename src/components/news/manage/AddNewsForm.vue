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
          :class="{invalid: ($v.textTitleNews.$dirty && !$v.textTitleNews.maxLength)}"
        )
        .nn-def-counter(class="mt-1") <span v-text="newsRefsCounter"></span>/{{ maxRefsNews }}
        .nn-def-input-error(v-if="$v.textTitleNews.$dirty && !$v.textTitleNews.maxLength" class="mt-2") "News References" field is too long

      .agree-with-docs(class="mt-4 d-flex")
        input#agreeNewsOffer(type="checkbox" v-model="agreeNewsRules" class="mr-2")
        label(for="agreeNewsOffer") I confirm the authenticity of the news and agree with the <router-link :to="{ name: 'privacy-policy' }" target="_blank">News Offer</router-link> of NewNews.
      .nn-def-input-error(v-if="$v.agreeNewsRules.$dirty && !$v.agreeNewsRules.checked" class="mt-1") Please agree to the terms of the news

      .nn-def-input-error(
        v-if="errMsg != null"
        class="server-side-errors mt-3"
      ) {{ errMsg }}

      button(type="submit" class="d-block mx-auto mt-5") Share

</template>

<script>
import cfg from '@/config/news'
import catList from '@/config/links/categories'
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import Quill from 'quill'
import { mapGetters, mapActions } from 'vuex'

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
  }),
  validations: {
    textTitleNews: { required, minLength: minLength(10), maxLength: maxLength(101) },
    textRefsNews: { maxLength: maxLength(501) },
    agreeNewsRules: { checked: v => v }
  },
  computed: {
    ...mapGetters(['userLoggedIn', 'userData']),
    newsTitleCounter () {
      return this.maxTitleNews - this.textTitleNews.length
    },
    newsRefsCounter () {
      return this.maxRefsNews - this.textRefsNews.length
    }
  },
  methods: {
    ...mapActions(['fetchUserData', 'storeArticle']),

    async submitHandler (recaptchaToken) {
      this.loading = true

      const data = {
        categoryID: this.chooseCategory,
        userID: this.userID,
        title: this.textTitleNews,
        contentHtml: this.htmlContentNews,
        country: this.userCountry,
        countryCode: this.userCountryCode,
        refs: this.textRefsNews,
        recaptchaToken
      }
      await this.storeArticle(data).then(() => {
        this.$router.push({ name: 'local-news' })
        this.$swal.fire(
            'Success',
            'Your news has been added to our website.',
            'success'
        )
      }).catch((errMsg) => {
        this.loading = false
        this.errMsg = errMsg
        this.$refs.recaptcha.reset()
      })
    },
    validate () {
      this.firstHasBeenValidated = true

      if (this.$v.$invalid || this.chooseCategory === 'Choose...' || this.errorTextContentNews) {
        this.$v.$touch()
        return false
      }
      this.$refs.recaptcha.execute()
    },
    onCaptchaExpired () {
      this.$refs.recaptcha.reset()
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
