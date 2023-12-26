<template>
    <UiStickyPinSection
        ref="pinWrapper"
        :height="200"
        @doOnEnter="titleAnim"
    >
        <main
            class="container h-full flex flex-col items-center py-12 justify-between"
        >
            <UiTextRevealer
                ref="title"
                class="mb-8"
                :content="$t('skills')"
            />
            <HomeSkillsSkillGird ref="skillsGrid" />
        </main>
    </UiStickyPinSection>
</template>
<script setup>
const pinWrapper = ref(null);
const scrollProgress = computed(
    () => pinWrapper.value?.progress
);
watch(scrollProgress, (progress) => {
    useTriggerRellax(
        ".skill-item .icon-frame img",
        progress,
        0.2,
        0.2
    );
});

const title = ref();
const skillsGrid = ref();
function titleAnim() {
    title.value
        .playAnim()
        .then(() => skillsGrid.value.playAnim());
}
</script>
<style lang=""></style>
