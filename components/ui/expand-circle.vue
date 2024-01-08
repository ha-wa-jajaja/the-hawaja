<template>
    <div
        ref="circle"
        class="bg-circle rounded-full"
        :class="uniqueClass.slice(1)"
        :style="{
            width: `${props.width}px`,
            height: `${props.width}px`,
            padding: `${props.width * 0.15}px`,
            '--shadow': `${props.width * 0.15}px`,
        }"
    ></div>
</template>
<script setup>
import gsap from "gsap";
const props = defineProps({
    circleId: {
        type: String,
        default: "",
    },
    width: {
        type: Number,
        default: 400,
    },
});
const uniqueClass = computed(
    () => ".bg-circle-" + props.circleId
);

let tl;
const circle = ref(null);
function setupAnim() {
    gsap.set(circle.value, { "--clip": "30" });
    tl = gsap
        .timeline({
            paused: true,
            defaults: {
                ease: "circ.inOut",
            },
        })
        .to(circle.value, {
            "--clip": "37",
            duration: 0.6,
        })
        .to(circle.value, {
            "--clip": "50",
            duration: 0.6,
        });
}

function playAnim() {
    return new Promise((resolve) =>
        tl.play().call(() => resolve())
    );
}
function reverseAnim() {
    return new Promise((resolve) =>
        tl.reverse().call(() => resolve())
    );
}

defineExpose({ uniqueClass, playAnim, reverseAnim });

onMounted(() => {
    setupAnim();
});
</script>
<style scoped>
.bg-circle {
    --clip: 30%;
    --shadow: 0px;
    clip-path: circle(var(--clip) at 50% 50%);

    box-shadow: 1px 0px 0px var(--shadow)
        rgba(111, 0, 180, 255) inset;
    -webkit-box-shadow: 1px 0px 0px var(--shadow)
        rgba(111, 0, 180, 255) inset;
    -moz-box-shadow: 1px 0px 0px var(--shadow)
        rgba(111, 0, 180, 255) inset;
}
</style>
