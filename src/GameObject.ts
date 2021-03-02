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
  name?: any;
}

class GameObject extends EventSystem {
  public name: any;

  public width: number;

  public height: number;

  public background: string | CanvasImageSource;

  private _uuid: string;

  private _position: ICoords;

  constructor(config: IGameObjectConfig) {
    super();
    this.width = config.width;
    this.height = config.height;
    this._position = config.position;
    this.background = config.background || "black";
    this._position = config.position || { x: 0, y: 0 };
    this.name = config.name;
    this._uuid = v4();
  }

  get uuid() {
    return this._uuid;
  }

  setPosition(x?: number, y?: number) {
    if (typeof x === "number") this._position.x = x;
    if (typeof y === "number") this._position.y = y;

    if (typeof x === "number" || typeof y === "number") {
      this.triggerEvent("positionupdated");
    }
  }

  getPosition() {
    return this._position;
  }
}

export default GameObject;
