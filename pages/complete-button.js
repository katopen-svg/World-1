(function() {
  const WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbxpOswPhEs6HACs0XA0pNS88zj9dHRyGkInlQLTQH81UZaJBe4tl1PiP2tI9A3xw0Cz/exec';

  function init() {
    const params = new URLSearchParams(window.location.search);
    const email = params.get('email');
    const stageId = params.get('stageId');
    const rowIndex = params.get('rowIndex');
    if (!email || !stageId || !rowIndex) return;

    const wrap = document.createElement('div');
    wrap.style.cssText = 'margin:60px auto 40px;max-width:500px;padding:0 20px;text-align:center;';

    const btn = document.createElement('a');
    btn.href = WEBAPP_URL + '?action=complete&email=' + encodeURIComponent(email) + '&stageId=' + encodeURIComponent(stageId) + '&rowIndex=' + rowIndex;
    btn.textContent = '✅ このアクションを完了する';
    btn.style.cssText = 'display:block;padding:18px 32px;background:linear-gradient(135deg,#22c55e,#16a34a);color:white;font-weight:bold;font-size:18px;text-decoration:none;border-radius:14px;box-shadow:0 6px 16px rgba(34,197,94,0.3);';

    const note = document.createElement('p');
    note.textContent = '押すとスプシとクエスト一覧の両方にチェックが入ります';
    note.style.cssText = 'margin-top:12px;color:#6b7280;font-size:14px;';

    wrap.appendChild(btn);
    wrap.appendChild(note);
    document.body.appendChild(wrap);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
