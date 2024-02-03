import { nextTick } from "vue";
import type { DirectiveBinding } from "vue";
function onIntersectionObserver(
    el: HTMLElement,
    className: string,
    stop = false
) {
    const callback = (entries) => {
        for (const entry of entries) {
            if (entry.isIntersecting)
                el.classList.add(className);
        }
    };

    const options = {
        threshold: 0.3,
    };

    const observer = new IntersectionObserver(
        callback,
        options
    );
    observer.unobserve(el);
    if (!stop) observer.observe(el);
}

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive("fade", {
        beforeMount(el, binding) {
            el.style.setProperty(
                "--end",
                binding.value ?? "0px"
            );
            el.classList.add("directive-animate-fade-init");
        },
        mounted(el, binding: DirectiveBinding) {
            nextTick(() =>
                onIntersectionObserver(
                    el,
                    `directive-animate-fade-${binding.arg}`
                )
            );
        },
        beforeUnmount(el, binding) {
            el.classList.remove(
                "directive-animate-fade-init",
                `directive-animate-fade-${binding.arg}`
            );
            nextTick(() =>
                onIntersectionObserver(el, "", true)
            );
        },
        getSSRProps(binding, vnode) {
            return {};
        },
    });
});
