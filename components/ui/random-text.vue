<template>
    <div class="effect-text-container">
        <p>{{ displayText }}</p>
    </div>
</template>

<script setup>
const props = defineProps({
    targetText: {
        type: [String, Array],
    },
});

const chars = [
    "&",
    "#",
    "*",
    "+",
    "%",
    "?",
    "£",
    "@",
    "§",
    "$",
];

let targetTexts = ["HELLO", "WORLD"];
let targetText = "";
let displayText = ref("");
let currentTextCollection = new Array();
let characterCount = 0;
let characterSpeed = 120;

const running = ref(false);
const runningIndex = ref(0);
function resetAll() {
    targetText = "";
    displayText.value = "";
    currentTextCollection = new Array();
    characterCount = 0;
}

function runEffect(idx) {
    running.value = true;
    runningIndex.value = idx;
    resetAll();
    targetText = Array.isArray(props.targetText)
        ? props.targetText[idx]
        : props.targetText;
    pushCurrentTextChars();

    function pushCurrentTextChars() {
        for (let i = 0; i < targetText.length; i++) {
            let currentCharacter = targetText.slice(
                i,
                i + 1
            );

            currentTextCollection.push(currentCharacter);
        }
    }

    let characterCountIncreaseInterval = setInterval(
        characterCountIncrease,
        characterSpeed
    );

    function characterCountIncrease() {
        if (
            characterCount == currentTextCollection.length
        ) {
            clearInterval(characterCountIncreaseInterval);

            clearInterval(setRandomTextInterval);
        }

        characterCount++;
    }

    function getRandomText() {
        let result = "";

        if (characterCount == 0) {
            for (
                let i = 0;
                i < currentTextCollection.length;
                i++
            ) {
                let randomCharacter =
                    chars[
                        Math.floor(
                            Math.random() * chars.length
                        )
                    ];

                result += randomCharacter;
            }
        } else {
            result = targetText.slice(0, characterCount);

            for (
                let i = 0;
                i <
                currentTextCollection.length -
                    characterCount;
                i++
            ) {
                let randomCharacter =
                    chars[
                        Math.floor(
                            Math.random() * chars.length
                        )
                    ];

                result += randomCharacter;
            }
        }

        return result;
    }

    let setRandomTextInterval = setInterval(
        setRandomText,
        50
    );

    function setRandomText() {
        displayText.value = getRandomText();
    }
}

function onRunEnd() {
    running.value = false;
    runningIndex.value = 0;
    emits("sendEffectFinished");
}

const emits = defineEmits(["sendEffectFinished"]);
watch(displayText, (val) => {
    if (!running.value) return;
    if (!Array.isArray(props.targetText)) {
        if (props.targetText === val) return onRunEnd();
    } else {
        const maxIdx = props.targetText.length - 1;
        if (
            runningIndex.value !== maxIdx &&
            val === targetTexts[runningIndex.value]
        ) {
            runningIndex.value += 1;
            setTimeout(
                () => runEffect(runningIndex.value),
                800
            );
        } else if (
            runningIndex.value == maxIdx &&
            val === targetTexts[maxIdx]
        ) {
            return onRunEnd();
        }
    }
});

defineExpose({ runEffect });
</script>
