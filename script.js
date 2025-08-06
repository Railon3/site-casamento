// Toggle menu dropdown
const menuToggleBtn = document.getElementById('menu-toggle');
const menuDropdown = document.getElementById('menu-dropdown');

menuToggleBtn.addEventListener('click', () => {
  menuDropdown.classList.toggle('menu-visivel');
});

// Fecha menu ao clicar fora
document.addEventListener('click', (e) => {
  if (!menuDropdown.contains(e.target) && e.target !== menuToggleBtn) {
    menuDropdown.classList.remove('menu-visivel');
  }
});

// Temporizador de contagem regressiva
function atualizarTemporizador() {
  const destino = dayjs('2025-10-11T15:00:00');
  const agora = dayjs();
  const diff = destino.diff(agora);
  if (diff <= 0) {
    document.querySelector('.temporizador-container').textContent = 'O grande dia chegou!';
    clearInterval(intervaloTemporizador);
    return;
  }

  const duracao = dayjs.duration(diff);

  const dias = duracao.days();
  const horas = duracao.hours();
  const minutos = duracao.minutes();
  const segundos = duracao.seconds();

  const texto = `${dias}d ${horas}h ${minutos}m ${segundos}s`;
  document.querySelector('.temporizador-container').textContent = texto;
}
const intervaloTemporizador = setInterval(atualizarTemporizador, 1000);
atualizarTemporizador();

// Galeria - abrir modal da imagem clicada
const galeriaContainer = document.querySelector('.galeria-container');
const modalFoto = document.getElementById('modal-foto');
const modalImagem = modalFoto.querySelector('img');

function abrirModal(imagemSrc) {
  modalImagem.src = imagemSrc;
  modalFoto.classList.add('mostrar');
  document.body.style.overflow = 'hidden'; // trava scroll ao abrir
}

function fecharModal() {
  modalFoto.classList.remove('mostrar');
  document.body.style.overflow = '';
}

modalFoto.addEventListener('click', fecharModal);

// Criar imagens da galeria dinamicamente (1.jpeg até 30.jpeg)
for (let i = 1; i <= 30; i++) {
  const img = document.createElement('img');
  img.src = `imagens/${i}.jpeg`;
  img.alt = `Foto ${i}`;
  img.tabIndex = 0;
  img.addEventListener('click', () => abrirModal(img.src));
  galeriaContainer.appendChild(img);
}

// Formulário presença com acompanhantes
const formPresenca = document.getElementById('form-presenca');
const acompanhantesContainer = document.getElementById('acompanhantes-container');
const botaoAdicionar = document.getElementById('adicionar-acompanhante');
const respostaPresenca = document.getElementById('resposta-presenca');

botaoAdicionar.addEventListener('click', () => {
  const inputNovo = document.createElement('input');
  inputNovo.type = 'text';
  inputNovo.name = 'acompanhantes[]';
  inputNovo.placeholder = 'Nome do acompanhante';
  acompanhantesContainer.appendChild(inputNovo);
  inputNovo.focus();
});

formPresenca.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nomePrincipal = formPresenca.querySelector('input[name="nome"]').value.trim();
  if (!nomePrincipal) {
    respostaPresenca.textContent = 'Por favor, preencha seu nome.';
    return;
  }

  const acompanhantesInputs = acompanhantesContainer.querySelectorAll('input[name="acompanhantes[]"]');
  const acompanhantes = [];
  acompanhantesInputs.forEach(input => {
    if (input.value.trim()) {
      acompanhantes.push(input.value.trim());
    }
  });

  const dados = {
    nome: nomePrincipal,
    acompanhantes
  };

  try {
    const resposta = await fetch('https://script.google.com/macros/s/AKfycbxUCpRiKYV4tNvIKJJGzInarCCGrg6Dg1InOTPNfdQm7WS6pibPXunP8eJ6TEmJ76Mkjg/exec', {
      method: 'POST',
      mode: 'cors',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(dados)
    });

    if (resposta.ok) {
      respostaPresenca.style.color = '#a9ba9d';
      respostaPresenca.textContent = `Obrigado, ${nomePrincipal}! Sua confirmação foi registrada.`;
      formPresenca.reset();
      acompanhantesContainer.innerHTML = ''; // limpa acompanhantes
    } else {
      throw new Error('Falha ao enviar confirmação.');
    }
  } catch (error) {
    respostaPresenca.style.color = 'salmon';
    respostaPresenca.textContent = 'Erro ao enviar confirmação. Tente novamente mais tarde.';
    console.error(error);
  }
});
