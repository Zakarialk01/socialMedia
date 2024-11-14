/**

 * @param {string} dateString 
 * @returns {string}
 */
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString();
}

/**

 * @param {string} tag 
 * @param {string} className 
 * @param {string} content 
 * @returns {HTMLElement} 
 */
function createNeumorphicElement(tag, className = "", content = "") {
  const element = document.createElement(tag);
  element.className = `neumorphic ${className}`.trim();
  element.innerHTML = content;
  return element;
}

/**
 * @param {Error} error
 * @param {HTMLElement} container
 */
function handleFetchError(error, container) {
  console.error("Fetch error:", error);
  container.innerHTML = `
        <div class="error-message neumorphic-inset">
            <p>Error loading data. Please try again later.</p>
            <button onclick="location.reload()" class="neumorphic-button">
                Retry
            </button>
        </div>
    `;
}

/**
 * @param {HTMLElement} button
 * @param {string} emoji
 */
function createParticleAnimation(button, emoji) {
  const particlesContainer = document.createElement("div");
  particlesContainer.className = "particles-container";
  button.appendChild(particlesContainer);

  for (let i = 0; i < 10; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.textContent = emoji;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 0.5}s`;
    particlesContainer.appendChild(particle);
  }

  setTimeout(() => {
    particlesContainer.remove();
  }, 1000);
}

/**
 * @param {Function} func
 * @param {number} wait
 * @returns {Function}
 */
function debounce(func, wait = 300) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

window.utils = {
  formatDate,
  createNeumorphicElement,
  handleFetchError,
  createParticleAnimation,
  debounce,
};
