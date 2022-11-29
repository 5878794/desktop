//左侧app列表
import {defineComponent} from "vue";
import app from './apps/app'
import boxStyle from "@/components/desktop/css/box.module.scss";
import desktopStyle from "@/components/desktop/css/index.module.scss";

import {appList} from "@/components/desktop/cache/data";

export default defineComponent({
    components: {app},
    setup(props) {
        console.log(props)
    },
    render() {
        return <>
            <div class={[boxStyle.box_sct, desktopStyle.apps]}>
                <div class={[boxStyle.boxflex1]}>
                    {
                        appList.value.map((item: any) => {
                            return <app
                                id={item.id}
                            />
                        })
                    }
                </div>
                <app id='more'/>
            </div>
        </>
    }
})