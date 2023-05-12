// initialize kaboom context
kaboom({
  global: true,
  fullscreen: true,
  height: 800,
  canvas: document.querySelector("#game"),
  scale: 1,
  debug: true,
  background: [0, 0, 0, 1],
})

// loads sprite
loadRoot("assets/");
loadSprite("mando", "sprites/Mando1stSprite.png");
loadSprite("ground", "sprites/ground.png");

loadSprite("grogu-transit", "sprites/grogu-transit.png");



const mando = add([
  sprite("mando"),
  pos(1210, 250),
  scale(1),
]);

const ground = add([
  sprite("ground"),
  pos(30, 320),
  scale(2),
]);


const grogu = add([
  sprite("grogu-transit"),
  pos(0, 250),
  scale(0.5),
]);


addLevel([
  '           ',
  '     @     ',
  '           ',
  'xxxxxxxxxx',
  'xxxxxxxxxx',
  'xxxxxxxxxx',
], {
  'x': [sprite('ground'), solid()],

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