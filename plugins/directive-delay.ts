import { nextTick } from "vue";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive("delay", {
        beforeMount(el, binding) {
            el.style.animationDelay = `${binding.value}ms`;
        },
        getSSRProps(binding, vnode) {
            return {};
        },
    });
});
