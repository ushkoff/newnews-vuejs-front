<template lang="pug">
  .nn-loader
    img(:src="`${publicPath}assets/img/newnews/icon.png`")

</template>

<script>
export default {
  name: 'newnews-loader',
  data: () => ({
    publicPath: process.env.BASE_URL
  })
}
</script>

<style lang="scss" scoped>
.nn-loader {
  display: inline-block;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  img {
    display: inline-block;
    height: 55px;
    height: 55px;
    transform: rotate(-25deg);
    animation: nn-loader 2.4s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }
}
@keyframes nn-loader {
  0%, 100% {
    animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);
  }
  0% {
    transform: rotateY(0deg);
  }
  50% {
    transform: rotateY(1800deg);
    animation-timing-function: cubic-bezier(0, 0.5, 0.5, 1);
  }
  100% {
    transform: rotateY(3600deg);
  }
}
</style>
