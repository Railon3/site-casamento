// ===== CONTAGEM REGRESSIVA =====
const contador = document.getElementById('contador');
const dataCasamento = new Date(2025, 11, 25, 15, 0, 0); // 25/12/2025 15h

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

// ===== FORMULÁRIO DE PRESENÇA =====
const formPresenca = document.getElementById('form-presenca');
const respostaPresenca = document.getElementById('resposta-presenca');

formPresenca.addEventListener('submit', function (event) {
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

// ===== SORTEIO PIX =====
const formSorteio = document.getElementById('form-sorteio');
const resultadoSorteio = document.getElementById('resultado-sorteio');
const chavePix = '123e4567-e89b-12d3-a456-426614174000'; // Substitua pela chave real

formSorteio.addEventListener('submit', function (event) {
  event.preventDefault();
  const nomeSorteio = this['nome-sorteio'].value.trim();
  if (!nomeSorteio) {
    resultadoSorteio.textContent = 'Por favor, digite seu nome.';
    return;
  }

  const numeroSorteio = Math.floor(Math.random() * 1000) + 1;
  resultadoSorteio.innerHTML = `
    <p>Olá, ${nomeSorteio}!</p>
    <p>Seu número da sorte é: <strong>${numeroSorteio}</strong></p>
    <p>Chave Pix para pagamento: <strong>${chavePix}</strong></p>
  `;
});

// ===== GALERIA DE IMAGENS AUTOMÁTICA =====
const galeriaContainer = document.querySelector('.galeria-container');
if (galeriaContainer) {
  for (let i = 1; i <= 30; i++) {
    const img = document.createElement('img');
    img.src = `imagens/${i}.jpg`;
    img.alt = `Foto ${i}`;
    galeriaContainer.appendChild(img);
  }
}

// ===== MÚSICA DE FUNDO COM BOTÃO DE CONTROLE =====
const musica = document.getElementById('musica-fundo');
const botaoMusica = document.createElement('button');
botaoMusica.textContent = '🔊 Pausar música';
botaoMusica.style.position = 'fixed';
botaoMusica.style.bottom = '20px';
botaoMusica.style.right = '20px';
botaoMusica.style.padding = '10px';
botaoMusica.style.zIndex = '999';
botaoMusica.style.borderRadius = '8px';
botaoMusica.style.border = 'none';
botaoMusica.style.background = '#4CAF50';
botaoMusica.style.color = 'white';
botaoMusica.style.cursor = 'pointer';
botaoMusica.style.boxShadow = '0 0 8px rgba(0,0,0,0.3)';

botaoMusica.addEventListener('click', () => {
  if (musica.paused) {
    musica.play();
    botaoMusica.textContent = '🔊 Pausar música';
  } else {
    musica.pause();
    botaoMusica.textContent = '🔈 Tocar música';
  }
});

document.body.appendChild(botaoMusica);
