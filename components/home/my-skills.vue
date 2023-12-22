<template>
    <UiStickyPinSection ref="pinWrapper" :height="200">
        <main
            class="container h-full flex flex-col items-center"
        >
            <UiTextRevealer ref="title">
                <h1
                    class="text-[140px] text-white tusker font-bold"
                >
                    {{ $t("skills") }}
                </h1>
            </UiTextRevealer>
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
</script>
<style lang=""></style>
