// initialize kaboom context
kaboom({
  global: true,
  fullscreen: true,
  height: 800,
  canvas: document.querySelector("#game"),
  scale: 1,
  debug: true,
  background: [0, 0, 0, 0],
})

// loads sprite
loadRoot("assets/");
loadSprite("mando", "sprites/Mando1stSprite.png");
loadSprite("grogu-transit", "sprites/grogu-transit.png");
loadSprite("ground", "sprites/ground.png");


const mando = add([
  sprite("mando"),
  pos(1210, 250),
  scale(1),
]);


const grogu = add([
  sprite("grogu-transit"),
  pos(0, 0),
  scale(0.5),
]);


const movementSpeed = 100;

// keyDown("up", () => {
//   grogu.move(0, -movementSpeed);
// });

// keyDown("down", () => {
//   grogu.move(0, movementSpeed);
// });

// keyDown("left", () => {
//   grogu.move(-movementSpeed, 0);
// });

// keyDown("right", () => {
//   grogu.move(movementSpeed, 0);
// });




// addLevel([
//   '           ',
//   '     @     ',
//   '           ',
//   'xxxxxxxxxx',
//   'xxxxxxxxxx',
//   'xxxxxxxxxx',
// ], {
//   'x': [sprite('ground'),
//   solid()],
// });




// create game scenes
scene("game", () => {

  const mando = add([
    sprite("mando"),
    pos(1210, 250),
    scale(1),
  ]);


  const grogu = add([
    sprite("grogu-transit"),
    pos(0, 0),
    scale(0.5),
    body(),
    area(),
  ]);

  const movementSpeed = 1000;

  keyDown("up", () => {
    grogu.move(0, -movementSpeed);
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


  //layers
  layers(['bg', 'obj', 'ui'], 'obj')

  add([sprite, layer("obj")]);
  addLevel([
    "                           ",
    "                           ",
    "                      =    ",
    "         ====         =    ",
    "                      =    ",
    "               =      =    ",
    "===========================",
  ], {
    // define the size of each block
    width: 32,
    height: 32,
    // define what each symbol means, by a function returning a component list (what will be passed to add())
    "=": () => [
      sprite("ground"),
      area(),
      solid(),
    ],
    
  })



  //layers
  layers(['bg', 'obj', 'ui'], 'obj')

  add([sprite, layer("obj")]);


})

// start game
go("game")
