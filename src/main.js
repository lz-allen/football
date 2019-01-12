// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import {Button, Dialog, Pagination, Slider, Input, Select, Tag, Option, OptionGroup, Message, Radio, Loading, Dropdown, DropdownMenu, DropdownItem} from 'element-ui'

Vue.use(Slider)
Vue.use(Select)
Vue.use(Input)
Vue.use(Option)
Vue.use(Dialog)
Vue.use(Tag)
Vue.use(Button)
Vue.use(Radio)
Vue.use(Loading)
Vue.use(OptionGroup)
Vue.use(Dropdown)
Vue.use(Pagination)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.prototype.$message = Message
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
