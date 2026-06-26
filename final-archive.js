/*
  PHOTON Final Arşivi / Editör Modu
  Amaç: Ana soru havuzunu silmeden, seçilmiş final soruları için ayrı bir yerel arşiv oluşturmak.
  Kullanım: index.html içinde </body> kapanışından hemen önce şu satır eklenir:
  <script src="final-archive.js"></script>
*/
(function(){
  const FINAL_KEY='photon_final_archive_v1';
  const NOTE_KEY='photon_final_notes_v1';

  function safeParse(key, fallback){
    try{return JSON.parse(localStorage.getItem(key)||JSON.stringify(fallback));}
    catch(e){return fallback;}
  }
  function save(key, value){localStorage.setItem(key, JSON.stringify(value));}
  function esc(s){return String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));}
  function qid(q){return q && (q.id || q.sourceId || q.question);}
  function getFinalIds(){return safeParse(FINAL_KEY, []);}
  function setFinalIds(ids){save(FINAL_KEY, [...new Set(ids)]);}
  function getNotes(){return safeParse(NOTE_KEY, {});}
  function setNotes(notes){save(NOTE_KEY, notes);}
  function pool(){
    try{return typeof allPool==='function'?allPool():[];}
    catch(e){return [];}
  }
  function finalQuestions(){
    const ids=new Set(getFinalIds());
    return pool().filter(q=>ids.has(qid(q)));
  }
  function isFinal(q){return getFinalIds().includes(qid(q));}
  function toggleFinal(q){
    const id=qid(q); if(!id) return;
    const ids=getFinalIds();
    const next=ids.includes(id)?ids.filter(x=>x!==id):ids.concat(id);
    setFinalIds(next);
    renderFinalArchivePanel();
    if(typeof render==='function') render();
  }
  function setImportance(q, value){
    const id=qid(q); if(!id) return;
    const notes=getNotes();
    notes[id]=notes[id]||{};
    notes[id].importance=value;
    notes[id].updatedAt=new Date().toLocaleString('tr-TR');
    setNotes(notes);
    renderFinalArchivePanel();
  }
  function setNote(q, value){
    const id=qid(q); if(!id) return;
    const notes=getNotes();
    notes[id]=notes[id]||{};
    notes[id].note=value;
    notes[id].updatedAt=new Date().toLocaleString('tr-TR');
    setNotes(notes);
    renderFinalArchivePanel();
  }
  window.PHOTON_FINAL={getFinalIds,setFinalIds,finalQuestions,toggleFinal,setImportance,setNote};

  function injectStyles(){
    if(document.getElementById('photonFinalStyles')) return;
    const style=document.createElement('style');
    style.id='photonFinalStyles';
    style.textContent=`
      .finalTools{margin-top:14px;border:1px solid #e5e7eb;background:#f8fafc;border-radius:18px;padding:12px;text-align:left}
      .finalTools .miniBtns{display:flex;gap:8px;flex-wrap:wrap;margin-top:8px}
      .finalMini{border:1px solid #e5e7eb;background:white;border-radius:999px;padding:9px 11px;font-weight:900;cursor:pointer;font-size:12px}
      .finalMini.active{background:#111827;color:white;border-color:#111827}
      .finalArchive{margin-top:14px;background:#fff;border:1px solid #e5e7eb;border-radius:18px;padding:14px}
      .finalArchiveItem{border:1px solid #e5e7eb;border-radius:14px;padding:12px;margin:10px 0;background:#f8fafc}
      .finalArchiveItem textarea{min-height:64px;margin-top:8px}
      .finalHead{display:flex;justify-content:space-between;gap:10px;align-items:flex-start;flex-wrap:wrap}
      .finalCount{font-weight:950;color:#3730a3;background:#eef2ff;border-radius:999px;padding:7px 10px;font-size:12px}
    `;
    document.head.appendChild(style);
  }

  function addFinalButtonToQuestion(){
    const q=(typeof exam!=='undefined' && exam && exam[idx])?exam[idx]:null;
    const card=document.querySelector('#exam .card');
    if(!q||!card) return;
    let box=document.getElementById('finalTools');
    if(!box){
      box=document.createElement('div');
      box.id='finalTools';
      box.className='finalTools';
      const opts=document.getElementById('opts');
      if(opts && opts.parentNode) opts.parentNode.insertBefore(box, opts.nextSibling);
      else card.appendChild(box);
    }
    const notes=getNotes()[qid(q)]||{};
    const active=isFinal(q);
    box.innerHTML=`
      <b>Final Arşivi Editörü</b>
      <div class="small">Bu soru ana havuzdan silinmez; sadece seçilmiş final listesine eklenir veya çıkarılır.</div>
      <div class="miniBtns">
        <button class="finalMini ${active?'active':''}" id="finalToggleBtn">${active?'Finalden Çıkar':'Finale Ekle'}</button>
        <button class="finalMini ${notes.importance==='çok yüksek'?'active':''}" data-imp="çok yüksek">★★★★★ Çok önemli</button>
        <button class="finalMini ${notes.importance==='yüksek'?'active':''}" data-imp="yüksek">★★★★☆ Yüksek</button>
        <button class="finalMini ${notes.importance==='orta'?'active':''}" data-imp="orta">★★★☆☆ Orta</button>
      </div>
      <textarea id="finalQuickNote" placeholder="Editör notu: örn. Marmara için kritik, hocanın sevdiği konu, tekrar et...">${esc(notes.note||'')}</textarea>
    `;
    document.getElementById('finalToggleBtn').onclick=()=>toggleFinal(q);
    box.querySelectorAll('[data-imp]').forEach(b=>b.onclick=()=>setImportance(q,b.dataset.imp));
    document.getElementById('finalQuickNote').onchange=e=>setNote(q,e.target.value);
  }

  function renderFinalArchivePanel(){
    const host=document.getElementById('finalArchivePanel');
    if(!host) return;
    const list=finalQuestions();
    const notes=getNotes();
    host.innerHTML=`
      <div class="finalHead"><h3>Final Arşivi</h3><span class="finalCount">${list.length} seçili soru</span></div>
      <p class="small">Bu alan sınav öncesi son tekrar için ayıklanmış soruları gösterir. Ana soru havuzu korunur.</p>
      ${list.length?list.map(q=>{
        const n=notes[qid(q)]||{};
        return `<div class="finalArchiveItem">
          <b>${esc(q.question)}</b>
          <div class="small">Konu: ${esc(q.category||'-')} · Zorluk: ${esc(q.difficulty||'-')} · Önem: ${esc(n.importance||'belirlenmedi')}</div>
          <div class="small"><b>Doğru cevap:</b> ${esc((q.options||[])[q.correctIndex]||'-')}</div>
          ${n.note?`<div class="reason"><b>Editör notu:</b> ${esc(n.note)}</div>`:''}
          <button class="finalMini" data-remove="${esc(qid(q))}">Finalden Çıkar</button>
        </div>`;
      }).join(''):'<p class="small">Henüz final arşivine soru eklenmedi. Sınav sırasında soruların altındaki “Finale Ekle” düğmesini kullan.</p>'}
    `;
    host.querySelectorAll('[data-remove]').forEach(b=>b.onclick=()=>{
      setFinalIds(getFinalIds().filter(id=>id!==b.dataset.remove));
      renderFinalArchivePanel();
    });
  }

  function injectAdminPanel(){
    const adminArea=document.getElementById('adminArea');
    if(!adminArea || document.getElementById('finalArchivePanel')) return;
    const panel=document.createElement('div');
    panel.id='finalArchivePanel';
    panel.className='finalArchive';
    adminArea.appendChild(panel);
    renderFinalArchivePanel();
  }

  function addFinalModeOption(){
    const mode=document.getElementById('mode');
    if(!mode || mode.querySelector('option[value="final"]')) return;
    const opt=document.createElement('option');
    opt.value='final';
    opt.textContent='Final Arşivi: sadece seçilmiş sorular';
    mode.appendChild(opt);
  }

  const oldMakeExam=typeof makeExam==='function'?makeExam:null;
  if(oldMakeExam){
    makeExam=function(){
      const modeEl=document.getElementById('mode');
      if(modeEl && modeEl.value==='final'){
        let p=finalQuestions();
        if(!p.length){alert('Final arşivinde henüz soru yok. Önce soruları finale ekleyin.'); modeEl.value='mixed'; return oldMakeExam();}
        p=shuffle([...p]).slice(0, selectedCount);
        return p.map(q=>{let opts=q.options.map((t,i)=>({t,i})); shuffle(opts); return {...q,shuffled:opts,correctShuffled:opts.findIndex(o=>o.i===q.correctIndex)};});
      }
      return oldMakeExam();
    };
  }

  const oldRender=typeof render==='function'?render:null;
  if(oldRender){
    render=function(){oldRender(); addFinalButtonToQuestion();};
  }
  const oldRenderAdmin=typeof renderAdmin==='function'?renderAdmin:null;
  if(oldRenderAdmin){
    renderAdmin=function(){oldRenderAdmin(); injectAdminPanel();};
  }

  document.addEventListener('DOMContentLoaded',()=>{
    injectStyles();
    addFinalModeOption();
    injectAdminPanel();
  });
  setTimeout(()=>{injectStyles();addFinalModeOption();injectAdminPanel();},300);
})();
