/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _boid = __webpack_require__(1);

var _boid2 = _interopRequireDefault(_boid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
  var canvas = document.getElementById('myCanvas');
  var ctx = canvas.getContext('2d');

  var myReq = void 0;
  var flock = [];
  var numBoids = 500;

  for (var i = 0; i < numBoids; i++) {
    flock.push(new _boid2.default());
  }

  var update = function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    flock.forEach(function (boid) {
      boid.draw(ctx);
      boid.update();
      boid.alignment(flock);
    });
  };

  var animate = function animate() {
    myReq = requestAnimationFrame(animate);
    update();
  };

  animate();
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Boid = function () {
  function Boid() {
    _classCallCheck(this, Boid);

    this.positionX = Math.random() * 1400;
    this.positionY = Math.random() * 600;
    this.velocity = [Math.random() * 5 - 2.5, Math.random() * 5 - 2.5];
  }

  _createClass(Boid, [{
    key: "draw",
    value: function draw(ctx) {
      ctx.fillRect(this.positionX, this.positionY, 10, 10);
    }
  }, {
    key: "alignment",
    value: function alignment(boids) {
      var _this = this;

      var localDetection = 15;
      var average = [0, 0];
      var total = 0;
      boids.forEach(function (boid) {
        var distance = Math.sqrt(Math.pow(_this.positionX - boid.positionX, 2) + Math.pow(_this.positionY - boid.positionY, 2));
        if (boid != _this && distance < localDetection) {
          average[0] += boid.velocity[0];
          average[1] += boid.velocity[1];
          total++;
        }
      });
      if (total > 0) {
        average[0] /= total;
        average[1] /= total;
        average[0] -= this.velocity[0];
        average[1] -= this.velocity[1];
        this.velocity[0] += average[0];
        this.velocity[1] += average[1];
      }
    }
  }, {
    key: "update",
    value: function update() {
      if (this.positionX > 1400) {
        this.positionX = 0;
      }
      if (this.positionX < 0) {
        this.positionX = 1400;
      }
      if (this.positionY > 600) {
        this.positionY = 0;
      }
      if (this.positionY < 0) {
        this.positionY = 600;
      }
      this.positionX += this.velocity[0];
      this.positionY += this.velocity[1];
    }
  }]);

  return Boid;
}();

exports.default = Boid;

/***/ })
/******/ ]);