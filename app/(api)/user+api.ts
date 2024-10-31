import { neon } from "@neondatabase/serverless";

export async function POST(req: Request) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const { name, email, clerkId } = await req.json();

    if (!name || !email || !clerkId) {
      return Response.json("Missing name, email, or clerkId", { status: 400 });
    }

    const posts = await sql`
          INSERT INTO users (name, email, clerk_id)
          VALUES (${name}, ${email}, ${clerkId})
        `;

    return Response.json(posts, { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify(error), {
      status: 500,
    });
  }
}

// See https://neon.tech/docs/serverless/serverless-driver
// for more information
