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
loadSprite("ground", "sprites/ground.png");
loadSprite("force", "sprites/force.png");
loadSprite("frogs", "sprites/Frog(Points)Sprite.png");
loadSound("theme", "sounds/FluffingaDuck.mp3");

// Level Sprites
loadSprite("50", "sprites/slicedtiles/slicedtiles50.png");
loadSprite("51", "sprites/slicedtiles/slicedtiles51.png");
loadSprite("52", "sprites/slicedtiles/slicedtiles52.png");
loadSprite("68", "sprites/slicedtiles/slicedtiles68.png");
loadSprite("69", "sprites/slicedtiles/slicedtiles69.png");
loadSprite("70", "sprites/slicedtiles/slicedtiles70.png");
loadSprite("9", "sprites/slicedtiles/slicedtiles9.png");
loadSprite("10", "sprites/slicedtiles/slicedtiles10.png");
loadSprite("11", "sprites/slicedtiles/slicedtiles11.png");
loadSprite("17", "sprites/slicedtiles/slicedtiles17.png");
loadSprite("18", "sprites/slicedtiles/slicedtiles18.png");
loadSprite("19", "sprites/slicedtiles/slicedtiles19.png");
loadSprite("25", "sprites/slicedtiles/slicedtiles25.png");
loadSprite("26", "sprites/slicedtiles/slicedtiles26.png");
loadSprite("27", "sprites/slicedtiles/slicedtiles27.png");
loadSprite("18", "sprites/slicedtiles/slicedtiles18.png");




const mando = add([
  sprite("mando"),
  pos(1210, 250),
  scale(1),
]);




function shoot(obj) {
  const p = add([
    scale(0.5),
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
    pos(1210, 250),
    scale(1),
  ]);



  const grogu = add([
    sprite("grogu-transit"),
    pos(20, 0),
    scale(0.05),
    body(),
    area(),
  ]);





  const movementSpeed = 100;


  keyDown("up", () => {
    grogu.jump(300);
  });

  keyDown("down", () => {
    grogu.move(0, movementSpeed);
  });

  keyDown("left", () => {
    grogu.move(-movementSpeed, 0);
  });

  keyDown("right", () => {
    grogu.move(movementSpeed, 0);
  });



  keyPress("space", () => {
    shoot({
      sprite: "force",
      speed: 500,
      angle: grogu.angle,
      pos: grogu.pos.add(grogu.width / 2, grogu.height / 2),
    });
  });



  //layers
  layers(['bg', 'obj', 'ui'], 'obj')

  addLevel([
    "                              ",
    "                              ",
    "                              ",
    "                              ",
    "                              ",
    "wwwwwwwwwwwwwwwe  qwwwwwwwwwww",
    "sssssssssssssssd  ==ssssssssss",
    "                  ==          ",
    "                  ==          ",
    "           qwwwwww==          ",
    "           asssssssd    qwwwwe",
    "                        assssd",
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
    "=====wwwwwwwwwwwwwwwe         ",
    "=====sssssssssssssssd         ",
    "                              ",
    "                              ",
    "                     qwwwwwwww",
    "                     =========",
    "                     assssssss",
    "                              ",
    "                              ",
    "                              ",
    "                              ",
    "                              ",
    "=============           ======",
    "=============           ======",
    "=============           ======",
    "=============           ======",
    "                ==============",
    "                ==============",
    "                              ",
    "                              ",
    "                              ",
    "wwwwwwwwwwwwwwwwwe            ",
    "==================            ",
    "===========================   ",
    "sssssssssssssssssd=========   ",
    "                              ",
    "                        ======",
    "                        ======",
    "                        ======",
    "                              ",
    "         ==================   ",
    "======   ==================   ",
    "======   ==================   ",
    "======   ==================   ",
    "======                        ",
    "======                        ",
    "======                        ",
    "======wwwwwwwwwwwwwwwwwwe     ",
    "sssssssssssssssssssssss==     ",
    "                       ==     ",
    "                       ad     ",
    "                              ",
    "                              ",
    "            qwwwwwwwwwwwwwwwww",
    "            ==================",
    "            asssssssssssssssss",
    "         ==                   ",
    "      ==                      ",
    "   ==                         ",
    "                              ",
    "wwwwwwwwwwe                   ",
    "===========                   ",
    "==========================    ",
    "==========================    ",
    "===========           ====    ",
    "===========           ====    ",
    "===========           ====    ",
    "===========          ======   ",
    "wwwwwwwwwwwe         ======   ",
    "sssssssssssd                  ",
    "                              ",
    "                              ",
    "                      ========",
    "                      hjjjjjjj",
    "wwwwwwwwwwwe     qwwe hjjjjjjj",
    "sssssssssssd     assd nmmmmmmm",
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
    "w": () => [
      sprite("51"),
      area(),
      solid(),
      scale(0.5),
      pos(0, 0),
      layer("obj"),
      fixed(),
    ],
    "e": () => [
      sprite("52"),
      area(),
      solid(),
      scale(0.5),
      pos(0, 0),
      layer("obj"),
      fixed(),
    ],
    "q": () => [
      sprite("50"),
      area(),
      solid(),
      scale(0.5),
      pos(0, 0),
      layer("obj"),
      fixed(),
    ],
    "d": () => [
      sprite("70"),
      area(),
      solid(),
      scale(0.5),
      pos(0, 0),
      layer("obj"),
      fixed(),
    ],
    "s": () => [
      sprite("69"),
      area(),
      solid(),
      scale(0.5),
      pos(0, 0),
      layer("obj"),
      fixed(),
    ],
    "a": () => [
      sprite("68"),
      area(),
      solid(),
      scale(0.5),
      pos(0, 0),
      layer("obj"),
      fixed(),
    ],
    "y": () => [
      sprite("9"),
      area(),
      solid(),
      scale(0.5),
      pos(0, 0),
      layer("obj"),
      fixed(),
    ],
    "u": () => [
      sprite("10"),
      area(),
      solid(),
      scale(1),
      pos(0, 0),
      layer("obj"),
      fixed(),
    ],
    "i": () => [
      sprite("11"),
      area(),
      solid(),
      scale(0.5),
      pos(0, 0),
      layer("obj"),
      fixed(),
    ],
    "k": () => [
      sprite("19"),
      area(),
      solid(),
      scale(0.5),
      pos(0, 0),
      layer("obj"),
      fixed(),
    ],
    "j": () => [
      sprite("18"),
      area(),
      solid(),
      scale(0.5),
      pos(0, 0),
      layer("obj"),
      fixed(),
    ],
    "h": () => [
      sprite("17"),
      area(),
      solid(),
      scale(0.5),
      pos(0, 0),
      layer("obj"),
      fixed(),
    ],
    ",": () => [
      sprite("27"),
      area(),
      solid(),
      scale(0.5),
      pos(0, 0),
      layer("obj"),
      fixed(),
    ],
    "m": () => [
      sprite("26"),
      area(),
      solid(),
      scale(0.5),
      pos(0, 0),
      layer("obj"),
      fixed(),
    ],
    "n": () => [
      sprite("25"),
      area(),
      solid(),
      scale(0.5),
      pos(0, 0),
      layer("obj"),
      fixed(),
    ],


  })

  add([sprite, layer("obj")]);

});
// start game
go("game")