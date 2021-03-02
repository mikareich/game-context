import CollisionDetector from "./CollisionDetector";
import GameContext from "./Game";
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
  name: "Object1",
});
const object2 = new GameObject({
  width: 100,
  height: 100,
  position: { x: 101, y: 101 },
  name: "Object2",
  background: "red",
});

const game = new GameContext(ctx, WIDTH, HEIGHT);

game.gameObjects.push(object1);
game.gameObjects.push(object2);

const collisionDetector = new CollisionDetector(game.gameObjects);

object2.setPosition(2, 2);

game.draw();
