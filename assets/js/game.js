const score = document.getElementById('your-score');
const livesLeft = document.getElementById('lives-remaining');
const startPage = document.getElementById('start-game');
const playButton = document.getElementById('play-button');
const howtoPlayPage = document.getElementById('how-to-play');
const instructionsButton = document.getElementById('instructions-btn');
const goBackButton = document.getElementById('go-back');
let groguscore = 0;
let grogulives = 0;

//Event listeners for buttons
playButton.addEventListener('click', hideStartScreen)
instructionsButton.addEventListener('click',showInstructions)
goBackButton.addEventListener('click', showStartScreen)

//Functions to display and hide pages.
function hideStartScreen(){
    startPage.style.display = "none";
}
function showInstructions(){
    howtoPlayPage.style.display = "flex";
    startPage.style.display = "none";
}
function showStartScreen(){
    startPage.style.display = "flex";
    howtoPlayPage.style.display = "none";
}

// initialize kaboom context
kaboom({

    global: true,
    //   fullscreen: true,
    width: 480,
    height: 1600,
    canvas: document.querySelector("#game"),
    scale: 2,
    debug: true,
    background: [0, 0, 0, 0],
})

let isJumping = true;

// loads sprite
loadRoot("assets/");
loadSprite("mando", "sprites/Mando1stSprite.png");
loadSprite("grogu-transit", "sprites/grogu-transit.png");
loadSprite("jawa", "sprites/Jawa.png");
loadSprite("ground", "sprites/ground.png");
loadSprite("force", "sprites/force.png");
loadSprite("frogs", "sprites/Frog.png");
loadSprite("brick", "sprites/decor.png")
loadSound("theme", "sounds/FluffingaDuck.mp3");


function moveBackAndForth(jawa, distance, speed) {
  const initialPos = jawa.pos.x;
  let direction = 1;

  jawa.action(() => {
    const currentPosition = jawa.pos.x - initialPos;

    if (currentPosition >= distance || currentPosition <= 0) {
      speed *= -1;
      if (direction > 0) {
        jawa.flipX(false); // flip the sprite to face left
      } else {
        jawa.flipX(true); // flip the sprite back to face right
      }
      direction *= -1; // reverse the direction
    }

    jawa.move(speed, 0);
  });
}


// const mando = add([
//   sprite("mando"),
//   pos(1210, 250),
//   scale(1),
// ]);



function shoot(obj) {
    const p = add([
        scale(0.05),
        sprite(obj.sprite),
        pos(obj.pos),
        origin('center'),
        lifespan(1.5),
        'projectile'
    ]);

    const speed = obj.speed ?? 600;
    const angle = obj.angle ?? 0;
    const vx = speed * Math.cos(angle);
    const vy = speed * Math.sin(angle);

    p.action(() => {
        p.move(vx * dt(), vy * dt());
    });

    return p;
}



// create game scenes
scene("game", () => {

  // play("theme", { loop: true });
  // volume(0.1);

  score.innerText = groguscore;
  livesLeft.innerText = grogulives;

  // Create the health bar entity
  const healthBar = add([
    rect(300, 20),
    pos(10, 10),
    layer("ui"),
    color(239, 85, 75),
    {
      width: 100,
      height: 10,
    },
  ]);
  const mando = add([
    sprite("mando"),
    pos(20, 1520),
    scale(0.6),
    area(),
    body(),
    solid(),
    "mando",
  ]);

  let jawas = [];
  const groguMaxHealth = 100;
  let groguHealth = groguMaxHealth;
  const grogu = add([
    sprite("grogu-transit"),
    pos(20, 0),
    layer("obj"),
    scale(0.1),
    body(),
    area(),
    solid(),
    "grogu",
    {
      groguHealth,
      groguMaxHealth,
    },
  ]);

  




  // Function to decrease grogu's health
  function decreasegroguHealth(damage) {
    groguHealth -= damage;
    updateHealthBar();
    if (groguHealth <= 0) {
      // grogu is defeated, game over logic here
      gameOver();
    }

    // Update the health bar
  }

  // Function to update the health bar
  function updateHealthBar() {
    // Calculate the width of the health bar based on the grogu's health
    const healthBarWidth = (groguHealth / groguMaxHealth) * 100;

    // Update the visual representation of the health bar
    healthBar.width = healthBarWidth;
  }



  const jawaPositions = [
    vec2(20, 100),
    vec2(100, 300),
    vec2(20, 600),
    vec2(100, 400),
    vec2(40, 700),
    vec2(140, 900),
    vec2(200, 1200),
    // Add more spawn positions as needed
  ];
  const jawasConfigurations = [
    { distance: 250, speed: 70 },
    { distance: 250, speed: 70 },
    { distance: 150, speed: 70 },
    { distance: 200, speed: 70 },
    { distance: 200, speed: 70 },
    { distance: 150, speed: 70 },
    { distance: 200, speed: 70 },
    // Add more spawn positions as needed
  ];

  function spawnJawaAtPosition(position, distance, speed) {
    const jawa = add([
      sprite("jawa"),
      pos(position.x, position.y),
      layer("obj"),
      scale(0.5),
      body(),
      area(),
      {
        damage: 1,
      },
      "jawa",
      solid(),
    ]);
    moveBackAndForth(jawa, distance, speed);
    grogu.collides("jawa", () => {
      decreasegroguHealth(jawa.damage);
    });
    jawas.push(jawa);
    return jawa;
  };
  function destroyJawas() {
    for (const jawa of jawas) {
      destroy(jawa); // Remove the enemy from the game
    }

    jawas = []; // Clear the enemies array
  }

  // Spawn enemies at fixed positions
  jawaPositions.forEach((position, index) => {
    const configuration = jawasConfigurations[index];
    const distance = configuration.distance; // Use the distance value from the configuration
    const speed = configuration.speed;
    spawnJawaAtPosition(position, distance, speed);
  });
  
  action("frogs", (f) => {
        f.move(0, -10);
        f.action(() => {
          if (f.grounded()) {
            f.jump(10);
          }
        });
    });

  grogu.collides('frogs', (f) => {
    destroy(f)
    livesLeft.innerText = ++grogulives;
  })


  const movementSpeed = 100;


  keyDown("up", () => {
    grogu.jump(300);
    isJumping = true;
  });

  keyDown("down", () => {
    grogu.move(0, movementSpeed);
  });

  keyDown("left", () => {
    grogu.move(-movementSpeed, 0);
    grogu.flipX(true);
  });

  keyDown("right", () => {
    grogu.move(movementSpeed, 0);
    grogu.flipX(false);
  });


  keyPress("space", () => {
    shoot({
      sprite: "force",
      speed: 500,
      angle: grogu.angle,
      pos: grogu.pos.add(grogu.width / 10, grogu.height / 30),
    });
  });

  grogu.action(() => {
    if (grogu.grounded()) {
      ifJumping = false
    }
  })

  grogu.collides("jawa", (d) => {
    if (isJumping) {
      destroy(d);
      score.innerText = groguscore++
    } else {
      gameOver()
    }
  })

  function gameWin() {
    // Clear the game scene
    destroyJawas();
    destroy(grogu);
    destroy(healthBar);
    add([
      text("You Win!", 32),
      pos(width() / 2, height() / 2),
      origin("center"),
      layer("ui"),
    ]);

  }

  function checkCollisionWithMando() {
    grogu.collides("mando", () => {
      gameWin();
    });
  }
  grogu.action(checkCollisionWithMando);

  function gameOver() {
    destroyJawas();
    destroy(grogu);
    destroy(healthBar);


    add([
      text("Game Over", 32),
      pos(width() / 2, height() / 2),
      origin("center"),
      layer("ui"),
    ]);

    // Additional game over actions can be added here
  }

  //layers
  layers(['bg', 'obj', 'ui'])

  addLevel([
    "                              ",
    "                         f    ",
    "                         #    ",
    "                              ",
    "                              ",
    "=============     ============",
    "=============     ============",
    "                  ==          ",
    "                  ==          ",
    "           =========          ",
    " f         =========    ======",
    " #                      ======",
    "                              ",
    "                              ",
    "                              ",
    "=========================     ",
    "=========================     ",
    "=========================     ",
    "                              ",
    "                              ",
    "                              ",
    "     =========================",
    "     =========================",
    "     =========================",
    "     =========================",
    "                              ",
    "                              ",
    "                              ",
    "=====================         ",
    "=====================         ",
    "                              ",
    "                              ",
    "       f                      ",
    "       #             =========",
    "                     =========",
    "               ==             ",
    "                              ",
    "                              ",
    "                              ",
    "                              ",
    "=============           ======",
    "=============           ======",
    "=============           ======",
    "=============           ======",
    "                 =============",
    "                 =============",
    "                              ",
    "                              ",
    "                              ",
    "==================            ",
    "==================            ",
    "=======================       ",
    "=======================       ",
    "                              ",
    "          f                   ",
    "          #             ======",
    "                        ======",
    "                              ",
    "         ============         ",
    "         ==================   ",
    "======   ==================   ",
    "======   ==================   ",
    "======                        ",
    "======                        ",
    "======                        ",
    "=========================     ",
    "=========================     ",
    "                       ====   ",
    "                       ==     ",
    "                              ",
    "                              ",
    "            ==================",
    "            ==================",
    "        ==                    ",
    "                   f          ",
    "                   #          ",
    "                              ",
    "                              ",
    "===========                   ",
    "===========                   ",
    "==========================    ",
    "==========================    ",
    "===========           ====    ",
    "===========           ====    ",
    "===========           ====    ",
    "===========          ======   ",
    "============         ======   ",
    "============                  ",
    "                              ",
    "        f                     ",
    "        #             ========",
    "                      ========",
    "============     ==== ========",
    "============     ==== ========",
    "                             =",
    "                             =",
    "                             =",
    "==============================",
    "==============================",
    "==============================",


  ], {
    // define the size of each block
    width: 16,
    height: 16,
    "=": () => [
      sprite("ground"),
      area(),
      solid(),
      scale(1),
      pos(0, 0),
      layer("obj"),
      fixed(),
    ],
    "f": () => [
      sprite("frogs"),
      'frogs',
       area(),
       solid(),
       scale(0.4),
       pos(0, 0),
       layer("obj"),
       body(),
    ],
    "#": () => [
       sprite("brick"),
       area(),
       solid(),
       scale(1),
       pos(0, 0),
       layer("obj"),
       fixed(),
    ],
    

  })

  add([sprite, layer("obj")]);
  add([sprite, layer("ui")]);


});
// start game
go("game")