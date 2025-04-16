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
  const roadmaps = JSON.parse(localStorage.getItem("roadmaps")) || [];
  roadmaps.push({ nome, etapas, criadoEm: new Date().toISOString() });
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
document.getElementById("manualStep").addEventListener("keypress", e => {
  if (e.key === "Enter") adicionarEtapaManual();
});

document.getElementById("roadmapInput").addEventListener("keypress", e => {
  if (e.key === "Enter") gerarRoadmapEstruturado();
});

// Função para gerar o Roadmap
function gerarRoadmap() {
  // Obtenha o valor inserido no input
  const roadmapInput = document.getElementById('roadmapInput').value.trim();

  if (!roadmapInput) {
    alert('Por favor, insira um título para o seu Roadmap.');
    return;
  }

  // Divida o texto inserido em etapas (como um simples exemplo)
  const etapas = roadmapInput.split(';'); // Cada etapa será separada por ";"

  // Limpar o conteúdo anterior
  const roadmapArea = document.getElementById('roadmapArea');
  roadmapArea.innerHTML = '';

  // Criar elementos para cada etapa
  etapas.forEach((etapa, index) => {
    const etapaDiv = document.createElement('div');
    etapaDiv.classList.add('node');
    etapaDiv.classList.add('roadmap-node');
    etapaDiv.innerText = etapa.trim();

    // Adiciona animação ou efeito de destaque
    etapaDiv.style.animationDelay = `${index * 0.5}s`;

    // Adicionar a etapa ao roadmap
    roadmapArea.appendChild(etapaDiv);
  });
}

// Função para adicionar etapas manualmente
function adicionarEtapa() {
  const manualStepInput = document.getElementById('manualStep').value.trim();

  if (!manualStepInput) {
    alert('Por favor, insira uma etapa.');
    return;
  }

  // Criar um novo node para a etapa
  const nodeDiv = document.createElement('div');
  nodeDiv.classList.add('node');
  nodeDiv.innerText = manualStepInput;

  // Adicionar o node ao manualRoadmapArea
  const manualRoadmapArea = document.getElementById('manualRoadmapArea');
  manualRoadmapArea.appendChild(nodeDiv);

  // Limpar o campo de input após adicionar a etapa
  document.getElementById('manualStep').value = '';
}

// Função para carregar e exibir os roadmaps salvos
function carregarRoadmaps() {
  const listaContainer = document.getElementById("roadmapList");
  listaContainer.innerHTML = ""; // Limpa conteúdo anterior

  const roadmaps = JSON.parse(localStorage.getItem("roadmaps")) || [];

  if (roadmaps.length === 0) {
    listaContainer.innerHTML = "<p>Nenhum roadmap salvo ainda.</p>";
    return;
  }

  roadmaps.forEach((roadmap, index) => {
    const card = document.createElement("div");
    card.classList.add("roadmap-card");

    const titulo = document.createElement("h3");
    titulo.textContent = roadmap.nome;

    const listaEtapas = document.createElement("ul");
    roadmap.etapas.forEach(etapa => {
      const li = document.createElement("li");
      li.textContent = etapa;
      listaEtapas.appendChild(li);
    });

    // Botões de ações
    const btns = document.createElement("div");
    btns.classList.add("roadmap-actions");

    const btnExcluir = document.createElement("button");
    btnExcluir.textContent = "🗑 Excluir";
    btnExcluir.onclick = () => excluirRoadmap(index);

    const btnEditar = document.createElement("button");
    btnEditar.textContent = "✏️ Editar";
    btnEditar.onclick = () => editarRoadmap(index);

    btns.appendChild(btnEditar);
    btns.appendChild(btnExcluir);

    card.appendChild(titulo);
    card.appendChild(listaEtapas);
    card.appendChild(btns);

    listaContainer.appendChild(card);
  });
}

// Função para excluir roadmap
function excluirRoadmap(index) {
  if (confirm("Tem certeza que deseja excluir este roadmap?")) {
    const roadmaps = JSON.parse(localStorage.getItem("roadmaps")) || [];
    roadmaps.splice(index, 1);
    localStorage.setItem("roadmaps", JSON.stringify(roadmaps));
    carregarRoadmaps(); // Atualiza a lista
  }
}

// Função para editar roadmap
function editarRoadmap(index) {
  const roadmaps = JSON.parse(localStorage.getItem("roadmaps")) || [];
  const atual = roadmaps[index];

  const novoNome = prompt("Novo nome do roadmap:", atual.nome);
  if (!novoNome) return;

  const novasEtapas = prompt("Edite as etapas separadas por ponto e vírgula (;):", atual.etapas.join(";"));
  if (!novasEtapas) return;

  roadmaps[index] = {
    nome: novoNome,
    etapas: novasEtapas.split(";").map(etapa => etapa.trim()),
    criadoEm: new Date().toISOString()
  };

  localStorage.setItem("roadmaps", JSON.stringify(roadmaps));
  carregarRoadmaps(); // Atualiza a lista
}

// Inicializar
document.addEventListener("DOMContentLoaded", carregarRoadmaps);

// Função para exibir os roadmaps salvos na dashboard
function carregarRoadmaps() {
const lista = document.getElementById("roadmapLista");
lista.innerHTML = ""; // Limpa os simulados

const roadmaps = JSON.parse(localStorage.getItem("roadmaps")) || [];

if (roadmaps.length === 0) {
  lista.innerHTML = "<p>Nenhum roadmap salvo ainda.</p>";
  return;
}

roadmaps.forEach((r) => {
  const node = document.createElement("div");
  node.classList.add("node-box");
  node.innerText = r.nome;
  node.title = r.etapas.join(" → ");
  lista.appendChild(node);
});
}

// Só executa se estiver na página dashboard
if (window.location.pathname.includes("dashboard.html")) {
document.addEventListener("DOMContentLoaded", carregarRoadmaps);
}

import { salvarRoadmap } from "./storage.js";

function salvarRoadmapManual() {
  const nome = prompt("Digite um nome para seu roadmap:");
  const categoria = document.getElementById("roadmapCategoria")?.value || "Sem categoria";
  const etapas = [...document.querySelectorAll("#manualRoadmapArea .node-box")].map(el => el.innerText);

  if (!nome || etapas.length === 0) {
    alert("Você precisa informar um nome e pelo menos uma etapa.");
    return;
  }

  const roadmap = {
    nome,
    etapas,
    categoria,
    criadoEm: new Date().toISOString()
  };

  salvarRoadmap(roadmap); // ✅ usa função centralizada
  alert("Roadmap salvo com sucesso!");
}
