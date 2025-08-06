function atualizarContador() {
  const destino = new Date("2025-10-11T16:00:00").getTime();
  const agora = new Date().getTime();
  const distancia = destino - agora;

  const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

  const contador = document.getElementById("contador");
  contador.innerHTML = `${dias} dias, ${horas}h ${minutos}m ${segundos}s`;

  if (distancia < 0) {
    contador.innerHTML = "O grande dia chegou!";
  }
}

setInterval(atualizarContador, 1000);
