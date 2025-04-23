function carregarModelo(tipo) {
    const area = document.getElementById("areaOrganograma");
    area.innerHTML = ''; // Limpa o conteúdo anterior
  
    switch (tipo) {
      case 'hierarquico':
        area.innerHTML = `
          <h2>Organograma Hierárquico</h2>
          <div id="organograma-chart" style="width: 100%; height: 500px;"></div>
        `;
  
        // Cria organograma interativo com OrgChart JS
        new OrgChart(document.getElementById("organograma-chart"), {
          template: "isla",
          nodeBinding: {
            field_0: "name",
            field_1: "title"
          },
          nodes: [
            { id: 1, name: "Maria Silva", title: "CEO" },
            { id: 2, pid: 1, name: "Carlos Souza", title: "Diretor Financeiro" },
            { id: 3, pid: 1, name: "Fernanda Lima", title: "Diretora de Marketing" },
            { id: 4, pid: 2, name: "João Pedro", title: "Analista Contábil" },
            { id: 5, pid: 3, name: "Luciana Rocha", title: "Designer" }
          ]
        });
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
  