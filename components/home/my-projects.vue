<template>
    <section
        class="my-projects flex flex-col items-center justify-center"
    >
        <div class="bg-black p-6" v-fade:clip>
            <div class="text-wrapper overflow-hidden">
                <h1
                    class="text-[72px] text-white font-bold"
                >
                    {{ $t("myProjects") }}
                </h1>
            </div>
        </div>
        <div
            class="bg-[#696969] w-[500px] aspect-square"
            v-fade:clip
            v-delay="400"
            ref="block"
        >
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
                    8
                </p>
            </div>
            <div class="flex mt-20">
                <button
                    class="bg-white p-4 mr-2"
                    @click="changeNum(false)"
                >
                    prev
                </button>
                <button
                    class="bg-white p-4"
                    @click="changeNum(true)"
                >
                    next
                </button>
            </div>
        </div>

        <!-- https://digisalad-b79baffa0895.herokuapp.com/ -->
        <!-- https://github.com/boss006133/digiSalad/tree/master -->
    </section>
</template>
<script setup>
import { projects } from "~/assets/json/projects.json";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const trueNum = ref(1);
const displayNum = ref(1);
function changeNum(dir) {
    if (dir && trueNum.value < 10) trueNum.value++;
    else if (!dir && trueNum.value > 1) trueNum.value--;
}

watch(trueNum, (val) => {
    let tl = gsap.timeline();
    tl.to(".num-tr .num", {
        yPercent: 100,
        xPercent: 100,
        duration: 0.5,
    });

    tl.call(
        () => (displayNum.value = trueNum.value),
        null,
        ">"
    );
    tl.to(".num-tr .num", {
        yPercent: 0,
        xPercent: 0,
        duration: 0.5,
    });
});

onMounted(() => {
    gsap.set(".text-wrapper h1", { yPercent: 100 });
    gsap.to(".text-wrapper h1", {
        yPercent: 0,
        duration: 0.3,
        delay: 0.7,
        ease: "circ.out",
    });
});
</script>
<style lang="scss" scoped>
.my-projects {
    @apply w-screen h-[100dvh];
    background: rgb(78, 38, 113);
    background: radial-gradient(
        circle,
        rgba(78, 38, 113, 1) 40%,
        rgba(0, 0, 0, 1) 100%
    );
}

.num-tr {
    @apply absolute top-0 left-0  w-full h-full overflow-hidden;
    clip-path: polygon(0 0, 0% 100%, 100% 0);
}
</style>
