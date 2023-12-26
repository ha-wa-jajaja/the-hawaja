<template>
    <div class="pageIndex">
        <HomeBackground />
        <div class="relative z-10">
            <HomeLanding />
            <HomeWhoAmI v-if="isLg" />
            <HomeWhoAmIM v-else />
            <HomeMySkills />
            <div
                class="w-screen h-screen bg-[#0c0821cc]"
            ></div>
        </div>
    </div>
</template>
<script setup>
const { min } = useMedia();
const isLg = computed(() => min("lg"));
</script>
