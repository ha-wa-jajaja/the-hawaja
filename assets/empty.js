/*
    Landed by Yasin Burak KALKAN
    Yasin Burak Kalkan | Front-End Developer
    www.yasinkalkan.com
*/

$(document).ready(documentReady);

function documentReady() {
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

    let currentText = $(".effect-text-container h1").text();

    let currentTextCollection = new Array();

    let characterCount = 0;

    let characterSpeed = 100;

    pushCurrentTextChrachters();

    function pushCurrentTextChrachters() {
        for (let i = 0; i < currentText.length; i++) {
            let currentCharacter = currentText.slice(
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
            result = currentText.slice(0, characterCount);

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
        console.log(getRandomText());

        $(".effect-text-container h1").text(
            getRandomText()
        );
        let elements = $(".effect-text-container h1").text(
            getRandomText()
        );
    }
}
