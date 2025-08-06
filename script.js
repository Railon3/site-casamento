// Temporizador para 11 de outubro de 2025
function atualizarContador() {
  const fimCasamento = new Date('2025-10-11T15:00:00');
  const agora = new Date();
  const diff = fimCasamento - agora;

  if (diff <= 0) {
    document.getElementById('clock').textContent = 'Já casamos! 🎉';
    clearInterval(intervalo);
    return;
  }

  const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diff / (1000 * 60)) % 60);
  const segundos = Math.floor((diff / 1000) % 60);

  document.getElementById('clock').textContent =
    `${dias}d ${horas}h ${minutos}m ${segundos}s`;
}
const intervalo = setInterval(atualizarContador, 1000);
atualizarContador();

// Modal da galeria
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalClose = document.getElementById('modal-close');

function abrirModal(src) {
  modal.style.display = 'block';
  modalImg.src = src;
}
modalClose.onclick = () => {
  modal.style.display = 'none';
};
window.onclick = (e) => {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
};

// Adicionar campos acompanhantes no formulário
const btnAdd = document.getElementById('btn-add');
const acompanhantesDiv = document.getElementById('acompanhantes');

btnAdd.addEventListener('click', () => {
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Nome do acompanhante';
  input.name = 'acompanhante';
  input.required = true;
  acompanhantesDiv.appendChild(input);
});

// Envio para Google Sheets via fetch API
const form = document.getElementById('confirmar-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const nomePrincipal = form.elements['nome'].value.trim();
  if (!nomePrincipal) {
    alert('Por favor, insira seu nome.');
    return;
  }

  const acompanhantes = [];
  const inputs = acompanhantesDiv.querySelectorAll('input[name="acompanhante"]');
  inputs.forEach(input => {
    if (input.value.trim()) acompanhantes.push(input.value.trim());
  });

  const data = {
    nome: nomePrincipal,
    acompanhantes: acompanhantes.join(', ')
  };

  fetch('https://script.google.com/macros/s/AKfycbxUCpRiKYV4tNvIKJJGzInarCCGrg6Dg1InOTPNfdQm7WS6pibPXunP8eJ6TEmJ76Mkjg/exec', {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(() => {
    alert(`Obrigado, ${nomePrincipal}! Sua confirmação foi recebida.`);
    form.reset();
    acompanhantesDiv.innerHTML = ''; // limpa acompanhantes extras
  }).catch(() => {
    alert('Houve um erro ao enviar sua confirmação. Por favor, tente novamente.');
  });
});
