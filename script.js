// ATIVA SCROLL SUAVE DOS BOTÕES
document.querySelectorAll('.menu-scroll button').forEach(btn => {
  btn.addEventListener('click', () => {
    const alvo = document.getElementById(btn.getAttribute('data-target'));
    if (alvo) alvo.scrollIntoView({ behavior: 'smooth' });
  });
});

// GALERIA AUTOMÁTICA
const galeria = document.getElementById("galeria-scroll");
for (let i = 1; i <= 30; i++) {
  const img = document.createElement("img");
  img.src = `imagens/${i}.jpeg`;
  img.alt = `Foto ${i}`;
  galeria.appendChild(img);
}

// CONTAGEM REGRESSIVA
function atualizarContagem() {
  const dataCasamento = new Date("2025-10-11T16:00:00");
  const agora = new Date();
  const diff = dataCasamento - agora;

  if (diff <= 0) {
    document.getElementById("contador").textContent = "É hoje! 💍";
    return;
  }

  const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diff / (1000 * 60)) % 60);
  const segundos = Math.floor((diff / 1000) % 60);

  document.getElementById("contador").textContent = 
    `${dias}d ${horas}h ${minutos}m ${segundos}s`;
}
setInterval(atualizarContagem, 1000);
atualizarContagem();

// FORMULÁRIO DE PRESENÇA
document.getElementById("form-presenca").addEventListener("submit", function(e) {
  e.preventDefault();
  const nome = document.getElementById("nome").value.trim();
  const acompanhantes = document.getElementById("acompanhantes").value.trim();
  if (nome === "") return;
  document.getElementById("agradecimento").textContent = `Obrigado por confirmar, ${nome}! 💚`;
  this.reset();
});

// COPIAR PIX SORTEIO
function copiarPix() {
  const pix = document.getElementById("pix");
  pix.select();
  document.execCommand("copy");
  alert("Chave Pix copiada!");
}

// BOTÃO DE ADICIONAR ACOMPANHANTES
document.getElementById("adicionar").addEventListener("click", () => {
  const novoCampo = document.createElement("input");
  novoCampo.type = "text";
  novoCampo.placeholder = "Nome do acompanhante";
  novoCampo.name = "acompanhante";
  document.getElementById("form-presenca").insertBefore(novoCampo, document.getElementById("adicionar"));
});

// PLAYLIST SPOTIFY
document.getElementById("spotify").addEventListener("click", () => {
  window.open("https://open.spotify.com/playlist/6ZvlROb4Kxgc6gorO99Bpy?si=0804e9afddb04aaf", "_blank");
});

// INSTAGRAM
document.getElementById("instaNoiva").addEventListener("click", () => {
  window.open("https://www.instagram.com/nathesilvaa/", "_blank");
});
document.getElementById("instaNoivo").addEventListener("click", () => {
  window.open("https://www.instagram.com/railon.q/", "_blank");
});

// MÚSICA DE FUNDO
window.onload = function() {
  const audio = new Audio("música/um-amor-puro.mp3.mp3");
  audio.volume = 0.4;
  audio.play().catch(() => {
    // Autoplay bloqueado, mostra botão ou instrução se quiser
    console.log("Autoplay bloqueado, interação necessária.");
  });
};
