import createFilters from './filters.js'
import { filters } from './filters.js'
import createPreviews from './preview.js'
const inputFile = document.querySelector('#input-file')
const canvas = document.querySelector('#image-canvas')
const canvasCtx = canvas.getContext('2d')
const placeholder = document.querySelector('.placeholder')
const reset = document.querySelector('.reset')
const download = document.querySelector('.download')

let count = 0
let file = null
export let image = null
let downloadableImage = null

createFilters(applyFilter)
createPreviews()
inputFile.addEventListener('change', (e) => {
  file = e.target.files[0]

  const img = new Image()
  img.src = URL.createObjectURL(file)
  img.onload = () => {
    image = img
    canvas.width = image.width
    canvas.height = image.height
    canvasCtx.drawImage(image, 0, 0)

    createPreviews(image, applyPreset)

    canvas.classList.add('active')
    canvas.classList.remove('hidden')
    placeholder.classList.remove('active')
    placeholder.classList.add('hidden')
  }
})

export function applyFilter() {
  if (!image) return

  canvasCtx.clearRect(0, 0, canvas.width, canvas.height)

  const filterString = Object.entries(filters)
    .map(([property, config]) => `${property}(${config.value}${config.unit})`)
    .join(' ')

  canvasCtx.filter = filterString
  canvasCtx.drawImage(image, 0, 0)

  canvasCtx.filter = 'none'
}

function resetDefaultFilters() {
  Object.entries(filters).forEach(([property, config]) => {
    config.value = config.defaultValue
  })
}
function applyPreset(preset) {
  Object.entries(preset).forEach(([property, value]) => {
    filters[property].value = value

    // Update corresponding range input
    const input = document.getElementById(property)

    if (input) {
      input.value = value

      // Update displayed value
      const output = input.parentElement.querySelector('.filter-value')

      if (output) {
        output.textContent = `${value}${filters[property].unit}`
      }
    }
  })

  applyFilter()
}

reset.addEventListener('click', () => {
  if (!image) return

  Object.values(filters).forEach((config) => {
    config.value = config.defaultValue
  })

  createFilters(applyFilter)

  applyFilter()

  document
    .querySelectorAll('.preview.selected')
    .forEach((el) => el.classList.remove('selected'))
})
download.addEventListener('click', (e) => {
  console.log('inside download')
  const link = document.createElement('a')
  link.download = `edited-img${count++}.png`
  link.href = canvas.toDataURL()
  link.click()
})
