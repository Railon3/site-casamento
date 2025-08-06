// Temporizador
const destino = new Date("2025-10-11T11:00:00-0300").getTime();
const contador = setInterval(() => {
  const agora = new Date().getTime();
  const distancia = destino - agora;

  if (distancia < 0) {
    document.getElementById("temporizador").innerHTML = "É hoje!";
    clearInterval(contador);
    return;
  }

  const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

  document.getElementById("temporizador").innerHTML = `${dias}d ${horas}h ${minutos}m ${segundos}s`;
}, 1000);

// Adicionar campos no formulário
function adicionarConvidado() {
  const container = document.getElementById("nomes-container");
  const input = document.createElement("input");
  input.type = "text";
  input.name = "nome[]";
  input.placeholder = "Nome do convidado";
  container.appendChild(input);
}

// Galeria dinâmica
window.addEventListener("DOMContentLoaded", () => {
  const galeria = document.querySelector(".galeria-container");
  for (let i = 1; i <= 30; i++) {
    const img = document.createElement("img");
    img.src = `imagens/${i}.jpeg`;
    img.alt = `Foto ${i}`;
    img.onclick = () => {
      const popup = document.createElement("div");
      popup.style.position = "fixed";
      popup.style.top = 0;
      popup.style.left = 0;
      popup.style.width = "100%";
      popup.style.height = "100%";
      popup.style.background = "rgba(0,0,0,0.8)";
      popup.style.display = "flex";
      popup.style.alignItems = "center";
      popup.style.justifyContent = "center";
      popup.style.zIndex = 999;
      const imagem = document.createElement("img");
      imagem.src = img.src;
      imagem.style.maxWidth = "90%";
      imagem.style.maxHeight = "90%";
      popup.appendChild(imagem);
      popup.onclick = () => popup.remove();
      document.body.appendChild(popup);
    };
    galeria.appendChild(img);
  }
});

// Confirmação (simples simulação)
document.getElementById("form-presenca").addEventListener("submit", function (e) {
  e.preventDefault();
  const nomes = [...this.querySelectorAll("input[name='nome[]']")].map(el => el.value).filter(Boolean);
  if (nomes.length > 0) {
    document.getElementById("mensagem-confirmacao").innerText = `Obrigado, ${nomes.join(", ")}! Sua presença foi confirmada!`;
  }
});
