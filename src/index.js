import Vue from 'vue'

let draggerOffsetX = 0
let draggerOffsetY = 0
let initialX = 0
let initialY = 0
let down = false

function setInitialOffset (el) {
  draggerOffsetX = el.offsetLeft
  draggerOffsetY = el.offsetTop
}

export default Vue.directive('drag', {
  bind: function (el) {
  },

  inserted: function (el, binding, vnode) {
    draggerOffsetX = el.offsetLeft
    draggerOffsetY = el.offsetTop
    el.addEventListener('mouseup', () => {
      down = false
      setInitialOffset(el)
    })

    el.addEventListener('mousedown', (e) => {
      down = true
      initialX = e.clientX
      initialY = e.clientY
    })

    el.addEventListener('mouseout', () => {
      down = false
      setInitialOffset(el)
    })

    el.addEventListener('mousemove', (e) => {
      if (down) {
        el.style.left = draggerOffsetX + (e.clientX - initialX) + 'px'
        el.style.top = draggerOffsetY + (e.clientY - initialY) + 'px'
      }    
    })
  }
})
