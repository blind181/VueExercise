import 'jquery/dist/jquery'
import UIkit from 'uikit'
import 'uikit-theme'

console.log('')
export default (Vue, options) => {
  const ui = UIkit
  // 向实例注入
  Vue.prototype.$ui = {
    $: ui.$,
    modal: ui.modal,
    alert: ui.modal.alert,
    confirm: ui.modal.confirm,
    prompt: ui.modal.prompt,
    block: ui.modal.blockUI
  }
}
