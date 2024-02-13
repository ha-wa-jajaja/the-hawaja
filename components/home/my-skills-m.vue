<template>
    <div
        class="container my-skills-m"
        ref="my_skill_m_wrap"
    >
        <UiTextRevealer
            ref="title"
            class="mb-4"
            :content="$t('skills')"
        />
        <HomeSkillsSkillNameM
            class="mb-6"
            :active-skill="activeSkill?.name"
        />
        <HomeSkillsSkillGridM ref="skillGrid" />
    </div>
</template>
<script setup>
import { skills } from "@/assets/json/skills.json";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const my_skill_m_wrap = ref();
let st;
function setupSt() {
    st = ScrollTrigger.create({
        trigger: my_skill_m_wrap.value,
        start: "top bottom",
        end: "bottom top",
        scrub: 2,
        onUpdate: (self) => {
            useTriggerRellax(
                ".skill-item-m .icon-frame img",
                self.progress,
                0.4,
                0.4
            );
            useTriggerRellax(
                ".skill-item-m .colored-icon-frame img",
                self.progress,
                0.4,
                0.4
            );
        },
        onEnter: () => animTitle(),
    });
}

const title = ref();
function animTitle() {
    title.value.playAnim();
}

const skillGrid = ref();
const activeSkill = computed(() => {
    const key = skillGrid.value?.activeSkill;
    if (key === "") return null;
    return skills.find((skill) => skill.key === key);
});

onMounted(() => {
    setupSt();
});
</script>
<style lang=""></style>
