
import { defineCustomElement } from 'vue'
import myStyle from './index.module.scss'

export default defineCustomElement({
  styles: [],
  render () {
    return <div class={myStyle.test}>test1</div>
  }
})
