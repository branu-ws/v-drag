`v-drag` - a supler simple, Vue.js draggable component.

![image](https://user-images.githubusercontent.com/19196536/37251038-1db269ca-254c-11e8-8731-50916f92d64f.png)

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
