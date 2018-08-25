// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'lib-flexible/flexible'
import {Button, Slider, Input, Select, Option, OptionGroup, Message, Radio, Loading} from 'element-ui'

Vue.use(Slider)
Vue.use(Select)
Vue.use(Input)
Vue.use(Option)
Vue.use(Button)
Vue.use(Radio)
Vue.use(Loading)
Vue.use(OptionGroup)
Vue.prototype.$message = Message
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
