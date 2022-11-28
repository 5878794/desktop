import {defineComponent} from "vue";
//css
import boxStyle from '../css/box.module.scss';
import desktopStyle from '../css/index.module.scss';

export default defineComponent({
    render() {
        return <>
            <div class={[boxStyle.box_hlc, desktopStyle.top_name]}>app名称</div>
        </>
    }
})