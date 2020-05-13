import qiuWowJS from './src/components/qiuWowJS';
import qiuWow from './src/components/qiuWow/qiuWow';

function install(Vue) {
  Vue.component(qiuWow.name, qiuWow);
}

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export { qiuWowJS };
export default install;
