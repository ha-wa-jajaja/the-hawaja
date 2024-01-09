<template>
    <a
        :href="props.projectData?.link"
        target="_blank"
        class="project-block"
        :class="{
            'self-end': !props.left,
            'self-start': props.left,
        }"
        ref="proj_block"
    >
        <div
            class="relative proj-img overflow-hidden"
            @mousemove="toggleCursor"
            @mouseenter="showMoreBtn = true"
            @mouseleave="showMoreBtn = false"
        >
            <div
                class="proj-cursor"
                v-show="showMoreBtn"
                ref="moreBtn"
            >
                <p class="tusker text-[64px]">MORE</p>
            </div>
            <img
                :src="`/project/${props.projectData?.key}.png`"
                alt=""
                class="h-[30vh] mix-blend-difference"
            />
        </div>
        <div class="proj-name roboto w-fit">
            <div class="overlay"></div>
            <p>
                {{ props.projectData.name.toUpperCase() }}
            </p>
        </div>
    </a>
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
        const img = self.selector(".proj-img");
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

const showMoreBtn = ref(false);
const moreBtn = ref(null);
function toggleCursor(event) {
    moreBtn.value.style.transform = `translate(${
        event.offsetX - 50
    }px, ${event.offsetY - 50}px)`;
}

onMounted(() => {
    setupAnim();
    useObserver(proj_block, () => tl.play(), true);
});
</script>
<style lang="scss" scoped>
.project-block {
    @apply relative z-10 block;

    .proj-img {
        @apply hover:cursor-none;
        img {
            @apply hover:grayscale;
            transition: all 0.5s ease;
        }
        .proj-cursor {
            @apply w-[100px] h-[100px] bg-blue-600 absolute top-0 left-0 rounded-full flex items-center justify-center;
        }
    }
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
