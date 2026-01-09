import { test, expect } from "../fixtures/auth.fixture";

test("should get access token", async ({ api }) => {
  const login = await api.getMe();

  expect(login.status()).toBe(200);

  const data = await login.json();

  expect(data.username).toBe("emilys");
});
