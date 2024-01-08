<template>
    <div
        class="w-full relative py-16 who-am-i-m"
        ref="whoAmI_M"
    >
        <UiExpandCircle
            ref="circle"
            class="absolute bottom-0 right-0 pointer-events-none -z-10 translate-x-1/2"
            :circle-id="'whoAmI-m-bg'"
            :width="300"
        />
        <img
            src="/cross-stroke.svg"
            alt=""
            class="cross-stroke absolute top-0 left-0 pointer-events-none -z-10 w-[200px] h-auto translate-y-1/2"
        />

        <main class="container h-fit flex flex-col">
            <UiTextRevealer
                ref="title"
                :content="$t('who')"
            />

            <section
                class="profile-pic w-full aspect-square max-w-[500px] mt-14 self-center"
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
            </section>

            <div
                class="text-white text-lg font-semibold roboto intro-text mt-12"
            >
                {{ $t("intro") }}
            </div>
        </main>
    </div>
</template>
<script setup>
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const whoAmI_M = ref();
const title = ref();
const circle = ref();
const circleClass = computed(
    () => circle.value?.uniqueClass
);

let ctx;
let st;
let tl;
let tlPlayed = false;
function setupAnim() {
    ctx = gsap.context((self) => {
        const picCircle = self.selector(
            ".profile-pic .circle"
        );
        const pic = self.selector(
            ".profile-pic .circle img"
        );
        const text = self.selector(".intro-text");
        const cross = self.selector(".cross-stroke");

        gsap.set(picCircle, { scale: 0 });
        gsap.set(pic, { scale: 0 });
        gsap.set(text, {
            opacity: 0,
            yPercent: 20,
        });
        gsap.set(cross, {
            scale: 0,
            xPercent: 20,
        });

        tl = gsap
            .timeline({
                paused: true,
                defaults: {
                    ease: "expo.out",
                },
            })
            .call(() => title.value?.playAnim())
            .to(picCircle, {
                scale: 1,
                duration: 0.35,
                delay: 0.3,
                transformOrigin: "bottom",
            })

            .to(pic, {
                scale: 1,
                duration: 0.35,
                transformOrigin: "bottom",
            })
            .to(
                cross,
                {
                    scale: 1,
                    duration: 0.3,
                },
                "<"
            )
            .call(
                () => {
                    circle.value?.playAnim();
                },
                null,
                "<"
            )
            .to(text, {
                duration: 0.2,
                yPercent: 0,
                opacity: 1,
                ease: "none",
            })
            .call(() => (tlPlayed = true));
    }, whoAmI_M.value);
}

function createSt() {
    st = ScrollTrigger.create({
        trigger: whoAmI_M.value,
        start: "top 90%",
        end: "bottom 90%",
        scrub: 2,
        onUpdate: (self) => {
            useUpdateCityPos("whoAmI", self.progress);
            if (!tlPlayed) tl.progress(self.progress);

            useTriggerRellax(
                ".who-am-i-m .cross-stroke",
                self.progress,
                0.2,
                0.1
            );
            useTriggerRellax(
                circleClass.value,
                self.progress,
                0.9,
                -0.1
            );
        },
    });
}

onMounted(() => {
    setupAnim();
    createSt();
});
onUnmounted(() => {
    ctx.revert();
});
</script>
<style lang=""></style>
