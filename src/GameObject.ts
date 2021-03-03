/* eslint-disable no-underscore-dangle */
import { v4 } from "uuid";
import { ICoords } from "./Constants";
import EventSystem from "./EventSystem";

type CanvasImageSource =
  | HTMLImageElement
  | SVGImageElement
  | HTMLVideoElement
  | HTMLCanvasElement
  | ImageBitmap
  | OffscreenCanvas;

interface IGameObjectConfig {
  width: number;
  height: number;
  background?: string | CanvasImageSource;
  position?: ICoords;
  meta?: object;
}

type EventTypes = "newposition" | "draw" | "collision";

class GameObject extends EventSystem<EventTypes> {
  public name: any;

  public width: number;

  public height: number;

  public background: string | CanvasImageSource;

  public meta: object = {};

  private _uuid: string;

  private _position: ICoords;

  /**
   * Represents an object in the game and describes how it behaves.
   * @param config Configuration of game object
   */
  constructor(config: IGameObjectConfig) {
    super();
    this.width = config.width;
    this.height = config.height;
    this.background = config.background || "black";
    this.meta = config.meta;
    this._uuid = v4();
    this._position = config.position || { x: 0, y: 0 };
  }

  /**
   * Enables unique identification
   */
  get uuid() {
    return this._uuid;
  }

  /**
   * Assigns a new position to the object
   * @param x New x-coord
   * @param y New y-coord
   */
  setPosition(x?: number, y?: number) {
    if (typeof x === "number") this._position.x = x;
    if (typeof y === "number") this._position.y = y;

    if (typeof x === "number" || typeof y === "number") {
      this.triggerEvent("newposition");
    }
  }

  /**
   * Returns current position
   * @returns Current position
   */
  getPosition() {
    return this._position;
  }
}

export default GameObject;
