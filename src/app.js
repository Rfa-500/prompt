const promptTypes = {
  video: { title: 'Prompt para video', description: 'Explicación clara para video.' },
  study: { title: 'Prompt para estudiar páginas', description: 'Ayuda para estudiar páginas del libro.' },
  quiz: { title: 'Prompt para quiz', description: 'Preguntas de práctica.' },
  summary: { title: 'Prompt para resumen', description: 'Resumen breve y útil.' },
  flashcards: { title: 'Prompt para flashcards', description: 'Tarjetas para memorizar.' },
  exam: { title: 'Prompt para repaso de examen', description: 'Guía de repaso.' },
  mindmap: { title: 'Prompt para mapa mental', description: 'Mapa mental escrito.' },
  audio: { title: 'Prompt para audio / podcast', description: 'Guía para explicación en audio.' },
  vocabulary: { title: 'Prompt para vocabulario', description: 'Palabras importantes.' },
  presentation: { title: 'Prompt para presentación', description: 'Diapositivas organizadas.' },
  timeline: { title: 'Prompt para línea de tiempo', description: 'Eventos o etapas en orden.' },
};

const optionLabels = {
  es: {
    mainTopic: 'Tema principal', clearExplanation: 'Explicación clara', definitions: 'Palabras importantes con definiciones',
    examples: 'Ejemplos sencillos', shortSummary: 'Resumen corto', practiceAnswers: 'Preguntas de práctica con respuestas',
    examQuestions: 'Preguntas tipo examen sin respuestas', commonMistakes: 'Errores comunes', finalReview: 'Mini repaso final',
  },
  en: {
    mainTopic: 'Main topic', clearExplanation: 'Clear explanation', definitions: 'Important words with definitions',
    examples: 'Simple examples', shortSummary: 'Short summary', practiceAnswers: 'Practice questions with answers',
    examQuestions: 'Exam-style questions without answers', commonMistakes: 'Common mistakes', finalReview: 'Short final review',
  },
};

const optionsByType = {
  video: ['mainTopic', 'clearExplanation', 'definitions', 'examples', 'shortSummary', 'finalReview'],
  study: ['mainTopic', 'clearExplanation', 'definitions', 'examples', 'shortSummary', 'practiceAnswers', 'examQuestions', 'commonMistakes', 'finalReview'],
  quiz: ['mainTopic', 'examQuestions', 'practiceAnswers', 'commonMistakes'],
  summary: ['mainTopic', 'definitions', 'shortSummary', 'finalReview'],
  flashcards: ['definitions', 'examples', 'practiceAnswers'],
  exam: ['mainTopic', 'shortSummary', 'examQuestions', 'commonMistakes', 'finalReview'],
  mindmap: ['mainTopic', 'definitions', 'examples'],
  audio: ['mainTopic', 'clearExplanation', 'examples', 'finalReview'],
  vocabulary: ['definitions', 'examples', 'practiceAnswers'],
  presentation: ['mainTopic', 'clearExplanation', 'shortSummary', 'examples'],
  timeline: ['mainTopic', 'clearExplanation', 'shortSummary'],
};

const commonSteps = [
  { key: 'language', title: '¿Quieres el prompt en español o en inglés?', type: 'choice', choices: [{ label: 'Español', value: 'es' }, { label: 'Inglés', value: 'en' }] },
  { key: 'studentName', title: '¿Cuál es tu nombre?', type: 'name', placeholder: 'Escribe otro nombre' },
  { key: 'grade', title: '¿En qué grado estás?', type: 'text', placeholder: 'Ejemplo: 6.º grado' },
  { key: 'subject', title: '¿Cuál es la materia del libro?', type: 'text', placeholder: 'Ejemplo: Ciencias' },
  { key: 'source', title: '¿Cómo se llama el libro o fuente?', type: 'text', placeholder: 'Opcional', optional: true },
  { key: 'startPage', title: '¿Cuál es la primera página impresa del libro que estás estudiando?', type: 'number', placeholder: 'Ejemplo: 60' },
  { key: 'endPage', title: '¿Cuál es la última página impresa del libro que estás estudiando?', type: 'number', placeholder: 'Ejemplo: 70' },
  { key: 'pdfStartPage', title: 'Si sabes la página real del PDF donde empieza, escríbela aquí. Si no la sabes, déjalo vacío.', type: 'number', placeholder: 'Opcional', optional: true },
  { key: 'pdfEndPage', title: 'Si sabes la página real del PDF donde termina, escríbela aquí. Si no la sabes, déjalo vacío.', type: 'number', placeholder: 'Opcional', optional: true },
];

const extraSteps = {
  quiz: [
    { key: 'quizCount', title: 'Número de preguntas', type: 'number', placeholder: 'Ejemplo: 10' },
    { key: 'quizType', title: 'Tipo de quiz', type: 'select', options: ['Opción múltiple', 'Verdadero/falso', 'Respuesta corta', 'Mixto'] },
    { key: 'answersAtEnd', title: '¿Quieres respuestas al final?', type: 'select', options: ['Sí', 'No'] },
    { key: 'level', title: 'Nivel', type: 'select', options: ['Fácil', 'Medio', 'Difícil'] },
  ],
  flashcards: [
    { key: 'flashcardCount', title: 'Número de flashcards', type: 'number', placeholder: 'Ejemplo: 15' },
    { key: 'level', title: 'Nivel', type: 'select', options: ['Fácil', 'Medio', 'Difícil'] },
  ],
  exam: [
    { key: 'examDate', title: 'Fecha del examen, opcional', type: 'text', placeholder: 'Opcional', optional: true },
    { key: 'level', title: 'Nivel', type: 'select', options: ['Fácil', 'Medio', 'Difícil'] },
  ],
  vocabulary: [
    { key: 'wordCount', title: 'Número de palabras', type: 'number', placeholder: 'Ejemplo: 12' },
    { key: 'vocabularyLanguage', title: 'Idioma, solo si aplica', type: 'text', placeholder: 'Opcional', optional: true },
  ],
  presentation: [
    { key: 'slideCount', title: 'Número de diapositivas', type: 'number', placeholder: 'Ejemplo: 8' },
    { key: 'speakingNotes', title: '¿Necesitas texto para exponer?', type: 'select', options: ['Sí', 'No'] },
  ],
};

let state = {
  screen: 'home', selectedType: null, currentStep: 0,
  answers: { language: 'es', quizType: 'Mixto', answersAtEnd: 'Sí', level: 'Medio', speakingNotes: 'Sí' },
  selectedOptions: [], generatedPrompt: '', copyMessage: '',
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
const currentOptions = () => optionsByType[state.selectedType] || [];
const currentSteps = () => [...commonSteps, ...(extraSteps[state.selectedType] || []), { key: 'options', title: 'Elige qué debe incluir el prompt', optional: true }];

function PromptCard(key, card) {
  return `<article class="prompt-card"><h2>${card.title}</h2><p>${card.description}</p><button data-create="${key}" type="button">Crear prompt</button></article>`;
}

function renderHome() {
  root.innerHTML = `<main class="app-shell"><header class="page-header"><h1>Generador de prompts para NotebookLM/Gemini</h1><p>Elige un tipo de prompt, completa los datos del libro y copia el resultado.</p></header><section class="card-grid" aria-label="Tipos de prompt">${Object.entries(promptTypes).map(([key, card]) => PromptCard(key, card)).join('')}</section></main>`;
}

function CheckboxOptions() {
  const labels = optionLabels[state.answers.language || 'es'];
  return `<div class="checkbox-list">${currentOptions().map((key) => `<label class="checkbox-option"><input type="checkbox" data-option="${key}" ${state.selectedOptions.includes(key) ? 'checked' : ''} /> ${labels[key]}</label>`).join('')}</div>`;
}

function renderField(step, value) {
  if (step.key === 'options') return `<p class="field-help">Los puntos marcados se agregarán al prompt.</p>${CheckboxOptions()}`;
  if (step.type === 'choice') return `<div class="choice-list">${step.choices.map((choice) => `<label><input type="radio" name="${step.key}" data-answer="${step.key}" value="${choice.value}" ${value === choice.value ? 'checked' : ''} /> ${choice.label}</label>`).join('')}</div>`;
  if (step.type === 'name') return `<div class="quick-choices"><button type="button" data-quick-name="Sofía">Sofía</button><button type="button" data-quick-name="Gabriela">Gabriela</button></div><input class="answer-field" data-answer="${step.key}" type="text" value="${escapeHtml(value)}" placeholder="${step.placeholder}" autofocus />`;
  if (step.type === 'select') return `<select class="answer-field" data-answer="${step.key}" autofocus>${step.options.map((option) => `<option value="${option}" ${value === option ? 'selected' : ''}>${option}</option>`).join('')}</select>`;
  return `<input class="answer-field" data-answer="${step.key}" type="${step.type}" value="${escapeHtml(value)}" placeholder="${step.placeholder}" autofocus />`;
}

function StepForm(error = '') {
  const steps = currentSteps();
  const step = steps[state.currentStep];
  const value = state.answers[step.key] || '';
  const progress = Math.round(((state.currentStep + 1) / steps.length) * 100);
  root.innerHTML = `<main class="app-shell form-shell"><section class="form-card"><button class="link-button" data-back type="button">← Atrás</button><p class="small-label">${promptTypes[state.selectedType].title}</p><div class="progress-wrap"><div style="width:${progress}%"></div></div><p class="progress-text">Paso ${state.currentStep + 1} de ${steps.length}</p><h1>${step.title}</h1>${renderField(step, value)}${error ? `<p class="error-message" role="alert">${error}</p>` : ''}<button class="primary-action" data-next type="button">✓ Continuar</button></section></main>`;
  document.querySelector('[autofocus]')?.focus();
}

function normalizeAnswer(value, lang) {
  if (lang === 'en') {
    return { 'Opción múltiple': 'Multiple choice', 'Verdadero/falso': 'True/false', 'Respuesta corta': 'Short answer', 'Mixto': 'Mixed', 'Sí': 'Yes', 'No': 'No', 'Fácil': 'Easy', 'Medio': 'Medium', 'Difícil': 'Hard' }[value] || value;
  }
  return value;
}

function selectedOptionsText(lang) {
  const labels = optionLabels[lang];
  const items = state.selectedOptions.map((key) => labels[key]);
  return items.length ? items.join(', ') : (lang === 'en' ? 'only what is necessary for this prompt' : 'solo lo necesario para este prompt');
}

function buildBase(lang) {
  const a = state.answers;
  const source = a.source || (lang === 'en' ? 'Not specified' : 'No especificado');
  const pdfStart = a.pdfStartPage || (lang === 'en' ? 'to confirm' : 'por confirmar');
  const pdfEnd = a.pdfEndPage || (lang === 'en' ? 'to confirm' : 'por confirmar');
  const pdfLine = a.pdfStartPage || a.pdfEndPage
    ? (lang === 'en' ? 'Verify that the actual PDF pages listed correctly match the printed book pages.' : 'Verifica que las páginas reales del PDF indicadas correspondan correctamente a las páginas impresas del libro.')
    : (lang === 'en' ? 'First locate and confirm the actual PDF pages that correspond to these printed book pages.' : 'Primero ubica y confirma las páginas reales del PDF que corresponden a estas páginas impresas del libro.');

  if (lang === 'en') {
    return `Student: ${a.studentName}\nGrade: ${a.grade}\nSubject: ${a.subject}\nBook or source: ${source}\nPrinted book pages: ${a.startPage} - ${a.endPage}\nActual PDF pages: ${pdfStart} - ${pdfEnd}\n\nThe page numbers I am giving are the printed page numbers shown inside the book. Since the book is scanned inside a PDF, they may not match the actual PDF file page numbers.\n\nFirst, confirm which actual PDF pages correspond to these printed book pages. ${pdfLine} Also confirm the topic, chapter, or subtitles that appear on those pages.\n\nIf you cannot confirm this with certainty, tell me what you found and do not invent information.\n\nUse only the uploaded book or sources.`;
  }
  return `Estudiante: ${a.studentName}\nGrado: ${a.grade}\nMateria: ${a.subject}\nLibro o fuente: ${source}\nPáginas impresas del libro: ${a.startPage} - ${a.endPage}\nPáginas reales del PDF: ${pdfStart} - ${pdfEnd}\n\nLos números de página que estoy dando son las páginas impresas que aparecen en el libro. Como el libro está escaneado dentro de un PDF, pueden no coincidir con las páginas reales del archivo.\n\nPrimero confirma qué páginas reales del PDF corresponden a estas páginas impresas del libro. ${pdfLine} Confirma también el tema, capítulo o subtítulos que aparecen en esas páginas.\n\nSi no puedes confirmarlo con seguridad, dime qué encontraste y no inventes.\n\nUsa solamente la información del libro o fuentes subidas.`;
}

function buildSpecificInstruction(lang) {
  const a = state.answers;
  const include = selectedOptionsText(lang);
  if (lang === 'en') {
    const map = {
      video: `Create a video explanation about these pages. Make it clear, organized, and easy to understand for my grade level. Include: ${include}.`,
      study: `Help me study only these pages. Include: ${include}.`,
      quiz: `Create a quiz to practice these pages.\nNumber of questions: ${a.quizCount}\nQuiz type: ${normalizeAnswer(a.quizType, lang)}\nLevel: ${normalizeAnswer(a.level, lang)}\nAnswers at the end: ${normalizeAnswer(a.answersAtEnd, lang)}\n\nRules:\n\n* If it is multiple choice, use options A, B, C, and D.\n* If it is true/false, use clear statements.\n* If it is short answer, ask for brief answers.\n* If it is mixed, combine formats.\n* Do not repeat questions.\n* If I asked for answers at the end, add a final answer key.`,
      summary: 'Summarize these pages. Include the main ideas, important words, and a short final review.',
      flashcards: `Create ${a.flashcardCount} flashcards to study these pages.\nLevel: ${normalizeAnswer(a.level, lang)}\nFormat:\nQuestion:\nAnswer:\nMake them clear, short, and useful for memorization.`,
      exam: `Create an exam review guide using these pages.${a.examDate ? `\nExam date: ${a.examDate}` : ''}\nLevel: ${normalizeAnswer(a.level, lang)}\nInclude the most important topics, possible exam questions, common mistakes, and a short final quiz.`,
      mindmap: 'Create a textual mind map about these pages.\nFormat:\nCentral idea\n\n* Main branch\n\n  * Subtopic\n  * Important details\n\nDo not generate an image. Make it a clear and organized written mind map.',
      audio: 'Create a guide for an explanatory audio or podcast about these pages. It should sound like a clear tutor-style explanation, with an introduction, development, examples, and a final review.',
      vocabulary: `Extract ${a.wordCount} important words from these pages.${a.vocabularyLanguage ? `\nLanguage: ${a.vocabularyLanguage}` : ''}\nFor each word include:\n\n* Word\n* Simple definition\n* Example\n* Practice question`,
      presentation: `Create a presentation about these pages.\nNumber of slides: ${a.slideCount}\nSpeaking notes: ${normalizeAnswer(a.speakingNotes, lang)}\nFor each slide include:\n\n* Title\n* Main points\n* Short text\n* Suggested visual idea\n\nIf I asked for speaking notes, add a short explanation for each slide.`,
      timeline: 'Create a timeline with the important events, steps, or stages from these pages. Organize it clearly and add a short explanation for each point.',
    };
    return map[state.selectedType];
  }
  const map = {
    video: `Crea una explicación para video sobre estas páginas. Hazla clara, ordenada y fácil de entender para mi grado. Incluye: ${include}.`,
    study: `Ayúdame a estudiar solamente estas páginas. Incluye: ${include}.`,
    quiz: `Crea un quiz para practicar estas páginas.\nNúmero de preguntas: ${a.quizCount}\nTipo de quiz: ${a.quizType}\nNivel: ${a.level}\nRespuestas al final: ${a.answersAtEnd}\n\nReglas:\n\n* Si es opción múltiple, usa opciones A, B, C y D.\n* Si es verdadero/falso, usa frases claras.\n* Si es respuesta corta, pide respuestas breves.\n* Si es mixto, combina formatos.\n* No repitas preguntas.\n* Si pedí respuestas al final, agrega una sección final de respuestas.`,
    summary: 'Haz un resumen de estas páginas. Incluye las ideas principales, palabras importantes y un mini repaso final.',
    flashcards: `Crea ${a.flashcardCount} flashcards para estudiar estas páginas.\nNivel: ${a.level}\nFormato:\nPregunta:\nRespuesta:\nHazlas claras, cortas y útiles para memorizar.`,
    exam: `Crea una guía de repaso para examen usando estas páginas.${a.examDate ? `\nFecha del examen: ${a.examDate}` : ''}\nNivel: ${a.level}\nIncluye los temas más importantes, posibles preguntas de examen, errores comunes y un mini quiz final.`,
    mindmap: 'Crea un mapa mental textual sobre estas páginas.\nFormato:\nIdea central\n\n* Rama principal\n\n  * Subtema\n  * Detalles importantes\n\nNo generes una imagen. Hazlo como mapa mental escrito, claro y organizado.',
    audio: 'Crea una guía para audio explicativo o podcast sobre estas páginas. Debe sonar como una explicación clara entre tutores, con introducción, desarrollo, ejemplos y cierre con repaso.',
    vocabulary: `Extrae ${a.wordCount} palabras importantes de estas páginas.${a.vocabularyLanguage ? `\nIdioma: ${a.vocabularyLanguage}` : ''}\nPara cada palabra incluye:\n\n* Palabra\n* Definición sencilla\n* Ejemplo\n* Pregunta de práctica`,
    presentation: `Crea una presentación sobre estas páginas.\nNúmero de diapositivas: ${a.slideCount}\nTexto para exponer: ${a.speakingNotes}\nPara cada diapositiva incluye:\n\n* Título\n* Puntos principales\n* Texto corto\n* Idea visual sugerida\n\nSi pedí texto para exponer, agrega una explicación breve para cada diapositiva.`,
    timeline: 'Crea una línea de tiempo con los eventos, pasos o etapas importantes de estas páginas. Ordénala claramente y agrega una explicación corta para cada punto.',
  };
  return map[state.selectedType];
}

function buildPrompt() {
  const lang = state.answers.language || 'es';
  return `${buildBase(lang)}\n\n${buildSpecificInstruction(lang)}`;
}

function GeneratedPrompt() {
  root.innerHTML = `<main class="app-shell form-shell"><section class="result-card"><h1>Prompt generado</h1><p class="field-help">Puedes editarlo antes de copiarlo.</p><textarea class="prompt-output" aria-label="Prompt generado editable">${escapeHtml(state.generatedPrompt)}</textarea><div class="result-actions"><button data-copy type="button">Copiar prompt</button><button data-edit type="button">Editar respuestas</button><button data-reset type="button">Crear otro prompt</button></div>${state.copyMessage ? `<p class="success-message" role="status">${state.copyMessage}</p>` : ''}</section></main>`;

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
  if (create) {
    const type = create.dataset.create;
    state = { ...state, screen: 'form', selectedType: type, currentStep: 0, answers: { language: 'es', quizType: 'Mixto', answersAtEnd: 'Sí', level: 'Medio', speakingNotes: 'Sí' }, selectedOptions: [...(optionsByType[type] || [])], copyMessage: '' };
    render();
  }
  if (event.target.closest('[data-quick-name]')) { state.answers.studentName = event.target.closest('[data-quick-name]').dataset.quickName; render(); }
  if (event.target.closest('[data-back]')) { state.currentStep === 0 ? state.screen = 'home' : state.currentStep -= 1; render(); }
  if (event.target.closest('[data-next]')) {
    const steps = currentSteps();
    const step = steps[state.currentStep];
    if (!step.optional && !String(state.answers[step.key] || '').trim()) return render('Completa este campo para continuar.');
    if (state.currentStep === steps.length - 1) { state.generatedPrompt = buildPrompt(); state.screen = 'result'; render(); } else { state.currentStep += 1; render(); }
  }
  if (event.target.closest('[data-copy]')) { state.generatedPrompt = document.querySelector('.prompt-output').value; await navigator.clipboard.writeText(state.generatedPrompt); state.copyMessage = 'Prompt copiado. Ahora pégalo en NotebookLM.'; render(); }
  if (event.target.closest('[data-edit]')) { state.generatedPrompt = document.querySelector('.prompt-output').value; state.screen = 'form'; state.currentStep = 0; render(); }
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
  if (event.target.matches('[data-option]')) state.selectedOptions = event.target.checked ? [...new Set([...state.selectedOptions, event.target.dataset.option])] : state.selectedOptions.filter((option) => option !== event.target.dataset.option);
  if (event.target.matches('[data-option]')) state.selectedOptions = event.target.checked ? [...state.selectedOptions, event.target.dataset.option] : state.selectedOptions.filter((option) => option !== event.target.dataset.option);
  if (event.target.matches('.prompt-output')) state.generatedPrompt = event.target.value;
});

root.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && event.target.matches('.answer-field:not(select)')) document.querySelector('[data-next]')?.click();
});

render();
