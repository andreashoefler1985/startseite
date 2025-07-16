document.addEventListener('DOMContentLoaded', () => {
  // Öffnen
  document.querySelectorAll('[data-open-add]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.getElementById('addModal')?.classList.add('show');
    });
  });

  // Schließen
  document.querySelectorAll('[data-close-add]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.getElementById('addModal')?.classList.remove('show');
    });
  });
});
