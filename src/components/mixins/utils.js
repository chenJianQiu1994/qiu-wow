/* eslint-disable */
/**
 * 工具
 */
let util = {
  /**
   * 获取 box 中的动画名称
   * @param box
   * @returns {*}
   */
  animationName: function (box) {
    let animationName = getComputedStyle(box).getPropertyValue('animation-name');

    if (animationName === 'none') {
      return '';
    } else {
      return animationName;
    }
  },





  /**
   * 判断是不是手机
   * @returns {boolean}
   */
  isMobile: () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  },

  // /**
  //  * 对象合并
  //  * @returns {*}
  //  */
  // extend: (...argument) => {
  //   return Object.assign(...argument);
  // },

  /**
   * 获取所有 定义了boxClass 的显示隐藏框
   */
  boxList: () => {
    const self = this;
    return [...self.element.querySelectorAll('.' + self.defaultInfo.boxClass)];
  },

  /**
   * 向指定元素添加事件
   * @param elem
   * @param event
   * @param fn
   * @returns {*}
   */
  addEvent: function (elem, event, fn) {
    if (elem.addEventListener != null) {
      return elem.addEventListener(event, fn, false);
    } else if (elem.attachEvent != null) {
      return elem.attachEvent('on' + event, fn);
    } else {
      return (elem[event] = fn);
    }
  },

  /**
   * 手机时是否禁用
   * @returns {boolean|*}
   */
  disabled: () => {
    const self = this;
    return self.defaultInfo.mobile;
    // && util.isMobile();
  },

  /**
   * 重置样式 将 隐藏box 设为显示
   * @returns {Array}
   */
  resetStyle: () => {
    let results = [];

    util.boxList().forEach(box => {
      results.push((box.style.visibility = 'visible'));
    });

    return results;
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
    let duration = box.getAttribute('data-wow-duration');
    let delay = box.getAttribute('data-wow-delay');
    let iteration = box.getAttribute('data-wow-iteration');

    return util.customStyle(box, hidden, duration, delay, iteration);
  },

  /**
   * 自定义样式
   * @param box：box 的 DOM
   * @param hidden：box 的显示隐藏
   * @param duration：更改动画的持续时间
   * @param delay：动画开始之前的延迟
   * @param iteration：动画的次数重复
   * @returns {*}
   */
  customStyle: function (box, hidden, duration, delay, iteration) {
    const self = this;
    if (hidden) {
      self.animationNameCache.set(box, util.animationName(box));
    }

    box.style.visibility = hidden ? 'hidden' : 'visible';

    if (duration) {
      util.vendorSet(box.style, {
        animationDuration: duration
      });
    }

    if (delay) {
      util.vendorSet(box.style, {
        animationDelay: delay
      });
    }

    if (iteration) {
      util.vendorSet(box.style, {
        animationIterationCount: iteration
      });
    }

    util.vendorSet(box.style, {
      animationName: hidden ? 'none' : self.animationNameCache.get(box)
    });

    return box;
  },


  /**
   * 给样式加前缀并赋值
   * @param elem
   * @param properties
   * @returns {Array}
   */
  // vendorSet: function (elem, properties) {
  //   const self = this;
  //   let results = [];
  //   debugger
  //   for (let name in properties) {
  //     let value = properties[name];
  //     elem['' + name] = value;
  //
  //     results.push(
  //       (() => {
  //         let results1 = [];
  //
  //         self.vendors.forEach(vendor => {
  //           results1.push(
  //             (elem['' + vendor + name.charAt(0).toUpperCase() + name.substr(1)] = value)
  //           );
  //         });
  //
  //         return results1;
  //       })()
  //     );
  //   }
  //   return results;
  // },
  vendorSet: function (elem, properties) {
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
   * 判断 box 是否符合显示条件
   * @param box
   * @returns {boolean}
   */
  isVisible: function (box) {
    const self = this;
    // 在浏览器视口窗 顶部与底部 另加的距离
    let offset = self.defaultInfo.offset;

    // 浏览器顶部位置
    let viewTop = window.pageYOffset;

    // 浏览器底部的位置
    let viewBottom = viewTop + util.innerHeight() - offset;

    // box 现在顶部的位置
    let top = util.offsetTop(box);

    // box 现在底部的位置
    let bottom = top + box.clientHeight;

    // box顶部位置 <= 浏览器视口底部位置 && box底部位置 >= 浏览器顶部位置
    return top <= viewBottom && bottom >= viewTop;
  },

  /**
   * box 显示
   * @param box
   * @returns {*}
   */
  show: function (box) {
    const self = this;
    // 将 visibility 隐藏 改为 显示
    util.applyStyle(box);

    // 向 box 的 class 中添加 动画类名
    box.className = box.className + ' ' + self.defaultInfo.animateClass;

    // 判断有没有设置 回调
    if (self.defaultInfo.callback != null) {
      self.defaultInfo.callback(box);
    }

    if (box.eventList === undefined) {
      box.eventList = {};
    }

    if (box.eventList.animationend) {
      util.resetAnimationCycle(box);
    } else {
      // 适配不同浏览器的 CSS 动画完成后触发 事件
      util.addEvent(box, 'animationend', util.resetAnimation);
      box.eventList.animationend = true;

      util.addEvent(box, 'oanimationend', util.resetAnimation);
      box.eventList.oanimationend = true;

      util.addEvent(box, 'webkitAnimationEnd', util.resetAnimation);
      box.eventList.webkitAnimationEnd = true;

      util.addEvent(box, 'mozAnimationEnd ', util.resetAnimation);
      box.eventList.mozAnimationEnd = true;

      util.addEvent(box, 'MSAnimationEnd', util.resetAnimation);
      box.eventList.MSAnimationEnd = true;
    }

    return box;
  },

  /**
   * 动画执行完成后的事件回调。
   * 删除 box 动画完成后 className 中多出的 animateClass 定义的 class
   * @param box
   * @returns {*}
   */
  resetAnimation: function (event) {
    debugger
    const self = this;
    let target;

    if (event.type.toLowerCase().indexOf('animationend') >= 0) {
      target = event.target || event.srcElement;
      return (target.className = target.className.replace(self.defaultInfo.animateClass, '').trim());
    }
  },

  /**
   * 动画执行完成后的事件回调。
   * 删除 box 动画完成后 className 中多出的 animateClass 定义的 class
   * @param event
   * @returns {*}
   */
  resetAnimationCycle: function (box) {
    const self = this;
    return (box.className = box.className.replace(self.defaultInfo.animateClass, '').trim());
  },

  /**
   * 停止 循环
   */
  stop: function () {

    // 移除 滚动 事件
    util.removeEvent(
      window,
      'scroll',
      scrollCallback
    );

    // 移除 窗口变化 事件
    util.removeEvent(window, 'resize', scrollCallback);
  },

  /**
   * 移除由 addEventListener() 方法添加的事件
   * @param elem
   * @param event
   * @param fn
   * @returns {*}
   */
  removeEvent: function (elem, event, fn) {
    if (elem.removeEventListener != null) {
      return elem.removeEventListener(event, fn, false);
    } else if (elem.detachEvent != null) {
      return elem.detachEvent('on' + event, fn);
    } else {
      return delete elem[event];
    }
  },

  /**
   * 获取 box 距离顶部的距离
   * @param element
   * @returns {*}
   */
  offsetTop: function (element) {
    let top;

    while (element.offsetTop === void 0) {
      element = element.parentNode;
    }

    top = element.offsetTop;

    while ((element = element.offsetParent)) {
      top += element.offsetTop;
    }

    return top;
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

  doSync: element => {
    const self = this;
    let results = [];
    if (element == null) {
      element = self.element;
    }

    if (element.nodeType !== 1) {
      return;
    }

    util.boxList().forEach(box => {
      if (self.boxes.indexOf(box) < 0) {
        self.boxes.push(box);

        if (util.disabled()) {
          util.resetStyle();
        } else {
          util.applyStyle(box, true);
        }

        results.push((self.scrolled = true));
      } else {
        results.push(void 0);
      }
    });
    return results;
  }
};

export default util;
