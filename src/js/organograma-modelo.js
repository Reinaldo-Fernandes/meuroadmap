let chart;

function carregarModelo(tipo) {
  const area = document.getElementById("areaOrganograma");
  const botoes = document.getElementById("botoesEditor");
  area.innerHTML = '';
  botoes.style.display = 'none';

  switch (tipo) {
    case 'hierarquico':
      area.innerHTML = `
        <h2>Organograma Hierárquico</h2>
        <div id="organograma-chart" style="width: 100%; height: 500px;"></div>
      `;
      chart = new OrgChart(document.getElementById("organograma-chart"), {
        nodeBinding: {
          field_0: "nome",
          field_1: "cargo"
        },
        enableSearch: false,
        editForm: {
          buttons: {
            edit: null,
            share: null
          }
        },
        nodes: [
          { id: 1, nome: "Maria Silva", cargo: "CEO" },
          { id: 2, pid: 1, nome: "Carlos Souza", cargo: "Diretor Financeiro" },
          { id: 3, pid: 1, nome: "Fernanda Lima", cargo: "Diretora de Marketing" },
          { id: 4, pid: 2, nome: "João Pedro", cargo: "Analista Contábil" },
          { id: 5, pid: 3, nome: "Luciana Rocha", cargo: "Designer" }
        ]
      });
      botoes.style.display = 'block';
      break;

    case 'funcional':
      area.innerHTML = `
        <h2>Organograma Funcional</h2>
        <div class="organograma funcional">
          <div class="funcao">Marketing</div>
          <div class="funcao">RH</div>
          <div class="funcao">TI</div>
          <div class="funcao">Financeiro</div>
        </div>
      `;
      break;

    case 'matricial':
      area.innerHTML = `
        <h2>Organograma Matricial</h2>
        <div class="organograma matricial">
          <p>Modelo representando múltiplas lideranças por projeto e departamento.</p>
        </div>
      `;
      break;

    case 'circular':
      area.innerHTML = `
        <h2>Organograma Circular</h2>
        <div class="organograma circular">
          <div class="centro">CEO</div>
          <div class="camada">
            <span>Financeiro</span>
            <span>Operações</span>
            <span>Marketing</span>
            <span>RH</span>
          </div>
        </div>
      `;
      break;

    default:
      area.innerHTML = `<p>Modelo não encontrado.</p>`;
      break;
  }
}
