// Variables globales
let playerScore = 0;
let pcScore = 0;
const MAX_SCORE = 10;

// Emojis pour l'affichage
const powerEmojis = {
    feu: '🔥',
    eau: '💧',
    terre: '🌍'
};

function powerPc() {
    const powers = ['feu', 'eau', 'terre'];
    const randomIndex = Math.floor(Math.random() * powers.length);
    return powers[randomIndex];
}