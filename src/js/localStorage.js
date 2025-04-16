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
    div.onclick = () => exibirDetalhes(roadmap);
    lista.appendChild(div);
  });
});
