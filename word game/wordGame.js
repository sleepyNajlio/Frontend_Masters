let word = "";
let index = 1;
let validWord;
let first = 1;
let last = 5;
let numOfChars = 0;
let tries = 0;
let closeOne = false;

fetchWord();


async function fetchWord() {
	try {
	  const response = await fetch('https://words.dev-apis.com/word-of-the-day');
	  const data = await response.json();
	  const wordOfTheDay = data.word;
	  validWord = wordOfTheDay;
	  console.log(validWord);
	} catch (error) {
	  console.error('Error:', error);
	}
}

function handleBack(value)
{
	const Target = ".char" + index;
	const char = document.querySelector(Target);
	if (char)
		if (char.firstChild)
			char.removeChild(char.firstChild);
}

function xcongrats()
{
	console.log("dkhelt");
	for ( let i = first; i <= last ; i++)
	{
		const Target = ".char" + i;
		const char = document.querySelector(Target);
		char.style.backgroundColor = "limegreen";
	}
	alert("you win!");
}

function handleCloseWrong(char)
{
	for (let i = 0; i < 5; i++)
	{
		if (char.innerText.toLowerCase() === validWord[i])
		{
			char.style.backgroundColor = "yellow";
			closeOne = true;
		}
	}
	if (closeOne === false)
		char.style.backgroundColor = "lightgray";
}

function failed()
{
	console.log(tries);
	if (tries < 4)
	{
		for (let i = first; i <= last; i++)
		{
			const Target = ".char" + i;
			const char = document.querySelector(Target);
			console.log(char.innerText);
			if (char.innerText.toLowerCase() === validWord[i - first])
				char.style.backgroundColor = "green";
			else
				handleCloseWrong(char);
			// char.style.backgroundColor = "lightgray";
		}
		word = "";
		first += 5;
		last += 5;
		tries++;
	}
	else
	{
		alert('you lose!, the word was ' + validWord);
	}

}

function handleEnter()
{
	
	// congrats();
	
	if (index === last)
	{
		if (word === validWord)
			congrats();
		else
			failed();
	}
}

function handleChar(value)
{
	const Target = ".char" + index;
	const char = document.querySelector(Target);
	// console.log(char.innerText);
	if (char.innerText === '')
	{
		// console.log("dkhlt");
		const newChar = document.createElement('p');
		newChar.innerText = value.toUpperCase();
		char.appendChild(newChar);
		word += value.toLowerCase();
		// console.log(word);
	}
}

function isLetter(letter) {
	return /^[a-zA-Z]$/.test(letter);
}

function handleKey(value)
{
	// console.log(value);
	if (value.toLowerCase() === "backspace")
	{
		handleBack();
		if (index > first)
			index--;
			word = word.slice(0, -1);
	}
	else if (value.toLowerCase() === 'enter')
	{
		handleEnter();
	}
	else if (isLetter(value.toLowerCase()))
	{
		// console.log("sssss")
		handleChar(value);
		if (index < last)
			index++;
	}
	// console.log(index);
	// console.log(word);

}

function init()
{
	// console.log("dekhlt");
	const win = document.querySelector(".body");
	win.addEventListener("keyup", function(event) 
	{
		handleKey(event.key);
		// console.log('keypressed ', event.key);
	});
}

// fetchWord ();
init();