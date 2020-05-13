/* eslint-disable */
/**
 * 信息存放
 * @type {{element: HTMLElement, scrolled: boolean, animationNameCache: WeakMap<object, any>, vendors: string[], interval: string, boxes: undefined, defaultInfo: {boxClass: string, animateClass: string, offset: number, mobile: boolean, live: boolean, callback: null}}}
 */
const qiuWowJS =  {
  element: window.document.documentElement, // HTML 文档根节点元素
  scrolled: true, // 滚动状态
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
    live: true, // 在页面上同时检查新的 wow 元素
    isCycle: false, // 是否来回滚动都执行动画。当超出浏览器视口的动画模块 再 回到浏览器视口时是否重新激活动画
    callback: null // 激活动画显示 时的回调
  }
};

/**
 * 滚动回调
 * @returns {*|*|void}
 */
function scrollCallback() {
  qiuWowJS.scrolled = false;
  let ref = qiuWowJS.defaultInfo.isCycle ? util.boxList() : (qiuWowJS.boxes || util.boxList());
  let results = [];

  ref.forEach(item => {
    if (!item) {
      return true;
    }

    if (util.isVisible(item)) {
      util.show(item);
      return true;
    }

    if (qiuWowJS.defaultInfo.isCycle && !util.isVisible(item) && item.eventList && item.eventList.animationend) {
      util.applyStyle(item, true);
      item.eventList = {};
    }

    results.push(item);
  });

  qiuWowJS.boxes = results;

  if (!(results.length || qiuWowJS.defaultInfo.live)) {
    return util.stop();
  }
}

/**
 * 初始化
 * @returns {Array}
 */
function init(config) {
  qiuWowJS.defaultInfo = Object.assign(qiuWowJS.defaultInfo, config);

  // 属性返回当前文档的状态
  // uninitialized - 还未开始载入
  // loading - 载入中
  // interactive - 已加载，文档与用户可以开始交互
  // complete - 载入完成
  // let interval = setInterval(() => {
  //   if ((ref = document.readyState) === 'interactive' || ref === 'complete') {
  //     clearInterval(interval);
      // 开始函数
      start();
    // }
  // }, 50);
}

/**
 * 开始
 */
function start() {
  if (util.boxList().length) {
    if (util.disabled()) {
      util.resetStyle();
    } else {
      // 设置初始样式
      util.boxList().forEach(item => {
        util.applyStyle(item, true);
      });

      scrollCallback();

      // 在document视图或者一个element在滚动的时候，会触发元素的scroll事件
      util.addEvent(window, 'scroll', scrollCallback);

      // 当调整浏览器窗口大小时会触发此事件
      util.addEvent(window, 'resize', scrollCallback);
    }
  }


  // 在页面上同时检查新的 wow 元素
  if (qiuWowJS.defaultInfo.live) {
    return new MutationObserver(records => {
      let results = [];

      if (records.length) {
        records.forEach(item => {
          results.push(
            (() => {
              let ref = item.addedNodes || [];
              let results1 = [];
              ref.forEach(dom => {
                results1.push(util.doSync(dom));
              });
              return results1;
            })()
          );
        });
      }
      return results;
    }).observe(document.body, {
      childList: true,
      subtree: true
    });
  }
}

/**
 * 工具
 */
let util = {
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
    return [...qiuWowJS.element.querySelectorAll('.' + qiuWowJS.defaultInfo.boxClass)];
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
    return qiuWowJS.defaultInfo.mobile;
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
    if (hidden) {
      qiuWowJS.animationNameCache.set(box, util.animationName(box));
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
      animationName: hidden ? 'none' : qiuWowJS.animationNameCache.get(box)
    });

    return box;
  },

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
   * 给样式加前缀并赋值
   * @param elem
   * @param properties
   * @returns {Array}
   */
  vendorSet: function (elem, properties) {
    let results = [];
    for (let name in properties) {
      let value = properties[name];
      elem['' + name] = value;

      results.push(
        (() => {
          let results1 = [];

          qiuWowJS.vendors.forEach(vendor => {
            results1.push(
              (elem['' + vendor + name.charAt(0).toUpperCase() + name.substr(1)] = value)
            );
          });

          return results1;
        })()
      );
    }
    return results;
  },

  /**
   * 判断 box 是否符合显示条件
   * @param box
   * @returns {boolean}
   */
  isVisible: function (box) {
    // 在浏览器视口窗 顶部与底部 另加的距离
    let offset = qiuWowJS.defaultInfo.offset;

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

    // 将 visibility 隐藏 改为 显示
    util.applyStyle(box);

    // 向 box 的 class 中添加 动画类名
    box.className = box.className + ' ' + qiuWowJS.defaultInfo.animateClass;

    // 判断有没有设置 回调
    if (qiuWowJS.defaultInfo.callback != null) {
      qiuWowJS.defaultInfo.callback(box);
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
    let target;

    if (event.type.toLowerCase().indexOf('animationend') >= 0) {
      target = event.target || event.srcElement;
      return (target.className = target.className.replace(qiuWowJS.defaultInfo.animateClass, '').trim());
    }
  },

  /**
   * 动画执行完成后的事件回调。
   * 删除 box 动画完成后 className 中多出的 animateClass 定义的 class
   * @param event
   * @returns {*}
   */
  resetAnimationCycle: function (box) {
    return (box.className = box.className.replace(qiuWowJS.defaultInfo.animateClass, '').trim());
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
    if (qiuWowJS.defaultInfo.innerHeight) {
      return qiuWowJS.defaultInfo.innerHeight;
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
    let results = [];
    if (element == null) {
      element = qiuWowJS.element;
    }

    if (element.nodeType !== 1) {
      return;
    }

    util.boxList().forEach(box => {
      if (qiuWowJS.boxes.indexOf(box) < 0) {
        qiuWowJS.boxes.push(box);

        if (util.disabled()) {
          util.resetStyle();
        } else {
          util.applyStyle(box, true);
        }

        results.push((qiuWowJS.scrolled = true));
      } else {
        results.push(void 0);
      }
    });
    return results;
  }
};
export {
  util,
  scrollCallback
}

export default init;
