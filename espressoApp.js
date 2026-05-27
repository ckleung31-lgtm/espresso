// ========================================
// Green Door Espresso
// espressoApp.js
// ========================================

// DOM 元素
const coffeeSelect = document.getElementById("coffeeSelect");
const philosophySelect = document.getElementById("philosophySelect");
const resultContainer = document.getElementById("result");

// 輔助函數
function findCoffee(id) {
  return COFFEES.find(c => c.id === id);
}

function getPhilosophy(id) {
  return ESPRESSO_PHILOSOPHIES[id];
}

// 更新哲學下拉選單
function updatePhilosophySelect(coffee) {
  philosophySelect.innerHTML = "";
  if (!coffee || !coffee.supportedPhilos) return;

  coffee.supportedPhilos.forEach(philoId => {
    const philo = getPhilosophy(philoId);
    if (philo) {
      const option = document.createElement("option");
      option.value = philoId;
      option.textContent = philo.title;
      philosophySelect.appendChild(option);
    }
  });
}

// 渲染結果
function renderRecipe() {
  const coffeeId = coffeeSelect.value;
  const philoId = philosophySelect.value;

  const coffee = findCoffee(coffeeId);
  const philosophy = getPhilosophy(philoId);

  if (!coffee || !philosophy) {
    resultContainer.innerHTML = `<div class="result-section"><div class="analysis-highlight">請選擇咖啡豆和沖煮哲學</div></div>`;
    return;
  }

  // 計算調整改良
  const fastDose = getFastDose(philosophy.dose);
  const slowDose = getSlowDose(philosophy.dose);

  // 生成 tags HTML
  const tagsHTML = coffee.notes.map(n => `<div class="tag">${n}</div>`).join("");

  const html = `
    <div class="result-section">
      <div class="coffee-name">${coffee.shortName}</div>
      <div class="coffee-meta">${coffee.origin} · ${coffee.process} · ${coffee.roast}</div>
      <div class="tag-list">${tagsHTML}</div>
    </div>

    <div class="result-section">
      <div class="section-title">沖煮哲學 · Espresso Philosophy</div>
      <div class="analysis-highlight">${philosophy.title}</div>
      <div class="analysis"><p>${philosophy.philosophy}</p></div>
    </div>

    <div class="result-section">
      <div class="section-title">萃取參數 · Extraction Parameters</div>
      <div class="recipe-grid">
        <div class="recipe-item"><h3>粉量 · Dose</h3><p>${philosophy.dose}g</p></div>
        <div class="recipe-item"><h3>液量 · Yield</h3><p>${philosophy.yield}g</p></div>
        <div class="recipe-item"><h3>粉液比 · Ratio</h3><p>${philosophy.ratio}</p></div>
        <div class="recipe-item"><h3>時間 · Shot Time</h3><p>${philosophy.shotTime}</p></div>
        <div class="recipe-item"><h3>壓力 · Pressure</h3><p>${philosophy.pressure}</p></div>
        <div class="recipe-item"><h3>口感 · Body</h3><p>${philosophy.body}</p></div>
        <div class="recipe-item"><h3>酸質 · Acidity</h3><p>${philosophy.acidity}</p></div>
        <div class="recipe-item"><h3>尾韻 · Finish</h3><p>${philosophy.finish}</p></div>
      </div>
    </div>

    <div class="result-section">
      <div class="section-title">沖煮效果 · Extraction Behaviour</div>
      <div class="analysis-highlight">${philosophy.notes}</div>
    </div>

    <div class="result-section">
      <div class="section-title">調整建議 · Dial-In Guidance</div>

      <div class="pour-step">
        <div class="pour-title">Shot 過快 · Fast Shot</div>
        <div class="pour-detail">
          如果流速過快（少於建議時間下限），可嘗試：<br>
          粉量 ${philosophy.dose}g → ${fastDose}g<br>
          或調細研磨。
        </div>
      </div>

      <div class="pour-step">
        <div class="pour-title">Shot 過慢 · Slow Shot</div>
        <div class="pour-detail">
          如果流速過慢（超過建議時間上限），可嘗試：<br>
          粉量 ${philosophy.dose}g → ${slowDose}g<br>
          或調粗研磨。
        </div>
      </div>
    </div>
  `;

  resultContainer.innerHTML = html;
}

// 更新咖啡豆列表
function populateCoffeeSelect() {
  coffeeSelect.innerHTML = "";
  COFFEES.forEach(coffee => {
    const option = document.createElement("option");
    option.value = coffee.id;
    option.textContent = coffee.shortName;
    coffeeSelect.appendChild(option);
  });
}

// 事件監聽
coffeeSelect.addEventListener("change", () => {
  const coffee = findCoffee(coffeeSelect.value);
  updatePhilosophySelect(coffee);
  renderRecipe();
});

philosophySelect.addEventListener("change", () => {
  renderRecipe();
});

// 初始化
function init() {
  populateCoffeeSelect();
  const firstCoffee = COFFEES[0];
  if (firstCoffee) {
    updatePhilosophySelect(firstCoffee);
    coffeeSelect.value = firstCoffee.id;
    renderRecipe();
  }
}

init();