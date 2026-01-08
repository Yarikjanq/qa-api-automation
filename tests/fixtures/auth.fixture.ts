import { test as base, expect } from "@playwright/test";
import { ApiClient } from "../../helpers/api-client";

type AuthFixtures = {
  api: ApiClient;
  token: string;
};

export const test = base.extend<AuthFixtures>({
  token: async ({ request }, use) => {
    const api = new ApiClient(request);
    const login = await api.login("emilys", "emilyspass");

    const { accessToken } = await login.json();
    await use(accessToken);
  },

  api: async ({ request, token }, use) => {
    await use(new ApiClient(request, token));
  },
});

export { expect };
