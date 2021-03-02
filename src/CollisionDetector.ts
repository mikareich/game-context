import GameObject from "./GameObject";

class CollisionDetector {
  /**
   *  Examines the position of the objects for collision.
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
    this.objects = objects;

    // add eventlistener
    this.objects.forEach((gameObject) => {
      this.objectUpdated(gameObject);
      gameObject.addEventListener("positionupdated", () =>
        this.objectUpdated(gameObject)
      );
    });
  }

  addObject(gameObject: GameObject) {
    this.objects.push(gameObject);
    this.objectUpdated(gameObject);
    gameObject.addEventListener("positionupdated", () => {
      this.objectUpdated(gameObject);
    });
  }

  private objectUpdated(object: GameObject) {
    // compare object with all other objects
    const withObjectCollided = this.objects.filter(
      (compareObject) =>
        object.uuid !== compareObject.uuid &&
        CollisionDetector.hasCollided(object, compareObject)
    );

    // trigger event-listeners
    if (withObjectCollided.length > 0) {
      object.triggerListener("collided", withObjectCollided);
      withObjectCollided.forEach((collidedCompareObject) =>
        collidedCompareObject.triggerListener("collided", object)
      );
    }
  }
}

export default CollisionDetector;
