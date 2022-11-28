//左侧app元素

import {defineComponent, ref} from "vue";
import desktopStyle from "@/components/desktop/css/index.module.scss";
import boxStyle from "@/components/desktop/css/box.module.scss";


export default defineComponent({
    props: {
        name: {type: String, default: ''},
        icon: {type: String, default: ''},
        id: {type: String, default: ''}
    },
    setup(props, {expose}) {
        const clickFn = () => {
            //TODO
            console.log('app click')
        }

        const display = ref('none');
        const opacity = ref(0);

        const mouseEnterFn = () => {
            display.value = 'inline-block';
            setTimeout(() => {
                opacity.value = 1;
            }, 200)
        }
        const mouseleaveFn = () => {
            display.value = 'none';
            opacity.value = 0;
        }
        expose({});

        return {
            clickFn,
            mouseEnterFn,
            mouseleaveFn,
            display,
            opacity
        }
    },
    render() {
        return <>
            <div
                onClick={this.clickFn}
                onMouseenter={this.mouseEnterFn}
                onMouseleave={this.mouseleaveFn}
                class={[desktopStyle.app, boxStyle.box_hcc]}
            >
                <img src={this.icon}/>
                <div
                    style={`display:${this.display};opacity:${this.opacity}`}
                    class={desktopStyle.left_icon_text}
                >{this.name}</div>
            </div>
        </>
    }
})