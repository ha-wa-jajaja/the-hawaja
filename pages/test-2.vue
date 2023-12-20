<template>
    <div>
        <div
            class="w-screen h-screen bg-white text-black text-[100px] flex items-center justify-center"
        >
            enter
        </div>
        <UiStickyPinSection :height="300" ref="pinWrapper">
            <UiExpandCircle
                ref="circle"
                :circle-id="'test-2'"
            />
            <div class="text-black text-[100px]">
                NOT RELLAX
            </div>
        </UiStickyPinSection>
        <div
            class="w-screen h-screen bg-white text-black text-[100px] flex items-center justify-center"
        >
            end
        </div>
    </div>
</template>
<script setup>
const pinWrapper = ref(null);
const scrollProgress = computed(
    () => pinWrapper.value?.progress
);

const circle = ref(null);
const circleClass = computed(() => circle.value.uniqueId);

watch(scrollProgress, (val) => {
    useTriggerRellax(
        "." + circleClass.value,
        val,
        0.7,
        -0.5
    );
});
</script>
<style lang=""></style>
