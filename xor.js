function encryptXOR() {
    const text = document.getElementById('xor-text').value;
    const key = document.getElementById('xor-key').value;
    document.getElementById('xor-result').value = xorCipher(text, key);
}

function decryptXOR() {
    const text = document.getElementById('xor-text').value;
    const key = document.getElementById('xor-key').value;
    document.getElementById('xor-result').value = xorCipher(text, key);
}

function xorCipher(text, key) {
    let result = '';
    for (let i = 0; i < text.length; i++) {
        result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return result;
}

function clearText() {
    document.getElementById('xor-text').value = '';
    document.getElementById('xor-result').value = '';
    document.getElementById('xor-key').value = '';
}

function copyText() {
    var resultOutput = document.getElementById('xor-result');
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