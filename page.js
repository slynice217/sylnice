/* Standalone behavior for page.html. No Blokko runtime is required. */
(() => {
  'use strict';
  document.documentElement.classList.add('renovation-page');

  const adminButton = document.getElementById('live-log-admin-shortcut');
  if (adminButton) {
    adminButton.addEventListener('click', () => {
      const section = document.getElementById('live-renovation-logs');
      const panel = document.getElementById('live-log-admin');
      if (!section || !panel) {
        window.alert('管理员登录模块未加载，请刷新页面后重试。');
        return;
      }
      panel.open = true;
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.setTimeout(() => {
        const email = document.getElementById('live-log-email');
        if (email) email.focus({ preventScroll: true });
      }, 450);
    });
  }

  // Prevent any site-wide guestbook injection from appearing on this page.
  const hideGuestbook = () => {
    document.querySelectorAll('#visitor-comments').forEach(node => {
      node.hidden = true;
      node.setAttribute('aria-hidden', 'true');
    });
  };
  hideGuestbook();
  new MutationObserver(hideGuestbook).observe(document.body, { childList: true, subtree: true });
})();
