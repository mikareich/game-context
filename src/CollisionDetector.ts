import EventSystem from "./EventSystem";
import GameObject from "./GameObject";

type EventTypes = "collisiondetected";

class CollisionDetector extends EventSystem<EventTypes> {
  /**
   * Checks whether two game objects have collided.
   * @param object1 First Object
   * @param object2 Second Object
   * @returns Returns true whether objects have collided
   */
  static hasCollided(object1: GameObject, object2: GameObject): boolean {
    const position1 = object1.getPosition();
    const position2 = object2.getPosition();

    // Points of the Objects
    // <Edge><Object>
    const A1 = {
      x: position1.x,
      y: position1.y + object1.height,
    };
    const C1 = {
      x: position1.x + object1.width,
      y: position1.y,
    };

    const A2 = {
      x: position2.x,
      y: position2.y + object2.height,
    };
    const C2 = {
      y: position2.y,
      x: position2.x + object2.width,
    };

    // Sides of the objects
    // <Side><Object>
    const a1 = A1.y;
    const b1 = C1.x;
    const c1 = C1.y;
    const d1 = A1.x;

    const a2 = A2.y;
    const b2 = C2.x;
    const c2 = C2.y;
    const d2 = A2.x;

    const horizontalCondition =
      (d1 <= b2 && b2 <= b1) || (d1 <= d2 && d2 <= b1);
    const verticalCondition = (c1 <= a2 && a2 <= a1) || (c1 <= c2 && c2 <= a1);

    return horizontalCondition && verticalCondition;
  }

  private objects: GameObject[];

  constructor(objects: GameObject[]) {
    super();
    this.objects = objects;

    // add eventlistener
    this.objects.forEach((gameObject) => {
      this.objectUpdated(gameObject);
      gameObject.on("positionupdated", () => this.objectUpdated(gameObject));
    });
  }

  /**
   * Adds game objects to the Collsion Detector that are to be controlled.
   * @param gameObjects The game objects to add.
   */
  addObjects(...gameObjects: GameObject[]) {
    gameObjects.forEach((gameObject) => {
      this.objects.push(gameObject);
      this.objectUpdated(gameObject);
      gameObject.on("positionupdated", () => {
        this.objectUpdated(gameObject);
      });
    });
  }

  /**
   * Checks whether game object has collided with other game objects.
   * @param gameObject Game object that has changed
   */
  private objectUpdated(gameObject: GameObject) {
    // compare object with all other objects
    const collidedGameObjects = this.objects
      .filter(
        (compareObject) =>
          gameObject.uuid !== compareObject.uuid &&
          CollisionDetector.hasCollided(gameObject, compareObject)
      )
      .map((compareObject) => [gameObject, compareObject]);

    // trigger event-listeners
    if (collidedGameObjects.length > 0) {
      gameObject.triggerEvent("collided", collidedGameObjects);
      collidedGameObjects.forEach(([, collidedCompareObject]) =>
        collidedCompareObject.triggerEvent("collided", gameObject)
      );
      this.triggerEvent("collisiondetected", collidedGameObjects);
    }
  }
}

export default CollisionDetector;
