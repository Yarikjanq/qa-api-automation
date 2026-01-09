import { test, expect } from "../fixtures/auth.fixture";

test("should get carts by user id", async ({ api }) => {
  const data = await api.getCartsByUser(6);

  expect(data.status()).toBe(200);

  const body = await data.json();

  body.carts.forEach((cart) => {
    expect(cart.userId).toBe(6);
  });
});

test("should create cart", async ({ api }) => {
  const products = [
    { id: 5, quantity: 23 },
    { id: 23, quantity: 2 },
  ];
  const data = await api.createCart(6, products);

  expect(data.status()).toBe(201);
});

test("should update cart", async ({ api }) => {
  const products = [{ id: 5, quantity: 23 }];

  const data = await api.updateCart(6, true, products);
  expect(data.status()).toBe(200);

  const body = await data.json();

  const productId = body.products.map((id) => id.id);

  expect(productId).toContain(5);
});

test("should delete cart", async ({ api }) => {
  const data = await api.deleteCart(6);

  expect(data.status()).toBe(200);

  const body = await data.json();

  expect(body.isDeleted).toBe(true);
});
