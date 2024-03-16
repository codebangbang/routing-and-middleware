process.env.Node_ENV = "test";
const request = require("supertest");

const app = require("../app");
let items = require("../fakeDb");

let item = { name: "chocolate", price: 1.99 };

beforeEach(async () => {
  items.push(item);
});

afterEach(async () => {
  items.length = 0;
});

describe("GET /items", () => {
  test("Get all items", async () => {
    const res = await request(app).get("/items");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ items: [item] });
  });
});

describe("POST /items", () => {
  test("Create a new item", async () => {
    const res = await request(app)
      .post("/items")
      .send({ name: "candy", price: 0.99 });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ item: { name: "candy", price: 0.99 } });
  });
});

describe("GET /items/:name", () => {
  test("Get an item by name", async () => {
    const res = await request(app).get(`/items/${item.name}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ item: item });
  });
});

describe("PATCH /items/:name", () => {
  test("Update an item by name", async () => {
    const res = await request(app)
      .patch(`/items/${item.name}`)
      .send({ name: "candy", price: 1.29 });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ item: { name: "candy", price: 1.29 } });
  });
});

describe("DELETE /items/:name", () => {
  test("Delete an item by name", async () => {
    const res = await request(app).delete(`/items/${item.name}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: "Deleted" });
  });
});

afterAll(async () => {
  items.length = 0;
});
