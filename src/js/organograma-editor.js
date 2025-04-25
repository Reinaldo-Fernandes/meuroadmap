let lastId = 5;

function addNode() {
  if (!chart) return;
  const selected = chart.getSelectedNode();
  if (!selected) {
    alert("Selecione um membro para adicionar um subordinado.");
    return;
  }
  lastId++;
  chart.addNode({ id: lastId, pid: selected, name: "Novo Membro", title: "Cargo" });
}

function removeSelected() {
  if (!chart) return;
  const selected = chart.getSelectedNode();
  if (!selected) {
    alert("Selecione um membro para remover.");
    return;
  }
  chart.removeNode(selected);
}

function exportarImagem() {
  if (chart) chart.exportImg({ full: true });
}

function exportarJSON() {
  if (chart) {
    const json = JSON.stringify(chart.getNodes(), null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "organograma.json";
    link.click();
    URL.revokeObjectURL(url);
  }
}
