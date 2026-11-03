import { filters } from './filters.js'
const previews = {
  drama: {
    blur: 0,
    brightness: 110,
    contrast: 130,
    grayscale: 10,
    'hue-rotate': 0,
    invert: 0,
    opacity: 100,
    sepia: 0,
    saturate: 120,
  },
  vintage: {
    blur: 0,
    brightness: 90,
    contrast: 110,
    grayscale: 10,
    'hue-rotate': 15,
    invert: 0,
    opacity: 100,
    sepia: 0,
    saturate: 80,
  },
  sepiaTone: {
    blur: 0,
    brightness: 100,
    contrast: 95,
    grayscale: 0,
    'hue-rotate': 0,
    invert: 0,
    opacity: 100,
    sepia: 75,
    saturate: 90,
  },
  grayscale: {
    blur: 0,
    brightness: 100,
    contrast: 100,
    grayscale: 100,
    'hue-rotate': 0,
    invert: 0,
    opacity: 100,
    sepia: 0,
    saturate: 100,
  },
  noir: {
    blur: 0,
    brightness: 90,
    contrast: 170,
    grayscale: 100,
    'hue-rotate': 0,
    invert: 0,
    opacity: 100,
    sepia: 0,
    saturate: 100,
  },
  vivid: {
    blur: 0,
    brightness: 105,
    contrast: 115,
    grayscale: 0,
    'hue-rotate': 0,
    invert: 0,
    opacity: 100,
    sepia: 0,
    saturate: 160,
  },
  warmSun: {
    blur: 0,
    brightness: 105,
    contrast: 105,
    grayscale: 0,
    'hue-rotate': -10,
    invert: 0,
    opacity: 100,
    sepia: 25,
    saturate: 125,
  },
  coolBreeze: {
    blur: 0,
    brightness: 100,
    contrast: 105,
    grayscale: 0,
    'hue-rotate': 30,
    invert: 0,
    opacity: 100,
    sepia: 0,
    saturate: 110,
  },
  cyberpunk: {
    blur: 0,
    brightness: 115,
    contrast: 140,
    grayscale: 0,
    'hue-rotate': 180,
    invert: 0,
    opacity: 100,
    sepia: 0,
    saturate: 180,
  },
  invertXray: {
    blur: 0,
    brightness: 100,
    contrast: 120,
    grayscale: 100,
    'hue-rotate': 0,
    invert: 100,
    opacity: 100,
    sepia: 0,
    saturate: 100,
  },
  fade: {
    blur: 0,
    brightness: 110,
    contrast: 80,
    grayscale: 15,
    'hue-rotate': 0,
    invert: 0,
    opacity: 100,
    sepia: 10,
    saturate: 85,
  },
  softFocus: {
    blur: 2,
    brightness: 105,
    contrast: 95,
    grayscale: 0,
    'hue-rotate': 0,
    invert: 0,
    opacity: 100,
    sepia: 5,
    saturate: 105,
  },
  popArt: {
    blur: 0,
    brightness: 115,
    contrast: 160,
    grayscale: 0,
    'hue-rotate': 90,
    invert: 0,
    opacity: 100,
    sepia: 0,
    saturate: 200,
  },
  goldenHour: {
    blur: 0,
    brightness: 108,
    contrast: 110,
    grayscale: 0,
    'hue-rotate': -15,
    invert: 0,
    opacity: 100,
    sepia: 35,
    saturate: 130,
  },
  moody: {
    blur: 0,
    brightness: 80,
    contrast: 135,
    grayscale: 20,
    'hue-rotate': 10,
    invert: 0,
    opacity: 100,
    sepia: 15,
    saturate: 90,
  },
  highKey: {
    blur: 0,
    brightness: 130,
    contrast: 85,
    grayscale: 0,
    'hue-rotate': 0,
    invert: 0,
    opacity: 100,
    sepia: 0,
    saturate: 95,
  },
  lowKey: {
    blur: 0,
    brightness: 65,
    contrast: 150,
    grayscale: 0,
    'hue-rotate': 0,
    invert: 0,
    opacity: 100,
    sepia: 0,
    saturate: 110,
  },
  retroWave: {
    blur: 0,
    brightness: 100,
    contrast: 125,
    grayscale: 0,
    'hue-rotate': 240,
    invert: 0,
    opacity: 100,
    sepia: 0,
    saturate: 170,
  },
  cinematic: {
    blur: 0,
    brightness: 95,
    contrast: 125,
    grayscale: 5,
    'hue-rotate': -5,
    invert: 0,
    opacity: 100,
    sepia: 10,
    saturate: 115,
  },
  dreamy: {
    blur: 3,
    brightness: 115,
    contrast: 90,
    grayscale: 0,
    'hue-rotate': 5,
    invert: 0,
    opacity: 90,
    sepia: 15,
    saturate: 110,
  },
  posterize: {
    blur: 0,
    brightness: 110,
    contrast: 200,
    grayscale: 0,
    'hue-rotate': 45,
    invert: 0,
    opacity: 100,
    sepia: 0,
    saturate: 150,
  },
  ghostly: {
    blur: 1,
    brightness: 125,
    contrast: 70,
    grayscale: 80,
    'hue-rotate': 180,
    invert: 10,
    opacity: 80,
    sepia: 0,
    saturate: 50,
  },
}

const previewContainer = document.querySelector('.preview-container')

function getFilterString(preset) {
  return Object.entries(preset)
    .map(
      ([property, value]) => `${property}(${value}${filters[property].unit})`,
    )
    .join(' ')
}

function createPreviewElement(filterName, image, onSelect) {
  const previewDiv = document.createElement('div')
  previewDiv.classList.add('preview')
  previewDiv.dataset.filterName = filterName

  const previewCanvas = document.createElement('canvas')
  previewCanvas.width = 70
  previewCanvas.height = 100
  previewCanvas.classList.add('preview-canvas')

  const previewCtx = previewCanvas.getContext('2d')

  // Preserve the original image aspect ratio
  const scale = Math.min(
    previewCanvas.width / image.width,
    previewCanvas.height / image.height,
  )

  const width = image.width * scale
  const height = image.height * scale

  const x = (previewCanvas.width - width) / 2
  const y = (previewCanvas.height - height) / 2

  // Apply preset filters
  previewCtx.filter = getFilterString(previews[filterName])

  previewCtx.drawImage(image, x, y, width, height)

  previewCtx.filter = 'none'

  const previewTitle = document.createElement('h3')
  previewTitle.textContent = filterName

  previewDiv.append(previewCanvas, previewTitle)

  // Apply preset on click
  previewDiv.addEventListener('click', () => {
    document
      .querySelectorAll('.preview.selected')
      .forEach((el) => el.classList.remove('selected'))

    previewDiv.classList.add('selected')

    onSelect(previews[filterName])
  })

  return previewDiv
}

export default function createPreviews(image, onSelect) {
  if (!image) return

  previewContainer.innerHTML = ''

  Object.keys(previews).forEach((filterName) => {
    const previewDiv = createPreviewElement(filterName, image, onSelect)

    previewContainer.append(previewDiv)
  })
}

export { previews }
