<template>
  <div id="app">
    <h3>v-drag - make any element draggable</h3>
    <div class="demo-outer">
      <div class="block" v-drag>
        Drag me
      </div>
    </div>
    <h4>Installation:</h4>
    <pre>
      <code>
        Install:
        npm install @branu-jp/v-drag --save
      </code>
    </pre>
    <h4>Use:</h4>
    <pre>
      <code>

        HTML:
        &lt;div v-drag style="absolute"&gt;
        &lt;/div&gt;

        Vue:
        &lt;script&gt;
          import drag from '@branu-jp/v-drag'

          export default {
            directives: { 
              drag 
            }
          }
        &lt;/script&gt;

      </code>
    </pre>
  </div>
</template>

<script>
import drag from '../../lib'
export default {
  name: 'app',

  directives: {
    drag
  }
}
</script>

<style scoped>
.block {
  position: absolute;
  border: 1px solid black;
  height: 100px;
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.demo-outer {
  margin: 5px;
  height: 200px;
  border: 1px dashed black;
}
</style>
