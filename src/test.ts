import GameContext from "./GameContext";
import GameObject from "./GameObject";

const WIDTH = 800;
const HEIGHT = 800;

const gameScreen = <HTMLCanvasElement>document.getElementById("gameScreen");
const ctx = gameScreen.getContext("2d");

const game = new GameContext(ctx, WIDTH, HEIGHT);
const avatar = new GameObject({
  width: 100,
  height: 75,
});

game.gameObjects.push(avatar);

function gameloop() {
  game.update();
  game.draw();
}

GameContext.loop(gameloop, 10);
