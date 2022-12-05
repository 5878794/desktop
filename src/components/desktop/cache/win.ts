//窗口操作相关缓存
import {ref, Ref, reactive} from "vue";
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
//最上层窗口对象
const topWinObj = reactive({
    name: '',
    icon: '',
    id: ''
});


const createOpenedWinData = (appInfo: any) => {
    const copyAppInfo = clone(appInfo);
    copyAppInfo.x = ref(appInfo.x);
    copyAppInfo.y = ref(appInfo.y);
    copyAppInfo.w = ref(appInfo.w);
    copyAppInfo.h = ref(appInfo.h);
    copyAppInfo.z = ref(appInfo.z);
    copyAppInfo.active = ref(appInfo.active);
    copyAppInfo.isShow = ref(appInfo.isShow);
    cacheData[appInfo.id] = copyAppInfo;
}

const openWin = (appInfo: any) => {
    const id = appInfo.id;

    if (openedWin.value.indexOf(id) === -1) {
        createOpenedWinData(appInfo);
        openedWin.value.push(id);
    } else {
        cacheData[appInfo.id].isShow.value = true;
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

    //设置应用顶部功能菜单
    topWinObj.name = cacheData[id].name;
    topWinObj.icon = cacheData[id].icon;
    topWinObj.id = id;
}

const closeWin = (id: string) => {
    const n = openedWin.value.indexOf(id);
    openedWin.value.splice(n, 1);
    delete cacheData[id];
}

//自动选中层级最高的窗口
const autoChoose = () => {
    let z = 0, chooseId = '';
    openedWin.value.map((id: string) => {
        const app = cacheData[id] || {};
        const appZ = app.z.value || 0;
        if (appZ > z) {
            z = appZ;
            chooseId = id;
        }
    })
    if (chooseId) {
        chooseWin(chooseId);
    }
}


export {
    openedWin,
    openWin,
    closeWin,
    cursor,
    mouseDownWinId,
    getOpenedWinInfo,
    chooseWin,
    autoChoose,
    topWinObj
}
