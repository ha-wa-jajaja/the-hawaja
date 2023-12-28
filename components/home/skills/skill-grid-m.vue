<template>
    <div
        class="w-full grid grid-cols-5 grid-rows-6 grow gap-2 skill-grid"
        ref="skillGrid"
    >
        <div
            class="skill-item-m"
            v-for="index in 11"
            :key="index"
        ></div>
    </div>
</template>
<script setup>
onMounted(() => {
    console.log("hello");
});
</script>
<style lang="scss" scoped>
@import url("@/assets/scss/components/skill-item-m.scss");
.skill-grid {
    aspect-ratio: 9/16;
}
</style>
