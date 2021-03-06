import CollisionDetector from "../CollisionDetector";
import GameObject from "../GameObject";

const object1 = new GameObject({
  width: 100,
  height: 100,
  position: { x: 100, y: 100 },
});
const object2 = new GameObject({
  width: 100,
  height: 100,
});

test("Object 2 collides with the left side of object 2 with object 1", () => {
  object2.setPosition(200, 100);
  expect(CollisionDetector.hasCollided(object1, object2)).toBe(true);
});
