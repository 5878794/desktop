//左侧app元素

import {defineComponent, ref} from "vue";
import desktopStyle from "@/components/desktop/css/index.module.scss";
import boxStyle from "@/components/desktop/css/box.module.scss";
import icon from '@/components/desktop/publishCom/icon';
import {cursor} from "@/components/desktop/cache/data";

//cache
import {getAppInfo, openWin} from "@/components/desktop/cache/data";


export default defineComponent({
    components: {icon},
    props: {
        id: {type: String, default: ''},
    },
    setup(props, {expose}) {
        const appInfo = getAppInfo(props.id);

        const clickFn = () => {
            openWin(props.id);
        }

        const display = ref('none');
        const opacity = ref(0);

        const mouseEnterFn = () => {
            if (cursor.value !== 'default') {
                return;
            }
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
            appInfo,
            clickFn,
            mouseEnterFn,
            mouseleaveFn,
            display,
            opacity
        }
    },
    render() {
        const createApp = () => {
            return <div
                onClick={this.clickFn}
                onMouseenter={this.mouseEnterFn}
                onMouseleave={this.mouseleaveFn}
                class={[desktopStyle.app, boxStyle.box_hcc]}
            >
                <icon src={this.appInfo.icon}/>
                <div
                    style={`display:${this.display};opacity:${this.opacity}`}
                    class={desktopStyle.left_icon_text}
                >{this.appInfo.name}</div>
            </div>
        }


        if (this.appInfo) {
            return createApp()
        } else {
            return null;
        }
    }
})
