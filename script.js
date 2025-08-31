// Quiz data (editable)
const QUIZZES = {
  1: [
    { q: "How do you say 'مرحبا' in English?", a: "hello" },
    { q: "Choose the greeting used in the morning:", a: "good morning" }
  ],
  2: [
    { q: "Complete: I ___ a book.", a: "have" },
    { q: "Translate: 'أنا ذاهب' ->", a: "i am going" }
  ]
};

let currentQuiz = null;

function openQuiz(n){
  currentQuiz = n;
  const qa = document.getElementById('quiz-area');
  const ls = document.getElementById('quiz-content');
  const title = document.getElementById('quiz-title');
  if(!qa || !ls || !title){
    alert('Quiz area not found on this page.');
    return;
  }
  qa.style.display = '';
  title.textContent = 'Quiz — Lesson ' + n;
  ls.innerHTML = '';
  QUIZZES[n].forEach((item, idx) => {
    ls.innerHTML += `
      <div class="q">
        <label>${item.q}</label><br>
        <input id="ans${idx}" type="text" placeholder="Type your answer here">
      </div>
    `;
  });
  const score = document.getElementById('score');
  if(score) score.textContent = '';
}

function norm(s){
  return (s||'')
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[!?.]/g,'');
}

function submitQuiz(){
  if(currentQuiz==null) return;
  const items = QUIZZES[currentQuiz];
  let correct = 0;
  items.forEach((it, idx) => {
    const val = norm(document.getElementById('ans'+idx).value);
    if(val === norm(it.a)) correct++;
  });
  const pct = Math.round(100 * correct / items.length);
  const scoreEl = document.getElementById('score');
  if(scoreEl) scoreEl.textContent = `Score: ${correct}/${items.length} (${pct}%)`;

  // Save progress locally
  const key = 'f15en_scores';
  const prev = JSON.parse(localStorage.getItem(key) || '[]');
  prev.push({ lesson: currentQuiz, correct, total: items.length, date: new Date().toISOString() });
  localStorage.setItem(key, JSON.stringify(prev));
}

function closeQuiz(){
  const qa = document.getElementById('quiz-area');
  if(qa) qa.style.display = 'none';
  currentQuiz = null;
}
function playSound(word) {
    var audio = new Audio('sounds/' + word + '.mp3');
    audio.play();
}
const lessons = [
    { word: "Hello", translation: "مرحبا", audio: "hello.mp3" },
    { word: "Apple", translation: "تفاحة", audio: "apple.mp3" },
    // أضيفي باقي الكلمات هنا
];

let currentLesson = 0;

function showLesson(index) {
    const lesson = lessons[index];
    document.getElementById("word").innerText = lesson.word;
    document.getElementById("translation").innerText = lesson.translation;
    document.getElementById("soundBtn").setAttribute("onclick", `playSound('${lesson.audio}')`);
}

