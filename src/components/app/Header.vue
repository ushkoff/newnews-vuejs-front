<template lang="pug">
  header
    .container(class="pt-lg-2 pb-lg-2 pt-1 pb-1 d-flex justify-content-between align-items-center")
      div(class="d-flex align-items-center justify-content-fhd-left justify-content-between")
        //- For small screens
        router-link(:to="{name:'home'}" @click.native="closeNavMenu")
          .main-logo(
            :style="{'background-image': `url('${publicPath}assets/img/newnews/icon.png')`}"
            class="d-block d-lg-none"
          )
        //- For desktop
        router-link(:to="{name:'home'}" @click.native="closeNavMenu")
          .main-logo(
            :style="{'background-image': `url('${publicPath}assets/img/newnews/logo.png')`}"
            class="d-lg-block d-none"
          )

        //- Main navigation
        MainNavbar(ref="mainNavbar")

      //- Search field
      div(class="d-flex align-items-center justify-content-fhd-left justify-content-between")
        //- For small screens
        .search-btn
          router-link(
            :to="{ name:'global-news'}"
            class="d-block d-xl-none shadow text-center" title="search"
          ) <i class="fas fa-search"></i>
        //- For desktop
        .header-search-field
          form(@submit.prevent="searchSubmit" class="shadow d-xl-flex d-none flex-nowrap")
            input#searchQuery(
              type="text"
              placeholder="Search..."
              v-model.trim="searchQuery"
              :maxlength="maxArticleTitle"
            )
            button(type="sumbit") <i class="fas fa-search"></i>

        //- if authenticated then show username & button "logout"
        .user-btn(v-if="userLoggedIn" class="ml-fhd-5 ml-lg-4 ml-0 d-flex align-items-center")
          DefaultLoader(v-if="loading" class="relative m-0 h-0 d-lg-block d-none")
          router-link(
            v-else
            :to="{ name: 'settings' }"
            class="username d-lg-block d-none text-truncate"
          ) {{ name }}
          .logout-btn(
            title="logout"
            class="shadow text-center"
            @click="logoutHandler"
          ) <i class="fas fa-sign-out-alt"></i></i>
        //- else show button "login"
        .auth-btn(v-else class="ml-lg-4 ml-sm-3 ml-2 d-flex align-items-center")
          router-link(
            :to="{ name: 'login' }"
            class="sign-in-btn shadow text-center"
            title="Sign In"
          ) <i class="fas fa-sign-in-alt"></i>

</template>

<script>
import cfg from '@/config/news'
import { required, maxLength } from 'vuelidate/lib/validators'
import { mapGetters, mapActions } from 'vuex'
import MainNavbar from '@/components/app/navigation/MainNavbar'

export default {
  name: 'header-component',
  data: () => ({
    loading: true,
    publicPath: process.env.BASE_URL,
    maxArticleTitle: cfg.maxArticleTitle,
    searchQuery: '',
    name: '',
    // Icons
    nnIconPath: 'assets/img/newnews/icon.png',
    nnLogoPath: 'assets/img/newnews/logo.png',
    nnIconNoShadowPath: 'assets/img/newnews/icon-no-shadow.png',
    nnLogoNoShadowPath: 'assets/img/newnews/logo-no-shadow.png'
  }),
  components: { MainNavbar },
  validations: {
    searchQuery: { required, maxLength: maxLength(256) }
  },
  computed: mapGetters(['userLoggedIn', 'username']),
  methods: {
    ...mapActions(['fetchUserData', 'logout']),

    async logoutHandler () {
      // this.$swal.fire({
      //   title: 'Saved data',
      //   text: 'The local storage can store the data of your keys and nodes. If you want to remove your private data, please remove specific fields from your browser Local Storage.',
      //   icon: 'warning'
      // })

      await this.logout().then(() => {
        if (this.$route.name !== 'home') this.$router.push({ name: 'home' })
      })
    },

    searchSubmit () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return false
      }
      if (this.searchQuery === this.$route.query.search) return false
      
      this.$router.push({ name: 'global-news', query: { search: this.searchQuery } })
      // reset field
      this.searchQuery = ''
    },

    changeHeaderStyle () {
      if (document.querySelector('header')) {
        // If page was scrolled then change style to dark
        if (document.querySelector('html').scrollTop > document.querySelector('header').offsetHeight + 10) {
          document.querySelector('header').classList.add('header-scroll')
          // setting the logo with no shadow
          this.setIcons(false)
        
        // Similary
        } else {
          document.querySelector('header').classList.remove('header-scroll')
          // setting the logo with shadow back
          this.setIcons(true)
        }
      }
    },
    setIcons(withShadow) {
      if (withShadow) {
        document.querySelectorAll('.main-logo')[0].style.backgroundImage = `url('${this.publicPath + this.nnIconPath}')`
        document.querySelectorAll('.main-logo')[1].style.backgroundImage = `url('${this.publicPath + this.nnLogoPath}')`
      } else {
        document.querySelectorAll('.main-logo')[0].style.backgroundImage = `url('${this.publicPath + this.nnIconNoShadowPath}')`
        document.querySelectorAll('.main-logo')[1].style.backgroundImage = `url('${this.publicPath + this.nnLogoNoShadowPath}')`
      }
    },

    closeNavMenu() {
      this.$refs.mainNavbar.autoCloseMenu()
    }
  },
  async mounted () {
    window.addEventListener('scroll', this.changeHeaderStyle)
    // repeat it to fix the menu when reload the page
    if (document.querySelector('html').scrollTop > document.querySelector('header').offsetHeight + 10) {
      document.querySelector('header').classList.add('header-scroll')
      // setting the logo with no shadow
      this.setIcons(false)
    }

    if (this.userLoggedIn) {
      await this.fetchUserData().then(() => {
        this.loading = false
        this.name = this.username
      })
    }
  },
  destroyed () {
    window.removeEventListener('scroll', this.changeHeaderStyle)
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/utils/vars';
@import '@/assets/scss/utils/mixins';

header {
  z-index: 10;
  overflow: visible !important;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: $grey-bg-base-trans;
  @include trans01s;
  .main-logo {
    @include size(206px, 42px);
    @include bgImage;
    @include trans01s;
    background-size: contain;
    @media screen and (min-width: $smDesktopWidth) {
      @include size(200px, 37px);
    }
    @media screen and (max-width: $smDesktopWidth) {
      @include size(40px, 40px);
    }
  }
  .search-btn {
    a {
      display: block;
      @include size(38px);
      line-height: 40px;
      background-color: #fff;
      border-radius: 50%;
      @include trans01s;
      .fa-search {
        font-size: 20px;
        color: $grey-icon-light;
        @include trans01s;
        &:hover { color: $grey-font-light }
      }
    }
  }
  .header-search-field {
    form {
      font-size: rem(14px);
      height: 38px;
      @include roundBorder(38px);
      input[type="text"] {
        width: 200px;
        height: 38px;
        padding-left: 1.25rem;
        color: $grey-font-base;
        @include roundLeftBorder(38px);
      }
      button {
        height: 38px;
        background-color: #fff;
        padding-right: 1.25rem;
        @include roundRightBorder(38px);
        .fa-search {
          font-size: 16px;
          color: $grey-icon-light;
          @include trans01s;
          &:hover { color: $grey-font-light }
        }
      }
    }
  }
  .user-btn {
    .username {
      max-width: 150px;
      font-family: 'Montserrat';
      font-size: rem(16px);
      font-weight: 400;
      color: $purple-font-light;
      @include trans01s;
      @media screen and (max-width: $desktopWidth) {
        max-width: 190px;
      }
    }
  }
  .logout-btn {
    margin-left: 1rem;
  }
  .logout-btn, .sign-in-btn {
    cursor: pointer;
    display: block;
    @include size(40px);
    background-color: #fff;
    border-radius: 50%;
    border: 3px solid $purple-font-light;
    @include bgImage;
    background-size: 23px 23px;
    @include trans01s;
    background-color: #fff;
    .fa-sign-out-alt, .fa-sign-in-alt {
      font-size: rem(18px);
      color: $purple-font-light;
    }
    line-height: 37px;
  }
}

// change header while scrolling
.header-scroll {
  height: 50px;
  background-color: $black-bg-base-trans;
  overflow: hidden;
  @media screen and (max-width: $smDesktopWidth) {
    height: 40px;
  }
  .main-logo {
    @include size(133px, 28px);
    @media screen and (max-width: $smDesktopWidth) {
      @include size(25px, 25px);
      margin-bottom: 3px;
    }
  }
  .header-search-field {
    form {
      input[type="text"] {
        display: inline;
        padding-left: 1rem;
      }
      input[type="text"], button {
        height: 30px;
        margin-top: -4px;
        background-color: $black-bg-base-trans;
        color: $grey-font-light-header;
        &::placeholder { color: $grey-font-light-header }
        font-size: rem(12px);
      }
      button {
        .fa-search {
          color: $grey-bg-light;
          &:hover { color: $grey-font-light-header; }
        }
      }
    }
  }
  .search-btn {
    a {
      @include size(25px);
      line-height: 25px;
      background-color: transparent;
      .fa-search {
        font-size: 15px;
        color: $grey-font-light-header;
        &:hover { color: $grey-font-light-header }
      }
    }
  }
  .user-btn {
    .username {
      font-size: rem(14px);
      color: $grey-font-light-header;
    }
  }
  .auth-btn { margin-top: -16px !important; }
  .logout-btn, .sign-in-btn {
    @include size(25px);
    background-size: 15px 15px;
    border: none;
    background-color: transparent !important;
    .fa-sign-out-alt, .fa-sign-in-alt {
      font-size: 18px;
      color: $grey-font-light-header;
    }
    line-height: 26px;
  }
  .logout-btn { background-color: $grey-bg-light; }
  .main-logo, .search-btn, .user-btn { margin-top: -16px }
}

//
// MainNavbar styles
//
.header-scroll::v-deep nav {
  // it's unreal by this file, so I do it in the MainNavbar.vue component
  a, .navigation-toggle {
    font-size: rem(12px) !important;
    line-height: 35px !important;
    color: $grey-font-light-header !important;
    @media screen and (max-width: $smDesktopWidth) {
      height: 35px;
    }
  }
}
</style>
