// initialize kaboom context
kaboom({
  global: true,
  width: 800,
  height: 800,
  canvas: document.querySelector("#game"),
  scale: 1,
  debug: true,
  background: [0, 0, 0, 0],
})

// loads sprite
loadRoot("assets/");
// loadSprite("mando", "sprites/Mando1stSprite.png");
loadSprite("grogu-walking", "sprites/GroguWalkingSprite.gif");

// const mando = add([
//   sprite("mando"),
//   pos(20, 0),
//   scale(2),
// ]);

const grogu = add([
  sprite("grogu-walking"),
  pos(0, 20),
  scale(2),
]);

// create game scenes
scene("game", () => {


  //layers
  layers(['bg', 'obj', 'ui'], 'obj')

  add([sprite('grogu-walking'), layer('bg')])


})

// start game
go("game")