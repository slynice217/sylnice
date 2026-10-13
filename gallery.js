(() => {
  'use strict';
  const albumNumbers = [1, 2, 3];
  const photoCount = 5;
  const root = document.getElementById('albums');
  if (!root) return;

  function buildAlbum(number) {
    const section = document.createElement('section');
    section.className = 'album';
    const title = document.createElement('div');
    title.className = 'album-title';
    title.textContent = number === 3 ? '宝贝nikki' : '图集' + number;
    section.appendChild(title);

    const carousel = document.createElement('div');
    carousel.className = 'album-carousel depth-stack';
    carousel.setAttribute('aria-label', title.textContent + '，左右滑动切换照片');
    const track = document.createElement('div');
    track.className = 'album-track';

    for (let index = 1; index <= photoCount; index++) {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'depth-card';
      card.setAttribute('aria-label', '照片 ' + index + '，点击翻面');
      card.innerHTML = '<div class="depth-card-inner"><div class="depth-face depth-front"><img alt="" draggable="false"></div><div class="depth-face depth-back"><span>0' + index + ' / 05</span><h3>' + (number === 3 ? '宝贝nikki' : '图集 ' + number) + '</h3><p>照片 ' + index + '</p><small>点击翻回照片</small></div></div>';
      const img = card.querySelector('img');
      img.src = './assets/gallery/album' + number + '/' + index + '.jpg';
      img.onerror = () => {
        card.classList.add('photo-missing');
        img.alt = '图集' + number + '的第' + index + '张照片尚未上传';
        img.removeAttribute('src');
        card.disabled = true;
      };
      card.addEventListener('click', () => card.classList.toggle('is-flipped'));
      track.appendChild(card);
    }

    carousel.appendChild(track);
    section.appendChild(carousel);
    root.appendChild(section);

    const cards = Array.from(track.children);
    let current = 0;
    let startX = 0;
    let startY = 0;
    let dragging = false;
    let didSwipe = false;

    function render() {
      cards.forEach((card, i) => {
        let offset = i - current;
        if (offset > cards.length / 2) offset -= cards.length;
        if (offset < -cards.length / 2) offset += cards.length;
        const distance = Math.abs(offset);
        const x = offset * (window.innerWidth <= 600 ? 54 : 66);
        card.style.transform = 'translate3d(' + x + 'px,' + (distance * 5) + 'px,' + (-distance * 95) + 'px) rotateY(' + (-offset * 13) + 'deg) rotateZ(' + (-offset * 2.5) + 'deg) scale(' + (offset === 0 ? 1 : Math.max(.68, 1 - distance * .1)) + ')';
        card.style.zIndex = String(10 - distance);
        card.style.opacity = distance > 2 ? '0' : '1';
        card.style.pointerEvents = distance > 2 ? 'none' : 'auto';
        card.tabIndex = distance === 0 ? 0 : -1;
      });
    }

    carousel.addEventListener('pointerdown', event => {
      startX = event.clientX;
      startY = event.clientY;
      dragging = true;
      didSwipe = false;
    });
    carousel.addEventListener('pointerup', event => {
      if (!dragging) return;
      dragging = false;
      const dx = event.clientX - startX;
      const dy = event.clientY - startY;
      if (Math.abs(dx) > 35 && Math.abs(dx) > Math.abs(dy)) {
        current = (current + (dx < 0 ? 1 : -1) + cards.length) % cards.length;
        didSwipe = true;
        render();
      }
    });
    carousel.addEventListener('pointercancel', () => { dragging = false; });
    render();
  }

  albumNumbers.forEach(buildAlbum);
})();