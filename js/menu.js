/* this is the starting menu of the game */

function menu() {
    var cw = 505, //canvas width
        ch = 606, //canvas height
        container,
        frogger,
        game,
        start,
        select;

    //grab elements
    container = document.querySelector(".container");
    //title
    frogger = document.querySelector(".frogger");
    game = document.querySelector(".game");
    //start button
    start = document.querySelector(".start");
    //select character button
    select = document.querySelector(".select");

    //set a background
    ctx.fillStyle = "rgba(47, 38, 48, 0.87)";
    ctx.fillRect(0, 0, cw, ch);

    //whenever a click happens, start the animation for the game title
    container.addEventListener("click", function() {
        frogger.className += " animate-frogger";
        game.className += " animate-game";
        start.className += " visible";
        select.className += " visible";
    });

    //change to character selection
    select.addEventListener("click", function() {
        frogger.className = "no-display";
        game.className = "no-display";
        select.className = "no-display";
        currentScene = 2;
    });

    //start the gameplay
    start.addEventListener("click", function() {
        container.className = "no-click";
        frogger.className = "no-display";
        game.className = "no-display";
        select.className = "no-display";
        start.className = "no-display";
        currentScene = 1;
    });
}
