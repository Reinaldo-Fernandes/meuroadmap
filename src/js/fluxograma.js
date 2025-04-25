// fluxograma.js

function carregarEditorFluxograma() {
    const area = document.getElementById("area-trabalho");
  
    area.innerHTML = `
      <div id="drawflow" style="width: 100%; height: 600px;"></div>
      <div class="fluxo-controles">
        <button onclick="addNode('iniciar')">Início</button>
        <button onclick="addNode('processo')">Processo</button>
        <button onclick="addNode('decisao')">Decisão</button>
        <button onclick="addNode('fim')">Fim</button>
      </div>
    `;
  
    const editor = new Drawflow(document.getElementById("drawflow"));
    editor.reroute = true;
    editor.start();
  
    window.editor = editor; // tornar acessível globalmente
  }
  
  function addNode(type) {
    if (!window.editor) return;
    let data = {};
    let html = "";
    let title = "";
  
    switch(type) {
      case 'iniciar':
        title = "Início";
        html = `<div class='title-box'>Início</div>`;
        break;
      case 'processo':
        title = "Processo";
        html = `<div class='title-box'>Processo</div>`;
        break;
      case 'decisao':
        title = "Decisão";
        html = `<div class='title-box'>Decisão</div>`;
        break;
      case 'fim':
        title = "Fim";
        html = `<div class='title-box'>Fim</div>`;
        break;
    }
  
    window.editor.addNode(type, 1, 1, 100, 100, type, data, html);
  }
  