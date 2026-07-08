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
  if (step.key === 'options') {
    return `<p class="field-help">Los puntos marcados se agregarán al prompt.</p>${CheckboxOptions()}`;
  }

  if (step.type === 'choice') {
    return `<div class="choice-list">${step.choices.map((choice) => `<label><input type="radio" name="${step.key}" data-answer="${step.key}" value="${choice.value}" ${value === choice.value ? 'checked' : ''} /> ${choice.label}</label>`).join('')}</div>`;
  }

  if (step.type === 'name') {
    return `<div class="quick-choices"><button type="button" data-quick-name="Sofía">Sofía</button><button type="button" data-quick-name="Gabriela">Gabriela</button></div><input class="answer-field" data-answer="${step.key}" type="text" value="${escapeHtml(value)}" placeholder="${step.placeholder}" autofocus />`;
  }

  if (step.type === 'select') {
    return `<select class="answer-field" data-answer="${step.key}" autofocus>${step.options.map((option) => `<option value="${option}" ${value === option ? 'selected' : ''}>${option}</option>`).join('')}</select>`;
  }

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
    return `Student: ${a.studentName}\nGrade: ${a.grade}\nSubject: ${a.subject}\nBook or source: ${source}\nPrinted book pages: ${a.startPage} - ${a.endPage}\nActual PDF pages: ${pdfStart} - ${pdfEnd}\n\nThe page numbers I am giving are the printed page numbers shown inside the book. Since the book is scanned inside a PDF, they may not match the actual PDF file page numbers.\n\nFirst, confirm which actual PDF pages correspond to these printed book pages. ${pdfLine} Also confirm the topic, chapter, or subtitles that appear on those pages.\n\nIf you cannot confirm this with certainty, tell me what you found and do not invent information.\n\nUse only the uploaded book or sources.

Required response language: English. All generated content must be in English, including the explanation, video, examples, questions, answers, summary, vocabulary, presentation, audio, mind map, or timeline.`;
  }
  return `Estudiante: ${a.studentName}\nGrado: ${a.grade}\nMateria: ${a.subject}\nLibro o fuente: ${source}\nPáginas impresas del libro: ${a.startPage} - ${a.endPage}\nPáginas reales del PDF: ${pdfStart} - ${pdfEnd}\n\nLos números de página que estoy dando son las páginas impresas que aparecen en el libro. Como el libro está escaneado dentro de un PDF, pueden no coincidir con las páginas reales del archivo.\n\nPrimero confirma qué páginas reales del PDF corresponden a estas páginas impresas del libro. ${pdfLine} Confirma también el tema, capítulo o subtítulos que aparecen en esas páginas.\n\nSi no puedes confirmarlo con seguridad, dime qué encontraste y no inventes.\n\nUsa solamente la información del libro o fuentes subidas.

Idioma obligatorio de respuesta: español. Todo el contenido generado debe estar en español, incluyendo explicación, video, ejemplos, preguntas, respuestas, resumen, vocabulario, presentación, audio, mapa mental o línea de tiempo.`;
}

function buildSpecificInstruction(lang) {
  const a = state.answers;
  const include = selectedOptionsText(lang);
  if (lang === 'en') {
    const map = {
      video: `Create a video explanation in English about these pages. Make it clear, organized, and easy to understand for my grade level. Include: ${include}.`,
      study: `Help me study these pages in English. Include: ${include}.`,
      quiz: `Create a quiz in English to practice these pages.\nNumber of questions: ${a.quizCount}\nQuiz type: ${normalizeAnswer(a.quizType, lang)}\nLevel: ${normalizeAnswer(a.level, lang)}\nAnswers at the end: ${normalizeAnswer(a.answersAtEnd, lang)}\n\nRules:\n\n* If it is multiple choice, use options A, B, C, and D.\n* If it is true/false, use clear statements.\n* If it is short answer, ask for brief answers.\n* If it is mixed, combine formats.\n* Do not repeat questions.\n* If I asked for answers at the end, add a final answer key.`,
      summary: 'Summarize these pages in English. Include the main ideas, important words, and a short final review.',
      flashcards: `Create flashcards in English to study these pages.
Number of flashcards: ${a.flashcardCount}\nLevel: ${normalizeAnswer(a.level, lang)}\nFormat:\nQuestion:\nAnswer:\nMake them clear, short, and useful for memorization.`,
      exam: `Create an exam review guide in English using these pages.${a.examDate ? `\nExam date: ${a.examDate}` : ''}\nLevel: ${normalizeAnswer(a.level, lang)}\nInclude the most important topics, possible exam questions, common mistakes, and a short final quiz.`,
      mindmap: 'Create a textual mind map in English about these pages.\nFormat:\nCentral idea\n\n* Main branch\n\n  * Subtopic\n  * Important details\n\nDo not generate an image. Make it a clear and organized written mind map.',
      audio: 'Create a guide for an explanatory audio or podcast in English about these pages. It should sound like a clear tutor-style explanation, with an introduction, development, examples, and a final review.',
      vocabulary: `Extract important vocabulary in English from these pages.
Number of words: ${a.wordCount}${a.vocabularyLanguage ? `\nLanguage: ${a.vocabularyLanguage}` : ''}\nFor each word include:\n\n* Word\n* Simple definition\n* Example\n* Practice question`,
      presentation: `Create a presentation in English about these pages.\nNumber of slides: ${a.slideCount}\nSpeaking notes: ${normalizeAnswer(a.speakingNotes, lang)}\nFor each slide include:\n\n* Title\n* Main points\n* Short text\n* Suggested visual idea\n\nIf I asked for speaking notes, add a short explanation for each slide.`,
      timeline: 'Create a timeline in English with the important events, steps, or stages from these pages. Organize it clearly and add a short explanation for each point.',
    };
    return map[state.selectedType];
  }
  const map = {
    video: `Crea una explicación para video en español sobre estas páginas. Hazla clara, ordenada y fácil de entender para mi grado. Incluye: ${include}.`,
    study: `Ayúdame a estudiar estas páginas en español. Incluye: ${include}.`,
    quiz: `Crea un quiz en español para practicar estas páginas.\nNúmero de preguntas: ${a.quizCount}\nTipo de quiz: ${a.quizType}\nNivel: ${a.level}\nRespuestas al final: ${a.answersAtEnd}\n\nReglas:\n\n* Si es opción múltiple, usa opciones A, B, C y D.\n* Si es verdadero/falso, usa frases claras.\n* Si es respuesta corta, pide respuestas breves.\n* Si es mixto, combina formatos.\n* No repitas preguntas.\n* Si pedí respuestas al final, agrega una sección final de respuestas.`,
    summary: 'Haz un resumen en español de estas páginas. Incluye las ideas principales, palabras importantes y un mini repaso final.',
    flashcards: `Crea flashcards en español para estudiar estas páginas.
Número de flashcards: ${a.flashcardCount}\nNivel: ${a.level}\nFormato:\nPregunta:\nRespuesta:\nHazlas claras, cortas y útiles para memorizar.`,
    exam: `Crea una guía de repaso para examen en español usando estas páginas.${a.examDate ? `\nFecha del examen: ${a.examDate}` : ''}\nNivel: ${a.level}\nIncluye los temas más importantes, posibles preguntas de examen, errores comunes y un mini quiz final.`,
    mindmap: 'Crea un mapa mental textual en español sobre estas páginas.\nFormato:\nIdea central\n\n* Rama principal\n\n  * Subtema\n  * Detalles importantes\n\nNo generes una imagen. Hazlo como mapa mental escrito, claro y organizado.',
    audio: 'Crea una guía para audio explicativo o podcast en español sobre estas páginas. Debe sonar como una explicación clara entre tutores, con introducción, desarrollo, ejemplos y cierre con repaso.',
    vocabulary: `Extrae vocabulario importante en español de estas páginas.
Número de palabras: ${a.wordCount}${a.vocabularyLanguage ? `\nIdioma: ${a.vocabularyLanguage}` : ''}\nPara cada palabra incluye:\n\n* Palabra\n* Definición sencilla\n* Ejemplo\n* Pregunta de práctica`,
    presentation: `Crea una presentación en español sobre estas páginas.\nNúmero de diapositivas: ${a.slideCount}\nTexto para exponer: ${a.speakingNotes}\nPara cada diapositiva incluye:\n\n* Título\n* Puntos principales\n* Texto corto\n* Idea visual sugerida\n\nSi pedí texto para exponer, agrega una explicación breve para cada diapositiva.`,
    timeline: 'Crea una línea de tiempo en español con los eventos, pasos o etapas importantes de estas páginas. Ordénala claramente y agrega una explicación corta para cada punto.',
  };
  return map[state.selectedType];
}

function buildPrompt() {
  const lang = state.answers.language || 'es';
  return `${buildBase(lang)}\n\n${buildSpecificInstruction(lang)}`;
}

function GeneratedPrompt() {
  root.innerHTML = `<main class="app-shell form-shell"><section class="result-card"><h1>Prompt generado</h1><p class="field-help">Puedes editarlo antes de copiarlo.</p><textarea class="prompt-output" aria-label="Prompt generado editable">${escapeHtml(state.generatedPrompt)}</textarea><div class="result-actions"><button data-copy type="button">Copiar prompt</button><button data-edit type="button">Editar respuestas</button><button data-reset type="button">Crear otro prompt</button></div>${state.copyMessage ? `<p class="success-message" role="status">${state.copyMessage}</p>` : ''}</section></main>`;
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
  if (event.target.closest('[data-reset]')) { state.screen = 'home'; state.generatedPrompt = ''; state.copyMessage = ''; render(); }
});

root.addEventListener('input', (event) => {
  if (event.target.matches('[data-answer]')) state.answers[event.target.dataset.answer] = event.target.value;
  if (event.target.matches('[data-option]')) state.selectedOptions = event.target.checked ? [...new Set([...state.selectedOptions, event.target.dataset.option])] : state.selectedOptions.filter((option) => option !== event.target.dataset.option);
  if (event.target.matches('.prompt-output')) state.generatedPrompt = event.target.value;
});

root.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && event.target.matches('.answer-field:not(select)')) document.querySelector('[data-next]')?.click();
});

render();
