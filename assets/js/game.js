const score = document.getElementById('your-score');
const livesLeft = document.getElementById('lives-remaining');
const startPage = document.getElementById('start-game');
const playButton = document.getElementById('play-button');
const howtoPlayPage = document.getElementById('how-to-play');
const instructionsButton = document.getElementById('instructions-btn');
const goBackButton = document.getElementById('go-back');
let groguscore = 0;
let grogulives = 1;

instructionsButton.addEventListener('click', showInstructions)
function showInstructions() {
    howtoPlayPage.style.display = "flex";
    startPage.style.display = "none";
  }
  goBackButton.addEventListener('click', showStartScreen)
  function showStartScreen() {
    startPage.style.display = "flex";
    howtoPlayPage.style.display = "none";
  }

playButton.addEventListener('click', hideStartScreen)
function hideStartScreen(){
    startPage.style.display = "none";
}
kaboom({

    global: true,
      fullscreen: true,
    width: 480,
    height: 400,
    canvas: document.querySelector("#game"),
    scale: 2,
    debug: true,
    background: [0, 0, 0, 0],
})


let isJumping = true;

// loads sprite
loadRoot("assets/");
loadSprite("grogu-transit", "sprites/grogu-transit.png");
loadSprite("jawa", "sprites/Jawa.png");
loadSprite("ground", "sprites/ground.png");
loadSprite("force", "sprites/force.png");
loadSprite("frogs", "sprites/Frog.png");
loadSprite("brick", "sprites/decor.png")
loadSprite("background", "sprites/levelsandcrawler.png");
loadSound("theme", "sounds/FluffingaDuck.mp3");
loadSprite("mando", "sprites/Mando1stSprite.png");

// const mando = add([
//     sprite("mando"),
//     pos(100, 0),
//     layer["obj"],
//     scale(.6),
//     area(),
//     body(),
//     solid(),
//     "mando",
//   ]);

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

function shoot(obj) {
    const p = add([
        scale(0.2),
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

  // VARIABLES
  const healthBar = add([
    rect(200, 15),
    pos(10, 10),
    layer("ui"),
    color(239, 85, 75),
    {
      width: 100,
      height: 10,
    },
  ]);
 
  const movementSpeed = 100;
  let jawas = [];
  const groguMaxHealth = 100;
  let groguHealth = groguMaxHealth;
  const mando = add([
    sprite("mando"),
    pos(100, 0),
    scale(10),
    area(),
    body(),
    solid(),
    "mando",
]);

  const grogu = add([
    sprite("grogu-transit"),
    pos(20,0),
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

// CAMERA
const camera = add([
    pos(0,0),
    camScale(1),
]);


  function isAlive(){
    if (grogulives <= 0){
        livesLeft.innerText = "0";
        gameOver()
    }
    else {
        groguHealth = 200;
    }
  }


  // Function to decrease grogu's health
  function decreasegroguHealth(damage) {
    groguHealth -= damage;
    updateHealthBar();
    if (groguHealth <= 0) {
      // grogu is defeated, game over logic here
        livesLeft.innerText = --grogulives;
        isAlive();
      //gameOver();
    }}


camera.onUpdate(() => {
    cameraOffsetX=grogu.pos.x-width()/2;
    cameraOffsetY=grogu.pos.y-height()/2;

    if (cameraOffsetX>=240){
        cameraOffsetX=240;

    }
   
    if(cameraOffsetY>5){
        cameraOffsetY=5;
    }
    else{
        cameraOffsetY=cameraOffsetY;
          
    }
    camPos(grogu.pos.x-cameraOffsetX,grogu.pos.y-cameraOffsetY)
    console.log(cameraOffsetX);
    console.log(cameraOffsetY);

})

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

//   FUNCTIONS

  function decreasegroguHealth(damage) {
    groguHealth -= damage;
    updateHealthBar();
    if (groguHealth <= 0) {
      // grogu is defeated, game over logic here
      gameOver();
    }

    // Update the health bar
  }


  function updateHealthBar() {
    // Calculate the width of the health bar based on the grogu's health
    const healthBarWidth = (groguHealth / groguMaxHealth) * 100;

    // Update the visual representation of the health bar
    healthBar.width = healthBarWidth;
  }


  function spawnJawaAtPosition(position, distance, speed) {
    const jawa = add([
      sprite("jawa"),
      pos(position.x, position.y),
      layer("obj"),
      scale(1),
      body(),
      area(),
      {
        damage: 1,
      },
      "jawa",
      solid(),
    ]);
    moveBackAndForth(jawa, distance, speed);

    grogu.collides("jawa", (d) => {
      if (isJumping === true) {
        destroy(d);
        groguscore++;
        score.innerText = groguscore;
      } else {
        decreasegroguHealth(jawa.damage);
      }
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

  
  function gameWin() {
    // Clear the game scene
    destroyJawas();
    destroy(grogu); 
    destroy(healthBar); 
    add([
      text("You Win!", 32),
      pos(width() / 2,1400),
      origin("center"),
      layer("ui"),
    ]);

  }

grogu.onUpdate(()=>{
    if(grogu.pos.y>1500){
        gameWin();
    }
})
// MOVEMENTS

  keyDown("up", () => {
    if(grogu.grounded())
    grogu.jump(400);
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
      speed: 3000,
      angle: grogu.angle,
      pos: grogu.pos.add(grogu.width / 10, grogu.height / 30),
    });
  });

  grogu.action(() => {
    if (grogu.grounded()) {
      isJumping = false
    }
  })



  



  const resetButton = document.querySelector("#reset-button");
  resetButton.addEventListener("click", () => {
    location.reload();
  });


  

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
// LEVEL
  addLevel([
    "=                            =",
    "=                        f   =",
    "=                        =   =",
    "=                            =",
    "=                            =",
    "=============     ============",
    "=============     ============",
    "=                 ==         =",
    "=                 ==         =",
    "=          =========         =",
    "=f         =========    ======",
    "==                      ======",
    "=                             =",
    "=                             =",
    "=                             =",
    "=========================     =",
    "=========================     =",
    "=========================     =",
    "=                             =",
    "=                             =",
    "=                             =",
    "=    =========================",
    "=    =========================",
    "=    =========================",
    "=    =========================",
    "=                             =",
    "=                             =",
    "=                             =",
    "=====================         =",
    "=====================         =",
    "=                             =",
    "=                             =",
    "=      f                      =",
    "=      =             ==========",
    "=                    ==========",
    "=              ==             =",
    "=                             =",
    "=                             =",
    "=                             =",
    "=                             =",
    "=============           =======",
    "=============           =======",
    "=============           =======",
    "=============           =======",
    "=                ==============",
    "=                ==============",
    "=                             =",
    "=                             =",
    "=                             =",
    "==================            =",
    "==================            =",
    "=======================       =",
    "=======================       =",
    "=                             =",
    "=         f                   =",
    "=         =             =======",
    "=                       =======",
    "=                             =",
    "=        ============         =",
    "=        ==================   =",
    "======   ==================   =",
    "======   ==================   =",
    "======                        =",
    "======                        =",
    "======                        =",
    "=========================     =",
    "=========================     =",
    "=                      ====   =",
    "=                      ==     =",
    "=                             =",
    "=                             =",
    "=           ===================",
    "=           ===================",
    "=       ==                    =",
    "=                  f          =",
    "=                  =          =",
    "=                             =",
    "=                             =",
    "===========                   =",
    "===========                   =",
    "==========================    =",
    "==========================    =",
    "===========           ====    =",
    "===========           ====    =",
    "===========           ====    =",
    "===========          ======   =",
    "============         ======   =",
    "============                  =",
    "=                             =",
    "=       f                     =",
    "=       =             =========",
    "=                     =========",
    "============     ==== =========",
    "============     ==== =========",
    "=                            ==",
    "=                            ==",
    "=                            ==",
    "===============================",
    "===============================",
    "===============================",


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
       scale(0.8),
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
  add([sprite("background"), layer("bg")]);
  add([sprite, layer("obj")]);
  add([sprite, layer("ui")]);


});
// start game
go("game")