<template>
    <div
        ref="circle"
        class="bg-circle rounded-full w-[400px] h-[400px] p-[60px]"
        :class="uniqueId"
    ></div>
</template>
<script setup>
import gsap from "gsap";
const props = defineProps({
    circleId: {
        type: String,
        default: "",
    },
});
const uniqueId = computed(
    () => "bg-circle-" + props.circleId
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

defineExpose({ uniqueId, playAnim });

onMounted(() => {
    setupAnim();
});
</script>
<style scoped>
.bg-circle {
    --clip: 30%;

    clip-path: circle(var(--clip) at 50% 50%);

    box-shadow: 1px 0px 0px 60px rgba(111, 0, 180, 255)
        inset;
    -webkit-box-shadow: 1px 0px 0px 60px
        rgba(111, 0, 180, 255) inset;
    -moz-box-shadow: 1px 0px 0px 60px rgba(111, 0, 180, 255)
        inset;
}
</style>
