// Função para validar o formato de e-mail
function isValidEmail(email) {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailPattern.test(email);
}

// Função para gerar o roadmap baseado no input
function gerarRoadmap() {
  const input = document.getElementById("roadmapInput").value.trim();
  const area = document.getElementById("roadmapArea");
  area.innerHTML = "";

  if (!input) {
    alert("Digite uma ideia para gerar o roadmap!");
    return;
  }

  // Simulando resposta da IA
  const ideias = {
    "front-end": ["HTML", "CSS", "JavaScript", "React", "Projeto prático"],
    "marketing": ["Pesquisa de mercado", "SEO", "Google Ads", "Conteúdo", "Análise de métricas"],
    "empreendedorismo": ["Ideação", "Validação", "MVP", "Lançamento", "Crescimento"],
  };

  // Verifica se há sugestão baseada na palavra
  const chave = Object.keys(ideias).find(chave => input.toLowerCase().includes(chave));
  const roadmap = chave ? ideias[chave] : ["Etapa 1", "Etapa 2", "Etapa 3"];

  // Adiciona as etapas ao DOM
  roadmap.forEach(etapa => {
    const node = document.createElement("div");
    node.classList.add("node-box");
    node.innerText = etapa;
    area.appendChild(node);
  });

  // Após gerar o roadmap, perguntar o nome e salvar
  const nome = prompt("Digite um nome para salvar seu roadmap:");
  if (nome) salvarRoadmap(nome, roadmap);
}

// Função para animar o background do roadmap
document.addEventListener("DOMContentLoaded", () => {
  const nodes = document.querySelectorAll('.node');
  const linePath = document.querySelector('.roadmap-line path');
  const lineLength = linePath.getTotalLength();

  // Função para ativar o node
  function activateNode(node) {
    node.classList.add('active'); // Ativa o node
  }

  // Função para desativar o node
  function deactivateNode(node) {
    node.classList.remove('active'); // Desativa o node
  }

  // Função para animar a linha e os nodes
  function animateLineAndNodes() {
    linePath.style.strokeDasharray = lineLength;
    linePath.style.strokeDashoffset = lineLength;
    linePath.animate([ 
      { strokeDashoffset: lineLength },
      { strokeDashoffset: 0 }
    ], {
      duration: 8000,
      easing: 'linear',
      fill: 'forwards'
    });

    // Ativar nodes de forma sincronizada
    nodes.forEach((node, index) => {
      setTimeout(() => {
        activateNode(node);
      }, (index + 1) * 750);
    });

    setTimeout(() => {
      nodes.forEach(deactivateNode);
    }, 8500);

    setInterval(animateLineAndNodes, 8500);
  }

  animateLineAndNodes();
});

// Função para adicionar uma nova etapa ao roadmap manualmente
function adicionarEtapa() {
  const input = document.getElementById("manualStep");
  const etapa = input.value.trim();
  const area = document.getElementById("manualRoadmapArea");

  if (!etapa) {
    alert("Digite uma etapa antes de adicionar!");
    return;
  }

  const node = document.createElement("div");
  node.classList.add("node-box");
  node.innerText = etapa;
  area.appendChild(node);

  input.value = "";
  input.focus();
}

// Função para salvar o roadmap no localStorage
function salvarRoadmap(nome, etapas) {
  const roadmaps = JSON.parse(localStorage.getItem("roadmaps")) || [];

  const novo = {
    nome: nome,
    etapas: etapas,
    criadoEm: new Date().toISOString()
  };

  roadmaps.push(novo);
  localStorage.setItem("roadmaps", JSON.stringify(roadmaps));
  console.log("Roadmap salvo com sucesso!"); // Substitui o alert por um log para evitar pop-ups excessivos
}
