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
const emits = defineEmits(["doWithProgress", "doOnEnter"]);

function clampProgress(val) {
    if (val < 0) return 0;
    else if (val > 1) return 1;
    else return val;
}
const didOnEnter = ref(false);
watch(movedInView, (val) => {
    const progress = movedInView.value / height.value;
    if (progress < -0.1) return;
    if (!didOnEnter.value) {
        emits("doOnEnter");
        didOnEnter.value = true;
    }
    gsap.set(rellaxEl.value, {
        y: `${realSpeed.value * movedInView.value}px`,
    });
    emits("doWithProgress", clampProgress(progress));
});
</script>
<style lang=""></style>
