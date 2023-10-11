document.addEventListener('DOMContentLoaded', () => {
  const ul = document.querySelector('#group1')
  ul.setAttribute('role', 'radiogroup')
  const radioItems = ul.querySelectorAll('.radio')
  let currentIndex = 0

  // Add keyboard navigation
  const handleKeydown = (event) => {
    const direction = ['ArrowDown', 'ArrowRight'].includes(event.key) ? 1
                    : ['ArrowUp', 'ArrowLeft'].includes(event.key) ? -1
                    : 0

    if (direction !== 0) {
      event.preventDefault()
      navigate(direction)
    }
  }

  // Add click event to change the selected radio item
  const handleClick = (item, index) => {
    updatePosition(item)
    ul.setAttribute('selected', index)
    currentIndex = index
  }

  // navigate between items
  const navigate = (direction) => {
    currentIndex = (currentIndex + direction + radioItems.length) % radioItems.length
    updatePosition(radioItems[currentIndex])
    ul.setAttribute('selected', currentIndex)
  }

  // Sets attributes and focus to the new active item
  const updatePosition = (newActiveItem) => {
    radioItems.forEach((item) => {
      item.setAttribute('aria-checked', 'false')
      item.setAttribute('tabindex', -1)
    })

    newActiveItem.setAttribute('tabindex', 0)
    newActiveItem.setAttribute('aria-checked', 'true')
    newActiveItem.focus()
  }

  // Initializing elements and assigning event listeners
  radioItems.forEach((item, index) => {
    item.setAttribute('role', 'radio')
    item.setAttribute('aria-checked', index === 0 ? 'true' : 'false')
    item.setAttribute('tabindex', index === 0 ? 0 : -1)

    item.addEventListener('keydown', handleKeydown)
    item.addEventListener('click', () => handleClick(item, index))
  })
})
