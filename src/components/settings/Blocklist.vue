<template lang="pug">
  .blocklist-block(class="mt-4 pl-md-5 pl-4 pr-md-5 pr-5 pt-4")
    NewnewsLoader(v-if="loading")
    div(v-else)
      .profile-settings-block(class="blocklist pb-2")
        span.profile-settings-title Blocklist
        span.profile-settings-line
        ul(class="pl-2 pr-2 pb-3")
          li(v-for="record in blocklist" class="d-flex justify-content-between align-items-center mt-3")
            div(class="d-flex align-items-center")
              span.circle(class="d-block") <i class="fas fa-circle"></i>
              span.author-username(class="d-block text-truncate ml-2") @{{ record.blocked_user_username }}
            button.remove(@click="removeFromBlacklist(record.blocked_user_id, record.blocked_user_username)") remove

        div(v-if="blocklist.length === 0")
          span.blocklist-empty-phrase(
            class="text-break pl-2 d-block mb-2"
          ) Your blocklist is empty...

        div(v-if="!loading && !nextPageIsEmpty")
          DefaultLoader(v-if="nextBlockedUsersLoading")
          LoadMoreBtn(
            v-else
            @click="loadNextBlockedUsers"
            add-class="style-for-medium-content"
          )

</template>

<script>
import cfg from '@/config/common'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'blocklist',
  data: () => ({
    loading: true,
    maxBlockedUsersOnPage: cfg.blockedUsersNumberOnSettingsPage,
    nextBlockedUsersLoading: false,
    nextPageNum: 2,
    nextPageIsEmpty: false
  }),
  computed: mapGetters(['userData', 'blocklist', 'blocklistFetchedRecordsNumber']),
  methods: {
    ...mapActions(['fetchUserData', 'fetchBlocklist', 'unblockUser']),

    async loadBlocklist () {
      const data = {
        userID: this.userData.id,
        quantity: this.maxBlockedUsersOnPage,
        isNext: false,
        page: 1
      }
      await this.fetchBlocklist(data).then(() => {
        this.loading = false
        if (this.blocklistFetchedRecordsNumber < this.maxBlockedUsersOnPage) this.nextPageIsEmpty = true
      })
    },
    async loadNextBlockedUsers () {
      this.nextBlockedUsersLoading = true

      const data = {
        userID: this.userData.id,
        quantity: this.maxBlockedUsersOnPage,
        isNext: true,
        page: this.nextPageNum
      }
      await this.fetchBlocklist(data).then(() => {
        this.nextBlockedUsersLoading = false
        if (this.blocklistFetchedRecordsNumber < this.maxBlockedUsersOnPage) this.nextPageIsEmpty = true
      })
    },

    async removeFromBlacklist (authorID, authorUsername) {
      const data = {
        userID: this.userData.id,
        blockedUserID: authorID
      }
      await this.unblockUser(data).then(() => {
        this.$swal.fire({
          title: 'Success',
          text: `User @${authorUsername} successfully removed from the list.`,
          icon: 'success'
        })
        this.$router.push({ name: 'global-news' })
      })
    }
  },
  async mounted () {
    await this.fetchUserData()
    await this.loadBlocklist()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/utils/vars';
@import '@/assets/scss/utils/mixins';

.blocklist-block {
  position: relative;
  min-height: 200px;
  background-color: $grey-bg-light;
  .def-loader {
    position: relative;
    top: 0;
    transform: translate(-50%, 0);
    margin-top: 100px;
    margin-bottom: 100px;
  }
  .blocklist {
    max-width: 450px;
    ul {
      font-family: 'Open Sans';
      font-size: rem(15px);
      color: $grey-font-dark;
      .circle {
        font-size: rem(8px);
        position: relative;
        bottom: -0.5px;
      }
      .author-username {
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
    .blocklist-empty-phrase {
      font-family: 'Open Sans';
      font-size: rem(16px);
      color: $grey-font-base;
    }
  }
}
</style>
