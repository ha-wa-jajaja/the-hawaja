<template>
    <section
        class="w-screen relative"
        :style="{ height: `${height}vh` }"
        ref="stickyPinEl"
    >
        <div
            class="sticky top-0 w-full h-[100svh] flex items-center justify-center overflow-hidden"
        >
            <slot />
        </div>
    </section>
</template>
<script setup>
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const props = defineProps({
    height: {
        type: Number,
        default: 200,
    },
    addScrollTrigger: {
        type: Boolean,
        default: true,
    },
    stStart: {
        type: String,
        default: "top top",
    },
    stEnd: {
        type: String,
        default: "bottom top",
    },
});

const stickyPinEl = ref(null);
const emits = defineEmits([
    "doOnEnter",
    "doOnEnterBack",
    "doOnLeave",
    "doOnLeaveBack",
]);

const progress = ref(0);
let st;
function setupSt() {
    st = ScrollTrigger.create({
        trigger: stickyPinEl.value,
        start: props.stStart,
        end: props.stEnd,
        scrub: 2,
        onUpdate: (self) => {
            progress.value = self.progress.toFixed(8);
        },
        onEnter: () => {
            emits("doOnEnter");
        },
        onEnterBack: () => {
            emits("doOnEnterBack");
        },
        onLeave: () => {
            emits("doOnLeave");
        },
        onLeaveBack: () => {
            emits("doOnLeaveBack");
        },
    });
}
defineExpose({ progress });

onMounted(async () => {
    await nextTick();
    if (props.addScrollTrigger) setupSt();
});

onUnmounted(() => {
    st.kill();
});
</script>
<style lang=""></style>
