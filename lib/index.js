'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mousedown = mousedown;
exports.mouseup = mouseup;
exports.mousemove = mousemove;
exports.setDraggerOffset = setDraggerOffset;

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _data = {
  down: false,
  initialX: 0,
  initialY: 0,
  draggerOffsetLeft: 0,
  draggerOffsetTop: 0
};

function mousedown(e, el, _data) {
  _data.down = true;
  _data.initialX = e.clientX;
  _data.initialY = e.clientY;
}

function mouseup(e, el, _data) {
  _data.down = false;
  setDraggerOffset(el, _data);
}

function mousemove(e, el, _data) {
  if (_data.down) {
    el.style.left = _data.draggerOffsetLeft + (e.clientX - _data.initialX) + 'px';
    el.style.top = _data.draggerOffsetTop + (e.clientY - _data.initialY) + 'px';
  }
}

function setDraggerOffset(el, _data) {
  _data.draggerOffsetLeft = el.offsetLeft;
  _data.draggerOffsetTop = el.offsetTop;
}

exports.default = _vue2.default.directive('drag', {
  inserted: function inserted(el, binding, vnode) {
    el.addEventListener('mouseup', function (e) {
      return mouseup(e, el, _data);
    });
    el.addEventListener('mousedown', function (e) {
      return mousedown(e, el, _data);
    });
    el.addEventListener('mousemove', function (e) {
      return mousemove(e, el, _data);
    });
    setDraggerOffset(el, _data);
  }
});