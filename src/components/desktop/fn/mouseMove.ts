import {Ref, ref} from "vue";

type TypeName = 'move' | 'top' | 'left' | 'right' | 'bottom' | 'leftTop' | 'rightTop' | 'leftBottom' | 'rightBottom';

interface MouseMoveType {
    mouseStartPoint: { x: number, y: number },
    xRef: Ref<number> | undefined,
    yRef: Ref<number> | undefined,
    type: TypeName | undefined,
    wRef: Ref<number> | undefined,
    hRef: Ref<number> | undefined,
    mousedown: (e: MouseEvent, x: Ref<number>, y: Ref<number>, type?: TypeName, w?: Ref<number>, h?: Ref<number>) => void
}


const mouseMove: MouseMoveType = {
    mouseStartPoint: {x: 0, y: 0},
    xRef: undefined,
    yRef: undefined,
    type: 'move',
    wRef: undefined,
    hRef: undefined,
    mousedown(e, x, y, type, w, h) {
        this.xRef = x;
        this.yRef = y;
        this.wRef = w || ref(0);
        this.hRef = h || ref(0);
        this.type = (type) ? type : "move";
    }
}


export default mouseMove;