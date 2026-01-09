import { test, expect } from "../fixtures/auth.fixture";

test("should return all products", async ({ api }) => {
  const data = await api.getProducts();

  expect(data.status()).toBe(200);
});

test("should return products by search query", async ({ api }) => {
  const data = await api.searchProducts("motorcycle");

  expect(data.status()).toBe(200);

  const body = await data.json();

  body.products.forEach((item) => {
    expect(item.category).toBe("motorcycle");
  });
});

test("should delete product by id", async ({ api }) => {
  const data = await api.deleteProduct(2);

  expect(data.status()).toBe(200);

  const body = await data.json();

  expect(body.isDeleted).toBe(true);
});

test("should return products sorted by title", async ({ api }) => {
  const sortedResponse = await api.getSortedProducts("title", "asc");
  const defaultResponse = await api.getProducts();

  const sortedTitles = (await sortedResponse.json()).products.map(
    (p) => p.title
  );
  const defaultTitles = (await defaultResponse.json()).products.map(
    (p) => p.title
  );

  expect(sortedTitles).not.toEqual(defaultTitles);
});

test("should update product", async ({ api }) => {
  const nameProduct = "mobile 45-xxx";
  const data = await api.updateProduct(nameProduct, 4);

  expect(data.status()).toBe(200);
  const body = await data.json();

  expect(body.title).toBe(nameProduct);
  expect(body.id).toBe(4);
});

test("should return 404 for non-existing product", async ({ api }) => {
  const response = await api.deleteProduct(99999);
  expect(response.status()).toBe(404);
});
