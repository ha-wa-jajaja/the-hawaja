<template>
    <div ref="hintWrapper" class="flex overflow-hidden">
        <div
            class="min-h-full w-1 mr-4 bg-[#5A5A5A] overflow-hidden scroll-sign max-md:mr-2"
        >
            <div
                class="scroll-tab bg-white h-1/3 w-full"
            ></div>
        </div>
        <div>
            <div
                class="tusker scroll-hint"
                v-for="(text, index) in texts"
                :key="`home-landing-sign-text-${index}`"
            >
                <p>{{ text }}</p>
            </div>
        </div>
    </div>
</template>
<script setup>
import gsap from "gsap";
const hintWrapper = ref(null);

const texts = ["SCROLL FOR", "MORE"];

onMounted(async () => {
    gsap.set(".scroll-hint p", { yPercent: 110 });
    gsap.set(".scroll-sign", { xPercent: 100, opacity: 0 });
});
</script>
<style lang="scss" scoped>
.scroll-tab {
    animation: down 3s infinite;

    @keyframes down {
        from {
            transform: translateY(-100%);
        }
        to {
            transform: translateY(300%);
        }
    }
}

.scroll-hint {
    @apply font-bold text-white first:text-[48px] last:text-[84px] overflow-hidden max-sm:first:text-[24px] max-sm:last:text-[48px];
}
</style>
