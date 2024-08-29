function encryptAtbash() {
    const text = document.getElementById('atbash-text').value;
    const result = atbashCipher(text);
    document.getElementById('atbash-result').value = result;
}

function decryptAtbash() {
    const text = document.getElementById('atbash-text').value;
    const result = atbashCipher(text);  // Same function for encryption and decryption
    document.getElementById('atbash-result').value = result;
}

function atbashCipher(text) {
    const alphabetUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const reversedAlphabetUpper = 'ZYXWVUTSRQPONMLKJIHGFEDCBA';
    const alphabetLower = 'abcdefghijklmnopqrstuvwxyz';
    const reversedAlphabetLower = 'zyxwvutsrqponmlkjihgfedcba';
    
    return text.split('').map(char => {
        if (alphabetUpper.indexOf(char) !== -1) {
            // Handle uppercase letters
            const index = alphabetUpper.indexOf(char);
            return reversedAlphabetUpper[index];
        } else if (alphabetLower.indexOf(char) !== -1) {
            // Handle lowercase letters
            const index = alphabetLower.indexOf(char);
            return reversedAlphabetLower[index];
        } else {
            // Non-alphabetic characters remain unchanged
            return char;
        }
    }).join('');
}

function clearText() {
    document.getElementById('atbash-text').value = '';
    document.getElementById('atbash-result').value = '';
}

function copyText() {
    var resultOutput = document.getElementById('atbash-result');
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
