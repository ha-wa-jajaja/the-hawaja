<template>
    <div>
        {{ displayText }}
    </div>
</template>
<script setup>
const displayText = ref("");

const state = reactive({
    codeletters: "&#*+%?£@§$",
    message: 0,
    current_length: 0,
    fadeBuffer: true,
    messages: ["Hello", "World"],
});

const generateRandomString = (length) => {
    let random_text = "";
    while (random_text.length < length) {
        random_text += state.codeletters.charAt(
            Math.floor(
                Math.random() * state.codeletters.length
            )
        );
    }

    return random_text;
};

const animateIn = () => {
    if (
        state.current_length <
        state.messages[state.message].length
    ) {
        state.current_length = state.current_length + 2;
        if (
            state.current_length >
            state.messages[state.message].length
        ) {
            state.current_length =
                state.messages[state.message].length;
        }

        const message = generateRandomString(
            state.current_length
        );
        displayText.value = message;

        setTimeout(animateIn, 20);
    } else {
        setTimeout(animateFadeBuffer, 20);
    }
};

const animateFadeBuffer = () => {
    if (state.fadeBuffer === false) {
        state.fadeBuffer = [];
        for (
            let i = 0;
            i < state.messages[state.message].length;
            i++
        ) {
            state.fadeBuffer.push({
                c: Math.floor(Math.random() * 12) + 1,
                l: state.messages[state.message].charAt(i),
            });
        }
    }

    let do_cycles = false;
    let message = "";

    for (let i = 0; i < state.fadeBuffer.length; i++) {
        const fader = state.fadeBuffer[i];
        if (fader.c > 0) {
            do_cycles = true;
            fader.c--;
            message += state.codeletters.charAt(
                Math.floor(
                    Math.random() * state.codeletters.length
                )
            );
        } else {
            message += fader.l;
        }
    }

    displayText.value = message;

    if (do_cycles === true) {
        setTimeout(animateFadeBuffer, 50);
    } else {
        setTimeout(cycleText, 2000);
    }
};

const cycleText = () => {
    state.message = state.message + 1;
    if (state.message >= state.messages.length) {
        state.message = 0;
    }

    state.current_length = 0;
    state.fadeBuffer = false;
    displayText.value = "";

    setTimeout(animateIn, 200);
};

onMounted(() => {
    animateIn();
});
</script>
<style lang=""></style>
