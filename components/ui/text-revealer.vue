<template>
    <div class="relative px-3 py-2 w-fit h-fit" ref="wrapper">
        <div class="content-wrap overflow-visible">
            <div
                class="content w-fit h-fit min-2lg:text-[80px] text-[64px] text-white tusker font-bold"
            >
                {{ props.content }}
            </div>
        </div>
        <div
            class="h-full w-2 bg-slate-800 stick top-0 right-0 absolute bg-opacity-70"
        ></div>
    </div>
</template>
<script setup>
import gsap from "gsap";

const props = defineProps({
    content: {
        type: String,
        default: "",
    },
});

const wrapper = ref();
const { width } = useElementBounding(wrapper);

const emits = defineEmits(["animEnd"]);
let tl;
let ctx;
const refTl = shallowRef();
function setupAnim() {
    ctx = gsap.context((self) => {
        const stick = self.selector(".stick");
        const contentWrap = self.selector(".content-wrap");
        const content = self.selector(".content");
        gsap.set(content, { scale: 0.8 });
        gsap.set(stick, { scaleY: 0 });
        tl = gsap
            .timeline({
                paused: true,
                defaults: {
                    ease: "expo.inOut",
                    duration: 0.8,
                },
            })
            .to(stick, { scaleY: 1, duration: 0.4 })
            .to(stick, { x: 4 - width.value })
            .to(contentWrap, { "--clip": "0" }, "<")
            .to(content, {
                scale: 1,
                duration: 0.2,
                ease: "none",
            });
        refTl.value = tl;
    }, wrapper.value); // <- Scope!
}

function playAnim() {
    return new Promise((resolve) => tl.play().call(() => resolve()));
}
defineExpose({ playAnim, refTl });

onMounted(() => {
    setupAnim();
});
onUnmounted(() => {
    ctx.revert();
});
</script>
<style scoped>
.content-wrap {
    --clip: 100%;
    clip-path: inset(0 0 0 var(--clip));
}
</style>
