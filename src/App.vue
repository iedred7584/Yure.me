<template>
  <div id="view">
    <vSplash></vSplash>
    <vHeader></vHeader>
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
    <vFooter></vFooter>
  </div>
</template>

<script>
import vSplash from '@/common/splash'
import vHeader from '@/common/header'
import vFooter from '@/common/footer'

export default {
  name: 'App',
  components: {
    vSplash,
    vHeader,
    vFooter
  }
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.map--img {
  background-image: url(./assets/loading.svg);
  background-repeat: no-repeat;
  background-position: center;
}

::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-track {
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
}

::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 50, 0.5);
  border-radius: 10px;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.3);
}

.box {
  position: absolute;
  margin: 20px;
  padding: 10px;
  width: calc(100% - 40px);
  height: calc(100vh - 130px);
  top: 56px;
  background-color: rgba(230, 230, 230, 0.8);
}

@media screen and (max-width: 1050px), screen and (max-height: 830px) {
  .box {
    margin: 10px;
    padding: 0 10px;
    width: calc(100% - 20px);
    height: calc(100vh - 110px);
    overflow: auto;
  }
}

a, a:hover {
  text-decoration: none!important;
}

</style>
