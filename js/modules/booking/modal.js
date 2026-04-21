const MODAL_OPEN_CLASS = 'open';

function getModalOverlay() {
  return document.getElementById('modalOverlay');
}

function getSuccessOverlay() {
  return document.getElementById('successOverlay');
}

export function openModal() {
  const overlay = getModalOverlay();
  if (!overlay) return;
  overlay.classList.add(MODAL_OPEN_CLASS);
  document.body.style.overflow = 'hidden';
}

export function closeModal() {
  const overlay = getModalOverlay();
  if (!overlay) return;
  overlay.classList.remove(MODAL_OPEN_CLASS);
  document.body.style.overflow = '';
}

export function closeModalOutside(event) {
  const overlay = getModalOverlay();
  if (!overlay) return;
  if (event.target === overlay) {
    closeModal();
  }
}

export function closeSuccess() {
  const success = getSuccessOverlay();
  if (!success) return;
  success.style.display = 'none';
}

export function submitBooking() {
  alert('✨ Mulțumesc! Te voi contacta în 24 de ore pentru a confirma lectura ta. Stelele te așteaptă.');
  closeModal();
}

export function registerModalGlobals() {
  window.openModal = openModal;
  window.closeModal = closeModal;
  window.closeModalOutside = closeModalOutside;
  window.submitBooking = submitBooking;
  window.closeSuccess = closeSuccess;
}
