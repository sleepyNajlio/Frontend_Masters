const characters = document.querySelectorAll('.char');
const loadingDiv = document.querySelector('.loading');
const canvas = document.querySelector('body');
const ANSWER_LENGTH = 5;
const MAX_ROWS = 6;
let isloading = true;
let done = false;
const jsConfetti = new JSConfetti();



async function init() {
	let currentWord = '';
	currentRow = 0;


	const res = await fetch("https://words.dev-apis.com/word-of-the-day");
	const data = await res.json();
	const word = data.word.toUpperCase();
	console.log(word);
	const wordParts = word.split(''); 
	isloading = false;
	setLoading(isloading);

	function handleLetter(letter) {
		if (currentWord.length < ANSWER_LENGTH) {
			currentWord += letter;
		}
		else {
			//replace the last letter
			currentWord = currentWord.slice(0, -1) + letter;
		}
		characters[currentRow * ANSWER_LENGTH + currentWord.length - 1].textContent = letter;
		// console.log(currentWord);
	}

	async function handleEnter() {
		if (currentWord.length !== ANSWER_LENGTH) {
			return;
		}
		const wordMap = makeMap(wordParts);
		isloading = true;
		setLoading(isloading);
		const res = await fetch("https://words.dev-apis.com/validate-word", {
		method: 'POST', body: JSON.stringify({word: currentWord}) });
		const data = await res.json();
		const validWord = data.validWord;
		isloading = false;
		setLoading(isloading);
		// console.log(validWord);
		if (!validWord) {
			markInvalid();
			return;
		}
		const guessParts = currentWord.split('');
		for (let i = 0; i < ANSWER_LENGTH; i++) {
			if (guessParts[i] === wordParts[i]) {
				characters[currentRow * ANSWER_LENGTH + i].style.backgroundColor = 'limegreen';
				wordMap[guessParts[i]]--;
			}
		}
		for (let i = 0; i < ANSWER_LENGTH; i++) {
			if (guessParts[i] === wordParts[i]) {
				continue;
			}
			else if (wordParts.includes(guessParts[i]) && wordMap[guessParts[i]] > 0) {
				characters[currentRow * ANSWER_LENGTH + i].style.backgroundColor = 'yellow';
				wordMap[guessParts[i]]--;
			}
			else 
				characters[currentRow * ANSWER_LENGTH + i].style.backgroundColor = 'gray';
		}
		currentRow++;
		if (currentWord === word) {
			alert('You win!');
			jsConfetti.addConfetti({
				emojis: ['🌈', '⚡️', '💥', '✨', '💫', '🌸'],
			 });
			setTimeout(() => { jsConfetti.addConfetti({
				emojis: ['🌈', '⚡️', '💥', '✨', '💫', '🌸'],
		 	});}, 1000);
			done = true; 
			return;
		}
		else if (currentRow === MAX_ROWS) {
			alert('You lose! the word was ' + word + '.');
			done = true;
			return;
		}
		currentWord = '';
	}

	function handleBackspace() {
			currentWord = currentWord.slice(0, -1);
			characters[currentRow * ANSWER_LENGTH + currentWord.length].textContent = '';
	}

	document.addEventListener('keydown',function handleKeyPress(event) {
		if (done || isloading) {
			return;
		}
		const key = event.key;
		if (key === 'Enter') {
			handleEnter();
		} else if (key === 'Backspace') {
			handleBackspace();
		} else if (isLetter(key)) {
			handleLetter(key.toUpperCase());
		}
		// console.log(key);
	});
}

function isLetter(letter) {
	return /^[a-zA-Z]$/.test(letter);
}

function setLoading (isloading) {
	loadingDiv.classList.toggle('show', isloading);
}

function makeMap (array) {
	const obj = {};
	for (let i = 0; i < array.length; i++) {
		const letter = array[i];
		if (obj[letter]) {
			obj[letter]++;
		} else {
			obj[letter] = 1;
		}
	} 
	return obj;
}

function markInvalid() {
	for (let i = 0; i < ANSWER_LENGTH; i++) {
		characters[currentRow * ANSWER_LENGTH + i].classList.add("invalid");
		setTimeout(() => {
			characters[currentRow * ANSWER_LENGTH + i].classList.remove("invalid");
		}, 1000);
	}
}


init();