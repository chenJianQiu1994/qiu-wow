<template>
    <div class="animationPage-page-model-box">
        <div class="title hint">qiu-wow.js</div>

        <div class="block-box">
            <div
                    class="block-dom wow"
                    :class="name"
                    :id="index"
                    v-for="(name, index) in $animateArr"
                    :key="'img' + index"
            >
                <div class="block">
                    <div
                            class="animate animated infinite"
                            :class="name"
                            :data-animate="name"
                    >
                        <img class="img" :src="imgDom[index % 4]"/>
                    </div>
                </div>

                <div class="animate-name">{{ name }}</div>
            </div>
        </div>
    </div>
</template>

<script>
  import wow from '../../index';
  export default {
    name: 'animationPage',
    components: {},
    props: [],
    data() {
      return {
        blockBoxShow: false,
        imgDom: [
          require("../assets/img/1.png"),
          require("../assets/img/2.png"),
          require("../assets/img/3.png"),
          require("../assets/img/4.png")
        ]
      };
    },
    // 计算属性
    computed: {},
    // 监听事件
    watch: {},
    // 创建
    created() {
      const self = this;
      window.animationPage = self;
    },
// 挂载
    mounted() {
      wow({
        boxClass: 'wow', // 要滚动显示动画的 class
        animateClass: 'animated', // 触发 CSS 动画的 class
        offset: 0, // 浏览器视口底部的附加距离。当用户滚动并到达此距离时才会显示动画。
        innerHeight: 0, // 定义浏览器视口的高度（当手机页面进行缩放时使用）
        mobile: false, // 在手机端是否禁用  默认不禁用
        live: true, // 在页面上同时检查新的 wow 元素
        isCycle: false, // 是否来回滚动都执行动画。当超出浏览器视口的动画模块 再 回到浏览器视口时是否重新激活动画
        callback: null
      });
    },
// 事件处理器
    methods: {}
  };
</script>

<style scoped lang="less">
    .animationPage-page-model-box {
        width: 1200px;
        margin: 0 auto;
        .title {
            text-align: center;
        }

        .hint {
            font-size: 80px;
            font-weight: bolder;
            margin: 20px 0 40px 0;
        }

        .abbreviation {
            img {
                margin: 0 auto;
            }
        }

        .block-box {
            display: flex;
            flex-wrap: wrap;
            .block {
                width: 245px;
                height: 250px;
                overflow: hidden;
                margin: 35px 25px 10px 25px;

                display: flex;
                justify-content: center;
                align-items: center;
                border: 1px solid #c1c1c1;
                .animate {
                    width: 100px;
                    animation-duration: 3s;
                    animation-delay: 1s;
                }
                .img {
                    width: 100%;
                    border-radius: 50%;
                }
            }

            .animate-name {
                font-size: 12px;
                text-align: center;
            }
        }
    }
</style>
