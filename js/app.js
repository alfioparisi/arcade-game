var startX = 200,
    startY = 400,
    allEnemies = [],
    i = 0,
    gems = [];

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = "images/enemy-bug.png";

    //set the initial position
    this.x = -(Math.random() * (500 - 100) + 100);
    this.y = Math.random() * (320 - 30) + 30;
    //set the movement speed
    //give it a range
    this.speed = Math.random() * (450 - 100) + 100;
};

/* show the hitbox
Enemy.prototype.rect = function() {
      ctx.strokeRect(this.x, this.y + 80, 100, 60);
};
*/

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //resets position when hits canvas borders
    if (this.x > 650) {
        this.x = -400;
        this.y = Math.random() * (250 - 30) + 30;
    }

    //update position
    this.x += this.speed * dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    //this.rect();
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    //loads the default image
    this.sprite = "images/char-boy.png";

    //sets the initial position
    this.x = startX;
    this.y = startY;

    //gem collected
    this.score = 0;
};

//update method
//the array with all the enemies will be passed in
Player.prototype.update = function(enemy) {
    //checks for collisions
    for (i = 0; i < enemy.length; i++) {
        if (this.x + 90 > enemy[i].x && this.x + 20 < enemy[i].x + 10 &&
        this.y + 140 > enemy[i].y + 80 && this.y + 90 < enemy[i].y + 140) {
            this.x = startX;
            this.y = startY;
            this.score = 0;
        }
    }
    //checks if the player goes off-canvas
    if (this.x >= 490 || this.x <= -50 || this.y >= 450 || this.y <= -50) {
        this.x = startX;
        this.y = startY;
    }

    //win condition
    if (this.y <= 0) {
        this.x = startX;
        this.y = startY;
        window.alert("Congratz");
    }
};

/* show hitboxes
Player.prototype.rect = function() {
    ctx.strokeRect(this.x + 20, this.y + 90, 60, 50);
};
*/

//render method is the same of Enemy class
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    //this.rect();
};

//handle input method
Player.prototype.handleInput = function(key) {
    if (key === "up") {
        this.y -= 50;
    }
    if (key === "down") {
        this.y += 50;
    }
    if (key === "right") {
        this.x += 50;
    }
    if (key === "left") {
        this.x -= 50;
    }
};


//Gems class
var Gem = function() {
    this.x = Math.random() * (350 - 120) + 120;
    this.y = Math.random() * (380 - 120) + 120;
    this.sprite = "images/Gem-blue.png";
};

Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    //show hitbox
    //ctx.strokeRect(this.x, this.y + 22, 36, 36);
};

Gem.prototype.update = function() {
    this.isCollected(player);
};

Gem.prototype.isCollected = function(plyr) {
    //check for collisions
    if (this.x < plyr.x + 80 && this.x + 36 > plyr.x + 20 &&
    this.y + 22 < plyr.y + 140 && this.y + 58 > plyr.y + 90) {
        //remove the caught gem
        gems.pop();
        //add a new gem
        gems.push(new Gem());
        //increase the score
        plyr.score++;
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player


//make enemies
for (i = 0; i < 9; i++) {
    allEnemies.push(new Enemy());
}

//make player
var player = new Player();

//make gems
gems.push(new Gem());

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function(e) {
    var allowedKeys = {
        37: "left",
        38: "up",
        39: "right",
        40: "down"
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
