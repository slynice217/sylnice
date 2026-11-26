const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", ...CORS_HEADERS },
  });
}

function error(message, status = 400) {
  return json({ error: message }, status);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/$/, "") || "/";

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    if (path === "/api/health" && request.method === "GET") {
      try {
        const logs = await env.database.prepare("SELECT COUNT(*) AS count FROM renovation_logs").first();
        const comments = await env.database.prepare("SELECT COUNT(*) AS count FROM site_comments").first();
        return json({ ok: true, database: "connected", counts: { renovation_logs: logs?.count ?? 0, site_comments: comments?.count ?? 0 } });
      } catch (e) {
        return error("Database check failed", 500);
      }
    }

    if (path === "/api/renovation-logs" && request.method === "GET") {
      try {
        const { results = [] } = await env.database.prepare(
          "SELECT id, title, content, log_date, created_at, updated_at FROM renovation_logs ORDER BY log_date DESC, created_at DESC"
        ).all();
        return json(results);
      } catch (e) {
        return error("Could not load renovation logs", 500);
      }
    }

    if (path === "/api/comments" && request.method === "GET") {
      try {
        const { results = [] } = await env.database.prepare(
          "SELECT id, nickname, message, created_at FROM site_comments ORDER BY created_at DESC LIMIT 100"
        ).all();
        return json(results);
      } catch (e) {
        return error("Could not load comments", 500);
      }
    }

    if (path === "/api/comments" && request.method === "POST") {
      try {
        const body = await request.json();
        const nickname = String(body.nickname ?? "").trim().slice(0, 40);
        const message = String(body.message ?? "").trim().slice(0, 2000);
        if (!nickname || !message) return error("Nickname and message are required.");
        const result = await env.database.prepare(
          "INSERT INTO site_comments (nickname, message) VALUES (?, ?)"
        ).bind(nickname, message).run();
        return json({ ok: true, id: result.meta?.last_row_id }, 201);
      } catch (e) {
        return error("Could not submit comment", 500);
      }
    }

    return error("Not found", 404);
  },
};
