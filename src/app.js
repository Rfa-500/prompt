const promptTypes = {
  video: { title: 'Prompt para video', description: 'Crea una guía clara para que NotebookLM prepare un video explicativo del libro.', icon: '🎬' },
  study: { title: 'Prompt para estudiar páginas del libro', description: 'Genera una ayuda de estudio ordenada usando solo las páginas que elegiste.', icon: '📚' },
  quiz: { title: 'Prompt para quiz', description: 'Pide un quiz personalizado para practicar antes de una clase o examen.', icon: '📝' },
};

const defaultOptions = [
  'Tema principal de esas páginas', 'Explicación clara y fácil de entender', 'Palabras importantes con definiciones', 'Ejemplos sencillos',
  'Resumen corto para estudiar', '10 preguntas de práctica con respuestas', '5 preguntas tipo examen sin respuestas', 'Guía paso a paso',
  'Errores comunes que debo evitar', 'Mini repaso final',
];

const commonSteps = [
  { key: 'studentName', title: 'Escribe tu nombre', placeholder: 'Ejemplo: Ana', type: 'text' },
  { key: 'grade', title: 'Escribe tu grado', placeholder: 'Ejemplo: 6.º grado', type: 'text' },
  { key: 'subject', title: 'Materia del libro', placeholder: 'Ejemplo: Ciencias', type: 'text' },
  { key: 'source', title: 'Nombre del libro o fuente, si lo sabes', placeholder: 'Ejemplo: Ciencias Naturales 6', type: 'text' },
  { key: 'startPage', title: 'Página impresa inicial del libro', placeholder: 'Ejemplo: 60', type: 'number' },
  { key: 'endPage', title: 'Página impresa final del libro', placeholder: 'Ejemplo: 70', type: 'number' },
];

const quizSteps = [
  { key: 'quizCount', title: 'Número de preguntas del quiz', placeholder: 'Ejemplo: 10', type: 'number' },
  { key: 'quizType', title: 'Tipo de quiz', type: 'select', options: ['Opción múltiple', 'Verdadero/falso', 'Respuesta corta', 'Mixto'] },
  { key: 'answersAtEnd', title: '¿Quieres respuestas al final?', type: 'select', options: ['Sí', 'No'] },
];

let state = {
  screen: 'home', selectedType: null, currentStep: 0,
  answers: { quizType: 'Mixto', answersAtEnd: 'Sí' },
  selectedOptions: [...defaultOptions], generatedPrompt: '', copyMessage: '',
};

const root = document.querySelector('#root');
const escapeHtml = (value = '') => String(value).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char]);

function PromptCard(key, card) {
  return `<article class="prompt-card">
    <div class="card-icon" aria-hidden="true">${card.icon}</div>
    <h2>${card.title}</h2><p>${card.description}</p>
    <button class="primary-button" data-create="${key}" type="button">Crear prompt <span aria-hidden="true">→</span></button>
  </article>`;
}

function CheckboxOptions() {
  return `<div class="checkbox-list">${defaultOptions.map((option) => `<label class="checkbox-option">
    <input type="checkbox" data-option="${escapeHtml(option)}" ${state.selectedOptions.includes(option) ? 'checked' : ''} />
    <span>${option}</span>
  </label>`).join('')}</div>`;
}

function renderHome() {
  root.innerHTML = `<main class="app-shell home-shell">
    <section class="hero" aria-labelledby="main-title">
      <div class="eyebrow">✨ Herramienta para NotebookLM/Gemini</div>
      <h1 id="main-title">Crea prompts académicos en minutos</h1>
      <p>Responde preguntas sencillas, elige lo que necesitas y copia un prompt listo para estudiar libros escaneados con más precisión.</p>
    </section>
    <section class="card-grid" aria-label="Tipos de prompt">${Object.entries(promptTypes).map(([key, card]) => PromptCard(key, card)).join('')}</section>
  </main>`;
}

function StepForm(error = '') {
  const steps = [...commonSteps, ...(state.selectedType === 'quiz' ? quizSteps : []), { key: 'options', title: 'Elige qué debe incluir el prompt' }];
  const step = steps[state.currentStep];
  const progress = Math.round(((state.currentStep + 1) / steps.length) * 100);
  const value = state.answers[step.key] || '';
  const field = step.key === 'options'
    ? `<p class="field-help">Todas están marcadas. Desmarca lo que no quieras incluir.</p>${CheckboxOptions()}`
    : step.type === 'select'
      ? `<select class="answer-field" data-answer="${step.key}" autofocus>${step.options.map((option) => `<option value="${option}" ${value === option ? 'selected' : ''}>${option}</option>`).join('')}</select>`
      : `<input class="answer-field" data-answer="${step.key}" type="${step.type}" value="${escapeHtml(value)}" placeholder="${step.placeholder}" autofocus />`;

  root.innerHTML = `<main class="app-shell form-shell"><section class="form-card">
    <button class="back-link" data-back type="button">← Atrás</button>
    <p class="form-kicker">${promptTypes[state.selectedType].title}</p>
    <div class="progress-wrap" aria-label="Progreso ${progress}%"><div class="progress-bar" style="width:${progress}%"></div></div>
    <p class="progress-text">Paso ${state.currentStep + 1} de ${steps.length}</p>
    <div class="step-content"><h1>${step.title}</h1>${field}${error ? `<p class="error-message" role="alert">${error}</p>` : ''}</div>
    <button class="check-button" data-next type="button" aria-label="Avanzar">✓</button>
  </section></main>`;
  document.querySelector('[autofocus]')?.focus();
}

function GeneratedPrompt() {
  root.innerHTML = `<main class="app-shell result-shell"><section class="result-card">
    <div class="eyebrow">✨ ¡Listo!</div><h1>Tu prompt está listo para usar</h1>
    <p class="result-help">Puedes editarlo aquí antes de copiarlo y pegarlo en NotebookLM.</p>
    <textarea class="prompt-output" aria-label="Prompt generado editable">${escapeHtml(state.generatedPrompt)}</textarea>
    <div class="result-actions"><div class="copy-area">
      <button class="primary-button" data-copy type="button">📋 Copiar prompt</button>
      ${state.copyMessage ? `<p class="success-message" role="status">${state.copyMessage}</p>` : ''}</div>
      <button class="secondary-button" data-reset type="button">↻ Crear otro prompt</button>
    </div></section></main>`;
}

function buildPrompt() {
  const a = state.answers;
  const common = `Estudiante: ${a.studentName}\nGrado: ${a.grade}\nMateria: ${a.subject}\nLibro o fuente: ${a.source || 'No especificado'}\nPáginas impresas del libro que estoy estudiando: ${a.startPage} - ${a.endPage}\n`;
  const location = `\nPrimero ubica dentro del PDF las páginas reales del archivo donde aparecen esas páginas impresas del libro.\n\nConfirma claramente:\n\n* Página impresa inicial del libro: ${a.startPage} → página real del PDF: [debes encontrarla]\n* Página impresa final del libro: ${a.endPage} → página real del PDF: [debes encontrarla]\n* Tema, capítulo o subtítulos que aparecen en esas páginas.\n\nSi no puedes encontrar con seguridad esas páginas, dime qué encontraste y no inventes.\n`;
  const options = state.selectedOptions.length ? state.selectedOptions.map((option) => `* ${option}`).join('\n') : '* Una ayuda breve, clara y adecuada para mi grado.';
  if (state.selectedType === 'video') return `${common}\nQuiero crear un video explicativo en NotebookLM sobre estas páginas.\n${location}\nDespués crea una explicación para video usando solamente ese contenido.\n\nEl video debe ser claro, ordenado y fácil de entender. Usa lenguaje adecuado para mi grado escolar.\n\nIncluye:\n${options}\n\nUsa solamente la información del libro o fuentes subidas. No inventes información fuera del material.`;
  if (state.selectedType === 'quiz') return `${common}\nQuiero que me prepares un quiz para practicar este contenido.\n${location}\nDespués crea un quiz usando solamente ese contenido.\n\nNúmero de preguntas: ${a.quizCount}\nTipo de quiz: ${a.quizType}\nRespuestas al final: ${a.answersAtEnd}\n\nIncluye:\n${options}\n\nHaz las preguntas claras, escolares y adecuadas para mi grado.\n\nUsa solamente la información del libro o fuentes subidas. No inventes información fuera del material.`;
  return `${common}${location}\nDespués ayúdame a estudiar solamente ese contenido.\n\nIncluye:\n${options}\n\nUsa solamente la información del libro o fuentes subidas. No inventes información fuera del material.`;
}

function launchConfetti() {
  const colors = ['#4f46e5', '#0ea5e9', '#14b8a6', '#f59e0b', '#ec4899'];
  for (let i = 0; i < 90; i += 1) {
    const piece = document.createElement('span');
    piece.className = 'confetti-piece';
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = `${Math.random() * 0.35}s`;
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 1800);
  }
}

function render(error) {
  if (state.screen === 'form') StepForm(error);
  else if (state.screen === 'result') GeneratedPrompt();
  else renderHome();
}

root.addEventListener('click', async (event) => {
  const create = event.target.closest('[data-create]');
  if (create) { state = { ...state, screen: 'form', selectedType: create.dataset.create, currentStep: 0, answers: { quizType: 'Mixto', answersAtEnd: 'Sí' }, selectedOptions: [...defaultOptions] }; render(); }
  if (event.target.closest('[data-back]')) { state.currentStep === 0 ? state.screen = 'home' : state.currentStep -= 1; render(); }
  if (event.target.closest('[data-next]')) {
    const steps = [...commonSteps, ...(state.selectedType === 'quiz' ? quizSteps : []), { key: 'options' }];
    const step = steps[state.currentStep];
    if (step.key !== 'options' && !String(state.answers[step.key] || '').trim()) return render('Completa este campo para continuar.');
    if (state.currentStep === steps.length - 1) { state.generatedPrompt = buildPrompt(); state.screen = 'result'; render(); launchConfetti(); } else { state.currentStep += 1; render(); }
  }
  if (event.target.closest('[data-copy]')) { state.generatedPrompt = document.querySelector('.prompt-output').value; await navigator.clipboard.writeText(state.generatedPrompt); state.copyMessage = 'Prompt copiado. Ahora pégalo en NotebookLM.'; render(); setTimeout(() => { state.copyMessage = ''; render(); }, 3500); }
  if (event.target.closest('[data-reset]')) { state.screen = 'home'; state.generatedPrompt = ''; state.copyMessage = ''; render(); }
});

root.addEventListener('input', (event) => {
  if (event.target.matches('[data-answer]')) state.answers[event.target.dataset.answer] = event.target.value;
  if (event.target.matches('[data-option]')) state.selectedOptions = event.target.checked ? [...state.selectedOptions, event.target.dataset.option] : state.selectedOptions.filter((option) => option !== event.target.dataset.option);
  if (event.target.matches('.prompt-output')) state.generatedPrompt = event.target.value;
});

root.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && event.target.matches('.answer-field:not(select)')) document.querySelector('[data-next]')?.click();
});

render();
