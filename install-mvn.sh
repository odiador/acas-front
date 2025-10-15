#!/bin/bash

# Script para instalar el comando 'mvn' globalmente
# Uso: ./install-mvn.sh

set -e

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Verificar si estamos en el directorio correcto
if [ ! -f "Dockerfile.maven" ] || [ ! -f "mvn" ]; then
    print_error "Ejecuta este script desde el directorio raíz del proyecto (donde está Dockerfile.maven)"
    exit 1
fi

# Verificar si Docker está disponible
if ! command -v docker &> /dev/null; then
    print_error "Docker no está instalado. Instala Docker primero."
    exit 1
fi

print_info "Instalando comando 'mvn' globalmente..."

# Crear enlace simbólico en /usr/local/bin
TARGET="/usr/local/bin/mvn"
SOURCE="$(pwd)/mvn"

# Verificar si ya existe
if [ -L "$TARGET" ]; then
    print_warning "El comando 'mvn' ya existe. Sobrescribiendo..."
    sudo rm "$TARGET"
elif [ -f "$TARGET" ]; then
    print_warning "Ya existe un archivo 'mvn' en /usr/local/bin. Respaldando..."
    sudo mv "$TARGET" "${TARGET}.backup"
fi

# Crear enlace simbólico
sudo ln -s "$SOURCE" "$TARGET"

print_success "Comando 'mvn' instalado exitosamente"

# Probar la instalación
print_info "Probando instalación..."
if mvn --version &>/dev/null; then
    print_success "¡El comando 'mvn' funciona correctamente!"
    print_info "Ahora puedes usar 'mvn' en cualquier directorio del proyecto"
else
    print_error "Hubo un problema con la instalación"
    exit 1
fi

echo
print_info "Uso:"
echo "  mvn --version          # Ver versión"
echo "  mvn clean compile      # Compilar"
echo "  mvn test               # Ejecutar tests"
echo "  mvn clean install      # Instalar dependencias"
echo
print_info "El comando funciona en cualquier directorio que contenga un pom.xml"