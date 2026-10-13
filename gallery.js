const albums=[1,2,3];
const albumPhotoCount=5;
const root=document.getElementById('albums');
const viewer=document.getElementById('viewer');
const photos=document.getElementById('photos');

albums.forEach(n=>{
 const a=document.createElement('section');
 a.className='album';
 a.innerHTML=`<div class="album-title">${n===3?"宝贝nikki":`图集${n}`}</div><div class="album-carousel ${n===3?'album3-depth':''}" aria-label="图集${n}，左右滑动切换照片"><div class="album-track">${Array.from({length:albumPhotoCount},(_,i)=>i+1).map(i=>n===2?`<div class="album2-card"><div class="album2-card-inner"><div class="album2-face album2-front"><img src="./assets/gallery/album2/${i}.jpg" alt="图集2照片${i}" draggable="false"></div><div class="album2-face album2-back"><span>0${i} / 05</span><h3>图集 2</h3><p>照片 ${i}</p><small>点击翻回照片</small></div></div></div>`:`<img src="./assets/gallery/album${n}/${i}.jpg" alt="图集${n}照片${i}" draggable="false">`).join('')}</div></div>`;
 setupAlbumCarousel(a,n);
 root.appendChild(a);
});

function setupAlbumCarousel(album,albumNumber){
 const carousel=album.querySelector('.album-carousel');
 const track=album.querySelector('.album-track');
 const slides=Array.from(track.children);
 const counter=album.querySelector('.album-counter');
 let current=0,startX=0,startY=0,dragging=false;
 function goTo(index){
   current=(index+slides.length)%slides.length;
   if(albumNumber===3){
     slides.forEach((slide,i)=>{
       let offset=i-current;
       if(offset>slides.length/2)offset-=slides.length;
       if(offset< -slides.length/2)offset+=slides.length;
       slide.style.transform=`translateX(calc(${offset} * 54px)) translateZ(${offset===0?0:-Math.abs(offset)*75}px) rotateY(${offset* -16}deg) scale(${offset===0?1:Math.max(.72,1-Math.abs(offset)*.12)})`;
       slide.style.zIndex=String(10-Math.abs(offset));
       slide.style.opacity=Math.abs(offset)>2?'0': '1';
     });
   }else{
     track.style.transform=`translateX(-${current*100}%)`;
   }
   if(counter) counter.textContent=`${current+1} / ${slides.length}`;
 }
 carousel.addEventListener('touchstart',e=>{startX=e.touches[0].clientX;startY=e.touches[0].clientY;},{passive:true});
 carousel.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-startX;const dy=e.changedTouches[0].clientY-startY;if(Math.abs(dx)>40&&Math.abs(dx)>Math.abs(dy))goTo(current+(dx<0?1:-1));},{passive:true});
 carousel.addEventListener('pointerdown',e=>{if(e.pointerType==='touch')return;startX=e.clientX;startY=e.clientY;dragging=true;});
 carousel.addEventListener('pointerup',e=>{if(!dragging)return;dragging=false;const dx=e.clientX-startX;const dy=e.clientY-startY;if(Math.abs(dx)>40&&Math.abs(dx)>Math.abs(dy))goTo(current+(dx<0?1:-1));});
 if(albumNumber===2){slides.forEach(slide=>slide.addEventListener('click',e=>{if(!carousel.dataset.swiped)slide.classList.toggle('is-flipped')}));}
 goTo(0);
}

function openAlbum(n){
 root.classList.add('closed');
 viewer.classList.remove('hidden');
 if(n===2||n===3){
   photos.className='flip-gallery';
   photos.innerHTML=`<div class="flip-track" id="flipTrack">${Array.from({length:albumPhotoCount},(_,i)=>i+1).map(i=>`
    <article class="flip-card" tabindex="0" role="button" aria-label="图集${n}照片${i}，点击翻面">
      <div class="flip-card-inner">
        <div class="flip-card-face flip-card-front"><img src="./assets/gallery/album${n}/${i}.jpg" alt="图集2照片${i}"></div>
        <div class="flip-card-face flip-card-back"><div class="flip-card-back-content"><span class="flip-card-number">0${i} / 05</span><h3>图集 ${n}</h3><p>照片 ${i}</p><span class="flip-hint">点击翻回照片</span></div></div>
      </div>
    </article>`).join('')}</div><div class="flip-controls"><span id="flipCounter">1 / 5</span></div><p class="flip-help">左右滑动切换 · 点击卡片翻面</p>`;
   setupFlipGallery();
 }else{
   photos.className='';
   photos.innerHTML=Array.from({length:albumPhotoCount},(_,i)=>i+1).map(i=>`<img class="viewer-photo" src="./assets/gallery/album${n}/${i}.jpg" alt="照片${i}">`).join('');
 }
 window.scrollTo(0,0);
}

function setupFlipGallery(){
 const track=document.getElementById('flipTrack');
 const cards=Array.from(track.querySelectorAll('.flip-card'));
 const counter=document.getElementById('flipCounter');
 let current=0,startX=0,startY=0,dragging=false;
 function goTo(index){
   current=Math.max(0,Math.min(cards.length-1,index));
   track.style.transform=`translateX(calc(50vw - min(82vw, 300px) / 2 - ${current} * (min(82vw, 300px) + 22px)))`;
   counter.textContent=`${current+1} / ${cards.length}`;
 }
 cards.forEach(card=>{
   card.addEventListener('click',()=>card.classList.toggle('is-flipped'));
   card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();card.classList.toggle('is-flipped')}});
 });
 track.addEventListener('pointerdown',e=>{startX=e.clientX;startY=e.clientY;dragging=true;track.dataset.dragging='false';});
 track.addEventListener('pointermove',e=>{if(dragging&&(Math.abs(e.clientX-startX)>8||Math.abs(e.clientY-startY)>8))track.dataset.dragging='true';});
 track.addEventListener('pointerup',e=>{if(!dragging)return;dragging=false;const dx=e.clientX-startX;const dy=e.clientY-startY;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)){goTo(current+(dx<0?1:-1));}});
 track.addEventListener('pointercancel',()=>{dragging=false;});
 goTo(0);
}

document.getElementById('back').onclick=()=>{
 viewer.classList.add('hidden');
 root.classList.remove('closed');
 photos.innerHTML='';
 photos.className='';
};
