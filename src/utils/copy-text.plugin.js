export default {
  install (Vue) {
    Vue.prototype.$copy = function (elementID) {
      const copyText = document.getElementById(elementID)
      copyText.select()
      copyText.setSelectionRange(0, 99999) // For mobile devices
      navigator.clipboard.writeText(copyText.value)
    }
  }
}  