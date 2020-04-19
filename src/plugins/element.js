import Vue from 'vue'
// 导入弹窗提示组件
import { Button, Form, FormItem, Input, Message } from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
    // 弹窗组件必须挂载在Vue上
Vue.prototype.$message = Message