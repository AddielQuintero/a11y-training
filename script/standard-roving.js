document.addEventListener('DOMContentLoaded', () => {
  const ul = document.querySelector('#group1')
  ul.setAttribute('role', 'radiogroup')
  const radioItems = document.querySelectorAll('#group1 .radio')

  radioItems.forEach((item, index) => {
    item.setAttribute('role', 'radio')
    item.setAttribute('aria-checked', 'false')

    // Set tabindex and aria-checked for the first item
    if (index === 0) {
      item.setAttribute('tabindex', 0)
      item.setAttribute('aria-checked', 'true')
      ul.setAttribute('selected', index)
    } else {
      item.setAttribute('tabindex', -1)
    }

    // Add keyboard navigation
    item.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
        event.preventDefault()
        navigate(1)
      } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        event.preventDefault()
        navigate(-1)
      }
    })

    // Add click event to change the selected radio item
    item.addEventListener('click', () => {
      updatePosition(item)
      ul.setAttribute('selected', index)
    })
  })

  const navigate = (direction) => {
    let currentIndex
    radioItems.forEach((item, index) => {
      if (item.getAttribute('tabindex') === '0') {
        currentIndex = index
      }
    })

    const newIndex = (currentIndex + direction + radioItems.length) % radioItems.length
    ul.setAttribute('selected', newIndex)
    updatePosition(radioItems[newIndex])
  }

  const updatePosition = (newActiveItem) => {
    radioItems.forEach((item) => {
      item.setAttribute('aria-checked', 'false')
      item.setAttribute('tabindex', -1)
    })

    newActiveItem.setAttribute('tabindex', 0)
    newActiveItem.setAttribute('aria-checked', 'true')
    newActiveItem.focus()
  }
})
