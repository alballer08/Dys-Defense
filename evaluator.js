function evaluateStrength() {
    const plaintext = document.getElementById('plaintext').value.trim();
    const ciphertext = document.getElementById('ciphertext').value.trim();
    let score = 0;
    let feedback = '';

    if (plaintext === ciphertext) {
        score = 0;
        feedback = 'The plaintext and ciphertext are identical. Encryption is ineffective.';
    } else {
        const lengthScore = Math.min(ciphertext.length / plaintext.length, 1) * 3;
        const complexityScore = calculateComplexity(ciphertext);
        const similarityScore = calculateSimilarity(plaintext, ciphertext);
        const frequencyScore = calculateFrequencyScore(ciphertext);

        score = lengthScore + complexityScore + frequencyScore;

        if (similarityScore >= 0.5) {
            score = Math.min(score, 5);
            feedback = 'Ciphertext shares too many characters with plaintext. Score capped at 5.';
        } else if (lengthScore < 2) {
            feedback = 'The ciphertext is too similar in length to the plaintext, which suggests a weak encryption.';
        } else if (complexityScore < 3) {
            feedback = 'The ciphertext lacks complexity, making it easier to decipher.';
        } else if (frequencyScore < 2) {
            feedback = 'Character frequency suggests potential weaknesses in the encryption.';
        } else {
            feedback = 'The encryption appears strong based on the given data.';
        }
    }

    score = Math.min(Math.round(score), 10);

    document.getElementById('score').innerText = score;
    document.getElementById('feedback').innerText = feedback;
}

function calculateComplexity(text) {
    const uniqueChars = new Set(text);
    return Math.min(uniqueChars.size / text.length, 1) * 7;
}

function calculateSimilarity(plaintext, ciphertext) {
    const minLength = Math.min(plaintext.length, ciphertext.length);
    let sameChars = 0;
    
    for (let i = 0; i < minLength; i++) {
        if (plaintext[i] === ciphertext[i]) {
            sameChars++;
        }
    }

    return sameChars / minLength;
}

function calculateFrequencyScore(text) {
    const freqMap = {};
    for (const char of text) {
        freqMap[char] = (freqMap[char] || 0) + 1;
    }

    const totalChars = text.length;
    const maxFrequency = Math.max(...Object.values(freqMap));
    const frequencyScore = 7 - (maxFrequency / totalChars * 7);

    return frequencyScore;
}
