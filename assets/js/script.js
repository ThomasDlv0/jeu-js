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

function powerPlayer(choice) {
    return choice;
}

function playGame(playerChoice, pcChoice) {
    console.log('Joueur:', playerChoice, 'VS Ordinateur:', pcChoice);

    if (playerChoice === pcChoice) {
        return { result: 'draw', message: 'Égalité ! Vous avez choisi le même pouvoir.' };
    }

    // Le feu bat la terre
    if (playerChoice === 'feu' && pcChoice === 'terre') {
        return { result: 'victory', message: '🎉 Vous gagnez ! Le feu brûle la terre.' };
    }

    // L'eau bat le feu
    if (playerChoice === 'eau' && pcChoice === 'feu') {
        return { result: 'victory', message: '🎉 Vous gagnez ! L\'eau éteint le feu.' };
    }

    // La terre bat l'eau
    if (playerChoice === 'terre' && pcChoice === 'eau') {
        return { result: 'victory', message: '🎉 Vous gagnez ! La terre absorbe l\'eau.' };
    }

    // Tous les autres cas = défaite
    return { result: 'defeat', message: '😞 Vous perdez ! L\'ordinateur gagne ce round.' };
}

function displayResult(result) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = result.message;
    messageElement.className = 'message ' + result.result;
}

function displayChoices(playerChoice, pcChoice) {
    document.getElementById('player-choice').textContent = powerEmojis[playerChoice];
    document.getElementById('pc-choice').textContent = powerEmojis[pcChoice];
}

function updateScores() {
    document.getElementById('player-score').textContent = playerScore;
    document.getElementById('pc-score').textContent = pcScore;
}

function disableButtons() {
    document.getElementById('feu').disabled = true;
    document.getElementById('eau').disabled = true;
    document.getElementById('terre').disabled = true;
}

function enableButtons() {
    document.getElementById('feu').disabled = false;
    document.getElementById('eau').disabled = false;
    document.getElementById('terre').disabled = false;
}


function checkGameOver() {
    if (playerScore >= MAX_SCORE) {
        displayResult({
            result: 'game-over',
            message: '🏆 VICTOIRE FINALE ! Vous avez gagné la partie !'
        });
        disableButtons();
        return true;
    }

    if (pcScore >= MAX_SCORE) {
        displayResult({
            result: 'game-over',
            message: '💔 DÉFAITE ! L\'ordinateur a gagné la partie.'
        });
        disableButtons();
        return true;
    }

    return false;
}



function handlePlayerChoice(choice) {
    console.log('Bouton cliqué:', choice);

    // Récupérer les choix
    const playerChoice = powerPlayer(choice);
    const pcChoice = powerPc();

    // Afficher les choix
    displayChoices(playerChoice, pcChoice);

    // Jouer le round
    const result = playGame(playerChoice, pcChoice);

    // Mettre à jour les scores
    if (result.result === 'victory') {
        playerScore++;
    } else if (result.result === 'defeat') {
        pcScore++;
    }

    updateScores();
    displayResult(result);

    // Vérifier si la partie est terminée
    checkGameOver();
}