import {defineComponent, ref} from "vue";
//css
import boxStyle from '../css/box.module.scss';
import desktopStyle from '../css/index.module.scss';
import icon from "@/components/desktop/publishCom/icon";

export default defineComponent({
    components: {icon},
    setup(props, {expose}) {
        const isFullScreen = ref(false);
        const clickFn = () => {
            //TODO
            console.log('power click')
        }
        const fullScreenFn = async () => {
            isFullScreen.value = true;
            await document.body.requestFullscreen();
        }
        const cancelFullScreenFn = async () => {
            isFullScreen.value = false;
            await document.exitFullscreen()
        }


        expose({});
        return {
            clickFn,
            fullScreenFn,
            cancelFullScreenFn,
            isFullScreen
        }
    },
    render() {

        const cancelBtnStyle = `display:${this.isFullScreen ? 'block' : 'none'}`
        const fullBtnStyle = `display:${this.isFullScreen ? 'none' : 'block'}`
        return <>
            <div
                class={[boxStyle.box_hrc, boxStyle.boxflex1, desktopStyle.right]}
            >
                <icon style={cancelBtnStyle} onClick={this.cancelFullScreenFn}
                      src='#icon-quxiaoquanping'></icon>
                <icon style={fullBtnStyle} onClick={this.fullScreenFn} src='#icon-quanping'></icon>
                <icon onClick={this.clickFn} src='#icon-dianyuan'/>
            </div>
        </>
    }
})
