<template lang="pug">
  div
    .def-page-header(:style="{'background-image': `url('${publicPath}assets/img/pages/documents/header.jpg')`}")
      .container(class="d-flex align-items-center justify-content-center justify-content-md-start pt-5")
        span.def-page-header-name(class="pl-4 pr-4") Privacy Policy
    .container(class="mt-4 mt-lg-5 p-4 p-lg-5")
        .row
            .col-xl-2.col-0
            .documents-content(class="col-12 col-xl-8")
                h3 Privacy Policy
                hr
                p Effective date: January 03, 2019
                p NewNews ("us", "we", or "our") operates the www.newnews.com website (the "Service").
                p This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
                p We use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy, terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, accessible from www.newnews.com
                h4(class="mb-2") Information Collection And Use
                p We collect several different types of information for various purposes to provide and improve our Service to you.
                h4(class="mb-2") Types of Data Collected
                h5(class="mb-2") Personal Data
                p While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:
                ul(class="mb-3")
                li Email address
                li Address, State, Province, ZIP/Postal code, City
                li Cookies and Usage Data
                h5(class="mt-2 mb-2") Usage Data
                p We may also collect information how the Service is accessed and used ("Usage Data"). This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.
                h5(class="mb-2") Tracking & Cookies Data
                p We use cookies and similar tracking technologies to track the activity on our Service and hold certain information.
                p Cookies are files with small amount of data which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your device. Tracking technologies also used are beacons, tags, and scripts to collect and track information and to improve and analyze our Service.
                p You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
                p Examples of Cookies we use:
                ul(class="mb-3")
                li
                    <strong>Session Cookies.</strong> We use Session Cookies to operate our Service.
                li
                    <strong>Preference Cookies.</strong> We use Preference Cookies to remember your preferences and various settings.
                li
                    <strong>Security Cookies.</strong> We use Security Cookies for security purposes.

            .col-xl-2.col-0

</template>

<script>
export default {
  name: 'privacy-policy',
  metaInfo () {
    return { title: this.$title('Privacy Policy | NewNews') }
  },
  data: () => ({
    publicPath: process.env.BASE_URL
  })
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/utils/vars';
@import '@/assets/scss/utils/mixins';

.def-page-header {
  .def-page-header-name {
    letter-spacing: -1px;
  }
}
.documents-content {
  background-color: $grey-bg-light;
  font-size: rem(16px);
  color: $grey-font-dark;
  hr { background-color: $grey-line-light }
  ul li {
    list-style-type: circle !important;
    margin-left: 3rem;
  }
  strong {
    font-weight: 600;
    color: $grey-font-base;
  }
}
</style>
