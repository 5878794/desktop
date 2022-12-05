//打开的窗口
import {createApp, defineComponent, nextTick, onMounted, ref} from "vue";
import {getOpenedWinInfo} from "@/components/desktop/cache/index";
import icon from '@/components/desktop/publishCom/icon';

import mouseEventFn from "./mouseEventFn";
import rightBtnClick from './rightBtnClick';
import activeFn from './active';
import dockingEdgeFn from "./dockingEdgeFn";

import guid from "@/components/desktop/fn/guid";

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
        const winContainerId = 'cId_' + guid();


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


        onMounted(() => {
            if (appInfo.com) {
                const tag = appInfo.com;
                const props = appInfo.props;
                const app = createApp(tag, props);
                app.provide('destroy', () => {
                    console.log('close to do');
                })
                app.mount('#' + winContainerId);
            }
        })


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
            el,
            winContainerId
        }
    },
    render() {
        const readerApp = () => {
            if (this.appInfo.url) {
                return <iframe class={[desktopStyle.iframe]} src={this.appInfo.url}></iframe>
            } else {
                // return <tag {...props} />
                return null;
            }
        }


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
            <div id={this.winContainerId} class={[boxStyle.boxflex1, desktopStyle.win_main]}>
                {readerApp()}
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
