作用：当动画模块滚动到浏览器视口时激活动画。这个插件是基于 vue 与 animate.css 的也可以定义自己的动画效果。
[![NPM](https://nodei.co/npm/<package>.png)](https://nodei.co/npm/<package>/)

1. npm 引入
```
npm i qiu-wow
```
2. import 页面引入

```
import wow from 'qiu-wow';
```

3. 写 html 并在 class 中加一个自己定义的 boxClass

```
// wow 为自己定的 boxClass
// swing 是 animate.css 中的动画
<div class="wow swing" >
    <img src="imgPath">
</div>
```

4. 填写配置信息调用, 启动项目并打开页面即可看到效果

```
wow({
    boxClass: 'wow', // 要滚动显示动画的 class
    animateClass: 'animated', // 触发 CSS 动画的 class
    offset: 0, // 浏览器视口底部的附加距离。当用户滚动并到达此距离时才会显示动画。
    innerHeight: 0, // 定义浏览器视口的高度（当手机页面进行缩放时使用）
    mobile: false, // 在手机端是否禁用  默认不禁用
    live: true, // 在页面上同时检查新的 wow 元素
    isCycle: false, // 是否来回滚动都执行动画。当超出浏览器视口的动画模块 再 回到浏览器视口时是否重新激活动画
    callback: null // 激活动画显示 时的回调
});
```
