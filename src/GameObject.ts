/* eslint-disable no-underscore-dangle */
import { v4 } from "uuid";
import { ICoords } from "./Constants";

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

interface EventListener {
  type: string;
  listener: (GameObject, ...params: any[]) => void;
}

type EventTypes = "positionupdated" | "draw" | "collided";

class GameObject {
  public name: any;

  public width: number;

  public height: number;

  public background: string | CanvasImageSource;

  private _uuid: string;

  private _position: ICoords;

  private eventListeners: EventListener[] = [];

  constructor(config: IGameObjectConfig) {
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
      this.triggerListener("positionupdated");
    }
  }

  getPosition() {
    return this._position;
  }

  public triggerListener(type: EventTypes, ...params: any[]) {
    // get listeners
    const events = this.eventListeners.filter((event) => event.type === type);
    // run listeners
    events.forEach((event) => event.listener(this, ...params));
  }

  public addEventListener(type: EventTypes, listener: Listener) {
    this.eventListeners.push({ type, listener });
  }
}

export default GameObject;
