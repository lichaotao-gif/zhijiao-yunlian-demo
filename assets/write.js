(() => {
  const title = document.getElementById('writeTitle');
  const path = document.getElementById('pagePath');
  const count = document.getElementById('wordCount');
  const coverKey = 'zjyl_write_cover';
  document.querySelectorAll('.outline-scroll button').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('.outline-scroll button').forEach(item => item.classList.remove('active-sub'));
    button.classList.add('active-sub'); const chapter = button.dataset.title;
    title.textContent = chapter.replace(/^第五章\s*/, ''); path.textContent = chapter.includes('第') ? chapter.replace(' ', ' / ') : `第五章 / ${chapter}`;
    showToast(`已切换到：${chapter}`);
  }));
  document.querySelectorAll('[data-cmd]').forEach(button => button.addEventListener('click', () => document.execCommand(button.dataset.cmd, false, null)));
  document.querySelectorAll('.rail-tabs button').forEach(button => button.addEventListener('click', () => { document.querySelectorAll('.rail-tabs button, .rail-panel').forEach(item => item.classList.remove('active')); button.classList.add('active'); document.getElementById(`rail-${button.dataset.rail}`).classList.add('active'); }));
  function save(message) { localStorage.setItem('zjyl_write_draft', title.textContent); count.textContent = String(418 + title.textContent.length); showToast(message); }
  const coverImage = document.getElementById('coverImage'), coverPlaceholder = document.getElementById('coverPlaceholder'), coverInput = document.getElementById('coverInput');
  function showCover(value) { const visible = Boolean(value); coverImage.src = visible ? value : ''; coverImage.classList.toggle('show', visible); coverPlaceholder.hidden = visible; }
  showCover(localStorage.getItem(coverKey));
  document.getElementById('coverUpload').addEventListener('click', () => coverInput.click());
  coverInput.addEventListener('change', () => { const file = coverInput.files?.[0]; if (!file) return; if (!/^image\/(png|jpeg|webp)$/.test(file.type)) { showToast('请选择 JPG、PNG 或 WebP 图片'); return; } if (file.size > 2 * 1024 * 1024) { showToast('封面图片不能超过 2MB'); return; } const reader = new FileReader(); reader.onload = () => { try { const image = String(reader.result); localStorage.setItem(coverKey, image); showCover(image); showToast('封面已更新'); } catch { showToast('封面图片过大，无法保存到本地'); } }; reader.readAsDataURL(file); });
  document.getElementById('coverClear').addEventListener('click', () => { localStorage.removeItem(coverKey); coverInput.value = ''; showCover(''); showToast('已移除教材封面'); });
  document.getElementById('writeSave').addEventListener('click', () => save('草稿已保存'));
  document.getElementById('infoSave').addEventListener('click', () => showToast('教材信息已保存'));
  document.getElementById('writeSubmit').addEventListener('click', () => save('教材已提交审核，预计 1–2 个工作日反馈'));
  document.getElementById('addChapter').addEventListener('click', () => showToast('新建章节功能已准备好（演示）'));
  document.getElementById('addSection').addEventListener('click', () => showToast('新建章节功能已准备好（演示）'));
  const aiDrawer = document.getElementById('aiDrawer'), aiMask = document.getElementById('aiMask');
  function toggleAi(open) { aiDrawer.classList.toggle('open', open); aiMask.classList.toggle('open', open); }
  document.getElementById('aiOpen').addEventListener('click', () => toggleAi(true));
  document.getElementById('aiClose').addEventListener('click', () => toggleAi(false));
  aiMask.addEventListener('click', () => toggleAi(false));
  function askAi(question) { document.getElementById('aiMessage').innerHTML = `<b>AI 回应</b><br>已根据“${question}”生成建议。你可以将建议作为本节内容补充，再根据教学目标调整表达。`; }
  document.querySelectorAll('[data-ai]').forEach(button => button.addEventListener('click', () => askAi(button.dataset.ai)));
  document.getElementById('aiSend').addEventListener('click', () => { const input = document.getElementById('aiInput'); if (!input.value.trim()) return; askAi(input.value.trim()); input.value = ''; });
  document.querySelectorAll('.review-jump').forEach(button => button.addEventListener('click', () => { if (button.dataset.review === '教学资源') { document.querySelector('[data-rail="assets"]').click(); } else { document.querySelector('.editor-scroll').scrollTo({ top: 0, behavior: 'smooth' }); title.focus(); } showToast(`已定位：${button.dataset.review}`); }));
  document.querySelectorAll('.review-resolve').forEach(button => button.addEventListener('click', () => { button.closest('.review-card').remove(); const remaining = document.querySelectorAll('.review-card').length; document.querySelector('.review-head span').textContent = remaining ? `待修改 ${remaining} 条` : '本轮已完成'; document.querySelector('[data-rail="review"] i').textContent = remaining; showToast('已标记为处理完成'); }));
  document.addEventListener('keydown', event => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 's') { event.preventDefault(); save('草稿已保存'); } if (event.key === 'Escape') toggleAi(false); });
})();
