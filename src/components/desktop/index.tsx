import {defineComponent} from "vue";

//css
import boxStyle from './box.module.scss';
import desktopStyle from './index.module.scss';


export default defineComponent({
    setup() {
        console.log(123);
        console.log(22)
    },
    render() {
        return <div class={[boxStyle.box_slt, desktopStyle.main]}>
            <div class={[boxStyle.box_hlc, desktopStyle.toolbar]}></div>
            <div class={[boxStyle.boxflex1, boxStyle.box_hlt]} style='width:100%;'>
                <div class={[boxStyle.box_stc, desktopStyle.apps]}></div>
                <div class={[boxStyle.boxflex1, desktopStyle.desktop]}></div>
            </div>
        </div>
    }
})