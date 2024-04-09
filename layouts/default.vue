<template>
    <div>
        <!-- <LayoutEnterAnim /> -->
        <slot />
        <!-- <NuxtWelcome /> -->
    </div>
</template>
<script setup lang="ts">
useSeoMeta({
    title: "The HAWAJA",
    ogTitle: "The HAWAJA",
    description: "A mystery box by HAWAJA",
    ogDescription: "A mystery box by HAWAJA",
});
</script>
<style lang="scss"></style>
