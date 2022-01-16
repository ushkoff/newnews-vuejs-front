<template lang="pug">
  //- .account-changes(class="mt-4 p-md-5 p-4")
  //-   .profile-settings-block
  //-     span.profile-settings-title News confirmation alert
  //-     form.profile-settings-switch(class="mt-2" @change="setNewsConfirmAlert")
  //-       div(class="custom-control custom-switch")
  //-         input(type="checkbox" class="custom-control-input" id="newsConfrimAlertInput" v-model="userData.getConfirmationEmail")
  //-         label(class="custom-control-label" for="newsConfrimAlertInput") receive email alerts ({{ userData.email }})

    //-.profile-settings-block(class="mt-5")
      //- span.profile-settings-title Select the mode of adding news
      //- form(class="mt-2" @change="setNewsAddingMode")
      //-   .form-check
      //-     input#radioSignature.form-check-input(type="radio" name="radioSignature" value="signature" v-model="addingNewsMode")
      //-     label.form-check-label(for="radioSignature") Through public & private keys, signature
      //-   .form-check(class="mt-2")
      //-     input#radioSpaceID.form-check-input(type="radio"  name="radioSpaceID" value="spaceID" v-model="addingNewsMode")
      //-     label.form-check-label(for="radioSpaceID") Through space ID

      //- .profile-settings-block.change-avatar-block
      //-   span.profile-settings-title Change avatar
      //-   .profile-settings-body(class="mt-2 d-flex justify-content-between align-items-center")
      //-     <i class="far fa-image"></i>
      //-     form.profile-setting-upload-img
      //-       label(for="uploadUserAvatar" class="m-0") Choose
      //-       input(id="uploadUserAvatar" type="file")
      //-     <i class="fas fa-angle-double-right"></i>
      //-     //- .profile-settings-user-img(style="background-image: url('')")
      //-     .profile-settings-icon <i class="fas fa-user-astronaut"></i>
      //-   settings-delete-phrase(delete-phrase="delete your avatar" class="mt-3")

      //- .profile-settings-block(class="mt-5")
      //-   span.profile-settings-title Change email
      //-   span.profile-settings-desc(class="mt-2 d-block") Change your main email connected to account
      //-   form.profile-settings-field(class="mt-3" @submit.prevent="changeEmail")
      //-     div(class="d-flex flex-nowrap")
      //-       input#changeEmailInput(type="text" maxlength="256" v-model.trim="changeEmailInput")
      //-       a(class="profile-settings-input-desc d-flex flex-nowrap") New email
      //-     .nn-def-input-error(v-if="$v.changeEmailInput.$dirty && !$v.changeEmailInput.required" class="mt-2") "New email" is required
      //-     .nn-def-input-error(v-if="$v.changeEmailInput.$dirty && !$v.changeEmailInput.email" class="mt-2") Please enter a valid email
      //-     button(type="submit" class="mt-3").profile-settings-submit Change
      //- .profile-settings-block(class="mt-5")

      //- span.settings-delete-phrase(class="d-block mt-5") You can also <span @click="deleteAccount">delete your account</span>.

</template>

<script>
// import { required, email, sameAs, minLength, maxLength } from 'vuelidate/lib/validators'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'settings-forms',
  data: () => ({
    // addingNewsMode: ''
    // changeEmailInput: '',
    // passMaxLength: 100,
  }),
  computed: mapGetters(['userData']),
//   validations: {
//     // changeEmailInput: { required, email, maxLength: maxLength(257) },
//   },
  methods: {
    ...mapActions(['fetchUserData']),

    // async setNewsConfirmAlert () {
    //   const data = {
    //     userID: this.userData.id,
    //     toSet: this.userData.getConfirmationEmail
    //   }
    //   this.setNewsConfirmationAlert(data).then(() => {
    //     if (this.userData.getConfirmationEmail) {
    //         this.$swal.fire({
    //         title: 'Success',
    //         text: 'You will now receive news confirmation notifications.',
    //         icon: 'success'
    //         })
    //     } else {
    //         this.$swal.fire(
    //         'Success',
    //         'You will no longer receive news confirmation notifications.',
    //         'success'
    //         )
    //     }
    //   })
    // },
    // loadAddingNewsMode () {
    //   if (this.userLoggedIn) this.addingNewsMode = localStorage.getItem('adding_news_mode') || 'signature'
    // },
    // setNewsAddingMode () {
    //   if (this.userLoggedIn) localStorage.setItem('adding_news_mode', this.addingNewsMode)
    // }
  },
  async mounted () {
    await this.fetchUserData()
    // this.loadAddingNewsMode()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/utils/vars';
@import '@/assets/scss/utils/mixins';

.account-changes {
  background-color: $grey-bg-light;
  .change-avatar-block {
    max-width: 450px;
  }
  @media screen and (min-width: $desktopWidth) and (max-width: $fullHdWidth) {
    .fa-image { font-size: rem(90px) !important }
  }
  @media screen and (min-width: $tableWidth) and (max-width: $smDesktopWidth) {
    .fa-image { display: block }
    label { margin-left: 0 !important }
  }
}
.settings-delete-phrase {
  font-size: rem(12px);
  color: $grey-font-base;
  span {
    color: $blue-font-base;
    cursor: pointer;
    &:hover { text-decoration: underline }
  }
}
</style>
