//random game
let gamesLinks = [
    "./pages/XO.html",
    "./pages/aimTest.html",
    "./pages/memoryGame.html",
    /*"./pages/hangMan.html",*/
];
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
