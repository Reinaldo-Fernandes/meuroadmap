// src/js/storage.js

export function salvarRoadmap(roadmap) {
  const roadmaps = JSON.parse(localStorage.getItem("roadmaps")) || [];
  roadmaps.push(roadmap);
  localStorage.setItem("roadmaps", JSON.stringify(roadmaps));
}

export function obterRoadmaps() {
  return JSON.parse(localStorage.getItem("roadmaps")) || [];
}

export function deletarRoadmap(nome) {
  const roadmaps = obterRoadmaps().filter(r => r.nome !== nome);
  localStorage.setItem("roadmaps", JSON.stringify(roadmaps));
}

export function editarRoadmap(nomeOriginal, novoRoadmap) {
  const roadmaps = obterRoadmaps().map(r =>
    r.nome === nomeOriginal ? novoRoadmap : r
  );
  localStorage.setItem("roadmaps", JSON.stringify(roadmaps));
}
