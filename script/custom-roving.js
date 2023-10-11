const VK_LEFT = 37
const VK_UP = 38
const VK_RIGHT = 39
const VK_DOWN = 40

class RadioButton extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    this.setAttribute('role', 'radio')
    this.setAttribute('tabindex', -1)
    this.setAttribute('aria-checked', false)
  }
}

window.customElements.define('radio-button', RadioButton)

class RadioGroup extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    this.setAttribute('role', 'radiogroup')
    this.radios = Array.from(this.querySelectorAll('radio-button'))

    if (this.hasAttribute('selected')) {
      let selected = this.getAttribute('selected')
      this._selected = selected
      this.radios[selected].setAttribute('tabindex', 0)
      this.radios[selected].setAttribute('aria-checked', true)
    } else {
      this._selected = 0
      this.radios[0].setAttribute('tabindex', 0)
    }

    this.addEventListener('keydown', this.handleKeyDown.bind(this))
    this.addEventListener('click', this.handleClick.bind(this))
  }

  handleKeyDown(e) {
    switch (e.code) {
      case 'ArrowLeft':
      case 'ArrowUp':
        {
          e.preventDefault()
          if (this.selected === 0) {
            this.selected = this.radios.length - 1
          } else {
            this.selected--
          }
        }
        break

      case 'ArrowRight':
      case 'ArrowDown':
        {
          e.preventDefault()
          if (this.selected === this.radios.length - 1) {
            this.selected = 0
          } else {
            this.selected++
          }
        }
        break
    }
  }

  handleClick(e) {
    const clickedRadio = e.target
    const newIndex = this.radios.indexOf(clickedRadio)
    if (newIndex !== -1) {
      this.selected = newIndex
    }
  }

  set selected(idx) {
    if (isFinite(this.selected)) {
      let previousSelected = this.radios[this.selected]
      previousSelected.tabIndex = -1
      previousSelected.removeAttribute('aria-checked', false)
    }

    let newSelected = this.radios[idx]
    newSelected.tabIndex = 0
    newSelected.focus()
    newSelected.setAttribute('aria-checked', true)

    this.setAttribute('selected', idx)
    this._selected = idx
  }

  get selected() {
    return this._selected
  }
}

window.customElements.define('radio-group', RadioGroup)
