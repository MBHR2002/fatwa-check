const API_BASE = (typeof window !== "undefined")
  ? (localStorage.getItem("fatwa_api") || "http://localhost:3000")
  : "";

const queryInput = document.getElementById("queryInput");
const verifyBtn = document.getElementById("verifyBtn");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const resultsBody = document.getElementById("resultsBody");
const aiSuggestion = document.getElementById("aiSuggestion");

let lastResults = [];

function renderRows(rows){
  resultsBody.innerHTML = "";
  rows.forEach(r=>{
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${r.query_text || ""}</td>
      <td><strong>${r.verdict || ""}</strong></td>
      <td>${r.category || ""}</td>
      <td>${r.hadith_grade || ""}</td>
      <td>${r.source || ""}</td>
      <td>${r.notes || ""}</td>
    `;
    resultsBody.appendChild(tr);
  });
}

function applyFilters(){
  const q = (searchInput.value || "").trim();
  const cat = categoryFilter.value;
  let filtered = lastResults.slice();
  if(q){
    const qq = q.toLowerCase();
    filtered = filtered.filter(r =>
      (r.query_text||"").toLowerCase().includes(qq) ||
      (r.verdict||"").toLowerCase().includes(qq) ||
      (r.source||"").toLowerCase().includes(qq) ||
      (r.notes||"").toLowerCase().includes(qq)
    );
  }
  if(cat){
    filtered = filtered.filter(r => (r.category||"") === cat);
  }
  renderRows(filtered);
}

searchInput.addEventListener("input", applyFilters);
categoryFilter.addEventListener("change", applyFilters);

verifyBtn.addEventListener("click", async ()=>{
  const query = (queryInput.value || "").trim();
  aiSuggestion.hidden = true;
  aiSuggestion.textContent = "";

  if(!query){
    alert("اكتب سؤالك أولاً.");
    return;
  }

  try{
    const res = await fetch(`${API_BASE}/verify`, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ query })
    });
    const data = await res.json();

    lastResults = data.results || [];
    renderRows(lastResults);
    applyFilters();

    if(data.ai && data.ai.suggestion){
      aiSuggestion.hidden = false;
      aiSuggestion.innerHTML = `
        <h3 style="margin-top:0;">اقتراح الذكاء الاصطناعي</h3>
        <p>${data.ai.suggestion}</p>
        <small>تنبيه: يرجى التحقق من المصادر الموثوقة.</small>
      `;
    }
  } catch(err){
    console.error(err);
    alert("حدث خطأ أثناء التحقق. تأكد من عنوان الخادم.");
  }
});