const validAriaRoles = [
  // Roles de widgets
  'button',  'checkbox',  'gridcell',  'link',  'menuitem',  'menuitemcheckbox',  'menuitemradio',  'option',
  'progressbar',  'radio',  'scrollbar',  'searchbox',
  'separator',  'slider',  'spinbutton',  'switch',  'tab',  'tabpanel',  'textbox',  'treeitem', 
   // Roles compuestos
  'combobox',  'grid',   'listbox',   'menu',  'menubar',  'radiogroup',   'tablist',   'tree',  'treegrid', 
   // Funciones de la estructura del documento
  'application',  'article',  'cell',  'columnheader',  'definition',  'directory',  'document',  'feed',  'figure',
  'group',  'heading',  'img',  'list',  'listitem',  'math',  'none',  'note',  'presentation',  'row',
  'rowgroup',  'rowheader',  'separator',  'table',  'term',  'toolbar',  'tooltip',  
  // Roles destacados
  'banner',  'complementary',  'contentinfo',  'form',  'main',  'navigation',  'region',  'search', 
   // Roles de región en vivo
  'alert',  'log',  'marquee',  'status',  'timer', 
   // Roles de ventana
  'alertdialog',  'dialog',
]

const elements = document.querySelectorAll('[role]')
const roleCounts = {}

elements.forEach((element) => {
  const role = element.getAttribute('role')
  roleCounts[role] = (roleCounts[role] || 0) + 1

  if (!isVisible(element)) {
    return
  }

  if (validAriaRoles.includes(role)) {
    const positionStyle = window.getComputedStyle(element).position
    if (positionStyle === 'static') {
      element.style.position = 'relative'
    }

    element.style.outline = '2px solid blue'
    const label = document.createElement('span')
    label.innerText = role
    label.style.position = 'absolute'
    label.style.padding = '2px'
    label.style.top = '0'
    label.style.left = '0'
    label.style.zIndex = 999
    label.style.background = '#00F'
    label.style.color = 'white'
    element.appendChild(label)
  }
})

function isVisible(element) {
  const style = window.getComputedStyle(element)
  return (
    style.display !== 'none' &&
    style.visibility !== 'hidden' &&
    element.getAttribute('role') !== 'presentation' &&
    element.getAttribute('role') !== 'none'
  )
}

console.log(`${elements.length} elements with role attribute were found on this page.`)
console.log('Count of each role:')
Object.entries(roleCounts).forEach(([role, count]) => {
  console.log(`${role}: ${count} occurrences`)
})

console.log(' ')
Object.entries(roleCounts).forEach(([role, count]) => {
  if (!validAriaRoles.includes(role)) {
    console.error(`Invalid role: ${role}`)

    elements.forEach((element) => {
      if (element.getAttribute('role') === role) {
        console.error(`Element with invalid role '${role}':`, element);
        element.style.outline = '2px solid red'
        const positionStyle = window.getComputedStyle(element).position
        if (positionStyle === 'static') {
          element.style.position = 'relative'
        }

        const warningIcon = document.createElement('span')
        warningIcon.innerText = ' ⚠️'
        warningIcon.style.padding = '2px'
        warningIcon.style.position = 'absolute'
        warningIcon.style.top = '0'
        warningIcon.style.left = '0'
        warningIcon.style.zIndex = 9999
        element.appendChild(warningIcon)
      }
    })
  }
})

