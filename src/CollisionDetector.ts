import GameObject from "./GameObject";

class CollisionDetector {
  public objectA: GameObject;

  public objectB: GameObject;

  /**
   * Listen to collison of both objects
   * @param objectA First GameObject
   * @param objectB Second GameObject
   */
  constructor(objectA: GameObject, objectB: GameObject) {
    this.objectA = objectA;
    this.objectB = objectB;

    // attach listener to game-objects
    this.objectA.addEventListener("updateposition", console.log);
  }
}
