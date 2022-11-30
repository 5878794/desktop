import {ref} from "vue";

const systemApp = [
    //icon为 iconfont的class图标
    {id: 'more', name: '所有应用', icon: '#icon-more-grid-big', com: ''}
];

const cursor = ref('default');
const openedWin: any = ref([]);
const appList: any = ref([]);
const appListObj: any = {};

const catchAppListObj = (item: any) => {
    item.x = 65;//left
    item.y = 5;//top
    item.w = 600;//width
    item.h = 400;//height
    item.z = 10;//z-index
    item.active = false; //是否选中状态
    appListObj[item.id] = item;
}
systemApp.map((rs: any) => {
    catchAppListObj(rs);
    // appListObj[rs.id] = rs;
})

const openWin = (id: string) => {
    openedWin.value.push(id);
}

const registerApp = (apps: any) => {
    apps.map((item: any) => {
        appList.value.push(item.id);
        catchAppListObj(item);
        // appListObj[item.id] = item;
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
    openWin,
    cursor
}
