//打开的窗口
import {defineComponent, watch, ref} from "vue";

import {getAppInfo, cursor} from "@/components/desktop/cache/data";
import icon from '@/components/desktop/publishCom/icon';
import mouseMove from "@/components/desktop/fn/mouseMove";

import boxStyle from "@/components/desktop/css/box.module.scss";
import desktopStyle from "@/components/desktop/css/index.module.scss";

export default defineComponent({
    components: {icon},
    props: {
        id: {type: String, default: ''}
    },
    setup(props, {expose}) {
        const appInfo = getAppInfo(props.id);
        console.log(appInfo)
        const x = ref(appInfo.x);
        const y = ref(appInfo.y);
        const w = ref(appInfo.w);
        const h = ref(appInfo.h);
        const z = ref(appInfo.z);
        const active = ref(appInfo.active);
        const el = ref(null);

        const mouseDownFn = (e: MouseEvent) => {
            mouseMove.mousedown({
                e: e,
                x: x,
                y: y,
                cursor: cursor
            });
        }

        watch([x, y], () => {
            const dom = el.value! as HTMLElement;
            dom.style.left = x.value + 'px';
            dom.style.top = y.value + 'px';
        })

        expose({})
        return {appInfo, mouseDownFn, el, x, y, w, h, z, active}
    },
    render() {
        console.log('re')
        return <div ref='el' class={[desktopStyle.win, boxStyle.box_slt]}>
            <div onMousedown={this.mouseDownFn} class={[desktopStyle.win_top, boxStyle.box_hlc]}>
                <div class={[desktopStyle.win_top_left, boxStyle.box_hlc]}>
                    <icon src='#icon-shangyiyehoutuifanhui'></icon>
                    <icon src='#icon-xiayiyeqianjinchakangengduo'></icon>
                </div>
                <div class={[boxStyle.boxflex1]}>
                    {this.appInfo.name}
                </div>
                <div class={[desktopStyle.win_top_right, boxStyle.box_hlc]}>
                    <icon src='#icon-zuixiaohua3'></icon>
                    <icon src='#icon-zuidahua' style='display:none;'></icon>
                    <icon src='#icon-zuidahua1'></icon>
                    <icon src='#icon-guanbi'></icon>
                </div>
            </div>
            <div class={[boxStyle.boxflex1, desktopStyle.win_main]}>
                <div style='width:200%;height:20px;background:red;'>{new Date().getTime()}</div>
                {this.appInfo.name}asdfasdfjaskdhfkjashdfkjhasdfhasjkdhfsahdf阿斯顿交付海军阿克苏的和佛教阿山东分局喀什地方哈桑的发挥
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                123
            </div>
            <div class={desktopStyle.top_scale}></div>
            <div class={desktopStyle.left_scale}></div>
            <div class={desktopStyle.right_scale}></div>
            <div class={desktopStyle.bottom_scale}></div>
            <div class={desktopStyle.left_top_scale}></div>
            <div class={desktopStyle.right_top_scale}></div>
            <div class={desktopStyle.left_bottom_scale}></div>
            <div class={desktopStyle.right_bottom_scale}></div>
        </div>
    }
})
