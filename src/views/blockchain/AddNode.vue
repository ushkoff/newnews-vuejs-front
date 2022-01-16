<template lang="pug">
  div
    .def-page-header(:style="{'background-image': `url('${publicPath}assets/img/pages/blockchain/header.jpg')`}")
      .container(class="d-flex align-items-center justify-content-center justify-content-md-start pt-5")
        span.def-page-header-name(class="pl-4 pr-4 pt-2 pb-2") Add Node
    .container(class="mt-4 mt-md-5")
      .row
        div(class="col-12 col-xl-8")

          .add-domain-to-nodelist-form
            div(class="pl-4 pr-4 pl-lg-5 pr-lg-5 mb-4")
              .nn-def-description
                span.attention Attention!
                p
                  | <span class="bold">The node data you entered will not be saved in the database!</span>
                  br
                  | Copy your nodes data to a place convenient for you (you can copy in <router-link :to="{ name: 'settings' }">settings</router-link>).
                  | For a while, the node data will be stored in the site session, but do not rely on this alone!

            //- Select mode

            .profile-settings-block(class="mt-4 ml-4 mr-4 ml-lg-5 mr-lg-5 mt-lg-5")
              span.profile-settings-title
                | Place to add a node: {{ addingNodeMode }} | <a href="#">NN nodes</a>
              span.profile-settings-line
              form(class="mt-3")
                .form-check
                  input#radioOrdinary.form-check-input(type="radio" name="radioOrdinary" value="ORDINARY" v-model="addingNodeMode")
                  label.form-check-label(for="radioOrdinary") ORDINARY
                .form-check(class="mt-2")
                  input#radioIE.form-check-input(type="radio"  name="radioIE" value="IE" v-model="addingNodeMode")
                  label.form-check-label(for="radioIE") IE
                //- .form-check(class="mt-2")
                //-   input#radioPanopticon.form-check-input(type="radio"  name="radioPanopticon" value="PANOPTICON" v-model="addingNodeMode")
                //-   label.form-check-label(for="radioPanopticon") PANOPTICON
                //- .form-check(class="mt-2")
                //-   input#radioDelegat.form-check-input(type="radio"  name="radioDelegat" value="DELEGAT" v-model="addingNodeMode")
                //-   label.form-check-label(for="radioDelegat") DELEGAT

            OrdinaryNodeForm(v-if="addingNodeMode === 'ORDINARY'")
            IENodeForm(v-if="addingNodeMode === 'IE'")
            //- PanopticonNodeForm(v-if="addingNodeMode === 'PANOPTICON'" :userLoggedIn="userLoggedIn")
            //- DelegatNodeForm(v-if="addingNodeMode === 'DELEGAT'" :userLoggedIn="userLoggedIn")

        div(class="col-12 col-xl-4")
          Sidebar

</template>

<script>
import OrdinaryNodeForm from '@/components/blockchain/nodes/OrdinaryNodeForm'
import IENodeForm from '@/components/blockchain/nodes/IENodeForm'
// import DelegatNodeForm from '@/components/blockchain/node-forms/DelegatNodeForm'
// import PanopticonNodeForm from '@/components/blockchain/node-forms/PanopticonNodeForm'
import Sidebar from '@/components/app/Sidebar'

export default {
  name: 'add-node',
  metaInfo () {
    return { title: this.$title('Add Node') }
  },
  data: () => ({
    publicPath: process.env.BASE_URL,
    addingNodeMode: 'ORDINARY'
  }),
  components: {
    OrdinaryNodeForm,
    IENodeForm,
    // DelegatNodeForm,
    // PanopticonNodeForm,
    Sidebar
  },
  methods: {
    //
  }
}
</script>

<style lang="scss" scoped>
// @import '@/assets/scss/utils/vars';
// @import '@/assets/scss/utils/mixins';

</style>
