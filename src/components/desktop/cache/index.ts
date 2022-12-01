import {registerApp, getAppInfo, appList, getAllAppInfo} from './app';
import {appsDom, systemBarDom, winSize} from './doms';
import {setDockingEdge, getDockingEdge, dockingEdgeState} from './dockingEdge';
import {openedWin, openWin, cursor, mouseDownWinId} from './win';


export {
    registerApp,
    getAppInfo,
    appList,
    openedWin,
    openWin,
    cursor,
    mouseDownWinId,
    appsDom,
    systemBarDom,
    winSize,
    setDockingEdge,
    getDockingEdge,
    dockingEdgeState,
}
