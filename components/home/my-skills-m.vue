<template>
    <div class="container" ref="my_skill_m_wrap">
        <UiTextRevealer
            ref="title"
            class="mb-8"
            :content="$t('skills')"
        />
        <HomeSkillsSkillGridM />
    </div>
</template>
<script setup>
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const my_skill_m_wrap = ref();
const progress = ref(0);
let st;
function setupSt() {
    st = ScrollTrigger.create({
        trigger: my_skill_m_wrap.value,
        start: "top bottom",
        end: "bottom top",
        scrub: 2,
        onUpdate: (self) => {
            progress.value = self.progress.toFixed(8);
        },
        onEnter: () => animTitle(),
    });
}

const title = ref();
function animTitle() {
    title.value.playAnim();
}

onMounted(() => {
    setupSt();
});
</script>
<style lang=""></style>
