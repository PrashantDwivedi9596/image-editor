import { applyFilter } from './script.js'

export const filters = {
  blur: {
    value: 0,
    min: 0,
    max: 20,
    unit: 'px',
    defaultValue: 0,
  },
  brightness: {
    value: 100,
    min: 0,
    max: 200,
    unit: '%',
    defaultValue: 100,
  },
  contrast: {
    value: 100,
    min: 0,
    max: 200,
    unit: '%',
    defaultValue: 100,
  },
  grayscale: {
    value: 0,
    min: 0,
    max: 100,
    unit: '%',
    defaultValue: 0,
  },
  'hue-rotate': {
    value: 0,
    min: -180,
    max: 180,
    unit: 'deg',
    defaultValue: 0,
  },
  invert: {
    value: 0,
    min: 0,
    max: 100,
    unit: '%',
    defaultValue: 0,
  },
  opacity: {
    value: 100,
    min: 0,
    max: 100,
    unit: '%',
    defaultValue: 100,
  },
  sepia: {
    value: 0,
    min: 0,
    max: 100,
    unit: '%',
    defaultValue: 0,
  },
  saturate: {
    value: 100,
    min: 0,
    max: 200,
    unit: '%',
    defaultValue: 0,
  },
}
const container = document.querySelector('.filters')

function createFilterElem(name, config, onChange) {
  const div = document.createElement('div')
  div.classList.add('filter')

  const heading = document.createElement('div')
  heading.classList.add('filter-heading')

  const p = document.createElement('p')
  p.textContent = name

  const output = document.createElement('span')
  output.classList.add('filter-value')
  output.textContent = `${config.value}${config.unit}`

  heading.append(p, output)

  const input = document.createElement('input')

  input.type = 'range'
  input.min = config.min
  input.max = config.max
  input.value = config.value
  input.id = name

  input.addEventListener('input', () => {
    config.value = Number(input.value)

    output.textContent = `${config.value}${config.unit}`

    onChange()
  })

  div.append(heading, input)

  return div
}

export default function createFilters(onChange) {
  const container = document.querySelector('.filters')

  container.innerHTML = ''

  Object.entries(filters).forEach(([name, config]) => {
    const div = createFilterElem(name, config, onChange)
    container.append(div)
  })
}
