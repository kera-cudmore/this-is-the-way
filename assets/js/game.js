
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
// loadSprite("ground", "sprites/ground.png");

loadSprite("grogu-transit", "sprites/grogu-transit.png");



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




addLevel([
  '           ',
  '     @     ',
  '           ',
  'xxxxxxxxxx',
  'xxxxxxxxxx',
  'xxxxxxxxxx',
], {
  'x': [sprite('ground'),
  solid()],
});




// create game scenes
scene("game", () => {
  const grogu = add([
    sprite("grogu-transit"),
    pos(0, 0),
    scale(0.5),
  ]);

  const movementSpeed = 100;

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

  // add([sprite('grogu'), layer('ui')])
  // add([layer('obj'), solid(), 'ground']);
  add([sprite, layer("obj")]);



})

// start game
go("game")
