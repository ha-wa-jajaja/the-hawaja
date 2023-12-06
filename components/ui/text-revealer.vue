<template>
    <div
        class="relative p-4 w-fit h-fit bg-black"
        ref="wrapper"
    >
        <div class="content w-fit h-fit">
            <slot />
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
        const content = self.selector(".content");
        tl = gsap
            .timeline({
                defaults: { ease: "power2.inOut" },
            })
            .to(
                stick,
                { x: 4 - width.value, duration: 0.8 },
                0
            )
            .to(
                content,
                { "--clip": "0", duration: 0.8 },
                0
            )
            .to(stick, { scaleY: 0, duration: 0.3 }, 0.8);
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
.content {
    --clip: 100%;
    clip-path: inset(0 0 0 var(--clip));
}
</style>
