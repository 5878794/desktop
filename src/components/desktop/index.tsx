import {defineComponent} from "vue";
import system from "@/components/desktop/system";
import apps from '@/components/desktop/apps';
import desktop from "@/components/desktop/desktop";

//css
import boxStyle from './box.module.scss';
import desktopStyle from './index.module.scss';


export default defineComponent({
    components: {
        system, apps, desktop
    },
    setup(props) {
        console.log(props)
    },
    render() {
        return <div class={[boxStyle.box_slt, desktopStyle.main]}>
            <div class={[boxStyle.box_hlc, desktopStyle.toolbar]}>
                {/*顶部系统条*/}
                <system/>
            </div>
            <div class={[boxStyle.boxflex1, boxStyle.box_hlt]} style='width:100%;'>
                <div class={[boxStyle.box_stc, desktopStyle.apps]}>
                    {/*左侧app列表*/}
                    <apps/>
                </div>
                <div class={[boxStyle.boxflex1, desktopStyle.desktop]}>
                    {/*桌面区域*/}
                    <desktop/>
                </div>
            </div>
        </div>
    }
})