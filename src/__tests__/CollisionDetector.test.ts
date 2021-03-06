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

test("Object 2 collides with the right side of object 2 with object 1", () => {
  object2.setPosition(0, 100);
  expect(CollisionDetector.hasCollided(object1, object2)).toBe(true);
});

test("Object 2 collides with the upper side of object 2 with object 1", () => {
  object2.setPosition(100, 200);
  expect(CollisionDetector.hasCollided(object1, object2)).toBe(true);
});

test("Object 2 collides with the lower side of object 2 with object 1", () => {
  object2.setPosition(100, 0);
  expect(CollisionDetector.hasCollided(object1, object2)).toBe(true);
});

test("Object 2 is in object 1", () => {
  object2.setPosition(100, 100);
  expect(CollisionDetector.hasCollided(object1, object2)).toBe(true);
});
