<template>
    <UiStickyPinSection
        ref="pinWrapper"
        :height="200"
        @doOnEnter="titleAnim"
    >
        <main
            class="container h-full flex flex-col items-center py-12 justify-between"
        >
            <div
                class="relative w-full flex justify-center"
            >
                <UiTextRevealer
                    ref="title"
                    class="mb-8"
                    :content="$t('skills')"
                />
                <div
                    class="roboto text-white absolute right-0 bottom-0 mb-4 hover-hint"
                >
                    {{ $t("hover_hint") }}
                </div>
            </div>
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
    title.value.playAnim();
    skillsGrid.value.playAnim();
}
</script>
<style lang=""></style>
