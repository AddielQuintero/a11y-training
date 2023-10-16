const validAutocompleteValues = [
  'name',  'honorific-prefix',  'given-name',  'additional-name',  'family-name',  'honorific-suffix',  'nickname',
  'username',  'new-password',  'current-password',  'one-time-code',  'organization-title',  'organization',
  'street-address',  'address-line1',  'address-line2',  'address-line3',  'address-level4',  'address-level3',
  'address-level2',  'address-level1',  'country',  'country-name',  'postal-code',  'cc-name',
  'cc-given-name',  'cc-additional-name',  'cc-family-name',  'cc-number',  'cc-exp',  'cc-exp-month',
  'cc-exp-year',  'cc-csc',  'cc-type',  'transaction-currency',  'transaction-amount',  'language',
  'bday',  'bday-day',  'bday-month',  'bday-year',  'sex',  'url',
  'photo',  'tel',  'tel-country-code',  'tel-national',  'tel-area-code',  'tel-local',
  'tel-local-prefix',  'tel-local-suffix',  'tel-extension',  'email',  'impp'
]


const isAriaHidden = (element) => element.getAttribute('aria-hidden') === 'true'
const isDisplayNone = (style) => style.display === 'none'
const isVisibilityHidden = (style) => style.visibility === 'hidden'
const hasZeroSize = (element) => element.offsetWidth === 0 || element.offsetHeight === 0

const isVisible = (element) => {
  const style = window.getComputedStyle(element)
  return !(isAriaHidden(element) || isDisplayNone(style) || isVisibilityHidden(style) || hasZeroSize(element))
}

const autocompleteCounts = {}
const inputs = document.querySelectorAll('input')
const visibleInputs = [...inputs].filter(isVisible)

const processAutocompleteValues = (input, autocompleteCounts) => {
  const autocompleteValue = input.getAttribute('autocomplete')
  autocompleteCounts[autocompleteValue] = (autocompleteCounts[autocompleteValue] || 0) + 1
}

const annotateAndAttach = (input) => {
  const autocompleteValue = input.getAttribute('autocomplete')

  const container = document.createElement('div')
  container.style.position = 'relative'
  container.style.display = 'inline-block'
  input.parentNode.insertBefore(container, input)
  container.appendChild(input)

  input.style.outline = '2px solid red'

  const span = document.createElement('span')
  span.style.position = 'absolute'
  span.style.padding = '2px'
  span.style.top = '0'
  span.style.left = '0'
  span.style.zIndex = 999
  span.style.background = 'red'
  span.style.color = 'white'
  span.style.fontSize = '11px'


  if (!autocompleteValue) {
    span.innerText = 'No'
    console.error(`Input without autocomplete '${autocompleteValue}':`, input)
  } else if (!validAutocompleteValues.includes(autocompleteValue)) {
    span.innerText = '⚠️'
    console.error(`Input with invalid autocomplete '${autocompleteValue}':`, input)
  } else {
    span.innerText = autocompleteValue
  }

  container.appendChild(span)
}

visibleInputs.forEach((input) => processAutocompleteValues(input, autocompleteCounts))

console.log(`${visibleInputs.length} elements with autocomplete attribute were found on this page.`)
console.log('Count of each autocomplete:')
Object.entries(autocompleteCounts).forEach(([role, count]) => {
  console.log(`${role}: ${count} occurrences`)
})

visibleInputs.forEach((input) => annotateAndAttach(input))