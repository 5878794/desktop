import {reactive, ref} from "vue";
import dockingEdge from "@/components/desktop/win/dockingEdge";

//系统内置app列表
const systemApp = [
    //icon为 iconfont的class图标
    {id: 'more', name: '所有应用', icon: '#icon-more-grid-big', com: ''}
];

//全局鼠标样式
const cursor = ref('default');
//打开的窗口  id[]
const openedWin: any = ref([]);
//外部添加的app 在左侧app列显示
const appList: any = ref([]);
//所有app的对象列表   {id:{}}
const appListObj: any = {};

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

const openWin = (id: string) => {
    openedWin.value.push(id);
}

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

//窗口大小
const winDom = reactive({
    width: window.innerWidth,
    height: window.innerHeight
});
//顶部条
const systemBarDom = reactive({
    width: window.innerWidth,
    height: 20
})
//左侧app条
const appsDom = reactive({
    width: 60,
    height: window.innerHeight - systemBarDom.height
});
const winMinW = 200;
const winMinH = 100;
//所有max的值都是在点击的时候计算
const winSize = reactive({
    minX: appsDom.width,
    maxX: window.innerWidth, //未减自身宽度
    minY: 0,
    maxY: window.innerHeight - systemBarDom.height, //未减自身高度
    minW: winMinW,
    maxW: window.innerWidth - appsDom.width,
    minH: winMinH,
    maxH: window.innerHeight - systemBarDom.height
});

window.addEventListener('resize', () => {
    winDom.width = window.innerWidth;
    winDom.height = window.innerHeight;
    appsDom.height = window.innerHeight - systemBarDom.height;
    systemBarDom.width = window.innerWidth;
    winSize.maxX = window.innerWidth - appsDom.width;
    winSize.maxY = window.innerHeight - systemBarDom.height;
    winSize.maxW = window.innerWidth - appsDom.width;
    winSize.maxH = window.innerHeight - systemBarDom.height;
}, {capture: false, passive: false})

let dockingEdgeRef: any;
const setDockingEdge = (el: any) => {
    dockingEdgeRef = el;
}
const getDockingEdge = () => {
    let obj = (dockingEdgeRef && dockingEdgeRef.value) ? dockingEdgeRef.value : {};
    obj = (obj.__vueParentComponent) ? obj.__vueParentComponent : {};
    obj = obj.exposed || null;
    return obj;
}

export {
    registerApp,
    openedWin,
    getAppInfo,
    appList,
    openWin,
    cursor,
    winDom,
    appsDom,
    systemBarDom,
    winSize,
    setDockingEdge,
    getDockingEdge
}
