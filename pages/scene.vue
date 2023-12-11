<template>
    <div ref="scene_page">
        <HomeLanding />
        <HomeMyProjects />
        <UiStickyPinSection ref="testPin">
            <div
                class="w-screen h-screen bg-red-300 flex items-center justify-center"
            >
                <p class="text-black text-[72px]">
                    {{ testProgress }}
                </p>
            </div>
        </UiStickyPinSection>
        <div
            class="w-screen h-screen border-4 border-green-500"
        ></div>
        <div
            class="w-screen h-screen border-4 border-blue-600"
        ></div>
    </div>
</template>
<script setup>
const testPin = ref(null);
const testProgress = computed(
    () => testPin.value?.progress
);
</script>
<style lang="scss" scoped>
.clip-layer {
    --clip: 100%;
    clip-path: inset(var(--clip) 0 0 0);
}
</style>
