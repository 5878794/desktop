import {defineComponent} from "vue";
//css
import boxStyle from '../css/box.module.scss';
import desktopStyle from '../css/index.module.scss';

export default defineComponent({
    setup(props, {expose}) {
        const clickFn = () => {
            //TODO
            console.log('窗口 click')
        }

        expose({});

        return {
            clickFn
        }
    },
    render() {
        return <>
            <div
                class={[boxStyle.box_hcc, desktopStyle.top_left]}
                onClick={this.clickFn}
            >
                <span>窗口</span>
            </div>
        </>
    }
})