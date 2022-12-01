//打开的窗口
import {defineComponent, watch, ref, Ref} from "vue";

import {getAppInfo, cursor, winSize, appsDom, systemBarDom, getDockingEdge} from "@/components/desktop/cache/data";
import icon from '@/components/desktop/publishCom/icon';
import mouseMove from "@/components/desktop/fn/mouseMove";

import boxStyle from "@/components/desktop/css/box.module.scss";
import desktopStyle from "@/components/desktop/css/index.module.scss";

export default defineComponent({
    components: {icon},
    props: {
        id: {type: String, default: ''}
    },
    setup(props, {expose}) {
        const appInfo = getAppInfo(props.id);
        const dockingEdge = getDockingEdge();
        console.log(appInfo)
        const x = ref(appInfo.x);
        const y = ref(appInfo.y);
        const w = ref(appInfo.w);
        const h = ref(appInfo.h);
        const z = ref(appInfo.z);
        const active = ref(appInfo.active);
        const el = ref(null);
        let minMax: any = {};

        const mouseDownFn = (e: MouseEvent) => {
            minMax = JSON.parse(JSON.stringify(winSize));
            minMax.maxX = window.innerWidth - w.value;
            minMax.maxY = window.innerHeight - systemBarDom.height - h.value;
            mouseMove.mousedown({e, x, y, cursor});
        }
        const topMouseDownFn = (e: MouseEvent) => {
            minMax = JSON.parse(JSON.stringify(winSize));
            minMax.maxY = y.value + h.value - minMax.minH;
            minMax.maxH = y.value + h.value;
            mouseMove.mousedown({e, x, y, cursor, w, h, type: 'top'});
        }
        const leftMouseDownFn = (e: MouseEvent) => {
            minMax = JSON.parse(JSON.stringify(winSize));
            minMax.maxX = x.value + w.value - minMax.minW;
            //右侧app列的宽度要减去
            minMax.maxW = x.value + w.value - appsDom.width;
            mouseMove.mousedown({e, x, y, cursor, w, h, type: 'left'});
        }
        const rightMouseDownFn = (e: MouseEvent) => {
            minMax = JSON.parse(JSON.stringify(winSize));
            minMax.maxW = window.innerWidth - x.value;
            mouseMove.mousedown({e, x, y, cursor, w, h, type: 'right'});
        }
        const bottomMouseDownFn = (e: MouseEvent) => {
            minMax = JSON.parse(JSON.stringify(winSize));
            minMax.maxH = window.innerHeight - y.value - systemBarDom.height;
            mouseMove.mousedown({e, x, y, cursor, w, h, type: 'bottom'});
        }
        const leftTopMouseDownFn = (e: MouseEvent) => {
            minMax = JSON.parse(JSON.stringify(winSize));
            minMax.maxX = x.value + w.value - minMax.minW;
            minMax.maxW = x.value + w.value - appsDom.width;
            minMax.maxY = y.value + h.value - minMax.minH;
            minMax.maxH = y.value + h.value;
            mouseMove.mousedown({e, x, y, cursor, w, h, type: 'leftTop'});
        }
        const rightTopMouseDownFn = (e: MouseEvent) => {
            minMax = JSON.parse(JSON.stringify(winSize));
            minMax.maxW = window.innerWidth - x.value;
            minMax.maxY = y.value + h.value - minMax.minH;
            minMax.maxH = y.value + h.value;
            mouseMove.mousedown({e, x, y, cursor, w, h, type: 'rightTop'});
        }
        const leftBottomMouseDownFn = (e: MouseEvent) => {
            minMax = JSON.parse(JSON.stringify(winSize));
            minMax.maxX = x.value + w.value - minMax.minW;
            minMax.maxW = x.value + w.value - appsDom.width;
            minMax.maxH = window.innerHeight - y.value - systemBarDom.height;
            mouseMove.mousedown({e, x, y, cursor, w, h, type: 'leftBottom'});
        }
        const rightBottomMouseDownFn = (e: MouseEvent) => {
            minMax = JSON.parse(JSON.stringify(winSize));
            minMax.maxW = window.innerWidth - x.value;
            minMax.maxH = window.innerHeight - y.value - systemBarDom.height;
            mouseMove.mousedown({e, x, y, cursor, w, h, type: 'rightBottom'});
        }

        const getMinMaxValue = (val: Ref<number>, min: number, max: number) => {
            val.value = (val.value >= min) ? val.value : min;
            val.value = (val.value <= max) ? val.value : max;
            return val;
        }

        const checkXY = (x: Ref<number>, y: Ref<number>, w: Ref<number>, h: Ref<number>) => {
            x = getMinMaxValue(x, minMax.minX, minMax.maxX);
            y = getMinMaxValue(y, minMax.minY, minMax.maxY);
            w = getMinMaxValue(w, minMax.minW, minMax.maxW);
            h = getMinMaxValue(h, minMax.minH, minMax.maxH);
            return {
                newX: x,
                newY: y,
                newW: w,
                newH: h
            }
        }

        //是否显示快速放到到半屏窗口辅助显示框
        const showDockingEdge = (x: Ref<number>, y: Ref<number>) => {
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

            if (xVal <= minX) {
                dockingEdge.showLeft();
                return;
            }

            if (xVal >= maxX) {
                dockingEdge.showRight();
                return;
            }

            if (yVal <= minY) {
                dockingEdge.showTop();
                return;
            }
            if (yVal >= maxY) {
                dockingEdge.showBottom();
                return;
            }
        }

        watch([x, y, w, h], () => {
            showDockingEdge(x, y);
            const {newX, newY, newW, newH} = checkXY(x, y, w, h);
            const dom = el.value! as HTMLElement;
            dom.style.left = newX.value + 'px';
            dom.style.top = newY.value + 'px';
            dom.style.width = newW.value + 'px';
            dom.style.height = newH.value + 'px';
        })

        expose({})
        return {
            appInfo,
            mouseDownFn,
            topMouseDownFn,
            leftMouseDownFn,
            rightMouseDownFn,
            bottomMouseDownFn,
            leftTopMouseDownFn,
            rightTopMouseDownFn,
            leftBottomMouseDownFn,
            rightBottomMouseDownFn,
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
                    <icon src='#icon-zuixiaohua3'></icon>
                    <icon src='#icon-zuidahua' style='display:none;'></icon>
                    <icon src='#icon-zuidahua1'></icon>
                    <icon src='#icon-guanbi'></icon>
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
        </div>
    }
})
