const cores = ["Vermelho", "Amarelo", "Azul", "Verde"];
const membros = ["Mão esquerda", "Mão direita", "Pé esquerdo", "Pé direito"];

const jogadores = [];
let indiceJogadorAtual = 0; 
let anguloTotal = 0; // CORRIGIDO: Variável declarada no escopo global

// Mapeamento para o destaque visual
const mapaCoresClasses = {
  "Vermelho": "vermelho",
  "Amarelo": "amarelo",
  "Azul": "azul",
  "Verde": "verde"
};

// DOM 
const roleta = document.getElementById("roleta");
const botao = document.getElementById("girar");
const resultado = document.getElementById("resultado");

const inputNome = document.getElementById("nomeJogador");
const btnAdicionar = document.getElementById("btnAdicionar"); 
const listaJogadoresUI = document.getElementById("listaJogadores");
const msgErro = document.getElementById("erroValidacao");
const elemJogadorAtual = document.getElementById("jogadorAtual");

// Bloqueia o botão da roleta até ter pelo menos 1 jogador
botao.disabled = true;

// função para adicionar jogadores e validações
function adicionarJogador() {
  const nome = inputNome.value.trim();

  // Validação de campo vazio ou espaço
  if (nome === "") {
    msgErro.textContent = "Digite um nome válido";
    return;
  }

  // Validação de mínimo de caracteres
  if (nome.length < 3) {
    msgErro.textContent = "O nome deve ter pelo menos 3 letras";
    return;
  }

  // Validação nome duplicado
  const jaExiste = jogadores.some(
    (j) => j.toLowerCase() === nome.toLowerCase()
  );

  if (jaExiste) {
    msgErro.textContent = "Este jogador já foi adicionado!";
    return;
  }

  // Sucesso: adiciona o jogador
  msgErro.textContent = "";
  jogadores.push(nome);
  inputNome.value = "";
  inputNome.focus();

  atualizarListaJogadoresUI();
}

// Atualizando a interface pra ve quem é a bola da vez
function atualizarListaJogadoresUI() {
  listaJogadoresUI.innerHTML = "";
  jogadores.forEach((nome) => {
    const li = document.createElement("li");
    li.textContent = nome;
    listaJogadoresUI.appendChild(li);
  });

  if (jogadores.length > 0) {
    botao.disabled = false;
    elemJogadorAtual.textContent = jogadores[indiceJogadorAtual];
  }
}

//  FUNÇÃO DE DESTAQUE NO TAPETE
function destacarBolasNoTapete(nomeCor) {
  document.querySelectorAll(".bola.destaque").forEach((bola) => {
    bola.classList.remove("destaque");
  });

  const classeCor = mapaCoresClasses[nomeCor];

  if (classeCor) {
    const bolasSorteadas = document.querySelectorAll(`.bola.${classeCor}`);
    bolasSorteadas.forEach((bola) => {
      bola.classList.add("destaque");
    });
  }
}

// EVENTOS DO FORMULÁRIO
btnAdicionar.addEventListener("click", adicionarJogador);
inputNome.addEventListener("keypress", (e) => {
  if (e.key === "Enter") adicionarJogador();
});

//EVENTOS DA ROLETA (Girar)
botao.addEventListener("click", function () {
  botao.disabled = true;
  resultado.textContent = "Girando...";

  // 5 voltas completas + um pedaço aleatório
  anguloTotal += 360 * 5 + Math.floor(Math.random() * 360);
  roleta.style.transform = "rotate(" + anguloTotal + "deg)";
});

// EVENTO ÚNICO DE FIM DE ANIMAÇÃO (Transitionend) 
roleta.addEventListener("transitionend", function () {
  const anguloFinal = anguloTotal % 360;
  const posicao = (360 - anguloFinal) % 360;
  const cor = cores[Math.floor(posicao / 90)];
  const membro = membros[Math.floor(Math.random() * membros.length)];

  // Pega o jogador atual do turno
  const jogadorCorrente = jogadores[indiceJogadorAtual];

  // Exibe o resultado combinando jogador, membro e cor
  resultado.textContent = `${jogadorCorrente}: ${membro} no ${cor.toLowerCase()}`;
  botao.disabled = false;

  // Aciona o destaque visual no tapete
  destacarBolasNoTapete(cor);

  // Passa a vez para o próximo jogador da lista ciclicamente
  indiceJogadorAtual = (indiceJogadorAtual + 1) % jogadores.length;
  elemJogadorAtual.textContent = jogadores[indiceJogadorAtual];
});