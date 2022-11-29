//打开的窗口
import {defineComponent} from "vue";

import {getAppInfo} from "@/components/desktop/cache/data";
import icon from '@/components/desktop/publishCom/icon';

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

        const mouseDownFn = (e: MouseEvent) => {
            console.log(e)
        }

        expose({})
        return {appInfo, mouseDownFn}
    },
    render() {
        return <div class={[desktopStyle.win, boxStyle.box_slt]}>
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
                <div style='width:200%;height:20px;background:red;'>test</div>
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