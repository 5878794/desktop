//顶部系统条
import {defineComponent} from "vue";
import left from "@/components/desktop/system/left";
import appName from "@/components/desktop/system/appName";
import systemTime from '@/components/desktop/system/time';
import right from '@/components/desktop/system/right';
//css
import boxStyle from './css/box.module.scss';
import desktopStyle from './css/index.module.scss';
import system from "@/components/desktop/system";

export default defineComponent({
    components: {left, appName, systemTime, right},
    setup(props) {
        console.log(props)
    },
    render() {
        return <>
            <div class={[boxStyle.box_hlc, boxStyle.boxflex1]}>
                <left/>
                <app-name/>
            </div>
            <systemTime/>
            <right/>
        </>
    }
})