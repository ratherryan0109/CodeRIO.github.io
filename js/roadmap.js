async function loadRoadmap(roadmapId) {
  const container = document.getElementById('roadmapContainer');
  if (!container) return;

  const data = await Utils.fetchJSON('data/roadmaps.json');
  if (!data) return;

  const roadmap = data.find(r => r.id === roadmapId);
  if (!roadmap) return;

  document.title = roadmap.title + ' Roadmap - CodeRio';

  const header = document.getElementById('roadmapHeader');
  if (header) {
    header.innerHTML = `
      <h1>${roadmap.title}</h1>
      <p>${roadmap.description}</p>
    `;
  }

  const progress = Utils.getStorage('roadmap_progress', {})[roadmapId] || [];

  container.innerHTML = roadmap.steps.map((step, i) => {
    const completed = progress.includes(step.title);
    return `
      <div class="roadmap-step ${completed ? 'completed' : ''}">
        <div class="roadmap-step-indicator">
          <div class="roadmap-step-dot ${completed ? 'done' : ''}">
            ${completed ? '<i class="fas fa-check"></i>' : i + 1}
          </div>
          ${i < roadmap.steps.length - 1 ? '<div class="roadmap-step-line"></div>' : ''}
        </div>
        <div class="roadmap-step-content glass">
          <h3>${step.title}</h3>
          <p>${step.description}</p>
          ${step.resources ? `
            <div style="margin-top:1rem;display:flex;gap:0.5rem;flex-wrap:wrap">
              ${step.resources.map(r => `<span class="badge badge-primary">${r}</span>`).join('')}
            </div>
          ` : ''}
          <button class="btn btn-sm ${completed ? 'btn-ghost' : 'btn-primary'}" style="margin-top:1rem"
            onclick="toggleRoadmapStep('${roadmapId}', '${step.title}')">
            ${completed ? 'Completed' : 'Mark Complete'}
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function toggleRoadmapStep(roadmapId, step) {
  const key = 'roadmap_progress';
  const progress = Utils.getStorage(key, {});
  if (!progress[roadmapId]) progress[roadmapId] = [];
  if (!progress[roadmapId].includes(step)) progress[roadmapId].push(step);
  Utils.setStorage(key, progress);
  const activity = Utils.getStorage('coderio_activity', []);
  activity.unshift({ text: 'Completed step: ' + step, time: new Date().toISOString() });
  Utils.setStorage('coderio_activity', activity.slice(0, 50));
  loadRoadmap(roadmapId);
}
