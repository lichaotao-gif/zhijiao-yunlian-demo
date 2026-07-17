(() => {
  const app = document.querySelector('.wb-app');
  if (!app) return;
  const title = document.getElementById('wbTitle');
  const crumb = document.getElementById('wbCrumb');
  const names = app.dataset.role === 'publisher' ? {home:['出版总览','智教出版，共建好教材'],projects:['出版项目','出版项目'],review:['内容审校','内容审校']} : {home:['工作台','上午好，李老师'],books:['我的教材','我的教材'],data:['数据中心','数据中心']};
  const go = key => { document.querySelectorAll('.wb-nav button').forEach(b=>b.classList.toggle('active',b.dataset.panel===key)); document.querySelectorAll('.wb-panel').forEach(p=>p.classList.toggle('active',p.id===`panel-${key}`)); crumb.textContent=names[key][0]; title.textContent=names[key][1]; window.scrollTo({top:0,behavior:'smooth'}); };
  document.querySelectorAll('.wb-nav button').forEach(b=>b.addEventListener('click',()=>go(b.dataset.panel)));
  document.querySelectorAll('[data-panel-jump]').forEach(b=>b.addEventListener('click',()=>go(b.dataset.panelJump)));
  document.querySelectorAll('.wb-tabs').forEach(group=>group.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;group.querySelectorAll('button').forEach(x=>x.classList.remove('active'));b.classList.add('active');}));
  const modal=document.getElementById('wbModal');
  document.querySelectorAll('[data-action="create"]').forEach(b=>b.addEventListener('click',()=>modal.classList.add('open')));
  modal?.querySelector('.wb-close').addEventListener('click',()=>modal.classList.remove('open'));
  modal?.addEventListener('click',e=>{if(e.target===modal)modal.classList.remove('open')});
  modal?.querySelector('.wb-modal-submit').addEventListener('click',()=>{if(app.dataset.role==='author'){location.href='write.html';return;}modal.classList.remove('open');showToast('已创建草稿，可继续完善项目信息');});
  document.querySelectorAll('[data-toast]').forEach(b=>b.addEventListener('click',()=>showToast(b.dataset.toast)));
})();
