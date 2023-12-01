<template>
    <div class="text-[72px] roboto">{{ output }}</div>
</template>
<script setup>
const props = defineProps({
    content: {
        type: String,
        default: "",
    },
});
const theLetters = "1234567890abc!#%&^+=-";
const speed = 30;
const increment = 6;

const clen = ref(props.content.length);
let si = 0;
let stri = 0;
let block = "";
let fixed = "";

const output = ref("");

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

onMounted(() => {
    rustle(clen.value * increment + 1);
});
</script>
<style lang="scss">
.roboto {
    font-family: "Roboto Mono", monospace;
    font-weight: 400;
}
</style>
