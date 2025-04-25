// modo-selecao.js
let modoAtual = "organograma";

function selecionarModo(modo) {
  modoAtual = modo;
  const area = document.getElementById("area-trabalho");
  const controles = document.getElementById("controlesOrganograma");

  area.innerHTML = "";

  if (modo === "organograma") {
    controles.style.display = "block";
    carregarModelo("hierarquico");
  } else if (modo === "fluxograma") {
    controles.style.display = "none";
    carregarEditorFluxograma();
  }
}
