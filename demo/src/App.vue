<template>
  <div id="app">
    <div class="block" v-drag>
    </div>
  </div>
</template>

<script>
import drag from '../../src'
export default {
  name: 'app',

  directives: {
    drag
  }
}
</script>

<style scoped>
#app {
  /*height: 100vh;
  width: 100vw;*/
}

.block {
  position: absolute;
  border: 1px solid black;
  height: 100px;
  width: 100px;
}
</style>
