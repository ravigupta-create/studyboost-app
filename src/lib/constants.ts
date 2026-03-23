import { Feature } from '@/types';

export const FEATURE_CATEGORIES = [
  'Study Techniques',
  'Writing & Language',
  'Math & Science',
  'Test Prep',
  'Productivity',
  'Reference',
  'Critical Thinking',
  'Languages',
  'Games & Challenges',
  'College Prep',
  'Accessibility',
] as const;

export const FEATURES: Feature[] = [
  // ===== EXISTING FEATURES (19) =====
  { id: 'homework', name: 'Homework Explainer', description: 'Paste any homework question and get a clear, step-by-step explanation.', href: '/homework', icon: '📚', aiPowered: true, color: 'from-purple-500 to-indigo-500', category: 'Study Techniques' },
  { id: 'assessment', name: 'Assessment Mode', description: 'Diagnostic math assessment with personalized lessons for Integrated Math 1/2/3 Honors.', href: '/assessment', icon: '📊', aiPowered: false, color: 'from-blue-600 to-purple-600', category: 'Test Prep' },
  { id: 'quiz', name: 'Quiz Generator', description: 'Turn your notes into interactive quiz questions with instant scoring.', href: '/quiz', icon: '❓', aiPowered: true, color: 'from-blue-500 to-cyan-500', category: 'Study Techniques' },
  { id: 'flashcards', name: 'Flashcard Generator', description: 'Generate flip-animated flashcard decks from any study material.', href: '/flashcards', icon: '🃏', aiPowered: true, color: 'from-emerald-500 to-teal-500', category: 'Study Techniques' },
  { id: 'summarizer', name: 'Note Summarizer', description: 'Condense long notes into concise, organized bullet-point summaries.', href: '/summarizer', icon: '📝', aiPowered: true, color: 'from-amber-500 to-orange-500', category: 'Study Techniques' },
  { id: 'math', name: 'Math Problem Solver', description: 'Get step-by-step solutions for algebra, calculus, and more.', href: '/math', icon: '🧮', aiPowered: true, color: 'from-rose-500 to-pink-500', category: 'Math & Science' },
  { id: 'essay', name: 'Essay Outline Generator', description: 'Input a topic and get a structured, detailed essay outline.', href: '/essay', icon: '✍️', aiPowered: true, color: 'from-violet-500 to-purple-500', category: 'Writing & Language' },
  { id: 'planner', name: 'Study Planner', description: 'Create a visual weekly study schedule based on your subjects and availability.', href: '/planner', icon: '📅', aiPowered: false, color: 'from-sky-500 to-blue-500', category: 'Productivity' },
  { id: 'pomodoro', name: 'Pomodoro Timer', description: 'Stay focused with a configurable work/break interval timer.', href: '/pomodoro', icon: '⏱️', aiPowered: false, color: 'from-red-500 to-rose-500', category: 'Productivity' },
  { id: 'gpa', name: 'GPA Calculator', description: 'Calculate weighted and unweighted GPA from your grades and credits.', href: '/gpa', icon: '🎓', aiPowered: false, color: 'from-green-500 to-emerald-500', category: 'Productivity' },
  { id: 'citations', name: 'Citation Generator', description: 'Generate properly formatted MLA, APA, and Chicago citations.', href: '/citations', icon: '📖', aiPowered: false, color: 'from-indigo-500 to-violet-500', category: 'Writing & Language' },
  { id: 'chat', name: 'Study Chat', description: 'Chat with an AI tutor about any subject. Ask follow-up questions.', href: '/chat', icon: '💬', aiPowered: true, color: 'from-cyan-500 to-blue-500', category: 'Study Techniques' },
  { id: 'vocab', name: 'Vocabulary Builder', description: 'Extract and learn key vocabulary words from any text.', href: '/vocab', icon: '📖', aiPowered: true, color: 'from-lime-500 to-green-500', category: 'Languages' },
  { id: 'practice', name: 'Practice Problems', description: 'Generate practice problems by topic and difficulty level.', href: '/practice', icon: '🎯', aiPowered: true, color: 'from-orange-500 to-red-500', category: 'Test Prep' },
  { id: 'feedback', name: 'Writing Feedback', description: 'Get AI feedback on your essays and writing assignments.', href: '/feedback', icon: '📝', aiPowered: true, color: 'from-pink-500 to-rose-500', category: 'Writing & Language' },
  { id: 'translate', name: 'Language Translator', description: 'Translate text with vocabulary notes and grammar explanations.', href: '/translate', icon: '🌍', aiPowered: true, color: 'from-teal-500 to-cyan-500', category: 'Languages' },
  { id: 'formulas', name: 'Formula Sheet', description: 'Quick reference for math, physics, and chemistry formulas.', href: '/formulas', icon: '📐', aiPowered: false, color: 'from-yellow-500 to-amber-500', category: 'Reference' },
  { id: 'wordcount', name: 'Word Counter', description: 'Count words, characters, sentences, and get readability scores.', href: '/wordcount', icon: '🔢', aiPowered: false, color: 'from-gray-500 to-slate-500', category: 'Writing & Language' },
  { id: 'library', name: 'My Library', description: 'Access your saved quizzes, flashcards, and study materials.', href: '/library', icon: '📚', aiPowered: false, color: 'from-purple-500 to-indigo-500', category: 'Productivity' },

  // ===== NEW OFFLINE FEATURES (50) =====

  // Study Techniques - Offline (4)
  { id: 'spaced-repetition', name: 'Spaced Repetition', description: 'Review flashcards with SM-2 scheduling for optimal long-term retention.', href: '/spaced-repetition', icon: '🔄', aiPowered: false, color: 'from-purple-500 to-indigo-500', category: 'Study Techniques' },
  { id: 'cornell-notes', name: 'Cornell Notes', description: 'Structure notes in Cornell format with cues, notes, and summary sections.', href: '/cornell-notes', icon: '📋', aiPowered: false, color: 'from-blue-500 to-indigo-500', category: 'Study Techniques' },
  { id: 'sq3r', name: 'SQ3R Reader', description: 'Guided reading with Survey-Question-Read-Recite-Review methodology.', href: '/sq3r', icon: '📖', aiPowered: false, color: 'from-teal-500 to-green-500', category: 'Study Techniques' },
  { id: 'card-match', name: 'Flashcard Match', description: 'Memory matching game using your saved flashcard decks.', href: '/card-match', icon: '🎴', aiPowered: false, color: 'from-pink-500 to-purple-500', category: 'Study Techniques' },

  // Writing & Language - Offline (2)
  { id: 'reading-level', name: 'Reading Level Analyzer', description: 'Analyze text readability with Flesch-Kincaid, Gunning Fog, and SMOG indices.', href: '/reading-level', icon: '📊', aiPowered: false, color: 'from-emerald-500 to-teal-500', category: 'Writing & Language' },
  { id: 'transitions', name: 'Transition Words', description: '200+ categorized transition words and phrases with usage examples.', href: '/transitions', icon: '🔗', aiPowered: false, color: 'from-cyan-500 to-blue-500', category: 'Writing & Language' },

  // Math & Science - Offline (8)
  { id: 'converter', name: 'Unit Converter', description: 'Convert between units for length, mass, temperature, volume, and more.', href: '/converter', icon: '⚖️', aiPowered: false, color: 'from-amber-500 to-yellow-500', category: 'Math & Science' },
  { id: 'graph', name: 'Graphing Calculator', description: 'Plot mathematical functions on an interactive coordinate grid.', href: '/graph', icon: '📈', aiPowered: false, color: 'from-blue-500 to-purple-500', category: 'Math & Science' },
  { id: 'statistics', name: 'Statistics Calculator', description: 'Calculate mean, median, mode, standard deviation, quartiles, and box plots.', href: '/statistics', icon: '📉', aiPowered: false, color: 'from-green-500 to-teal-500', category: 'Math & Science' },
  { id: 'matrix', name: 'Matrix Calculator', description: 'Matrix addition, multiplication, determinant, inverse, and row reduction.', href: '/matrix', icon: '🔢', aiPowered: false, color: 'from-indigo-500 to-blue-500', category: 'Math & Science' },
  { id: 'periodic-table', name: 'Periodic Table', description: 'Interactive periodic table with element details and electron configurations.', href: '/periodic-table', icon: '⚗️', aiPowered: false, color: 'from-emerald-500 to-green-500', category: 'Math & Science' },
  { id: 'base-converter', name: 'Base Converter', description: 'Convert numbers between binary, octal, decimal, and hexadecimal.', href: '/base-converter', icon: '💻', aiPowered: false, color: 'from-gray-500 to-blue-500', category: 'Math & Science' },
  { id: 'probability', name: 'Probability Calculator', description: 'Permutations, combinations, and probability distributions.', href: '/probability', icon: '🎲', aiPowered: false, color: 'from-orange-500 to-red-500', category: 'Math & Science' },
  { id: 'sig-figs', name: 'Sig Figs Calculator', description: 'Count significant figures and perform operations with proper rounding.', href: '/sig-figs', icon: '🔬', aiPowered: false, color: 'from-violet-500 to-indigo-500', category: 'Math & Science' },

  // Test Prep - Offline (4)
  { id: 'test-anxiety', name: 'Test Anxiety Relief', description: 'Guided breathing exercises and grounding techniques for test anxiety.', href: '/test-anxiety', icon: '🧘', aiPowered: false, color: 'from-green-500 to-emerald-500', category: 'Test Prep' },
  { id: 'mistakes', name: 'Mistake Tracker', description: 'Log test mistakes, categorize errors, and identify patterns.', href: '/mistakes', icon: '❌', aiPowered: false, color: 'from-red-500 to-orange-500', category: 'Test Prep' },
  { id: 'exam-countdown', name: 'Exam Countdown', description: 'Set exam dates with countdown timers and study milestones.', href: '/exam-countdown', icon: '⏰', aiPowered: false, color: 'from-amber-500 to-red-500', category: 'Test Prep' },
  { id: 'score-predictor', name: 'Score Predictor', description: 'Track practice scores over time with trend analysis and predictions.', href: '/score-predictor', icon: '📈', aiPowered: false, color: 'from-blue-500 to-green-500', category: 'Test Prep' },

  // Productivity - Offline (10)
  { id: 'assignments', name: 'Assignment Tracker', description: 'Track homework with due dates, priorities, and completion status.', href: '/assignments', icon: '✅', aiPowered: false, color: 'from-green-500 to-emerald-500', category: 'Productivity' },
  { id: 'session-log', name: 'Session Logger', description: 'Log study sessions with duration, effectiveness, and energy ratings.', href: '/session-log', icon: '📝', aiPowered: false, color: 'from-blue-500 to-cyan-500', category: 'Productivity' },
  { id: 'goals', name: 'Goal Setter', description: 'Set SMART study goals with milestones, progress tracking, and streaks.', href: '/goals', icon: '🎯', aiPowered: false, color: 'from-yellow-500 to-orange-500', category: 'Productivity' },
  { id: 'notes', name: 'Note Organizer', description: 'Create, organize, and search notes with folders, tags, and markdown.', href: '/notes', icon: '🗂️', aiPowered: false, color: 'from-indigo-500 to-purple-500', category: 'Productivity' },
  { id: 'habits', name: 'Habit Tracker', description: 'Build study habits with daily check-ins and a visual heatmap.', href: '/habits', icon: '🔥', aiPowered: false, color: 'from-orange-500 to-red-500', category: 'Productivity' },
  { id: 'schedule', name: 'Class Schedule', description: 'Build your weekly class schedule with color-coded blocks.', href: '/schedule', icon: '🗓️', aiPowered: false, color: 'from-sky-500 to-blue-500', category: 'Productivity' },
  { id: 'focus-log', name: 'Focus Log', description: 'Log distractions during study and analyze patterns to improve focus.', href: '/focus-log', icon: '🧠', aiPowered: false, color: 'from-purple-500 to-pink-500', category: 'Productivity' },
  { id: 'project-planner', name: 'Project Planner', description: 'Break projects into tasks with timeline and progress tracking.', href: '/project-planner', icon: '📋', aiPowered: false, color: 'from-teal-500 to-cyan-500', category: 'Productivity' },
  { id: 'reading-list', name: 'Reading List', description: 'Track books and articles with status, ratings, and reading time.', href: '/reading-list', icon: '📚', aiPowered: false, color: 'from-amber-500 to-yellow-500', category: 'Productivity' },
  { id: 'journal', name: 'Study Journal', description: 'Daily study reflection with guided prompts and mood tracking.', href: '/journal', icon: '📓', aiPowered: false, color: 'from-rose-500 to-pink-500', category: 'Productivity' },

  // Reference - Offline (5)
  { id: 'element-quiz', name: 'Element Quiz', description: 'Test knowledge of periodic table elements, symbols, and properties.', href: '/element-quiz', icon: '⚗️', aiPowered: false, color: 'from-green-500 to-teal-500', category: 'Reference' },
  { id: 'literary-terms', name: 'Literary Terms', description: '150+ literary terms glossary with definitions and examples.', href: '/literary-terms', icon: '📜', aiPowered: false, color: 'from-violet-500 to-purple-500', category: 'Reference' },
  { id: 'map-quiz', name: 'Geography Quiz', description: 'Test geography knowledge with countries, capitals, and regions.', href: '/map-quiz', icon: '🌎', aiPowered: false, color: 'from-blue-500 to-green-500', category: 'Reference' },
  { id: 'government', name: 'Government Reference', description: 'US Constitution, amendments, branches, and civic knowledge.', href: '/government', icon: '🏛️', aiPowered: false, color: 'from-red-500 to-blue-500', category: 'Reference' },
  { id: 'constants', name: 'Science Constants', description: 'Quick reference for physics, chemistry, and math constants.', href: '/constants', icon: '🔬', aiPowered: false, color: 'from-cyan-500 to-blue-500', category: 'Reference' },

  // Games & Challenges - Offline (3)
  { id: 'speed-math', name: 'Speed Math', description: 'Timed mental math drills with adaptive difficulty.', href: '/speed-math', icon: '⚡', aiPowered: false, color: 'from-yellow-500 to-orange-500', category: 'Games & Challenges' },
  { id: 'typing', name: 'Typing Test', description: 'Practice typing speed with academic passages and track WPM.', href: '/typing', icon: '⌨️', aiPowered: false, color: 'from-gray-500 to-slate-500', category: 'Games & Challenges' },
  { id: 'streaks', name: 'Study Streaks', description: 'Study streak dashboard with XP, achievements, and badges.', href: '/streaks', icon: '🏆', aiPowered: false, color: 'from-yellow-500 to-amber-500', category: 'Games & Challenges' },

  // College Prep - Offline (3)
  { id: 'resume', name: 'Resume Builder', description: 'Build a student resume with guided sections and export.', href: '/resume', icon: '📄', aiPowered: false, color: 'from-blue-500 to-indigo-500', category: 'College Prep' },
  { id: 'extracurriculars', name: 'Activity Tracker', description: 'Track extracurriculars, hours, roles, and achievements for apps.', href: '/extracurriculars', icon: '🏅', aiPowered: false, color: 'from-green-500 to-emerald-500', category: 'College Prep' },
  { id: 'college-compare', name: 'College Comparison', description: 'Compare colleges side by side on metrics you enter.', href: '/college-compare', icon: '🏫', aiPowered: false, color: 'from-purple-500 to-blue-500', category: 'College Prep' },

  // Accessibility - Offline (6)
  { id: 'tts-reader', name: 'Text-to-Speech', description: 'Read any text aloud with speed, pitch, and voice controls.', href: '/tts-reader', icon: '🔊', aiPowered: false, color: 'from-blue-500 to-cyan-500', category: 'Accessibility' },
  { id: 'color-notes', name: 'Color-Coded Notes', description: 'Take notes with color-coded highlighting by category.', href: '/color-notes', icon: '🎨', aiPowered: false, color: 'from-pink-500 to-purple-500', category: 'Accessibility' },
  { id: 'study-music', name: 'Study Sounds', description: 'Ambient sound generator with white noise, rain, and lo-fi beats.', href: '/study-music', icon: '🎵', aiPowered: false, color: 'from-indigo-500 to-purple-500', category: 'Accessibility' },
  { id: 'dyslexia-reader', name: 'Dyslexia Reader', description: 'Dyslexia-friendly text with adjustable spacing, overlays, and ruler.', href: '/dyslexia-reader', icon: '👓', aiPowered: false, color: 'from-green-500 to-teal-500', category: 'Accessibility' },
  { id: 'lecture-notes', name: 'Lecture Notes', description: 'Timestamped note-taking during lectures with search and export.', href: '/lecture-notes', icon: '🎤', aiPowered: false, color: 'from-amber-500 to-orange-500', category: 'Accessibility' },
  { id: 'vocab-drill', name: 'Vocab Speed Drill', description: 'Speed drill through vocabulary words with timed responses.', href: '/vocab-drill', icon: '⚡', aiPowered: false, color: 'from-lime-500 to-green-500', category: 'Accessibility' },

  // Additional Offline (5)
  { id: 'crossword', name: 'Crossword Maker', description: 'Generate crossword puzzles from your own word lists.', href: '/crossword', icon: '🧩', aiPowered: false, color: 'from-blue-500 to-indigo-500', category: 'Games & Challenges' },
  { id: 'spelling-practice', name: 'Spelling Practice', description: 'Practice spelling with grade-level word banks and audio.', href: '/spelling-practice', icon: '🔤', aiPowered: false, color: 'from-green-500 to-emerald-500', category: 'Games & Challenges' },
  { id: 'trivia-bank', name: 'Trivia Bank', description: 'Quiz yourself on trivia across subjects from a built-in question bank.', href: '/trivia-bank', icon: '🧠', aiPowered: false, color: 'from-purple-500 to-pink-500', category: 'Games & Challenges' },
  { id: 'daily-challenge', name: 'Daily Challenge', description: 'One new quiz challenge every day from a rotating question pool.', href: '/daily-challenge', icon: '📆', aiPowered: false, color: 'from-orange-500 to-red-500', category: 'Games & Challenges' },
  { id: 'conjugation-tables', name: 'Conjugation Tables', description: 'Verb conjugation tables for Spanish, French, and German.', href: '/conjugation-tables', icon: '🗣️', aiPowered: false, color: 'from-teal-500 to-cyan-500', category: 'Languages' },

  // ===== NEW AI FEATURES (50) =====

  // Study Techniques - AI (8)
  { id: 'active-recall', name: 'Active Recall', description: 'AI generates fill-in-blank and free-response questions from your notes.', href: '/active-recall', icon: '🧠', aiPowered: true, color: 'from-purple-500 to-pink-500', category: 'Study Techniques' },
  { id: 'mind-map', name: 'Mind Map Generator', description: 'AI generates a hierarchical mind map from your notes.', href: '/mind-map', icon: '🗺️', aiPowered: true, color: 'from-blue-500 to-purple-500', category: 'Study Techniques' },
  { id: 'mnemonics', name: 'Mnemonic Generator', description: 'AI creates memory tricks, acronyms, and associations for any facts.', href: '/mnemonics', icon: '💡', aiPowered: true, color: 'from-yellow-500 to-orange-500', category: 'Study Techniques' },
  { id: 'study-guide', name: 'Study Guide Builder', description: 'AI compiles a study guide with key terms, summaries, and questions.', href: '/study-guide', icon: '📑', aiPowered: true, color: 'from-green-500 to-teal-500', category: 'Study Techniques' },
  { id: 'feynman', name: 'Feynman Technique', description: 'Explain a concept and AI identifies gaps in your understanding.', href: '/feynman', icon: '🎓', aiPowered: true, color: 'from-indigo-500 to-blue-500', category: 'Study Techniques' },
  { id: 'knowledge-graph', name: 'Knowledge Graph', description: 'AI maps connections between concepts showing how ideas relate.', href: '/knowledge-graph', icon: '🕸️', aiPowered: true, color: 'from-cyan-500 to-blue-500', category: 'Study Techniques' },
  { id: 'eli5', name: 'ELI5 Explainer', description: 'AI explains any topic at 5 levels from age 5 to expert.', href: '/eli5', icon: '👶', aiPowered: true, color: 'from-emerald-500 to-green-500', category: 'Study Techniques' },
  { id: 'retrieval-quiz', name: 'Retrieval Quiz', description: 'AI generates open-ended recall questions — no multiple choice.', href: '/retrieval-quiz', icon: '📝', aiPowered: true, color: 'from-rose-500 to-red-500', category: 'Study Techniques' },

  // Writing & Language - AI (10)
  { id: 'thesis', name: 'Thesis Generator', description: 'AI crafts 3 strong thesis statement options with analysis.', href: '/thesis', icon: '📌', aiPowered: true, color: 'from-violet-500 to-purple-500', category: 'Writing & Language' },
  { id: 'paraphrase', name: 'Paraphrase Tool', description: 'AI rewrites text in simpler, formal, concise, or academic styles.', href: '/paraphrase', icon: '🔄', aiPowered: true, color: 'from-blue-500 to-cyan-500', category: 'Writing & Language' },
  { id: 'grammar', name: 'Grammar Checker', description: 'AI identifies grammar errors with corrections and rule explanations.', href: '/grammar', icon: '✏️', aiPowered: true, color: 'from-green-500 to-emerald-500', category: 'Writing & Language' },
  { id: 'rhetoric', name: 'Rhetorical Analysis', description: 'AI analyzes text for rhetorical devices, tone, and persuasion.', href: '/rhetoric', icon: '🎭', aiPowered: true, color: 'from-amber-500 to-orange-500', category: 'Writing & Language' },
  { id: 'poetry', name: 'Poetry Analyzer', description: 'AI analyzes poems for meter, rhyme, devices, and themes.', href: '/poetry', icon: '🎶', aiPowered: true, color: 'from-pink-500 to-rose-500', category: 'Writing & Language' },
  { id: 'debate', name: 'Debate Prep', description: 'AI generates arguments and counterarguments for both sides.', href: '/debate', icon: '⚔️', aiPowered: true, color: 'from-red-500 to-orange-500', category: 'Writing & Language' },
  { id: 'story-starter', name: 'Story Starter', description: 'AI generates creative writing prompts with character and setting.', href: '/story-starter', icon: '✨', aiPowered: true, color: 'from-purple-500 to-pink-500', category: 'Writing & Language' },
  { id: 'annotate', name: 'Annotation Helper', description: 'AI generates passage annotations and discussion questions.', href: '/annotate', icon: '📝', aiPowered: true, color: 'from-indigo-500 to-violet-500', category: 'Writing & Language' },
  { id: 'essay-scorer', name: 'Essay Scorer', description: 'AI scores essays on a 6-trait rubric with detailed feedback.', href: '/essay-scorer', icon: '📊', aiPowered: true, color: 'from-teal-500 to-green-500', category: 'Writing & Language' },
  { id: 'book-report', name: 'Book Report Helper', description: 'AI helps structure book reports with guided prompts.', href: '/book-report', icon: '📖', aiPowered: true, color: 'from-amber-500 to-yellow-500', category: 'Writing & Language' },

  // Math & Science - AI (6)
  { id: 'lab-report', name: 'Lab Report Writer', description: 'AI helps write lab reports with hypothesis, methods, and conclusion.', href: '/lab-report', icon: '🧪', aiPowered: true, color: 'from-green-500 to-teal-500', category: 'Math & Science' },
  { id: 'balance', name: 'Equation Balancer', description: 'AI balances chemical equations with step-by-step explanations.', href: '/balance', icon: '⚖️', aiPowered: true, color: 'from-blue-500 to-indigo-500', category: 'Math & Science' },
  { id: 'physics', name: 'Physics Solver', description: 'AI solves physics problems with formulas and step-by-step work.', href: '/physics', icon: '🔭', aiPowered: true, color: 'from-cyan-500 to-blue-500', category: 'Math & Science' },
  { id: 'calculus', name: 'Calculus Helper', description: 'AI shows step-by-step derivatives and integrals with rules.', href: '/calculus', icon: '∫', aiPowered: true, color: 'from-purple-500 to-indigo-500', category: 'Math & Science' },
  { id: 'stoichiometry', name: 'Stoichiometry Solver', description: 'AI solves mole conversions, limiting reagent, and percent yield.', href: '/stoichiometry', icon: '⚗️', aiPowered: true, color: 'from-emerald-500 to-green-500', category: 'Math & Science' },
  { id: 'geometry-viz', name: 'Geometry Helper', description: 'AI explains geometry proofs with step-by-step reasoning.', href: '/geometry-viz', icon: '📐', aiPowered: true, color: 'from-orange-500 to-amber-500', category: 'Math & Science' },

  // Test Prep - AI (6)
  { id: 'sat-prep', name: 'SAT/ACT Prep', description: 'AI generates SAT/ACT-style questions by section with explanations.', href: '/sat-prep', icon: '📝', aiPowered: true, color: 'from-blue-600 to-indigo-600', category: 'Test Prep' },
  { id: 'ap-review', name: 'AP Exam Review', description: 'AI generates AP exam-style questions for any AP subject.', href: '/ap-review', icon: '🎓', aiPowered: true, color: 'from-green-600 to-teal-600', category: 'Test Prep' },
  { id: 'timed-practice', name: 'Timed Test Sim', description: 'AI creates timed test simulations with custom question counts.', href: '/timed-practice', icon: '⏱️', aiPowered: true, color: 'from-red-500 to-rose-500', category: 'Test Prep' },
  { id: 'weak-topics', name: 'Weak Topic Finder', description: 'AI analyzes your quiz history to identify weak areas.', href: '/weak-topics', icon: '🔍', aiPowered: true, color: 'from-amber-500 to-orange-500', category: 'Test Prep' },
  { id: 'question-predictor', name: 'Question Predictor', description: 'AI predicts likely exam questions from your study material.', href: '/question-predictor', icon: '🔮', aiPowered: true, color: 'from-purple-500 to-violet-500', category: 'Test Prep' },
  { id: 'eliminator', name: 'Answer Eliminator', description: 'AI teaches strategic answer elimination on multiple choice.', href: '/eliminator', icon: '🚫', aiPowered: true, color: 'from-gray-500 to-slate-500', category: 'Test Prep' },

  // Critical Thinking - AI (8)
  { id: 'source-eval', name: 'Source Evaluator', description: 'AI evaluates source credibility using the CRAAP test.', href: '/source-eval', icon: '🔍', aiPowered: true, color: 'from-blue-500 to-cyan-500', category: 'Critical Thinking' },
  { id: 'compare', name: 'Compare & Contrast', description: 'AI generates comparison tables and Venn diagrams for topics.', href: '/compare', icon: '⚖️', aiPowered: true, color: 'from-purple-500 to-blue-500', category: 'Critical Thinking' },
  { id: 'fallacies', name: 'Fallacy Detector', description: 'AI identifies logical fallacies in arguments with explanations.', href: '/fallacies', icon: '⚠️', aiPowered: true, color: 'from-red-500 to-orange-500', category: 'Critical Thinking' },
  { id: 'primary-source', name: 'Source Analyzer', description: 'AI analyzes primary sources for context, perspective, and bias.', href: '/primary-source', icon: '📜', aiPowered: true, color: 'from-amber-500 to-yellow-500', category: 'Critical Thinking' },
  { id: 'argument', name: 'Argument Builder', description: 'AI helps construct arguments using the Toulmin model.', href: '/argument', icon: '🏗️', aiPowered: true, color: 'from-indigo-500 to-violet-500', category: 'Critical Thinking' },
  { id: 'data-interpreter', name: 'Data Interpreter', description: 'AI interprets data tables and CSV to find trends and patterns.', href: '/data-interpreter', icon: '📊', aiPowered: true, color: 'from-green-500 to-teal-500', category: 'Critical Thinking' },
  { id: 'bias', name: 'Bias Analyzer', description: 'AI analyzes text for political, cultural, and other biases.', href: '/bias', icon: '🎯', aiPowered: true, color: 'from-pink-500 to-rose-500', category: 'Critical Thinking' },
  { id: 'cause-effect', name: 'Cause & Effect', description: 'AI maps cause-and-effect chains for events and processes.', href: '/cause-effect', icon: '🔗', aiPowered: true, color: 'from-cyan-500 to-blue-500', category: 'Critical Thinking' },

  // Languages - AI (5)
  { id: 'conjugation', name: 'Conjugation Drills', description: 'AI verb conjugation drills for Spanish, French, and more.', href: '/conjugation', icon: '🗣️', aiPowered: true, color: 'from-orange-500 to-red-500', category: 'Languages' },
  { id: 'diagram', name: 'Sentence Diagram', description: 'AI breaks sentences into grammatical components visually.', href: '/diagram', icon: '🌳', aiPowered: true, color: 'from-green-500 to-emerald-500', category: 'Languages' },
  { id: 'immersion', name: 'Immersion Reader', description: 'AI converts text to a target language with inline translations.', href: '/immersion', icon: '🌐', aiPowered: true, color: 'from-blue-500 to-indigo-500', category: 'Languages' },
  { id: 'idioms', name: 'Idiom Explainer', description: 'AI explains idioms with meaning, origin, and usage examples.', href: '/idioms', icon: '💬', aiPowered: true, color: 'from-purple-500 to-pink-500', category: 'Languages' },
  { id: 'pronunciation', name: 'Pronunciation Guide', description: 'AI provides phonetic transcriptions and pronunciation tips.', href: '/pronunciation', icon: '🔈', aiPowered: true, color: 'from-teal-500 to-cyan-500', category: 'Languages' },

  // Games & Challenges - AI (5)
  { id: 'trivia', name: 'AI Trivia', description: 'AI trivia questions across subjects with difficulty progression.', href: '/trivia', icon: '🏆', aiPowered: true, color: 'from-yellow-500 to-amber-500', category: 'Games & Challenges' },
  { id: 'spelling', name: 'AI Spelling Bee', description: 'AI spelling challenges at your grade level with hints.', href: '/spelling', icon: '🐝', aiPowered: true, color: 'from-amber-500 to-yellow-500', category: 'Games & Challenges' },
  { id: 'crossword-ai', name: 'AI Crossword', description: 'AI generates crossword puzzles from vocabulary topics.', href: '/crossword-ai', icon: '🧩', aiPowered: true, color: 'from-blue-500 to-purple-500', category: 'Games & Challenges' },
  { id: 'knowledge-race', name: 'Knowledge Race', description: 'AI rapid-fire quiz — how far before 3 wrong answers?', href: '/knowledge-race', icon: '🏎️', aiPowered: true, color: 'from-red-500 to-orange-500', category: 'Games & Challenges' },
  { id: 'daily-ai-challenge', name: 'AI Daily Challenge', description: 'AI generates a new multi-subject challenge every day.', href: '/daily-ai-challenge', icon: '🌟', aiPowered: true, color: 'from-purple-500 to-indigo-500', category: 'Games & Challenges' },

  // College Prep - AI (2)
  { id: 'college-essay', name: 'College Essay Help', description: 'AI brainstorms and structures college application essays.', href: '/college-essay', icon: '🎓', aiPowered: true, color: 'from-blue-600 to-purple-600', category: 'College Prep' },
  { id: 'interview-prep', name: 'Interview Prep', description: 'AI generates interview questions with STAR method frameworks.', href: '/interview-prep', icon: '🤝', aiPowered: true, color: 'from-green-500 to-teal-500', category: 'College Prep' },

  // Reference - AI (3)
  { id: 'timeline', name: 'Timeline Generator', description: 'AI generates visual timelines for any historical period.', href: '/timeline', icon: '📅', aiPowered: true, color: 'from-indigo-500 to-blue-500', category: 'Reference' },
  { id: 'historical-figures', name: 'Historical Figures', description: 'AI provides biographical summaries of any historical figure.', href: '/historical-figures', icon: '👤', aiPowered: true, color: 'from-amber-500 to-orange-500', category: 'Reference' },
  { id: 'etymology', name: 'Etymology Explorer', description: 'AI traces the origin and history of any word.', href: '/etymology', icon: '🔎', aiPowered: true, color: 'from-teal-500 to-green-500', category: 'Reference' },
];

export const GRADE_POINTS: Record<string, number> = {
  'A+': 4.0, 'A': 4.0, 'A-': 3.7,
  'B+': 3.3, 'B': 3.0, 'B-': 2.7,
  'C+': 2.3, 'C': 2.0, 'C-': 1.7,
  'D+': 1.3, 'D': 1.0, 'D-': 0.7,
  'F': 0.0,
};

export const MAX_INPUT_LENGTH = 10000;
