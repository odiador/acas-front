# Comando Maven con Docker

Este proyecto incluye un comando `mvn` que usa Docker para ejecutar Maven sin necesidad de instalarlo localmente.

## Instalación

Ejecuta el script de instalación:

```bash
./install-mvn.sh
```

Esto instala el comando `mvn` globalmente en tu sistema.

## Uso

Después de la instalación, puedes usar `mvn` exactamente como si estuviera instalado nativamente:

```bash
# En cualquier directorio con pom.xml
mvn --version
mvn clean compile
mvn test
mvn package
mvn clean install
```

## Para el proyecto notiorchestrator

```bash
# Ir al directorio del proyecto Java
cd notiorchestrator

# Usar Maven normalmente
mvn clean test
mvn clean package
```

## Características

- **Comando nativo**: Se comporta exactamente como `mvn` instalado localmente
- **Maven 3.8.6 + OpenJDK 11**: Versión estable y compatible
- **Cache persistente**: El repositorio `.m2` se mantiene entre ejecuciones
- **Red host**: Acceso completo a la red del host
- **Usuario actual**: Ejecuta con tus permisos de usuario
- **Auto-construcción**: La imagen se construye automáticamente la primera vez

## Primera ejecución

La primera vez que uses `mvn`, Docker construirá la imagen automáticamente:

```bash
$ mvn --version
Construyendo imagen Maven... (solo la primera vez)
✅ Imagen construida exitosamente
Apache Maven 3.8.6 (...)
```

## Archivos

- `Dockerfile.maven`: Definición del contenedor con Maven
- `mvn`: Script que simula el comando `mvn` nativo
- `install-mvn.sh`: Script de instalación
- `mvn-docker.sh`: Script alternativo (no requiere instalación global)

## Desinstalación

Para remover el comando global:

```bash
sudo rm /usr/local/bin/mvn
```

## Solución de problemas

### Error de permisos
Si tienes problemas de permisos con Docker:

```bash
# Agregar usuario al grupo docker
sudo usermod -aG docker $USER
# Reiniciar sesión
```

### Limpiar cache
Para forzar reconstrucción de la imagen:

```bash
docker rmi retos-maven
mvn --version  # Reconstruirá automáticamente
```

### Ver logs detallados
Para debugging, ejecuta Docker directamente:

```bash
docker run --rm -v "$(pwd):/workspace" -w /workspace retos-maven mvn --version
```