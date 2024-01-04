<template>
    <UiStickyPinSection
        ref="pinWrapper"
        :height="100"
        :stStart="'top bottom'"
        @doOnEnter="animTitle"
    >
        <div class="container">
            <UiTextRevealer
                ref="title"
                class="mb-8"
                :content="$t('skills')"
            />
            <HomeSkillsSkillGridM />
        </div>
    </UiStickyPinSection>
</template>
<script setup>
const title = ref();
function animTitle() {
    title.value.playAnim();
}
</script>
<style lang=""></style>
