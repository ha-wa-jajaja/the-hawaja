<template>
    <div
        class="w-full grid grid-cols-5 grid-rows-6 grow gap-2 skill-grid"
        ref="skillGrid"
    >
        <HomeSkillsSkillItemM
            v-for="(skill, index) in skills"
            :key="`skill-${index}-m`"
            :skill-obj="skill"
            :is-active="skill.key === activeSkill"
            @set-active="setActiveSkill"
        />
    </div>
</template>
<script setup>
import { skills } from "@/assets/json/skills.json";
import gsap from "gsap";

const activeSkill = ref("");
defineExpose({ activeSkill });
function setActiveSkill(str) {
    activeSkill.value = str;
}
</script>
<style lang="scss" scoped>
.skill-grid {
    aspect-ratio: 9/14;
    @screen min-ms {
        aspect-ratio: 1/1;
    }
}
</style>
