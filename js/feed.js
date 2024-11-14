const postsData = [
  {
    id: 1,
    author: "John Doe",
    avatar: "https://i.pravatar.cc/150?img=1",
    content: "Just had an amazing day at the beach! 🏖️",
    image: "https://source.unsplash.com/random/800x600?beach",
    timestamp: "2023-05-15T14:30:00Z",
    likes: 15,
    dislikes: 2,
    loves: 5,
    comments: [
      {
        id: 101,
        author: "Jane Smith",
        avatar: "https://i.pravatar.cc/150?img=2",
        content: "Looks like fun! Which beach did you go to?",
        timestamp: "2023-05-15T15:00:00Z",
      },
    ],
  },
  {
    id: 2,
    author: "Alice Johnson",
    avatar: "https://i.pravatar.cc/150?img=3",
    content:
      "Just finished reading an amazing book. Highly recommend 'The Midnight Library' by Matt Haig!",
    timestamp: "2023-05-15T16:45:00Z",
    likes: 8,
    dislikes: 0,
    loves: 3,
    comments: [],
  },
];

let posts = [];

function loadFeed() {
  const app = document.getElementById("app");
  app.innerHTML =
    '<h1 class="page-title">Feed</h1><div id="posts" class="posts-container"></div>';

  posts = [...postsData];
  renderPosts();
}

function renderPosts() {
  const postsContainer = document.getElementById("posts");
  postsContainer.innerHTML = "";

  posts.forEach((post) => {
    const postElement = createPostElement(post);
    postsContainer.appendChild(postElement);
  });
}

function createPostElement(post) {
  const postElement = document.createElement("div");
  postElement.className = "post neumorphic";
  postElement.innerHTML = `
        <div class="post-header">
            <img src="${post.avatar}" alt="${post.author}" class="avatar">
            <div class="post-info">
                <h2>${post.author}</h2>
                <p class="timestamp">${formatDate(post.timestamp)}</p>
            </div>
        </div>
        <p class="post-content">${post.content}</p>
        ${
          post.image
            ? `<img src="${post.image}" alt="Post image" class="post-image">`
            : ""
        }
        <div class="post-actions">
            <button class="neumorphic-button reaction-button" data-reaction="like" data-post-id="${
              post.id
            }">
                👍 ${post.likes}
            </button>
            <button class="neumorphic-button reaction-button" data-reaction="dislike" data-post-id="${
              post.id
            }">
                👎 ${post.dislikes}
            </button>
            <button class="neumorphic-button reaction-button" data-reaction="love" data-post-id="${
              post.id
            }">
                ❤️ ${post.loves}
            </button>
        </div>
        <div class="comments-section">
            <h3>Comments</h3>
            <div class="comments-container">
                ${renderComments(post.comments)}
            </div>
            <form class="comment-form" data-post-id="${post.id}">
                <input type="text" class="neumorphic-input" placeholder="Add a comment..." required>
                <button type="submit" class="neumorphic-button">Post</button>
            </form>
        </div>
    `;

  addPostEventListeners(postElement, post.id);

  return postElement;
}

function renderComments(comments) {
  return comments
    .map(
      (comment) => `
        <div class="comment neumorphic-inset">
            <img src="${comment.avatar}" alt="${comment.author}" class="avatar">
            <div class="comment-content">
                <h4>${comment.author}</h4>
                <p>${comment.content}</p>
                <p class="timestamp">${formatDate(comment.timestamp)}</p>
            </div>
        </div>
    `
    )
    .join("");
}

function addPostEventListeners(postElement, postId) {
  const reactionButtons = postElement.querySelectorAll(".reaction-button");
  reactionButtons.forEach((button) => {
    button.addEventListener("click", handleReaction);
  });

  const commentForm = postElement.querySelector(".comment-form");
  commentForm.addEventListener("submit", handleCommentSubmit);

  const postImage = postElement.querySelector(".post-image");
  if (postImage) {
    postImage.addEventListener("click", () => {
      openImageFullscreen(postImage.src);
    });
  }
}

function handleReaction(event) {
  const button = event.currentTarget;
  const reaction = button.dataset.reaction;
  const postId = parseInt(button.dataset.postId);
  const post = posts.find((p) => p.id === postId);

  if (post) {
    post[reaction + "s"]++;
    button.textContent = `${getReactionEmoji(reaction)} ${
      post[reaction + "s"]
    }`;
    createParticleAnimation(button, reaction);
  }
}

function handleCommentSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const postId = parseInt(form.dataset.postId);
  const input = form.querySelector("input");
  const content = input.value.trim();

  if (content) {
    const post = posts.find((p) => p.id === postId);
    if (post) {
      const newComment = {
        id: Date.now(),
        author: "Current User",
        avatar: "https://i.pravatar.cc/150?img=0",
        content: content,
        timestamp: new Date().toISOString(),
      };
      post.comments.push(newComment);
      const commentsContainer = form.previousElementSibling;
      commentsContainer.innerHTML += renderComments([newComment]);
      input.value = "";
    }
  }
}

function createParticleAnimation(button, reaction) {
  const particlesContainer = document.createElement("div");
  particlesContainer.className = "particles-container";
  button.appendChild(particlesContainer);

  for (let i = 0; i < 10; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.textContent = getReactionEmoji(reaction);
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 0.5}s`;
    particlesContainer.appendChild(particle);
  }

  setTimeout(() => {
    particlesContainer.remove();
  }, 1000);
}

function getReactionEmoji(reaction) {
  switch (reaction) {
    case "like":
      return "👍";
    case "dislike":
      return "👎";
    case "love":
      return "❤️";
    default:
      return "";
  }
}

function openImageFullscreen(src) {
  const fullscreenContainer = document.createElement("div");
  fullscreenContainer.className = "fullscreen-container";
  fullscreenContainer.innerHTML = `<img src="${src}" alt="Fullscreen image">`;
  document.body.appendChild(fullscreenContainer);

  fullscreenContainer.addEventListener("click", () => {
    fullscreenContainer.remove();
  });
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString();
}

console.log("Feed script loaded");
