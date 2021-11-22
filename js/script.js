const createElements = (size) => {
	const array = [];

	for (var i = 0; i < size; i++) {
		const index = parseInt(i) + 1;
		const image = index

		array.push({
			number: i,
			image: image
		});
	}
	return array;
}

const ordering = shuffleArray(createElements(12));
const pieces = ordering.length;
const perline = 3;
const lines = pieces / 3;
const selected = [];

const render = (list) => {

	clearGame(game);

	list.forEach(function(img, i) {

		const piece = document.createElement('div');
		const index = document.createTextNode(list[i].image);

		piece.classList.add('puzzle_piece');

		piece.dataset.position = i;	

		piece.appendChild(index);
		game.appendChild(piece);
	});	

	addListenerToBlock();
}

const addListenerToBlock = () => {
	Array.from(game.children).forEach(function(item) {
		item.addEventListener('click', select);
	});	
}

const clearGame = (game) => {
	while(game.firstChild) {
		game.removeChild(game.lastChild);
	}
}

const move = (position) => {

	const select = getSelectedPart();
	const firstIndex = select[0];
	const lastIndex = select[1];

	if(identifyMovement(firstIndex, lastIndex)) {

		toggle(firstIndex, lastIndex);
		render(ordering);	

		window.setTimeout(function() {
			checkVictory();
		}, 300);
	}
}

const checkVictory = () => {
	if(countScore() == pieces) {
		alert('parabéns, ganhou!');
	}
}

const countScore = () => {
	var orderedNumbers = 0;
	for (var i = 0; i < ordering.length; i++) {
		if(ordering[i].number == i) {
			orderedNumbers = parseInt(orderedNumbers) +1;
		}	
	}
	return orderedNumbers;
}

const storeSelectedPart = (position) => {
	selected.push(position);
}

const animateGame = (index) => {
	const element = document.getElementsByClassName('puzzle_piece')[index];
	element.classList.add('selected-animation');
}

const select = (event) => {

	const target = event.target;
	const position = target.dataset.position;
	const selected_part = getSelectedPart();

	// posição não selecionada
	if(selected.includes(position) == false) {
		if(selected_part.length == 0) {
			storeSelectedPart(position);
			animateGame(position);
		} else {
			if(identifyMovement(selected_part[0], position)) {
				storeSelectedPart(position);
				animateGame(position);
				window.setTimeout(function() {
					move(position);		
					reseteSelectPart();
				}, 600);				
			}
		}		
	}
	return;
}

const identifyMovement = (firstSelect, lastSelect) => {

	const isLeft  = parseInt(firstSelect) - 1 == lastSelect ? true : false;
	const irRight = parseInt(firstSelect) + 1 == lastSelect ? true : false;
	const isDown  = ((firstSelect <= (lines -1) * (perline) -1) && (parseInt(firstSelect) + 3 == lastSelect)) ? true : false;
	const isUp    = (firstSelect >= perline && parseInt(firstSelect) - 3 == lastSelect) ? true : false;

	switch(true) {
		case isLeft: 
			return true;
			break;
		case irRight: 
			return true;
			break;
		case isDown: 
			return true;
			break;
		case isUp: 
			return true;
			break;									
		default:
			return false;
			break;			
	}
}

const toggle = (firstSelect, lastSelect) => {
	temp = ordering[firstSelect];
	ordering[firstSelect] = ordering[lastSelect];
	ordering[lastSelect] = temp;	
}

const getSelectedPart = () => {
	return selected;
}

const reseteSelectPart = () => {
	selected.splice(0, 2);
}

const game = document.getElementById('game');

render(ordering);