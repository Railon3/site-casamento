// Botão do menu superior
function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.classList.toggle("hidden");
}

// Temporizador
const dataCasamento = new Date("2025-10-10T15:30:00-03:00").getTime();
setInterval(() => {
  const agora = new Date().getTime();
  const distancia = dataCasamento - agora;

  const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

  document.getElementById("dias").textContent = dias;
  document.getElementById("horas").textContent = horas;
  document.getElementById("minutos").textContent = minutos;
  document.getElementById("segundos").textContent = segundos;
}, 1000);

// Adicionar acompanhantes
function adicionarAcompanhante() {
  const div = document.createElement("div");
  div.innerHTML = `<input type="text" name="acompanhante" placeholder="Nome do acompanhante" />`;
  document.getElementById("acompanhantes").appendChild(div);
}

// Enviar para Google Sheets
document.getElementById("form-presenca").addEventListener("submit", async function (e) {
  e.preventDefault();

  const nome = this.nome.value.trim();
  const acompanhantes = Array.from(this.querySelectorAll("input[name='acompanhante']"))
    .map(input => input.value.trim())
    .filter(val => val !== "");

  const formData = new FormData();
  formData.append("nome", nome);
  formData.append("acompanhantes", acompanhantes.join(", "));

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbxUCpRiKYV4tNvIKJJGzInarCCGrg6Dg1InOTPNfdQm7WS6pibPXunP8eJ6TEmJ76Mkjg/exec", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      document.getElementById("mensagem-envio").textContent = "Presença confirmada com sucesso!";
      this.reset();
      document.getElementById("acompanhantes").innerHTML = "";
    } else {
      document.getElementById("mensagem-envio").textContent = "Erro ao enviar. Tente novamente.";
    }
  } catch (error) {
    document.getElementById("mensagem-envio").textContent = "Erro de conexão.";
  }
});

// Galeria - Lightbox
function expandirImagem(el) {
  const lightbox = document.getElementById("lightbox");
  const imgExpandida = document.getElementById("imagem-expandida");
  imgExpandida.src = el.querySelector("img").src;
  lightbox.style.display = "flex";
}

function fecharImagem() {
  document.getElementById("lightbox").style.display = "none";
}
