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
                class="mb-10"
                :content="$t('skills')"
            />
            <HomeSkillsSkillGird />
        </main>
    </UiStickyPinSection>
</template>
<script setup>
import { skills } from "@/assets/json/skills.json";
import gsap from "gsap";

const pinWrapper = ref(null);
const scrollProgress = computed(
    () => pinWrapper.value?.progress
);
const title = ref();
function titleAnim() {
    title.value.playAnim();
}
</script>
<style lang=""></style>
