// Função para gerar etapas automaticamente com base no nome/título do roadmap
export function gerarEtapasPorTema(titulo) {
    const tema = titulo.toLowerCase();
    let etapas = [];
  
    const temasBase = {
      "programação": [
        "Aprender lógica de programação",
        "Estudar HTML e CSS",
        "Aprender JavaScript",
        "Praticar com projetos pequenos",
        "Aprender Git e GitHub",
        "Explorar frameworks como React ou Vue",
        "Criar um portfólio online"
      ],
      "design": [
        "Estudar fundamentos do design",
        "Aprender ferramentas como Figma ou Adobe XD",
        "Praticar com projetos de UI",
        "Aprender sobre UX e testes de usabilidade",
        "Criar um portfólio visual",
        "Receber feedback de outros designers",
        "Aplicar para estágios ou freelas"
      ],
      "startup": [
        "Validar ideia com pesquisa de mercado",
        "Definir proposta de valor",
        "Criar MVP (Produto Mínimo Viável)",
        "Testar com primeiros usuários",
        "Ajustar com base em feedback",
        "Montar pitch e buscar investimento",
        "Lançar versão oficial"
      ]
    };
  
    for (const chave in temasBase) {
      if (tema.includes(chave)) {
        etapas = temasBase[chave];
        break;
      }
    }
  
    if (etapas.length === 0) {
      etapas = [
        "Definir objetivo principal",
        "Listar etapas necessárias",
        "Priorizar tarefas importantes",
        "Criar cronograma de execução",
        "Revisar e ajustar conforme necessário",
        "Monitorar progresso",
        "Concluir e documentar aprendizados"
      ];
    }
  
    return etapas;
  }
  
  // Função para sugerir próxima etapa com base nas anteriores
  export function sugerirProximaEtapa(etapas) {
    if (!etapas || etapas.length === 0) return "Comece com um objetivo claro.";
  
    const ultima = etapas[etapas.length - 1].toLowerCase();
  
    if (ultima.includes("html")) return "Estude CSS para estilizar suas páginas.";
    if (ultima.includes("css")) return "Explore o JavaScript para tornar seus sites interativos.";
    if (ultima.includes("javascript")) return "Pratique com pequenos projetos interativos.";
    if (ultima.includes("mvp")) return "Considere fazer testes com usuários reais.";
    if (ultima.includes("lógica")) return "Agora é um bom momento para aprender uma linguagem como JavaScript.";
    if (ultima.includes("figma")) return "Tente recriar interfaces de apps populares para treinar.";
    if (ultima.includes("execução")) return "Considere revisar e ajustar o que foi feito.";
    if (ultima.includes("revisar")) return "Compartilhe o progresso e colete feedback.";
  
    return "Pense na próxima etapa lógica ou pesquise referências no seu tema.";
  }
  