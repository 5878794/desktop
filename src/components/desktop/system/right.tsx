import {defineComponent} from "vue";
//css
import boxStyle from '../css/box.module.scss';
import desktopStyle from '../css/index.module.scss';

export default defineComponent({
    setup(props, {expose}) {
        const clickFn = () => {
            //TODO
            console.log('power click')
        }
        expose({});

        return {
            clickFn
        }
    },
    render() {
        return <>
            <div
                onClick={this.clickFn}
                class={[boxStyle.box_hrc, boxStyle.boxflex1, desktopStyle.right]}
            >
                <img src='./icon/power.png'/>
            </div>
        </>
    }
})