// ;(() => {
const landmarksNative = [
  { selector: 'header', ariaEquivalent: 'banner' },
  { selector: 'nav', ariaEquivalent: 'navigation' },
  { selector: 'main', ariaEquivalent: 'main' },
  { selector: 'footer', ariaEquivalent: 'contentinfo' },
  { selector: 'form', ariaEquivalent: 'form' },
]

const landmarkRoles = [
  'banner', // Usually the site header container.
  'navigation', // For navigation areas.
  'main', // Main content of the page.
  'contentinfo', // Information about the main content (for example, the footer).
  'form', // Form.
]

let ariaLandmarkCount = 0
let nativeLandmarkCount = 0

//Find and highlight NATIVE landmarks
console.log('NATIVE Landmark Roles in use:')
landmarksNative.forEach((item) => {
  const elements = document.querySelectorAll(item.selector)
  elements.forEach((element) => {
    const firstLabel = highlightElement(element, item.selector, 'red')
    element.firstLabelWidth = firstLabel.offsetWidth
    nativeLandmarkCount++
  })
  if (elements.length !== 0) {
    console.log(`${item.selector}: ${elements.length} occurrences`)
  }
})

console.log(' ')
//Find and highlight ARIA landmarks
console.log('ARIA Landmark Roles in use:')
landmarkRoles.forEach((role) => {
  const elements = document.querySelectorAll(`[role="${role}"]`)
  const formattedRole = 'a' + role.charAt(0).toUpperCase() + role.slice(1)
  elements.forEach((element) => {
    const additionalLeft = element.firstLabelWidth || 0
    highlightElement(element, formattedRole, '#00F', additionalLeft) // store the label element

    ariaLandmarkCount++
  })
  if (elements.length !== 0) {
    console.log(`${formattedRole}: ${elements.length} occurrences`)
  }
})

// Check and display messages
if (ariaLandmarkCount === 0 && nativeLandmarkCount === 0) {
  console.log('No landmarks used in page')
} else {
  if (ariaLandmarkCount === 0) {
    console.log('No ARIA landmarks used in page')
  }
  if (nativeLandmarkCount === 0) {
    console.log('No NATIVE landmarks used in page')
  }
}

//Highlights a given HTML element and adds a label with a specified text.
function highlightElement(element, label, color, additionalLeft = '0') {
  element.style.outline = `2px solid ${color === '#00F' ? color : 'none'}`
  element.style.border = `2px solid ${color === 'red' ? color : 'none'}`
  // element.style.boxShadow  = `0 0 0 2px ${color === '#00F' ? color : 'none'}`

  const positionStyle = window.getComputedStyle(element).position

  if (positionStyle === 'static') {
    element.style.position = 'relative'
  }

  const labelElement = document.createElement('span')
  labelElement.innerText = label
  labelElement.style.position = 'absolute'
  labelElement.style.padding = '2px'
  labelElement.style.top = '0'
  labelElement.style.left = additionalLeft + 'px'
  labelElement.style.zIndex = 999
  labelElement.style.background = color
  labelElement.style.color = 'white'

  element.prepend(labelElement)
  return labelElement
}
// })()
