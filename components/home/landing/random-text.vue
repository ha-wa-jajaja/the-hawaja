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
            class="text-[10vw] roboto relative z-10 font-semibold"
        >
            {{ displayContent }}
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

const displayContent = ref("");
const codeletters = "&#*+%?£@§$";
let currentLength = 0;
let fadeBuffer = false;

const generateRandomString = (length) => {
    let randomText = "";
    while (randomText.length < length) {
        randomText += codeletters.charAt(
            Math.floor(Math.random() * codeletters.length)
        );
    }
    return randomText;
};

const animateIn = () => {
    if (currentLength < props.content.length) {
        currentLength = currentLength + 2;
        if (currentLength > props.content.length) {
            currentLength = props.content.length;
        }

        const newMessage =
            generateRandomString(currentLength);
        displayContent.value = newMessage;

        setTimeout(animateIn, 20);
    } else {
        setTimeout(animateFadeBuffer, 20);
    }
};

const animateFadeBuffer = () => {
    if (fadeBuffer === false) {
        fadeBuffer = [];
        for (let i = 0; i < props.content.length; i++) {
            fadeBuffer.push({
                c: Math.floor(Math.random() * 12) + 1,
                l: props.content.charAt(i),
            });
        }
    }

    let doCycles = false;
    let newMessage = "";

    for (let i = 0; i < fadeBuffer.length; i++) {
        const fader = fadeBuffer[i];
        if (fader.c > 0) {
            doCycles = true;
            fader.c--;
            newMessage += codeletters.charAt(
                Math.floor(
                    Math.random() * codeletters.length
                )
            );
        } else {
            newMessage += fader.l;
        }
    }

    displayContent.value = newMessage;

    if (doCycles === true) {
        setTimeout(animateFadeBuffer, 50);
    } else {
        setTimeout(cycleText, 2000);
    }
};

const cycleText = () => {
    currentLength = 0;
    fadeBuffer = false;
    displayContent.value = "";

    setTimeout(animateIn, 200);
};

const titleWrapper = ref(null);
const overlay = ref(null);
function animateClip() {
    gsap.timeline({
        defaults: {
            ease: "power2.inOut",
            duration: 0.3,
        },
    })
        .to(titleWrapper.value, { "--clip": "0%" })
        .to(overlay.value, { "--clip": "100%" }, 0.2);
}

onMounted(async () => {
    await nextTick();
    setTimeout(animateClip(), 500);
    setTimeout(animateIn(), 800);
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
</style>
