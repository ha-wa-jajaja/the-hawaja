<template>
    <div class="w-full" id="page_index">
        <div
            class="fixed inset-0 z-0 h-screen w-full transition-all duration-200"
            :style="{
                background: store.currentBgc ?? '',
            }"
        ></div>
        <HomeTriggerBlock
            v-for="(val, key, index) in sections"
            :key="index"
            :sectionName="key"
        />
    </div>
</template>
<script setup>
import { useGlobalStore } from "@/store/index";
const store = useGlobalStore();

const sections = computed(
    () => store.sectionNamesWithBgc ?? {}
);
</script>
<style lang=""></style>
