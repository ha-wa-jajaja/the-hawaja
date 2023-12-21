<template>
    <UiStickyPinSection
        :height="200"
        ref="pinWrapper"
        :has-on-enter="true"
        @do-on-enter="enterAnim"
    >
        <div class="container h-full">
            <UiTextRevealer ref="title">
                <h1
                    class="text-[100px] text-white tusker font-bold"
                >
                    {{ $t("who") }}
                </h1>
            </UiTextRevealer>
            <UiExpandCircle ref="circle" />
        </div>
    </UiStickyPinSection>
</template>
<script setup>
import gsap from "gsap";
const pinWrapper = ref(null);
const scrollProgress = computed(
    () => pinWrapper.value?.progress
);

const title = ref();
const circle = ref();

let tl;

function enterAnim() {
    title.value
        ?.playAnim()
        .then(() => circle.value?.playAnim());
}
onMounted(() => {});
</script>
<style lang=""></style>
