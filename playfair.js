function encryptPlayfair() {
    const text = document.getElementById('playfair-text').value;
    const key = document.getElementById('playfair-key').value;
    document.getElementById('playfair-result').value = playfairEncrypt(text, key);
}

function decryptPlayfair() {
    const text = document.getElementById('playfair-text').value;
    const key = document.getElementById('playfair-key').value;
    document.getElementById('playfair-result').value = playfairDecrypt(text, key);
}

function createPlayfairMatrix(key) {
    key = key.toUpperCase().replace(/[^A-Z0-9]/g, '').split('');
    const matrix = [];
    const used = new Set();
    for (const char of key) {
        if (!used.has(char)) {
            used.add(char);
            matrix.push(char);
        }
    }
    for (let i = 65; i <= 90; i++) {
        const char = String.fromCharCode(i);
        if (!used.has(char) && char !== 'J') {
            used.add(char);
            matrix.push(char);
        }
    }
    for (let i = 48; i <= 57; i++) {
        const char = String.fromCharCode(i);
        if (!used.has(char)) {
            used.add(char);
            matrix.push(char);
        }
    }
    return matrix;
}

function playfairEncrypt(text, key) {
    const matrix = createPlayfairMatrix(key);
    text = text.toUpperCase().replace(/J/g, 'I').replace(/[^A-Z0-9]/g, '');
    if (text.length % 2 !== 0) text += 'X';
    
    let result = '';
    for (let i = 0; i < text.length; i += 2) {
        const a = text[i];
        const b = text[i + 1];
        const [r1, c1] = findPosition(matrix, a);
        const [r2, c2] = findPosition(matrix, b);
        if (r1 === r2) {
            result += matrix[r1 * 6 + (c1 + 1) % 6];
            result += matrix[r2 * 6 + (c2 + 1) % 6];
        } else if (c1 === c2) {
            result += matrix[((r1 + 1) % 6) * 6 + c1];
            result += matrix[((r2 + 1) % 6) * 6 + c2];
        } else {
            result += matrix[r1 * 6 + c2];
            result += matrix[r2 * 6 + c1];
        }
    }
    return result;
}

function playfairDecrypt(text, key) {
    const matrix = createPlayfairMatrix(key);
    text = text.toUpperCase().replace(/J/g, 'I').replace(/[^A-Z0-9]/g, '');
    
    let result = '';
    for (let i = 0; i < text.length; i += 2) {
        const a = text[i];
        const b = text[i + 1];
        const [r1, c1] = findPosition(matrix, a);
        const [r2, c2] = findPosition(matrix, b);
        if (r1 === r2) {
            result += matrix[r1 * 6 + (c1 + 5) % 6];
            result += matrix[r2 * 6 + (c2 + 5) % 6];
        } else if (c1 === c2) {
            result += matrix[((r1 + 5) % 6) * 6 + c1];
            result += matrix[((r2 + 5) % 6) * 6 + c2];
        } else {
            result += matrix[r1 * 6 + c2];
            result += matrix[r2 * 6 + c1];
        }
    }
    return result.replace(/X$/, '');
}

function findPosition(matrix, char) {
    const index = matrix.indexOf(char);
    return [Math.floor(index / 6), index % 6];
}

function clearText() {
    document.getElementById('playfair-text').value = '';
    document.getElementById('playfair-result').value = '';
    document.getElementById('playfair-key').value = '';
}

function copyText() {
    var resultOutput = document.getElementById('playfair-result');
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