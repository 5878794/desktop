import {defineComponent} from "vue";
//css
import boxStyle from '../css/box.module.scss';
import desktopStyle from '../css/index.module.scss';

export default defineComponent({
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
        return <>
            <div
                onClick={this.clickFn}
                class={[boxStyle.box_hlc, desktopStyle.top_name]}
            >
                <img src={this.icon}/>
                <span>{this.name}</span>
            </div>
        </>
    }
})