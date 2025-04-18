// Array para armazenar as etapas manuais
let etapasManuais = [];

// Função para gerar um roadmap automático
function gerarRoadmap() {
  console.log("Função gerarRoadmap chamada");  // Para verificar se a função está sendo chamada

  const nome = document.getElementById("roadmapInput").value;
  const categoria = document.getElementById("roadmapCategoria").value;

  if (!nome || !categoria) {
    alert("Por favor, insira o nome e a categoria do roadmap.");
    return;
  }

  // Criar o roadmap
  const roadmap = {
    nome: nome,
    categoria: categoria,
    etapas: ["Pesquisa", "Planejamento", "Execução", "Revisão"], // Exemplo de etapas
    criadoEm: new Date().toISOString()
  };

  console.log("Roadmap gerado:", roadmap);  // Verifica o conteúdo do roadmap

  // Exibir o roadmap na área correspondente
  const roadmapArea = document.getElementById("roadmapArea");
  roadmapArea.innerHTML = `
    <h4>${roadmap.nome}</h4>
    <p><strong>Categoria:</strong> ${roadmap.categoria}</p>
    <ul>
      ${roadmap.etapas.map(etapa => `<li>${etapa}</li>`).join("")}
    </ul>
  `;

  // Salvar o roadmap no localStorage
  const roadmaps = JSON.parse(localStorage.getItem("roadmaps")) || [];
  roadmaps.push(roadmap);
  localStorage.setItem("roadmaps", JSON.stringify(roadmaps));

  alert("Roadmap gerado com sucesso!");
}

// Função para adicionar etapas manuais
function adicionarEtapa() {
  const etapaInput = document.getElementById("manualStep");
  const etapa = etapaInput.value.trim();

  if (!etapa) {
    alert("Por favor, insira uma etapa.");
    return;
  }

  etapasManuais.push(etapa);
  etapaInput.value = ""; // Limpa o campo de entrada

  // Exibir as etapas manuais na área correspondente
  const manualRoadmapArea = document.getElementById("manualRoadmapArea");
  manualRoadmapArea.innerHTML = `
    <h4>Etapas:</h4>
    <ul>
      ${etapasManuais.map(etapa => `<li>${etapa}</li>`).join("")}
    </ul>
  `;
}

// Função para salvar o roadmap manual
function salvarRoadmapManual() {
  const nome = document.getElementById("roadmapInput").value;
  const categoria = document.getElementById("roadmapCategoria").value;

  if (!nome || etapasManuais.length === 0 || !categoria) {
    alert("Por favor, insira o nome, a categoria e as etapas do roadmap.");
    return;
  }

  const roadmapManual = {
    nome: nome,
    categoria: categoria,
    etapas: etapasManuais,
    criadoEm: new Date().toISOString()
  };

  // Salvar no localStorage
  const roadmaps = JSON.parse(localStorage.getItem("roadmaps")) || [];
  roadmaps.push(roadmapManual);
  localStorage.setItem("roadmaps", JSON.stringify(roadmaps));

  alert("Roadmap manual salvo com sucesso!");

  // Limpar etapas manuais
  etapasManuais = [];
  document.getElementById("manualRoadmapArea").innerHTML = "";
}

// Função para carregar e exibir os roadmaps salvos com filtros
function carregarRoadmaps(filtroNome = "", filtroCategoria = "") {
  const listaContainer = document.getElementById("roadmapList");
  listaContainer.innerHTML = "";

  const roadmaps = JSON.parse(localStorage.getItem("roadmaps")) || [];

  const filtrados = roadmaps.filter(r =>
    r.nome.toLowerCase().includes(filtroNome.toLowerCase()) &&
    (filtroCategoria === "" || r.categoria?.toLowerCase() === filtroCategoria.toLowerCase())
  );

  if (filtrados.length === 0) {
    listaContainer.innerHTML = "<p>Nenhum roadmap encontrado.</p>";
    return;
  }

  filtrados.forEach((roadmap, index) => {
    const card = document.createElement("div");
    card.classList.add("roadmap-card");

    const titulo = document.createElement("h3");
    titulo.textContent = roadmap.nome;

    const tag = document.createElement("span");
    tag.classList.add("tag");
    tag.textContent = roadmap.categoria || "Sem categoria";
    card.appendChild(tag);

    const listaEtapas = document.createElement("ul");
    roadmap.etapas.forEach(etapa => {
      const li = document.createElement("li");
      li.textContent = etapa;
      listaEtapas.appendChild(li);
    });

    const btns = document.createElement("div");
    btns.classList.add("roadmap-actions");

    const btnExcluir = document.createElement("button");
    btnExcluir.innerHTML = '<i class="fas fa-trash"></i> Excluir';
    btnExcluir.onclick = () => excluirRoadmap(index);

    const btnEditar = document.createElement("button");
    btnEditar.innerHTML = '<i class="fas fa-pen"></i> Editar';
    btnEditar.onclick = () => editarRoadmap(index);

    const btnVer = document.createElement("button");
    btnVer.innerHTML = '<i class="fas fa-eye"></i> Visualizar';
    btnVer.onclick = () => exibirDetalhes(roadmap);

    btns.appendChild(btnVer);
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
    carregarRoadmaps();
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

  const novaCategoria = prompt("Categoria do roadmap:", atual.categoria || "");

  roadmaps[index] = {
    nome: novoNome,
    etapas: novasEtapas.split(";").map(etapa => etapa.trim()),
    categoria: novaCategoria || "Sem categoria",
    criadoEm: new Date().toISOString()
  };

  localStorage.setItem("roadmaps", JSON.stringify(roadmaps));
  carregarRoadmaps();
}

// Exibe os detalhes do roadmap
function exibirDetalhes(roadmap) {
  alert(`📋 Roadmap: ${roadmap.nome}\nCategoria: ${roadmap.categoria || "-"}\n\nEtapas:\n- ${roadmap.etapas.join("\n- ")}`);
}

// Inicializa filtros e carregamento ao abrir a página
document.addEventListener("DOMContentLoaded", () => {
  carregarRoadmaps();
});
