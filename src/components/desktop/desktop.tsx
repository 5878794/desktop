
import { defineComponent } from 'vue'
import myStyle from './index.module.scss'

export default defineComponent({
  render () {
    return <div class={[myStyle.test, 'aa']}>123</div>
  }
})
