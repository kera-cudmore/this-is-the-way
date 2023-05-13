const score = document.getElementById('your-score');
const livesLeft = document.getElementById('lives-remaining');

let playerscore = 0;
let playerlives = 0;

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


// loads sprite
loadRoot("assets/");
loadSprite("mando", "sprites/Mando1stSprite.png");
loadSprite("grogu-transit", "sprites/grogu-transit.png");
loadSprite("jawa", "sprites/Jawa.png");
loadSprite("ground", "sprites/ground.png");
loadSprite("force", "sprites/force.png");
loadSprite("frogs", "sprites/Frog(Points)Sprite.png");
loadSound("theme", "sounds/FluffingaDuck.mp3");


function moveBackAndForth(jawa, distance, speed) {
    const initialPos = jawa.pos.x;

    jawa.action(() => {
        const currentPosition = jawa.pos.x - initialPos; // Calculate the current position relative to the initial position

        if (currentPosition >= distance || currentPosition <= 0) {
            speed *= -1; // Reverse the speed to change direction
          }
      
          // Move the enemy in the current direction
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

  score.innerText = playerscore;
  livesLeft.innerText = playerlives;

  const mando = add([
    sprite("mando"),
    pos(20, 1510),
    scale(0.6),
    area(),
  ]);


  const jawaPositions = [
    vec2(100, 100),
    vec2(200, 200),
    vec2(300, 300),
    // Add more spawn positions as needed
  ];
  
  function spawnJawaAtPosition(position) {
    const jawa= add([
        sprite("jawa"),
        pos(position.x,position.y),
        scale(0.5),
        body(),
        area(),
    ]);
    moveBackAndForth(jawa,200,50);
  }
  
  // Spawn enemies at fixed positions
  jawaPositions.forEach((position) => {
    spawnJawaAtPosition(position);
  });
  

  const grogu = add([
    sprite("grogu-transit"),
    pos(20, 0),
    scale(0.05),
    body(),
    area(),
  ]);

  grogu.collides('frogs', (f) => {
    destroy(f)
    livesLeft.innerText = ++playerlives;
  })


  const movementSpeed = 100;


  keyDown("up", () => {
    grogu.jump(300);
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

  //layers
  layers(['bg', 'obj', 'ui'], 'obj')

  addLevel([
    "                              ",
    "                         f    ",
    "                              ",
    "                              ",
    "                              ",
    "=============     ============",
    "=============     ============",
    "                  ==          ",
    "                  ==          ",
    "           =========          ",
    " f         =========    ======",
    "                        ======",
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
    "                              ",
    "                     =========",
    "                f    =========",
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
    "                              ",
    "                   f    ======",
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
    "                              ",
    "                              ",
    "                              ",
    "                              ",
    "===========  f                ",
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
    "   f                          ",
    "                      ========",
    "                      ========",
    "============     ==== ========",
    "============     ==== ========",
    "                             =",
    "                             =",
    "                             =",
    "$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$",
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
        scale(0.6),
        pos(0, 0),
        layer("obj"),
        body(),
      ],
   
  })

  add([sprite, layer("obj")]);

});
// start game
go("game")