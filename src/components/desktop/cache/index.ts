import {registerApp, getAppInfo, appList} from './app';
import {appsDom, systemBarDom, winSize} from './doms';
import {setDockingEdge, getDockingEdge, dockingEdgeState} from './dockingEdge';
import {openedWin, chooseWin, openWin, cursor, mouseDownWinId, getOpenedWinInfo} from './win';


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
    getOpenedWinInfo,
    chooseWin
}
