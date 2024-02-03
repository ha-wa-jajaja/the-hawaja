import { defineStore } from "pinia";
import { action as actionIndex } from "@/constants/store/actions";
import { CLASSNAME_PAGE_BLOCKING } from "~/constants/type/className-variables";

export const useGlobalStore = defineStore("global", {
    state: () => ({
        pageInitLoaded: false,
        cityMove: {},
        cityMoveTrigger: 0,
    }),

    actions: {
        async nuxtServerInit() {},
        setPageInitLoadDone() {
            this.pageInitLoaded = true;
        },
        setCityMove(pos: object) {
            this.cityMove = pos;
        },
        setCityMoveTrigger(progress: number) {
            this.cityMoveTrigger = progress;
        },
    },
});
