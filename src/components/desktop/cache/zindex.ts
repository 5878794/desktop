import {Ref} from "vue";

//desktop中层级管理 10-1000
let desktopZ = 10;
const maxZ = 20;
const minZ = 10;


//获取显示到最顶层的层级
//超过1000自动重排
const getDesktopShowZ = (getAllApp: any, openedWin: Ref<string[]>) => {
    desktopZ++;

    //重置所有打开的app的z-index
    if (desktopZ > maxZ) {
        const temp: any = [];
        openedWin.value.map((id: string) => {
            temp.push(getAllApp[id]);
        })
        temp.sort((a: any, b: any) => {
            return (a.z > b.z) ? -1 : 1;
        })
        console.log(temp);
    }

    return desktopZ;
}


export {
    getDesktopShowZ
}
