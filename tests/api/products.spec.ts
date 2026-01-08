import { test, expect } from "../fixtures/auth.fixture";

test("GET /all products", async ({ api }) => {
  const data = await api.getProducts();

  expect(data.status()).toBe(200);
});

test("Get /search product", async ({ api }) => {
  const data = await api.getSearchProduct("motorcycle");

  expect(data.status()).toBe(200);

  const body = await data.json();

  body.products.forEach((item) => {
    expect(item.category).toBe("motorcycle");
  });
});

test("GET /delete product", async ({ api }) => {
  const data = await api.getDeleteProduct(2);

  expect(data.status()).toBe(200);

  const body = await data.json();

  expect(body.isDeleted).toBe(true);
});

test("sorting product", async ({ api }) => {
  const sortedResponse = await api.sortingProduct("title", "asc");
  const defaultResponse = await api.getProducts();

  const sortedTitles = (await sortedResponse.json()).products.map(
    (p) => p.title
  );
  const defaultTitles = (await defaultResponse.json()).products.map(
    (p) => p.title
  );

  expect(sortedTitles).not.toEqual(defaultTitles);
});
