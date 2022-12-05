//右上角按钮  最小化、最大化、恢复、关闭窗口
import {appsDom, closeWin, getOpenedWinInfo, systemBarDom} from "@/components/desktop/cache";
import {Ref, watch} from 'vue';

export default function (id: string, el: Ref) {
    const appInfo = getOpenedWinInfo(id);
    const x = appInfo.x;
    const y = appInfo.y;
    const w = appInfo.w;
    const h = appInfo.h;
    const isShow = appInfo.isShow;

    const setDomStyle = () => {
        const dom = el.value! as HTMLElement;
        dom.style.left = x.value + 'px';
        dom.style.top = y.value + 'px';
        dom.style.width = w.value + 'px';
        dom.style.height = h.value + 'px';
    }

    const minFn = () => {
        isShow.value = false;
    }
    let recoverCache: any = {};
    const maxFn = () => {
        recoverCache = {
            x: x.value,
            y: y.value,
            w: w.value,
            h: h.value
        };

        w.value = window.innerWidth - appsDom.width;
        h.value = window.innerHeight - systemBarDom.height;
        x.value = appsDom.width;
        y.value = 0;

        const dom = el.value! as HTMLElement;
        const maxBtn = dom.getElementsByClassName('__maxBtn__')[0];
        const recoverBtn = dom.getElementsByClassName('__recoverBtn__')[0];
        (maxBtn as HTMLElement).style.display = 'none';
        (recoverBtn as HTMLElement).style.display = 'flex';
        setDomStyle();
    }
    const closeFn = () => {
        closeWin(id);
    }
    const recoverFn = () => {
        w.value = recoverCache.w;
        h.value = recoverCache.h;
        x.value = recoverCache.x;
        y.value = recoverCache.y;
        const dom = el.value! as HTMLElement;
        const maxBtn = dom.getElementsByClassName('__maxBtn__')[0];
        const recoverBtn = dom.getElementsByClassName('__recoverBtn__')[0];
        (maxBtn as HTMLElement).style.display = 'flex';
        (recoverBtn as HTMLElement).style.display = 'none';
        setDomStyle();
    }

    watch(isShow, () => {
        const dom = el.value! as HTMLElement;
        if (isShow.value) {
            //TODO 动画
            dom.style.display = 'flex';
        } else {
            dom.style.display = 'none';
        }
    })

    return {
        minFn, maxFn, closeFn, recoverFn
    }
}



