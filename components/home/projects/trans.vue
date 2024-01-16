<template>
    <UiStickyPinSection
        :height="transH"
        ref="pinWrapper"
        :st-end="'bottom bottom'"
    >
        <main
            class="h-full w-full relative"
            ref="projTrans"
        >
            <div
                class="container h-full flex justify-center items-center"
            >
                <div class="flex overflow-hidden">
                    <p
                        class="tusker main-text font-semibold"
                        :class="{ en: isEn }"
                        v-for="(text, index) in titleText"
                        :key="`projTrans-text-${index}`"
                    >
                        {{ text }}
                    </p>
                </div>
            </div>
        </main>
    </UiStickyPinSection>
</template>
<script setup>
import gsap from "gsap";
const pinWrapper = ref(null);
const scrollProgress = computed(
    () => pinWrapper.value?.progress
);
watch(scrollProgress, (progress) => {
    tl.progress(progress);
});

const { t, locale } = useI18n();
const isEn = computed(() => locale.value === "en");
const titleText = computed(() => t("projects")?.split(""));

const { min } = useMedia();
const transH = computed(() => (min("lg") ? 300 : 150));

let ctx;
let tl;
const projTrans = ref();
function setupAnim() {
    ctx = gsap.context((self) => {
        let mainText = self.selector(".main-text");
        let strokes = self.selector(".backboard-strokes");
        gsap.set(mainText, { yPercent: 110 });
        strokes.forEach((el, idx) => {
            gsap.set(el, {
                xPercent: idx % 2 == 0 ? 100 : -100,
            });
        });

        tl = gsap
            .timeline({
                paused: true,
                defaults: { ease: "expo.out" },
            })
            .to(mainText, {
                yPercent: 0,
                stagger: {
                    amount: 1,
                },
            });
    }, projTrans.value);
}
onMounted(() => {
    setupAnim();
});
</script>
<style lang="scss" scoped>
.main-text {
    &.en {
        font-size: 25vw;
        @screen max-lg {
            font-size: 38vw;
        }
    }
    &:not(.en) {
        font-size: 15vw;
    }
    color: #dcdcdc;
}
</style>
