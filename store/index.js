import { defineStore } from "pinia";

export const useGlobalStore = defineStore("global", {
    state: () => ({
        _currentBgc:
            "radial-gradient(circle, rgba(0,28,60,1) 0%, rgba(1,1,22,1) 50%, rgba(8,0,142,1) 100%)",
        _allBgc: {
            landing:
                "radial-gradient(circle, rgba(0,28,60,1) 0%, rgba(1,1,22,1) 50%, rgba(8,0,142,1) 100%)",
            skills: "radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(232,153,43,1) 100%)",
            projects:
                "radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(8,92,19,1) 100%)",
        },
    }),
    getters: {
        currentBgc: (state) => state._currentBgc ?? "",
        sectionNamesWithBgc: (state) => state._allBgc ?? "",
    },
    actions: {
        setBgc(section) {
            this._currentBgc = this._allBgc[section];
        },
        // TODO: Delete this if not used
        // async nuxtServerInit() {
        //     const { data } = await useApiFetch(
        //         "global/global"
        //     );
        //     this.global = data.value.data;
        // },
    },
});
