<template>
    <div ref="scene_page">
        <div
            class="w-screen h-screen bg-black text-white flex items-center justify-center bottom-layer"
        >
            <UiRandomText :content="' HI, ITS JEFFREY'" />
        </div>
        <div
            class="w-screen h-screen bg-[#600080] cover-layer"
        ></div>
        <div
            class="w-screen h-screen bg-green-500 main-scroll"
        ></div>
        <div class="w-screen h-screen bg-gray-600"></div>
    </div>
</template>
<script setup>
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const scene_page = ref(null);
const ctx = ref(null);

onMounted(() => {
    ctx.value = gsap.context((self) => {
        const main = self.selector(".main-scroll");
        const cover = self.selector(".cover-layer");
        const bottom = self.selector(".bottom-layer");

        ScrollTrigger.create({
            trigger: main,
            start: "bottom bottom",
            end: "bottom top",
            pin: true,
            // onUpdate: (self) =>
            //     console.log(self.progress.toFixed(3)),
        });

        ScrollTrigger.create({
            trigger: bottom,
            start: "top top",
            pin: true,
            pinSpacing: false,
            // onUpdate: (self) =>
            //     console.log(self.progress.toFixed(3)),
        });

        ScrollTrigger.create({
            trigger: cover,
            start: "top top",

            pin: true,
            pinSpacing: false,
            // onUpdate: (self) =>
            //     console.log(self.progress.toFixed(3)),
        });
    }, scene_page.value); // <- Scope!
});

onUnmounted(() => {
    ctx.value.revert(); // <- Easy Cleanup!
});
</script>
<style lang=""></style>
