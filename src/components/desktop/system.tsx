//顶部系统条
import {defineComponent} from "vue";

//css
import boxStyle from './box.module.scss';
import desktopStyle from './index.module.scss';

export default defineComponent({
    setup(props) {
        console.log(props)
    },
    render() {
        return <>
            <div class={[boxStyle.box_hlc, boxStyle.boxflex1]}>
                <div class={[boxStyle.box_hcc]}>活动</div>
                <div class={[boxStyle.box_hlc]}>app名称</div>
            </div>
            <div class={[desktopStyle.time, boxStyle.box_hcc]}>time</div>
            <div class={[boxStyle.box_hrc, boxStyle.boxflex1]}>注销</div>
        </>
    }
})