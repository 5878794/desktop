import {defineComponent} from "vue";
import system from "@/components/desktop/system";
import apps from '@/components/desktop/apps';
import desktop from "@/components/desktop/desktop";

//css
import boxStyle from './css/box.module.scss';
import desktopStyle from './css/index.module.scss';

//data
import {appList} from './setting';
import {registerApp, cursor, systemBarDom} from './cache/index';

registerApp(appList);

export default defineComponent({
    components: {
        system, apps, desktop
    },
    render() {
        const canNotHover = (cursor.value !== 'default') ? desktopStyle.canNotHover : '';
        return <div
            class={[boxStyle.box_slt, desktopStyle.main, canNotHover]}
            style={`cursor:${cursor.value}`}
        >
            <div
                class={[boxStyle.box_hlc, desktopStyle.toolbar]}
                style={`height:${systemBarDom.height}px;`}
            >
                {/*顶部系统条*/}
                <system/>
            </div>
            <div class={[boxStyle.boxflex1, boxStyle.box_hlt, desktopStyle.content]}>
                {/*左侧app列表*/}
                <apps/>
                <div class={[boxStyle.boxflex1, desktopStyle.desktop]}>
                    {/*桌面区域*/}
                    <desktop/>
                </div>
            </div>
        </div>
    }
})
