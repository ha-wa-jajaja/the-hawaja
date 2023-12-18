<template>
    <UiStickyPinSection ref="pinWrapper" :height="150">
        <!-- landing text > 992 -->
        <section class="absolute bottom-0 left-0 w-fit h-fit" ref="home_landing" v-if="$useMedia.min('ms')">
            <HomeLandingGlitchText :content="'HI'" />
            <HomeLandingGlitchText :content="'IT&#8217S JEFFREY'" :timeout="300" />
        </section>

        <!-- landing text < 992 -->
        <section class="absolute bottom-0 left-0 w-fit h-fit" ref="home_landing" v-else>
            <HomeLandingGlitchText :content="'HI'" />
            <HomeLandingGlitchText :content="'IT&#8217S'" :timeout="300" />
            <HomeLandingGlitchText :content="'JEFFREY'" :timeout="600" />
        </section>

        <HomeLandingScrollHint class="absolute top-10 right-10 max-lg:top-6 max-lg:right-6" />
    </UiStickyPinSection>
</template>
<script setup>
import { useGlobalStore } from "~/store";
import gsap from "gsap";

const store = useGlobalStore();

const pinWrapper = ref(null);
const scrollProgress = computed(
    () => pinWrapper.value?.progress
);

const cityInitPos = {
    x: 7.54,
    y: 0.72,
    z: -6.12,
};
const cityEndMargin = {
    x: -0.15,
    y: 0.55,
    z: 10.81,
};
function getCurrentPos(key) {
    return (
        cityInitPos[key] +
        cityEndMargin[key] * scrollProgress.value
    );
}
watch(scrollProgress, (val) => {
    store.setLandingMovePer(val);
    store.setCityMove({
        x: getCurrentPos("x"),
        y: getCurrentPos("y"),
        z: getCurrentPos("z"),
    });
});

function landingAnim() {
    gsap.timeline({
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

onMounted(async () => {
    await nextTick()
    landingAnim()
})

</script>
