<template>
    <div
        class="project-block"
        :class="{
            'self-end': !props.left,
            'self-start': props.left,
        }"
        ref="proj_block"
    >
        <img
            :src="`/project/${props.projectData?.key}.png`"
            alt=""
            class="h-[30vh]"
        />
        <div class="proj-name roboto w-fit">
            <div class="overlay"></div>
            <p>
                {{ props.projectData.name.toUpperCase() }}
            </p>
        </div>
    </div>
</template>
<script setup>
import gsap from "gsap";
const props = defineProps({
    left: {
        type: Boolean,
        default: true,
    },
    projectData: {
        type: Object,
        default: () => {},
    },
});

const proj_block = ref();
let tl;
let ctx;
function setupAnim() {
    ctx = gsap.context((self) => {
        const img = self.selector("img");
        const nameWrap = self.selector(".proj-name");
        const overlay = self.selector(".overlay");

        gsap.set(img, { opacity: 0, yPercent: 30 });
        gsap.set(nameWrap, { opacity: 0, yPercent: 30 });

        tl = gsap
            .timeline({
                paused: true,
                defaults: {
                    ease: "expo.out",
                },
            })
            .to(img, {
                yPercent: 0,
                opacity: 1,
                duration: 1,
            })
            .to(
                nameWrap,
                { yPercent: 0, opacity: 1, duration: 1 },
                0.3
            )
            .to(
                nameWrap,
                { "--clip": "0%", duration: 0.4 },
                0.5
            )
            .to(
                overlay,
                {
                    "--clip": "100%",
                    duration: 0.4,
                },
                0.8
            );
    }, proj_block.value);
}
onMounted(() => {
    setupAnim();
    useObserver(proj_block, () => tl.play(), true);
});
</script>
<style lang="scss" scoped>
.project-block {
    @apply relative z-10;
    .proj-name {
        @apply bg-black text-white font-bold text-[64px] p-4 -translate-y-6 -translate-x-4;
        --clip: 100%;
        -webkit-clip-path: inset(0 var(--clip) 0 0);
        clip-path: inset(0 var(--clip) 0 0);
        position: relative;

        .overlay {
            @apply absolute w-full h-full inset-0 z-10 bg-white;
            --clip: 0%;
            -webkit-clip-path: inset(0 0 0 var(--clip));
            clip-path: inset(0 0 0 var(--clip));
        }
    }
}
</style>
