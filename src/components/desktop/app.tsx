//左侧app元素

import {defineComponent} from "vue";

export default defineComponent({
    setup(props) {
        console.log(props)
    },
    render() {
        return <>
            <div>app</div>
        </>
    }
})