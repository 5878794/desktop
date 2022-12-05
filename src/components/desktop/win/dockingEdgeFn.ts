//窗口靠边辅助显示div

import {cursor, getDockingEdge, getOpenedWinInfo} from "@/components/desktop/cache";
import {Ref, watch} from "vue";
import {getArrayRepeatMaxItem} from "@/components/desktop/fn/array";

export default function (id: string, minMax: any) {
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

    watch([x, y, w, h], (newVal, oldValue) => {
        if (cursor.value !== 'move') {
            return;
        }
        const dir = getMouseDir(newVal, oldValue);
        showDockingEdge(x, y, dir);
    })
}
