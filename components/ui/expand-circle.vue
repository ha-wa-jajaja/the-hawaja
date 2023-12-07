<template>
    <div
        ref="circle"
        class="bg-circle rounded-full w-[400px] h-[400px]"
    ></div>
</template>
<script setup>
import gsap from "gsap";
const circle = ref(null);
function expandCircle() {
    gsap.to(circle.value, {
        "--clip": "50",
        duration: 0.6,
        ease: "circ.inOut",
    });
}
onMounted(() => {
    expandCircle();
});
</script>
<style scoped>
.bg-circle {
    --clip: 43%;

    clip-path: circle(var(--clip) at 50% 50%);

    box-shadow: 1px 0px 0px 45px rgba(128, 0, 128, 1) inset;
    -webkit-box-shadow: 1px 0px 0px 45px
        rgba(128, 0, 128, 1) inset;
    -moz-box-shadow: 1px 0px 0px 45px rgba(128, 0, 128, 1)
        inset;
}
</style>
