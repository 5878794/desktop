import {defineComponent, ref} from "vue";
import {getDate} from '../fn/stampAndTime';

//css
import boxStyle from '../css/box.module.scss';
import desktopStyle from '../css/index.module.scss';

export default defineComponent({
    setup(props, {expose}) {

        const nowTime = ref('');
        const showTime = () => {
            const time = new Date().getTime();
            nowTime.value = getDate(time, 'yyyy-MM-dd hh:mm')
        }
        showTime();

        setInterval(() => {
            showTime();
        }, 10000)

        expose({});

        return {
            nowTime
        }
    },
    render() {
        return <>
            <div class={[desktopStyle.time, boxStyle.box_hcc]}>{this.nowTime}</div>
        </>
    }
})