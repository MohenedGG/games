//start game
document.querySelector(".startGameBtn").addEventListener("click", function () {
    this.parentElement.remove();
});
let points = 0;

//if flipibg card equals
let cardOne;
let cardTow;
let equals = false;
let howFliping = 2;
let found = [];
function checking(card) {
    if (cardOne === cardTow) {
        equals = true;
        points += 5;
    }
    else {
        flipCancel(card);
    }
}

//click cards and flip
document.querySelector(".gameBoard").onclick = (event) => {
    let targ = event.target.parentElement;
    console.log(targ);
    if (
        targ.classList.contains("card") &&
        !targ.classList.contains("active") &&
        howFliping > 0
    ) {
        flipCard(targ);
        if (howFliping === 1) cardTow = targ.dataset.tech;
        else cardOne = targ.dataset.tech;
        console.log(`1 ${cardOne}`);
        console.log(`2 ${cardTow}`);
    }
};
function flipCard(card) {
    console.log(howFliping);
    howFliping--;
    checking(card)
    card.classList.add("active");
    setTimeout(() => {
        if (equals) {
            equals = false;
            found.push(card.dataset.tech);
            howFliping = 2;
        }
        else {
            if (!found.includes(card.dataset.tech))
            flipCancel(card);
        }
    }, 1750);
}
function flipCancel(card) {
    card.classList.remove("active");
    howFliping++;
}

//random game
let gamesLinks = ["./XO.html", "./aimTest.html", "./hangMan.html"];
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
