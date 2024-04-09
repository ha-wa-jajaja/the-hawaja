<template>
    <div class="pageIndex">
        <LayoutEnterAnim />
        <HomeBackground />
        <div class="relative z-10">
            <HomeLanding />
            <HomeWhoAmI v-if="isLg" />
            <HomeWhoAmIM v-else />
            <HomeMySkills v-if="isLg" />
            <HomeMySkillsM v-else />
            <HomeMyProjects />
            <HomeContact />
        </div>
    </div>
</template>
<script setup>
const { min } = useMedia();
const isLg = computed(() => min("lg"));
</script>
