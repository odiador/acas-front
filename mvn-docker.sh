#!/bin/bash

# Script para ejecutar Maven usando Docker
# Uso: ./mvn-docker.sh [comando maven]

set -e

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para imprimir mensajes coloreados
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

# Verificar si Docker está instalado y corriendo
check_docker() {
    if ! command -v docker &> /dev/null; then
        print_error "Docker no está instalado"
        exit 1
    fi

    if ! docker info &> /dev/null; then
        print_error "Docker no está corriendo"
        exit 1
    fi
}

# Construir la imagen si no existe
build_image() {
    if ! docker images | grep -q "retos-maven"; then
        print_info "Construyendo imagen Docker con Maven..."
        docker build -f Dockerfile.maven -t retos-maven .
        print_success "Imagen construida exitosamente"
    fi
}

# Función principal
main() {
    check_docker
    build_image

    # Obtener el directorio actual absoluto
    WORKDIR="$(pwd)"
    print_info "Directorio de trabajo: $WORKDIR"

    # Si no se pasan argumentos, mostrar ayuda
    if [ $# -eq 0 ]; then
        print_info "Uso: $0 [comando maven]"
        print_info "Ejemplos:"
        print_info "  $0 clean compile"
        print_info "  $0 test"
        print_info "  $0 package"
        print_info "  $0 clean install"
        print_info "  $0 --version"
        exit 0
    fi

    # Ejecutar Maven con Docker
    print_info "Ejecutando: mvn $@"
    docker run --rm \
        -v "$WORKDIR:/workspace" \
        -v "$HOME/.m2:/home/mavenuser/.m2" \
        -w /workspace \
        --network host \
        retos-maven \
        mvn "$@"

    print_success "Comando completado"
}

# Ejecutar función principal
main "$@"