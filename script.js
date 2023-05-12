// Load the dictionary.txt file into an array
let words = [];
fetch('dictionary.txt')
  .then(response => response.text())
  .then(data => {
    words = data.split('\n');
  });

// Select words
const input = document.querySelector('#typing-input');
const wordList = document.querySelector('#word-list');
const timer = document.querySelector('#timer');
const score = document.querySelector('#score');

let currentWordIndex = 0;
let startTime = null;
let timeInterval = null;
let correctWords = 0;

function startTimer() {
  startTime = Date.now();
  timeInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
  const hours = Math.floor(elapsedTime / 3600);
  const minutes = Math.floor((elapsedTime % 3600) / 60);
  const seconds = elapsedTime % 60;
  timer.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startGame(event) {
  event.preventDefault();
  input.focus();
  wordList.innerHTML = '';
  currentWordIndex = 0;
  correctWords = 0;
  score.textContent = '0 WPM';
  startTimer();
  showNextWord();
}

function showNextWord() {
  const word = words[currentWordIndex];
  const wordElement = document.createElement('div');
  wordElement.classList.add('word');
  wordElement.textContent = word;
  wordList.appendChild(wordElement);
  input.value = '';
  input.placeholder = '';
  currentWordIndex++;
}

function checkInput() {
  const inputText = input.value.trim();
  const currentWord = words[currentWordIndex - 1];
  if (inputText === currentWord) {
    input.classList.remove('error');
    input.classList.add('success');
    correctWords++;
  } else {
    input.classList.remove('success');
    input.classList.add('error');
  }
  if (currentWordIndex === words.length) {
    endGame();
  } else {
    showNextWord();
  }
}

function endGame() {
  clearInterval(timeInterval);
  const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
  const wpm = Math.floor(correctWords / (elapsedTime / 60));
  score.textContent = `${wpm} WPM`;
  input.disabled = true;
}

const form = document.querySelector('form');
form.addEventListener('submit', startGame);
input.addEventListener('input', checkInput);
