(function(){
  'use strict';
  const app = document.getElementById('app');
  if (!app) return;
  const noticeText = '阅前须知';
  function enhance(){
    const candidates = Array.from(app.querySelectorAll('h1,h2,h3,[class*="title"],[class*="heading"]'));
    const notice = candidates.find(el => (el.textContent || '').replace(/[：:]/g,'').trim().includes(noticeText));
    if (!notice) return false;
    // Mark the notice boundary as the only snap point we can identify reliably
    // without rewriting Blokko's generated content tree.
    const section = notice.closest('.preview-card,article,section,[class*="section"]') || notice;
    section.classList.add('home-snap-start');
    document.documentElement.classList.add('home-section-snap');
    return true;
  }
  if (enhance()) return;
  const observer = new MutationObserver(function(){
    if (enhance()) observer.disconnect();
  });
  observer.observe(app,{childList:true,subtree:true});
  window.setTimeout(function(){ observer.disconnect(); },10000);
})();