// helpers/api-client.ts
import { request as playwrightRequest } from "@playwright/test";
import * as endpoints from "./endpoints";

export class ApiClient {
  constructor(private request, private token?: string) {}

  private authHeaders() {
    return this.token ? { Authorization: `Bearer ${this.token}` } : {};
  }

  async getMe() {
    return this.request.get(endpoints.AUTH.ME, {
      headers: this.authHeaders(),
    });
  }

  async login(username: string, password: string) {
    return this.request.post(endpoints.AUTH.LOGIN, {
      data: { username, password },
    });
  }

  async getProducts() {
    return this.request.get(endpoints.PRODUCTS.LIST);
  }

  async getSearchProduct(category: string) {
    return this.request.get(`${endpoints.PRODUCTS.SEARCH}?q=${category}`);
  }

  async getDeleteProduct(id: number) {
    return this.request.delete(`${endpoints.PRODUCTS.DELETE}/${id}`);
  }

  async sortingProduct(name: string, order: string) {
    return this.request.get(
      `${endpoints.PRODUCTS.LIST}?sortBy=${name}&order=${order}`
    );
  }
}
