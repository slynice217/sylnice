(function () {
  'use strict';
  const root = document.getElementById('app');
  const data = window.__BLOKKO_DATA__;
  if (!root || !data || !Array.isArray(data.items)) return;
  const items = data.items.filter(item => item && item.isVisible !== false && item.type !== 'subpage');
  const media = value => value ? './' + String(value).replace(/^\.?\//, '') : '';
  const el = (tag, cls, text) => {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
  };
  const rich = (node, html) => { node.innerHTML = html || ''; };
  const image = (src, alt, cls) => {
    const img = el('img', cls || '', alt || '');
    img.src = media(src); img.alt = alt || ''; img.loading = 'lazy';
    img.onerror = () => img.hidden = true;
    return img;
  };
  function renderProfile(item) {
    const card = el('div','profile-block');
    const avatar = image(item.avatar, item.nickname || '头像','profile-avatar');
    card.append(avatar);
    card.append(el('p','profile-kicker','PERSONAL SPACE'));
    card.append(el('h1','profile-name',item.nickname || ''));
    card.append(el('p','profile-subtitle',item.subtitle || ''));
    const bio = el('div','profile-bio'); rich(bio,item.bio); card.append(bio);
    const links = el('div','social-links');
    // 社交账号由原始 button 模块统一渲染，保留原图标与链接。
    card.append(links);
    return card;
  }
  function renderItem(item) {
    const width = Number(item.layout && item.layout.width) || 100;
    const wrap = el('article','content-module module-'+item.type);
    wrap.dataset.moduleType=item.type;
    if(item.type==='spacer'){ wrap.className='intentional-spacer'; wrap.style.height=Math.max(0,Number(item.height)||0)+'px'; wrap.setAttribute('aria-hidden','true'); return wrap; }
    if(item.type==='profile') return renderProfile(item);
    if(item.type==='card'){
      if(item.title) wrap.append(el('h2','module-title',item.title));
      const body=el('div','rich-content'); rich(body,item.content); wrap.append(body); return wrap;
    }
    if(item.type==='music'){
      const row=el('div','music-module');
      if(item.coverArt) row.append(image(item.coverArt,item.songTitle||'专辑封面','music-cover'));
      const details=el('div','music-details'); details.append(el('p','eyebrow','NOW PLAYING'),el('h3','music-title',item.songTitle||'音乐'),el('p','music-artist',item.artist||''));
      const audio=el('audio','music-audio'); audio.controls=true; audio.preload='none'; if(item.audioUrl) audio.src=media(item.audioUrl); details.append(audio);
      if(item.lyrics){const lyrics=el('details','lyrics-details');lyrics.append(el('summary','','歌词 / 创作信息'));const p=el('p','lyrics-text',item.lyrics.trim());lyrics.append(p);details.append(lyrics);}
      row.append(details); wrap.append(row); return wrap;
    }
    if(item.type==='button'){
      wrap.classList.add('module-button');
      const text=item.text||item.title||'打开链接';
      const urls={'kwong_jisoo':'https://www.tiktok.com/@kwong_jisoo','Sylnice217':'https://qntwx.com/sylnice','sylnice_217':'https://www.instagram.com/sylnice_217/'};
      const url=text==='sylnice_217'?'https://www.instagram.com/sylnice_217/':'#';
      const a=el('a','identity-link','');
      const icons={
        'ic:baseline-tiktok':'<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M19.6 7.2a6.8 6.8 0 0 1-4.2-1.5v8.1a6.2 6.2 0 1 1-5.4-6.1v3.4a2.9 2.9 0 1 0 2 2.8V2.5h3.4c.2 2 1.8 3.7 4.2 4z"/></svg>',
        'ic:baseline-wechat':'<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M9.5 4C5.4 4 2 6.7 2 10c0 1.9 1.1 3.6 2.8 4.7L4 17l2.8-1.4c.8.2 1.7.4 2.7.4h.5a5.2 5.2 0 0 1-.5-2.2c0-3.2 3.1-5.8 6.9-5.8h.6C15.9 5.7 13 4 9.5 4M7 8.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2m5 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2m4.5.5c-3 0-5.5 1.9-5.5 4.3s2.5 4.3 5.5 4.3c.7 0 1.4-.1 2-.3l2.5 1.2-.7-2.1c1.1-.8 1.7-1.9 1.7-3.1 0-2.4-2.5-4.3-5.5-4.3m-1.8 3.2a.8.8 0 1 1 0-1.6.8.8 0 0 1 0 1.6m3.7 0a.8.8 0 1 1 0-1.6.8.8 0 0 1 0 1.6"/></svg>',
        'mdi:instagram':'<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5m0 2.2A2.8 2.8 0 0 0 4.2 7v10A2.8 2.8 0 0 0 7 19.8h10a2.8 2.8 0 0 0 2.8-2.8V7A2.8 2.8 0 0 0 17 4.2zm5 2.3a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11m0 2.2a3.3 3.3 0 1 0 0 6.6 3.3 3.3 0 0 0 0-6.6M17.6 5.5a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6"/></svg>'
      };
      if(icons[item.icon]){const icon=el('span','identity-icon');icon.innerHTML=icons[item.icon];a.append(icon);}
      a.append(el('span','identity-label',text));
      a.href=url; if(url==='#'){a.removeAttribute('target');a.removeAttribute('rel');a.addEventListener('click',event=>event.preventDefault());}else{a.target='_blank';a.rel='noopener noreferrer';}
      if(item.subtext) a.append(el('small','',item.subtext)); wrap.append(a); return wrap;
    }
    if(item.type==='timer'){
      const box=el('div','timer-module'); 
      if(item.labelBefore) box.append(el('p','timer-label',item.labelBefore));
      const target=new Date(item.targetDate||'').getTime();
      const out=el('p','timer-value',''); box.append(out);
      const countUp=Boolean(item.labelAfter);
      const update=()=>{const delta=countUp?Date.now()-target:target-Date.now();if(!Number.isFinite(target)){out.textContent='';return;}if(!countUp&&delta<=0){out.textContent=item.expiredText||'已结束';return;}const elapsed=Math.max(0,delta),days=Math.floor(elapsed/86400000),hours=Math.floor(elapsed%86400000/3600000),mins=Math.floor(elapsed%3600000/60000),secs=Math.floor(elapsed%60000/1000);out.textContent=days+' 天 '+hours+' 小时 '+mins+' 分 '+secs+' 秒';};
      update(); window.setInterval(update,1000); if(item.labelAfter) box.append(el('p','timer-label',item.labelAfter)); wrap.append(box); return wrap;
    }
    if(item.type==='progress'){
      const line=el('div','progress-row'); line.append(el('span','progress-label',item.label||''),el('span','progress-number',(Number(item.percentage)||0)+'%'));
      const track=el('div','progress-track'),fill=el('div','progress-fill'); fill.style.width=Math.max(0,Math.min(100,Number(item.percentage)||0))+'%'; fill.style.background=item.color||'var(--purple)'; track.append(fill); wrap.append(line,track); return wrap;
    }
    if(item.type==='timeline'){
      if(item.title) wrap.append(el('h2','module-title',item.title));
      const list=el('div','timeline-list'); (item.cards||[]).forEach(c=>{const row=el('div','timeline-entry');row.append(el('time','timeline-time',c.time||''));const body=el('div','timeline-copy');rich(body,c.content);row.append(body);list.append(row);});wrap.append(list);return wrap;
    }
    if(item.type==='grid'){
      if(item.title) wrap.append(el('h2','module-title',item.title));
      const grid=el('div','destination-grid');(item.items||[]).forEach(g=>{const figure=el('figure','destination-item');figure.append(image(g.image,g.text||'','destination-image'));const cap=el('figcaption','destination-caption',g.text||'');if(g.subtitle)cap.append(el('small','',g.subtitle));figure.append(cap);grid.append(figure);});wrap.append(grid);return wrap;
    }
    if(item.type==='qa'){
      const details=el('div','qa-item');details.append(el('h3','qa-question',item.question||''));
      const answer=el('div','qa-answer');rich(answer,item.answer);details.append(answer);wrap.append(details);return wrap;
    }
    if(item.type==='showcase'){
      const card=el('div','showcase-item');
      if(item.coverArt)card.append(image(item.coverArt,item.title||'','showcase-cover'));
      const info=el('div','showcase-info');info.append(el('h3','showcase-title',item.title||''),el('p','showcase-subtitle',item.subtitle||''));
      if(item.rating!==undefined&&item.rating!==null)info.append(el('p','showcase-rating','★ '+item.rating+'/5'));
      if(item.comment)info.append(el('p','showcase-comment',item.comment.trim()));
      card.append(info);wrap.append(card);return wrap;
    }
    return null;
  }
  const hero=el('section','home-hero');
  const profile=items.find(x=>x.type==='profile'); if(profile)hero.append(renderProfile(profile));
  const notice=items.find(x=>x.type==='card'&&String(x.title||'').includes('阅前须知'));
  if(notice){const n=renderItem(notice);n.classList.add('notice-module');hero.append(n);}
  root.replaceChildren(hero);
  const rest=el('div','home-content');
  let section=el('section','content-section');
  let currentWidth=0;
  items.forEach(item=>{
    if(item===profile||item===notice)return;
    const node=renderItem(item); if(!node)return;
    if(item.type==='spacer'){if(section.childNodes.length){rest.append(section);section=el('section','content-section');currentWidth=0;}rest.append(node);return;}
    const w=Number(item.layout&&item.layout.width)||100;
    if(currentWidth+w>100){if(section.childNodes.length)rest.append(section);section=el('section','content-section');currentWidth=0;}
    node.style.setProperty('--module-width',Math.min(100,w)+'%');
    section.append(node); currentWidth+=w;
    if(w>=100){rest.append(section);section=el('section','content-section');currentWidth=0;}
  });
  if(section.childNodes.length)rest.append(section);
  root.append(rest);
  const jump=el('button','scroll-cue','向下探索 ↓');jump.type='button';jump.addEventListener('click',()=>rest.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'}));hero.append(jump);
})();