//打开的窗口
import {defineComponent, ref} from "vue";
import {getOpenedWinInfo} from "@/components/desktop/cache/index";
import icon from '@/components/desktop/publishCom/icon';

import mouseEventFn from "./mouseEventFn";
import rightBtnClick from './rightBtnClick';
import activeFn from './active';
import dockingEdgeFn from "./dockingEdgeFn";

import boxStyle from "@/components/desktop/css/box.module.scss";
import desktopStyle from "@/components/desktop/css/index.module.scss";

export default defineComponent({
    components: {icon},
    props: {
        id: {type: String, default: ''}
    },
    setup(props, {expose}) {
        const appInfo = getOpenedWinInfo(props.id);
        console.log(appInfo)
        const el = ref(null);
        const minMax: any = {};


        const {minFn, maxFn, closeFn, recoverFn} = rightBtnClick(props.id, el);
        const {chooseFn} = activeFn(props.id, el);
        dockingEdgeFn(props.id, minMax, el);
        const {
            mouseDownFn,
            topMouseDownFn,
            leftMouseDownFn,
            rightMouseDownFn,
            bottomMouseDownFn,
            leftTopMouseDownFn,
            rightTopMouseDownFn,
            leftBottomMouseDownFn,
            rightBottomMouseDownFn
        } = mouseEventFn(props.id, minMax, el);


        expose({})
        return {
            appInfo,
            chooseFn,
            mouseDownFn,
            topMouseDownFn,
            leftMouseDownFn,
            rightMouseDownFn,
            bottomMouseDownFn,
            leftTopMouseDownFn,
            rightTopMouseDownFn,
            leftBottomMouseDownFn,
            rightBottomMouseDownFn,
            recoverFn,
            minFn,
            maxFn,
            closeFn,
            el
        }
    },
    render() {
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
                    <icon onClick={this.minFn} src='#icon-zuixiaohua3'></icon>
                    <icon class='__recoverBtn__' onClick={this.recoverFn} src='#icon-zuidahua'
                          style='display:none;'></icon>
                    <icon class='__maxBtn__' onClick={this.maxFn} src='#icon-zuidahua1'></icon>
                    <icon onClick={this.closeFn} src='#icon-guanbi'></icon>
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
            <div onMousedown={this.topMouseDownFn} class={desktopStyle.top_scale}></div>
            <div onMousedown={this.leftMouseDownFn} class={desktopStyle.left_scale}></div>
            <div onMousedown={this.rightMouseDownFn} class={desktopStyle.right_scale}></div>
            <div onMousedown={this.bottomMouseDownFn} class={desktopStyle.bottom_scale}></div>
            <div onMousedown={this.leftTopMouseDownFn} class={desktopStyle.left_top_scale}></div>
            <div onMousedown={this.rightTopMouseDownFn} class={desktopStyle.right_top_scale}></div>
            <div onMousedown={this.leftBottomMouseDownFn} class={desktopStyle.left_bottom_scale}></div>
            <div onMousedown={this.rightBottomMouseDownFn} class={desktopStyle.right_bottom_scale}></div>
            <div class={[desktopStyle.zz]} onMousedown={this.chooseFn}></div>
        </div>
    }
})
