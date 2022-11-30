import {Ref} from "vue";
import {winSize} from "@/components/desktop/cache/data";

export default function (
    x: Ref<number>,
    y: Ref<number>,
    w: Ref<number>,
    h: Ref<number>,
    cursor: string
) {
    //移动
    if (cursor === 'move') {
        x.value = (x.value >= winSize.minX) ? x.value : winSize.minX;
        x.value = (x.value <= winSize.maxX - w.value) ? x.value : winSize.maxX - w.value;
        y.value = (y.value >= winSize.minY) ? y.value : winSize.minY;
        y.value = (y.value <= winSize.maxY - h.value) ? y.value : winSize.maxY - h.value;
    }
    //向左
    if (cursor === 'w-resize') {
        x.value = (x.value >= winSize.minX) ? x.value : winSize.minX;
        x.value = (x.value <= winSize.maxX - w.value) ? x.value : winSize.maxX - w.value;
        w.value = (w.value >= winSize.minW) ? w.value : winSize.minW;
        w.value = (w.value <= winSize.maxW) ? w.value : winSize.maxW;
    }
    //向右
    if (cursor === 'e-resize') {
        console.log('right')
    }
    //向下
    if (cursor === 's-resize') {
        console.log('bottom')
    }
    //向上
    if (cursor === 'n-resize') {
        console.log('top')
    }
    //向左上
    if (cursor === 'nw-resize') {
        console.log('leftTop')
    }
    //向右上
    if (cursor === 'ne-resize') {
        console.log('rightTop')
    }
    //向左下
    if (cursor === 'sw-resize') {
        console.log('leftBottom')
    }
    //向右下
    if (cursor === 'se-resize') {
        console.log('rightBottom')
    }

    return {
        newX: x,
        newY: y,
        newW: w,
        newH: h
    }
}
