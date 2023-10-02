const toggleButton = document.querySelector('.toggleButton')
let isToggleButtonPressed = toggleButton.getAttribute('aria-pressed') === 'true'

function handleExpandedButton() {
  const expandedButton = document.querySelector('.expandedButton')
  const divExpanded = document.querySelector('#divExpand')
  let isExpanded = expandedButton.getAttribute('aria-expanded') === 'true'
  let newIsExpanded = !isExpanded

  divExpanded.style.display = newIsExpanded ? 'block' : 'none'
  expandedButton.setAttribute('aria-expanded', newIsExpanded)
  divExpanded.setAttribute('aria-hidden', isExpanded)
}

toggleButton.addEventListener('click', () => {
  isToggleButtonPressed = !isToggleButtonPressed

  toggleButton.setAttribute('aria-pressed', isToggleButtonPressed)

  if (isToggleButtonPressed) {
    toggleButton.setAttribute('aria-label', 'Toggle: on')
    toggleButton.textContent = 'On'
  } else {
    toggleButton.setAttribute('aria-label', 'Toggle: off')
    toggleButton.textContent = 'Off'
  }
})
