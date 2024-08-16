# Script: BuildAndPushDockerImage.ps1
# Descripción: Este script construye, etiqueta y pushea imágenes de Docker a Docker Hub. 
# Puede actualizar el tag "latest" y manejar etiquetas como "alpha" o "beta".
# 
# Uso:
#   1. Construir y etiquetar una imagen como "alpha":
#      ./BuildAndPushDockerImage.ps1 --version v0.0.4 -a --build
#
#   2. Construir, etiquetar como "beta", actualizar "latest", y pushear:
#      ./BuildAndPushDockerImage.ps1 --version v0.0.4 -b --latest --build --push
#
#   3. Construir y pushear sin actualizar "latest":
#      ./BuildAndPushDockerImage.ps1 --version v0.0.4 --build --push

param(
    [string]$version,
    [switch]$alpha,
    [switch]$beta,
    [switch]$latest,
    [switch]$build,
    [switch]$push
)

# Verificar si se proporcionó una versión
if (-not $version) {
    Write-Host "Por favor, proporciona un valor para la versión utilizando --version."
    exit 1
}

# Definir el nombre base de la imagen
$imageName = "ixyz0/learnhorizon-backend-app"

# Construir la imagen si se proporciona la flag --build
if ($build) {
    # Construir la imagen con el tag de versión
    docker build -t "${imageName}:$version" .
    Write-Host "Imagen construida con el tag $version."
}

# Etiquetar como alpha si se proporciona la flag -a
if ($alpha) {
    docker tag "${imageName}:$version" "${imageName}:$version-alpha"
    Write-Host "Imagen etiquetada como $version-alpha."
}

# Etiquetar como beta si se proporciona la flag -b
if ($beta) {
    docker tag "${imageName}:$version" "${imageName}:$version-beta"
    Write-Host "Imagen etiquetada como $version-beta."
}

# Actualizar el tag latest si se proporciona la flag --latest
if ($latest) {
    docker tag "${imageName}:$version" "$imageName:latest"
    Write-Host "Imagen etiquetada como latest."
}

# Pushear la imagen a Docker Hub si se proporciona la flag --push
if ($push) {
    docker push "${imageName}:${version}"
    Write-Host "Imagen $version pusheada a Docker Hub."

    if ($alpha) {
        docker push "${imageName}:$version-alpha"
        Write-Host "Imagen $version-alpha pusheada a Docker Hub."
    }

    if ($beta) {
        docker push "${imageName}:$version-beta"
        Write-Host "Imagen $version-beta pusheada a Docker Hub."
    }

    if ($latest) {
        docker push "$imageName:latest"
        Write-Host "Imagen latest pusheada a Docker Hub."
    }
}

Write-Host "Proceso completado."
