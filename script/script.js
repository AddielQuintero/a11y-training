const toggleButton = document.querySelector('.toggleButton')
let isToggleButtonPressed = toggleButton.getAttribute('aria-pressed') === 'true'

function handleExpandedButton() {
  const expandedButton = document.querySelector('.expandedButton')
  const divExpanded = document.querySelector('#divExpand')
  let isExpanded = expandedButton.getAttribute('aria-expanded') === 'true'
  let newIsExpanded = !isExpanded

  divExpanded.style.display = newIsExpanded ? 'block' : 'none'
  expandedButton.setAttribute('aria-expanded', newIsExpanded)
}

toggleButton.addEventListener('click', () => {
  toggleButton.setAttribute('aria-pressed', !isToggleButtonPressed)
  isToggleButtonPressed = !isToggleButtonPressed
  updateToggleButtonLabel()
})

toggleButton.addEventListener('keydown', (event) => {
  // if (event.keyCode === 13 || event.keyCode === 32) {
  if (event.key === 'Enter' || event.code === 'Space') {
    event.preventDefault()
    toggleButton.click()
  }
})

function updateToggleButtonLabel() {
  if (isToggleButtonPressed) {
    // toggleButton.setAttribute('aria-label', 'Toggle: on')
    toggleButton.textContent = 'On'
  } else {
    // toggleButton.setAttribute('aria-label', 'Toggle: off')
    toggleButton.textContent = 'Off'
  }
}
