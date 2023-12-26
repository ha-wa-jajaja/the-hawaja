<template>
    <div
        class="w-full grid grid-cols-6 grid-rows-5 h-[78%] gap-4"
    >
        <HomeSkillsSkillItem
            v-for="(skill, index) in skills"
            :key="`skill-item-${index}`"
            :skill-obj="skill"
        />
    </div>
</template>
<script setup>
import { skills } from "@/assets/json/skills.json";
</script>
<style lang=""></style>
