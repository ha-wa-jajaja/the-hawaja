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
    const prevIdx = ref<Number>(0);
    const nextIdx = ref<Number>(0);

    function flickingChanged(ele: any) {
        slideIdx.value = ele.index;
        if (notCircular.value) return;
        prevIdx.value = ele.panel.prev()?._index ?? 0;
        nextIdx.value = ele.panel.next()?._index ?? 0;
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
        prevIdx,
        nextIdx,
        flickingChanged,
        flickingNavigateTo,
        notCircular,
        totalItems,
    };
};
