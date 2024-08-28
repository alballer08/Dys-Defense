function encryptRailFence() {
    const text = document.getElementById('railfence-text').value;
    const rails = parseInt(document.getElementById('railfence-rails').value) || 0;
    document.getElementById('railfence-result').value = railFenceEncrypt(text, rails);
}

function decryptRailFence() {
    const text = document.getElementById('railfence-text').value;
    const rails = parseInt(document.getElementById('railfence-rails').value) || 0;
    document.getElementById('railfence-result').value = railFenceDecrypt(text, rails);
}

function railFenceEncrypt(text, rails) {
    if (rails === 1) return text;
    let result = '';
    const matrix = Array.from({ length: rails }, () => []);
    let row = 0;
    let down = true;

    for (let i = 0; i < text.length; i++) {
        matrix[row].push(text[i]);
        row = down ? row + 1 : row - 1;
        if (row === rails - 1 || row === 0) down = !down;
    }

    for (const r of matrix) result += r.join('');
    return result;
}

function railFenceDecrypt(text, rails) {
    if (rails === 1) return text;
    const matrix = Array.from({ length: rails }, () => []);
    let row = 0;
    let down = true;

    for (let i = 0; i < text.length; i++) {
        matrix[row].push('*');
        row = down ? row + 1 : row - 1;
        if (row === rails - 1 || row === 0) down = !down;
    }

    let index = 0;
    for (const r of matrix) {
        for (let c = 0; c < r.length; c++) {
            r[c] = text[index++];
        }
    }

    result = '';
    row = 0;
    down = true;
    for (let i = 0; i < text.length; i++) {
        result += matrix[row].shift();
        row = down ? row + 1 : row - 1;
        if (row === rails - 1 || row === 0) down = !down;
    }

    return result;
}


function clearText() {
    document.getElementById('railfence-text').value = '';
    document.getElementById('railfence-result').value = '';
    document.getElementById('railfence-key').value = '';
}

function copyText() {
    var resultOutput = document.getElementById('railfence-result');
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