"use strict";

// Cards mixing
let cardsMixing = Array.from(document.querySelectorAll(".card"));
for (let i = cardsMixing.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [cardsMixing[i], cardsMixing[j]] = [cardsMixing[j], cardsMixing[i]];
}

// Remove old cards frome the page
let gameBoard = document.querySelector(".gameBoard");
gameBoard.innerHTML = ``;

// add the mixed cards to the page
cardsMixing.forEach((card) => gameBoard.append(card));

// Start game
let started = false;
document.querySelector(".startGameBtn").addEventListener("click", function () {
    this.parentElement.remove();
    // Fliping card before start
    cardsMixing.forEach(card => card.classList.add("active"));
    setTimeout(() => {
        cardsMixing.forEach(card => card.classList.remove("active"));
        started = true;
    }, 1500)
});

let points = 0;
let wrongPoints = 0;
let wrong = document.querySelector("#wrong");
let score = document.querySelector("#score");
let cards = [];
let canFliping = true;
let found = [];

// Flip card logic
gameBoard.onclick = (event) => {
    let targ = event.target.closest(".card");

    if (
        targ &&
        targ.classList.contains("card") &&
        !targ.classList.contains("active") &&
        canFliping
    ) {
        flipCard(targ);
    }
};

function flipCard(card) {
    card.classList.add("active");
    cards.push(card);

    if (cards.length === 2) {
        canFliping = false;

        setTimeout(() => {
            if (cards[0].dataset.tech === cards[1].dataset.tech) {
                found.push(cards[0].dataset.tech);
                points += 5;
                score.innerText = points;
                if (points === 45) win();
            } else {
                wrongPoints++;
                wrong.innerText = wrongPoints;
                cards.forEach(flipCancel);
            }

            cards = [];
            canFliping = true;
        }, 1000);
    }
}

function flipCancel(card) {
    card.classList.remove("active");
}

//Timer and win
let timerSpan = document.querySelector("#timer");
let timer = 0;
setInterval(() => {
    if (started) {
        timer++;
        timerSpan.innerText = timer;
        if (timer > 59) lost();
    }
}, 1000);

function win() {
    let winScrean = `
    <div class="startButtonCont">
        <p>your time is: ${timer}S</p>
        <button class="startGameBtn" onclick="location.reload()">restart Game</button>
    </div>
    `;
    document.querySelector("#gameContainer").innerHTML += winScrean;
    started = false;
}

// Lost
function lost() {
    let lostScrean = `
    <div class="startButtonCont">
        <p>You Lost</p>
        <button class="startGameBtn" onclick="location.reload()">restart Game</button>
    </div>
    `;
    document.querySelector("#gameContainer").innerHTML += lostScrean;
    started = false;
    canFliping = false;
}

// Random game
let gamesLinks = ["./XO.html", "./aimTest.html" /*, "./hangMan.html"*/];
let randomGameBtn = document.querySelector(".randomGameBtn");
randomGameBtn.addEventListener("click", function () {
    setTimeout(() => {
        window.location.href =
            gamesLinks[Math.floor(Math.random() * gamesLinks.length)];
    }, 500);
});

// Footer year
let deta = document.querySelector("#deta");
let year = new Date().getFullYear();
deta.innerText = year;
