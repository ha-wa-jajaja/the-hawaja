<template>
    <div
        class="w-full grid grid-cols-6 grid-rows-5 grow gap-4 h-[calc(100%-184px)] relative"
        ref="skillGrid"
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
import gsap from "gsap";

const skillGrid = ref();
let ctx;
let tl;
function setupAnim() {
    ctx = gsap.context((self) => {
        const skillItem = self.selector(".skill-item");
        const iconFrame = self.selector(".icon-frame");
        skillItem.forEach((el) =>
            gsap.set(el, { opacity: 0 })
        );

        tl = gsap
            .timeline({
                paused: true,
                defaults: {
                    ease: "power3.inOut",
                    duration: 0.5,
                },
            })
            .to(skillItem, {
                opacity: 1,
                stagger: {
                    grid: "auto",
                    from: "random",
                    amount: 0.5,
                },
            })
            .from(iconFrame, {
                yPercent: 15,
                opacity: 0,
                stagger: {
                    grid: "auto",
                    from: "random",
                    amount: 0.5,
                },
            });
    }, skillGrid.value);
}

function playAnim() {
    tl.play();
}
defineExpose({ playAnim });

onMounted(() => {
    setupAnim();
});
</script>
<style lang=""></style>
