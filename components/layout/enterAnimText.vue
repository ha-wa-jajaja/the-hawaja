<template>
    <div class="effect-text-container">
        <p>{{ displayText }}</p>
    </div>
</template>

<script setup>
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

const runningPair = ref(false);
const runningIndex = ref(0);
function resetAll() {
    targetText = "";
    displayText.value = "";
    currentTextCollection = new Array();
    characterCount = 0;
}

function runEffect(idx) {
    runningPair.value = true;
    runningIndex.value = idx;
    resetAll();
    targetText = targetTexts[idx];
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

const emits = defineEmits(["sendPairFinished"]);
watch(displayText, (val) => {
    if (!runningPair.value) return;
    if (runningIndex.value == 0 && val === targetTexts[0]) {
        setTimeout(() => runEffect(1), 1200);
    } else if (
        runningIndex.value == 1 &&
        val === targetTexts[1]
    ) {
        runningPair.value = false;
        runningIndex.value = 0;
        emits("sendPairFinished");
    }
});

defineExpose({ runEffect });
</script>
