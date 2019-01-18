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
  var boid = new _boid2.default();
  boid.createBoids();
  console.log(boid.boids);

  var update = function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    boid.draw(ctx);
    boid.update();
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
  function Boid(props) {
    _classCallCheck(this, Boid);

    this.state = {};
    this.boids = [];
    this.numberOfBoids = 100;
  }

  _createClass(Boid, [{
    key: "createBoids",
    value: function createBoids() {
      var i = 0;
      while (i < this.numberOfBoids) {
        this.boids.push({
          x: Math.random() * 1400,
          y: Math.random() * 600
        });
        i++;
      }
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      this.boids.forEach(function (boid) {
        ctx.fillRect(boid.x, boid.y, 10, 10);
      });
    }
  }, {
    key: "update",
    value: function update() {
      this.boids.forEach(function (boid) {
        if (boid.x > 1400) {
          boid.x = 0;
        }
        if (boid.y > 600) {
          boid.y = 0;
        }
        boid.x += Math.random() * 6;
        boid.y += Math.random() * 6;
      });
    }
  }]);

  return Boid;
}();

exports.default = Boid;

/***/ })
/******/ ]);