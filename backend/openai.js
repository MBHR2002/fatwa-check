import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

export const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function suggestFromAI(query){
  try{
    const resp = await openai.chat.completions.create({
      model: "gpt-4o-mini", // أو gpt-3.5-turbo حسب توفر حسابك
      messages: [
        { role: "system", content:
          "أنت مساعد للتحقق من المعلومات الدينية. عندما لا توجد مطابقة في قاعدة البيانات، اقترح إجابة موجزة ومحايدة مع توجيه المستخدم للتحقق من المصادر."
        },
        { role: "user", content: query }
      ],
      temperature: 0.2
    });
    const text = resp.choices?.[0]?.message?.content || "";
    return text;
  } catch(e){
    console.error("OpenAI error:", e.message);
    return "";
  }
}