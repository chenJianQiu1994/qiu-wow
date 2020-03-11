<template>
  <div id="app">

    <div class="header-href-box">
      <div>
        <a href="https://nodei.co/npm/qiu-wow/"><img src="https://nodei.co/npm/qiu-wow.png"></a>
      </div>

      <div class="github">
        GitHub: <a href="https://github.com/chenJianQiu1994/qiu-wow">https://github.com/chenJianQiu1994/qiu-wow</a> (欢迎 star)
      </div>
    </div>

    <div class="header-box">
      <div>
        <router-link to="/animationPage">预览</router-link>
      </div>

      <div>
        <router-link to="/helpDocument">如何使用</router-link>
      </div>
    </div>

    <router-view />
  </div>
</template>

<style scoped lang="less">
  .header-href-box {
    display: flex;
    line-height: 56px;
    justify-content: space-evenly;
    background: #dfe0e0;
    padding: 25px;

    .github {
      a {
        color: #0084ff;
      }
    }
  }

  .header-box {
    display: flex;
    margin: 30px;
    justify-content: space-evenly;

    a {
      color: #4b4b4b;
      text-decoration: none;
    }

    .router-link-exact-active {
      color: #00a5df;
    }
  }
</style>

<style lang="less">
  body {
    margin: 0;
    img {
      display: block;
    }

    a {
      cursor: pointer;
      text-decoration: none;
    }
  }
</style>
