const generateButton = document.getElementById("generateButton");
const minLength = document.getElementById("minLength");
const maxLength = document.getElementById("maxLength");
const capitalLetters = document.getElementById("capitalLetters");
const specialChar = document.getElementById("specialChar");
const display = document.getElementById("generatedPassword");

function generatePassword(minLength, maxLength, capitalLetters, specialChar) {
    const passwordLength = Math.floor(minLength + Math.random() * (maxLength - minLength + 1));
    let result = "";
    var charStartValue = (specialChar ? 33 : 48);
    var charEndValue = (specialChar ? 126 : 122);
    for (let i = 0; i < passwordLength; i++) {
        var charValue = charStartValue + Math.floor(Math.random() * (charEndValue - charStartValue + 1));
        if (!specialChar && ((charValue >= 58 && charValue <= 64) || (charValue >= 91 && charValue <= 96))) charValue = 97 + Math.floor(Math.random() * (122 - 97 + 1));
        result += String.fromCharCode(charValue);
    }
    if (!capitalLetters) result = result.toLowerCase();
    return result;
}

function displayPassword(password) {
    display.textContent = password;
}

generateButton.addEventListener('click', function () {
    var password = generatePassword(
        parseInt(minLength.value), parseInt(maxLength.value), capitalLetters.checked, specialChar.checked);
    displayPassword(password);
});