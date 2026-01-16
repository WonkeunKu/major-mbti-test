// ======================
// 1) 질문(12개) + 축 점수
// - A/B 중 하나를 선택하면 해당 축 점수에 +1
// - 3문항 중 과반(2개 이상)이 그 축의 글자
// ======================
const QUESTIONS = [
  // 1-3: E / I
  {
    text: "Q1. 조별과제가 주어졌을 때 나는?",
    a: { text: "역할 나누고 바로 같이 시작한다", axis: "EI", pick: "E" },
    b: { text: "혼자 정리한 뒤 필요한 부분만 공유한다", axis: "EI", pick: "I" },
  },
  {
    text: "Q2. 수업 중 더 집중 잘 되는 상황은?",
    a: { text: "토론·발표가 있는 수업", axis: "EI", pick: "E" },
    b: { text: "조용히 듣고 필기하는 수업", axis: "EI", pick: "I" },
  },
  {
    text: "Q3. 대학 생활을 떠올리면 더 기대되는 건?",
    a: { text: "사람 많이 만나고 네트워킹", axis: "EI", pick: "E" },
    b: { text: "혼자 깊이 파는 전공 공부", axis: "EI", pick: "I" },
  },

  // 4-6: S / N
  {
    text: "Q4. 과제를 할 때 더 먼저 보는 건?",
    a: { text: "예시, 기준, 이전 답안", axis: "SN", pick: "S" },
    b: { text: "새롭게 해볼 수 있는 아이디어", axis: "SN", pick: "N" },
  },
  {
    text: "Q5. 진로를 고를 때 더 중요한 건?",
    a: { text: "취업률, 안정성, 현실성", axis: "SN", pick: "S" },
    b: { text: "내가 좋아하고 성장할 가능성", axis: "SN", pick: "N" },
  },
  {
    text: "Q6. 문제를 보면 나는 보통?",
    a: { text: "주어진 조건 안에서 해결", axis: "SN", pick: "S" },
    b: { text: "“이걸 다르게 하면?”부터 떠올림", axis: "SN", pick: "N" },
  },

  // 7-9: T / F
  {
    text: "Q7. 토론에서 나는 주로?",
    a: { text: "근거·논리로 설득한다", axis: "TF", pick: "T" },
    b: { text: "상대 입장과 맥락을 고려한다", axis: "TF", pick: "F" },
  },
  {
    text: "Q8. 친구가 고민 상담을 할 때?",
    a: { text: "해결 방법부터 정리해준다", axis: "TF", pick: "T" },
    b: { text: "공감하며 들어주는 게 먼저다", axis: "TF", pick: "F" },
  },
  {
    text: "Q9. 과제 평가에서 더 중요한 건?",
    a: { text: "결과의 정확성과 완성도", axis: "TF", pick: "T" },
    b: { text: "주제의 의미와 전달력", axis: "TF", pick: "F" },
  },

  // 10-12: J / P
  {
    text: "Q10. 시험 기간 내 스타일은?",
    a: { text: "계획표 세워서 그대로 진행", axis: "JP", pick: "J" },
    b: { text: "그날 컨디션에 따라 조정", axis: "JP", pick: "P" },
  },
  {
    text: "Q11. 새로운 걸 배울 때 나는?",
    a: { text: "순서대로 체계적으로", axis: "JP", pick: "J" },
    b: { text: "흥미 가는 것부터 찍먹", axis: "JP", pick: "P" },
  },
  {
    text: "Q12. 미래 계획을 세울 때?",
    a: { text: "어느 정도 확정되어 있으면 좋다", axis: "JP", pick: "J" },
    b: { text: "열어두고 경험하며 정하고 싶다", axis: "JP", pick: "P" },
  },
];

// ======================
// 2) 결과(16타입) 문구 + 추천학과
// (이전 대화에서 만든 매핑을 그대로 사용)
// ======================
const RESULTS = {
  ESTJ: {
    major: "경영학",
    oneLiner: "현실 감각과 실행력이 강한 리더형",
    desc: "정해진 목표를 향해 계획을 세우고, 사람들을 이끄는 데 강점이 있어요. 효율과 결과를 중요하게 생각하고, 조직 안에서 중심 역할을 맡는 타입입니다.",
    why: "조직 운영, 전략, 의사결정을 배우며 리더로 성장하기 좋아요.",
  },
  ISTJ: {
    major: "회계학",
    oneLiner: "꼼꼼함과 책임감이 강한 안정형",
    desc: "정해진 기준과 규칙을 잘 지키고, 실수를 줄이는 데 강점이 있어요. 묵묵히 맡은 일을 끝까지 해내는 신뢰형 인재입니다.",
    why: "숫자와 기준을 다루며 정확성과 전문성을 키울 수 있어요.",
  },
  ENTJ: {
    major: "산업공학",
    oneLiner: "큰 그림을 그리고 구조를 설계하는 전략가",
    desc: "문제의 원인을 구조적으로 파악하고, 더 나은 시스템을 만드는 데 흥미가 있어요. 리더십과 분석력을 동시에 갖춘 타입입니다.",
    why: "현실 문제를 효율적인 시스템으로 바꾸는 학문과 잘 맞아요.",
  },
  INTJ: {
    major: "컴퓨터공학",
    oneLiner: "혼자 깊게 파고드는 설계형 사고",
    desc: "복잡한 문제를 논리적으로 정리하고, 구조를 만드는 데 강점이 있어요. 조용하지만 생각은 깊고 치밀한 타입입니다.",
    why: "코드와 알고리즘으로 세상을 설계하는 감각을 키우기 좋아요.",
  },
  ESTP: {
    major: "기계공학",
    oneLiner: "직접 움직이며 해결하는 실행형",
    desc: "생각만 하기보다는 직접 해보며 배우는 걸 좋아해요. 현장 감각과 문제 해결력이 뛰어난 타입입니다.",
    why: "실제 구조물과 시스템을 다루며 원리를 몸으로 이해하기 좋아요.",
  },
  ISTP: {
    major: "전기전자공학",
    oneLiner: "기술로 문제를 해결하는 분석형",
    desc: "기계나 기기의 원리를 이해하고 고치는 데 흥미가 있어요. 말보다는 결과로 보여주는 스타일입니다.",
    why: "전기·회로·반도체 등 핵심 기술을 다루는 전공과 잘 맞아요.",
  },
  ENTP: {
    major: "미디어·콘텐츠학",
    oneLiner: "아이디어를 연결하는 기획형",
    desc: "새로운 아이디어가 끊임없이 떠오르고, 여러 분야를 연결하는 걸 좋아해요. 틀에 박힌 것보다는 실험과 도전을 즐깁니다.",
    why: "콘텐츠 기획·미디어 트렌드·스토리 설계와 궁합이 좋아요.",
  },
  INTP: {
    major: "수학과",
    oneLiner: "이론과 원리를 파고드는 탐구형",
    desc: "‘왜?’라는 질문을 자주 하고, 논리적으로 사고하는 데 강점이 있어요. 혼자 깊이 생각하는 시간을 중요하게 여깁니다.",
    why: "기초 사고력을 탄탄히 쌓고 싶은 타입에게 잘 맞아요.",
  },
  ESFJ: {
    major: "간호학",
    oneLiner: "사람을 돌보는 책임형",
    desc: "주변 사람을 잘 챙기고, 팀 안에서 조율 역할을 잘해요. 누군가에게 도움이 되는 일에서 보람을 느낍니다.",
    why: "사람의 생명과 건강을 직접 다루는 전공과 잘 맞아요.",
  },
  ISFJ: {
    major: "보건행정",
    oneLiner: "묵묵히 시스템을 지키는 안정형",
    desc: "눈에 띄진 않지만 꼭 필요한 역할을 성실히 수행해요. 정리·관리·지원에 강점이 있습니다.",
    why: "의료/보건 시스템 운영·관리 역할과 잘 맞아요.",
  },
  ENFJ: {
    major: "교육학",
    oneLiner: "사람의 성장을 이끄는 리더형",
    desc: "설명하고 도와주는 걸 좋아하고, 사람의 변화를 잘 이끌어요. 말과 소통에 강점이 있는 타입입니다.",
    why: "가르침과 학습의 구조를 배우는 전공과 잘 맞아요.",
  },
  INFJ: {
    major: "심리학",
    oneLiner: "사람의 마음을 깊이 이해하는 통찰형",
    desc: "겉으로 보이는 행동보다 그 이면의 이유를 궁금해해요. 의미와 가치를 중요하게 생각합니다.",
    why: "사람의 행동과 마음을 과학적으로 탐구하기 좋아요.",
  },
  ESFP: {
    major: "연극영화과",
    oneLiner: "표현과 에너지가 넘치는 무대형",
    desc: "사람들 앞에서 표현하고, 경험을 통해 배우는 걸 좋아해요. 분위기를 밝게 만드는 에너지가 있습니다.",
    why: "연기·연출·표현력을 전문적으로 다루는 전공과 잘 맞아요.",
  },
  ISFP: {
    major: "디자인학",
    oneLiner: "감각과 취향이 분명한 창작형",
    desc: "조용하지만 자신만의 감각이 뚜렷해요. 결과물로 자신을 표현하는 타입입니다.",
    why: "시각/제품/브랜드를 직접 만들어보는 전공과 잘 맞아요.",
  },
  ENFP: {
    major: "광고홍보학",
    oneLiner: "스토리로 사람을 움직이는 확장형",
    desc: "아이디어와 감정 표현이 풍부하고, 사람의 반응에 민감해요. 새로운 시도와 변화에 열려 있습니다.",
    why: "메시지로 사람을 설득하는 법을 배우기 좋아요.",
  },
  INFP: {
    major: "국어국문학",
    oneLiner: "가치와 언어를 다루는 표현형",
    desc: "말과 글에 의미를 담는 걸 중요하게 생각해요. 조용하지만 내면은 깊은 타입입니다.",
    why: "언어와 문학을 통해 생각을 표현하는 전공과 잘 맞아요.",
  },
};

// 타입이 없는 경우 대비(이론상 없음)
const FALLBACK = {
  major: "자유전공/융합",
  oneLiner: "탐색 중인 융합형",
  desc: "아직 하나로 딱 고정되기보단, 다양한 경험을 하며 방향을 찾는 게 잘 맞는 타입이에요.",
  why: "폭넓게 체험하고 나에게 맞는 트랙을 찾는 방식이 좋아요.",
};

// ======================
// 3) UI 상태관리
// ======================
const el = {
  intro: document.getElementById("intro"),
  quiz: document.getElementById("quiz"),
  result: document.getElementById("result"),
  startBtn: document.getElementById("startBtn"),
  backBtn: document.getElementById("backBtn"),
  resetBtn: document.getElementById("resetBtn"),
  restartBtn: document.getElementById("restartBtn"),
  copyBtn: document.getElementById("copyBtn"),

  qIndex: document.getElementById("qIndex"),
  qTotal: document.getElementById("qTotal"),
  progressFill: document.getElementById("progressFill"),
  questionTitle: document.getElementById("questionTitle"),
  choiceA: document.getElementById("choiceA"),
  choiceB: document.getElementById("choiceB"),

  resultType: document.getElementById("resultType"),
  resultOneLiner: document.getElementById("resultOneLiner"),
  resultDesc: document.getElementById("resultDesc"),
  resultMajor: document.getElementById("resultMajor"),
  resultWhy: document.getElementById("resultWhy"),
  ctaLink: document.getElementById("ctaLink"),
};

el.qTotal.textContent = String(QUESTIONS.length);

let current = 0;
// answers[i] = "A" | "B"
let answers = new Array(QUESTIONS.length).fill(null);

// 점수 집계 (각 축에서 E/I, S/N, T/F, J/P 각각 몇 번 골랐는지)
function computeType() {
  const counts = {
    EI: { E: 0, I: 0 },
    SN: { S: 0, N: 0 },
    TF: { T: 0, F: 0 },
    JP: { J: 0, P: 0 },
  };

  for (let i = 0; i < QUESTIONS.length; i++) {
    const ans = answers[i];
    if (!ans) continue;
    const q = QUESTIONS[i];
    const pick = ans === "A" ? q.a : q.b;
    counts[pick.axis][pick.pick] += 1;
  }

  // 과반 로직(3문항이므로 2 이상인 쪽)
  const E = counts.EI.E >= 2 ? "E" : "I";
  const N = counts.SN.N >= 2 ? "N" : "S";
  const T = counts.TF.T >= 2 ? "T" : "F";
  const J = counts.JP.J >= 2 ? "J" : "P";

  return E + N + T + J;
}

function show(section) {
  el.intro.classList.add("hidden");
  el.quiz.classList.add("hidden");
  el.result.classList.add("hidden");
  section.classList.remove("hidden");
}

function renderQuestion() {
  const q = QUESTIONS[current];
  el.qIndex.textContent = String(current + 1);
  el.questionTitle.textContent = q.text;

  el.choiceA.textContent = "A. " + q.a.text;
  el.choiceB.textContent = "B. " + q.b.text;

  // 진행바
  const pct = ((current) / (QUESTIONS.length)) * 100;
  el.progressFill.style.width = `${pct}%`;

  // 이전 버튼 활성화
  el.backBtn.disabled = current === 0;
  el.backBtn.style.opacity = current === 0 ? "0.5" : "1";

  // 선택 표시(선택했다면)
  const ans = answers[current];
  markSelected(ans);
}

function markSelected(ans) {
  // 간단한 선택 표시(배경 바꾸기)
  const base = "rgba(27,42,85,.55)";
  const sel = "rgba(98,138,255,.25)";
  el.choiceA.style.background = ans === "A" ? sel : base;
  el.choiceB.style.background = ans === "B" ? sel : base;
}

function answerAndNext(which) {
  answers[current] = which;
  markSelected(which);

  // 마지막 질문이면 결과로
  if (current === QUESTIONS.length - 1) {
    finish();
    return;
  }
  current += 1;
  renderQuestion();
}

function finish() {
  // 진행바 100%
  el.progressFill.style.width = `100%`;

  const type = computeType();
  const data = RESULTS[type] || FALLBACK;

  // URL에 타입 넣어서 공유 가능하게
  const url = new URL(window.location.href);
  url.searchParams.set("type", type);
  window.history.replaceState({}, "", url.toString());

  el.resultType.textContent = type;
  el.resultOneLiner.textContent = data.oneLiner;
  el.resultDesc.textContent = data.desc;
  el.resultMajor.textContent = data.major;
  el.resultWhy.textContent = data.why;

  // CTA 링크: 너의 구글폼/랜딩 링크로 바꿔!
  // 예) el.ctaLink.href = "https://docs.google.com/forms/....";
  el.ctaLink.href = "https://example.com";

  show(el.result);
}

function resetAll() {
  current = 0;
  answers = new Array(QUESTIONS.length).fill(null);

  const url = new URL(window.location.href);
  url.searchParams.delete("type");
  window.history.replaceState({}, "", url.toString());

  show(el.intro);
}

function startQuiz() {
  show(el.quiz);
  renderQuestion();
}

// 결과 링크 복사
async function copyResultLink() {
  try {
    await navigator.clipboard.writeText(window.location.href);
    el.copyBtn.textContent = "복사됨!";
    setTimeout(() => (el.copyBtn.textContent = "결과 링크 복사"), 1200);
  } catch (e) {
    alert("복사에 실패했어요. 주소창 링크를 직접 복사해주세요.");
  }
}

// URL에 type=XXXX 있으면 바로 결과 보여주기(공유용)
function tryLoadFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const type = params.get("type");
  if (!type) return;

  const data = RESULTS[type] || FALLBACK;
  el.resultType.textContent = type;
  el.resultOneLiner.textContent = data.oneLiner;
  el.resultDesc.textContent = data.desc;
  el.resultMajor.textContent = data.major;
  el.resultWhy.textContent = data.why;
  el.ctaLink.href = "https://example.com";
  show(el.result);
}

// 이벤트 연결
el.startBtn.addEventListener("click", startQuiz);
el.choiceA.addEventListener("click", () => answerAndNext("A"));
el.choiceB.addEventListener("click", () => answerAndNext("B"));

el.backBtn.addEventListener("click", () => {
  if (current === 0) return;
  current -= 1;
  renderQuestion();
});

el.resetBtn.addEventListener("click", resetAll);
el.restartBtn.addEventListener("click", resetAll);
el.copyBtn.addEventListener("click", copyResultLink);

// 최초 실행
tryLoadFromUrl();
