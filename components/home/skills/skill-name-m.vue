<template>
    <div
        class="flex w-full roboto justify-center skill-name-anim"
        :class="{ active: props.activeSkill }"
        ref="skill_name_anim"
    >
        <div class="overflow-hidden relative w-fit">
            <!-- just to get the space width -->
            <p class="spacer opacity-0">
                {{ displayText }}
            </p>
            <div class="name-l">
                <p>{{ displayText }}</p>
            </div>
            <div class="name-r">
                <p>{{ displayText }}</p>
            </div>
        </div>
    </div>
</template>
<script setup>
import gsap from "gsap";
const props = defineProps({
    activeSkill: {
        type: String || null,
        default: "",
    },
});

const skill_name_anim = ref();
let tl;
let ctx;
function setupAnim() {
    ctx = gsap.context((self) => {
        const left = self.selector(".name-l p");
        const right = self.selector(".name-r p");

        tl = gsap
            .timeline({
                paused: true,
                defaults: {
                    ease: "sine.in",
                    duration: 0.4,
                },
            })
            .to(left, { xPercent: 60 }, 0)
            .to(right, { xPercent: -60 }, 0)
            .call(
                () =>
                    (displayText.value =
                        props.activeSkill.toUpperCase())
            )
            .to(left, { xPercent: 0 }, 0.4)
            .to(right, { xPercent: 0 }, 0.4);
    }, skill_name_anim.value);
}

const { t } = useI18n();
const displayText = ref(t("click_hint"));
watch(
    () => props.activeSkill,
    (val) => {
        tl.play(0);
    }
);

onMounted(() => setupAnim());
</script>
<style lang="scss" scoped>
.skill-name-anim {
    font-size: 16px;
    color: white;
    &.active {
        font-weight: 700;
        font-size: 24px;
    }
    .name-l {
        @apply w-full h-full absolute top-0 left-0 overflow-hidden;
        clip-path: polygon(0 0, 40% 0, 65% 100%, 0 100%);
    }
    .name-r {
        @apply w-full h-full absolute top-0 left-0 overflow-hidden;
        clip-path: polygon(
            100% 0,
            40% 0,
            65% 100%,
            100% 100%
        );
    }
}
</style>
