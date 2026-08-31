import { sql } from "drizzle-orm";
import { getDb } from "@/db";
import { visitorCounts } from "@/db/schema";

const COUNTER_ID = "trehab-website";
const REDIS_URL = process.env.UPSTASH_REDIS_REST_KV_REST_API_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_KV_REST_API_TOKEN;

type RedisResponse = {
  result?: string | number | null;
  error?: string;
};

async function runRedisCommand(command: string[]) {
  if (!REDIS_URL || !REDIS_TOKEN) return null;

  const response = await fetch(REDIS_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${REDIS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
  });

  const payload = (await response.json()) as RedisResponse;
  if (!response.ok || payload.error) {
    throw new Error(payload.error ?? "Redis request failed");
  }

  return Number(payload.result ?? 0);
}

export async function GET() {
  try {
    const redisCount = await runRedisCommand(["GET", COUNTER_ID]);
    if (redisCount !== null) {
      return Response.json(
        { count: redisCount },
        { headers: { "Cache-Control": "no-store" } },
      );
    }

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
    const redisCount = await runRedisCommand(["INCR", COUNTER_ID]);
    if (redisCount !== null) {
      return Response.json(
        { count: redisCount },
        { headers: { "Cache-Control": "no-store" } },
      );
    }

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
