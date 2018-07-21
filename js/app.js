/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

/*
 * Create a list that holds all of your cards
 */
let card = document.getElementsByClassName("card");
// array of all cards in deck
let cards = [...card];
console.log(cards);

//the deck of cards
const deck = document.getElementById("card-deck");
// array of opened cards
var openedList = [];

// matched cards
let matchedCards = document.getElementsByClassName("match");

// number of moves
let moves = 0;

// counter
let counter = document.querySelector(".moves");

// the star icon
const star = document.querySelectorAll(".fa-star");

// declare the modal
let modal = document.getElementById("pop")

 // close icon in modal
 let closeicon = document.querySelector(".close");

  // stars list
 let starsList = document.querySelectorAll(".stars li");

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
// Fisher-Yates (aka Knuth) Shuffle( shuffle cards on the game board)
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// execute the function generateNewBoard immediately after the page has been loaded
document.body.onload = generateNewBoard();

// the loop through the shuffle array displays each card (to change the position of the cards on the game board)
function generateNewBoard(){

	cards = shuffle(cards);

	for (var i=0; i < cards.length; i++){ // removes the existing classes from cards

		deck.innerHTML = "";
		[].forEach.call(cards, function(item){
			deck.appendChild(item);
		});

		cards[i].classList.remove("show","open","match","disabled");
	}

	moves = 0;
	counter.innerHTML = 0;
	h = 0;
	m = 0;
	s = 0;

	// make the stars visible
	for(var j = 0; j < star.length; j++){
		star[j].style.color = "#ffff00"; //yellow
		star[j].style.visibility = "visible";
	}

	// when a new board is displayed the timer resets
	var timer = document.querySelector(".timer");
	timer.innerHTML = "0 mins 0 secs";
	clearInterval(myVar);
}

// the toggle method works like a switch between classes like open,show, and disabled
var displayIcon = function(){
	this.classList.toggle("open");
	this.classList.toggle("show");
	this.classList.toggle("disabled");
};

// add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
function openCard(){
	openedList.push(this); // add the selected cards to the array with opened cards
	var k = openedList.length;
	if(k === 2){
			moveCount(); //increment the move counter
			if(openedList[0].type === openedList[1].type){ //check if the cards matched
				matched();
			}
			else{
				doNotMatched();
			}
	}
}

// event listener for each card using a for loop
// on each click of a card the card display it's icon
for (var i = 0; i< cards.length; i++){
		card = cards[i];
		card.addEventListener("click",displayIcon); 
		card.addEventListener("click",openCard);
		card.addEventListener("click",end);
		
}

// function for the move counter
/*function moveCount(){
	moves++;
	counter.innerHTML = moves;
} */

//if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
function matched(){
	openedList[0].classList.add("match","disabled");
	openedList[1].classList.add("match","disabled");
	openedList[0].classList.remove("show","open","no-event");
	openedList[1].classList.remove("show","open","no-event");
	openedList = [];
}

//if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
function doNotMatched(){
	openedList[0].classList.add("unmatched");
	openedList[1].classList.add("unmatched");
	disable();
	setTimeout(function(){
		openedList[0].classList.remove("show", "open", "no-event","unmatched");
		openedList[1].classList.remove("show", "open", "no-event","unmatched");
		enable();
		openedList = [];
	},1100);
}

function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
}

function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(var i = 0; i < matchedCards.length; i++){
            matchedCards[i].classList.add("disabled");
        }
    });
}

// final score:

function moveCount(){
	moves++;
	counter.innerHTML = moves;

	// when the first move is made we start the timer
	if(moves == 1){
		h = 0;
		m = 0;
		s = 0;
		gogoTimer();
	}

	// set the number of stars
	if (moves > 7 && moves < 15){
		for( i= 0; i < 3; i++){
			if(i > 1){
				star[i].style.visibility = "collapse";
			}
		}
	}
	else if(moves > 15){
		for( i= 0; i < 3; i++){
			if(i > 0){
				star[i].style.visibility = "collapse"; // collapse is a style of visibility
			}
		}
	}
}

// timer:
var h = 0;
var m = 0;
var s = 0;
var timer = document.querySelector(".timer");
var myVar;

function gogoTimer(){
	myVar = setInterval(function(){
		timer.innerHTML = m+"mins"+s+"sec";
		s++;
		if(s == 60){
			m++;
			s = 0;
		}
		if(m == 60){
			h++;
			m = 0;
		}
	},1000);
}

// if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
function end(){
	if(matchedCards.length == 16){
		clearInterval(myVar);
		 finalT = timer.innerHTML;

        // Specifies to show the modal when initialized (Opens the modal):
        modal.classList.add("show");

        // declare star rating variable
        var rate = document.querySelector(".stars").innerHTML;

        //showing move, rating, time on modal
        document.getElementById("final").innerHTML = moves;
        document.getElementById("rate").innerHTML = rate;
        document.getElementById("time").innerHTML = finalT;

        //closeicon on modal
        close();
	};
}

function close(){
	closeicon.addEventListener("click",function(e){
		modal.classList.remove("show");
		generateNewBoard();
	});
}

function replay(){
	modal.classList.remove("show");
	generateNewBoard();
}