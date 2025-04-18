document.addEventListener("DOMContentLoaded", () => {
  const lista = document.getElementById("roadmapLista");
  if (!lista) {
    console.warn("Elemento com ID 'roadmapLista' não encontrado.");
    return;
  }

  const roadmaps = JSON.parse(localStorage.getItem("roadmaps")) || [];

  lista.innerHTML = "";

  if (roadmaps.length === 0) {
    lista.innerHTML = "<p style='color: gray;'>Nenhum roadmap salvo ainda.</p>";
    return;
  }

  roadmaps.forEach((roadmap) => {
    const div = document.createElement("div");
    div.classList.add("node-box");
    div.textContent = roadmap.nome;
    div.title = `Categoria: ${roadmap.categoria || "Sem categoria"}`;
    div.onclick = () => exibirDetalhes(roadmap.nome); // Exibe via nome
    lista.appendChild(div);
  });
});

// =====================
// Funções auxiliares
// =====================
function getProgresso(roadmapNome) {
  return JSON.parse(localStorage.getItem(`progresso_${roadmapNome}`)) || [];
}

function marcarEtapaConcluida(roadmapNome, etapa) {
  const progresso = getProgresso(roadmapNome);
  if (!progresso.includes(etapa)) {
    progresso.push(etapa);
    localStorage.setItem(`progresso_${roadmapNome}`, JSON.stringify(progresso));
  }
}

function desmarcarEtapa(roadmapNome, etapa) {
  const progresso = getProgresso(roadmapNome).filter(e => e !== etapa);
  localStorage.setItem(`progresso_${roadmapNome}`, JSON.stringify(progresso));
}

function isEtapaConcluida(roadmapNome, etapa) {
  return getProgresso(roadmapNome).includes(etapa);
}

// =====================
// Criar node com drag-and-drop
// =====================
let draggedNode = null;

function criarNode(etapa, roadmapNome = null) {
  const node = document.createElement("div");
  node.classList.add("node-box");
  node.setAttribute("draggable", "true");
  node.dataset.etapa = etapa;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("etapa-checkbox");

  const label = document.createElement("span");
  label.textContent = etapa;

  if (isEtapaConcluida(roadmapNome, etapa)) {
    checkbox.checked = true;
    label.style.textDecoration = "line-through";
    label.style.opacity = 0.6;
  }

  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      marcarEtapaConcluida(roadmapNome, etapa);
      label.style.textDecoration = "line-through";
      label.style.opacity = 0.6;
    } else {
      desmarcarEtapa(roadmapNome, etapa);
      label.style.textDecoration = "none";
      label.style.opacity = 1;
    }
    atualizarProgressoVisual(roadmapNome);
  });

  node.appendChild(checkbox);
  node.appendChild(label);

  node.addEventListener("dragstart", handleDragStart);
  node.addEventListener("dragover", e => e.preventDefault());
  node.addEventListener("drop", handleDrop);

  return node;
}

function handleDragStart(e) {
  draggedNode = e.currentTarget;
}

function handleDrop(e) {
  e.preventDefault();
  const targetNode = e.currentTarget;
  const container = targetNode.parentNode;

  const nodes = [...container.querySelectorAll(".node-box")];
  const draggedIndex = nodes.indexOf(draggedNode);
  const targetIndex = nodes.indexOf(targetNode);

  if (draggedIndex < targetIndex) {
    container.insertBefore(draggedNode, targetNode.nextSibling);
  } else {
    container.insertBefore(draggedNode, targetNode);
  }

  const roadmapNome = document.getElementById("modalTitulo")?.textContent;
  if (roadmapNome) {
    const etapasAtualizadas = [...container.querySelectorAll(".node-box")].map(n => n.dataset.etapa);
    const todos = JSON.parse(localStorage.getItem("roadmaps")) || [];
    const index = todos.findIndex(r => r.nome === roadmapNome);
    if (index !== -1) {
      todos[index].etapas = etapasAtualizadas;
      localStorage.setItem("roadmaps", JSON.stringify(todos));
    }
  }
}

// =====================
// Progresso visual
// =====================
function atualizarProgressoVisual(roadmapNome) {
  const progresso = getProgresso(roadmapNome);
  const roadmaps = JSON.parse(localStorage.getItem("roadmaps")) || [];
  const roadmap = roadmaps.find(r => r.nome === roadmapNome);
  if (!roadmap) return;

  const total = roadmap.etapas.length;
  const concluidas = roadmap.etapas.filter(e => progresso.includes(e)).length;
  const percentual = Math.round((concluidas / total) * 100);

  const barra = document.querySelector(`.progresso-barra[data-nome="${roadmapNome}"] .preenchimento`);
  if (barra) {
    barra.style.width = `${percentual}%`;
  }
}

// =====================
// Exibe detalhes (modal ou alert)
// =====================
function exibirDetalhes(nome) {
  const roadmap = JSON.parse(localStorage.getItem("roadmaps"))?.find(r => r.nome === nome);
  if (!roadmap) return alert("Roadmap não encontrado.");

  const texto = `📋 Roadmap: ${roadmap.nome}
Categoria: ${roadmap.categoria || "Sem categoria"}

Etapas:
- ${roadmap.etapas.join("\n- ")}`;

  alert(texto);
}
