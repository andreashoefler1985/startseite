document.addEventListener('DOMContentLoaded', function () {
    const openButtons = document.querySelectorAll('[data-open-add]');
    const closeButtons = document.querySelectorAll('[data-close-add]');
    const modal = document.getElementById('addModal');

    openButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            if (modal) {
                modal.classList.add('show');
            }
        });
    });

    closeButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            if (modal) {
                modal.classList.remove('show');
            }
        });
    });
}
