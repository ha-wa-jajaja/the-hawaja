<template>
    <div ref="hintWrapper">
        <div
            class="tusker font-bold text-white text-[84px] scroll-hint overflow-hidden"
        >
            <p>SCROLL FOR</p>
        </div>
        <div
            class="tusker font-bold text-white text-[84px] scroll-hint overflow-hidden"
        >
            <p>MORE</p>
        </div>
    </div>
</template>
<script setup>
import gsap from "gsap";
const hintWrapper = ref(null);

function runAnim() {
    gsap.to(".scroll-hint p", {
        yPercent: 0,
        duration: 0.5,
        stagger: 0.2,
        ease: "expo.out",
        delay: 1.5,
    });
}

onMounted(async () => {
    gsap.set(".scroll-hint p", { yPercent: 110 });
    await nextTick();
    useObserver(hintWrapper, runAnim, true);
});
</script>
<style lang=""></style>
