<template>
    <div class="rellax-el" ref="rellaxWrap">
        <div class="child" ref="rellaxEl">
            <slot />
        </div>
    </div>
</template>
<script setup>
import gsap from "gsap";
const props = defineProps({
    speed: {
        // num bigger, faster
        type: Number,
        default: 1,
    },
});

const rellaxWrap = ref();
const { height } = useWindowSize();
const { top, height: elHeight } =
    useElementBounding(rellaxWrap);
const startRellax = useElementVisibility(rellaxWrap);

const movedInView = computed(
    () => height.value - top.value
);
const realSpeed = computed(() => (0 - props.speed) / 10);
const rellaxEl = ref();
watch(movedInView, (val) => {
    if (!startRellax.value) return;
    gsap.set(rellaxEl.value, {
        y: `${realSpeed.value * movedInView.value}px`,
    });
});
</script>
<style lang=""></style>
