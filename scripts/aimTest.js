"use strict";
// Start game
document.querySelector(".startGameBtn").addEventListener("click", function () {
    this.parentElement.remove();
    showTarget();
});

// Main varibles
let gameBoard = document.querySelector(".gameBoard");
let maxTargetsShow = 15;
let howTargetsShow = 0;
let points = 0;
let score = document.querySelector("#score");
let wrong = 0;
let wrongScore = document.querySelector("#wrong");

// Target logic
function showTarget() {
    if (howTargetsShow !== maxTargetsShow) {
        // Create target and select random posision for it
        gameBoard.innerHTML += `<div class="target"></div>`;
        let target = document.querySelector(".target");
        target.style.top = `${Math.floor(Math.random() * 90)}%`;
        target.style.left = `${Math.floor(Math.random() * 90)}%`;
        target.style.display = `block`;
        let clicked = false;

        // Remove target if clicked it and update points value
        target.onclick = () => {
            clicked = true;
            target.remove();
            points++;
            score.innerText = points;
            showTarget();
        };

        // Remove target if dont click it and update wrong value
        setTimeout(() => {
            if (!clicked) {
                target.remove();
                wrong++;
                wrongScore.innerText = wrong;
                showTarget();
            }
        }, 755);

        howTargetsShow++;
    } else {
        // End game and show the score
        document.querySelector(".gameContainer").innerHTML += `
    <div class="startButtonCont">
        <p>You scored ${points}/15 goals</p>
        <button class="startGameBtn" onclick="location.reload()">restart Game</button>
    </div>
    `;
    }
}

//random game
let gamesLinks = ["./XO.html", "./memoryGame.html", "./hangMan.html"];
let randomGameBtn = document.querySelector(".randomGameBtn");
randomGameBtn.addEventListener("click", function () {
    setTimeout(
        () =>
            (window.location.href =
                gamesLinks[Math.floor(Math.random() * gamesLinks.length)]),
        500
    );
});

//deta set
let deta = document.querySelector("#deta");
let year = new Date().getFullYear();
deta.innerText = year;
