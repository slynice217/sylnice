(function(){
  'use strict';
  const app=document.getElementById('app');
  if(!app)return;
  function apply(){
    const canvas=app.querySelector('.preview-canvas-area, .preview-canvas, .preview-items-container');
    const items=app.querySelector('.preview-items-container');
    if(!canvas||!items)return false;
    const cards=Array.from(items.querySelectorAll('.preview-item-wrapper, .preview-card'));
    if(cards.length){
      cards.forEach((card,i)=>{
        card.classList.remove('home-snap-start');
        if(i===0)card.classList.add('home-snap-start');
      });
    }
    const notice=Array.from(items.querySelectorAll('*')).find(el=>{
      if(el.children.length>3)return false;
      const text=(el.textContent||'').replace(/[：:]/g,'').trim();
      return text==='阅前须知' || text==='阅前须知：';
    });
    if(notice){
      const noticeCard=notice.closest('.preview-item-wrapper, .preview-card')||notice;
      noticeCard.classList.add('home-snap-start');
    }
    document.documentElement.classList.add('home-section-snap');
    return true;
  }
  if(apply())return;
  const observer=new MutationObserver(()=>{if(apply())observer.disconnect();});
  observer.observe(app,{childList:true,subtree:true});
  setTimeout(()=>observer.disconnect(),20000);
})();