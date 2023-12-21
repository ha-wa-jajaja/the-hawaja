<template>
    <UiStickyPinSection
        :height="300"
        ref="pinWrapper"
        :has-on-enter="true"
        @do-on-enter="enterAnim"
    >
        <main
            class="container h-full flex justify-between relative"
            ref="pageWhoAmI"
        >
            <button
                class="fixed top-0 right-0 bg-white p-5 text-black z-[999]"
                @click="tl.play()"
            >
                play anim
            </button>
            <section class="w-2/5 flex items-center">
                <div
                    class="profile-pic w-full aspect-square"
                >
                    <div
                        class="circle w-full h-full bg-purple-primary rounded-full bg-opacity-80 relative overflow-hidden"
                    >
                        <img
                            src="/me.png"
                            alt=""
                            class="absolute h-[90%] w-auto z-10 right-0 bottom-0"
                        />
                    </div>
                </div>
            </section>
            <section class="w-1/2 flex items-center">
                <UiTextRevealer ref="title">
                    <h1
                        class="text-[140px] text-white tusker font-bold"
                    >
                        {{ $t("who") }}
                    </h1>
                </UiTextRevealer>
            </section>

            <UiExpandCircle
                ref="circle"
                class="absolute top-0 right-0 scale-[2] pointer-events-none -translate-y-[40%] -z-10"
                :circle-id="'whoAmI-bg-1'"
            />
            <UiExpandCircle
                ref="circle2"
                class="absolute bottom-0 left-0 scale-[1.8] pointer-events-none translate-y-[40%] -z-10 -translate-x-full"
                :circle-id="'whoAmI-bg-2'"
            />
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
    useUpdateCityPos("whoAmI", progress);
    useTriggerRellax(circleClass.value, progress, 0.5, 0.6);
    useTriggerRellax(
        circle2Class.value,
        progress,
        0.5,
        -0.4
    );
});

const title = ref();
const circle = ref();
const circleClass = computed(
    () => circle.value?.uniqueClass
);
const circle2 = ref();
const circle2Class = computed(
    () => circle2.value?.uniqueClass
);

let tl;
let ctx;
const pageWhoAmI = ref();
function setupAnim() {
    ctx = gsap.context((self) => {
        const picWrap = self.selector(".profile-pic");
        const picCircle = self.selector(
            ".profile-pic .circle"
        );
        const pic = self.selector(".profile-pic img");

        gsap.set(picWrap, { xPercent: 100 });
        gsap.set(picCircle, { scale: 0 });
        gsap.set(pic, { scale: 0 });

        tl = gsap
            .timeline({
                paused: true,
                defaults: {
                    ease: "expo.out",
                },
            })
            .to(picCircle, {
                scale: 1,
                duration: 0.35,
                transformOrigin: "bottom",
            })
            .call(() => circle.value?.playAnim())
            .to(pic, {
                scale: 1,
                duration: 0.35,
                transformOrigin: "bottom",
            })
            .call(() => circle2.value?.playAnim())
            .call(() => title.value?.playAnim())
            .to(picWrap, {
                xPercent: 0,
                duration: 0.8,
                ease: "expo.inOut",
            })
            .to(circleClass.value, {
                xPercent: 40,
                duration: 0.8,
            });
    }, pageWhoAmI.value);
}

function enterAnim() {
    tl.play();
    // title.value
    //     ?.playAnim()
    //     .then(() => circle.value?.playAnim());
}
onMounted(() => {
    setupAnim();
});
onUnmounted(() => {
    ctx.revert();
});
</script>
<style lang=""></style>
