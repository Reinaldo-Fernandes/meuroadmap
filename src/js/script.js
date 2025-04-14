// Função para validar o formato de e-mail
function isValidEmail(email) {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailPattern.test(email);
}

//Roadmap.html
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

  roadmap.forEach(etapa => {
    const node = document.createElement("div");
    node.classList.add("node-box");
    node.innerText = etapa;
    area.appendChild(node);
  });
}

//Backgournd Roudmap
document.addEventListener("DOMContentLoaded", () => {
  const nodes = document.querySelectorAll('.node');
  const linePath = document.querySelector('.roadmap-line path');
  const lineLength = linePath.getTotalLength();
  let currentNode = 0; // Controle do node atual

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
    // Animação da linha passando por cada ponto
    linePath.style.strokeDasharray = lineLength;
    linePath.style.strokeDashoffset = lineLength;
    linePath.animate([
      { strokeDashoffset: lineLength },
      { strokeDashoffset: 0 }
    ], {
      duration: 8000, // Duração da animação da linha
      easing: 'linear',
      fill: 'forwards'
    });

    // Ativar nodes de forma sincronizada
    nodes.forEach((node, index) => {
      setTimeout(() => {
        activateNode(node);
        // Aqui você pode adicionar um som ou outro efeito
        // Exemplo de som (necessita de um arquivo de áudio ou URL de som):
        // new Audio('path/to/sound.mp3').play();
      }, (index + 1) * 750); // Sincroniza o tempo com a linha, ajustando o atraso
    });

    // Desativar nodes após um certo tempo
    setTimeout(() => {
      nodes.forEach(deactivateNode);
    }, 8500); // Tempo após a linha completar a animação
    
    setInterval(animateLineAndNodes, 8500); // Reinicia a animação a cada ciclo completo
  }

  // Inicializa a animação assim que a página carrega
  animateLineAndNodes();
});
