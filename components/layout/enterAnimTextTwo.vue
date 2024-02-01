<template>
    <div class="effect-text-container bg-white">
        <h1>{{ displayText }}</h1>
        <button @click="runEffect(0)" class="block">
            do 1
        </button>
        <button @click="runEffect(1)" class="block">
            do 2
        </button>
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

function resetAll() {
    targetText = "";
    displayText.value = "";
    currentTextCollection = new Array();
    characterCount = 0;
}

function runEffect(idx) {
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
</script>
