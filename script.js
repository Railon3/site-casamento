// ===== CONSTANTES E VARIÁVEIS GLOBAIS =====
const WEDDING_DATE = new Date('2025-10-11T20:00:00-03:00');
const CONFIRMATION_FORM_ID = 'rsvp-form';
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxUCpRiKYV4tNvIKJJGzInarCCGrg6Dg1InOTPNfdQm7WS6pibPXunP8eJ6TEmJ76Mkjg/exec';

// ===== CONTADOR REGRESSIVO =====
function updateCountdown() {
  const now = new Date();
  const diff = WEDDING_DATE - now;
  
  const timerElement = document.getElementById('timer');
  
  if (diff <= 0) {
    timerElement.innerHTML = '<span class="highlight">O grande dia chegou!</span> 🎉';
    clearInterval(countdownInterval);
    return;
  }

  const { days, hours, minutes, seconds } = calculateTimeUnits(diff);
  
  timerElement.innerHTML = `
    <div class="countdown-unit">
      <span class="countdown-value">${days}</span>
      <span class="countdown-label">dias</span>
    </div>
    <div class="countdown-unit">
      <span class="countdown-value">${hours}</span>
      <span class="countdown-label">horas</span>
    </div>
    <div class="countdown-unit">
      <span class="countdown-value">${minutes}</span>
      <span class="countdown-label">min</span>
    </div>
    <div class="countdown-unit">
      <span class="countdown-value">${seconds}</span>
      <span class="countdown-label">seg</span>
    </div>
  `;
}

function calculateTimeUnits(ms) {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24;
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  
  return { days, hours, minutes, seconds };
}

const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown(); // Executa imediatamente

// ===== GALERIA DE FOTOS =====
function initGallery() {
  const galleryImages = document.querySelectorAll('.gallery img');
  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-image');
  const closeModal = document.querySelector('.modal-close');

  function openModal(e) {
    e.preventDefault();
    modalImg.src = this.src;
    modalImg.alt = this.alt;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeGalleryModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  galleryImages.forEach(img => {
    img.addEventListener('click', openModal);
  });

  closeModal.addEventListener('click', closeGalleryModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeGalleryModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeGalleryModal();
  });
}

// ===== FORMULÁRIO DE CONFIRMAÇÃO =====
function initRSVPForm() {
  const form = document.getElementById(CONFIRMATION_FORM_ID);
  const guestsContainer = document.getElementById('guests-container');
  const addGuestBtn = document.getElementById('add-guest');
  const confirmationMessage = document.getElementById('confirmation-message');

  function addGuestField() {
    const guestField = document.createElement('div');
    guestField.className = 'guest-field';
    guestField.innerHTML = `
      <input type="text" name="guest[]" placeholder="Nome do acompanhante" required>
      <button type="button" class="remove-guest" aria-label="Remover acompanhante">×</button>
    `;
    guestsContainer.appendChild(guestField);
    
    // Adiciona evento ao botão de remover
    guestField.querySelector('.remove-guest').addEventListener('click', () => {
      guestField.remove();
    });
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(form);
    const mainGuest = formData.get('name');
    const guests = formData.getAll('guest[]').filter(name => name.trim() !== '');
    
    if (!mainGuest.trim()) {
      showConfirmationMessage('Por favor, insira seu nome.', false);
      return;
    }

    submitConfirmation(mainGuest, guests);
  }

  function submitConfirmation(mainGuest, guests) {
    const payload = {
      timestamp: new Date().toISOString(),
      main_guest: mainGuest,
      guests: guests,
      total_guests: 1 + guests.length
    };

    fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: JSON.stringify(payload)
    })
    .then(() => {
      showConfirmationMessage(`Obrigado, ${mainGuest}! Confirmação recebida para ${payload.total_guests} pessoa(s).`, true);
      form.reset();
      guestsContainer.innerHTML = '';
    })
    .catch(() => {
      showConfirmationMessage('Erro ao enviar. Por favor, tente novamente.', false);
    });
  }

  function showConfirmationMessage(message, isSuccess) {
    confirmationMessage.textContent = message;
    confirmationMessage.className = isSuccess ? 'success' : 'error';
    confirmationMessage.style.display = 'block';
    
    setTimeout(() => {
      confirmationMessage.style.opacity = '0';
      setTimeout(() => {
        confirmationMessage.style.display = 'none';
        confirmationMessage.style.opacity = '1';
      }, 300);
    }, 3000);
  }

  // Event listeners
  addGuestBtn.addEventListener('click', addGuestField);
  form.addEventListener('submit', handleFormSubmit);
}

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
  initGallery();
  initRSVPForm();
  
  // Carrega as imagens da galeria dinamicamente
  loadGalleryImages();
});

// ===== CARREGAMENTO DINÂMICO DAS IMAGENS =====
async function loadGalleryImages() {
  try {
    const response = await fetch('assets/data/gallery.json'); // Arquivo com os paths das imagens
    const images = await response.json();
    
    const galleryContainer = document.querySelector('.gallery');
    galleryContainer.innerHTML = images.map(img => `
      <img src="${img.src}" alt="${img.alt}" loading="lazy">
    `).join('');
    
    // Re-inicializa a galeria após carregar as imagens
    initGallery();
  } catch (error) {
    console.error('Erro ao carregar galeria:', error);
  }
}
