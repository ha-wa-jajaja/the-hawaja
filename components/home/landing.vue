<template>
    <UiStickyPinSection ref="pinWrapper">
        <section
            class="w-screen h-screen bg-transparent text-white flex flex-col-reverse items-start"
            ref="home_landing"
        >
            <!-- <UiRandomText :content="' IT&#8217S JEFFREY'" :wait-for-prev="true" :prev-done="text1Done"/>
            <UiRandomText :content="' HI'" ref="text1"/> -->
            <HomeLandingRandomText :content="' IT&#8217S JEFFREY'"/>
            <HomeLandingRandomText :content="' HI'"/>

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

const text1 = ref(null)
const text1Done = computed(()=> text1.value?.done)
</script>
