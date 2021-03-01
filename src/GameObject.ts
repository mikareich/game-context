import { ICoords } from "./constants";

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
}

type Listener = (GameObject, ...params: any[]) => void;

interface EventListener {
  type: string;
  listener: Listener;
}

type EventTypes = "updateposition" | "draw";

class GameObject {
  public width: number;

  public height: number;

  private _position: ICoords;

  public background: string | CanvasImageSource;

  private eventListeners: EventListener[] = [];

  constructor(config: IGameObjectConfig) {
    this.width = config.width;
    this.height = config.height;
    this._position = config.position;
    this.background = config.background || "black";
    this.position = config.position || { x: 0, y: 0 };
  }

  set position(newPosition: ICoords) {
    this.triggerListener("updateposition", {
      newPosition,
      oldPosition: this.position,
    });
    this._position = newPosition;
  }

  get position() {
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
