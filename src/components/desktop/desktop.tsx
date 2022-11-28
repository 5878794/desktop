//桌面区域

import {defineComponent} from "vue";
import win from "@/components/desktop/win/win";

//cache
import {getAppInfo, openedWin} from "@/components/desktop/cache/data";


export default defineComponent({
    components: {win},
    render() {
        return <>
            {
                openedWin.value.map((id: any) => {
                    const item = getAppInfo(id);
                    if (item) {
                        return <win id={item.id}/>
                    } else {
                        console.error(`id为：${id}的app不存在！`);
                        return null;
                    }
                })
            }

        </>
    }
})