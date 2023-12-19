<template>
    <button
        class="fixed top-0 right-0 p-4 font-bold bg-white text-black"
        @click="expandCircle()"
    >
        expand circle
    </button>
    <div
        ref="circle"
        class="bg-circle rounded-full w-[400px] h-[400px] p-[60px]"
    >
        <div
            class="w-full h-full rounded-full border-[10px] border-[#6f00b4] translate-x-full border-solid"
        ></div>
    </div>
</template>
<script setup>
import gsap from "gsap";
const circle = ref(null);
function expandCircle() {
    gsap.set(circle.value, { "--clip": "30" });
    gsap.timeline({
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
// onMounted(() => {
//     expandCircle();
// });
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
