function encryptCaesar() {
    const text = document.getElementById('caesar-text').value;
    const key = parseInt(document.getElementById('caesar-key').value);
    const result = caesarCipher(text, key);
    document.getElementById('caesar-result').value = result;
}

function decryptCaesar() {
    const text = document.getElementById('caesar-text').value;
    const key = parseInt(document.getElementById('caesar-key').value);
    const result = caesarCipher(text, -key);
    document.getElementById('caesar-result').value = result;
}
function caesarCipher(text, key) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const upperAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    
    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        if (alphabet.includes(char)) {
            let index = (alphabet.indexOf(char) + key) % 26;
            if (index < 0) index += 26;
            result += alphabet[index];
        } else if (upperAlphabet.includes(char)) {
            let index = (upperAlphabet.indexOf(char) + key) % 26;
            if (index < 0) index += 26;
            result += upperAlphabet[index];
        } else {
            result += char; 
        }
    }
    return result;
}

function clearText() {
    document.getElementById('caesar-text').value = '';
    document.getElementById('caesar-result').value = '';
    document.getElementById('caesar-key').value= '';
}

function copyText() {
    var resultOutput = document.getElementById('caesar-result');
    resultOutput.select();
    resultOutput.setSelectionRange(0, 99999); 
    document.execCommand('copy');

    var copyButton = document.querySelector('.copy-btn');
    copyButton.innerHTML = '<i class="fas fa-check"></i> Copied';
    copyButton.classList.add('copied');

    setTimeout(function() {
        copyButton.innerHTML = '<i class="fas fa-copy"></i> Copy';
        copyButton.classList.remove('copied');
    }, 2000);
}