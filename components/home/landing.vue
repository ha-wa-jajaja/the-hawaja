<template>
    <UiStickyPinSection ref="pinWrapper" :height="100">
        <!-- landing text > 992 -->
        <section
            class="w-screen h-screen bg-transparent text-white flex flex-col-reverse items-start"
            ref="home_landing"
            v-if="$useMedia.min('ms')"
        >
            <HomeLandingGlitchText :content="' IT&#8217S JEFFREY'" :timeout="300"/>
            <HomeLandingGlitchText :content="' HI'"/>
        </section>

        <!-- landing text < 992 -->
        <section
            class="w-screen h-screen bg-transparent text-white flex flex-col-reverse items-start"
            ref="home_landing"
            v-else
        >
            <HomeLandingGlitchText :content="'JEFFREY'" :timeout="600"/>
            <HomeLandingGlitchText :content="' IT&#8217S'" :timeout="300"/>
            <HomeLandingGlitchText :content="' HI'"/>
        </section>
    </UiStickyPinSection>
</template>
<script setup>
import { useGlobalStore } from "~/store";
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


</script>
