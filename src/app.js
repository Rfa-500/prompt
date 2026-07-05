const promptTypes = {
  video: {
    title: 'Prompt para video',
    description: 'Crea una guía clara para que NotebookLM prepare un video explicativo del libro.',
    icon: '🎬',
  },
  study: {
    title: 'Prompt para estudiar páginas del libro',
    description: 'Genera una ayuda de estudio ordenada usando solo las páginas que elegiste.',
    icon: '📚',
  },
  quiz: {
    title: 'Prompt para quiz',
    description: 'Pide un quiz personalizado para practicar antes de una clase o examen.',
    icon: '📝',
  },
  summary: {
    title: 'Prompt para resumen',
    description: 'Resumen breve y útil de las páginas seleccionadas.',
    icon: '📄',
  },
  flashcards: {
    title: 'Prompt para flashcards',
    description: 'Tarjetas para memorizar conceptos importantes.',
    icon: '🧠',
  },
  exam: {
    title: 'Prompt para repaso de examen',
    description: 'Guía de repaso para estudiar antes del examen.',
    icon: '✅',
  },
  mindmap: {
    title: 'Prompt para mapa mental',
    description: 'Mapa mental escrito, claro y organizado.',
    icon: '🗺️',
  },
  audio: {
    title: 'Prompt para audio / podcast',
    description: 'Guía para crear una explicación en audio.',
    icon: '🎧',
  },
  vocabulary: {
    title: 'Prompt para vocabulario',
    description: 'Lista de palabras importantes con definiciones.',
    icon: '🔤',
  },
  presentation: {
    title: 'Prompt para presentación',
    description: 'Diapositivas organizadas con ideas claras.',
    icon: '📊',
  },
  timeline: {
    title: 'Prompt para línea de tiempo',
    description: 'Eventos, pasos o etapas en orden.',
    icon: '⏳',
  },
};

const optionLabels = {
  es: {
    mainTopic: 'Tema principal',
    clearExplanation: 'Explicación clara',
    definitions: 'Palabras importantes con definiciones',
    examples: 'Ejemplos sencillos',
    shortSummary: 'Resumen corto',
    practiceAnswers: 'Preguntas de práctica con respuestas',
    examQuestions: 'Preguntas tipo examen sin respuestas',
    commonMistakes: 'Errores comunes',
    finalReview: 'Mini repaso final',
  },
  en: {
    mainTopic: 'Main topic',
    clearExplanation: 'Clear explanation',
    definitions: 'Important words with definitions',
    examples: 'Simple examples',
    shortSummary: 'Short summary',
    practiceAnswers: 'Practice questions with answers',
    examQuestions: 'Exam-style questions without answers',
    commonMistakes: 'Common mistakes',
    finalReview: 'Short final review',
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
  {
    key: 'language',
    title: '¿Quieres el prompt en español o en inglés?',
    type: 'choice',
    choices: [
      { label: 'Español', value: 'es' },
      { label: 'Inglés', value: 'en' },
    ],
  },
  {
    key: 'studentName',
    title: '¿Cuál es tu nombre?',
    type: 'name',
    placeholder: 'Escribe tu nombre',
  },
  {
    key: 'grade',
    title: '¿En qué grado estás?',
    type: 'text',
    placeholder: 'Ejemplo: 6.º grado',
  },
  {
    key: 'subject',
    title: '¿Cuál es la materia del libro?',
    type: 'text',
    placeholder: 'Ejemplo: Ciencias',
  },
  {
    key: 'source',
    title: '¿Cómo se llama el libro o fuente?',
    type: 'text',
    placeholder: 'Opcional',
    optional: true,
  },
  {
    key: 'startPage',
    title: '¿Cuál es la primera página impresa del libro que estás estudiando?',
    type: 'number',
    placeholder: 'Ejemplo: 60',
  },
  {
    key: 'endPage',
    title: '¿Cuál es la última página impresa del libro que estás estudiando?',
    type: 'number',
    placeholder: 'Ejemplo: 70',
  },
  {
    key: 'pdfStartPage',
    title: 'Si sabes la página real del PDF donde empieza, escríbela aquí. Si no la sabes, déjalo vacío.',
    type: 'number',
    placeholder: 'Opcional',
    optional: true,
  },
  {
    key: 'pdfEndPage',
    title: 'Si sabes la página real del PDF donde termina, escríbela aquí. Si no la sabes, déjalo vacío.',
    type: 'number',
    placeholder: 'Opcional',
    optional: true,
  },
];

const extraSteps = {
  quiz: [
    {
      key: 'quizCount',
      title: 'Número de preguntas',
      type: 'number',
      placeholder: 'Ejemplo: 10',
    },
    {
      key: 'quizType',
      title: 'Tipo de quiz',
      type: 'select',
      options: ['Opción múltiple', 'Verdadero/falso', 'Respuesta corta', 'Mixto'],
    },
    {
      key: 'answersAtEnd',
      title: '¿Quieres respuestas al final?',
      type: 'select',
      options: ['Sí', 'No'],
    },
    {
      key: 'level',
      title: 'Nivel',
      type: 'select',
      options: ['Fácil', 'Medio', 'Difícil'],
    },
  ],
  flashcards: [
    {
      key: 'flashcardCount',
      title: 'Número de flashcards',
      type: 'number',
      placeholder: 'Ejemplo: 15',
    },
    {
      key: 'level',
      title: 'Nivel',
      type: 'select',
      options: ['Fácil', 'Medio', 'Difícil'],
    },
  ],
  exam: [
    {
      key: 'examDate',
      title: 'Fecha del examen, opcional',
      type: 'text',
      placeholder: 'Opcional',
      optional: true,
    },
    {
      key: 'level',
      title: 'Nivel',
      type: 'select',
      options: ['Fácil', 'Medio', 'Difícil'],
    },
  ],
  vocabulary: [
    {
      key: 'wordCount',
      title: 'Número de palabras',
      type: 'number',
      placeholder: 'Ejemplo: 12',
    },
    {
      key: 'vocabularyLanguage',
      title: 'Idioma, solo si aplica',
      type: 'text',
      placeholder: 'Opcional',
      optional: true,
    },
  ],
  presentation: [
    {
      key: 'slideCount',
      title: 'Número de diapositivas',
      type: 'number',
      placeholder: 'Ejemplo: 8',
    },
    {
      key: 'speakingNotes',
      title: '¿Necesitas texto para exponer?',
      type: 'select',
      options: ['Sí', 'No'],
    },
  ],
};

let state = {
  screen: 'home',
  selectedType: null,
  currentStep: 0,
  answers: {
    language: 'es',
    quizType: 'Mixto',
    answersAtEnd: 'Sí',
    level: 'Medio',
    speakingNotes: 'Sí',
  },
  selectedOptions: [],
  generatedPrompt: '',
  copyMessage: '',
};

const root = document.querySelector('#root');

function escapeHtml(value = '') {
  return String(value).replace(/[&<>'"]/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;',
  })[char]);
}

function currentOptions() {
  return optionsByType[state.selectedType] || [];
}

function currentSteps() {
  return [
    ...commonSteps,
    ...(extraSteps[state.selectedType] || []),
    {
      key: 'options',
      title: 'Elige qué debe incluir el prompt',
      optional: true,
    },
  ];
}

function PromptCard(key, card) {
  return `
    <article class="prompt-card">
      <div class="card-icon" aria-hidden="true">${card.icon}</div>
      <h2>${card.title}</h2>
      <p>${card.description}</p>
      <button class="primary-button" data-create="${key}" type="button">
        Crear prompt <span aria-hidden="true">→</span>
      </button>
    </article>
  `;
}

function renderHome() {
  root.innerHTML = `
    <main class="app-shell home-shell">
      <section class="hero" aria-labelledby="main-title">
        <div class="eyebrow">✨ Herramienta para NotebookLM/Gemini</div>
        <h1 id="main-title">Crea prompts académicos en minutos</h1>
        <p>Responde preguntas sencillas, elige lo que necesitas y copia un prompt listo para estudiar libros escaneados con más precisión.</p>
      </section>

      <section class="card-grid" aria-label="Tipos de prompt">
        ${Object.entries(promptTypes).map(([key, card]) => PromptCard(key, card)).join('')}
      </section>
    </main>
  `;
}

function CheckboxOptions() {
  const lang = state.answers.language || 'es';
  const labels = optionLabels[lang];

  return `
    <div class="checkbox-list">
      ${currentOptions().map((key) => `
        <label class="checkbox-option">
          <input
            type="checkbox"
            data-option="${key}"
            ${state.selectedOptions.includes(key) ? 'checked' : ''}
          />
          <span>${labels[key]}</span>
        </label>
      `).join('')}
    </div>
  `;
}

function renderField(step, value) {
  if (step.key === 'options') {
    return `
      <p class="field-help">Los puntos marcados se agregarán al prompt.</p>
      ${CheckboxOptions()}
    `;
  }

  if (step.type === 'choice') {
    return `
      <div class="choice-list">
        ${step.choices.map((choice) => `
          <label>
            <input
              type="radio"
              name="${step.key}"
              data-answer="${step.key}"
              value="${choice.value}"
              ${value === choice.value ? 'checked' : ''}
            />
            ${choice.label}
          </label>
        `).join('')}
      </div>
    `;
  }

  if (step.type === 'name') {
    return `
      <div class="quick-choices">
        <button type="button" data-quick-name="Sofía">Sofía</button>
        <button type="button" data-quick-name="Gabriela">Gabriela</button>
      </div>
      <input
        class="answer-field"
        data-answer="${step.key}"
        type="text"
        value="${escapeHtml(value)}"
        placeholder="${step.placeholder}"
        autofocus
      />
    `;
  }

  if (step.type === 'select') {
    return `
      <select class="answer-field" data-answer="${step.key}" autofocus>
        ${step.options.map((option) => `
          <option value="${option}" ${value === option ? 'selected' : ''}>${option}</option>
        `).join('')}
      </select>
    `;
  }

  return `
    <input
      class="answer-field"
      data-answer="${step.key}"
      type="${step.type}"
      value="${escapeHtml(value)}"
      placeholder="${step.placeholder}"
      autofocus
    />
  `;
}

function StepForm(error = '') {
  const steps = currentSteps();
  const step = steps[state.currentStep];
  const value = state.answers[step.key] || '';
  const progress = Math.round(((state.currentStep + 1) / steps.length) * 100);

  root.innerHTML = `
    <main class="app-shell form-shell">
      <section class="form-card">
        <button class="back-link" data-back type="button">← Atrás</button>

        <p class="form-kicker">${promptTypes[state.selectedType].title}</p>

        <div class="progress-wrap" aria-label="Progreso ${progress}%">
          <div class="progress-bar" style="width:${progress}%"></div>
        </div>

        <p class="progress-text">Paso ${state.currentStep + 1} de ${steps.length}</p>

        <div class="step-content">
          <h1>${step.title}</h1>
          ${renderField(step, value)}
          ${error ? `<p class="error-message" role="alert">${error}</p>` : ''}
        </div>

        <button class="check-button" data-next type="button" aria-label="Avanzar">✓</button>
      </section>
    </main>
  `;

  document.querySelector('[autofocus]')?.focus();
}

function normalizeAnswer(value, lang) {
  if (lang === 'en') {
    return {
      'Opción múltiple': 'Multiple choice',
      'Verdadero/falso': 'True/false',
      'Respuesta corta': 'Short answer',
      'Mixto': 'Mixed',
      'Sí': 'Yes',
      'No': 'No',
      'Fácil': 'Easy',
      'Medio': 'Medium',
      'Difícil': 'Hard',
    }[value] || value;
  }

  return value;
}

function selectedOptionsText(lang) {
  const labels = optionLabels[lang];
  const items = state.selectedOptions.map((key) => labels[key]).filter(Boolean);

  return items.length
    ? items.join(', ')
    : lang === 'en'
      ? 'only what is necessary for this prompt'
      : 'solo lo necesario para este prompt';
}

function buildBase(lang) {
  const a = state.answers;

  const source = a.source || (lang === 'en' ? 'Not specified' : 'No especificado');
  const pdfStart = a.pdfStartPage || (lang === 'en' ? 'to confirm' : 'por confirmar');
  const pdfEnd = a.pdfEndPage || (lang === 'en' ? 'to confirm' : 'por confirmar');

  const pdfLine = a.pdfStartPage || a.pdfEndPage
    ? lang === 'en'
      ? 'Verify that the actual PDF pages listed correctly match the printed book pages.'
      : 'Verifica que las páginas reales del PDF indicadas correspondan correctamente a las páginas impresas del libro.'
    : lang === 'en'
      ? 'First locate and confirm the actual PDF pages that correspond to these printed book pages.'
      : 'Primero ubica y confirma las páginas reales del PDF que corresponden a estas páginas impresas del libro.';

  if (lang === 'en') {
    return `Student: ${a.studentName}
Grade: ${a.grade}
Subject: ${a.subject}
Book or source: ${source}
Printed book pages: ${a.startPage} - ${a.endPage}
Actual PDF pages: ${pdfStart} - ${pdfEnd}

The page numbers I am giving are the printed page numbers shown inside the book. Since the book is scanned inside a PDF, they may not match the actual PDF file page numbers.

First, confirm which actual PDF pages correspond to these printed book pages. ${pdfLine} Also confirm the topic, chapter, or subtitles that appear on those pages.

If you cannot confirm this with certainty, tell me what you found and do not invent information.

Use only the uploaded book or sources.`;
  }

  return `Estudiante: ${a.studentName}
Grado: ${a.grade}
Materia: ${a.subject}
Libro o fuente: ${source}
Páginas impresas del libro: ${a.startPage} - ${a.endPage}
Páginas reales del PDF: ${pdfStart} - ${pdfEnd}

Los números de página que estoy dando son las páginas impresas que aparecen en el libro. Como el libro está escaneado dentro de un PDF, pueden no coincidir con las páginas reales del archivo.

Primero confirma qué páginas reales del PDF corresponden a estas páginas impresas del libro. ${pdfLine} Confirma también el tema, capítulo o subtítulos que aparecen en esas páginas.

Si no puedes confirmarlo con seguridad, dime qué encontraste y no inventes.

Usa solamente la información del libro o fuentes subidas.`;
}

function buildSpecificInstruction(lang) {
  const a = state.answers;
  const include = selectedOptionsText(lang);

  if (lang === 'en') {
    const instructions = {
      video: `Create a video explanation about these pages. Make it clear, organized, and easy to understand for my grade level. Include: ${include}.`,
      study: `Help me study only these pages. Include: ${include}.`,
      quiz: `Create a quiz to practice these pages.
Number of questions: ${a.quizCount}
Quiz type: ${normalizeAnswer(a.quizType, lang)}
Level: ${normalizeAnswer(a.level, lang)}
Answers at the end: ${normalizeAnswer(a.answersAtEnd, lang)}

Rules:
* If it is multiple choice, use options A, B, C, and D.
* If it is true/false, use clear statements.
* If it is short answer, ask for brief answers.
* If it is mixed, combine formats.
* Do not repeat questions.
* If I asked for answers at the end, add a final answer key.`,
      summary: `Summarize these pages. Include: ${include}.`,
      flashcards: `Create ${a.flashcardCount} flashcards to study these pages.
Level: ${normalizeAnswer(a.level, lang)}
Format:
Question:
Answer:
Make them clear, short, and useful for memorization.`,
      exam: `Create an exam review guide using these pages.${a.examDate ? `\nExam date: ${a.examDate}` : ''}
Level: ${normalizeAnswer(a.level, lang)}
Include: ${include}.`,
      mindmap: `Create a textual mind map about these pages.
Format:
Central idea
* Main branch
  * Subtopic
  * Important details

Do not generate an image. Make it a clear and organized written mind map.`,
      audio: `Create a guide for an explanatory audio or podcast about these pages. It should sound like a clear tutor-style explanation, with an introduction, development, examples, and a final review.`,
      vocabulary: `Extract ${a.wordCount} important words from these pages.${a.vocabularyLanguage ? `\nLanguage: ${a.vocabularyLanguage}` : ''}
For each word include:
* Word
* Simple definition
* Example
* Practice question`,
      presentation: `Create a presentation about these pages.
Number of slides: ${a.slideCount}
Speaking notes: ${normalizeAnswer(a.speakingNotes, lang)}
For each slide include:
* Title
* Main points
* Short text
* Suggested visual idea

If I asked for speaking notes, add a short explanation for each slide.`,
      timeline: `Create a timeline with the important events, steps, or stages from these pages. Organize it clearly and add a short explanation for each point.`,
    };

    return instructions[state.selectedType];
  }

  const instructions = {
    video: `Crea una explicación para video sobre estas páginas. Hazla clara, ordenada y fácil de entender para mi grado. Incluye: ${include}.`,
    study: `Ayúdame a estudiar solamente estas páginas. Incluye: ${include}.`,
    quiz: `Crea un quiz para practicar estas páginas.
Número de preguntas: ${a.quizCount}
Tipo de quiz: ${a.quizType}
Nivel: ${a.level}
Respuestas al final: ${a.answersAtEnd}

Reglas:
* Si es opción múltiple, usa opciones A, B, C y D.
* Si es verdadero/falso, usa frases claras.
* Si es respuesta corta, pide respuestas breves.
* Si es mixto, combina formatos.
* No repitas preguntas.
* Si pedí respuestas al final, agrega una sección final de respuestas.`,
    summary: `Haz un resumen de estas páginas. Incluye: ${include}.`,
    flashcards: `Crea ${a.flashcardCount} flashcards para estudiar estas páginas.
Nivel: ${a.level}
Formato:
Pregunta:
Respuesta:
Hazlas claras, cortas y útiles para memorizar.`,
    exam: `Crea una guía de repaso para examen usando estas páginas.${a.examDate ? `\nFecha del examen: ${a.examDate}` : ''}
Nivel: ${a.level}
Incluye: ${include}.`,
    mindmap: `Crea un mapa mental textual sobre estas páginas.
Formato:
Idea central
* Rama principal
  * Subtema
  * Detalles importantes

No generes una imagen. Hazlo como mapa mental escrito, claro y organizado.`,
    audio: `Crea una guía para audio explicativo o podcast sobre estas páginas. Debe sonar como una explicación clara entre tutores, con introducción, desarrollo, ejemplos y cierre con repaso.`,
    vocabulary: `Extrae ${a.wordCount} palabras importantes de estas páginas.${a.vocabularyLanguage ? `\nIdioma: ${a.vocabularyLanguage}` : ''}
Para cada palabra incluye:
* Palabra
* Definición sencilla
* Ejemplo
* Pregunta de práctica`,
    presentation: `Crea una presentación sobre estas páginas.
Número de diapositivas: ${a.slideCount}
Texto para exponer: ${a.speakingNotes}
Para cada diapositiva incluye:
* Título
* Puntos principales
* Texto corto
* Idea visual sugerida

Si pedí texto para exponer, agrega una explicación breve para cada diapositiva.`,
    timeline: `Crea una línea de tiempo con los eventos, pasos o etapas importantes de estas páginas. Ordénala claramente y agrega una explicación corta para cada punto.`,
  };

  return instructions[state.selectedType];
}

function buildPrompt() {
  const lang = state.answers.language || 'es';
  return `${buildBase(lang)}\n\n${buildSpecificInstruction(lang)}`;
}

function GeneratedPrompt() {
  root.innerHTML = `
    <main class="app-shell result-shell">
      <section class="result-card">
        <div class="eyebrow">✨ ¡Listo!</div>
        <h1>Tu prompt está listo para usar</h1>
        <p class="result-help">Puedes editarlo aquí antes de copiarlo y pegarlo en NotebookLM.</p>

        <textarea class="prompt-output" aria-label="Prompt generado editable">${escapeHtml(state.generatedPrompt)}</textarea>

        <div class="result-actions">
          <div class="copy-area">
            <button class="primary-button" data-copy type="button">📋 Copiar prompt</button>
            ${state.copyMessage ? `<p class="success-message" role="status">${state.copyMessage}</p>` : ''}
          </div>

          <button class="secondary-button" data-edit type="button">Editar respuestas</button>
          <button class="secondary-button" data-reset type="button">↻ Crear otro prompt</button>
        </div>
      </section>
    </main>
  `;
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

    setTimeout(() => {
      piece.remove();
    }, 1800);
  }
}

function render(error = '') {
  if (state.screen === 'form') {
    StepForm(error);
  } else if (state.screen === 'result') {
    GeneratedPrompt();
  } else {
    renderHome();
  }
}

root.addEventListener('click', async (event) => {
  const createButton = event.target.closest('[data-create]');
  const quickNameButton = event.target.closest('[data-quick-name]');
  const backButton = event.target.closest('[data-back]');
  const nextButton = event.target.closest('[data-next]');
  const copyButton = event.target.closest('[data-copy]');
  const editButton = event.target.closest('[data-edit]');
  const resetButton = event.target.closest('[data-reset]');

  if (createButton) {
    const type = createButton.dataset.create;

    state = {
      ...state,
      screen: 'form',
      selectedType: type,
      currentStep: 0,
      answers: {
        language: 'es',
        quizType: 'Mixto',
        answersAtEnd: 'Sí',
        level: 'Medio',
        speakingNotes: 'Sí',
      },
      selectedOptions: [...(optionsByType[type] || [])],
      generatedPrompt: '',
      copyMessage: '',
    };

    render();
    return;
  }

  if (quickNameButton) {
    state.answers.studentName = quickNameButton.dataset.quickName;
    render();
    return;
  }

  if (backButton) {
    if (state.currentStep === 0) {
      state.screen = 'home';
    } else {
      state.currentStep -= 1;
    }

    render();
    return;
  }

  if (nextButton) {
    const steps = currentSteps();
    const step = steps[state.currentStep];

    if (!step.optional && !String(state.answers[step.key] || '').trim()) {
      render('Completa este campo para continuar.');
      return;
    }

    if (state.currentStep === steps.length - 1) {
      state.generatedPrompt = buildPrompt();
      state.screen = 'result';
      render();
      launchConfetti();
    } else {
      state.currentStep += 1;
      render();
    }

    return;
  }

  if (copyButton) {
    state.generatedPrompt = document.querySelector('.prompt-output').value;

    try {
      await navigator.clipboard.writeText(state.generatedPrompt);
      state.copyMessage = 'Prompt copiado. Ahora pégalo en NotebookLM.';
    } catch {
      state.copyMessage = 'No se pudo copiar automáticamente. Selecciona el texto y cópialo manualmente.';
    }

    render();

    setTimeout(() => {
      state.copyMessage = '';
      render();
    }, 3500);

    return;
  }

  if (editButton) {
    state.generatedPrompt = document.querySelector('.prompt-output').value;
    state.screen = 'form';
    state.currentStep = 0;
    render();
    return;
  }

  if (resetButton) {
    state.screen = 'home';
    state.selectedType = null;
    state.currentStep = 0;
    state.generatedPrompt = '';
    state.copyMessage = '';
    render();
  }
});

root.addEventListener('input', (event) => {
  if (event.target.matches('[data-answer]')) {
    state.answers[event.target.dataset.answer] = event.target.value;
  }

  if (event.target.matches('[data-option]')) {
    const option = event.target.dataset.option;

    if (event.target.checked) {
      state.selectedOptions = [...new Set([...state.selectedOptions, option])];
    } else {
      state.selectedOptions = state.selectedOptions.filter((item) => item !== option);
    }
  }

  if (event.target.matches('.prompt-output')) {
    state.generatedPrompt = event.target.value;
  }
});

root.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && event.target.matches('.answer-field:not(select)')) {
    document.querySelector('[data-next]')?.click();
  }
});

render();
