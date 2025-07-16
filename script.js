// Lokale Speicherung für Shortcuts
let shortcuts = JSON.parse(localStorage.getItem('shortcuts')) || [];
let editingIndex = -1;

// DOM-Elemente
const shortcutsGrid = document.getElementById('shortcutsGrid');
const addModal = document.getElementById('addModal');
const editModal = document.getElementById('editModal');
const shortcutForm = document.getElementById('shortcutForm');
const editForm = document.getElementById('editForm');

// Initialisierung
document.addEventListener('DOMContentLoaded', function() {
    loadShortcuts();
    setupEventListeners();
});

// Event Listeners
function setupEventListeners() {
    shortcutForm.addEventListener('submit', addShortcut);
    editForm.addEventListener('submit', updateShortcut);
    
    // Modal schließen bei Klick auf Backdrop
    document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
        backdrop.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal.id === 'addModal') closeAddModal();
            if (modal.id === 'editModal') closeEditModal();
        });
    });
}

// Shortcuts laden und anzeigen
function loadShortcuts() {
    shortcutsGrid.innerHTML = '';
    
    if (shortcuts.length === 0) {
        showEmptyState();
        return;
    }
    
    shortcuts.forEach((shortcut, index) => {
        const shortcutCard = createShortcutCard(shortcut, index);
        shortcutsGrid.appendChild(shortcutCard);
    });
}

// Shortcut-Karte erstellen
function createShortcutCard(shortcut, index) {
    const card = document.createElement('div');
    card.className = 'shortcut-card';
    card.style.setProperty('--card-color', shortcut.color);
    
    const iconClass = shortcut.icon || 'fas fa-link';
    
    card.innerHTML = `
        <div class="card-actions">
            <button class="card-action-btn" onclick="editShortcut(${index})" title="Bearbeiten">
                <i class="material-icons">edit</i>
            </button>
            <button class="card-action-btn delete" onclick="deleteShortcut(${index})" title="Löschen">
                <i class="material-icons">delete</i>
            </button>
        </div>
        <div class="shortcut-card-content">
            <div class="shortcut-icon">
                <i class="${iconClass}"></i>
            </div>
            <div class="shortcut-name">${escapeHtml(shortcut.name)}</div>
            <div class="shortcut-description">${escapeHtml(shortcut.description || '')}</div>
            <div class="shortcut-url">${escapeHtml(shortcut.url)}</div>
        </div>
    `;
    
    // Klick-Event für Navigation
    card.addEventListener('click', function(e) {
        if (!e.target.closest('.card-actions')) {
            window.open(shortcut.url, '_blank');
        }
    });
    
    return card;
}

// Leeren Zustand anzeigen
function showEmptyState() {
    shortcutsGrid.innerHTML = `
        <div class="empty-state">
            <i class="material-icons">bookmark_border</i>
            <h3>Keine Shortcuts vorhanden</h3>
            <p>Klicke auf den + Button um zu beginnen</p>
        </div>
    `;
}

// Modal-Funktionen
function openAddModal() {
    const modal = addModal;
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);
    document.getElementById('name').focus();
}

function closeAddModal() {
    const modal = addModal;
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
        shortcutForm.reset();
    }, 300);
}

function openEditModal() {
    const modal = editModal;
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);
    document.getElementById('editName').focus();
}

function closeEditModal() {
    const modal = editModal;
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
        editForm.reset();
        editingIndex = -1;
    }, 300);
}

// Shortcut hinzufügen
function addShortcut(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const url = document.getElementById('url').value.trim();
    const icon = document.getElementById('icon').value.trim();
    const description = document.getElementById('description').value.trim();
    const color = document.getElementById('color').value;
    
    if (!name || !url) {
        alert('Name und URL sind erforderlich!');
        return;
    }
    
    // URL validieren und korrigieren
    let validUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        validUrl = 'https://' + url;
    }
    
    const shortcut = {
        name,
        url: validUrl,
        icon,
        description,
        color
    };
    
    shortcuts.push(shortcut);
    saveShortcuts();
    loadShortcuts();
    closeAddModal();
    
    // Material Design Snackbar
    showNotification('Shortcut hinzugefügt!');
}

// Shortcut bearbeiten
function editShortcut(index) {
    editingIndex = index;
    const shortcut = shortcuts[index];
    
    document.getElementById('editName').value = shortcut.name;
    document.getElementById('editUrl').value = shortcut.url;
    document.getElementById('editIcon').value = shortcut.icon || '';
    document.getElementById('editDescription').value = shortcut.description || '';
    document.getElementById('editColor').value = shortcut.color;
    
    openEditModal();
}

// Shortcut aktualisieren
function updateShortcut(e) {
    e.preventDefault();
    
    if (editingIndex === -1) return;
    
    const name = document.getElementById('editName').value.trim();
    const url = document.getElementById('editUrl').value.trim();
    const icon = document.getElementById('editIcon').value.trim();
    const description = document.getElementById('editDescription').value.trim();
    const color = document.getElementById('editColor').value;
    
    if (!name || !url) {
        alert('Name und URL sind erforderlich!');
        return;
    }
    
    // URL validieren und korrigieren
    let validUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        validUrl = 'https://' + url;
    }
    
    shortcuts[editingIndex] = {
        name,
        url: validUrl,
        icon,
        description,
        color
    };
    
    saveShortcuts();
    loadShortcuts();
    closeEditModal();
    
    showNotification('Shortcut aktualisiert!');
}

// Shortcut löschen
function deleteShortcut(index) {
    if (confirm('Möchtest du diesen Shortcut wirklich löschen?')) {
        shortcuts.splice(index, 1);
        saveShortcuts();
        loadShortcuts();
        showNotification('Shortcut gelöscht!');
    }
}

// Shortcuts speichern
function saveShortcuts() {
    localStorage.setItem('shortcuts', JSON.stringify(shortcuts));
}

// HTML escapen
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Benachrichtigung anzeigen (Material Design Snackbar)
function showNotification(message) {
    const snackbar = document.getElementById('snackbar');
    const textElement = snackbar.querySelector('.snackbar-text');
    
    textElement.textContent = message;
    snackbar.classList.add('show');
    
    setTimeout(() => {
        snackbar.classList.remove('show');
    }, 3000);
}.transform = 'translateY(0)';
    }, 100);
    
    // Entfernen
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Keyboard-Shortcuts
document.addEventListener('keydown', function(e) {
    // Strg/Cmd + Enter zum Hinzufügen
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        openAddModal();
    }
    
    // Escape zum Schließen der Modals
    if (e.key === 'Escape') {
        closeAddModal();
        closeEditModal();
    }
});

// Beispiel-Shortcuts für neue Nutzer
function addExampleShortcuts() {
    if (shortcuts.length === 0) {
        shortcuts = [
            {
                name: 'Google',
                url: 'https://www.google.com',
                icon: 'fab fa-google',
                description: 'Die beliebteste Suchmaschine',
                color: '#4285f4'
            },
            {
                name: 'GitHub',
                url: 'https://github.com',
                icon: 'fab fa-github',
                description: 'Code-Hosting und Versionskontrolle',
                color: '#333'
            },
            {
                name: 'YouTube',
                url: 'https://youtube.com',
                icon: 'fab fa-youtube',
                description: 'Video-Plattform',
                color: '#ff0000'
            },
            {
                name: 'Material Design',
                url: 'https://material.io',
                icon: 'fas fa-palette',
                description: 'Google\'s Design System',
                color: '#2196F3'
            }
        ];
        saveShortcuts();
        loadShortcuts();
    }
}

// Prüfen ob Beispiele hinzugefügt werden sollen
if (shortcuts.length === 0 && localStorage.getItem('hasVisited') !== 'true') {
    localStorage.setItem('hasVisited', 'true');
    setTimeout(() => {
        if (confirm('Möchtest du ein paar Beispiel-Shortcuts hinzufügen?')) {
            addExampleShortcuts();
        }
    }, 1000);
}
