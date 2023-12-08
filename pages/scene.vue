<template>
    <div ref="scene_page">
        <!-- <div
            class="w-screen h-screen bg-blue-300 main-scroll"
        ></div> -->
        <div
            class="w-screen h-screen bg-black text-white flex items-center justify-center first relative"
        >
            <UiRandomText :content="' HI, ITS JEFFREY'" />

            <div
                class="w-screen h-screen bg-[#600080] clip-layer absolute inset-0 z-0 pointer-events-none"
            >
                <UiSpinner />
            </div>
        </div>
        <HomeMyProjects />
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

const spinnerRotate = ref(0);
function setupAnim() {
    ctx.value = gsap.context((self) => {
        const first = self.selector(".first");
        const clipLayer = self.selector(".clip-layer");
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: first,
                start: "top top",
                end: "bottom top",
                pin: true,
                scrub: true,
                onUpdate: (self) => {
                    spinnerRotate.value = self.progress;
                },
            },
        });

        tl.to(clipLayer, {
            "--clip": "0",
        });
    }, scene_page.value); // <- Scope!
}

onMounted(async () => {
    await nextTick();
    setupAnim();
});

onUnmounted(() => {
    ctx.value.revert(); // <- Easy Cleanup!
});
</script>
<style lang="scss" scoped>
.clip-layer {
    --clip: 100%;
    clip-path: inset(var(--clip) 0 0 0);
}
</style>
