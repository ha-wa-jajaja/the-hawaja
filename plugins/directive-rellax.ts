import { nextTick } from "vue";
import Rellax from "rellax";

let rellax;

// v-rellax data-rellax-speed="-10"
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive("rellax", {
        mounted(el, binding) {
            nextTick(() => {
                rellax = new Rellax(el);
            });
        },
        beforeUnmount(el, binding) {
            rellax.destroy();
        },
        getSSRProps(binding, vnode) {
            return {};
        },
    });
});
