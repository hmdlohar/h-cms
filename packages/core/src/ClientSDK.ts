export class ClientSDK {
    static async call(io: {
        collection: string;
        method: string;
        args?: any;

    }) {
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
}