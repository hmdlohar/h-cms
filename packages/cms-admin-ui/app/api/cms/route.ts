import { getCollectionMethod } from "@/lib/collections";
import { db } from "@/lib/db";
import { parseErrorString } from "@/utils/parseErrorString";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log(body, "ai");
    let fn = getCollectionMethod(body.collection, body.method);
    if (!fn) {
      throw new Error(
        `Method ${body.method} not found for collection ${body.collection}`
      );
    }
    let result = await fn.fn(db, body.args);
    return new Response(JSON.stringify({ success: true, result }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: `Internal Server Error: ${parseErrorString(error)}`,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
