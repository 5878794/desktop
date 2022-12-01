//窗口操作相关缓存
import {ref, Ref} from "vue";
import {getDesktopShowZ} from './zindex';


//全局鼠标样式
const cursor = ref('default');
//打开的窗口  id[]
const openedWin: Ref<string[]> = ref([]);
//当前选中的窗口id
const mouseDownWinId = ref('');


const openWin = (id: string) => {
    // const newZ = getDesktopShowZ(openedWin);
    // console.log(newZ)

    if (openedWin.value.indexOf(id) === -1) {
        openedWin.value.push(id);

    }
    // getAllApps()[id].z = newZ;
}

//
const catchOpenedWinInfo = (obj: any) => {
//
}

export {
    openedWin,
    openWin,
    cursor,
    mouseDownWinId,
    // getOpenedWinInfo,
    catchOpenedWinInfo
}
