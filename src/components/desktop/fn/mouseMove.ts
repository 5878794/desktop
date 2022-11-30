import {Ref, ref} from "vue";

type TypeName = 'move' | 'top' | 'left' | 'right' | 'bottom' | 'leftTop' | 'rightTop' | 'leftBottom' | 'rightBottom';

interface mouseDownParamType {
    e: MouseEvent,
    x: Ref<number>,
    y: Ref<number>,
    z?: Ref<number>,
    w?: Ref<number>,
    h?: Ref<number>,
    type?: TypeName,
    cursor?: Ref<string>,
}

interface MouseMoveType {
    x: number,
    y: number,
    w: number,
    h: number,
    z: number,
    cursor: Ref<string> | undefined,
    mouseStartPoint: { x: number, y: number },
    xRef: Ref<number> | undefined,
    yRef: Ref<number> | undefined,
    type: TypeName | undefined,
    wRef: Ref<number> | undefined,
    hRef: Ref<number> | undefined,
    mousedown: (opt: mouseDownParamType) => void,
    moveState: boolean,
    mouseMove: (e: MouseEvent) => void,
    mouseUp: (e: MouseEvent) => void
}

window.addEventListener('mousemove', (e) => {
    mouseMove.mouseMove(e);
}, {capture: false, passive: false});
window.addEventListener('mouseup', (e) => {
    mouseMove.mouseUp(e);
}, {capture: false, passive: false})

const mouseMove: MouseMoveType = {
    mouseStartPoint: {x: 0, y: 0},
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    z: 0,
    cursor: undefined,
    xRef: undefined,
    yRef: undefined,
    type: undefined,
    wRef: undefined,
    hRef: undefined,
    moveState: false,
    mousedown(opt) {
        this.moveState = true;
        this.cursor = opt.cursor ? opt.cursor : ref('');
        this.x = opt.x.value;
        this.y = opt.y.value;
        this.w = opt.w ? opt.w.value : 0;
        this.h = opt.h ? opt.h.value : 0;
        this.xRef = opt.x;
        this.yRef = opt.y;
        this.wRef = opt.w || ref(0);
        this.hRef = opt.h || ref(0);
        this.type = (opt.type) ? opt.type : "move";
        this.mouseStartPoint.x = opt.e.screenX;
        this.mouseStartPoint.y = opt.e.screenY;
    },
    mouseMove(e) {
        if (!this.moveState) {
            return;
        }
        const x = e.screenX;
        const y = e.screenY;
        const mx = x - this.mouseStartPoint.x;
        const my = y - this.mouseStartPoint.y;

        if (this.type === 'move') {
            this.xRef!.value = this.x + mx;
            this.yRef!.value = this.y + my;
            this.cursor!.value = 'move';
        }

    },
    mouseUp(e) {
        if (!this.moveState) {
            return;
        }
        this.moveState = false;
        this.cursor!.value = 'default';
    }
}


export default mouseMove;
