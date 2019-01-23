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
  var ctxH = canvas.height;
  var ctxW = canvas.width;

  var myReq = void 0;
  var flock = [];
  var numBoids = 100;
  var mouseX = void 0;
  var mouseY = void 0;
  var lastTime = 0;
  var deltaTime = void 0;

  window.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  for (var i = 0; i < numBoids; i++) {
    flock.push(new _boid2.default(ctxW, ctxH));
  }

  var update = function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    flock.forEach(function (boid) {
      boid.draw(ctx);
      boid.alignment(flock);
      boid.cohesion(flock);
      boid.separation(flock);
      boid.avoidMouse(mouseX, mouseY);
      boid.update(deltaTime);
    });
  };

  var animate = function animate() {
    var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    deltaTime = time - lastTime;
    lastTime = time;
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
  function Boid(width, height) {
    _classCallCheck(this, Boid);

    this.canvasW = width;
    this.canvasH = height;
    this.positionX = Math.random() * this.canvasW;
    this.positionY = Math.random() * this.canvasH;
    this.velocity = [Math.random() * 6 - 3, Math.random() * 6 - 3];
    this.speed = 0.1;
    this.execute = 0;
    this.frame = Math.floor(Math.random() * 3 + 1);
    this.bird = new Image();
    this.bird.src = './assets/images/bird.png';
    this.maxVelocity = this.maxVelocity.bind(this);

    //position 1: 50,0
    //position 2:780,0 sw: 670
    //position 3: 0,800
    this.data = {
      sx: 0,
      sy: 0,
      sw: 700,
      sh: 670,
      cx: this.positionX,
      cy: this.positionY,
      dw: 50,
      dh: 50
    };
  }

  _createClass(Boid, [{
    key: 'draw',
    value: function draw(ctx) {
      console.log(this.velocity);
      if (this.velocity[0] < 0) {
        ctx.save();
        ctx.scale(-1, 1);
        ctx.translate(-this.canvasW, 0);
        ctx.drawImage(this.bird, this.data.sx, this.data.sy, this.data.sw, this.data.sh, this.canvasW - 50 - this.positionX, this.positionY, this.data.dw, this.data.dh);
        ctx.restore();
      } else {
        ctx.save();
        ctx.scale(1, 1);
        ctx.translate(this.canvas, 0);
        ctx.drawImage(this.bird, this.data.sx, this.data.sy, this.data.sw, this.data.sh, this.positionX, this.positionY, this.data.dw, this.data.dh);
        ctx.restore();
      }
    }
  }, {
    key: 'alignment',
    value: function alignment(boids) {
      var _this = this;

      var localDetection = 50;
      var average = [0, 0];
      var total = 0;
      boids.forEach(function (boid) {
        var disX = _this.positionX - boid.positionX;
        var disY = _this.positionY - boid.positionY;
        var distance = Math.sqrt(disX * disX + disY * disY);
        if (boid !== _this && distance < localDetection) {
          average[0] += boid.velocity[0];
          average[1] += boid.velocity[1];
          total++;
        }
      });
      if (total > 0) {
        average[0] /= total;
        average[1] /= total;
        this.velocity[0] = this.velocity[0] + (average[0] - this.velocity[0]);
        this.velocity[1] = this.velocity[1] + (average[1] - this.velocity[1]);
      }
    }
  }, {
    key: 'cohesion',
    value: function cohesion(boids) {
      var _this2 = this;

      var localDetection = 50;
      var average = [0, 0];
      var total = 0;
      boids.forEach(function (boid) {
        var disX = _this2.positionX - boid.positionX;
        var disY = _this2.positionY - boid.positionY;
        var distance = Math.sqrt(disX * disX + disY * disY);
        if (boid !== _this2 && distance < localDetection) {
          average[0] += boid.positionX;
          average[1] += boid.positionY;
          total++;
        }
      });
      if (total > 0) {
        average[0] /= total;
        average[1] /= total;
        // console.log((average[0] - this.positionX)/localDetection * 0.2);
        this.velocity[0] = this.velocity[0] + (average[0] - this.positionX) / localDetection;
        this.velocity[1] = this.velocity[1] + (average[1] - this.positionY) / localDetection;
        this.velocity[0] = this.maxVelocity(this.velocity[0]);
        this.velocity[1] = this.maxVelocity(this.velocity[1]);
        // console.log(this.velocity);
      }
    }
  }, {
    key: 'separation',
    value: function separation(boids) {
      var _this3 = this;

      var localDetection = 30;
      var c = [0, 0];
      boids.forEach(function (boid) {
        var disX = _this3.positionX - boid.positionX;
        var disY = _this3.positionY - boid.positionY;
        var distance = Math.sqrt(disX * disX + disY * disY);
        if (boid !== _this3 && distance < localDetection) {
          c[0] = c[0] - (boid.positionX - _this3.positionX);
          c[1] = c[1] - (boid.positionY - _this3.positionY);
          _this3.velocity[0] = _this3.velocity[0] + c[0] / distance;
          _this3.velocity[1] = _this3.velocity[1] + c[1] / distance;
          _this3.velocity[0] = _this3.maxVelocity(_this3.velocity[0]);
          _this3.velocity[1] = _this3.maxVelocity(_this3.velocity[1]);
        }
      });
    }
  }, {
    key: 'maxVelocity',
    value: function maxVelocity(velocity) {
      if (velocity > 3) {
        velocity = velocity / 3;
      } else if (velocity < -3) {
        velocity = velocity / 3;
      }
      return velocity;
    }
  }, {
    key: 'avoidMouse',
    value: function avoidMouse(x, y) {
      var localDetection = 100;
      var c = [0, 0];
      var disX = this.positionX - x;
      var disY = this.positionY - y;
      var distance = Math.sqrt(disX * disX + disY * disY);
      if (distance < localDetection) {
        c[0] = c[0] - (x - this.positionX);
        c[1] = c[1] - (y - this.positionY);
        this.velocity[0] = this.velocity[0] + c[0] / distance;
        this.velocity[1] = this.velocity[1] + c[1] / distance;
        this.velocity[0] = this.maxVelocity(this.velocity[0]);
        this.velocity[1] = this.maxVelocity(this.velocity[1]);
      }
    }
  }, {
    key: 'update',
    value: function update(deltaTime) {
      this.execute += deltaTime;
      if (this.positionX > this.canvasW - 50) {
        // this.positionX = 0;
        this.velocity[0] += -1 * (this.canvasW - this.positionX) / 25;
      }
      if (this.positionX < 50) {
        this.velocity[0] += this.positionX / 25;
      }
      if (this.positionY > this.canvasH - 50) {
        this.velocity[1] += -1 * (this.canvasH - this.positionY) / 25;
      }
      if (this.positionY < 50) {
        this.velocity[1] += this.positionY / 25;
      }
      if (this.execute > 200) {
        if (this.frame === 1) {
          this.data.sx = 0;
          this.data.sy = 0;
          this.frame += 1;
        } else if (this.frame === 2) {
          this.data.sx = 780;
          this.data.sy = 0;
          this.frame += 1;
        } else if (this.frame === 3) {
          this.data.sx = 0;
          this.data.sy = 800;
          this.frame = 1;
        }
      }
      if (this.execute > 200) {
        this.execute = 0;
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