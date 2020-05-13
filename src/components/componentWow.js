/* eslint-disable */
import util from "./mixins/utils";
export default {
  props: {
    // offset: {
    //   type: Number,
    //   default: 0
    // },
    // // 是否立即执行
    // begin: {
    //   type: Boolean,
    //   default: false
    // },
    // // 禁用滚动计算
    // scrollListen: {
    //   type: Boolean,
    //   default: true
    // }
  },
  data() {
    return {
      element: undefined, // HTML 文档根节点元素
      scrolled: true, // 滚动状态
      animationName: '',//
      animationNameCache: new WeakMap(),
      vendors: ['moz', 'webkit'], // 样式前缀
      interval: '',

      boxes: undefined,

      /**
       * 默认参数信息
       */
      defaultInfo: {
        boxClass: 'wow', // 要滚动显示动画的 class
        animateClass: 'animated', // 触发 CSS 动画的 class
        offset: 0, // 浏览器视口底部的附加距离。当用户滚动并到达此距离时才会显示动画。
        innerHeight: 0, // 定义浏览器视口的高度（当手机页面进行缩放时使用）
        mobile: false, // 在手机端是否禁用  默认不禁用
        isCycle: false, // 是否来回滚动都执行动画。当超出浏览器视口的动画模块 再 回到浏览器视口时是否重新激活动画
        callback: null // 激活动画显示 时的回调
      }
    };
  },
  watch: {
    scrolled(val) {
      if (val === true) {
        this.scrollCallback();
      }
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
    /**
     * 初始化
     * @returns {Array}
     */
    init(config) {
      const self = this;
      self.defaultInfo = Object.assign(self.defaultInfo, config);

      // 开始函数
      self.start();
    },

    /**
     * 开始
     */
    start() {
      const self = this;
      if (self.defaultInfo.mobile) {
        util.resetStyle();
      } else {
        // 设置初始样式
        self.applyStyle(self.$el, true);

        self.scrollCallback();

        // 在document视图或者一个element在滚动的时候，会触发元素的scroll事件
        util.addEvent(window, 'scroll', self.scrollHandler);

        // 当调整浏览器窗口大小时会触发此事件
        util.addEvent(window, 'resize', self.scrollHandler);
      }
    },

    scrollHandler() {
      const self = this;
      self.scrolled = true;
    },

    /**
     * 重置样式 将 隐藏box 设为显示
     * @returns {Array}
     */
    resetStyle() {
      const self = this;
      self.$el.style.visibility = 'visible';
    },

    /**
     * 应用样式 获取高级选项中的样式参数赋值并设置 box 默认样式
     *
     * data-wow-duration：更改动画的持续时间
     * data-wow-delay：动画开始之前的延迟
     * data-wow-iteration：动画的次数重复
     *
     * @param box：有 boxClass 的 DOM
     * @param hidden: box 是否显示
     * @returns {*|Animation}
     */
    applyStyle: function (box, hidden) {
      const self = this;
      let duration = box.getAttribute('data-wow-duration');
      let delay = box.getAttribute('data-wow-delay');
      let iteration = box.getAttribute('data-wow-iteration');

      self.animationName = util.animationName(box);


      // 动画持续时间
      if (duration) {
        self.vendorSet(box.style, {
          animationDuration: duration
        });
      }

      // 动画延迟时间
      if (delay) {
        self.vendorSet(box.style, {
          animationDelay: delay
        });
      }

      // 动画执行次数
      if (iteration) {
        self.vendorSet(box.style, {
          animationIterationCount: iteration
        });
      }

      self.showAnimation(box, hidden);

      return box;
    },

    /**
     * 给css动画赋值并增加前缀
     * @param elem
     * @param properties
     */
    vendorSet(elem, properties) {
      const self = this;
      for (let name in properties) {
        let value = properties[name];

        elem['' + name] = value;

        self.vendors.forEach(vendor => {
          elem['' + vendor + name.charAt(0).toUpperCase() + name.substr(1)] = value
        });
      }
    },

    /**
     * 滚动回调
     * @returns {*|*|void}
     */
    scrollCallback() {
      const self = this;
      self.scrolled = false;

        const item = self.$el;
        if (!item) {
          return true;
        }

        if (self.isVisible(item)) {
          self.show(item);
          return true;
        }

        if (self.defaultInfo.isCycle && !self.isVisible(item) && item.eventList && item.eventList.animationend) {
          self.applyStyle(item, true);
          item.eventList = {};
        }

      // if (!(self.defaultInfo.live)) {
      //   return util.stop();
      // }
    },

    /**
     * 判断 box 是否符合显示条件
     * @param box
     * @returns {boolean}
     */
    isVisible(box) {
      const self = this;
      // 在浏览器视口窗 顶部与底部 另加的距离
      let offset = self.defaultInfo.offset;

      // 浏览器顶部位置
      let viewTop = window.pageYOffset;

      // 浏览器底部的位置
      let viewBottom = viewTop + self.innerHeight() - offset;

      // box 现在顶部的位置
      let top = util.offsetTop(box);

      // box 现在底部的位置
      let bottom = top + box.clientHeight;

      // box顶部位置 <= 浏览器视口底部位置 && box底部位置 >= 浏览器顶部位置
      return top <= viewBottom && bottom >= viewTop;
    },

    /**
     * 获取窗口高度
     * @returns {number}
     */
    innerHeight: function () {
      const self = this;
      if (self.defaultInfo.innerHeight) {
        return self.defaultInfo.innerHeight;
      } else {
        if (util.isMobile()) {
          // 判断 html元素对象内容的实际高度 > 浏览器窗口文档显示区域的高度
          if (document.documentElement.scrollHeight > document.documentElement.clientHeight) {
            return window.innerHeight;
          } else {
            return document.documentElement.clientHeight;
          }

        } else {
          return Math.min(document.documentElement.clientHeight, window.innerHeight);
        }
      }
    },

    /**
     * box 显示
     * @param box
     * @returns {*}
     */
    show(box) {
      const self = this;
      // 将 visibility 隐藏 改为 显示
      self.showAnimation(box);

      // 向 box 的 class 中添加 动画类名
      box.className = box.className + ' ' + self.defaultInfo.animateClass;

      if (box.eventList === undefined) {
        box.eventList = {};
      }

      if (box.eventList.animationend) {
        self.resetAnimationCycle(box);
      } else {
        // 适配不同浏览器的 CSS 动画完成后触发 事件
        util.addEvent(box, 'animationend', self.resetAnimation);
        box.eventList.animationend = true;

        util.addEvent(box, 'oanimationend', self.resetAnimation);
        box.eventList.oanimationend = true;

        util.addEvent(box, 'webkitAnimationEnd', self.resetAnimation);
        box.eventList.webkitAnimationEnd = true;

        util.addEvent(box, 'mozAnimationEnd ', self.resetAnimation);
        box.eventList.mozAnimationEnd = true;

        util.addEvent(box, 'MSAnimationEnd', self.resetAnimation);
        box.eventList.MSAnimationEnd = true;
      }

      return box;
    },

    /**
     * 显示动画
     */
    showAnimation(box, hidden) {
      const self = this;
      box.style.visibility = hidden ? 'hidden' : 'visible';
      // 动画名称
      self.vendorSet(box.style, {
        animationName: hidden ? 'none' : self.animationName
      });
    },

    /**
     * 动画执行完成后的事件回调。
     * 删除 box 动画完成后 className 中多出的 animateClass 定义的 class
     * @param event
     * @returns {*}
     */
    resetAnimationCycle(box) {
      const self = this;
      return (box.className = box.className.replace(self.defaultInfo.animateClass, '').trim());
    },

    /**
     * 动画执行完成后的事件回调。
     * 删除 box 动画完成后 className 中多出的 animateClass 定义的 class
     * @param box
     * @returns {*}
     */
    resetAnimation: function (event) {
      const self = this;
      let target;

      // 判断有没有设置 回调
      if (self.defaultInfo.callback != null) {
        self.defaultInfo.callback();
      }

      if (event.type.toLowerCase().indexOf('animationend') >= 0) {
        target = event.target || event.srcElement;
        return (target.className = target.className.replace(self.defaultInfo.animateClass, '').trim());
      }
    },
  }
};
