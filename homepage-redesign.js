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
    [['Instagram','https://www.instagram.com/sylnice_217/'],['微信 / 联系','https://qntwx.com/sylnice']].forEach(([label,url])=>{
      const a=el('a','social-link',label); a.href=url; a.target='_blank'; a.rel='noopener noreferrer'; links.append(a);
    });
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
      const urls={'kwong_jisoo':'https://qntwx.com/sylnice','Sylnice217':'https://qntwx.com/sylnice','sylnice_217':'https://www.instagram.com/sylnice_217/'};
      const url=(item.interactions&&item.interactions.jump&&item.interactions.jump.payload)||urls[text];
      const a=el('a','identity-link',text); a.href=url||'#'; a.target='_blank'; a.rel='noopener noreferrer';
      if(item.subtext) a.append(el('small','',item.subtext)); wrap.append(a); return wrap;
    }
    if(item.type==='timer'){
      const box=el('div','timer-module'); box.append(el('h3','module-title',item.title||'倒计时'));
      if(item.labelBefore) box.append(el('p','timer-label',item.labelBefore));
      const target=new Date(item.targetDate||'').getTime();
      const out=el('p','timer-value',''); box.append(out);
      const update=()=>{const left=target-Date.now();if(!Number.isFinite(target)){out.textContent='';return;}if(left<=0){out.textContent=item.expiredText||'已结束';return;}const days=Math.floor(left/86400000),hours=Math.floor(left%86400000/3600000),mins=Math.floor(left%3600000/60000),secs=Math.floor(left%60000/1000);out.textContent=days+' 天 '+hours+' 小时 '+mins+' 分 '+secs+' 秒';};
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
      const details=el('details','qa-item');details.append(el('summary','qa-question',item.question||''));
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