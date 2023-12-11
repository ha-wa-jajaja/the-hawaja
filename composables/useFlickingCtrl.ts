export const useFlickingCtrl = () => {
    const moving = ref<Boolean>(false);
    const notCircular = ref<Boolean>(false);
    const totalItems = ref<Number>(0);
    async function flickingNavigate(
        flicking: any,
        dir: boolean
    ) {
        if (moving.value) return;
        moving.value = true;

        if (dir == true) {
            if (
                notCircular.value &&
                slideIdx.value >= totalItems.value
            )
                return;
            await flicking.value.next();
            moving.value = false;
        } else if (dir == false) {
            if (notCircular.value && slideIdx.value <= 0)
                return;
            await flicking.value.prev();
            moving.value = false;
        }
    }

    const slideIdx = ref<Number>(0);
    const moveDir = ref<String | null>(null);

    function flickingChanged(ele: any) {
        slideIdx.value = ele.index;

        moveDir.value = ele.direction;
    }

    async function flickingNavigateTo(
        flicking: any,
        idx: Number
    ) {
        moving.value = true;
        await flicking.value.moveTo(idx);
        moving.value = false;
    }

    return {
        moving,
        flickingNavigate,
        slideIdx,
        moveDir,
        flickingChanged,
        flickingNavigateTo,
        notCircular,
        totalItems,
    };
};
