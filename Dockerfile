FROM nginx:alpine

# Kopiere die HTML-Dateien in das nginx-Verzeichnis
COPY index.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/

# Setze die richtigen Berechtigungen
RUN chmod -R 755 /usr/share/nginx/html

# Expose Port 80
EXPOSE 80

# Starte nginx
CMD ["nginx", "-g", "daemon off;"]
