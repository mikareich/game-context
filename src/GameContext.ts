/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import GameObject from "./GameObject";

type UpdaterFunction = (gameObject: GameObject, game: GameContext) => void;
type DrawerFunction = (
  gameObject: GameObject,
  game: GameContext,
  ctx: CanvasRenderingContext2D
) => void;

class GameContext {
  private ctx: CanvasRenderingContext2D;

  public gameObjects: GameObject[] = [];

  public width: number;

  public height: number;

  constructor(ctx: CanvasRenderingContext2D, width: number, height: number) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;

    this.ctx.imageSmoothingEnabled = true;
    this.ctx.imageSmoothingQuality = "high";
  }

  /**
   * Calls gameloop regularly to change game progress
   * @param gameLoop Loopfunction
   * @param fps Loops per second
   */
  static loop(gameLoop: CallableFunction, fps: number) {
    let lastTimestamp = 0;

    function newFrame(passedTime: number) {
      const deltaTime = passedTime - lastTimestamp;
      if (deltaTime >= 1000 / fps) {
        lastTimestamp = passedTime;
        gameLoop();
      }
      requestAnimationFrame(newFrame);
    }

    requestAnimationFrame(newFrame);
  }

  /**
   * Updates all gameObjects
   * @param updater Function to update each GameObject
   */
  update(updater: UpdaterFunction) {
    this.gameObjects.forEach((gameObject) => {
      if (typeof updater === "function") updater(gameObject, this);
    });
  }

  /**
   * Draws all gameObjects on the context (ctx)
   * @param drawer Function to draw each GameObject
   * @param clearScreen Specifies whether the canvas should be emptied beforehand
   */
  draw(drawer?: DrawerFunction, clearScreen: boolean = true) {
    if (clearScreen) this.ctx.clearRect(0, 0, this.width, this.height);
    this.gameObjects.forEach((gameObject) => {
      const { x, y } = gameObject.position;
      const { width, height, background } = gameObject;

      if (typeof drawer === "function") drawer(gameObject, this, this.ctx);
      else if (typeof background === "string") {
        this.ctx.fillRect(x, y, width, height);
        this.ctx.fillStyle = <string>background;
      } else {
        this.ctx.drawImage(background, x, y, width, height);
      }

      gameObject.triggerListener("draw");
    });
  }
}

export default GameContext;
