//靠边辅助显示dom


import {ref} from "vue";

let dockingEdgeRef: any;
const dockingEdgeState = ref('hide');
const setDockingEdge = (el: any) => {
    dockingEdgeRef = el;
}
const getDockingEdge = () => {
    let obj = (dockingEdgeRef && dockingEdgeRef.value) ? dockingEdgeRef.value : {};
    obj = (obj.__vueParentComponent) ? obj.__vueParentComponent : {};
    obj = obj.exposed || null;
    return obj;
}


export {
    setDockingEdge,
    getDockingEdge,
    dockingEdgeState,
}
