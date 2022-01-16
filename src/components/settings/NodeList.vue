<template lang="pug">
  .nodelist-block(class="pl-md-5 pl-4 pr-md-5 pr-5 pt-4")
    NewnewsLoader(v-if="loading")
    div(v-else)
      .profile-settings-block(class="nodelist pb-2")
        span.profile-settings-title
          | Node List | <router-link class="add-node-btn" :to="{ name: 'add-node' }">Add Node</router-link>
        span.profile-settings-line

        ul(class="pl-2 pr-2 pb-3")

          mark.node-type-title(v-if="Object.keys(ordinaryNodes).length !== 0") ORDINARY
          li(v-for="(data, domen) in ordinaryNodes" class="d-flex justify-content-between align-items-center mt-3")
            div(class="d-flex align-items-center")
              span.circle(class="d-block") <i class="fas fa-circle"></i>
              span.domain-name(class="d-block text-truncate ml-2") {{ domen }}
            button.remove(@click="removeFromNodelist(domen, 'ordinary')") remove

          br(v-if="Object.keys(IENodes).length !== 0")
          mark.node-type-title(v-if="Object.keys(IENodes).length !== 0") IE
          li(v-for="(data, domen) in IENodes" class="d-flex justify-content-between align-items-center mt-3")
            div(class="d-flex align-items-center")
              span.circle(class="d-block") <i class="fas fa-circle"></i>
              span.domain-name(class="d-block text-truncate ml-2") {{ domen }}
            button.remove(@click="removeFromNodelist(domen, 'IE')") remove

        //-   br(v-if="Object.keys(delegatNodes[0]).length !== 0")
        //-   mark.node-type-title(v-if="Object.keys(delegatNodes[0]).length !== 0") DELEGAT
        //-   li(v-for="(data, domen) in delegatNodes[0]" class="d-flex justify-content-between align-items-center mt-3")
        //-     div(class="d-flex align-items-center")
        //-       span.circle(class="d-block") <i class="fas fa-circle"></i>
        //-       span.domain-name(class="d-block text-truncate ml-2") {{ domen }}
        //-     button.remove(@click="removeFromNodelist(domen, 'delegat')") remove

        //-   br(v-if="Object.keys(panopticonNodes[0]).length !== 0")
        //-   mark.node-type-title(v-if="Object.keys(panopticonNodes[0]).length !== 0") PANOPTICON
        //-   li(v-for="(data, domen) in panopticonNodes[0]" class="d-flex justify-content-between align-items-center mt-3")
        //-     div(class="d-flex align-items-center")
        //-       span.circle(class="d-block") <i class="fas fa-circle"></i>
        //-       span.domain-name(class="d-block text-truncate ml-2") {{ domen }}
        //-     button.remove(@click="removeFromNodelist(domen, 'panopticon')") remove

        div(v-if="!nodelistsIsEmpty" class="d-flex justify-content-end")
          div.copy-nodes-block(class="d-flex flex-column align-items-end")
            button.copy-nodes-btn(@click="copyNodesJSON" class="mt-4") Copy JSON
            span *with the current state

        div(v-if="nodelistsIsEmpty")
          span.nodelist-empty-phrase(
            class="text-break pl-2 d-block mb-2"
          ) Your nodelists is empty...

</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'nodelist',
  data: () => ({
    loading: true,
    nodelistsIsEmpty: false
  }),
  computed: mapGetters(['ordinaryAndIENodesExist', 'ordinaryNodes', 'IENodes']),
  methods: {
    ...mapActions(['retrieveOrdinaryAndIENodes']),

    async loadNodeLists () {
        await this.retrieveOrdinaryAndIENodes().then(() => {
            if (!this.ordinaryAndIENodesExist) {
              this.nodelistsIsEmpty = true
            }

            this.loading = false
        })
    },

    removeFromNodelist (domainName, nodeType) {
      let arrayName = nodeType + 'Nodes'

      for (const [key, value] of Object.entries(this[arrayName])) { // eslint-disable-line
        if (key === domainName) delete this[arrayName][domainName]
      }

      localStorage.setItem(nodeType.toUpperCase(), JSON.stringify(this[arrayName]))
      this.loadNodeLists()
    },

    copyNodesJSON () {
      let finalArray = []
      const nodesObject = {
        'ORDINARY': this.ordinaryNodes,
        'IE': this.IENodes,
        // 'DELEGAT': this.delegatNodes,
        // 'PANOPTICON': this.panopticonNodes
      }
      finalArray.push(nodesObject)

      // create dummy input to copy text
      let dummy = document.createElement('textarea')
      document.body.appendChild(dummy)
      dummy.value = JSON.stringify(finalArray)
      dummy.select()
      dummy.setSelectionRange(0, 99999) // For mobile devices
      navigator.clipboard.writeText(dummy.value)
      document.body.removeChild(dummy)

      this.$swal.fire(
        'Copied!',
        'You can use any JSON to Plain Text converter if you need',
        'success'
      )
    }
  },
  mounted () {
    this.loadNodeLists()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/utils/vars';
@import '@/assets/scss/utils/mixins';

.nodelist-block {
  position: relative;
  min-height: 200px;
  background-color: $grey-bg-light;
  .nodelist {
    max-width: 450px;
    .add-node-btn {
      color: $info-color;
    }
    .copy-nodes-block {
      .copy-nodes-btn {
        font-size: rem(15px);
        width: 100px;
      }
      span {
        font-size: rem(15px);
        font-style: italic;
        color: $blue-font-base;
      }
    }
    ul {
      font-family: 'Open Sans';
      font-size: rem(15px);
      color: $grey-font-dark;
      .node-type-title {
        font-size: rem(13px);
        font-weight: 600;
      }
      .circle {
        font-size: rem(8px);
        position: relative;
        bottom: -0.5px;
      }
      .domain-name {
        max-width: 200px;
      }
    }
    button.remove {
      background-color: transparent;
      font-family: 'Open Sans';
      font-size: rem(13px);
      font-weight: 600;
      color: $grey-font-light;
      text-decoration: underline;
      @include trans01s;
      &:hover {
        color: $grey-font-dark;
      }
    }
    .nodelist-empty-phrase {
      font-family: 'Open Sans';
      font-size: rem(16px);
      color: $grey-font-base;
    }
  }
}
</style>
