import {defineComponent} from "vue";

import {getAppInfo} from "@/components/desktop/cache/data";

export default defineComponent({
    props: {
        id: {type: String, default: ''}
    },
    setup(props, {expose}) {
        const appInfo = getAppInfo(props.id);

        expose({})
        return {appInfo}
    },
    render() {
        return <div>{this.appInfo.id}</div>
    }
})