//窗口选中状态
import {chooseWin, getOpenedWinInfo} from "@/components/desktop/cache";
import desktopStyle from "@/components/desktop/css/index.module.scss";
import {onMounted, watch, Ref} from "vue";

export default function (id: string, el: Ref) {
    const appInfo = getOpenedWinInfo(id);
    const z = appInfo.z;
    const active = appInfo.active;


    const chooseFn = () => {
        chooseWin(id)
    }

    const setZIndex = () => {
        const dom = el.value! as HTMLElement;
        dom.style.zIndex = z.value;
    }
    const setIsActive = () => {
        const dom = el.value! as HTMLElement;
        if (active.value) {
            dom.classList.add(desktopStyle.active);
        } else {
            dom.classList.remove(desktopStyle.active);
        }
    }

    watch(z, () => {
        setZIndex();
    })
    watch(active, () => {
        setIsActive();
    })

    onMounted(() => {
        setZIndex();
        setIsActive();
    })

    return {
        chooseFn
    }
}
