//左侧app列表
import {defineComponent} from "vue";
import app from './apps/app'
import boxStyle from "@/components/desktop/css/box.module.scss";
import desktopStyle from "@/components/desktop/css/index.module.scss";

import {appList, getAppInfo, appsDom, openedWin} from "@/components/desktop/cache/index";

export default defineComponent({
    components: {app},
    setup(props) {
        console.log(props)
    },
    render() {
        return <>
            <div
                class={[boxStyle.box_sct, desktopStyle.apps]}
                style={`width:${appsDom.width}px;`}
            >
                <div class={[boxStyle.boxflex1]}>
                    {
                        appList.value.map((id: string) => {
                            const item = getAppInfo(id);
                            return <app
                                key={item.id}
                                id={item.id} hasOpen={(openedWin.value.indexOf(id) > -1)}
                            />
                        })
                    }
                </div>
                <app id='more'/>
            </div>
        </>
    }
})
