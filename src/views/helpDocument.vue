<template>
    <div class="helpDocument-page-model-box">
        <div class="hint">设置 qiu-wow.js</div>

        <div class="block">
            <div class="code-hint">
                <div class="number">1</div>
                引入 CSS 动画库
            </div>

            <div class="code-title">引入 <a href="https://github.com/daneden/animate.css">Animate.css</a></div>

            <div class="code-box">
                <pre>
                npm install animate.css@3.7.2

                // main.js
                import "animate.css";
                </pre>
            </div>
        </div>

        <div class="block">
            <div class="code-hint">
                <div class="number">2</div>
                引入 qiu-wow.js
            </div>
            <div class="code-box">

                <pre>
                npm install qiu-wow
                </pre>
            </div>
        </div>

        <el-tabs type="border-card">
            <el-tab-pane label="通过 插件（全局设置）的方式使用">

                <div class="hint">帮助文档</div>

                <div class="block">
                    <div class="code-hint">
                        <div class="number">1</div>
                        引入 qiu-wow
                    </div>
                    <div class="code-title">
                        在需要使用的页面中引入 qiu-wow, qiuWowJS 是js方式的名称。
                    </div>
                    <div class="code-box">
                    <pre>
                    import { qiuWowJS } from 'qiu-wow';
                    </pre>
                    </div>
                </div>

                <div class="block">
                    <div class="code-hint">
                        <div class="number">2</div>
                        定义要显示的内容
                    </div>
                    <div class="code-title">
                        class 中 wow 是默认的容器类名，bounceInUp 是 <a href="https://daneden.github.io/animate.css/">Animate.css</a> 中动效类名
                    </div>
                    <div class="code-box">
                <pre>
                &lt;div class ="wow bounceInUp"&gt;
                    要在此处显示的内容
                &lt;/div&gt;
                </pre>
                    </div>
                </div>

                <div class="block">
                    <div class="code-hint">
                        <div class="number">3</div>
                        启动 qiu-wow
                    </div>
                    <div class="code-title">
                        在 Vue 挂载钩子中（mounted）启动 qiuWowJS() 即可看到效果。
                    </div>
                    <div class="code-box">
                <pre>
                 mounted() {
                    qiuWowJS();
                }
                </pre>
                    </div>
                </div>

                <div class="hint">高级选项</div>

                <div class="block">
                    <div class="code-title">
                        <div>data-wow-duration：更改动画的持续时间</div>
                        <div>data-wow-delay：动画开始之前的延迟</div>
                        <div>data-wow-offset：启动动画的距离（与浏览器底部有关）</div>
                        <div>data-wow-iteration：动画的次数重复</div>
                    </div>
                    <div class="code-box">
                <pre>
                &lt;div class ="wow slideInLeft" data-wow-duration="2s" data-wow-delay="5s"&gt;
                    要在此处显示的内容
                &lt;/div&gt;

                &lt;div class ="wow slideInRight" data-wow-offset="10" data-wow-iteration="10"&gt;
                    要在此处显示的内容
                &lt;/div&gt;
                </pre>
                    </div>
                </div>

                <div class="hint">自定义设置</div>

                <div class="block">
                    <div class="code-box">
                <pre>
                wow({
                    boxClass: 'wow', // 要滚动显示动画的 class
                    animateClass: 'animated', // 触发 CSS 动画的 class
                    offset: 0, // 浏览器视口底部的附加距离。当用户滚动并到达此距离时才会显示动画。
                    innerHeight: 0, // 定义浏览器视口的高度（当手机页面进行缩放时使用）
                    mobile: false, // 在手机端是否禁用  默认不禁用
                    live: true, // 在页面上同时检查新的 wow 元素
                    isCycle: false, // 是否来回滚动都重新执行动画
                    callback: null // 激活动画显示 时的回调
                });
                </pre>
                    </div>
                </div>

            </el-tab-pane>

            <el-tab-pane label="通过 组件（单个设置）的方式使用">

                <div class="hint">帮助文档</div>

                <div class="block">
                    <div class="code-hint">
                        <div class="number">1</div>
                        在 main.js 中引入 qiu-wow
                    </div>
                    <div class="code-title">
                        qiu-wow 默认是使用的组件（单个设置）的方式
                    </div>
                    <div class="code-box">
                    <pre>
                        // main.js

                        import qiuWow from 'qiu-wow';
                        Vue.use(qiuWow);
                    </pre>
                    </div>
                </div>

                <div class="block">
                    <div class="code-hint">
                        <div class="number">2</div>
                        在页面中使用组件即可
                    </div>
                    <div class="code-box">
                    <pre>
                        &lt;qiu-wow
                            animate-name="rollIn"
                        >&lt;/qiu-wow>
                    </pre>
                    </div>
                </div>

                <div class="block">
                    <div class="code-hint">
                        <div class="number">2</div>
                        组件中的可配置项和默认值
                    </div>
                    <div class="code-box">
                    <pre>
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
                          isCycle: { // 是否来回滚动都执行动画
                            type: Boolean,
                            default: false
                          },
                          callback: { // 执行完成后的回调
                            type: Function,
                            default: null
                          }
                        }
                    </pre>
                    </div>
                </div>

            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
  export default {
    name: 'helpDocument',
    components: {},
    props: [],
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
      window.helpDocument = self;
    },
// 挂载
    mounted() {

    },
// 事件处理器
    methods: {}
  };
</script>

<style scoped lang="less">
    .helpDocument-page-model-box {
        width: 800px;
        margin: 0 auto 80px auto;

        .hint {
            font-size: 30px;
            font-weight: bold;
            color: #34bd04;
            border-bottom: 2px dashed;
            margin: 30px 0;
            padding-bottom: 10px;
        }

        .block {
            .code-hint {
                display: flex;
                height: 30px;
                line-height: 30px;
                font-size: 18px;
                margin-bottom: 10px;
                .number {
                    font-size: 18px;
                    width: 30px;
                    height: 30px;
                    background: #15bae4;
                    border-radius: 50%;
                    text-align: center;
                    line-height: 30px;
                    color: #fff;
                    margin-right: 15px;
                }
            }

            .code-title {
                margin-left: 45px;
            }

            .code-box {

            }
        }
    }
</style>
