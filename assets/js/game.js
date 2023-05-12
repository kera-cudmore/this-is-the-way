// initialize kaboom context
kaboom({
  global: true,
  fullscreen: true,
  height: 800,
  canvas: document.querySelector("#game"),
  scale: 1,
  debug: true,
  clearColor: [0, 0, 0, 0],
})

// loads sprite
loadRoot("assets/");
loadSprite("mando", "sprites/Mando1stSprite.png");
loadSprite("ground", "sprites/ground.png");

loadSprite("grogu-transit", "sprites/grogu-transit.png");

const mando = add([
  sprite("mando"),
  pos(1210, 159),
  scale(1),
]);

const ground = add([
  sprite("ground"),
  pos(25, 195),
  scale(2),
]);

const grogu = add([
  sprite("grogu-transit"),
  pos(0, 130),
  scale(0.5),
]);

addLevel([
  '      ',
  '  @   ',
  '      ',
  'xxxxxxxxxx',
  'xxxxxxxxxx',
  'xxxxxxxxxx',
], {
  width: 40,
  height: 40,
  'x': [sprite('ground')]
});


// create game scenes
scene("game", () => {


  //layers
  layers(['bg', 'obj', 'ui'], 'obj')

  // add([sprite('mando'), layer('ui')])
  add([layer('obj'), solid(), 'ground']);


})

// start game
go("game")