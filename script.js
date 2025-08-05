// === CONTAGEM REGRESSIVA ===
const contador = document.getElementById('contador');
const dataCasamento = new Date(2025, 11, 25, 15, 0, 0); // 25/12/2025 às 15h

function atualizarContador() {
  const agora = new Date();
  const diff = dataCasamento - agora;

  if (diff <= 0) {
    contador.innerHTML = "O grande dia chegou! 🎉";
    clearInterval(intervalo);
    return;
  }

  const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diff / (1000 * 60)) % 60);
  const segundos = Math.floor((diff / 1000) % 60);

  contador.innerHTML = `${dias}d ${horas}h ${minutos}m ${segundos}s`;
}

const intervalo = setInterval(atualizarContador, 1000);
atualizarContador();

// === CONFIRMAÇÃO DE PRESENÇA ===
const formPresenca = document.getElementById('form-presenca');
const respostaPresenca = document.getElementById('resposta-presenca');

formPresenca.addEventListener('submit', function(event) {
  event.preventDefault();
  const nome = this.nome.value.trim();
  const email = this.email.value.trim();
  const presenca = this.presenca.value;

  if (!nome || !email || !presenca) {
    respostaPresenca.textContent = 'Por favor, preencha todos os campos.';
    return;
  }

  respostaPresenca.textContent = `Obrigado, ${nome}! Sua presença foi confirmada como "${presenca}".`;
  formPresenca.reset();
});

// === SORTEIO COM PIX ===
const formSorteio = document.getElementById('form-sorteio');
const resultadoSorteio = document.getElementById('resultado-sorteio');

formSorteio.addEventListener('submit', function(event) {
  event.preventDefault();
  const nome = this['nome-sorteio'].value.trim();
  if (!nome) {
    resultadoSorteio.textContent = 'Por favor, digite seu nome.';
    return;
  }

  const numeroSorteado = Math.floor(Math.random() * 1000) + 1;
  resultadoSorteio.textContent = `${nome}, seu número da sorte é: ${numeroSorteado}`;
});


