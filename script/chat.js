const messages = [
  'Hello, how are you?',
  'Welcome to the accessible chat!',
  'This message will be announced automatically.',
  'Exploring accessibility features.',
  'Text is updated and read aloud.',
  'Is there anything else I can assist you with today?',
]

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
  botChat.className = 'message message-user'
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

  messages.forEach((msg, index) => {
    setTimeout(() => {
      const botMessageElement = document.createElement('p')
      botMessageElement.textContent = msg
      botChat.appendChild(botMessageElement)
      scrollToBottom()
    }, 1500 * index) // Add each bot message after a delay
  })

  scrollToBottom()
}

function scrollToBottom() {
  const chatContainer = document.querySelector('.chat-container')
  chatContainer.scrollTop = chatContainer.scrollHeight
}
