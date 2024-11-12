export class ClientSDK {
  static async call(io: { collection: string; method: string; args?: any }) {
    const response = await fetch(`/api/cms`, {
      method: "POST",
      body: JSON.stringify(io),
    });
    let result = await response.json();
    if (result.error) {
      throw new Error(result.error);
    }
    return result.result;
  }

  static async get(collection: string, id: number) {
    return this.call({
      collection,
      method: "get",
      args: { id },
    });
  }

  static async list(collection: string) {
    return this.call({
      collection,
      method: "list"
    });
  }

  static async create(collection: string, values: any) {
    return this.call({
      collection,
      method: "create",
      args: values,
    });
  }

  static async update(collection: string, id: number, values: any) {
    return this.call({
      collection,
      method: "update",
      args: { id, values },
    });
  }

  static async delete(collection: string, id: number) {
    return this.call({
      collection,
      method: "delete",
      args: { id },
    });
  }
}
