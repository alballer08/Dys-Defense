function caesarCipher(text, key, encrypt = true) {
    if (!encrypt) key = -key;  // Reverse key for decryption

    return text.split('').map(char => {
        if (char.match(/[a-z]/i)) {
            let code = char.charCodeAt();
            let base = (code >= 65 && code <= 90) ? 65 : 97;  // A-Z : a-z

            return String.fromCharCode(((code - base + key) % 26 + 26) % 26 + base);
        } else if (char.match(/[0-9]/)) {
            return String.fromCharCode(((char.charCodeAt() - 48 + key) % 10 + 10) % 10 + 48);
        } else if (char.match(/[!-/:-@[-`{-~]/)) {
            let punctuationBase = 33;  // '!' character
            return String.fromCharCode(((char.charCodeAt() - punctuationBase + key) % 15 + 15) % 15 + punctuationBase);
        }
        return char;
    }).join('');
}

function encrypt() {
    const text = document.getElementById('text-input').value;
    const key = parseInt(document.getElementById('key-input').value, 10);
    const encryptedText = caesarCipher(text, key, true);
    document.getElementById('result-output').value = encryptedText;
}

function decrypt() {
    const text = document.getElementById('text-input').value;
    const key = parseInt(document.getElementById('key-input').value, 10);
    const decryptedText = caesarCipher(text, key, false);
    document.getElementById('result-output').value = decryptedText;
}

document.getElementById('clear-btn').addEventListener('click', function() {
    // Clear the results textarea
    document.getElementById('result-output').value = '';
    
    // Clear other input fields if needed
    const inputs = document.querySelectorAll('input[type="text"], textarea');
    inputs.forEach(input => input.value = '');

    document.getElementById('key-input').value = 0;
    //resets key value
});

function copyText() {
    // Get the text area element
    var resultOutput = document.getElementById('result-output');
    
    // Select the text
    resultOutput.select();
    resultOutput.setSelectionRange(0, 99999); // For mobile devices
    
    // Copy the text to the clipboard
    document.execCommand('copy');
    
    // Change the button text to "Copied" and the icon to a check mark
    var copyButton = document.querySelector('.copy-btn');
    copyButton.innerHTML = '<i class="fas fa-check"></i> Copied';

    // Reset the button text and icon after 2 seconds
    setTimeout(function() {
        copyButton.innerHTML = '<i class="fas fa-copy"></i> Copy Text';
    }, 2000);
}
