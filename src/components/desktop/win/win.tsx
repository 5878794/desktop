//打开的窗口
import {defineComponent, watch, ref, Ref, onMounted} from "vue";
import {
    cursor,
    mouseDownWinId,
    winSize,
    appsDom,
    systemBarDom,
    getDockingEdge,
    dockingEdgeState,
    getOpenedWinInfo
} from "@/components/desktop/cache/index";
import icon from '@/components/desktop/publishCom/icon';
import mouseMove from "@/components/desktop/fn/mouseMove";
import {getArrayRepeatItem} from "@/components/desktop/fn/array";
import rightBtnClick from './rightBtnClick';
import activeFn from './active';

import boxStyle from "@/components/desktop/css/box.module.scss";
import desktopStyle from "@/components/desktop/css/index.module.scss";

export default defineComponent({
    components: {icon},
    props: {
        id: {type: String, default: ''}
    },
    setup(props, {expose}) {
        const appInfo = getOpenedWinInfo(props.id);
        const dockingEdge = getDockingEdge();

        const x = appInfo.x;
        const y = appInfo.y;
        const w = appInfo.w;
        const h = appInfo.h;
        const z = appInfo.z;
        const active = appInfo.active;
        const el = ref(null);
        let minMax: any = {};


        const mouseDownFn = (e: MouseEvent) => {
            mouseDownWinId.value = props.id;
            minMax = JSON.parse(JSON.stringify(winSize));
            minMax.maxX = window.innerWidth - w.value;
            minMax.maxY = window.innerHeight - systemBarDom.height - h.value;
            mouseMove.mousedown({e, x, y, cursor});
        }
        const topMouseDownFn = (e: MouseEvent) => {
            mouseDownWinId.value = props.id;
            minMax = JSON.parse(JSON.stringify(winSize));
            minMax.maxY = y.value + h.value - minMax.minH;
            minMax.maxH = y.value + h.value;
            mouseMove.mousedown({e, x, y, cursor, w, h, type: 'top'});
        }
        const leftMouseDownFn = (e: MouseEvent) => {
            mouseDownWinId.value = props.id;
            minMax = JSON.parse(JSON.stringify(winSize));
            minMax.maxX = x.value + w.value - minMax.minW;
            //右侧app列的宽度要减去
            minMax.maxW = x.value + w.value - appsDom.width;
            mouseMove.mousedown({e, x, y, cursor, w, h, type: 'left'});
        }
        const rightMouseDownFn = (e: MouseEvent) => {
            mouseDownWinId.value = props.id;
            minMax = JSON.parse(JSON.stringify(winSize));
            minMax.maxW = window.innerWidth - x.value;
            mouseMove.mousedown({e, x, y, cursor, w, h, type: 'right'});
        }
        const bottomMouseDownFn = (e: MouseEvent) => {
            mouseDownWinId.value = props.id;
            minMax = JSON.parse(JSON.stringify(winSize));
            minMax.maxH = window.innerHeight - y.value - systemBarDom.height;
            mouseMove.mousedown({e, x, y, cursor, w, h, type: 'bottom'});
        }
        const leftTopMouseDownFn = (e: MouseEvent) => {
            mouseDownWinId.value = props.id;
            minMax = JSON.parse(JSON.stringify(winSize));
            minMax.maxX = x.value + w.value - minMax.minW;
            minMax.maxW = x.value + w.value - appsDom.width;
            minMax.maxY = y.value + h.value - minMax.minH;
            minMax.maxH = y.value + h.value;
            mouseMove.mousedown({e, x, y, cursor, w, h, type: 'leftTop'});
        }
        const rightTopMouseDownFn = (e: MouseEvent) => {
            mouseDownWinId.value = props.id;
            minMax = JSON.parse(JSON.stringify(winSize));
            minMax.maxW = window.innerWidth - x.value;
            minMax.maxY = y.value + h.value - minMax.minH;
            minMax.maxH = y.value + h.value;
            mouseMove.mousedown({e, x, y, cursor, w, h, type: 'rightTop'});
        }
        const leftBottomMouseDownFn = (e: MouseEvent) => {
            mouseDownWinId.value = props.id;
            minMax = JSON.parse(JSON.stringify(winSize));
            minMax.maxX = x.value + w.value - minMax.minW;
            minMax.maxW = x.value + w.value - appsDom.width;
            minMax.maxH = window.innerHeight - y.value - systemBarDom.height;
            mouseMove.mousedown({e, x, y, cursor, w, h, type: 'leftBottom'});
        }
        const rightBottomMouseDownFn = (e: MouseEvent) => {
            mouseDownWinId.value = props.id;
            minMax = JSON.parse(JSON.stringify(winSize));
            minMax.maxW = window.innerWidth - x.value;
            minMax.maxH = window.innerHeight - y.value - systemBarDom.height;
            mouseMove.mousedown({e, x, y, cursor, w, h, type: 'rightBottom'});
        }

        const getMinMaxValue = (val: number, min: number, max: number) => {
            val = (val >= min) ? val : min;
            val = (val <= max) ? val : max;
            return val;
        }

        const checkXY = (x: Ref<number>, y: Ref<number>, w: Ref<number>, h: Ref<number>) => {
            const newX = getMinMaxValue(x.value, minMax.minX, minMax.maxX);
            const newY = getMinMaxValue(y.value, minMax.minY, minMax.maxY);
            const newW = getMinMaxValue(w.value, minMax.minW, minMax.maxW);
            const newH = getMinMaxValue(h.value, minMax.minH, minMax.maxH);
            return {
                newX,
                newY,
                newW,
                newH
            }
        }

        //是否显示快速放到到半屏窗口辅助显示框
        const showDockingEdge = (x: Ref<number>, y: Ref<number>, dir: string) => {
            if (cursor.value !== 'move' || !dockingEdge) {
                return;
            }
            const xVal = x.value;
            const yVal = y.value;
            const {minX, maxX, minY, maxY} = minMax;

            if (xVal > minX && xVal < maxX && yVal > minY && yVal < maxY) {
                dockingEdge.hide();
                return;
            }

            if (xVal <= minX && dir === 'left') {
                dockingEdge.showLeft();
                return;
            }

            if (xVal >= maxX && dir === 'right') {
                dockingEdge.showRight();
                return;
            }

            if (yVal <= minY && dir === 'top') {
                dockingEdge.showTop();
                return;
            }
            if (yVal >= maxY && dir === 'bottom') {
                dockingEdge.showBottom();
                return;
            }

            dockingEdge.hide();
        }

        const changeWinSize = (type: string) => {
            dockingEdge.hide();
            const dom = el.value! as HTMLElement;

            let left: any, top: any, width: any, height: any;
            if (type === 'top') {
                left = appsDom.width;
                top = 0;
                width = window.innerWidth - appsDom.width;
                height = (window.innerHeight - systemBarDom.height) / 2;
            } else if (type === 'bottom') {
                left = appsDom.width;
                top = (window.innerHeight - systemBarDom.height) / 2;
                width = window.innerWidth - appsDom.width;
                height = (window.innerHeight - systemBarDom.height) / 2;
            } else if (type === 'left') {
                left = appsDom.width;
                top = 0;
                width = (window.innerWidth - appsDom.width) / 2;
                height = (window.innerHeight - systemBarDom.height);
            } else if (type === 'right') {
                left = (window.innerWidth - appsDom.width) / 2 + appsDom.width;
                top = 0;
                width = (window.innerWidth - appsDom.width) / 2;
                height = (window.innerHeight - systemBarDom.height)
            }

            dom.style.transition = 'all .2s ease-out';
            x.value = left;
            y.value = top;
            w.value = width;
            h.value = height;
            setTimeout(() => {
                dom.style.width = width + 'px';
                dom.style.height = height + 'px';
                dom.style.top = top + 'px';
                dom.style.left = left + 'px';
                setTimeout(() => {
                    dom.style.transition = 'unset';
                }, 200)
            }, 10)
        }

        const dirTemp: any = [];
        const getMouseDir = (newVal: any, oldVal: any) => {
            const newX = newVal[0];
            const newY = newVal[1];
            const oldX = oldVal[0];
            const oldY = oldVal[1];
            const mx = (newX - oldX);
            const my = (newY - oldY);

            if (Math.abs(mx) > Math.abs(my)) {
                if (newX > oldX) {
                    dirTemp.push('right');
                } else {
                    dirTemp.push('left');
                }
            } else {
                if (newY > oldY) {
                    dirTemp.push('bottom');
                } else {
                    dirTemp.push('top');
                }
            }

            if (dirTemp.length > 5) {
                dirTemp.shift()
            }

            //从5次触发中取最多的返回
            return getArrayRepeatItem(dirTemp);
        }


        const {minFn, maxFn, closeFn, recoverFn} = rightBtnClick(props.id, el);
        const {chooseFn} = activeFn(props.id, el);

        //拖动监听
        watch([x, y, w, h], (newVal, oldValue) => {
            if (cursor.value === 'default') {
                return;
            }
            const dir = getMouseDir(newVal, oldValue);
            showDockingEdge(x, y, dir);
            const {newX, newY, newW, newH} = checkXY(x, y, w, h);
            const dom = el.value! as HTMLElement;
            dom.style.left = newX + 'px';
            dom.style.top = newY + 'px';
            dom.style.width = newW + 'px';
            dom.style.height = newH + 'px';
        })
        watch(cursor, (newVal: string, oldVal: string) => {
            if (props.id === mouseDownWinId.value && newVal === 'default') {
                //是当前dom 释放时
                if (oldVal === 'move' && dockingEdgeState.value !== 'hide') {
                    //靠边放执行
                    changeWinSize(dockingEdgeState.value);
                } else {
                    //普通保存位置信息等
                    const {newX, newY, newW, newH} = checkXY(x, y, w, h);
                    x.value = newX;
                    y.value = newY;
                    w.value = newW;
                    h.value = newH;
                }

            }
        })


        expose({})
        return {
            appInfo,
            chooseFn,
            mouseDownFn,
            topMouseDownFn,
            leftMouseDownFn,
            rightMouseDownFn,
            bottomMouseDownFn,
            leftTopMouseDownFn,
            rightTopMouseDownFn,
            leftBottomMouseDownFn,
            rightBottomMouseDownFn,
            recoverFn,
            minFn,
            maxFn,
            closeFn,
            el, x, y, w, h, z, active
        }
    },
    render() {
        return <div ref='el' class={[desktopStyle.win, boxStyle.box_slt]}>
            <div onMousedown={this.mouseDownFn} class={[desktopStyle.win_top, boxStyle.box_hlc]}>
                <div class={[desktopStyle.win_top_left, boxStyle.box_hlc]}>
                    <icon src='#icon-shangyiyehoutuifanhui'></icon>
                    <icon src='#icon-xiayiyeqianjinchakangengduo'></icon>
                </div>
                <div class={[boxStyle.boxflex1]}>
                    {this.appInfo.name}
                </div>
                <div class={[desktopStyle.win_top_right, boxStyle.box_hlc]}>
                    <icon onClick={this.minFn} src='#icon-zuixiaohua3'></icon>
                    <icon class='__recoverBtn__' onClick={this.recoverFn} src='#icon-zuidahua'
                          style='display:none;'></icon>
                    <icon class='__maxBtn__' onClick={this.maxFn} src='#icon-zuidahua1'></icon>
                    <icon onClick={this.closeFn} src='#icon-guanbi'></icon>
                </div>
            </div>
            <div class={[boxStyle.boxflex1, desktopStyle.win_main]}>
                <div style='width:200%;height:20px;background:red;'>{new Date().getTime()}</div>
                {this.appInfo.name}asdfasdfjaskdhfkjashdfkjhasdfhasjkdhfsahdf阿斯顿交付海军阿克苏的和佛教阿山东分局喀什地方哈桑的发挥
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                123
            </div>
            <div onMousedown={this.topMouseDownFn} class={desktopStyle.top_scale}></div>
            <div onMousedown={this.leftMouseDownFn} class={desktopStyle.left_scale}></div>
            <div onMousedown={this.rightMouseDownFn} class={desktopStyle.right_scale}></div>
            <div onMousedown={this.bottomMouseDownFn} class={desktopStyle.bottom_scale}></div>
            <div onMousedown={this.leftTopMouseDownFn} class={desktopStyle.left_top_scale}></div>
            <div onMousedown={this.rightTopMouseDownFn} class={desktopStyle.right_top_scale}></div>
            <div onMousedown={this.leftBottomMouseDownFn} class={desktopStyle.left_bottom_scale}></div>
            <div onMousedown={this.rightBottomMouseDownFn} class={desktopStyle.right_bottom_scale}></div>
            <div class={[desktopStyle.zz]} onMousedown={this.chooseFn}></div>
        </div>
    }
})
