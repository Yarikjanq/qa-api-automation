import { test, expect } from "../fixtures/auth.fixture";

test("POST /get accessToken", async ({ api }) => {
  const login = await api.getMe();

  expect(login.status()).toBe(200);

  const data = await login.json();

  expect(data.username).toBe("emilys");
});
