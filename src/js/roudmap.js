
// ========== Função para adicionar etapas manuais ==========
function adicionarEtapa() {
  const etapaInput = document.getElementById("manualStep");
  const etapa = etapaInput.value.trim();

  if (!etapa) {
    alert("Por favor, insira uma etapa.");
    return;
  }

  etapasManuais.push(etapa);
  etapaInput.value = "";
  atualizarEtapasManuais();
}

// ========== Função para salvar um roadmap criado manualmente ==========
function salvarRoadmapManual() {
  const nome = document.getElementById("roadmapInput").value.trim();
  const categoria = document.getElementById("roadmapCategoria").value.trim();

  if (!nome || !categoria || etapasManuais.length === 0) {
    alert("Por favor, preencha todos os campos e adicione pelo menos uma etapa.");
    return;
  }

  const roadmap = {
    nome,
    categoria,
    etapas: [...etapasManuais],
    criadoEm: new Date().toISOString()
  };

  salvarRoadmap(roadmap);
  alert("Roadmap manual salvo com sucesso!");

  etapasManuais = [];
  atualizarEtapasManuais();
}

// ========== Atualiza o DOM com as etapas manuais ==========
function atualizarEtapasManuais() {
  const area = document.getElementById("manualRoadmapArea");
  area.innerHTML = etapasManuais.length > 0
    ? `<h4>Etapas:</h4><ul>${etapasManuais.map(e => `<li>${e}</li>`).join("")}</ul>`
    : "";

  const sugestao = sugerirProximaEtapa(etapasManuais);
  const sugestaoEl = document.getElementById("sugestaoEtapa");
  if (sugestaoEl) {
    sugestaoEl.textContent = sugestao ? `💡 Sugestão: ${sugestao}` : "";
  }
}

// ========== Exibe o roadmap gerado na interface ==========
function exibirRoadmapGerado(roadmap) {
  const area = document.getElementById("roadmapArea");
  area.innerHTML = `
    <h4>${roadmap.nome}</h4>
    <p><strong>Categoria:</strong> ${roadmap.categoria}</p>
    <ul>${roadmap.etapas.map(e => `<li>${e}</li>`).join("")}</ul>
  `;

  const sugestao = sugerirProximaEtapa(etapasManuais);
  const sugestaoEl = document.getElementById("sugestaoEtapa");
  if (sugestao && sugestaoEl) {
    sugestaoEl.textContent = `💡 Sugestão: ${sugestao}`;
  }
}

// ========== Salva roadmap no localStorage ==========
function salvarRoadmap(roadmap) {
  const roadmaps = JSON.parse(localStorage.getItem("roadmaps")) || [];
  roadmaps.push(roadmap);
  localStorage.setItem("roadmaps", JSON.stringify(roadmaps));
  carregarRoadmaps();
}

// ========== Carrega e exibe os roadmaps salvos ==========
function carregarRoadmaps(filtroNome = "", filtroCategoria = "") {
  const lista = document.getElementById("roadmapList");
  lista.innerHTML = "";

  const roadmaps = JSON.parse(localStorage.getItem("roadmaps")) || [];

  const filtrados = roadmaps.filter(r =>
    r.nome.toLowerCase().includes(filtroNome.toLowerCase()) &&
    (!filtroCategoria || r.categoria?.toLowerCase() === filtroCategoria.toLowerCase())
  );

  if (filtrados.length === 0) {
    lista.innerHTML = "<p>Nenhum roadmap encontrado.</p>";
    return;
  }

  filtrados.forEach((r, i) => {
    const card = document.createElement("div");
    card.className = "roadmap-card";
    card.innerHTML = `
      <span class="tag">${r.categoria || "Sem categoria"}</span>
      <h3>${r.nome}</h3>
      <ul>${r.etapas.map(e => `<li>${e}</li>`).join("")}</ul>
      <div class="roadmap-actions">
        <button onclick="exibirDetalhes(${i})"><i class="fas fa-eye"></i> Visualizar</button>
        <button onclick="editarRoadmap(${i})"><i class="fas fa-pen"></i> Editar</button>
        <button onclick="excluirRoadmap(${i})"><i class="fas fa-trash"></i> Excluir</button>
      </div>
    `;
    lista.appendChild(card);
  });
}

// ========== Função para excluir um roadmap ==========
function excluirRoadmap(index) {
  if (!confirm("Tem certeza que deseja excluir este roadmap?")) return;

  const roadmaps = JSON.parse(localStorage.getItem("roadmaps")) || [];
  roadmaps.splice(index, 1);
  localStorage.setItem("roadmaps", JSON.stringify(roadmaps));
  carregarRoadmaps();
}

// ========== Função para editar um roadmap ==========
function editarRoadmap(index) {
  const roadmaps = JSON.parse(localStorage.getItem("roadmaps")) || [];
  const atual = roadmaps[index];

  const nome = prompt("Novo nome:", atual.nome) || atual.nome;
  const etapas = prompt("Edite as etapas (separadas por ponto e vírgula):", atual.etapas.join(";"));
  if (!etapas) return;
  const categoria = prompt("Categoria:", atual.categoria) || "Sem categoria";

  roadmaps[index] = {
    nome,
    etapas: etapas.split(";").map(e => e.trim()).filter(e => e),
    categoria,
    criadoEm: new Date().toISOString()
  };

  localStorage.setItem("roadmaps", JSON.stringify(roadmaps));
  carregarRoadmaps();
}

// ========== Função para exibir os detalhes de um roadmap ==========
function exibirDetalhes(index) {
  const roadmaps = JSON.parse(localStorage.getItem("roadmaps")) || [];
  const r = roadmaps[index];
  alert(`📋 Roadmap: ${r.nome}\nCategoria: ${r.categoria || "-"}\n\nEtapas:\n- ${r.etapas.join("\n- ")}`);
}

// ========== Inicia o app ==========
document.addEventListener("DOMContentLoaded", () => {
  carregarRoadmaps();

  document.getElementById("gerarBtn").onclick = gerarRoadmap;
  document.getElementById("adicionarEtapaBtn").onclick = adicionarEtapa;
  document.getElementById("salvarManualBtn").onclick = salvarRoadmapManual;
});

//Novas funções 