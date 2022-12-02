//窗口操作相关缓存
import {ref, Ref} from "vue";
import {getDesktopShowZ} from './zindex';
import {clone} from 'lodash';


//全局鼠标样式
const cursor = ref('default');
//打开的窗口  id[]
const openedWin: Ref<string[]> = ref([]);
//当前选中的窗口id
const mouseDownWinId = ref('');
//缓存打开的appInfo信息
const cacheData: any = {};


const createOpenedWinData = (appInfo: any) => {
    const copyAppInfo = clone(appInfo);
    copyAppInfo.x = ref(appInfo.x);
    copyAppInfo.y = ref(appInfo.y);
    copyAppInfo.w = ref(appInfo.w);
    copyAppInfo.h = ref(appInfo.h);
    copyAppInfo.z = ref(appInfo.z);
    copyAppInfo.active = ref(appInfo.active);
    cacheData[appInfo.id] = copyAppInfo;
}

const openWin = (appInfo: any) => {
    const id = appInfo.id;

    if (openedWin.value.indexOf(id) === -1) {
        createOpenedWinData(appInfo);
        openedWin.value.push(id);
    }

    chooseWin(appInfo.id)
}

const getOpenedWinInfo = (id: string) => {
    return cacheData[id];
}

const chooseWin = (id: string) => {
    const newZ = getDesktopShowZ(cacheData);
    cacheData[id].z.value = newZ;

    for (const appInfo of Object.values(cacheData)) {
        (appInfo as any).active.value = false;
    }
    cacheData[id].active.value = true;
}


export {
    openedWin,
    openWin,
    cursor,
    mouseDownWinId,
    getOpenedWinInfo,
    chooseWin
}
