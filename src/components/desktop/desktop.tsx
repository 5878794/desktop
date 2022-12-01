//桌面区域

import {defineComponent} from "vue";
import win from "@/components/desktop/win/win";
import dockingEdge from "@/components/desktop/win/dockingEdge";
//cache
import {getAppInfo, openedWin} from "@/components/desktop/cache/index";


export default defineComponent({
    components: {win, dockingEdge},
    render() {
        return <>
            <docking-edge/>
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
