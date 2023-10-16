const elements = document.querySelectorAll('[tabindex]')

elements.forEach((element) => {
  const valueTabIndex = element.getAttribute('tabindex')

  const positionStyle = window.getComputedStyle(element).position
  if (positionStyle === 'static') {
    element.style.position = 'relative'
  }

  const span = document.createElement('span')
  span.style.position = 'absolute'
  span.style.padding = '2px'
  span.style.top = '0'
  span.style.left = '0'
  span.style.zIndex = 999
  span.style.background = 'red'
  span.style.color = 'white'
  span.style.fontSize = '11px'
  span.innerText = valueTabIndex

  if (valueTabIndex > 1) {
    span.innerText += '⚠️'
  }

  element.appendChild(span)
})
