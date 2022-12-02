import {Ref} from "vue";

//desktop中层级管理 10-1000
let desktopZ = 10;
const maxZ = 9000;
const minZ = 10;


//获取显示到最顶层的层级
//超过1000自动重排
const getDesktopShowZ = (openedWin: any) => {
    desktopZ++;

    //重置所有打开的app的z-index
    if (desktopZ > maxZ) {
        const temp: any = [];
        for (const appInfo of Object.values(openedWin)) {
            temp.push(appInfo);
        }
        temp.sort((a: any, b: any) => {
            return (a.z.value > b.z.value) ? -1 : 1;
        })
        let n = minZ;
        temp.map((rs: any) => {
            n++;
            rs.z.value = n;
        })
        desktopZ = n++;
    }
    return desktopZ;

}


export {
    getDesktopShowZ
}
