<template>
    <section
        class="relative z-10 h-screen w-full bg-transparent"
        ref="st_block"
    >
        <div class="main-content h-full w-full"></div>
    </section>
</template>
<script setup>
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import { useGlobalStore } from "@/store/index";
const store = useGlobalStore();

const props = defineProps({
    sectionName: {
        type: String,
        default: "",
    },
});

const st_block = ref();
const ctx = ref(null);

onMounted(() => {
    ctx.value = gsap.context((self) => {
        const main = self.selector(".main-content");
        gsap.to(main, {
            scrollTrigger: {
                trigger: main,
                start: "bottom bottom",
                end: "bottom top",
                onEnter: () => {
                    store.setBgc(props.sectionName);
                },
                onEnterBack: () => {
                    store.setBgc(props.sectionName);
                },
            },
        });
    }, st_block.value);
});

onUnmounted(() => {
    ctx.value.revert();
});
</script>
<style lang=""></style>
