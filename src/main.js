// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import axios from 'axios'
// import VueAxios from 'vue-axios'
import QS from 'qs'
import echarts from 'echarts'
import VueResource from 'vue-resource'


Vue.config.productionTip = false;
// Vue.use(VueAxios,axios);
Vue.prototype.qs = QS;
Vue.prototype.$echarts = echarts;
Vue.prototype.$http = axios;
Vue.use(ViewUI);
Vue.use(ElementUI);
Vue.use(VueResource);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
