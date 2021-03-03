/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import CollisionDetector from "./CollisionDetector";
import GameObject from "./GameObject";

type UpdaterFunction = (gameObject: GameObject, game: Game) => void;
type DrawerFunction = (
  gameObject: GameObject,
  game: Game,
  ctx: CanvasRenderingContext2D
) => void;

class Game {
  private ctx: CanvasRenderingContext2D;

  private _gameObjects: GameObject[] = [];

  public width: number;

  public height: number;

  private collisionDetector: CollisionDetector | null;

  /**
   *
   * @param ctx CanvasRenderingContext.
   * @param width Width of the game screen.
   * @param height Height of the game screen.
   * @param withCollisionDetector Indicates whether collisions of game objects should be detected.
   */
  constructor(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    withCollisionDetector: boolean = true
  ) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;

    if (withCollisionDetector)
      this.collisionDetector = new CollisionDetector([]);

    this.ctx.imageSmoothingEnabled = true;
    this.ctx.imageSmoothingQuality = "high";
  }

  /**
   * Calls `gameloop` regularly to change game progress.
   * @param gameLoop Loopfunction.
   * @param fps Loops per second.
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
   * Registers game objects in game.
   * @param gameObjects Game objects to register.
   */
  addGameObjects(...gameObjects: GameObject[]) {
    this._gameObjects = [...this._gameObjects, ...gameObjects];
    this.collisionDetector?.addObjects(...gameObjects);
  }

  /**
   * Unregister game objects in game.
   * @param gameObjects Game objects to unregister.
   */
  removeObjects(...gameObjects: GameObject[]) {
    gameObjects.forEach((gameObject) => {
      const index = this.getGameObjects().indexOf(gameObject);
      this._gameObjects.splice(index, 1);
    });
    this.collisionDetector?.removeObjects(...gameObjects);
  }

  /**
   * Returns all registered game objects.
   * @returns All registered game objects.
   */
  getGameObjects(): GameObject[] {
    return this._gameObjects;
  }

  /**
   * Updates all game objects.
   * @param updater Function to update each game object.
   */
  update(updater: UpdaterFunction) {
    this._gameObjects.forEach((gameObject) => {
      if (typeof updater === "function") updater(gameObject, this);
    });
  }

  /**
   * Draws all game objects on the context (ctx).
   * @param drawer Function to draw each game object.
   * @param clearScreen Specifies whether the canvas should be emptied beforehand.
   */
  draw(drawer?: DrawerFunction, clearScreen: boolean = true) {
    if (clearScreen) this.ctx.clearRect(0, 0, this.width, this.height);

    this._gameObjects.forEach((gameObject) => {
      const { x, y } = gameObject.getPosition();
      const { width, height, background } = gameObject;

      if (typeof drawer === "function") drawer(gameObject, this, this.ctx);
      else if (typeof background === "string") {
        this.ctx.fillStyle = <string>background;
        this.ctx.fillRect(x, y, width, height);
      } else {
        this.ctx.drawImage(background, x, y, width, height);
      }

      gameObject.triggerEvent("draw");
    });
  }
}

export default Game;
