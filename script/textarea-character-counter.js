document.getElementById('myTextarea').addEventListener('input', updateCharCount)

function updateCharCount() {
  const textarea = document.getElementById('myTextarea')
  const maxLength = textarea.getAttribute('maxlength')
  const remainingChars = maxLength - textarea.value.length
  const charCountEl = document.getElementById('charCount')

  if (remainingChars === parseInt(maxLength)) {
    charCountEl.textContent = `${maxLength} characters remaining.`
  } else {
    charCountEl.textContent = `${remainingChars} characters remaining of ${maxLength}.`
  }
}

/** Anonymous Function */
// document.getElementById('myTextarea').addEventListener('input', (e) => {
//   const maxLength = e.target.getAttribute('maxlength')
//   const remainingChars = maxLength - e.target.value.length
//   const charCountEl = document.getElementById('charCount')

//   if (remainingChars === parseInt(maxLength)) {
//     charCountEl.textContent = `${remainingChars} characters remaining.`
//   } else {
//     charCountEl.textContent = `${remainingChars} characters remaining of ${maxLength}.`
//   }
// })
