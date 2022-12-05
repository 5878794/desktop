import {
    appsDom,
    cursor,
    dockingEdgeState,
    getOpenedWinInfo,
    mouseDownWinId,
    systemBarDom,
    winSize
} from "@/components/desktop/cache";
import mouseMove from "@/components/desktop/fn/mouseMove";
import {Ref, watch} from "vue";


export default function (id: string, minMax: any, el: Ref) {
    const appInfo = getOpenedWinInfo(id);

    const x = appInfo.x;
    const y = appInfo.y;
    const w = appInfo.w;
    const h = appInfo.h;

    const mouseDownFn = (e: MouseEvent) => {
        mouseDownWinId.value = id;
        minMax = Object.assign(minMax, winSize);
        minMax.maxX = window.innerWidth - w.value;
        minMax.maxY = window.innerHeight - systemBarDom.height - h.value;
        mouseMove.mousedown({e, x, y, cursor});
    }
    const topMouseDownFn = (e: MouseEvent) => {
        mouseDownWinId.value = id;
        minMax = Object.assign(minMax, winSize);
        minMax.maxY = y.value + h.value - minMax.minH;
        minMax.maxH = y.value + h.value;
        mouseMove.mousedown({e, x, y, cursor, w, h, type: 'top'});
    }
    const leftMouseDownFn = (e: MouseEvent) => {
        mouseDownWinId.value = id;
        minMax = Object.assign(minMax, winSize);
        minMax.maxX = x.value + w.value - minMax.minW;
        //右侧app列的宽度要减去
        minMax.maxW = x.value + w.value - appsDom.width;
        mouseMove.mousedown({e, x, y, cursor, w, h, type: 'left'});
    }
    const rightMouseDownFn = (e: MouseEvent) => {
        mouseDownWinId.value = id;
        minMax = Object.assign(minMax, winSize);
        minMax.maxW = window.innerWidth - x.value;
        mouseMove.mousedown({e, x, y, cursor, w, h, type: 'right'});
    }
    const bottomMouseDownFn = (e: MouseEvent) => {
        mouseDownWinId.value = id;
        minMax = Object.assign(minMax, winSize);
        minMax.maxH = window.innerHeight - y.value - systemBarDom.height;
        mouseMove.mousedown({e, x, y, cursor, w, h, type: 'bottom'});
    }
    const leftTopMouseDownFn = (e: MouseEvent) => {
        mouseDownWinId.value = id;
        minMax = Object.assign(minMax, winSize);
        minMax.maxX = x.value + w.value - minMax.minW;
        minMax.maxW = x.value + w.value - appsDom.width;
        minMax.maxY = y.value + h.value - minMax.minH;
        minMax.maxH = y.value + h.value;
        mouseMove.mousedown({e, x, y, cursor, w, h, type: 'leftTop'});
    }
    const rightTopMouseDownFn = (e: MouseEvent) => {
        mouseDownWinId.value = id;
        minMax = Object.assign(minMax, winSize);
        minMax.maxW = window.innerWidth - x.value;
        minMax.maxY = y.value + h.value - minMax.minH;
        minMax.maxH = y.value + h.value;
        mouseMove.mousedown({e, x, y, cursor, w, h, type: 'rightTop'});
    }
    const leftBottomMouseDownFn = (e: MouseEvent) => {
        mouseDownWinId.value = id;
        minMax = Object.assign(minMax, winSize);
        minMax.maxX = x.value + w.value - minMax.minW;
        minMax.maxW = x.value + w.value - appsDom.width;
        minMax.maxH = window.innerHeight - y.value - systemBarDom.height;
        mouseMove.mousedown({e, x, y, cursor, w, h, type: 'leftBottom'});
    }
    const rightBottomMouseDownFn = (e: MouseEvent) => {
        mouseDownWinId.value = id;
        minMax = Object.assign(minMax, winSize);
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

    //拖动监听
    watch([x, y, w, h], (newVal, oldValue) => {
        if (cursor.value === 'default') {
            return;
        }
        const {newX, newY, newW, newH} = checkXY(x, y, w, h);
        const dom = el.value! as HTMLElement;
        dom.style.left = newX + 'px';
        dom.style.top = newY + 'px';
        dom.style.width = newW + 'px';
        dom.style.height = newH + 'px';
    })
    watch(cursor, (newVal: string, oldVal: string) => {
        if (id === mouseDownWinId.value && newVal === 'default') {
            //是当前dom 释放时
            if (oldVal === 'move' && dockingEdgeState.value !== 'hide') {
                //
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

    return {
        mouseDownFn,
        topMouseDownFn,
        leftMouseDownFn,
        rightMouseDownFn,
        bottomMouseDownFn,
        leftTopMouseDownFn,
        rightTopMouseDownFn,
        leftBottomMouseDownFn,
        rightBottomMouseDownFn
    }
}
