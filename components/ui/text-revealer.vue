<template>
    <div
        class="relative px-4 py-8 w-fit h-fit"
        ref="wrapper"
    >
        <div class="content-wrap overflow-visible">
            <div class="content w-fit h-fit">
                <slot />
            </div>
        </div>
        <div
            class="h-full w-2 bg-slate-800 stick top-0 right-0 absolute"
        ></div>
    </div>
</template>
<script setup>
import gsap from "gsap";

const wrapper = ref(null);
const { width } = useElementBounding(wrapper);

let tl;
let ctx = ref(null);
function setupAnim() {
    ctx.value = gsap.context((self) => {
        const stick = self.selector(".stick");
        const contentWrap = self.selector(".content-wrap");
        const content = self.selector(".content");
        gsap.set(content, { scale: 0.9 });
        tl = gsap
            .timeline({
                defaults: {
                    ease: "expo.inOut",
                    duration: 0.8,
                },
            })
            .to(stick, { x: 4 - width.value }, 0)
            .to(contentWrap, { "--clip": "0" }, 0)
            .to(content, {
                scale: 1,
                duration: 0.5,
            });
    }, wrapper.value); // <- Scope!
}

function setObserver() {
    const target = wrapper.value;
    const options = {
        threshold: [0.25],
    };
    let callback = (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                tl.play();
            }
        });
    };
    let observer = new IntersectionObserver(
        callback,
        options
    );
    observer.observe(target);
}

onMounted(() => {
    setupAnim();
    setObserver();
});
</script>
<style scoped>
.content-wrap {
    --clip: 100%;
    clip-path: inset(0 0 0 var(--clip));
}
</style>
