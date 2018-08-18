import Vue from 'vue'

const _data = {
  draggableElementId: null, // if this is present, only a specific area of the draggable will respond to dragging (eg header bar).
  down: false,
  height: 0,
  width: 0,
  initialX: 0,
  initialY: 0,
  constraintToWindow: false,
  cursorPreviousX: 0,
  cursorPreviousY: 0,
  draggerOffsetLeft: 0,
  draggerOffsetTop: 0,
  overlay: null,
  draggableEl: null,
  initialZIndex: undefined
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

function checkIfIdInPath(id, path) {
  for (let i = 0; i < path.length; i++) {
    if (path[i].id === id) {
      return true
    }
  }
  return false
}


export function adjustElementZIndex(el, index) {
  el.style.zIndex = index
}

export function mousedown (e, el, _data) {
  // if the user set a argument to v-drag,
  // it means they only want a specific area to be draggable
  // eg: `v-drag:drag-header` means only the element with 
  // id="drag-header" should be draggable.
  // If the user clicked another area, do nothing.
  if (_data.draggableElementId && !checkIfIdInPath(_data.draggableElementId, e.path)) {
    return
  }

  if (_data.overlay) {
    _data.overlay.remove()
  }
  // set the width each click
  // just in case it changed since last time (by external plugin, for example)
  _data.width = el.offsetWidth
  _data.height = el.offsetHeight
  _data.down = true
  _data.initialX = e.clientX
  _data.initialY = e.clientY
  const overlay = createOverlay(e, el, _data)
  _data.overlay = overlay
  adjustElementZIndex(el, 10001)
}

export function mouseup (e, el, _data) {
  _data.down = false
  if (!_data.overlay) {
    return
  }

  _data.overlay.removeEventListener('mouseup', mouseup)
  _data.overlay.removeEventListener('mousedown', mousedown)
  _data.overlay.removeEventListener('mousemove', mousemove)
  _data.overlay.remove()
  adjustElementZIndex(el, _data.initialZIndex)

  setDraggerOffset(el, _data)
}

function reachedLeft(el, _data, movingLeft) {
  return (el.offsetLeft + _data.width >= window.innerWidth) && !movingLeft
}

function reachedRight(el, _data, movingRight) {
  return el.offsetLeft <= 0 && !movingRight
}

function reachedTop(el, _data, movingUp) {
  return el.offsetTop <= 0 && !movingUp 
}

function reachedBottom(el, _data, movingDown) {
  return ((el.offsetTop + _data.height) >= window.innerHeight) && !movingDown
}

export function mousemove (e, el, _data) {
  if (_data.down) {
    const movingLeft = _data.cursorPreviousX > e.clientX
    const movingRight = _data.cursorPreviousX < e.clientX
    const movingUp = _data.cursorPreviousY < e.clientY
    const movingDown = _data.cursorPreviousY > e.clientY

    if (_data.constraintToWindow && (reachedLeft(el, _data, movingLeft) || reachedRight(el, _data, movingRight))) {
      // do now allow moving outside the window horizontally
    } else {
      el.style.left = _data.draggerOffsetLeft + (e.clientX - _data.initialX) + 'px'
    }
    if (_data.constraintToWindow && (reachedTop(el, _data, movingUp) || reachedBottom(el, _data, movingDown))) {
      // do now allow moving outside the window vertically
    } else {
      el.style.top = _data.draggerOffsetTop + (e.clientY - _data.initialY) + 'px'
    }
  }
  _data.cursorPreviousX = e.clientX
  _data.cursorPreviousY = e.clientY
}

export function setDraggerOffset (el, _data) {
  _data.draggerOffsetLeft = el.offsetLeft
  _data.draggerOffsetTop = el.offsetTop
}

export default Vue.directive('drag', {
  inserted: function (el, binding, vnode) {
    _data.draggableElementId = binding.arg || null
    _data.constraintToWindow = binding.modifiers['window-only']
    el.addEventListener('mouseup', (e) => mouseup(e, el, _data))
    el.addEventListener('mousedown', (e) => mousedown(e, el, _data))
    el.addEventListener('mousemove', (e) => mousemove(e, el, _data))
    setDraggerOffset(el, _data)
    _data.initialZIndex = el.style.zIndex
  }
})

