<template>
    <div
            class="wow"
            :class="animateName"
            :data-wow-duration="duration"
            :data-wow-delay="delay"
            :data-wow-iteration="iteration"
    >
        <slot></slot>
    </div>
</template>

<script>
  import componentWow from "../componentWow";

  export default {
    name: "qiuWow",
    components: {},
    mixins: [componentWow],
    props: {
      duration: { //动画持续时间
        type: String,
        default: "1s"
      },
      delay: { //动画延迟时间
        type: String,
        default: "0s"
      },
      iteration: { //动画执行次数
        type: Number,
        default: 1
      },

      animateName: { // 动画 class 名称
        type: String,
        default: ""
      },

      animateClass: { // 触发 CSS 动画的 class
        type: String,
        default: "animated"
      },
      offset: { // 浏览器视口底部的附加距离。当用户滚动并到达此距离时才会显示动画。
        type: Number,
        default: 0
      },
      mobile: { // 在手机端是否禁用  默认不禁用
        type: Boolean,
        default: false
      },
      isCycle: { // 是否来回滚动都执行动画。当超出浏览器视口的动画模块 再 回到浏览器视口时是否重新激活动画
        type: Boolean,
        default: false
      },
      callback: { // 执行完成后的回调
        type: Function,
        default: null
      }
    },
    data() {
      return {};
    },
    // 计算属性
    computed: {},
    // 监听事件
    watch: {},
    // 创建
    created() {
      const self = this;
      window.qiuWow = self;
    },
    // 挂载
    mounted() {
      const self = this;

      self.init({
        animateClass: self.animateClass, // 触发 CSS 动画的 class
        offset: self.offset, // 浏览器视口底部的附加距离。当用户滚动并到达此距离时才会显示动画。
        mobile: self.mobile, // 在手机端是否禁用  默认不禁用
        live: self.live, // 在页面上同时检查新的 wow 元素
        isCycle: self.isCycle, // 是否来回滚动都执行动画。当超出浏览器视口的动画模块 再 回到浏览器视口时是否重新激活动画
        callback: self.callback // 激活动画显示 时的回调
      });
    },
    // 事件处理器
    methods: {}
  };
</script>

<style scoped lang="less">

</style>
