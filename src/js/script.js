// ========================
// Validação de e-mail (extra, caso queira usar futuramente)
// ========================
function isValidEmail(email) {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailPattern.test(email);
}

// ========================
// Criar um node visual de etapa
// ========================
function criarNode(texto) {
  const node = document.createElement("div");
  node.classList.add("node-box");
  node.textContent = texto;
  return node;
}

// ========================
// Gerar Roadmap com estrutura automática (com base em palavras-chave)
// ========================
function gerarRoadmapEstruturado() {
  const input = document.getElementById("roadmapInput").value.trim();
  const area = document.getElementById("roadmapArea");
  area.innerHTML = "";

  if (!input) return alert("Digite uma ideia para gerar o roadmap!");

  const estruturas = {
    "front-end": ["HTML", "CSS", "JavaScript", "React", "Projeto prático"],
    "marketing": ["Pesquisa de mercado", "SEO", "Google Ads", "Conteúdo", "Análise de métricas"],
    "empreendedorismo": ["Ideação", "Validação", "MVP", "Lançamento", "Crescimento"]
  };

  const chave = Object.keys(estruturas).find(key => input.toLowerCase().includes(key));
  const etapas = chave ? estruturas[chave] : input.split(";").map(etapa => etapa.trim()).filter(e => e);

  if (!etapas.length) return alert("Nenhuma etapa válida foi detectada.");

  etapas.forEach(etapa => area.appendChild(criarNode(etapa)));

  const nome = prompt("Digite um nome para salvar seu roadmap:");
  if (nome) salvarRoadmap(nome, etapas);
}

// ========================
// Adicionar etapa manualmente
// ========================
function adicionarEtapaManual() {
  const input = document.getElementById("manualStep");
  const texto = input.value.trim();
  const area = document.getElementById("manualRoadmapArea");

  if (!texto) return alert("Digite uma etapa antes de adicionar!");

  area.appendChild(criarNode(texto));
  input.value = "";
  input.focus();
}

// ========================
// Salvar Roadmap no localStorage
// ========================
function salvarRoadmap(nome, etapas) {
  const categoria = document.getElementById("roadmapCategoria")?.value || "Sem categoria";
  const roadmaps = JSON.parse(localStorage.getItem("roadmaps")) || [];
  roadmaps.push({ nome, etapas, categoria, criadoEm: new Date().toISOString() });
  localStorage.setItem("roadmaps", JSON.stringify(roadmaps));
  console.log(`✅ Roadmap "${nome}" salvo com sucesso!`);
}

// ========================
// Salvar Roadmap Manual
// ========================
function salvarManual() {
  const area = document.getElementById("manualRoadmapArea");
  const etapas = [...area.querySelectorAll(".node-box")].map(e => e.innerText);
  if (!etapas.length) return alert("Adicione pelo menos uma etapa!");
  const nome = prompt("Nome do roadmap manual:");
  if (nome) salvarRoadmap(nome, etapas);
}

// ========================
// Animação da linha do roadmap
// ========================
document.addEventListener("DOMContentLoaded", () => {
  const linePath = document.querySelector(".roadmap-line path");
  if (!linePath) return;

  const length = linePath.getTotalLength();
  const nodes = document.querySelectorAll(".node");

  function animar() {
    linePath.style.strokeDasharray = length;
    linePath.style.strokeDashoffset = length;
    linePath.animate([{ strokeDashoffset: length }, { strokeDashoffset: 0 }], {
      duration: 8000,
      easing: "linear",
      fill: "forwards"
    });

    nodes.forEach((node, index) => {
      setTimeout(() => node.classList.add("active"), (index + 1) * 750);
    });

    setTimeout(() => {
      nodes.forEach(node => node.classList.remove("active"));
    }, 8500);
  }

  animar();
  setInterval(animar, 9000);
});

// ========================
// Suporte à tecla "Enter"
// ========================
document.getElementById("manualStep")?.addEventListener("keypress", e => {
  if (e.key === "Enter") adicionarEtapaManual();
});

document.getElementById("roadmapInput")?.addEventListener("keypress", e => {
  if (e.key === "Enter") gerarRoadmapEstruturado();
});

// ========================
// Carregar Roadmaps (única função unificada)
// ========================
function carregarRoadmaps() {
  const lista = document.getElementById("roadmapLista") || document.getElementById("roadmapList");
  if (!lista) return;

  lista.innerHTML = "";

  const roadmaps = JSON.parse(localStorage.getItem("roadmaps")) || [];

  if (roadmaps.length === 0) {
    lista.innerHTML = "<p style='color: gray;'>Nenhum roadmap salvo ainda.</p>";
    return;
  }

  roadmaps.forEach((roadmap) => {
    const card = document.createElement("div");
    card.classList.add("node-box");
    card.textContent = roadmap.nome;
    card.title = roadmap.etapas.join(" → ");
    card.onclick = () => {
      alert(`📋 ${roadmap.nome}\nCategoria: ${roadmap.categoria || "-"}\n\nEtapas:\n- ${roadmap.etapas.join("\n- ")}`);
    };
    lista.appendChild(card);
  });
}

if (window.location.pathname.includes("dashboard.html")) {
  document.addEventListener("DOMContentLoaded", carregarRoadmaps);
}
