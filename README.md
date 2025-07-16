# URL-Shortcut Dashboard

Eine einfache, selbst-gehostete Startseite für deine wichtigsten URLs - ähnlich wie Heimdall.

## Features

- 🚀 **Einfach zu bedienen**: Intuitives Interface zum Hinzufügen und Verwalten von Shortcuts
- 🎨 **Anpassbar**: Individuelle Icons, Farben und Beschreibungen für jeden Shortcut
- 📱 **Responsive**: Funktioniert auf Desktop, Tablet und Smartphone
- 💾 **Lokale Speicherung**: Alle Daten werden im Browser gespeichert (localStorage)
- 🐳 **Docker-Ready**: Läuft in einem schlanken nginx-Container
- ✨ **Moderne UI**: Schönes, modernes Design mit Hover-Effekten

## Schnellstart

### 1. Dateien erstellen

Erstelle einen neuen Ordner für dein Dashboard:

```bash
mkdir url-dashboard
cd url-dashboard
```

Erstelle die folgenden Dateien mit dem Inhalt aus den Artifacts:

- `Dockerfile`
- `index.html`
- `style.css`
- `script.js`
- `docker-compose.yml`

### 2. Docker Container starten

```bash
# Container bauen und starten
docker-compose up -d

# Oder mit Docker direkt:
docker build -t url-dashboard .
docker run -d -p 8080:80 --name dashboard url-dashboard
```

### 3. Dashboard aufrufen

Öffne deinen Browser und gehe zu:
- `http://localhost:8080`

## Benutzung

### Shortcuts hinzufügen

1. Klicke auf "Shortcut hinzufügen"
2. Fülle die Felder aus:
   - **Name**: Anzeigename für den Shortcut
   - **URL**: Die Ziel-URL (http/https wird automatisch ergänzt)
   - **Icon**: Font Awesome Icon-Klasse (z.B. `fab fa-github`)
   - **Beschreibung**: Kurze Beschreibung (optional)
   - **Farbe**: Akzentfarbe für die Karte

### Shortcuts bearbeiten

- Fahre mit der Maus über eine Karte
- Klicke auf das Bearbeiten-Symbol (Stift)
- Ändere die gewünschten Werte

### Shortcuts löschen

- Fahre mit der Maus über eine Karte
- Klicke auf das Löschen-Symbol (Mülleimer)
- Bestätige das Löschen

## Keyboard Shortcuts

- `Ctrl/Cmd + Enter`: Neuen Shortcut hinzufügen
- `Escape`: Modal schließen

## Anpassung

### Icons

Das Dashboard nutzt Font Awesome Icons. Hier einige Beispiele:

- `fab fa-google` - Google
- `fab fa-github` - GitHub
- `fab fa-youtube` - YouTube
- `fas fa-envelope` - E-Mail
- `fas fa-home` - Home
- `fas fa-cloud` - Cloud
- `fas fa-database` - Datenbank

Weitere Icons findest du auf [fontawesome.com](https://fontawesome.com/icons)

### Farben

Die Farben können über den Colorpicker im Modal angepasst werden. Jede Karte kann eine individuelle Akzentfarbe haben.

### Styling

Das CSS kann in `style.css` angepasst werden. Das Design nutzt:
- CSS Grid für das Layout
- CSS Custom Properties für Farben
- Moderne CSS-Features wie backdrop-filter

## Daten-Persistenz

Die Shortcut-Daten werden im localStorage des Browsers gespeichert. Das bedeutet:

- ✅ Deine Daten bleiben auch nach Browser-Neustart erhalten
- ✅ Keine externe Datenbank erforderlich
- ⚠️ Daten sind browserspezifisch (andere Browser = andere Daten)
- ⚠️ Beim Löschen der Browser-Daten gehen die Shortcuts verloren

### Backup erstellen

Du kannst deine Shortcuts exportieren:

```javascript
// In der Browser-Konsole ausführen
console.log(JSON.stringify(
