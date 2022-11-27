//左侧app列表
import {defineComponent} from "vue";
import app from './app'

export default defineComponent({
    components: {app},
    setup(props) {
        console.log(props)
    },
    render() {
        return <>
            <app></app>
        </>
    }
})