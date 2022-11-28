// 传入的app数据

import morePng from "@/assets/more.png";
import guid from "@/components/desktop/fn/guid";

import {defineComponent, h} from "vue";

const testCom = defineComponent({
    render() {
        return h('div', '123')
    }
})

export const appList = [
    {id: guid(), name: 'test1', icon: morePng, com: '', url: 'https://www.baidu.com'},
    {id: guid(), name: 'test2', icon: morePng, com: '', url: 'https://www.google.com'},
    {id: guid(), name: 'test3', icon: morePng, com: testCom, url: ''},
]