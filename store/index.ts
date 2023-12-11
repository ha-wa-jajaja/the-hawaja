import { defineStore } from "pinia";
import { action as actionIndex } from "@/constants/store/actions";
import { CLASSNAME_PAGE_BLOCKING } from "~/constants/type/className-variables";

export const useGlobalStore = defineStore("global", {
    state: () => ({
        pageLoading: false,
        cityMove: {},
        landingMovePer: 0,
    }),

    actions: {
        async nuxtServerInit() {},
        [actionIndex.SET_PAGELOADING](value: boolean) {
            const self = this;
            self.pageLoading = value;
            if (typeof window !== "undefined") {
                const className = CLASSNAME_PAGE_BLOCKING;
                if (value)
                    document.body.classList.add(className);
                else
                    document.body.classList.remove(
                        className
                    );
            }
        },
        setCityMove(pos: object) {
            this.cityMove = pos;
        },
        setLandingMovePer(progress: number) {
            this.landingMovePer = progress;
        },
    },
});
