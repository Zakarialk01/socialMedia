const friends = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    avatar: "https://i.pravatar.cc/150?img=1",
    status: "online",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    avatar: "https://i.pravatar.cc/150?img=2",
    status: "offline",
  },
  {
    id: 3,
    firstName: "Mike",
    lastName: "Johnson",
    avatar: "https://i.pravatar.cc/150?img=3",
    status: "online",
  },
];

function loadFriends() {
  const app = document.getElementById("app");
  app.innerHTML = `
        <div class="friends-container">
            <div class="friends-header neumorphic">
                <h1>Friends</h1>
                <input type="text" class="neumorphic-input search-input" placeholder="Search friends..." id="search-friends">
            </div>
            <div class="friends-list" id="friends-list"></div>
        </div>
    `;

  // Initialize friends list
  renderFriends(friends);

  // Add search functionality
  const searchInput = document.getElementById("search-friends");
  searchInput.addEventListener("input", handleSearch);

  // Initialize drag and drop
  initializeDragAndDrop();
}

function renderFriends(friendsList) {
  const friendsContainer = document.getElementById("friends-list");
  friendsContainer.innerHTML = friendsList
    .map(
      (friend, index) => `
        <div class="friend-card neumorphic" draggable="true" data-friend-id="${friend.id}" data-index="${index}">
            <img src="${friend.avatar}" alt="${friend.firstName}" class="avatar">
            <div class="friend-info">
                <h3>${friend.firstName} ${friend.lastName}</h3>
                <span class="status ${friend.status}">${friend.status}</span>
            </div>
            <button class="neumorphic-button message-button" onclick="openChat(${friend.id})">
                Message
            </button>
        </div>
    `
    )
    .join("");
}

function handleSearch(event) {
  const searchTerm = event.target.value.toLowerCase();
  const filteredFriends = friends.filter(
    (friend) =>
      friend.firstName.toLowerCase().includes(searchTerm) ||
      friend.lastName.toLowerCase().includes(searchTerm)
  );
  renderFriends(filteredFriends);
}

function initializeDragAndDrop() {
  const friendsList = document.getElementById("friends-list");
  let draggedItem = null;

  friendsList.addEventListener("dragstart", (e) => {
    draggedItem = e.target;
    e.target.classList.add("dragging");
  });

  friendsList.addEventListener("dragend", (e) => {
    e.target.classList.remove("dragging");
  });

  friendsList.addEventListener("dragover", (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(friendsList, e.clientY);
    const draggable = document.querySelector(".dragging");
    if (afterElement) {
      friendsList.insertBefore(draggable, afterElement);
    } else {
      friendsList.appendChild(draggable);
    }
  });
}

function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll(".friend-card:not(.dragging)"),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;

      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

function openChat(friendId) {
  const navLinks = document.querySelectorAll(".nav a");
  const messagingLink = Array.from(navLinks).find(
    (link) => link.dataset.page === "messaging"
  );
  if (messagingLink) {
    messagingLink.click();
  }
}

console.log("Friends script loaded");
