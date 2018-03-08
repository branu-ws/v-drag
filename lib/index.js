'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var draggerOffsetX = 0;
var draggerOffsetY = 0;
var initialX = 0;
var initialY = 0;
var down = false;

function setInitialOffset(el) {
  draggerOffsetX = el.offsetLeft;
  draggerOffsetY = el.offsetTop;
}

exports.default = _vue2.default.directive('drag', {
  bind: function bind(el) {},

  inserted: function inserted(el, binding, vnode) {
    draggerOffsetX = el.offsetLeft;
    draggerOffsetY = el.offsetTop;
    el.addEventListener('mouseup', function () {
      down = false;
      setInitialOffset(el);
    });

    el.addEventListener('mousedown', function (e) {
      down = true;
      initialX = e.clientX;
      initialY = e.clientY;
    });

    el.addEventListener('mouseout', function () {
      down = false;
      setInitialOffset(el);
    });

    el.addEventListener('mousemove', function (e) {
      if (down) {
        el.style.left = draggerOffsetX + (e.clientX - initialX) + 'px';
        el.style.top = draggerOffsetY + (e.clientY - initialY) + 'px';
      }
    });
  }
});