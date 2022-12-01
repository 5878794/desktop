import {defineComponent, onMounted, ref} from "vue";
import desktopStyle from '../css/index.module.scss';
import {setDockingEdge, appsDom, dockingEdgeState} from "@/components/desktop/cache/index";

export default defineComponent({
    setup(props, {expose}) {
        const dockingEdgeRef = ref(null);
        setDockingEdge(dockingEdgeRef);

        let dom: any = null;
        onMounted(() => {
            dom = dockingEdgeRef.value! as HTMLElement;
        })
        let timeoutFn: any = null;

        const showLeft = () => {
            if (dockingEdgeState.value === 'left') {
                return;
            }
            if (timeoutFn) {
                clearTimeout(timeoutFn);
            }
            dockingEdgeState.value = 'left';
            reset();
            dom.style.display = 'block';
            dom.style.left = appsDom.width + 'px';
            dom.style.top = '50%';
            dom.style.marginTop = '-150px'
            dom.style.background = 'rgba(255,255,255,.3)'
            timeoutFn = setTimeout(() => {
                dom.style.width = (window.innerWidth - appsDom.width) / 2 + 'px'
                dom.style.height = '100%';
                dom.style.top = 0;
                dom.style.marginTop = 0;
                dom.style.background = 'rgba(255,255,255,.5)'
            }, 10)
        }
        const showRight = () => {
            if (dockingEdgeState.value === 'right') {
                return;
            }
            if (timeoutFn) {
                clearTimeout(timeoutFn);
            }
            dockingEdgeState.value = 'right';
            reset();
            dom.style.display = 'block';
            dom.style.right = 0;
            dom.style.top = '50%';
            dom.style.marginTop = '-150px'
            dom.style.background = 'rgba(255,255,255,.3)'
            timeoutFn = setTimeout(() => {
                dom.style.width = (window.innerWidth - appsDom.width) / 2 + 'px'
                dom.style.height = '100%';
                dom.style.top = 0;
                dom.style.marginTop = 0;
                dom.style.background = 'rgba(255,255,255,.5)'
            }, 10)
        }
        const showTop = () => {
            if (dockingEdgeState.value === 'top') {
                return;
            }
            if (timeoutFn) {
                clearTimeout(timeoutFn);
            }
            dockingEdgeState.value = 'top';
            reset();
            dom.style.display = 'block';
            dom.style.top = 0;
            dom.style.left = (window.innerWidth - appsDom.width - 300) / 2 + 'px';
            dom.style.background = 'rgba(255,255,255,.3)'
            timeoutFn = setTimeout(() => {
                dom.style.width = (window.innerWidth - appsDom.width) + 'px';
                dom.style.height = '50%';
                dom.style.top = 0;
                dom.style.left = appsDom.width + 'px';
                dom.style.background = 'rgba(255,255,255,.5)'
            }, 10)
        }
        const showBottom = () => {
            if (dockingEdgeState.value === 'bottom') {
                return;
            }
            if (timeoutFn) {
                clearTimeout(timeoutFn);
            }
            dockingEdgeState.value = 'bottom';
            reset();
            dom.style.display = 'block';
            dom.style.bottom = 0;
            dom.style.left = (window.innerWidth - appsDom.width - 300) / 2 + 'px';
            dom.style.background = 'rgba(255,255,255,.3)'
            timeoutFn = setTimeout(() => {
                dom.style.width = (window.innerWidth - appsDom.width) + 'px';
                dom.style.height = '50%';
                dom.style.bottom = 0;
                dom.style.left = appsDom.width + 'px';
                dom.style.background = 'rgba(255,255,255,.5)'
            }, 10)
        }
        const reset = () => {
            dom.style.background = 'rgba(255,255,255,0)';
            dom.style.width = '300px';
            dom.style.height = '300px';
            dom.style.left = 'unset';
            dom.style.right = 'unset';
            dom.style.top = 'unset';
            dom.style.bottom = 'unset';
            dom.style.marginTop = 'unset';
            dom.style.marginLeft = 'unset';
        }
        const hide = () => {
            if (dockingEdgeState.value === 'hide') {
                return;
            }
            dockingEdgeState.value = 'hide';
            dom.style.display = 'none';
            reset();
        }

        expose({showLeft, showRight, showTop, showBottom, hide});
        return {dockingEdgeRef};
    },
    render() {
        return <>
            <div ref='dockingEdgeRef' class={[desktopStyle.docking_edge]}></div>
        </>
    }
})
