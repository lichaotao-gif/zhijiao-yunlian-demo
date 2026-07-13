/* 职教云链 Demo interactions */

/* Toast 提示 */
const showToast = (function () {
  let el = null, timer = null;
  return function (msg) {
    if (!el) {
      el = document.createElement('div');
      el.className = 'toast';
      el.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v4.5"/><circle cx="12" cy="16.2" r=".4" fill="currentColor"/></svg><span></span>';
      document.body.appendChild(el);
    }
    el.querySelector('span').textContent = msg;
    el.classList.add('show');
    clearTimeout(timer);
    timer = setTimeout(() => el.classList.remove('show'), 2600);
  };
})();

/* 未开放板块：点击提示开发中 */
document.querySelectorAll('.cat-card[href="#"]').forEach(card => {
  card.addEventListener('click', e => {
    e.preventDefault();
    const name = card.querySelector('.name')?.textContent || '该板块';
    showToast(`「${name}」板块正在开发中，敬请期待`);
  });
});

/* 登录弹框：注入到所有带头部的页面 */
(function () {
  if (document.querySelector('.login-page')) return; // 独立登录页不注入
  const mask = document.createElement('div');
  mask.className = 'modal-mask';
  mask.innerHTML = `
  <div class="login-modal" role="dialog" aria-modal="true" aria-label="登录职教云链">
    <button class="modal-close" aria-label="关闭">
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>
    </button>
    <div class="m-head">
      <span class="m-logo">
        <svg width="44" height="44" viewBox="0 0 40 40" fill="none">
          <path d="M8 26c-3.3 0-6-2.7-6-6s2.7-6 6-6c.5-4.5 4.3-8 9-8 3.8 0 7 2.3 8.4 5.6" stroke="#00C29A" stroke-width="3.4" stroke-linecap="round"/>
          <path d="M32 14c3.3 0 6 2.7 6 6s-2.7 6-6 6c-.5 4.5-4.3 8-9 8-3.8 0-7-2.3-8.4-5.6" stroke="#2160F3" stroke-width="3.4" stroke-linecap="round"/>
          <circle cx="20" cy="20" r="3.2" fill="#0D1B3E"/>
        </svg>
      </span>
      <h2>欢迎登录职教云链</h2>
      <div class="m-underline"></div>
    </div>
    <div class="login-tabs">
      <button class="login-tab active" type="button">账号密码登录</button>
      <button class="login-tab" type="button">手机验证码登录</button>
    </div>
    <form>
      <div class="field">
        <label for="m-account">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M5 20c.7-3.4 3.5-5.5 7-5.5s6.3 2.1 7 5.5"/></svg>
          账号
        </label>
        <div class="input-wrap">
          <input type="text" id="m-account" placeholder="请输入手机号 / 邮箱" autocomplete="username">
        </div>
      </div>
      <div class="field">
        <label for="m-password">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>
          密码
        </label>
        <div class="input-wrap">
          <input type="password" id="m-password" placeholder="请输入密码" autocomplete="current-password">
          <button type="button" class="toggle-pass" aria-label="显示密码">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12Z"/><circle cx="12" cy="12" r="2.8"/></svg>
          </button>
        </div>
      </div>
      <div class="form-aux">
        <label class="remember"><input type="checkbox" checked>记住我</label>
        <a class="forgot" href="#">忘记密码？</a>
      </div>
      <button type="submit" class="btn-login">登 录</button>
    </form>
    <div class="login-foot">还没有账号？<a href="#">立即注册</a></div>
  </div>`;
  document.body.appendChild(mask);

  function open() { mask.classList.add('open'); document.body.style.overflow = 'hidden'; setTimeout(() => mask.querySelector('input').focus(), 250); }
  function close() { mask.classList.remove('open'); document.body.style.overflow = ''; }

  document.querySelectorAll('a[href="login.html"]').forEach(a => {
    a.addEventListener('click', e => { e.preventDefault(); open(); });
  });
  mask.querySelector('.modal-close').addEventListener('click', close);
  mask.addEventListener('click', e => { if (e.target === mask) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  if (location.hash === '#login') open();

  mask.querySelector('form').addEventListener('submit', e => {
    e.preventDefault();
    const btn = mask.querySelector('.btn-login');
    btn.textContent = '登录中…';
    btn.style.letterSpacing = '2px';
    setTimeout(() => { btn.textContent = '登 录'; btn.style.letterSpacing = ''; close(); }, 900);
  });
})();

/* Hero banner 背景轮换（上线后由后台配置） */
(function () {
  const bgs = document.querySelectorAll('.hero-bg');
  if (!bgs.length) return;
  const dots = document.querySelectorAll('.hero-switch .carousel-dot');
  let idx = 0, timer = null;

  function go(i) {
    idx = (i + bgs.length) % bgs.length;
    bgs.forEach((b, n) => b.classList.toggle('active', n === idx));
    dots.forEach((d, n) => d.classList.toggle('active', n === idx));
  }
  function play() { if (timer) clearInterval(timer); timer = setInterval(() => go(idx + 1), 7000); }

  dots.forEach((d, n) => d.addEventListener('click', () => { go(n); play(); }));
  play();
})();

/* Carousel */
(function () {
  const carousel = document.querySelector('.carousel');
  if (!carousel) return;
  const slides = carousel.querySelectorAll('.slide');
  const dots = carousel.querySelectorAll('.carousel-dot');
  let idx = 0, timer = null;

  function go(i) {
    idx = (i + slides.length) % slides.length;
    slides.forEach((s, n) => s.classList.toggle('active', n === idx));
    dots.forEach((d, n) => d.classList.toggle('active', n === idx));
  }
  function play() { stop(); timer = setInterval(() => go(idx + 1), 5000); }
  function stop() { if (timer) clearInterval(timer); }

  dots.forEach((d, n) => d.addEventListener('click', () => { go(n); play(); }));
  carousel.querySelector('.carousel-arrow.prev')?.addEventListener('click', () => { go(idx - 1); play(); });
  carousel.querySelector('.carousel-arrow.next')?.addEventListener('click', () => { go(idx + 1); play(); });
  carousel.addEventListener('mouseenter', stop);
  carousel.addEventListener('mouseleave', play);
  play();
})();

/* Filter chips (list page) */
document.querySelectorAll('.filter-opts').forEach(group => {
  group.addEventListener('click', e => {
    const opt = e.target.closest('.filter-opt');
    if (!opt) return;
    group.querySelectorAll('.filter-opt').forEach(o => o.classList.remove('active'));
    opt.classList.add('active');
  });
});

/* Sort segment */
document.querySelectorAll('.sort-opts').forEach(group => {
  group.addEventListener('click', e => {
    const opt = e.target.closest('.sort-opt');
    if (!opt) return;
    group.querySelectorAll('.sort-opt').forEach(o => o.classList.remove('active'));
    opt.classList.add('active');
  });
});

/* Login tabs */
document.querySelectorAll('.login-tabs').forEach(group => {
  group.addEventListener('click', e => {
    const tab = e.target.closest('.login-tab');
    if (!tab) return;
    group.querySelectorAll('.login-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  });
});

/* Password visibility */
document.querySelectorAll('.toggle-pass').forEach(btn => {
  btn.addEventListener('click', () => {
    const input = btn.closest('.input-wrap').querySelector('input');
    input.type = input.type === 'password' ? 'text' : 'password';
  });
});

/* Scroll reveal */
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.08 });
  els.forEach(el => io.observe(el));
})();

