import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import qiuWow from '../index';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import "animate.css";

Vue.config.productionTip = false;
Vue.prototype.$animateArr = [
  "bounce",
  "flash",
  "pulse",
  "rubberBand",
  "shake",
  "swing",
  "tada",
  "wobble",

  "bounceIn",
  "bounceInDown",
  "bounceInLeft",
  "bounceInRight",
  "bounceInUp",

  "bounceOut",
  "bounceOutDown",
  "bounceOutLeft",
  "bounceOutRight",
  "bounceOutUp",

  "fadeIn",
  "fadeInDown",
  "fadeInDownBig",
  "fadeInLeft",
  "fadeInLeftBig",
  "fadeInRight",
  "fadeInRightBig",
  "fadeInUp",
  "fadeInUpBig",

  "fadeOut",
  "fadeOutDown",
  "fadeOutDownBig",
  "fadeOutLeft",
  "fadeOutLeftBig",
  "fadeOutRight",
  "fadeOutRightBig",
  "fadeOutUp",
  "fadeOutUpBig",

  "flip",
  "flipInX",
  "flipInY",
  "flipOutX",
  "flipOutY",

  "lightSpeedIn",
  "lightSpeedOut",

  "rotateIn",
  "rotateInDownLeft",
  "rotateInDownRight",
  "rotateInUpLeft",
  "rotateInUpRight",

  "rotateOut",
  "rotateOutDownLeft",
  "rotateOutDownRight",
  "rotateOutUpLeft",
  "rotateOutUpRight",

  "slideInDown",
  "slideInLeft",
  "slideInRight",
  "slideInUp",
  "slideOutDown",
  "slideOutLeft",
  "slideOutRight",
  "slideOutUp",

  "hinge",
  "rollIn",
  "rollOut",

  "headShake",
  "jello",
  "jackInTheBox",
  "zoomIn",
  "zoomInDown",
  "zoomInLeft",
  "zoomInRight",
  "zoomInUp",
  "zoomOut",
  "zoomOutDown",
  "zoomOutLeft",
  "zoomOutRight",
  "zoomOutUp",
  "heartBeat"
];

Vue.use(qiuWow);
Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
