const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('.status');
const restartBtn = document.querySelector('.restart-btn');
const resultScreen = document.querySelector('.result-screen');
const resultMessage = document.querySelector('.result-message');
const streakMessage = document.querySelector('.streak-message');
const newGameBtn = document.querySelector('.new-game-btn');
const startGameBtn = document.getElementById('start-game-btn');
const playerInputs = document.querySelector('.player-names');
const gameContainer = document.querySelector('.game');
const streakInfo = document.querySelector('.streak-info');
const player1StreakText = document.getElementById('player1-streak');
const player2StreakText = document.getElementById('player2-streak');
const player1NameText = document.getElementById('player1-name');
const player2NameText = document.getElementById('player2-name');

let currentPlayer = 'X';
let gameActive = false;
let gameState = Array(9).fill('');
let player1Name = '';
let player2Name = '';
let streak = { X: 0, O: 0 }; // Streak is reset when players are changed

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Start the game after entering player names
startGameBtn.addEventListener('click', () => {
  player1Name = document.getElementById('player1').value || 'Player 1';
  player2Name = document.getElementById('player2').value || 'Player 2';
  
  // Reset streak to zero when new players are entered
  streak = { X: 0, O: 0 };

  // Update the streak display
  player1NameText.textContent = player1Name;
  player2NameText.textContent = player2Name;
  player1StreakText.textContent = streak.X;
  player2StreakText.textContent = streak.O;

  gameActive = true;
  playerInputs.classList.add('hidden');
  gameContainer.classList.remove('hidden');
  streakInfo.classList.remove('hidden');
  statusText.textContent = `${player1Name}'S TURN (X)`;
});

// Handle cell clicks
cells.forEach((cell) => {
  cell.addEventListener('click', handleCellClick);
});

// Handle restart game
restartBtn.addEventListener('click', () => {
  resetGame();
  playerInputs.classList.remove('hidden');
  gameContainer.classList.add('hidden');
  streakInfo.classList.add('hidden');
});

// Handle new game
newGameBtn.addEventListener('click', resetGame);

function handleCellClick(event) {
  const cell = event.target;
  const index = cell.dataset.index;

  if (gameState[index] !== '' || !gameActive) return;

  gameState[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWin()) {
    streak[currentPlayer]++;
    updateStreakDisplay();
    showResultScreen(
      `${currentPlayer === 'X' ? player1Name : player2Name} WINS!`,
      streak[currentPlayer]
    );
    gameActive = false;
  } else if (gameState.every((cell) => cell !== '')) {
    showResultScreen('DRAW!', null);
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `${
      currentPlayer === 'X' ? player1Name : player2Name
    }'S TURN (${currentPlayer})`;
  }
}

function checkWin() {
  return winningConditions.some((condition) => {
    const [a, b, c] = condition;
    return (
      gameState[a] &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    );
  });
}

function updateStreakDisplay() {
  player1StreakText.textContent = streak.X;
  player2StreakText.textContent = streak.O;
}

function showResultScreen(message, streakCount) {
  resultMessage.textContent = message;
  if (streakCount !== null) {
    streakMessage.textContent = `Consecutive Wins: ${streakCount}`;
  } else {
    streakMessage.textContent = '';
  }
  resultScreen.classList.remove('hidden');
}

function resetGame() {
  gameState.fill('');
  cells.forEach((cell) => (cell.textContent = ''));
  gameActive = true;
  currentPlayer = 'X';
  resultScreen.classList.add('hidden');
}
