// helpers/api-client.ts

import * as endpoints from "./endpoints";

type CartProduct = {
  id: number;
  quantity: number;
};

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

  async searchProducts(category: string) {
    return this.request.get(`${endpoints.PRODUCTS.SEARCH}?q=${category}`);
  }

  async deleteProduct(id: number) {
    return this.request.delete(`${endpoints.PRODUCTS.DELETE}/${id}`);
  }

  async getSortedProducts(name: string, order: string) {
    return this.request.get(
      `${endpoints.PRODUCTS.LIST}?sortBy=${name}&order=${order}`
    );
  }

  async updateProduct(title: string, id: number) {
    return this.request.put(`${endpoints.PRODUCTS.LIST}/${id}`, {
      data: { title },
    });
  }

  async getCartsByUser(id: number) {
    return this.request.get(`${endpoints.CARTS.USER}/${id}`);
  }

  async createCart(userId: number, products: CartProduct[]) {
    return this.request.post(`${endpoints.CARTS.ADD}`, {
      data: {
        userId,
        products,
      },
    });
  }

  async updateCart(userId: number, merge: boolean, products: CartProduct[]) {
    return this.request.put(`${endpoints.CARTS.LIST}/${userId}`, {
      data: {
        merge,
        products,
      },
    });
  }

  async deleteCart(id: number) {
    return this.request.delete(`${endpoints.CARTS.LIST}/${id}`);
  }
}
