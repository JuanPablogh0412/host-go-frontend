# Stage 1: build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx ng build --configuration production

# Stage 2: serve with Apache + mod_rewrite
FROM httpd:2.4-alpine
# Habilita mod_rewrite y permite .htaccess
RUN sed -i '/LoadModule rewrite_module/s/^#//g' /usr/local/apache2/conf/httpd.conf \
    && sed -i '/<Directory "\/usr\/local\/apache2\/htdocs">/,/<\/Directory>/ s/AllowOverride None/AllowOverride All/' /usr/local/apache2/conf/httpd.conf

WORKDIR /usr/local/apache2/htdocs
RUN rm -rf ./*
COPY --from=builder /app/dist/host-go-frontend/browser/ .
COPY .htaccess .

EXPOSE 80
CMD ["httpd-foreground"]
