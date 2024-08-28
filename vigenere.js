function encryptVigenere() {
    const text = document.getElementById('vigenere-text').value;
    const key = document.getElementById('vigenere-key').value;
    const result = vigenereCipher(text, key, 'encrypt');
    document.getElementById('vigenere-result').value = result;
}

function decryptVigenere() {
    const text = document.getElementById('vigenere-text').value;
    const key = document.getElementById('vigenere-key').value;
    const result = vigenereCipher(text, key, 'decrypt');
    document.getElementById('vigenere-result').value = result;
}

function vigenereCipher(text, key, mode) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    let keyIndex = 0;

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const isLower = char === char.toLowerCase(); // Check if character is lowercase
        const charUpper = char.toUpperCase(); // Convert character to uppercase for processing

        if (alphabet.indexOf(charUpper) !== -1) {
            const textCharIndex = alphabet.indexOf(charUpper);
            const keyCharIndex = alphabet.indexOf(key[keyIndex % key.length].toUpperCase());

            let newIndex;
            if (mode === 'encrypt') {
                newIndex = (textCharIndex + keyCharIndex) % alphabet.length;
            } else if (mode === 'decrypt') {
                newIndex = (textCharIndex - keyCharIndex + alphabet.length) % alphabet.length;
            }

            const newChar = alphabet[newIndex];
            result += isLower ? newChar.toLowerCase() : newChar; // Preserve original case
            keyIndex++;
        } else {
            result += char; // Non-alphabetic characters are added unchanged
        }
    }
    return result;
}

function clearText() {
    document.getElementById('vigenere-text').value = '';
    document.getElementById('vigenere-result').value = '';
    document.getElementById('vigenere-key').value = '';
}

function copyText() {
    var resultOutput = document.getElementById('vigenere-result');
    resultOutput.select();
    resultOutput.setSelectionRange(0, 99999); // For mobile devices
    document.execCommand('copy');

    var copyButton = document.querySelector('.copy-btn');
    copyButton.innerHTML = '<i class="fas fa-check"></i> Copied';
    copyButton.classList.add('copied');

    setTimeout(function() {
        copyButton.innerHTML = '<i class="fas fa-copy"></i> Copy';
        copyButton.classList.remove('copied');
    }, 2000);
}