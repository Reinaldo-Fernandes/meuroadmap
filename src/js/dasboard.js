// dashboard.js atualizado com busca, filtro por categoria, data e estrutura limpa

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
  
      const data = document.createElement("p");
      const dataFormatada = new Date(roadmap.criadoEm).toLocaleDateString("pt-BR", {
        day: "2-digit", month: "2-digit", year: "numeric"
      });
      data.textContent = `Criado em: ${dataFormatada}`;
      data.style.fontSize = "13px";
      data.style.color = "#666";
      data.style.marginBottom = "10px";
  
      const listaEtapas = document.createElement("ul");
      roadmap.etapas.forEach(etapa => {
        const li = document.createElement("li");
        li.textContent = etapa;
        listaEtapas.appendChild(li);
      });
  
      const btns = document.createElement("div");
      btns.classList.add("roadmap-actions");
  
      const btnVer = document.createElement("button");
      btnVer.innerHTML = '<i class="fas fa-eye"></i> Visualizar';
      btnVer.onclick = () => exibirDetalhes(roadmap);
  
      const btnEditar = document.createElement("button");
      btnEditar.innerHTML = '<i class="fas fa-pen"></i> Editar';
      btnEditar.onclick = () => editarRoadmap(index);
  
      const btnExcluir = document.createElement("button");
      btnExcluir.innerHTML = '<i class="fas fa-trash"></i> Excluir';
      btnExcluir.onclick = () => excluirRoadmap(index);
  
      btns.appendChild(btnVer);
      btns.appendChild(btnEditar);
      btns.appendChild(btnExcluir);
  
      card.appendChild(titulo);
      card.appendChild(tag);
      card.appendChild(data);
      card.appendChild(listaEtapas);
      card.appendChild(btns);
  
      listaContainer.appendChild(card);
    });
  }
  
  function excluirRoadmap(index) {
    if (confirm("Tem certeza que deseja excluir este roadmap?")) {
      const roadmaps = JSON.parse(localStorage.getItem("roadmaps")) || [];
      roadmaps.splice(index, 1);
      localStorage.setItem("roadmaps", JSON.stringify(roadmaps));
      carregarRoadmaps();
      preencherFiltroCategorias();
    }
  }
  
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
    preencherFiltroCategorias();
  }
  
  function exibirDetalhes(roadmap) {
    alert(`📋 Roadmap: ${roadmap.nome}\nCategoria: ${roadmap.categoria || "-"}\n\nEtapas:\n- ${roadmap.etapas.join("\n- ")}`);
  }
  
  function preencherFiltroCategorias() {
    const select = document.getElementById("categoriaFiltro");
    if (!select) return;
  
    select.innerHTML = "<option value=''>Todas</option>";
  
    const roadmaps = JSON.parse(localStorage.getItem("roadmaps")) || [];
    const categorias = [...new Set(roadmaps.map(r => r.categoria || "Sem categoria"))];
  
    categorias.forEach(cat => {
      const option = document.createElement("option");
      option.value = cat;
      option.textContent = cat;
      select.appendChild(option);
    });
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    preencherFiltroCategorias();
    carregarRoadmaps();
  
    const searchInput = document.getElementById("searchInput");
    const categoriaFiltro = document.getElementById("categoriaFiltro");
  
    const atualizarFiltro = () => {
      const texto = searchInput?.value || "";
      const cat = categoriaFiltro?.value || "";
      carregarRoadmaps(texto, cat);
    };
  
    if (searchInput) searchInput.addEventListener("input", atualizarFiltro);
    if (categoriaFiltro) categoriaFiltro.addEventListener("change", atualizarFiltro);
  });
  
  //Exibir Detalhes 
  function exibirDetalhes(roadmap) {
    const modal = document.getElementById("modalVisualizar");
    const titulo = document.getElementById("modalTitulo");
    const categoria = document.getElementById("modalCategoria");
    const etapasContainer = document.getElementById("modalEtapas");
    const barra = document.querySelector("#modalProgresso .preenchimento");
  
    titulo.textContent = roadmap.nome;
    categoria.textContent = `Categoria: ${roadmap.categoria || "Sem categoria"}`;
    etapasContainer.innerHTML = "";
  
    const progresso = getProgresso(roadmap.nome);
    const total = roadmap.etapas.length;
    const concluidas = roadmap.etapas.filter(e => progresso.includes(e)).length;
    const percentual = Math.round((concluidas / total) * 100);
    barra.style.width = `${percentual}%`;
  
    roadmap.etapas.forEach(etapa => {
      const node = criarNode(etapa, roadmap.nome); // reutiliza com checkbox
      etapasContainer.appendChild(node);
    });
  
    modal.classList.remove("hidden");
  }
  
  function fecharModal() {
    const modal = document.getElementById("modalVisualizar");
    modal.classList.add("hidden");
  }
  