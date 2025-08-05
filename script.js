// Contador regressivo
const dataCasamento = new Date("2025-12-20T00:00:00").getTime();

function atualizarContador() {
  const agora = new Date().getTime();
  const distancia = dataCasamento - agora;

  if (distancia <= 0) {
    document.getElementById("contador").innerHTML = "É HOJE! 💍";
    return;
  }

  const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

  document.getElementById("contador").innerHTML = 
    `${dias}d ${horas}h ${minutos}m ${segundos}s`;
}

setInterval(atualizarContador, 1000);

// Confirmação de presença
function confirmarPresenca(event) {
  event.preventDefault();
  const nome = document.getElementById("nome").value;
  const confirmacao = document.getElementById("confirmacao").value;
  const mensagem = `${nome}, sua resposta "${confirmacao}" foi registrada! Obrigado! 💌`;

  document.getElementById("resposta-presenca").innerText = mensagem;
}

// Sorteio
function sortearNumero(event) {
  event.preventDefault();
  const chavePix = document.getElementById("chavePix").value;

  if (!chavePix) {
    document.getElementById("resultado-sorteio").innerText = "Por favor, insira sua chave Pix.";
    return;
  }

  const numeroSorteado = Math.floor(Math.random() * 1000) + 1;
  document.getElementById("resultado-sorteio").innerText =
    `Número da sorte: ${numeroSorteado}. Boa sorte! 🍀`;
}


