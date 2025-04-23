# -------------------------------------------------------
# Stage 1: Builder — compila tu Angular
# -------------------------------------------------------
    FROM node:18-alpine AS builder

    WORKDIR /app
    
    # 1. Instala sólo deps
    COPY package*.json ./
    RUN npm ci
    
    # 2. Copia el resto del código fuente
    COPY . .
    
    # 3. Construye la aplicación Angular (SSR o SPA)
    RUN npm install -g @angular/cli \
     && ng build --configuration production
    
    # -------------------------------------------------------
    # Stage 2: Runner — sirve los estáticos con Apache 2
    # -------------------------------------------------------
    FROM httpd:2.4-alpine
    
    # Directorio por defecto de Apache
    WORKDIR /usr/local/apache2/htdocs
    
    # Limpia cualquier contenido previo (opcional)
    RUN rm -rf ./*
    
    # Copia sólo la carpeta 'browser' desde el builder
    COPY --from=builder /app/dist/host-go-frontend/browser/ .
    
    # Exponemos el puerto 80
    EXPOSE 80
    
    # Usa el comando por defecto de httpd (httpd-foreground)
    