<template>
    <UiStickyPinSection ref="pinWrapper" :height="150">
        <main class="w-full h-full mx-0 my-auto max-w-[1920px] relative">

            <!-- landing text > 992 -->
            <section class="absolute bottom-0 left-0 w-fit h-fit" v-if="$useMedia.min('ms')">
                <HomeLandingGlitchText :content="'HI'" />
                <HomeLandingGlitchText :content="'IT&#8217S JEFFREY'" />
            </section>

            <!-- landing text < 992 -->
            <section class="absolute bottom-0 left-0 w-fit h-fit" v-else>
                <HomeLandingGlitchText :content="'HI'" />
                <HomeLandingGlitchText :content="'IT&#8217S'" />
                <HomeLandingGlitchText :content="'JEFFREY'" />
            </section>

            <HomeLandingScrollHint class="absolute top-10 right-10 max-lg:top-6 max-lg:right-6" />
        </main>
    </UiStickyPinSection>
</template>
<script setup>
import gsap from "gsap";
import { useGlobalStore } from "~/store";

const pinWrapper = ref(null);
const scrollProgress = computed(
    () => pinWrapper.value?.progress
);
watch(scrollProgress, (val) => {
    useUpdateCityPos("landing", val)
});

let tl;
function setupAnim() {
    tl = gsap.timeline({
        paused: true,
        defaults: {
            ease: "expo.out",
        },
    })
        .to(".landing-title-wrapper", {
            "--clip": "0%",
            duration: 1,
            stagger: 0.3
        })
        .to(
            ".landing-title-wrapper .overlay",
            { "--clip": "100%", duration: 1, stagger: 0.3 },
            0.6
        ).to(".scroll-hint p", {
            yPercent: 0,
            stagger: 0.2,
            duration: 0.5
        })
        .to(".scroll-sign", { opacity: 1, xPercent: 0, duration: 0.5 });
}
const store = useGlobalStore()
const pageInitLoaded = computed(() => store.pageInitLoaded)
watch(pageInitLoaded, (val) => {
    if (val) {
        setTimeout(() => tl.play(), 1000)
    }
})

onMounted(() => {
    setupAnim();
})


</script>
