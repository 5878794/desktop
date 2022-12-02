//app相关缓存

import {ref} from "vue";


//外部添加的app 在左侧app列显示
const appList: any = ref([]);
//所有app的对象列表   {id:{}} ：初始的
const appListObj: any = {};
//系统内置app列表
const systemApp = [
    //icon为 iconfont的class图标
    {id: 'more', name: '所有应用', icon: '#icon-more-grid-big', com: ''}
];

//创建app缓存
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
})


const registerApp = (apps: any) => {
    apps.map((item: any) => {
        appList.value.push(item.id);
        catchAppListObj(item);
    })
}

//通过id 返回app信息
const getAppInfo = (id: string) => {
    return (appListObj[id]) ? appListObj[id] : null;
}


export {
    registerApp,
    getAppInfo,
    appList,
}
