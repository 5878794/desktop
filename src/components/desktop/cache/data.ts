import {ref} from "vue";

const openedWin: any = ref([]);
const appList: any = ref([]);
const appListObj: any = {};


const openWin = (id: string) => {
    openedWin.value.push(id);
}

const registerApp = (apps: any) => {
    apps.map((item: any) => {
        appList.value.push(item);
        appListObj[item.id] = item;
    })
}

const getAppInfo = (id: string) => {
    return (appListObj[id]) ? appListObj[id] : null;
}

export {
    registerApp,
    openedWin,
    getAppInfo,
    appList,
    openWin
}