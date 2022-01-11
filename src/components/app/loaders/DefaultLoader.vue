<template lang="pug">
  .def-loader(:class="addClass")
    div
    div
</template>

<script>
export default {
  name: 'default-loader',
  props: { addClass: String }
}
</script>

<style lang="scss" scoped>
.def-loader {
  display: block;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  div {
    position: absolute;
    border: 4px solid #8841A6;
    opacity: 1;
    border-radius: 50%;
    animation: circle-loader 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
    &:nth-child(2) {
      animation-delay: -0.5s;
    }
  }
}
@keyframes circle-loader{
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
}

.relative {
  position: relative;
  left: 0;
  top: 0;
  transform: none;
  margin: 70px auto;
}

.h-0 {
  height: 20px;
  top: -25px;
  left: 15px;
}

</style>
