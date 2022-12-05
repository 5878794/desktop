//窗口靠边辅助显示div

import {
    appsDom,
    cursor, dockingEdgeState,
    getDockingEdge,
    getOpenedWinInfo,
    mouseDownWinId,
    systemBarDom
} from "@/components/desktop/cache";
import {Ref, watch} from "vue";
import {getArrayRepeatMaxItem} from "@/components/desktop/fn/array";

export default function (id: string, minMax: any, el: Ref) {
    const dockingEdge = getDockingEdge();
    const appInfo = getOpenedWinInfo(id);
    const x = appInfo.x;
    const y = appInfo.y;
    const w = appInfo.w;
    const h = appInfo.h;

    //是否显示快速放到到半屏窗口辅助显示框
    const showDockingEdge = (x: Ref<number>, y: Ref<number>, dir: string) => {
        if (!dockingEdge) {
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
        return getArrayRepeatMaxItem(dirTemp);
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

    watch([x, y, w, h], (newVal, oldValue) => {
        if (cursor.value !== 'move') {
            return;
        }
        const dir = getMouseDir(newVal, oldValue);
        showDockingEdge(x, y, dir);
    })
    watch(cursor, (newVal: string, oldVal: string) => {
        if (id === mouseDownWinId.value && newVal === 'default') {
            //是当前dom 释放时
            if (oldVal === 'move' && dockingEdgeState.value !== 'hide') {
                //靠边放执行
                changeWinSize(dockingEdgeState.value);
            }
        }
    })
}
