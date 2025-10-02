import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./db.js";
import { suggestFromAI } from "./openai.js";

dotenv.config();
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ status: "ok", service: "FatwaCheck API" });
});

app.post("/verify", async (req, res) => {
  const query = (req.body?.query || "").trim();
  if(!query) return res.status(400).json({ error: "query is required" });

  try{
    // بحث بسيط بالتشابه النصي
    const sql = `
      SELECT id, query_text, verdict, category, hadith_grade, source, notes, updated_at
      FROM fatwas
      WHERE LOWER(query_text) LIKE LOWER($1)
         OR LOWER(verdict) LIKE LOWER($1)
         OR LOWER(source) LIKE LOWER($1)
      ORDER BY updated_at DESC
      LIMIT 50;
    `;
    const like = `%${query}%`;
    const { rows } = await pool.query(sql, [like]);

    let ai = null;
    if(!rows || rows.length === 0){
      const suggestion = await suggestFromAI(query);
      if(suggestion) ai = { suggestion };
    }

    res.json({ query, results: rows, ai });
  } catch(err){
    console.error(err);
    res.status(500).json({ error: "server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("FatwaCheck API listening on", PORT);
});