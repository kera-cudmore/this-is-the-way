// initialize kaboom context
kaboom({
  global: true,
  width: 800,
  height: 800,
  canvas: document.querySelector("#game"),
  scale: 1,
  debug: true,
  background: [0, 0, 0, 1],
})

// loads sprite
loadSprite()

// create game scenes
scene("game", () => {

  //layers
  layers(['bg', 'obj', 'ui'], 'obj')


})

// start game
go("game")
