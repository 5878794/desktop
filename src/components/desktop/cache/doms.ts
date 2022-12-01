//顶部条
import {reactive} from "vue";

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
    appsDom.height = window.innerHeight - systemBarDom.height;
    systemBarDom.width = window.innerWidth;
    winSize.maxX = window.innerWidth - appsDom.width;
    winSize.maxY = window.innerHeight - systemBarDom.height;
    winSize.maxW = window.innerWidth - appsDom.width;
    winSize.maxH = window.innerHeight - systemBarDom.height;
}, {capture: false, passive: false})


export {
    appsDom,
    systemBarDom,
    winSize,
}
