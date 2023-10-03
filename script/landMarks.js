;(() => {
  const landmarksNative = [
    { selector: 'header', ariaEquivalent: 'banner' },
    { selector: 'nav', ariaEquivalent: 'navigation' },
    { selector: 'main', ariaEquivalent: 'main' },
    { selector: 'aside', ariaEquivalent: 'complementary' },
    { selector: 'footer', ariaEquivalent: 'contentinfo' },
    { selector: 'form', ariaEquivalent: 'form' },
    { selector: 'section[aria-labelledby]', ariaEquivalent: 'region' }, // Only if it has an accessible name, for example via aria-labelledby
    { selector: 'address', ariaEquivalent: 'contentinfo' }, // In some cases, but you have to be careful with its use so as not to confuse navigation.
  ]

  const landmarkRoles = [
    'banner', // Usually the site header container.
    'navigation', // For navigation areas.
    'main', // Main content of the page.
    'complementary', // Complementary content with respect to the main content.
    'contentinfo', // Information about the main content (for example, the footer).
    'form', // Form.
    'search', // Search section of the site.
    'application', // Web application interface.
    'region', // Only if the region has an accessible name.
  ]

  //Find and highlight ARIA landmarks
  console.log('ARIA Landmark Roles in use:')
  landmarkRoles.forEach((role) => {
    const elements = document.querySelectorAll(`[role="${role}"]`)
    elements.forEach((element) => {
      highlightElement(element, 'ARIA Landmark: ' + role, 'red', 'top')
    })
    console.log(`${role}: ${elements.length} occurrences`)
  })

  //Find and highlight NATIVE landmarks
  console.log(' ')
  console.log('NATIVE Landmark Roles in use:')
  landmarksNative.forEach((item) => {
    const elements = document.querySelectorAll(item.selector)
    elements.forEach((element) => {
      highlightElement(element, 'NATIVE Landmark: ' + item.selector, 'green', 'bottom')
    })
    console.log(`${item.selector}: ${elements.length} occurrences`)
  })

  //Highlights a given HTML element and adds a label with a specified text.
  function highlightElement(element, label, bgColor, textPos) {
    element.style.outline = '2px solid red'

    const positionStyle = window.getComputedStyle(element).position

    if (positionStyle === 'static') {
      element.style.position = 'relative'
    }

    const labelElement = document.createElement('span')
    labelElement.innerText = label
    labelElement.style.position = 'absolute'
    labelElement.style.background = bgColor
    labelElement.style.color = 'white'
    labelElement.style.padding = '2px 5px'
    labelElement.style.left = '0'
    labelElement.style[textPos] = '0'
    labelElement.setAttribute('aria-hidden', true)

    element.prepend(labelElement)
  }
})()
