import {ref} from "vue";

const systemApp = [
    {id: 'more', name: '所有应用', icon: '', com: ''}
];

const openedWin: any = ref([]);
const appList: any = ref([]);
const appListObj: any = {};

systemApp.map((rs: any) => {
    appListObj[rs.id] = rs;
})

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