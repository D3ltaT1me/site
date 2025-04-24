document.querySelectorAll('[data-target]').forEach(button => {
    button.addEventListener('click', () => {
      const modalId = button.getAttribute('data-target');
      const modal = document.getElementById(modalId);
      if (modal) modal.style.display = 'flex';
    });
  });

  // Close modal
  document.querySelectorAll('.closeModal').forEach(button => {
    button.addEventListener('click', () => {
      button.closest('.translucent_black').style.display = 'none';
    });
  });

  // Close when clicking outside the modal
  document.querySelectorAll('.translucent_black').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.style.display = 'none';
      }
    });
  });