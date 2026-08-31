import { sql } from "drizzle-orm";
import { getDb } from "@/db";
import { visitorCounts } from "@/db/schema";

const COUNTER_ID = "trehab-website";

export async function GET() {
  try {
    const db = await getDb();
    const row = await db.query.visitorCounts.findFirst({
      where: (table, { eq }) => eq(table.id, COUNTER_ID),
      columns: { count: true },
    });

    return Response.json(
      { count: row?.count ?? 0 },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return Response.json({ error: "Visitor count unavailable" }, { status: 500 });
  }
}

export async function POST() {
  try {
    const db = await getDb();
    const [row] = await db
      .insert(visitorCounts)
      .values({ id: COUNTER_ID, count: 1 })
      .onConflictDoUpdate({
        target: visitorCounts.id,
        set: {
          count: sql`${visitorCounts.count} + 1`,
          updatedAt: sql`CURRENT_TIMESTAMP`,
        },
      })
      .returning({ count: visitorCounts.count });

    return Response.json(
      { count: row.count },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return Response.json({ error: "Visitor count unavailable" }, { status: 500 });
  }
}
