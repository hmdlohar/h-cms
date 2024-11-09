import { getCollectionMethod } from "@/lib/collections";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        console.log(body, "ai");
        let fn = getCollectionMethod(body.collection, body.method);
        let result = await fn.fn(body.args);
        return new Response(JSON.stringify({ success: true, result }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
