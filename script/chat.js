const messagesEn = [
  'Hello, how are you?',
  'Welcome to the accessible chat!',
  'This message will be announced automatically.',
  'Exploring accessibility features.',
  'Text is updated and read aloud.',
  'Is there anything else I can assist you with today?',
]

const messagesEs = [
  'Hola, ¿cómo estás?',
  'Bienvenido al chat accesible.',
  'Este mensaje se anunciará automáticamente.',
  'Explorando las funciones de accesibilidad.',
  'El texto se actualiza y se lee en voz alta.',
  '¿Hay algo más en lo que pueda ayudarte hoy?',
]

let messageCount = 0
window.onload = function () {
  const input = document.getElementById('userInput')
  input.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' && input.value.trim() !== '') {
      addUserMessage(input.value)
      input.value = '' // Clear the input
      addBotMessages()
    }
  })
}

function addUserMessage(text) {
  const chatContainer = document.querySelector('.chat-container')
  const botChat = document.createElement('div') // Create a new div for bot messages
  const lang = messageCount % 2 === 0 ? 'en' : 'es'
  botChat.className = 'message message-user'
  botChat.setAttribute('lang', lang)
  chatContainer.appendChild(botChat)

  const userMessageElement = document.createElement('p')
  userMessageElement.textContent = text
  botChat.appendChild(userMessageElement)
  scrollToBottom()
}

function addBotMessages() {
  const chatContainer = document.querySelector('.chat-container')
  const botChat = document.createElement('div') // Create a new div for bot messages
  botChat.className = 'message message-bot'
  chatContainer.appendChild(botChat)

  const messages = messageCount % 2 === 0 ? messagesEn : messagesEs
  const lang = messageCount % 2 === 0 ? 'en' : 'es'
  console.log('🚀  lang:', lang)
  console.log('🚀  messageCount:', messageCount)
  messageCount++

  botChat.setAttribute('lang', lang)

  messages.forEach((msg, index) => {
    setTimeout(() => {
      const botMessageElement = document.createElement('p')
      botMessageElement.textContent = msg
      botChat.appendChild(botMessageElement)
      scrollToBottom()
    }, 1000 * index) // Add each bot message after a delay
  })

  // scrollToBottom()
}

function scrollToBottom() {
  const chatContainer = document.querySelector('.chat-container')
  const lastMessage = chatContainer.lastElementChild
  if (lastMessage) {
    lastMessage.scrollIntoView(true)
  }
}

// document.addEventListener('DOMContentLoaded', function () {
// var okDescription = document.createElement('div')
// var trashDescription = document.createElement('div')
// okDescription.id = 'ok-description'
// okDescription.hidden = true
// okDescription.textContent = 'Select conversation'
// trashDescription.id = 'trash-description'
// trashDescription.hidden = true
// trashDescription.textContent = 'Deleted conversation'

// document.body.appendChild(okDescription)
// document.body.appendChild(trashDescription)
// })

function initializeIcons() {
  var listItems = document.querySelectorAll('.list2 .list-item')

  listItems.forEach(function (listItem) {
    listItem.setAttribute('tabindex', '0')
    listItem.querySelector('a').setAttribute('tabindex', '-1')
  })

  scrollToBottom()
}

function scrollToBottom() {
  const chatContainer = document.querySelector('.chat-window')
  const messageBox = document.querySelector('.message-box')

  // messageBox.setAttribute('tabindex', '-1')
  // chatContainer.scrollTop = chatContainer.scrollHeight;
  chatContainer.scrollTo({
    top: chatContainer.scrollHeight,
    behavior: 'smooth',
  })
  const inputField = document.getElementById('userInput')
  inputField.focus()
}

function scrollToTop() {
  const chatContainer = document.querySelector('.chat-window')
  chatContainer.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
  const messageBox = document.querySelector('.message-box')
  console.log("🚀  messageBox:", messageBox.firstElementChild)
  messageBox.setAttribute('tabindex', '0')
  setTimeout(() => {
    messageBox.focus()
  }, 500)
  messageBox.setAttribute('tabindex', '-1')
}

function checkScroll() {
  const chatContainer = document.querySelector('.chat-window')
  const scrollToBottomBtn = document.getElementById('scrollToBottomBtn')
  const scrollToTopBtn = document.getElementById('scrollToTopBtn')

  const isAtTop = chatContainer.scrollTop === 0
  scrollToTopBtn.style.display = isAtTop ? 'none' : 'flex'

  const isAtBottom = chatContainer.scrollHeight - chatContainer.scrollTop === chatContainer.clientHeight
  scrollToBottomBtn.style.display = isAtBottom ? 'none' : 'flex'
}

document.getElementById('scrollToBottomBtn').style.display = 'none'
document.getElementById('scrollToTopBtn').style.display = 'none'
window.addEventListener('load', initializeIcons)
