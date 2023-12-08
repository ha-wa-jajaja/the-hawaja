<template>
    <div
        class="w-[100px] aspect-square relative border border-red-500 overflow-hidden"
    >
        <div class="num-tr">
            <p class="num text-[48px] text-white">
                {{ displayNum }}
            </p>
        </div>
        <!-- line -->
        <div
            class="absolute bg-[#40E0D0] w-[150px] h-1 bottom-0 left-0 origin-bottom-left -rotate-45"
        ></div>
        <p
            class="bottom-0 right-0 absolute w-fit text-[48px] text-white"
        >
            {{ props.totalNum }}
        </p>
    </div>
</template>
<script setup>
import gsap from "gsap";

const props = defineProps({
    realNum: {
        type: Number,
        default: 1,
    },
    totalNum: {
        type: Number,
        default: 1,
    },
});

const displayNum = ref(1);

watch(props.realNum, (val) => {
    let tl = gsap.timeline();
    tl.to(".num-tr .num", {
        yPercent: 100,
        xPercent: 100,
        duration: 0.5,
    })
        .call(() => (displayNum.value = val), null, ">")
        .to(".num-tr .num", {
            yPercent: 0,
            xPercent: 0,
            duration: 0.5,
        });
});
</script>
<style lang="scss" scoped>
.num-tr {
    @apply absolute top-0 left-0  w-full h-full overflow-hidden;
    clip-path: polygon(0 0, 0% 100%, 100% 0);
}
</style>
