'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createOverlay = createOverlay;
exports.adjustElementZIndex = adjustElementZIndex;
exports.mousedown = mousedown;
exports.mouseup = mouseup;
exports.mousemove = mousemove;
exports.setDraggerOffset = setDraggerOffset;

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VdragData = function VdragData() {
  _classCallCheck(this, VdragData);

  this.down = false;
  this.draggableElementId = null; // if this is present, only a specific area of the draggable will respond to dragging (eg header bar). down = false;
  this.height = 0;
  this.width = 0;
  this.initialX = 0;
  this.initialY = 0;
  this.constraintToWindow = false;
  this.cursorPreviousX = 0;
  this.cursorPreviousY = 0;
  this.draggerOffsetLeft = 0;
  this.draggerOffsetTop = 0;
  this.overlay = null;
  this.draggableEl = null;
  this.initialZIndex = undefined;
};

;

function createOverlay(e, el) {
  var overlay = document.createElement('div');

  if (!el.vdrag_data) {
    el.vdrag_data = new VdragData();
  }

  overlay.setAttribute('style', '\n    width: 100vw; \n    height: 100vh; \n    position: absolute;\n    top: 0;\n    left: 0;\n    z-index: 10000;\n  ');
  overlay.addEventListener('mouseup', function (e) {
    return mouseup(e, el);
  });
  overlay.addEventListener('mousedown', function (e) {
    return mousedown(e, el);
  });
  overlay.addEventListener('mousemove', function (e) {
    return mousemove(e, el);
  });
  document.body.appendChild(overlay);

  return overlay;
}

function checkIfIdInPath(id, path) {
  for (var i = 0; i < path.length; i++) {
    if (path[i].id === id) {
      return true;
    }
  }
  return false;
}

function adjustElementZIndex(el, index) {
  el.style.zIndex = index;
}

function mousedown(e, el) {
  // if the user set a argument to v-drag,
  // it means they only want a specific area to be draggable
  // eg: `v-drag:drag-header` means only the element with 
  // id="drag-header" should be draggable.
  // If the user clicked another area, do nothing.
  if (el.vdrag_data.draggableElementId && !checkIfIdInPath(el.vdrag_data.draggableElementId, e.path)) {
    return;
  }

  if (el.vdrag_data.overlay) {
    el.vdrag_data.overlay.remove();
  }
  // set the width each click
  // just in case it changed since last time (by external plugin, for example)
  el.vdrag_data.width = el.offsetWidth;
  el.vdrag_data.height = el.offsetHeight;
  el.vdrag_data.down = true;
  el.vdrag_data.initialX = e.clientX;
  el.vdrag_data.initialY = e.clientY;
  var overlay = createOverlay(e, el, el.vdrag_data);
  el.vdrag_data.overlay = overlay;
  adjustElementZIndex(el, 10001);
}

function mouseup(e, el) {
  el.vdrag_data.down = false;
  if (!el.vdrag_data.overlay) {
    return;
  }

  el.vdrag_data.overlay.removeEventListener('mouseup', mouseup);
  el.vdrag_data.overlay.removeEventListener('mousedown', mousedown);
  el.vdrag_data.overlay.removeEventListener('mousemove', mousemove);
  el.vdrag_data.overlay.remove();
  adjustElementZIndex(el, el.vdrag_data.initialZIndex);

  setDraggerOffset(el);
}

function reachedLeft(el, _data, movingLeft) {
  return el.offsetLeft + _data.width >= window.innerWidth && !movingLeft;
}

function reachedRight(el, _data, movingRight) {
  return el.offsetLeft <= 0 && !movingRight;
}

function reachedTop(el, _data, movingUp) {
  return el.offsetTop <= 0 && !movingUp;
}

function reachedBottom(el, _data, movingDown) {
  return el.offsetTop + _data.height >= window.innerHeight && !movingDown;
}

function mousemove(e, el) {
  if (el.vdrag_data.down) {
    var movingLeft = el.vdrag_data.cursorPreviousX > e.clientX;
    var movingRight = el.vdrag_data.cursorPreviousX < e.clientX;
    var movingUp = el.vdrag_data.cursorPreviousY < e.clientY;
    var movingDown = el.vdrag_data.cursorPreviousY > e.clientY;

    if (el.vdrag_data.constraintToWindow && (reachedLeft(el, el.vdrag_data, movingLeft) || reachedRight(el, el.vdrag_data, movingRight))) {
      // do now allow moving outside the window horizontally
    } else {
      el.style.left = el.vdrag_data.draggerOffsetLeft + (e.clientX - el.vdrag_data.initialX) + 'px';
    }
    if (el.vdrag_data.constraintToWindow && (reachedTop(el, el.vdrag_data, movingUp) || reachedBottom(el, el.vdrag_data, movingDown))) {
      // do now allow moving outside the window vertically
    } else {
      el.style.top = el.vdrag_data.draggerOffsetTop + (e.clientY - el.vdrag_data.initialY) + 'px';
    }
  }
  el.vdrag_data.cursorPreviousX = e.clientX;
  el.vdrag_data.cursorPreviousY = e.clientY;
}

function setDraggerOffset(el) {
  el.vdrag_data.draggerOffsetLeft = el.offsetLeft;
  el.vdrag_data.draggerOffsetTop = el.offsetTop;
}

exports.default = _vue2.default.directive('drag', {
  inserted: function inserted(el, binding, vnode) {

    if (!el.vdrag_data) {
      el.vdrag_data = new VdragData();
    }

    el.vdrag_data.draggableElementId = binding.arg || null;
    el.vdrag_data.constraintToWindow = binding.modifiers['window-only'];
    el.addEventListener('mouseup', function (e) {
      return mouseup(e, el);
    });
    el.addEventListener('mousedown', function (e) {
      return mousedown(e, el);
    });
    el.addEventListener('mousemove', function (e) {
      return mousemove(e, el);
    });
    setDraggerOffset(el);
    el.vdrag_data.initialZIndex = el.style.zIndex;
  }
});