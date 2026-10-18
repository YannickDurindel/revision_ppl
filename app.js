(() => {
  "use strict";

  const PASS = 75;
  const LETTERS = ["A", "B", "C", "D"];
  const SUBJECTS = (window.PPL?.subjects || []).slice().sort((a, b) => a.id.localeCompare(b.id));
  const ALL = [];
  SUBJECTS.forEach((s) => s.questions.forEach((q, i) => { q.id = s.id + "-" + i; q.s = s; ALL.push(q); }));
  const BY_ID = Object.fromEntries(ALL.map((q) => [q.id, q]));
  const SUBJ = Object.fromEntries(SUBJECTS.map((s) => [s.id, s]));

  // ---------- Stockage local (facultatif) ----------
  const store = {
    get(k, d) { try { const v = localStorage.getItem("ppl:" + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem("ppl:" + k, JSON.stringify(v)); } catch (e) { /* stockage indisponible */ } },
  };
  let stats = store.get("stats", {});     // qid -> { n, ok, last }
  let history = store.get("history", []); // [{ date, mode, scores: { sid: [ok, total] }, ok, total, secs }]

  function record(q, correct) {
    const st = stats[q.id] || { n: 0, ok: 0, last: 0 };
    st.n++; if (correct) st.ok++; st.last = correct ? 1 : 0;
    stats[q.id] = st;
    store.set("stats", stats);
  }
  const wrongIds = () => ALL.filter((q) => stats[q.id] && stats[q.id].last === 0).map((q) => q.id);
  function mastery(s) {
    const seen = s.questions.filter((q) => stats[q.id]).length;
    const ok = s.questions.filter((q) => stats[q.id]?.last === 1).length;
    return { seen, ok, total: s.questions.length, pct: Math.round((ok / s.questions.length) * 100) };
  }

  // ---------- Utilitaires ----------
  const $app = document.getElementById("app");
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pct = (ok, total) => (total ? Math.round((ok / total) * 100) : 0);
  const fmtTime = (s) => { s = Math.max(0, Math.round(s)); const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), x = s % 60; return (h ? h + ":" + String(m).padStart(2, "0") : m) + ":" + String(x).padStart(2, "0"); };
  const fmtDate = (d) => new Date(d).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
  const wrapTables = (html) => html.replace(/<table/g, '<div class="tbl"><table').replace(/<\/table>/g, "</table></div>");

  // ---------- État ----------
  let state = { view: "home", subject: null };
  let quiz = null;
  let result = null;
  let tick = null;

  function go(view, extra = {}) {
    state = { ...state, view, ...extra };
    if (view !== "quiz") stopTimer();
    render();
    window.scrollTo(0, 0);
  }

  // ---------- Vues ----------
  function viewHome() {
    const m = SUBJECTS.map((s) => ({ s, ...mastery(s) }));
    const overallOk = m.reduce((a, x) => a + x.ok, 0);
    const wrong = wrongIds().length;
    const lastExams = history.slice(-6).reverse();
    return `
    <div class="stack">
      <section class="hero">
        <div class="hero-text">
          <span class="eyebrow">Examen théorique PPL(A) · EASA Part-FCL</span>
          <h1>Révisez les 9 matières, puis passez des examens blancs notés.</h1>
          <p class="lead">Cours condensés, ${ALL.length} QCM corrigés et expliqués, et un mode examen chronométré qui applique la règle officielle : 75 % minimum dans chaque matière.</p>
          <div class="row">
            <button class="btn primary" data-act="exam-setup">Lancer un examen blanc</button>
            <button class="btn" data-act="practice-setup">S’entraîner</button>
          </div>
        </div>
        <div class="panel gauge">
          <div class="gauge-head">
            <h3>Votre niveau par matière</h3>
            <span class="mono muted" style="font-size:.85rem">${overallOk}/${ALL.length}</span>
          </div>
          ${m.map((x) => `
            <button class="gbar" data-act="subject" data-id="${x.s.id}" title="${esc(x.s.title)} : ${x.ok} réponses justes sur ${x.total}">
              <span class="code">${x.s.id}</span>
              <span class="track"><span class="fill ${x.pct >= PASS ? "ok" : ""}" style="width:${x.pct}%"></span><span class="lbl">${esc(x.s.title)}</span><span class="pass"></span></span>
              <span class="val">${x.pct} %</span>
            </button>`).join("")}
          <div class="legend"><span><i style="background:var(--accent)"></i>seuil de réussite 75 %</span><span>% des questions dont votre dernière réponse est juste</span></div>
        </div>
      </section>

      <section class="actions">
        <button class="panel action" data-act="exam-setup">
          <span class="eyebrow">Examen blanc</span>
          <h3>Les 9 matières, chronométré</h3>
          <p>Correction à la fin, note par matière et verdict admis / ajourné.</p>
        </button>
        <button class="panel action" data-act="practice-setup">
          <span class="eyebrow">Entraînement</span>
          <h3>Question par question</h3>
          <p>Choisissez vos matières et voyez la correction expliquée tout de suite.</p>
        </button>
        <button class="panel action" data-act="errors">
          <span class="eyebrow">Mes erreurs · ${wrong}</span>
          <h3>Refaire ce que j’ai raté</h3>
          <p>${wrong ? "Une question sort de la liste dès que vous y répondez juste." : "Rien pour l’instant. Vos erreurs apparaîtront ici."}</p>
        </button>
      </section>

      <section class="panel" style="padding:0">
        <div class="rules">
          <div class="rule"><b>9</b><span>matières, du droit aérien aux communications</span></div>
          <div class="rule"><b>75 %</b><span>minimum requis dans chaque matière</span></div>
          <div class="rule"><b>18 mois</b><span>pour réussir toutes les matières, en 6 sessions max.</span></div>
          <div class="rule"><b>4</b><span>tentatives au plus par matière</span></div>
        </div>
      </section>

      ${lastExams.length ? `
      <section class="stack" style="gap:12px">
        <h2>Derniers résultats</h2>
        <div class="panel scroll-x" style="padding:8px 12px">
          <table class="hist">
            <thead><tr><th>Date</th><th>Type</th><th>Questions</th><th>Score</th><th>Verdict</th></tr></thead>
            <tbody>${lastExams.map((h) => {
              const passed = h.mode === "exam" ? Object.values(h.scores).every(([o, t]) => pct(o, t) >= PASS) : null;
              return `<tr><td>${fmtDate(h.date)}</td><td>${h.mode === "exam" ? "Examen blanc" : h.mode === "errors" ? "Erreurs" : "Entraînement"}</td><td class="num">${h.total}</td><td class="num">${pct(h.ok, h.total)} %</td><td>${passed === null ? '<span class="chip neutral">—</span>' : passed ? '<span class="chip ok">Admis</span>' : '<span class="chip ko">Ajourné</span>'}</td></tr>`;
            }).join("")}</tbody>
          </table>
        </div>
      </section>` : ""}
    </div>`;
  }

  function viewCourses() {
    return `
    <div class="stack">
      <div class="stack" style="gap:8px">
        <span class="eyebrow">Cours</span>
        <h1>Le programme théorique</h1>
        <p class="lead">Les 9 matières de l’examen PPL(A), numérotées comme dans le syllabus EASA. Chaque fiche se termine par un entraînement dédié.</p>
      </div>
      <div class="subjects">
        ${SUBJECTS.map((s) => { const m = mastery(s); return `
          <button class="panel subj" data-act="subject" data-id="${s.id}">
            <span class="code">${s.id}</span>
            <h3>${esc(s.title)}</h3>
            <p>${esc(s.subtitle)}</p>
            <span class="meta">${s.theory.length} fiches · ${m.seen}/${m.total} questions vues</span>
          </button>`; }).join("")}
      </div>
    </div>`;
  }

  function viewSubject() {
    const s = SUBJ[state.subject];
    if (!s) return viewCourses();
    const m = mastery(s);
    return `
    <div class="stack">
      <div class="row"><button class="linkbtn" data-act="courses">← Toutes les matières</button></div>
      <div class="row" style="justify-content:space-between;align-items:end">
        <div class="stack" style="gap:6px">
          <span class="eyebrow">${s.id} · ${m.seen}/${m.total} questions vues · ${m.pct} % juste</span>
          <h1>${esc(s.title)}</h1>
          <p class="lead">${esc(s.subtitle)}</p>
        </div>
        <button class="btn primary" data-act="practice-subject" data-id="${s.id}">S’entraîner sur cette matière</button>
      </div>
      <div class="course">
        <nav class="toc" aria-label="Sommaire">
          ${s.theory.map((t, i) => `<a href="#sec-${s.id}-${i}" data-act="toc" data-target="sec-${s.id}-${i}">${esc(t.h)}</a>`).join("")}
        </nav>
        <div class="theory">
          ${s.theory.map((t, i) => `
            <section class="panel" id="sec-${s.id}-${i}">
              <h3>${esc(t.h)}</h3>
              <div class="prose">${wrapTables(t.body)}</div>
            </section>`).join("")}
          <div class="panel sunk row" style="justify-content:space-between">
            <p>Fiche terminée ? Vérifiez vos connaissances sur les ${s.questions.length} questions de la matière.</p>
            <button class="btn primary" data-act="practice-subject" data-id="${s.id}">S’entraîner</button>
          </div>
        </div>
      </div>
    </div>`;
  }

  function subjectPills(name, checkedAll) {
    return `<div class="pills">${SUBJECTS.map((s) => `
      <label class="pill"><input type="checkbox" name="${name}" value="${s.id}" id="${name}-${s.id}" ${checkedAll ? "checked" : ""}><span><span class="mono">${s.id}</span>${esc(s.title)}</span></label>`).join("")}</div>`;
  }

  function viewPracticeSetup() {
    return `
    <div class="stack" style="max-width:760px">
      <div class="stack" style="gap:8px">
        <span class="eyebrow">Entraînement</span>
        <h1>Préparer une série</h1>
        <p class="lead">Correction immédiate après chaque réponse, avec l’explication. Raccourcis : <span class="kbd">A</span>–<span class="kbd">D</span> ou <span class="kbd">1</span>–<span class="kbd">4</span> pour répondre, <span class="kbd">Entrée</span> pour continuer.</p>
      </div>
      <form class="panel stack" id="practice-form">
        <div class="field">
          <span class="label">Matières</span>
          ${subjectPills("ps", true)}
          <div class="row"><button type="button" class="linkbtn" data-act="pills-all" data-name="ps">Tout cocher</button><button type="button" class="linkbtn" data-act="pills-none" data-name="ps">Tout décocher</button></div>
        </div>
        <div class="field">
          <span class="label">Nombre de questions</span>
          <div class="pills">
            ${[10, 20, 40, 0].map((n, i) => `<label class="pill"><input type="radio" name="pn" id="pn-${n}" value="${n}" ${i === 1 ? "checked" : ""}><span>${n || "Toutes"}</span></label>`).join("")}
          </div>
        </div>
        <div class="field">
          <span class="label">Ordre</span>
          <div class="pills">
            <label class="pill"><input type="radio" name="po" id="po-smart" value="smart" checked><span>Priorité aux questions jamais vues ou ratées</span></label>
            <label class="pill"><input type="radio" name="po" id="po-rand" value="random"><span>Aléatoire</span></label>
          </div>
        </div>
        <div class="row"><button class="btn primary" type="submit">Commencer</button><span class="note" id="ps-msg"></span></div>
      </form>
    </div>`;
  }

  function viewExamSetup() {
    return `
    <div class="stack" style="max-width:760px">
      <div class="stack" style="gap:8px">
        <span class="eyebrow">Examen blanc</span>
        <h1>Simuler l’examen</h1>
        <p class="lead">Tirage aléatoire dans chaque matière sélectionnée. Vous pouvez revenir sur vos réponses et marquer les questions à revoir. La correction arrive à la fin, avec la note par matière.</p>
      </div>
      <form class="panel stack" id="exam-form">
        <div class="field">
          <span class="label">Matières</span>
          ${subjectPills("es", true)}
        </div>
        <div class="field">
          <span class="label">Questions par matière</span>
          <div class="pills">
            ${[8, 12, 16, 20].map((n) => `<label class="pill"><input type="radio" name="en" id="en-${n}" value="${n}" ${n === 12 ? "checked" : ""}><span>${n}</span></label>`).join("")}
          </div>
        </div>
        <div class="field">
          <span class="label">Chronomètre</span>
          <div class="pills">
            <label class="pill"><input type="radio" name="et" id="et-75" value="75" checked><span>75 s par question</span></label>
            <label class="pill"><input type="radio" name="et" id="et-120" value="120"><span>2 min par question</span></label>
            <label class="pill"><input type="radio" name="et" id="et-0" value="0"><span>Sans limite</span></label>
          </div>
        </div>
        <div class="row"><button class="btn primary" type="submit">Démarrer l’examen</button><span class="note" id="es-msg"></span></div>
      </form>
    </div>`;
  }

  function viewErrors() {
    const ids = wrongIds();
    if (!ids.length) {
      return `<div class="panel empty"><h2>Aucune erreur à revoir</h2><p class="muted">Les questions ratées en entraînement ou en examen blanc apparaissent ici jusqu’à ce que vous y répondiez juste.</p><button class="btn primary" data-act="practice-setup">S’entraîner</button></div>`;
    }
    const bySubj = {};
    ids.forEach((id) => { const s = BY_ID[id].s.id; bySubj[s] = (bySubj[s] || 0) + 1; });
    return `
    <div class="stack" style="max-width:760px">
      <div class="stack" style="gap:8px">
        <span class="eyebrow">Mes erreurs</span>
        <h1>${ids.length} question${ids.length > 1 ? "s" : ""} à retravailler</h1>
        <p class="lead">Une question quitte la liste dès que vous y répondez juste.</p>
      </div>
      <div class="panel scroll-x" style="padding:8px 12px">
        <table class="hist"><thead><tr><th>Matière</th><th>Erreurs</th><th></th></tr></thead><tbody>
        ${Object.entries(bySubj).sort().map(([sid, n]) => `<tr><td><span class="mono muted">${sid}</span> ${esc(SUBJ[sid].title)}</td><td class="num">${n}</td><td><button class="linkbtn" data-act="errors-start" data-id="${sid}">Refaire</button></td></tr>`).join("")}
        </tbody></table>
      </div>
      <div class="row">
        <button class="btn primary" data-act="errors-start">Refaire toutes mes erreurs</button>
        <button class="btn ghost danger" data-act="reset-ask">Effacer ma progression</button>
      </div>
    </div>`;
  }

  // ---------- Quiz ----------
  function startQuiz(mode, questions, limitSecs = 0) {
    if (!questions.length) return;
    quiz = {
      mode,
      items: questions.map((q) => ({ id: q.id, order: shuffle([0, 1, 2, 3]), pick: null, flag: false })),
      i: 0,
      start: Date.now(),
      limit: limitSecs,
      confirm: false,
    };
    go("quiz");
    startTimer();
  }

  function pickQuestions(ids, n, smart) {
    let qs = ids.map((id) => BY_ID[id]);
    if (smart) {
      // Jamais vues d'abord, puis ratées, puis le reste, chaque groupe mélangé.
      const rank = (q) => (!stats[q.id] ? 0 : stats[q.id].last === 0 ? 1 : 2);
      qs = shuffle(qs).sort((a, b) => rank(a) - rank(b));
    } else qs = shuffle(qs);
    return n ? qs.slice(0, n) : qs;
  }

  function startTimer() {
    stopTimer();
    tick = setInterval(() => {
      if (!quiz) return stopTimer();
      const el = document.getElementById("timer");
      const elapsed = (Date.now() - quiz.start) / 1000;
      if (quiz.limit) {
        const left = quiz.limit - elapsed;
        if (left <= 0) { finishQuiz(); return; }
        if (el) { el.textContent = fmtTime(left); el.classList.toggle("low", left < 300); }
      } else if (el) el.textContent = fmtTime(elapsed);
    }, 1000);
  }
  function stopTimer() { if (tick) clearInterval(tick); tick = null; }

  function viewQuiz() {
    const it = quiz.items[quiz.i];
    const q = BY_ID[it.id];
    const exam = quiz.mode === "exam";
    const answered = it.pick !== null;
    const showFeedback = !exam && answered;
    const n = quiz.items.length;
    const doneCount = quiz.items.filter((x) => x.pick !== null).length;
    const elapsed = (Date.now() - quiz.start) / 1000;
    const timerText = quiz.limit ? fmtTime(quiz.limit - elapsed) : fmtTime(elapsed);
    const title = exam ? "Examen blanc" : quiz.mode === "errors" ? "Mes erreurs" : "Entraînement";

    const answers = it.order.map((ai, pos) => {
      let cls = "";
      if (showFeedback) { if (ai === q.c) cls = "right"; else if (ai === it.pick) cls = "wrong"; }
      else if (it.pick === ai) cls = "sel";
      return `<button class="ans ${cls}" data-act="answer" data-a="${ai}" ${showFeedback ? "disabled" : ""}><span class="k">${LETTERS[pos]}</span><span>${esc(q.a[ai])}</span></button>`;
    }).join("");

    const ok = it.pick === q.c;
    const feedback = showFeedback ? `
      <div class="explain ${ok ? "" : "ko"}" role="status">
        <b>${ok ? "Bonne réponse" : "Mauvaise réponse · la bonne était " + LETTERS[it.order.indexOf(q.c)]}</b>
        <p>${esc(q.e)}</p>
      </div>` : "";

    const last = quiz.i === n - 1;
    let nav;
    if (exam) {
      nav = `
        <div class="qnav">
          <div class="row">
            <button class="btn" data-act="prev" ${quiz.i === 0 ? "disabled" : ""}>← Précédente</button>
            <button class="btn ghost" data-act="flag">${it.flag ? "Retirer le marque-page" : "Marquer à revoir"}</button>
          </div>
          <button class="btn ${last ? "" : "primary"}" data-act="next" ${last ? "disabled" : ""}>Suivante →</button>
        </div>`;
    } else {
      nav = `
        <div class="qnav">
          <button class="btn ghost" data-act="finish-ask">Arrêter et voir ma note</button>
          ${answered ? `<button class="btn primary" data-act="${last ? "finish" : "next"}" id="next-btn">${last ? "Voir ma note" : "Question suivante →"}</button>` : ""}
        </div>`;
    }

    const confirmBox = quiz.confirm ? `
      <div class="panel sunk stack" style="gap:10px">
        <p><strong>${exam ? `Rendre la copie ?` : "Arrêter la série ?"}</strong> ${exam && doneCount < n ? `${n - doneCount} question${n - doneCount > 1 ? "s" : ""} sans réponse, comptée${n - doneCount > 1 ? "s" : ""} fausse${n - doneCount > 1 ? "s" : ""}.` : exam ? "Toutes les questions ont une réponse." : "Seules les questions répondues sont notées."}</p>
        <div class="row"><button class="btn primary" data-act="finish">${exam ? "Rendre la copie" : "Voir ma note"}</button><button class="btn" data-act="finish-cancel">Continuer</button></div>
      </div>` : "";

    return `
    <div class="quiz">
      <div class="stack" style="gap:18px">
        <div class="qhead">
          <span class="eyebrow">${title} · <span class="mono">${q.s.id}</span> ${esc(q.s.title)} · ${esc(q.t)}</span>
          <span class="mono muted" style="font-size:.85rem">${quiz.i + 1} / ${n}</span>
        </div>
        <div class="progress"><div style="width:${((exam ? doneCount : quiz.i + (answered ? 1 : 0)) / n) * 100}%"></div></div>
        <p class="qtext">${esc(q.q)}</p>
        <div class="answers">${answers}</div>
        ${feedback}
        ${nav}
        ${confirmBox}
      </div>
      <aside class="side">
        <div class="panel stack" style="gap:6px">
          <span class="eyebrow">${quiz.limit ? "Temps restant" : "Temps écoulé"}</span>
          <span class="timer" id="timer">${timerText}</span>
        </div>
        ${exam ? `
        <div class="panel stack" style="gap:10px">
          <span class="eyebrow">${doneCount}/${n} répondues</span>
          <div class="grid">${quiz.items.map((x, k) => `<button class="cell ${x.pick !== null ? "done" : ""} ${k === quiz.i ? "cur" : ""} ${x.flag ? "flag" : ""}" data-act="goto" data-i="${k}" aria-label="Question ${k + 1}">${k + 1}</button>`).join("")}</div>
          <button class="btn primary" data-act="finish-ask">Rendre la copie</button>
        </div>` : `
        <div class="panel stack" style="gap:6px">
          <span class="eyebrow">Score en cours</span>
          <span class="timer">${quiz.items.filter((x) => x.pick !== null && x.pick === BY_ID[x.id].c).length}/${doneCount}</span>
        </div>`}
      </aside>
    </div>`;
  }

  function finishQuiz() {
    stopTimer();
    const exam = quiz.mode === "exam";
    const items = exam ? quiz.items : quiz.items.filter((x) => x.pick !== null);
    if (!items.length) { quiz = null; go("home"); return; }
    if (exam) items.forEach((x) => record(BY_ID[x.id], x.pick === BY_ID[x.id].c));
    const scores = {};
    items.forEach((x) => {
      const q = BY_ID[x.id];
      scores[q.s.id] = scores[q.s.id] || [0, 0];
      scores[q.s.id][1]++;
      if (x.pick === q.c) scores[q.s.id][0]++;
    });
    const ok = Object.values(scores).reduce((a, s) => a + s[0], 0);
    result = { mode: quiz.mode, items, scores, ok, total: items.length, secs: (Date.now() - quiz.start) / 1000, onlyWrong: false };
    history.push({ date: Date.now(), mode: quiz.mode, scores, ok, total: items.length, secs: result.secs });
    history = history.slice(-50);
    store.set("history", history);
    quiz = null;
    go("result");
  }

  function viewResult() {
    const r = result;
    if (!r) return viewHome();
    const exam = r.mode === "exam";
    const p = pct(r.ok, r.total);
    const entries = Object.entries(r.scores).sort();
    const allPass = entries.every(([, [o, t]]) => pct(o, t) >= PASS);
    const failed = entries.filter(([, [o, t]]) => pct(o, t) < PASS).map(([sid]) => SUBJ[sid].title);
    const list = r.items.filter((x) => !r.onlyWrong || x.pick !== BY_ID[x.id].c);
    return `
    <div class="stack">
      <section class="panel verdict">
        <span class="score-big">${p}<span style="font-size:.45em"> %</span></span>
        <div class="stack" style="gap:6px;flex:1;min-width:220px">
          <span class="eyebrow">${exam ? "Examen blanc" : r.mode === "errors" ? "Mes erreurs" : "Entraînement"} · ${r.ok}/${r.total} bonnes réponses · ${fmtTime(r.secs)}</span>
          ${exam
            ? `<h2>${allPass ? "Admis dans toutes les matières" : "Ajourné"}</h2><p class="muted">${allPass ? "Vous avez au moins 75 % partout. Gardez ce niveau sur plusieurs examens blancs avant la vraie session." : `En dessous de 75 % : ${failed.map(esc).join(", ")}. Relisez ces fiches puis refaites vos erreurs.`}</p>`
            : `<h2>${p >= PASS ? "Au-dessus du seuil de 75 %" : "En dessous du seuil de 75 %"}</h2><p class="muted">${p >= PASS ? "Bon travail. Tentez un examen blanc pour vérifier dans les conditions de l’examen." : "Relisez la fiche de cours correspondante puis refaites vos erreurs."}</p>`}
        </div>
        <div class="row">
          <button class="btn primary" data-act="${exam ? "exam-setup" : "practice-setup"}">${exam ? "Nouvel examen blanc" : "Nouvelle série"}</button>
          ${wrongIds().length ? `<button class="btn" data-act="errors">Mes erreurs</button>` : ""}
        </div>
      </section>

      <section class="panel gauge">
        <h3>Note par matière</h3>
        ${entries.map(([sid, [o, t]]) => { const v = pct(o, t); return `
          <button class="gbar" data-act="subject" data-id="${sid}" title="Ouvrir le cours">
            <span class="code">${sid}</span>
            <span class="track"><span class="fill ${v >= PASS ? "ok" : ""}" style="width:${v}%"></span><span class="lbl">${esc(SUBJ[sid].title)} · ${o}/${t}</span><span class="pass"></span></span>
            <span class="val">${v} %</span>
          </button>`; }).join("")}
        <div class="legend"><span><i style="background:var(--good)"></i>≥ 75 % réussi</span><span><i style="background:var(--blue)"></i>&lt; 75 % à retravailler</span><span><i style="background:var(--accent)"></i>seuil</span></div>
      </section>

      <section class="stack" style="gap:12px">
        <div class="row" style="justify-content:space-between">
          <h2>Correction</h2>
          <label class="pill"><input type="checkbox" id="only-wrong" data-act="only-wrong" ${r.onlyWrong ? "checked" : ""}><span>Seulement mes erreurs</span></label>
        </div>
        <div class="review">
          ${list.length ? list.map((x) => {
            const q = BY_ID[x.id];
            const k = r.items.indexOf(x) + 1;
            const good = x.pick === q.c;
            return `
            <div class="panel ritem">
              <div class="row" style="justify-content:space-between"><span class="eyebrow">Q${k} · ${q.s.id} · ${esc(q.t)}</span>${good ? '<span class="chip ok">Juste</span>' : x.pick === null ? '<span class="chip ko">Sans réponse</span>' : '<span class="chip ko">Faux</span>'}</div>
              <p class="q">${esc(q.q)}</p>
              <ul>${x.order.map((ai, pos) => `<li class="${ai === q.c ? "right" : ai === x.pick ? "wrong" : ""}">${LETTERS[pos]}. ${esc(q.a[ai])}</li>`).join("")}</ul>
              <p class="e">${esc(q.e)}</p>
            </div>`;
          }).join("") : `<div class="panel empty"><p>Aucune erreur. Sans faute !</p></div>`}
        </div>
      </section>
    </div>`;
  }

  // ---------- Rendu ----------
  function render() {
    const views = { home: viewHome, courses: viewCourses, subject: viewSubject, "practice-setup": viewPracticeSetup, "exam-setup": viewExamSetup, errors: viewErrors, quiz: viewQuiz, result: viewResult };
    if (state.view === "quiz" && !quiz) state.view = "home";
    $app.innerHTML = SUBJECTS.length ? (views[state.view] || viewHome)() : `<div class="panel empty"><h2>Aucune donnée</h2><p>Les fichiers du dossier data/ n’ont pas été chargés.</p></div>`;
    const tabFor = { home: "home", courses: "courses", subject: "courses", "practice-setup": "practice-setup", "exam-setup": "exam-setup", errors: "errors", quiz: quiz?.mode === "exam" ? "exam-setup" : quiz?.mode === "errors" ? "errors" : "practice-setup", result: result?.mode === "exam" ? "exam-setup" : "practice-setup" };
    document.querySelectorAll(".tab").forEach((t) => t.setAttribute("aria-current", String(t.dataset.act === tabFor[state.view])));
    const c = document.getElementById("err-count");
    if (c) { const n = wrongIds().length; c.textContent = n ? n : ""; }
  }

  // ---------- Événements ----------
  function answer(ai) {
    const it = quiz.items[quiz.i];
    if (quiz.mode !== "exam") {
      if (it.pick !== null) return;
      it.pick = ai;
      record(BY_ID[it.id], ai === BY_ID[it.id].c);
    } else it.pick = ai;
    render();
    if (quiz.mode !== "exam") document.getElementById("next-btn")?.focus({ preventScroll: true });
  }

  document.addEventListener("click", (e) => {
    const el = e.target.closest("[data-act]");
    if (!el) return;
    const act = el.dataset.act, id = el.dataset.id;
    switch (act) {
      case "home": go("home"); break;
      case "courses": go("courses"); break;
      case "subject": go("subject", { subject: id }); break;
      case "toc": e.preventDefault(); document.getElementById(el.dataset.target)?.scrollIntoView({ behavior: "smooth", block: "start" }); break;
      case "practice-setup": go("practice-setup"); break;
      case "exam-setup": go("exam-setup"); break;
      case "errors": go("errors"); break;
      case "practice-subject": startQuiz("practice", pickQuestions(SUBJ[id].questions.map((q) => q.id), 0, true)); break;
      case "errors-start": startQuiz("errors", pickQuestions(wrongIds().filter((q) => !id || q.startsWith(id + "-")), 0, false)); break;
      case "pills-all": case "pills-none":
        document.querySelectorAll(`input[name="${el.dataset.name}"]`).forEach((i) => { i.checked = act === "pills-all"; }); break;
      case "answer": answer(Number(el.dataset.a)); break;
      case "next": if (quiz.i < quiz.items.length - 1) { quiz.i++; quiz.confirm = false; render(); } break;
      case "prev": if (quiz.i > 0) { quiz.i--; render(); } break;
      case "goto": quiz.i = Number(el.dataset.i); render(); break;
      case "flag": quiz.items[quiz.i].flag = !quiz.items[quiz.i].flag; render(); break;
      case "finish-ask": quiz.confirm = true; render(); break;
      case "finish-cancel": quiz.confirm = false; render(); break;
      case "finish": finishQuiz(); break;
      case "only-wrong": result.onlyWrong = el.checked; render(); break;
      case "reset-ask":
        el.outerHTML = `<span class="row" style="gap:8px"><span>Tout effacer ?</span><button class="btn danger" data-act="reset">Oui, effacer</button><button class="btn" data-act="errors">Annuler</button></span>`; break;
      case "reset": stats = {}; history = []; store.set("stats", stats); store.set("history", history); go("home"); break;
    }
  });

  document.addEventListener("submit", (e) => {
    e.preventDefault();
    const f = e.target;
    const checked = (name) => [...f.querySelectorAll(`input[name="${name}"]:checked`)].map((i) => i.value);
    if (f.id === "practice-form") {
      const subs = checked("ps");
      if (!subs.length) { document.getElementById("ps-msg").textContent = "Cochez au moins une matière."; return; }
      const ids = ALL.filter((q) => subs.includes(q.s.id)).map((q) => q.id);
      startQuiz("practice", pickQuestions(ids, Number(checked("pn")[0]), checked("po")[0] === "smart"));
    } else if (f.id === "exam-form") {
      const subs = checked("es");
      if (!subs.length) { document.getElementById("es-msg").textContent = "Cochez au moins une matière."; return; }
      const per = Number(checked("en")[0]);
      const qs = subs.flatMap((sid) => shuffle(SUBJ[sid].questions).slice(0, per));
      startQuiz("exam", qs, qs.length * Number(checked("et")[0]));
    }
  });

  document.addEventListener("keydown", (e) => {
    if (state.view !== "quiz" || !quiz || e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.target.closest("input, textarea")) return;
    const k = e.key.toUpperCase();
    const pos = "ABCD".indexOf(k) >= 0 ? "ABCD".indexOf(k) : "1234".indexOf(k);
    const it = quiz.items[quiz.i];
    if (pos >= 0 && k.length === 1) { e.preventDefault(); answer(it.order[pos]); }
    else if ((e.key === "Enter" || e.key === "ArrowRight") && (quiz.mode === "exam" || it.pick !== null)) {
      if (e.target.closest("button") && e.key === "Enter") return; // le bouton focalisé gère Entrée
      e.preventDefault();
      if (quiz.i < quiz.items.length - 1) { quiz.i++; quiz.confirm = false; render(); }
      else if (quiz.mode !== "exam") finishQuiz();
    } else if (e.key === "ArrowLeft" && quiz.mode === "exam" && quiz.i > 0) { quiz.i--; render(); }
  });

  // ---------- Démarrage (conserve un quiz en cours lors d'une mise à jour de la page) ----------
  function start(saved) {
    if (saved && saved.state) {
      state = saved.state; quiz = saved.quiz || null; result = saved.result ? { ...saved.result } : null;
      if (quiz && quiz.items.some((x) => !BY_ID[x.id])) quiz = null;
      if (result && result.items.some((x) => !BY_ID[x.id])) result = null;
    }
    render();
    if (quiz) startTimer();
  }
  window.claude?.hot?.snapshot?.(() => ({ state, quiz, result }));
  if (window.claude?.hot?.ready) window.claude.hot.ready(start); else start(window.claude?.hot?.data ?? {});
})();
