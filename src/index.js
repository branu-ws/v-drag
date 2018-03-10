import Vue from 'vue'

const _data = {
  down: false,
  initialX: 0,
  initialY: 0,
  draggerOffsetLeft: 0,
  draggerOffsetTop: 0
}

export function mousedown (e, el, _data) {
  _data.down = true
  _data.initialX = e.clientX
  _data.initialY = e.clientY
}

export function mouseup (e, el, _data) {
  _data.down = false
  setDraggerOffset(el, _data)
}

export function mousemove (e, el, _data) {
  if (_data.down) {
    el.style.left = _data.draggerOffsetLeft + (e.clientX - _data.initialX) + 'px'
    el.style.top = _data.draggerOffsetTop + (e.clientY - _data.initialY) + 'px'
  }    
}

export function setDraggerOffset (el, _data) {
  _data.draggerOffsetLeft = el.offsetLeft
  _data.draggerOffsetTop = el.offsetTop
}

export default Vue.directive('drag', {
  inserted: function (el, binding, vnode) {
    el.addEventListener('mouseup', (e) => mouseup(e, el, _data))
    el.addEventListener('mousedown', (e) => mousedown(e, el, _data))
    el.addEventListener('mousemove', (e) => mousemove(e, el, _data))
    setDraggerOffset(el, _data)
  }
})

