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
  import { qiuWowJS } from '../../index';
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
      this.start();
    },
// 事件处理器
    methods: {
      start() {
        qiuWowJS();
      }
    }
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
