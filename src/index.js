import Vue from 'vue'

const _data = {
  down: false,
  initialX: 0,
  initialY: 0,
  draggerOffsetLeft: 0,
  draggerOffsetTop: 0,
  overlay: null
}

export function createOverlay (e, el, _data) {
  const overlay = document.createElement('div')
  overlay.setAttribute('style', `
    width: 100vw; 
    height: 100vh; 
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10000;
  `)
  overlay.addEventListener('mouseup', (e) => mouseup(e, el, _data))
  overlay.addEventListener('mousedown', (e) => mousedown(e, el, _data))
  overlay.addEventListener('mousemove', (e) => mousemove(e, el, _data))
  document.body.appendChild(overlay)

  return overlay
}

export function mousedown (e, el, _data) {
  if (_data.overlay) {
    _data.overlay.remove()
  }
  _data.down = true
  _data.initialX = e.clientX
  _data.initialY = e.clientY
  const overlay = createOverlay(e, el, _data)
  _data.overlay = overlay
}

export function mouseup (e, el, _data) {
  _data.down = false

  _data.overlay.removeEventListener('mouseup', mouseup)
  _data.overlay.removeEventListener('mousedown', mousedown)
  _data.overlay.removeEventListener('mousemove', mousemove)
  _data.overlay.remove()

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

