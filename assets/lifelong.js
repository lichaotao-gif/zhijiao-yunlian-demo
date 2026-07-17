const LIFE_BOOKS=[
 {title:'看见孩子',author:'杨海燕',tag:'亲子沟通',price:'¥49.80',color:'sand',cover:'看见\n孩子',desc:'从儿童视角理解行为背后的需求，帮助父母建立更温和、更有效的亲子沟通。',isbn:'978-7-XXXX-1001-1'},
 {title:'陪孩子长大',author:'李一慢',tag:'成长陪伴',price:'¥52.00',color:'green',cover:'陪孩子\n长大',desc:'记录成长中的真实困惑，在陪伴、规则与尊重之间找到适合每个家庭的答案。',isbn:'978-7-XXXX-1002-8'},
 {title:'好妈妈胜过好老师',author:'尹建莉',tag:'父母成长',price:'¥42.00',color:'red',cover:'好妈妈\n胜过好老师',desc:'从日常小事出发，重新认识家庭教育中爱、自由与边界的关系。',isbn:'978-7-XXXX-1003-5'},
 {title:'孩子：挑战',author:'鲁道夫·德雷克斯',tag:'亲子沟通',price:'¥45.00',color:'blue',cover:'孩子：\n挑战',desc:'用积极的方式面对孩子的挑战行为，建立尊重与合作的家庭关系。',isbn:'978-7-XXXX-1004-2'},
 {title:'如何说孩子才会听',author:'阿黛尔·法伯',tag:'沟通',price:'¥46.00',color:'yellow',cover:'如何说\n孩子才会听',desc:'一套可练习、可复用的沟通方法，让理解与合作真正发生在亲子之间。',isbn:'978-7-XXXX-1005-9'},
 {title:'正面管教',author:'简·尼尔森',tag:'习惯',price:'¥58.00',color:'pink',cover:'正面\n管教',desc:'不惩罚、不娇纵，在坚定和善意中帮助孩子培养责任感与自律。',isbn:'978-7-XXXX-1006-6'},
 {title:'读懂青春期',author:'王人平',tag:'成长',price:'¥48.00',color:'ink',cover:'读懂\n青春期',desc:'认识青春期的身心变化，给父母一份更有耐心的成长陪伴指南。',isbn:'978-7-XXXX-1007-3'},
 {title:'父母的语言',author:'达娜·萨斯金德',tag:'父母',price:'¥55.00',color:'lavender',cover:'父母的\n语言',desc:'语言环境如何影响孩子的大脑发展？用科学视角重新理解每一次对话。',isbn:'978-7-XXXX-1008-0'}
];
const grid=document.querySelector('#lifeGrid'),modal=document.querySelector('#lifeModal'),content=document.querySelector('#lifeModalContent');
const esc=s=>String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
function renderBooks(list=LIFE_BOOKS){grid.innerHTML=list.map(book=>{const i=LIFE_BOOKS.indexOf(book);return `<article class="life-book" data-book="${i}"><div class="life-cover ${book.color}"><small>家庭教育 · 纸质图书</small><b>${esc(book.cover)}</b><span>职教云链 · 家庭阅读推荐</span></div><div class="life-book-body"><p>${esc(book.tag)} · ${esc(book.author)}</p><h3>${esc(book.title)}</h3><footer><span>纸质书</span><strong>${esc(book.price)}</strong></footer></div></article>`}).join('');}
function openBook(i){const b=LIFE_BOOKS[i];content.innerHTML=`<div class="life-modal-book"><div class="life-cover ${b.color}"><small>家庭教育 · 纸质图书</small><b>${esc(b.cover)}</b><span>职教云链 · 家庭阅读推荐</span></div><div><span class="eyebrow">${esc(b.tag)}</span><h2>${esc(b.title)}</h2><div class="modal-meta"><span>${esc(b.author)} 著</span><span>纸质书</span><span>${esc(b.isbn)}</span></div><p>${esc(b.desc)}</p><div class="life-notice">首版为图书展示橱窗，暂不支持在线购买。<button data-consult>咨询图书信息</button></div></div></div>`;modal.classList.add('open');modal.setAttribute('aria-hidden','false');}
renderBooks();
grid.addEventListener('click',e=>{const card=e.target.closest('.life-book');if(card)openBook(Number(card.dataset.book));});
document.querySelectorAll('.life-filters button').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.life-filters button').forEach(x=>x.classList.remove('active'));btn.classList.add('active');const f=btn.dataset.filter;renderBooks(f==='all'?LIFE_BOOKS:LIFE_BOOKS.filter(b=>b.tag.includes(f)));}));
document.querySelector('#lifeSearch').addEventListener('input',e=>{const q=e.target.value.trim();renderBooks(q?LIFE_BOOKS.filter(b=>`${b.title}${b.author}${b.tag}`.includes(q)):LIFE_BOOKS);});
document.querySelector('.life-close').addEventListener('click',()=>modal.classList.remove('open'));
modal.addEventListener('click',e=>{if(e.target===modal)modal.classList.remove('open');if(e.target.matches('[data-consult]'))showToast('图书信息咨询服务正在完善中，敬请期待');});
document.querySelector('#lifeAbout').addEventListener('click',()=>document.querySelector('.life-intro').scrollIntoView({behavior:'smooth'}));
