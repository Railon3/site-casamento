// Contagem regressiva
const contador = document.getElementById('contador');
// Data do casamento (ano, mês-1, dia, hora, minuto, segundo)
const dataCasamento = new Date(2025, 11, 25, 15, 0, 0); // 25 Dez 2025 às 15h

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

// Formulário Lista de Presença
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

  // Aqui você pode adicionar envio para banco de dados ou salvar localmente
  respostaPresenca.textContent = `Obrigado, ${nome}! Sua presença foi confirmada como "${presenca}".`;
  formPresenca.reset();
});

// Sorteio Pix
const formSorteio = document.getElementById('form-sorteio');
const resultadoSorteio = document.getElementById('resultado-sorteio');
const chavePix = '123e4567-e89b-12d3-a456-426614174000'; // EXEMPLO: substitua pela sua chave real

formSorteio.addEventListener('submit', function(event) {
  event.preventDefault();
  const nomeSorteio = this['nome-sorteio'].value.trim();
  if (!nomeSorteio) {
    resultadoSorteio.textContent = 'Por favor, digite seu nome.';
    return;
  }

  // Gerar número aleatório entre 1 e 1000
  const numeroSorteio = Math.floor(Math.random() * 1000) + 1;

  resultadoSorteio.innerHTML = `
    Olá ${nomeSorteio}, seu número para o sorteio é <strong>${numeroSorteio}</strong>.<br/>
    Use esta chave Pix para participar do sorteio:<br/>
    <code>${chavePix}</code>
  `;

  formSorteio.reset();
});
