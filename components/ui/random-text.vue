<template>
    <div
        class="text-[10vw] roboto relative z-10 font-semibold"
        :class="{
            'opacity-0':
                props.waitForPrev && !props.prevDone,
        }"
    >
        {{ output }}
    </div>
</template>
<script setup>
const props = defineProps({
    content: {
        type: String,
        default: "",
    },
    waitForPrev: {
        type: Boolean,
        default: false,
    },
    prevDone: {
        type: Boolean,
        default: false,
    },
});
const theLetters = "1234567890abc!#%&^+=-";
const speed = 20;
const increment = 6;

const clen = ref(props.content.length);
let si = 0;
let stri = 0;
let block = "";
let fixed = "";

const output = ref("&nbsp;");
const done = computed(() => output.value === props.content);
defineExpose({ done });

const nextFrame = () => {
    for (let i = 0; i < clen.value - stri; i++) {
        const num = Math.floor(
            theLetters.length * Math.random()
        );
        const letter = theLetters.charAt(num);
        block = block + letter;
    }

    if (si === increment - 1) {
        stri++;
    }

    if (si === increment) {
        fixed = fixed + props.content.charAt(stri - 1);
        si = 0;
    }

    output.value = fixed + block;
    block = "";
};

const rustle = (i) => {
    setTimeout(() => {
        if (--i) {
            rustle(i);
        }
        nextFrame(i);
        si = si + 1;
    }, speed);
};

watch(
    () => props.prevDone,
    (val) => {
        if (val && props.waitForPrev)
            rustle(clen.value * increment + 1);
    }
);

onMounted(() => {
    if (!props.waitForPrev)
        rustle(clen.value * increment + 1);
});
</script>
