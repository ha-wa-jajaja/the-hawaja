<template>
    <div
        class="fixed inset-0 w-screen h-screen flex items-center justify-center"
        :class="{ 'opacity-0': !textW }"
        ref="enterAnim"
    >
        <div class="roboto flex text-[64px] relative">
            <div class="bracket-l overflow-hidden">
                <p>{{ "<" }}</p>
            </div>
            <div
                class="text absolute-center"
                ref="enterAnimText"
                :class="
                    showText ? 'opacity-100' : 'opacity-0'
                "
            >
                {{ texts[0] }}
            </div>
            <!-- <LayoutEnterAnimText /> -->
            <div class="bracket-r overflow-hidden">
                <p>{{ "/>" }}</p>
            </div>
        </div>
    </div>
</template>
<script setup>
import gsap from "gsap";
const texts = ["HELLO", "WORLD"];
const enterAnimText = ref();
const { width: textW } = useElementSize(enterAnimText);

let ctx;
let tl;
const enterAnim = ref();
const showText = ref(false);
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
                    duration: 0.6,
                },
            })
            .to(bracketL, { xPercent: 0 })
            .to(bracketR, { xPercent: 0 }, 0)
            .to(bracketLWrap, {
                x: `-${totalTrans / 2 - 5}px`,
            })
            .to(
                bracketRWrap,
                { x: `${totalTrans / 2 + 20}px` },
                "<"
            )
            .call(() => (showText.value = true));
    }, enterAnim.value);
}

onMounted(() => {
    setupAnim();
    if (textW.value) tl.play();
});
</script>
<style lang=""></style>
