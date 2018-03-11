`v-drag` - a supler simple, Vue.js draggable component.

![](http://g.recordit.co/bMTaLKJUvp.gif)

Demo: https://branu-ws.github.io/v-drag/

### Installation

npm:
```bash
npm install @branu-jp/v-drag
```

yarn:
```bash
yarn add @branu-jp/v-drag --save
```

### Use

Node.js env (such a `.vue` components):

```html
<template>
  <div>
    <div style="position: absolute;" v-drag>
    </div>
  </div>
</template>

<script>
import drag from '@branu-jp/v-drag'

export default {
  directives: {
    drag
  }
}
</script>
```

Browser env: __coming soon__.


### Notes

An element with `v-drag` must have `position: absolute;` to be draggable.

### Other

Built by, for and at [BRANU](http://branu.jp/). Our open source projects can be found on our npm page: https://www.npmjs.com/org/branu-jp

`v-drag` npm link: https://www.npmjs.com/package/@branu-jp/v-drag
