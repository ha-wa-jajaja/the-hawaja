import { useGlobalStore } from "~/store";

const cityInitPos = {
    landing: {
        x: 7.54,
        y: 0.72,
        z: -6.12,
    },
    whoAmI: {
        x: 7.39,
        y: 1.27,
        z: 4.69,
    },
};
const cityEndMargin = {
    landing: {
        x: -0.15,
        y: 0.55,
        z: 10.81,
    },
    whoAmI: {
        x: -11.516,
        y: 0.187,
        z: 2.771,
    },
};

export const useUpdateCityPos = (
    section: string,
    progress: number
) => {
    function getCurrentPos(key: string) {
        return (
            cityInitPos[section][key] +
            cityEndMargin[section][key] * progress
        );
    }

    const store = useGlobalStore();
    store.setCityMoveTrigger(progress);
    store.setCityMove({
        x: getCurrentPos("x"),
        y: getCurrentPos("y"),
        z: getCurrentPos("z"),
    });
};
