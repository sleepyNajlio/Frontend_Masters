let buffer = "0";
let total = 0;
let operator = null;

function handleValue(value)
{
	if (buffer === '0')
		buffer = value
	else
		buffer += value;
}

function handleOp(value)
{
	switch (value)
	{
		case 'C':
		{
			buffer = "0";
			total = 0;
			break;
		}
		case "↞":
		{
			buffer = buffer.slice(0,-1);
			if (buffer.length == 0)
				buffer = "0";
			break;
		}
		case "=":
		{
			if (operator === null)
				return;
			doOp (operator);
			buffer = "" + total;
			total = 0;
			break;
		}
		default:
		{
			if (total > 0 && operator)
				doOp(operator);
			else
			{
				operator = value;
				total = parseInt(buffer);
			}
			buffer = "0";
			break;
		}
	}
}

function doOp(operator)
{
	switch (operator)
	{
		case "÷":{
			total = total % parseInt(buffer);
			break;
		}
		case "x":
			{
			total = total * parseInt(buffer);
			break;}
		case "-":
		{
			total = total - parseInt(buffer);
			break;
		}
		case "+":
		{
			total = total + parseInt(buffer);
			break;
		}
		default:
		{
			total = parseInt(buffer);
			break;
		}
	}
}

function renderScreen(val)
{
	myScreen.textContent = val;
}

function buttonClicked(value)
{
	if (!isNaN(parseInt(value)))
		handleValue(value);
	else
		handleOp(value);
	renderScreen(buffer);
}

const myScreen = document.querySelector(".screen");
const myButtons  = document.querySelector(".buttons");

myButtons.addEventListener("click", function (event) {
	buttonClicked(event.target.innerText);
});
