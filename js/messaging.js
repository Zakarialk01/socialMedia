const conversationsData = [
  {
    id: 1,
    with: {
      name: "Jane Smith",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    messages: [
      {
        id: 1,
        sender: "Jane Smith",
        content: "Hey, how are you?",
        timestamp: "2023-05-15T14:30:00Z",
      },
      {
        id: 2,
        sender: "Current User",
        content: "I'm good, thanks! How about you?",
        timestamp: "2023-05-15T14:31:00Z",
      },
    ],
  },
  {
    id: 2,
    with: {
      name: "John Doe",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    messages: [
      {
        id: 1,
        sender: "John Doe",
        content: "Did you see the new project requirements?",
        timestamp: "2023-05-15T10:00:00Z",
      },
    ],
  },
];

let conversations = [];
let currentConversation = null;

function loadMessaging() {
  const app = document.getElementById("app");
  app.innerHTML = `
      <div class="messaging-container">
          <div class="conversations-list neumorphic">
              <h2>Conversations</h2>
              <div id="conversations"></div>
          </div>
          <div class="chat-container neumorphic" id="chat">
              <div id="chat-header"></div>
              <div id="messages"></div>
              <form id="message-form" class="message-form">
                  <input type="text" class="neumorphic-input" placeholder="Type your message..." required>
                  <button type="submit" class="neumorphic-button">Send</button>
              </form>
          </div>
      </div>
  `;

  conversations = [...conversationsData]; //pas besoin de fetch (using spread operator)
  renderConversations();

  const messageForm = document.getElementById("message-form");
  messageForm.addEventListener("submit", handleMessageSubmit);
}

function renderConversations() {
  const conversationsContainer = document.getElementById("conversations");
  conversationsContainer.innerHTML = conversations
    .map(
      (conv) => `
      <div class="conversation neumorphic-inset" data-conversation-id="${
        conv.id
      }">
          <img src="${conv.with.avatar}" alt="${conv.with.name}" class="avatar">
          <div class="conversation-info">
              <h3>${conv.with.name}</h3>
              <p>${getLastMessage(conv)}</p>
          </div>
      </div>
  `
    )
    .join("");

  const conversationElements = document.querySelectorAll(".conversation");
  conversationElements.forEach((el) => {
    el.addEventListener("click", () => {
      const convId = parseInt(el.dataset.conversationId);
      loadConversation(convId);

      conversationElements.forEach((el) => el.classList.remove("active"));
      el.classList.add("active");
    });
  });
}

function getLastMessage(conversation) {
  const lastMessage = conversation.messages[conversation.messages.length - 1];
  return lastMessage ? lastMessage.content : "No messages";
}

function loadConversation(conversationId) {
  currentConversation = conversations.find(
    (conv) => conv.id === conversationId
  );
  if (!currentConversation) return;

  const chatHeader = document.getElementById("chat-header");
  chatHeader.innerHTML = `
      <img src="${currentConversation.with.avatar}" alt="${currentConversation.with.name}" class="avatar">
      <h2>${currentConversation.with.name}</h2>
  `;

  renderMessages();
}

function renderMessages() {
  if (!currentConversation) return;

  const messagesContainer = document.getElementById("messages");
  messagesContainer.innerHTML = currentConversation.messages
    .map(
      (message) => `
      <div class="message ${
        message.sender === "Current User" ? "sent" : "received"
      }">
          <div class="message-content neumorphic-inset">
              <p>${message.content}</p>
              <span class="timestamp">${formatDate(message.timestamp)}</span>
          </div>
      </div>
  `
    )
    .join("");

  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function handleMessageSubmit(event) {
  event.preventDefault();
  if (!currentConversation) return;

  const input = event.target.querySelector("input");
  const content = input.value.trim();

  if (content) {
    const newMessage = {
      id: Date.now(),
      sender: "Current User",
      content: content,
      timestamp: new Date().toISOString(),
    };

    currentConversation.messages.push(newMessage);
    renderMessages();
    input.value = "";

    renderConversations();
  }
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString();
}

console.log("Messaging script loaded");
