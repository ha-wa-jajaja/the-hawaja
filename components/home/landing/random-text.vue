<template>
    <div
        class="w-fit h-fit relative title-wrapper"
        ref="titleWrapper"
    >
        <div
            class="w-full h-full absolute inset-0 bg-black overlay z-10"
            ref="overlay"
        ></div>
        <div
            class="text-[10vw] roboto z-0 font-semibold glitch"
            :data-text="props.content"
        >
            {{ props.content }}
        </div>
    </div>
</template>

<script setup>
import gsap from "gsap";

const props = defineProps({
    content: {
        type: String,
        default: "",
    },
    timeout: {
        type: Number,
        default: 0,
    },
});

const titleWrapper = ref(null);
const overlay = ref(null);
function animateClip() {
    gsap.timeline({
        defaults: {
            ease: "power2.inOut",
        },
    })
        .to(titleWrapper.value, {
            "--clip": "0%",
            duration: 0.8,
        })
        .to(
            overlay.value,
            { "--clip": "100%", duration: 0.8 },
            0.6
        );
}

onMounted(async () => {
    await nextTick();
    setTimeout(animateClip, props.timeout);
});
</script>

<style lang="scss" scoped>
.title-wrapper {
    --clip: 100%;
    -webkit-clip-path: inset(0 var(--clip) 0 0);
    clip-path: inset(0 var(--clip) 0 0);

    .overlay {
        --clip: 0%;
        -webkit-clip-path: inset(0 0 0 var(--clip));
        clip-path: inset(0 0 0 var(--clip));
    }
}

.glitch {
    color: white;
    position: relative;
    margin: 0 auto;
}
@keyframes noise-anim {
    $steps: 20;
    @for $i from 0 through $steps {
        #{percentage($i*(1/$steps))} {
            clip: rect(
                random(100) + px,
                9999px,
                random(100) + px,
                0
            );
        }
    }
}
.glitch:after {
    content: attr(data-text);
    position: absolute;
    left: 2px;
    text-shadow: -1px 0 red;
    top: 0;
    color: white;
    overflow: hidden;
    clip: rect(0, 900px, 0, 0);
    animation: noise-anim 2s infinite linear
        alternate-reverse;
}

@keyframes noise-anim-2 {
    $steps: 20;
    @for $i from 0 through $steps {
        #{percentage($i*(1/$steps))} {
            clip: rect(
                random(150) + px,
                9999px,
                random(150) + px,
                0
            );
        }
    }
}
.glitch:before {
    content: attr(data-text);
    position: absolute;
    left: -2px;
    text-shadow: 1px 0 blue;
    top: 0;
    color: white;
    overflow: hidden;
    clip: rect(0, 900px, 0, 0);
    animation: noise-anim-2 3s infinite linear
        alternate-reverse;
}
</style>
