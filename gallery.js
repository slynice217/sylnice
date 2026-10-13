const albums=[1,2,3];
const root=document.getElementById('albums');
const viewer=document.getElementById('viewer');
const photos=document.getElementById('photos');

albums.forEach(n=>{
 const a=document.createElement('section');
 a.className='album';
 a.innerHTML=`<div class="album-title">📷 图集${n}</div><div class="stack">${[4,3,2,1].map(i=>`<img src="./assets/gallery/album${n}/${i}.jpg" alt="图集${n}照片${i}">`).join('')}</div>`;
 a.onclick=()=>openAlbum(n);
 root.appendChild(a);
});

function openAlbum(n){
 root.classList.add('closed');
 viewer.classList.remove('hidden');
 photos.innerHTML=[1,2,3,4].map(i=>`<img class="viewer-photo" src="./assets/gallery/album${n}/${i}.jpg" alt="照片${i}">`).join('');
 window.scrollTo(0,0);
}

document.getElementById('back').onclick=()=>{
 viewer.classList.add('hidden');
 root.classList.remove('closed');
 photos.innerHTML='';
};