<template>
    <div
        class="fixed top-0 left-0 bg-[#150024] w-screen h-screen flex items-center justify-center text-white z-[99]"
        :class="{
            'opacity-0': !textW,
            ended: endEnterEffect,
        }"
        ref="enterAnim"
    >
        <div
            class="source-code-pro flex text-[72px] relative max-lg:text-[56px]"
        >
            <div class="bracket-l overflow-hidden">
                <p>{{ "<" }}</p>
            </div>

            <!-- !just for getting width -->
            <div class="absolute-center">
                <div ref="textSpacer" class="opacity-0">
                    {{ texts[0] }}
                </div>
                <!-- <LayoutEnterAnimText
                    @send-pair-finished=""
                    
                /> -->
                <UiRandomText
                    :target-text="['HELLO', 'WORLD']"
                    @send-effect-finished="onEffectPairEnd"
                    class="w-full h-full -translate-y-1/2"
                    ref="enterAnimText"
                />
            </div>
            <div class="bracket-r overflow-hidden">
                <p>{{ "/>" }}</p>
            </div>
        </div>
    </div>
</template>
<script setup>
import gsap from "gsap";
const texts = ["HELLO", "WORLD"];
const textSpacer = ref();
const { width: textW } = useElementSize(textSpacer);

let ctx;
let tl;
const enterAnim = ref();
const enterAnimText = ref();
function setupAnim() {
    ctx = gsap.context((self) => {
        const bracketLWrap = self.selector(".bracket-l");
        const bracketL = self.selector(".bracket-l p");
        const bracketRWrap = self.selector(".bracket-r");
        const bracketR = self.selector(".bracket-r p");

        gsap.set(bracketL, { xPercent: 100 });
        gsap.set(bracketR, { xPercent: -100 });

        const totalTrans = textW.value;

        tl = gsap
            .timeline({
                paused: true,
                defaults: {
                    ease: "power2.inOut",
                },
            })
            .to(bracketL, { xPercent: 0, duration: 0.8 })
            .to(bracketR, { xPercent: 0, duration: 0.8 }, 0)
            .to(bracketLWrap, {
                x: `-${totalTrans / 2 - 5}px`,
                duration: 0.6,
            })
            .to(
                bracketRWrap,

                {
                    x: `${totalTrans / 2 + 20}px`,
                    duration: 0.6,
                },
                "<"
            )
            .call(() => enterAnimText.value?.runEffect(0));
    }, enterAnim.value);
}

const endEnterEffect = ref(false);
import { useGlobalStore } from "~/store";
const storeGlobal = useGlobalStore();
function onEffectPairEnd() {
    // page loaded condition
    if (true) {
        endEnterEffect.value = true;
        storeGlobal.setPageInitLoadDone();
    } else enterAnimText.value?.runEffect(0);
}

onMounted(() => {
    setupAnim();
    if (textW.value) tl.play();
});
</script>
<style lang="scss" scoped>
.ended {
    animation: clip-end 1s ease-in-out 0.2s 1 forwards;
}

@keyframes clip-end {
    from {
        -webkit-clip-path: inset(0);
        clip-path: inset(0);
    }
    to {
        pointer-events: none;
        -webkit-clip-path: inset(0 100% 0 0);
        clip-path: inset(0 100% 0 0);
    }
}
</style>
