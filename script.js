function openAddModal() {
    const modal = document.getElementById('addModal');
    if (modal) {
        modal.classList.add('show');
    }
}

function closeAddModal() {
    const modal = document.getElementById('addModal');
    if (modal) {
        modal.classList.remove('show');
    }
}

function openEditModal() {
    const modal = document.getElementById('editModal');
    if (modal) {
        modal.classList.add('show');
    }
}

function closeEditModal() {
    const modal = document.getElementById('editModal');
    if (modal) {
        modal.classList.remove('show');
    }
}

// Optional: Snackbar Funktion
function showSnackbar(message) {
    const snackbar = document.getElementById('snackbar');
    if (!snackbar) return;
    snackbar.querySelector('.snackbar-text').textContent = message;
    snackbar.classList.add('show');
    setTimeout(() => {
        snackbar.classList.remove('show');
    }, 3000);
}
