import Game from "./Game";
import GameObject from "./GameObject";

const WIDTH = 800;
const HEIGHT = 800;

const gameScreen = <HTMLCanvasElement>document.getElementById("gameScreen");
gameScreen.width = WIDTH;
gameScreen.height = HEIGHT;
const ctx = gameScreen.getContext("2d");

const configObject = {
  width: 100,
  height: 100,
};
const object1 = new GameObject({
  ...configObject,
  meta: {
    name: "hey",
  },
});
const object2 = new GameObject({
  width: 100,
  height: 100,
  position: { x: 200, y: 0 },
  background: "red",
  meta: {
    name: "ho",
  },
});

const game = new Game(ctx, WIDTH, HEIGHT);

game.addGameObjects(object1, object2);

const updater = () => {
  const { x, y } = object2.getPosition();
  object2.setPosition(x - 1, y);
  game.draw();
};

Game.loop(updater, 100);
