<template>
    <section class="h-screen w-screen" ref="home_skills">
        <div class="scroller h-full w-full">
            <div class="w-1/2">
                <client-only>
                    <Vue3Lottie
                        v-motion-slide-bottom
                        ref="anim"
                        :animationData="codingJson"
                        :height="'100%'"
                        :width="'auto'"
                        @onAnimationLoaded="setup_tl"
                    />
                </client-only>
            </div>
        </div>
    </section>
</template>

<script setup>
import codingJson from "@/assets/lottie/coding.json";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const anim = ref(null);

// setup scroll trigger
const home_skills = ref(null);
const st = ref(null);

// to apply any
const setup_tl = () => {
    anim.value.stop();
    st.value = gsap.context((self) => {
        const main = self.selector(".scroller");
        gsap.timeline({
            scrollTrigger: {
                trigger: main,
                start: "bottom bottom",
                end: "bottom -100%",
                pin: true,
                scrub: 6,
                id: "skills",
                markers: true,
                onUpdate: (self) => {
                    anim.value.goToAndStop(
                        self.progress * 120,
                        true
                    );
                },
            },
        });
    }, home_skills.value);
};

onUnmounted(() => {
    st.value.revert();
});
</script>
