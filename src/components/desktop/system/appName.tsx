import {defineComponent} from "vue";
//css
import boxStyle from '../css/box.module.scss';
import desktopStyle from '../css/index.module.scss';
import icon from "@/components/desktop/publishCom/icon";

import {topWinObj} from '../cache/index';

export default defineComponent({
    components: {icon},
    props: {
        icon: {type: String, default: ''},
        name: {type: String, default: ''}
    },
    setup(props, {expose}) {
        const clickFn = () => {
            //TODO
            console.log('app Name click')
        }

        return {
            clickFn
        }
    },
    render() {
        if (topWinObj.name && topWinObj.icon) {
            return <>
                <div
                    onClick={this.clickFn}
                    class={[boxStyle.box_hlc, desktopStyle.top_name]}
                >
                    <icon src={topWinObj.icon}/>
                    <span>{topWinObj.name}</span>
                </div>
            </>
        } else {
            return null;
        }
    }
})
