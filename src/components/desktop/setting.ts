// 传入的app数据

import morePng from "@/assets/more.png";
import guid from "@/components/desktop/fn/guid";

import {defineComponent, h} from "vue";

const testCom = defineComponent({
    props: {
        name: {type: String, default: ''}
    },
    render() {
        return h('div', this.name)
    }
})

export const appList = [
    {id: guid(), name: 'test1', icon: morePng, com: '', url: 'https://www.sina.com'},
    {id: guid(), name: 'test2', icon: morePng, com: '', url: 'https://www.163.com'},
    {id: guid(), name: 'test3', icon: morePng, com: testCom, props: {name: 'aaa'}, url: ''},
]
